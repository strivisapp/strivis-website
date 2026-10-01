import { cn } from "@/lib/utils";

// The one heading pattern of the page's sections: an Anton headline (no
// eyebrow above it, no extra tracking) and an optional lead line under it.
export function SectionHeader({ title, lead, id, className, align = "left" }) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2 id={id} className="font-heading uppercase text-h2-sm md:text-h2 text-balance">
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-4 max-w-[60ch] text-body md:text-lead text-white/70 text-pretty", align === "center" && "mx-auto")}>{lead}</p>
      )}
    </div>
  );
}
