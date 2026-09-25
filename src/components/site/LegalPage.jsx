import { ChevronDown } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";

const slug = (text) =>
  text
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Reading layout for the legal pages (privacy, terms, Impressum): body at
// 16 px / 1.65 in a 68ch column, headings in Manrope bold, and a table of
// contents: collapsible on phones, sticky beside the text from lg up. Only
// layout lives here; each page keeps its wording as it is.
// sections: [{ heading, body?: string, children?: node }]
export function LegalPage({ title, updated, intro, sections }) {
  const toc = sections.map((s) => ({ id: slug(s.heading), heading: s.heading }));
  // A short page (the Impressum) reads fine without one.
  const showToc = toc.length > 4;

  const tocList = (
    <ol className="space-y-1">
      {toc.map((t) => (
        <li key={t.id}>
          <a href={`#${t.id}`} className="block rounded-sm py-1.5 text-small text-white/65 transition-colors duration-200 hover:text-white outline-none focus-visible:ring-2 focus-visible:ring-primary">
            {t.heading}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-5 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36">
        <header className="max-w-[68ch]">
          <h1 className="font-heading uppercase text-h2-sm md:text-h2">{title}</h1>
          {updated && <p className="mt-3 text-small text-white/60">Last updated: {updated}</p>}
        </header>

        <div className={showToc ? "mt-10 grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16" : "mt-10"}>
          {showToc && (
            <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
              <details className="group rounded-core bg-surface-1 shadow-core ring-1 ring-hairline lg:hidden">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-core px-4 text-small font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                  On this page ({toc.length})
                  <ChevronDown aria-hidden="true" className="h-4 w-4 text-white/60 transition-transform duration-200 ease-out group-open:rotate-180" />
                </summary>
                <div className="border-t border-hairline px-4 py-3">{tocList}</div>
              </details>
              <div className="hidden lg:block lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto lg:pb-4 [scrollbar-width:thin]">
                <p className="mb-2 text-small font-semibold text-white">On this page</p>
                {tocList}
              </div>
            </nav>
          )}

          <article className="max-w-[68ch] text-base leading-[1.65] text-white/80">
            {intro}
            {sections.map((s) => (
              <section key={s.heading} id={slug(s.heading)} className="scroll-mt-24 border-t border-hairline py-7 first:border-t-0 first:pt-0">
                <h2 className="text-lg font-bold text-white">{s.heading}</h2>
                <div className="mt-2 space-y-3">{s.children ?? <p>{s.body}</p>}</div>
              </section>
            ))}
          </article>
        </div>
      </div>
    </SiteShell>
  );
}
