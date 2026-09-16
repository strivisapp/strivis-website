import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = ["Unlimited AI training plans", "The complete plan library", "Advanced progress analytics", "Barcode scanner for nutrition"];

const TIERS = [
  { key: "yearly", title: "Yearly", price: "€39.99", unit: "/year", note: "≈ €3.33/month · save 33%", highlight: true, badge: "Most popular" },
  { key: "monthly", title: "Monthly", price: "€4.99", unit: "/month", note: "cancel anytime" },
  { key: "lifetime", title: "Lifetime", price: "€89.99", unit: "one-time", note: "pay once, use forever" },
];

export default function Premium() {
  const { user, isAuthenticated, isLoadingAuth, logout } = useAuth();
  const navigate = useNavigate();

  if (isLoadingAuth) {
    return (
      <div className="min-h-svh flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-muted-foreground">You need to be logged in to see Premium.</p>
        <Button className="rounded-xl" onClick={() => navigate("/login")}>
          Go to login
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground">
            Logged in as <span className="text-foreground font-medium">{user?.email}</span>
          </p>
          <button
            onClick={() => logout(window.location.origin)}
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            Log out
          </button>
        </div>

        <Card className="rounded-2xl border-2 border-primary p-8 text-center">
          <Crown className="w-8 h-8 text-primary mx-auto mb-3" />
          <h1 className="font-heading text-2xl tracking-wide">Strivis Premium</h1>

          <ul className="mt-6 space-y-2.5 text-left max-w-xs mx-auto">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="grid sm:grid-cols-3 gap-3 mt-8">
            {TIERS.map((tier) => (
              <div
                key={tier.key}
                className={cn("rounded-xl border p-4 flex flex-col", tier.highlight ? "border-primary bg-primary/5" : "border-border")}
              >
                {tier.badge && (
                  <span className="self-center text-[10px] font-semibold uppercase tracking-wide bg-primary text-primary-foreground rounded-full px-2 py-0.5 mb-2">
                    {tier.badge}
                  </span>
                )}
                <div className="text-muted-foreground text-xs font-medium mb-1">{tier.title}</div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-xl font-heading tracking-wide">{tier.price}</span>
                  <span className="text-muted-foreground text-[11px]">{tier.unit}</span>
                </div>
                <div className="text-muted-foreground text-[11px] mt-1">{tier.note}</div>
              </div>
            ))}
          </div>

          <Button size="lg" className="w-full h-12 rounded-xl mt-8" disabled>
            Checkout coming soon
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Checkout isn't connected yet — your account is already linked to the real Strivis app, payment
            follows as the next step.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
