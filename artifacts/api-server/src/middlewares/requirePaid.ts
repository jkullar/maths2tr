import { type Response, type NextFunction } from "express";
import { db, coursePurchasesTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import type { AuthRequest } from "./auth";

export async function requirePaid(req: AuthRequest, res: Response, next: NextFunction) {
  const courseId = (req.body?.courseId ?? req.query?.courseId) as string | undefined;

  if (!courseId) {
    res.status(400).json({ error: "courseId required" });
    return;
  }

  const purchase = await db
    .select({ id: coursePurchasesTable.id })
    .from(coursePurchasesTable)
    .where(
      and(
        eq(coursePurchasesTable.userId, req.userId!),
        eq(coursePurchasesTable.courseId, courseId),
        eq(coursePurchasesTable.status, "paid")
      )
    )
    .limit(1);

  if (purchase.length === 0) {
    res.status(402).json({ error: "Course purchase required", code: "PAYMENT_REQUIRED" });
    return;
  }

  next();
}
