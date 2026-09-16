import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  "Unbegrenzte KI-Trainingspläne",
  "Komplette Plan-Bibliothek",
  "Erweiterte Fortschritts-Statistiken",
  "Barcode-Scanner für Ernährung",
];

const TIERS = [
  { key: "yearly", title: "Jährlich", price: "39,99 €", unit: "/Jahr", note: "≈ 3,33 €/Monat · spar 33 %", highlight: true, badge: "Am beliebtesten" },
  { key: "monthly", title: "Monatlich", price: "4,99 €", unit: "/Monat", note: "jederzeit kündbar" },
  { key: "lifetime", title: "Lifetime", price: "89,99 €", unit: "einmalig", note: "einmal zahlen, für immer" },
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
        <p className="text-muted-foreground">Du musst angemeldet sein, um Premium zu sehen.</p>
        <Button className="rounded-xl" onClick={() => navigate("/login")}>
          Zum Login
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-svh bg-background px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted-foreground">
            Angemeldet als <span className="text-foreground font-medium">{user?.email}</span>
          </p>
          <button
            onClick={() => logout(window.location.origin)}
            className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2"
          >
            Abmelden
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
            Zahlung folgt in Kürze
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Der Checkout ist noch nicht angebunden — dein Konto ist bereits mit der echten Strivis-App
            verknüpft, die Bezahlfunktion folgt als nächster Schritt.
          </p>
        </Card>
      </motion.div>
    </div>
  );
}
