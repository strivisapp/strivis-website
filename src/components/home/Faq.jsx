import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useLanguage, useT } from "@/i18n/context";
import { localizedPath } from "@/i18n/lang";
import { useOpenSet } from "@/hooks/useOpenSet";
import { cn } from "@/lib/utils";

// One question and its answer. Every answer is always in the page (the
// prerendered HTML too, so search engines and find-in-page see it); a closed
// one is collapsed to zero height and inert, which takes it out of the tab
// order and the accessibility tree. Opens in 220 ms, closes faster (160 ms);
// with reduced motion it only fades. Several can be open at once: a reader
// comparing two answers shouldn't lose the first one. Also used on /support.
export function FaqItem({ id, item, isOpen, onToggle, headingLevel: H = "h4" }) {
  const { lang } = useLanguage();
  return (
    <div className="border-b border-hairline">
      <H>
        <button
          type="button"
          id={`${id}-q`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-a`}
          className="flex min-h-12 w-full items-center justify-between gap-4 rounded-sm py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
        >
          <span className="text-body font-bold text-white md:text-lg">{item.q}</span>
          <Plus aria-hidden="true" className={cn("h-4 w-4 shrink-0 text-primary transition-transform duration-200 ease-out", isOpen && "rotate-45")} />
        </button>
      </H>
      <div
        id={`${id}-a`}
        role="region"
        aria-labelledby={`${id}-q`}
        inert={!isOpen}
        className={cn(
          "grid ease-out transition-[grid-template-rows,opacity] motion-reduce:transition-opacity",
          isOpen ? "grid-rows-[1fr] opacity-100 duration-ui" : "grid-rows-[0fr] opacity-0 duration-press"
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-[65ch] pb-5 pr-6 text-body text-white/70">
            {item.a}
            {item.link && (
              <>
                {" "}
                <Link to={localizedPath(item.link.to, lang)} className="rounded-sm text-white underline hover:text-primary outline-none focus-visible:ring-2 focus-visible:ring-primary">
                  {item.link.label}
                </Link>
                .
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

// The home page's six questions, one column, the first one open. Also the
// answers search engines read (the FAQPage data in src/lib/seo.js is built
// from the same list).
export function Faq() {
  const t = useT();
  const [open, toggle] = useOpenSet([0]);

  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-20 border-t border-hairline bg-surface-0 py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">
        <h2 id="faq-title" className="font-heading text-section-sm uppercase md:text-[3.5rem] md:leading-[0.95]">
          {t.faq.title}
        </h2>
        <div className="mt-10 border-t border-hairline">
          {t.faq.items.map((item, i) => (
            <FaqItem key={item.q} id={`faq-${i}`} item={item} headingLevel="h3" isOpen={open.has(i)} onToggle={() => toggle(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
