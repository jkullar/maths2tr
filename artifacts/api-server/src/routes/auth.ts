import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable, sessionsTable } from "@workspace/db";
import { eq, or } from "drizzle-orm";
import { requireAuth, type AuthRequest } from "../middlewares/auth";

const router = Router();

const SALT_ROUNDS = 12;
const SESSION_DAYS = 30;
const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
};

function sessionExpiry() {
  const d = new Date();
  d.setDate(d.getDate() + SESSION_DAYS);
  return d;
}

// POST /api/auth/signup
router.post("/auth/signup", async (req, res) => {
  const { name, phone, email, password } = req.body ?? {};

  if (!name?.trim() || !phone?.trim() || !password) {
    res.status(400).json({ error: "Name, phone, and password are required" });
    return;
  }

  const cleanPhone = phone.trim().replace(/\s+/g, "");
  const cleanEmail = email?.trim()?.toLowerCase() || null;
  const cleanName = name.trim();

  if (password.length < 8) {
    res.status(400).json({ error: "Password must be at least 8 characters" });
    return;
  }

  // Check if phone or email already exists
  const existing = await db
    .select({ id: usersTable.id, phone: usersTable.phone, email: usersTable.email })
    .from(usersTable)
    .where(
      cleanEmail
        ? or(eq(usersTable.phone, cleanPhone), eq(usersTable.email, cleanEmail))
        : eq(usersTable.phone, cleanPhone)
    )
    .limit(1);

  if (existing.length > 0) {
    const conflict = existing[0];
    if (conflict.phone === cleanPhone) {
      res.status(409).json({ error: "Phone number already registered" });
    } else {
      res.status(409).json({ error: "Email already registered" });
    }
    return;
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const [user] = await db
    .insert(usersTable)
    .values({ name: cleanName, phone: cleanPhone, email: cleanEmail, passwordHash })
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      phone: usersTable.phone,
      email: usersTable.email,
      emailVerified: usersTable.emailVerified,
    });

  const [session] = await db
    .insert(sessionsTable)
    .values({ userId: user.id, expiresAt: sessionExpiry() })
    .returning({ id: sessionsTable.id });

  res.cookie("session_token", session.id, COOKIE_OPTS);
  res.status(201).json({ user });
});

// POST /api/auth/login
router.post("/auth/login", async (req, res) => {
  const { identifier, password } = req.body ?? {};

  if (!identifier?.trim() || !password) {
    res.status(400).json({ error: "Phone/email and password are required" });
    return;
  }

  const id = identifier.trim().toLowerCase();

  const [user] = await db
    .select()
    .from(usersTable)
    .where(or(eq(usersTable.phone, id), eq(usersTable.email, id)))
    .limit(1);

  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const [session] = await db
    .insert(sessionsTable)
    .values({ userId: user.id, expiresAt: sessionExpiry() })
    .returning({ id: sessionsTable.id });

  res.cookie("session_token", session.id, COOKIE_OPTS);
  res.json({
    user: {
      id: user.id,
      name: user.name,
      phone: user.phone,
      email: user.email,
      emailVerified: user.emailVerified,
    },
  });
});

// POST /api/auth/logout
router.post("/auth/logout", requireAuth as any, async (req: AuthRequest, res) => {
  const token = req.cookies?.session_token;
  if (token) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, token));
  }
  res.clearCookie("session_token", { path: "/" });
  res.json({ ok: true });
});

// GET /api/auth/me
router.get("/auth/me", requireAuth as any, (req: AuthRequest, res) => {
  res.json({ user: req.user });
});

// PUT /api/auth/profile
router.put("/auth/profile", requireAuth as any, async (req: AuthRequest, res) => {
  const { name, phone, email } = req.body ?? {};
  if (!name?.trim() || !phone?.trim()) {
    res.status(400).json({ error: "Name and phone are required" });
    return;
  }

  const cleanPhone = phone.trim().replace(/\s+/g, "");
  const cleanEmail = email?.trim()?.toLowerCase() || null;
  const cleanName = name.trim();

  // Check uniqueness against other users
  const conflicts = await db
    .select({ id: usersTable.id, phone: usersTable.phone, email: usersTable.email })
    .from(usersTable)
    .where(
      cleanEmail
        ? or(eq(usersTable.phone, cleanPhone), eq(usersTable.email, cleanEmail))
        : eq(usersTable.phone, cleanPhone)
    );

  for (const c of conflicts) {
    if (c.id === req.userId) continue;
    if (c.phone === cleanPhone) {
      res.status(409).json({ error: "Phone already used by another account" });
      return;
    }
    if (cleanEmail && c.email === cleanEmail) {
      res.status(409).json({ error: "Email already used by another account" });
      return;
    }
  }

  const [updated] = await db
    .update(usersTable)
    .set({ name: cleanName, phone: cleanPhone, email: cleanEmail, updatedAt: new Date() })
    .where(eq(usersTable.id, req.userId!))
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      phone: usersTable.phone,
      email: usersTable.email,
      emailVerified: usersTable.emailVerified,
    });

  res.json({ user: updated });
});

// PUT /api/auth/password
router.put("/auth/password", requireAuth as any, async (req: AuthRequest, res) => {
  const { currentPassword, newPassword } = req.body ?? {};
  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: "Both current and new password are required" });
    return;
  }
  if (newPassword.length < 8) {
    res.status(400).json({ error: "New password must be at least 8 characters" });
    return;
  }

  const [user] = await db
    .select({ passwordHash: usersTable.passwordHash })
    .from(usersTable)
    .where(eq(usersTable.id, req.userId!))
    .limit(1);

  const match = await bcrypt.compare(currentPassword, user.passwordHash);
  if (!match) {
    res.status(401).json({ error: "Current password is incorrect" });
    return;
  }

  const newHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
  await db
    .update(usersTable)
    .set({ passwordHash: newHash, updatedAt: new Date() })
    .where(eq(usersTable.id, req.userId!));

  res.json({ ok: true });
});

export default router;
