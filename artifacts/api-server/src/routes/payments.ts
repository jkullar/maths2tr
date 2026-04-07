import { Router } from "express";
import { db, coursePurchasesTable, courseSubscriptionsTable } from "@workspace/db";
import { eq, and } from "drizzle-orm";
import { requireAuth, type AuthRequest } from "../middlewares/auth";
import crypto from "crypto";

const router = Router();

const CF_APP_ID = process.env.CASHFREE_APP_ID!;
const CF_SECRET = process.env.CASHFREE_SECRET_KEY!;
const CF_BASE = "https://api.cashfree.com/pg";

const COURSE_PRICES: Record<string, { amountPaise: number; name: string; degreeId: string }> = {
  maths2: { amountPaise: 9900, name: "Mathematics for Data Science II", degreeId: "bs-data-science" },
};

const APP_BASE_URL = process.env.NODE_ENV === "production"
  ? "https://ai.dytadex.com"
  : `https://${process.env.REPLIT_DEV_DOMAIN}`;

// ─── GET /api/payments/status?courseId=maths2 ────────────────────────────────
// Check whether the logged-in user has a completed purchase for a course
router.get("/payments/status", requireAuth as any, async (req: AuthRequest, res) => {
  const { courseId } = req.query;
  if (!courseId) { res.status(400).json({ error: "courseId required" }); return; }

  const purchase = await db
    .select({ status: coursePurchasesTable.status, paidAt: coursePurchasesTable.paidAt })
    .from(coursePurchasesTable)
    .where(
      and(
        eq(coursePurchasesTable.userId, req.userId!),
        eq(coursePurchasesTable.courseId, String(courseId)),
        eq(coursePurchasesTable.status, "paid")
      )
    )
    .limit(1);

  res.json({ paid: purchase.length > 0 });
});

// ─── POST /api/payments/create-order ─────────────────────────────────────────
// Creates a Cashfree order and returns the payment session ID
router.post("/payments/create-order", requireAuth as any, async (req: AuthRequest, res) => {
  const { courseId } = req.body ?? {};
  if (!courseId) { res.status(400).json({ error: "courseId required" }); return; }

  const course = COURSE_PRICES[courseId];
  if (!course) { res.status(404).json({ error: "Course not found" }); return; }

  const orderId = `DD-${courseId}-${req.userId!.slice(0, 8)}-${Date.now()}`;

  const cfRes = await fetch(`${CF_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-version": "2023-08-01",
      "x-client-id": CF_APP_ID,
      "x-client-secret": CF_SECRET,
    },
    body: JSON.stringify({
      order_id: orderId,
      order_amount: course.amountPaise / 100,
      order_currency: "INR",
      customer_details: {
        customer_id: req.userId!,
        customer_phone: req.user?.phone ?? "9999999999",
        customer_name: req.user?.name ?? "Student",
        customer_email: req.user?.email ?? undefined,
      },
      order_meta: {
        return_url: `${APP_BASE_URL}/payment/return?courseId=${courseId}&orderId={order_id}`,
        notify_url: `${APP_BASE_URL}/api/payments/webhook`,
      },
    }),
  });

  if (!cfRes.ok) {
    const err = await cfRes.json().catch(() => ({}));
    res.status(502).json({ error: "Payment gateway error", detail: err });
    return;
  }

  const cfData = await cfRes.json() as { payment_session_id: string; order_id: string };

  await db.insert(coursePurchasesTable).values({
    userId: req.userId!,
    courseId,
    degreeId: course.degreeId,
    amountPaise: course.amountPaise,
    currency: "INR",
    status: "pending",
    cashfreeOrderId: orderId,
  });

  res.json({
    orderId,
    paymentSessionId: cfData.payment_session_id,
    amountPaise: course.amountPaise,
    courseName: course.name,
  });
});

// ─── POST /api/payments/verify ────────────────────────────────────────────────
// Frontend calls this after returning from Cashfree to confirm payment
router.post("/payments/verify", requireAuth as any, async (req: AuthRequest, res) => {
  const { orderId, courseId } = req.body ?? {};
  if (!orderId || !courseId) { res.status(400).json({ error: "orderId and courseId required" }); return; }

  const cfRes = await fetch(`${CF_BASE}/orders/${orderId}`, {
    headers: {
      "x-api-version": "2023-08-01",
      "x-client-id": CF_APP_ID,
      "x-client-secret": CF_SECRET,
    },
  });

  if (!cfRes.ok) {
    res.status(502).json({ error: "Could not verify payment" });
    return;
  }

  const cfData = await cfRes.json() as { order_status: string; cf_order_id?: string };

  if (cfData.order_status === "PAID") {
    await db
      .update(coursePurchasesTable)
      .set({ status: "paid", paidAt: new Date() })
      .where(
        and(
          eq(coursePurchasesTable.userId, req.userId!),
          eq(coursePurchasesTable.cashfreeOrderId, orderId)
        )
      );

    // Auto-subscribe if not already
    const existing = await db
      .select({ id: courseSubscriptionsTable.id })
      .from(courseSubscriptionsTable)
      .where(
        and(
          eq(courseSubscriptionsTable.userId, req.userId!),
          eq(courseSubscriptionsTable.courseId, courseId)
        )
      )
      .limit(1);

    if (existing.length === 0) {
      const course = COURSE_PRICES[courseId];
      if (course) {
        await db.insert(courseSubscriptionsTable).values({
          userId: req.userId!,
          courseId,
          degreeId: course.degreeId,
        });
      }
    }

    res.json({ paid: true });
  } else {
    res.json({ paid: false, status: cfData.order_status });
  }
});

// ─── POST /api/payments/webhook ───────────────────────────────────────────────
// Cashfree server-to-server webhook (signature verified)
router.post("/payments/webhook", async (req, res) => {
  const signature = req.headers["x-webhook-signature"] as string;
  const timestamp = req.headers["x-webhook-timestamp"] as string;

  if (!signature || !timestamp) {
    res.status(400).json({ error: "Missing signature headers" });
    return;
  }

  const rawBody = JSON.stringify(req.body);
  const message = timestamp + rawBody;
  const expected = crypto
    .createHmac("sha256", CF_SECRET)
    .update(message)
    .digest("base64");

  if (expected !== signature) {
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  const { data } = req.body ?? {};
  const orderId = data?.order?.order_id;
  const paymentId = data?.payment?.cf_payment_id?.toString();
  const status = data?.payment?.payment_status;

  if (!orderId) { res.json({ ok: true }); return; }

  if (status === "SUCCESS") {
    await db
      .update(coursePurchasesTable)
      .set({ status: "paid", paidAt: new Date(), cashfreePaymentId: paymentId })
      .where(eq(coursePurchasesTable.cashfreeOrderId, orderId));

    // Fetch the purchase to auto-subscribe
    const [purchase] = await db
      .select()
      .from(coursePurchasesTable)
      .where(eq(coursePurchasesTable.cashfreeOrderId, orderId))
      .limit(1);

    if (purchase) {
      const alreadySub = await db
        .select({ id: courseSubscriptionsTable.id })
        .from(courseSubscriptionsTable)
        .where(
          and(
            eq(courseSubscriptionsTable.userId, purchase.userId),
            eq(courseSubscriptionsTable.courseId, purchase.courseId)
          )
        )
        .limit(1);

      if (alreadySub.length === 0) {
        await db.insert(courseSubscriptionsTable).values({
          userId: purchase.userId,
          courseId: purchase.courseId,
          degreeId: purchase.degreeId,
        });
      }
    }
  }

  res.json({ ok: true });
});

export default router;
