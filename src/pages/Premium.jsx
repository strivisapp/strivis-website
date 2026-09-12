import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Crown, Loader2 } from "lucide-react";

const FEATURES = [
  "Unbegrenzte KI-Trainingspläne",
  "Komplette Plan-Bibliothek",
  "Erweiterte Fortschritts-Statistiken",
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
      <div className="max-w-md mx-auto">
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
          <p className="text-3xl font-heading tracking-wide mt-4 tabular-nums">4,99 €<span className="text-base text-muted-foreground font-body"> / Monat</span></p>

          <ul className="mt-6 space-y-2.5 text-left">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Button size="lg" className="w-full h-12 rounded-xl mt-8" disabled>
            Zahlung folgt in Kürze
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Der Checkout ist noch nicht angebunden — dein Konto ist bereits mit der echten
            Strivis-App verknüpft, die Bezahlfunktion folgt als nächster Schritt.
          </p>
        </Card>
      </div>
    </div>
  );
}
