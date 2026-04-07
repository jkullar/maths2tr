import { type Request, type Response, type NextFunction } from "express";
import { db, sessionsTable, usersTable } from "@workspace/db";
import { eq, and, gt } from "drizzle-orm";

export interface AuthRequest extends Request {
  userId?: string;
  user?: { id: string; name: string; phone: string; email: string | null; emailVerified: boolean };
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.session_token;
  if (!token) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }

  const now = new Date();
  const [session] = await db
    .select()
    .from(sessionsTable)
    .where(and(eq(sessionsTable.id, token), gt(sessionsTable.expiresAt, now)))
    .limit(1);

  if (!session) {
    res.clearCookie("session_token");
    res.status(401).json({ error: "Session expired or invalid" });
    return;
  }

  const [user] = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      phone: usersTable.phone,
      email: usersTable.email,
      emailVerified: usersTable.emailVerified,
    })
    .from(usersTable)
    .where(eq(usersTable.id, session.userId))
    .limit(1);

  if (!user) {
    res.clearCookie("session_token");
    res.status(401).json({ error: "User not found" });
    return;
  }

  req.userId = user.id;
  req.user = user;
  next();
}
