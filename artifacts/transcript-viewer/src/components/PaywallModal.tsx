import { useState, useCallback } from "react";
import { X, Lock, CheckCircle2, Zap, Loader2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaywallModalProps {
  courseId: string;
  courseName: string;
  onClose: () => void;
  onPurchaseSuccess: () => void;
}

declare global {
  interface Window {
    Cashfree?: (opts: { mode: string }) => {
      checkout: (opts: { paymentSessionId: string; redirectTarget: string }) => Promise<{ error?: { message: string }; redirect?: boolean }>;
    };
  }
}

const CASHFREE_JS = "https://sdk.cashfree.com/js/v3/cashfree.js";

function loadCashfreeSDK(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${CASHFREE_JS}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = CASHFREE_JS;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Failed to load payment SDK"));
    document.head.appendChild(s);
  });
}

const BENEFITS = [
  "Save progress — check off videos, concepts & notes",
  "Adaptive completion timeline based on your pace",
  "Track all 3 content types independently",
  "Lifetime access — pay once, yours forever",
];

export function PaywallModal({ courseId, courseName, onClose, onPurchaseSuccess }: PaywallModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);

  const handlePurchase = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await loadCashfreeSDK();

      const orderRes = await fetch("/api/payments/create-order", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData?.error ?? "Could not create order");

      const { paymentSessionId, orderId } = orderData;

      if (!window.Cashfree) throw new Error("Payment SDK not loaded");

      const cashfree = window.Cashfree({ mode: "production" });
      const result = await cashfree.checkout({
        paymentSessionId,
        redirectTarget: "_modal",
      });

      if (result?.error) {
        setError(result.error.message ?? "Payment failed");
        setLoading(false);
        return;
      }

      // Verify with backend
      setVerifying(true);
      const verifyRes = await fetch("/api/payments/verify", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, courseId }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData.paid) {
        onPurchaseSuccess();
      } else {
        setError("Payment not confirmed yet. Please wait a moment and try again.");
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setLoading(false);
      setVerifying(false);
    }
  }, [courseId, onPurchaseSuccess]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="relative w-full max-w-sm bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header gradient */}
        <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-transparent px-5 pt-6 pb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-base font-bold text-foreground leading-tight">Unlock Progress Tracking</h2>
          <p className="text-xs text-muted-foreground mt-1 leading-snug">
            {courseName}
          </p>
        </div>

        <div className="px-5 pb-5 space-y-4">
          {/* Price */}
          <div className="flex items-end gap-1.5">
            <span className="text-3xl font-black text-foreground">₹99</span>
            <span className="text-sm text-muted-foreground mb-1">one-time · lifetime access</span>
          </div>

          {/* Benefits */}
          <ul className="space-y-2">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-2 text-xs text-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0 mt-0.5" />
                {b}
              </li>
            ))}
          </ul>

          {error && (
            <p className="text-xs text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</p>
          )}

          {/* CTA */}
          <button
            onClick={handlePurchase}
            disabled={loading || verifying}
            className={cn(
              "w-full h-11 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all",
              loading || verifying
                ? "bg-primary/60 text-primary-foreground cursor-not-allowed"
                : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
            )}
          >
            {verifying ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Confirming payment…</>
            ) : loading ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Opening payment…</>
            ) : (
              <><Zap className="w-4 h-4" /> Pay ₹99 &amp; Unlock</>
            )}
          </button>

          <p className="flex items-center justify-center gap-1 text-[10px] text-muted-foreground">
            <ShieldCheck className="w-3 h-3" />
            Secured by Cashfree Payments
          </p>
        </div>
      </div>
    </div>
  );
}
