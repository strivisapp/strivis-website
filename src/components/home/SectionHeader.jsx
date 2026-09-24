import { cn } from "@/lib/utils";

// The one heading pattern of the page's non-cinematic sections: a small
// tracked eyebrow, an Anton uppercase headline and an optional lead line.
export function SectionHeader({ eyebrow, title, lead, align = "left", id, className }) {
  const center = align === "center";
  return (
    <div className={cn(center && "text-center", className)}>
      {eyebrow && <div className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-3">{eyebrow}</div>}
      <h2 id={id} className="font-heading uppercase text-4xl md:text-5xl tracking-wide leading-[0.98] text-balance">
        {title}
      </h2>
      {lead && <p className={cn("mt-4 text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed", center && "mx-auto")}>{lead}</p>}
    </div>
  );
}
