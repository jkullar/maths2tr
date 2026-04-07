import { Router } from "express";
import { db, userProgressTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthRequest } from "../middlewares/auth";
import { requirePaid } from "../middlewares/requirePaid";

const router = Router();

// GET /api/progress?courseId=maths2
router.get("/progress", requireAuth as any, async (req: AuthRequest, res) => {
  const { courseId } = req.query;
  const rows = await db
    .select()
    .from(userProgressTable)
    .where(
      courseId
        ? and(
            eq(userProgressTable.userId, req.userId!),
            eq(userProgressTable.courseId, String(courseId))
          )
        : eq(userProgressTable.userId, req.userId!)
    );
  res.json({ progress: rows });
});

// POST /api/progress  { courseId, itemKey }
router.post("/progress", requireAuth as any, requirePaid as any, async (req: AuthRequest, res) => {
  const { courseId, itemKey } = req.body ?? {};
  if (!courseId || !itemKey) {
    res.status(400).json({ error: "courseId and itemKey are required" });
    return;
  }

  await db
    .insert(userProgressTable)
    .values({ userId: req.userId!, courseId, itemKey, completedAt: new Date() })
    .onConflictDoNothing();

  res.status(201).json({ ok: true });
});

// DELETE /api/progress  { courseId, itemKey }
router.delete("/progress", requireAuth as any, requirePaid as any, async (req: AuthRequest, res) => {
  const { courseId, itemKey } = req.body ?? {};
  if (!courseId || !itemKey) {
    res.status(400).json({ error: "courseId and itemKey are required" });
    return;
  }

  await db
    .delete(userProgressTable)
    .where(
      and(
        eq(userProgressTable.userId, req.userId!),
        eq(userProgressTable.courseId, courseId),
        eq(userProgressTable.itemKey, itemKey)
      )
    );

  res.json({ ok: true });
});

export default router;
