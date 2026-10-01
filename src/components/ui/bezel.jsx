import { cn } from "@/lib/utils";

// The site's one surface: a double bezel. An outer shell (6 px, hairline
// edge) holds an inner core (surface-1, a 1 px top highlight), radii
// concentric at 28 / 22. `tone="accent"` swaps the shell's hairline for the
// brand orange, the only way a surface is highlighted (no glows, no blobs).
export function Bezel({ as: Tag = "div", className, coreClassName, tone = "default", children, ...props }) {
  return (
    <Tag
      className={cn(
        "rounded-shell p-1.5 ring-1",
        tone === "accent" ? "bg-primary/[0.07] ring-primary/45" : "bg-white/[0.025] ring-hairline",
        className
      )}
      {...props}
    >
      <div className={cn("h-full rounded-core bg-surface-1 shadow-core", coreClassName)}>{children}</div>
    </Tag>
  );
}
