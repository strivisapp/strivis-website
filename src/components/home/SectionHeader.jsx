import { cn } from "@/lib/utils";

// The home page's one headline pattern: Anton, uppercase, two lines, the
// second in orange (approved wireframe). `lines` is an array of strings; the
// space between the spans keeps the words apart for screen readers and
// find-in-page, the block spans put them on their own lines.
export function Headline({ as: Tag = "h2", id, lines, className }) {
  return (
    <Tag id={id} className={cn("font-heading uppercase text-balance", className ?? "text-section-sm md:text-section")}>
      {lines.map((line, i) => (
        <span key={line}>
          {i > 0 && " "}
          <span className={cn("block", i === lines.length - 1 && i > 0 && "text-primary")}>{line}</span>
        </span>
      ))}
    </Tag>
  );
}

// A section of the home page: full width, the content in the page column.
// `id` is the nav's anchor; scroll-mt keeps the heading clear of the fixed nav.
// `className` adjusts the band (spacing, background), `innerClassName` the
// column (a narrower max width, a grid); `ref` is for the download bar's
// visibility checks.
export function Section({ ref, id, labelledBy, className, innerClassName, children }) {
  return (
    <section ref={ref} id={id} aria-labelledby={labelledBy} className={cn("scroll-mt-20 border-t border-hairline bg-surface-0 py-24 md:py-36", className)}>
      <div className={cn("mx-auto max-w-6xl px-5 sm:px-6", innerClassName)}>{children}</div>
    </section>
  );
}
