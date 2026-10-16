import { Mail } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { FaqItem } from "@/components/home/Faq";
import { useOpenSet } from "@/hooks/useOpenSet";
import { Bezel } from "@/components/ui/bezel";
import { isPreLaunch } from "@/lib/launchDate";
import { useLanguage } from "@/i18n/context";
import { homePath } from "@/i18n/lang";

const SUPPORT_EMAIL = "strivisofficial+support@gmail.com";

// Read mode: one column, 16 px+ text, the email as a surface with a real
// button, the common questions as the same accordion the home page uses.
// At /support and /de/support; the texts are support.* in src/i18n/.
export default function Support() {
  const { lang, t } = useLanguage();
  const s = t.support;
  const [open, toggle] = useOpenSet();
  // The home page (and its FAQ) only exists from launch day on.
  const showFaqLink = !isPreLaunch();

  return (
    <SiteShell footerSource="support">
      <div className="mx-auto max-w-2xl px-5 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36">
        <h1 className="font-heading uppercase text-h2-sm md:text-h2">Support</h1>
        <p className="mt-4 text-body text-white/75 md:text-lead">{s.lead}</p>

        <Bezel className="mt-10" coreClassName="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
          <div>
            <h2 className="text-small font-semibold text-white/60">{s.emailUs}</h2>
            <p className="mt-1 break-all text-body font-semibold text-white">{SUPPORT_EMAIL}</p>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="press inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-small font-semibold text-primary-foreground hover:bg-primary/90 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            {s.writeEmail}
          </a>
        </Bezel>

        <h2 className="mt-16 font-heading uppercase text-h3">{s.common}</h2>
        <div className="mt-3">
          {s.items.map((item, i) => (
            <FaqItem key={item.q} id={`support-${i}`} item={item} headingLevel="h3" isOpen={open.has(i)} onToggle={() => toggle(i)} />
          ))}
        </div>
        {showFaqLink && (
          <p className="mt-6 text-body text-white/70">
            {s.moreBefore}
            <a href={`${homePath(lang)}#faq`} className="rounded-sm text-white underline hover:text-primary">
              {s.moreLink}
            </a>
            .
          </p>
        )}
      </div>
    </SiteShell>
  );
}
