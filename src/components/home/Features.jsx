import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Sparkles, ListChecks, Utensils, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";

const FEATURES = [
  {
    icon: Sparkles,
    title: "KI-Trainingspläne",
    desc: "Ein KI-generierter Plan, abgestimmt auf dein Level, dein Ziel und deine Ausrüstung — einmal kostenlos, danach mit Premium.",
  },
  {
    icon: ListChecks,
    title: "Workout-Logging, das mitdenkt",
    desc: "Sätze per Wisch erledigen, automatischer Pausen-Timer, PR-Erkennung in Echtzeit — kein Stift, kein Notizzettel.",
  },
  {
    icon: Utensils,
    title: "Ernährung in Sekunden",
    desc: "Barcode scannen oder aus einer Datenbank mit echten Lebensmitteldaten suchen (OpenFoodFacts & USDA) — sofort geloggt.",
    image: "/screenshots/nutrition-dark.png",
  },
  {
    icon: TrendingUp,
    title: "Fortschritt, den du siehst",
    desc: "Gewicht, Fotos und Trainingsverlauf an einem Ort — statt verstreuter Notizen und geschätzter Erinnerung.",
  },
];

function TiltCard({ icon: Icon, title, desc, image }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6]);

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl border border-border bg-card p-6 overflow-hidden"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h3 className="font-heading text-lg tracking-wide mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
      {image && (
        <div className="mt-4 -mb-6 -mx-6 rounded-t-xl overflow-hidden border-t border-border">
          <img src={image} alt={title} className="w-full h-40 object-cover object-top" />
        </div>
      )}
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-14">
      <Reveal className="max-w-5xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <TiltCard key={f.title} {...f} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
