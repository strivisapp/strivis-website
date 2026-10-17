import { Link } from "react-router-dom";
import { ChevronRight, Globe, LifeBuoy } from "lucide-react";
import { Bezel } from "@/components/ui/bezel";
import { AppStoreBadge } from "@/components/download/DownloadAction";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { shotById } from "@/content/screenshots";
import { useLanguage } from "@/i18n/context";
import { localizedPath } from "@/i18n/lang";
import { APP_STORE_INSTAGRAM_URL } from "@/lib/appStore";
import { cn } from "@/lib/utils";

// The page behind the link in the Instagram bio (wireframe
// reports/linkseite-wireframe.html in the app repo, approved 2026-10-17):
// one goal first, the App Store badge with Apple's campaign link, then the
// website and support, and the legal pages as a labelled line that stays
// on the first screen (the Impressum within two taps from the profile).
// At /links and /de/links. No consent banner and no Meta Pixel here
// (lib/consent.js); the campaign link counts views and downloads in App
// Store Connect without cookies.
//
// Phones first: one column, at most 448 px wide. The screenshot row is the
// first thing to go when the screen is short (under 760 px), then the lead
// line and some space (under 620 px, the first iPhone SE), so the badge and
// the legal line need no scrolling at the iPhones' normal text size. Everything enters once,
// staggered from the top, 320 ms up from 8 px (only a fade with reduced
// motion), as CSS on the prerendered HTML.

const ENTER = "animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-entrance ease-out motion-reduce:slide-in-from-bottom-0";
const FOCUS = "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";
const SHOTS = ["active-workout", "dashboard", "nutrition-day"];

function Row({ to, icon: Icon, title, sub }) {
  return (
    <li className="border-t border-hairline first:border-t-0">
      <Link to={to} className={cn("press flex min-h-14 items-center gap-3 rounded-core px-4 py-3 hover:bg-white/[0.03]", FOCUS)}>
        <span aria-hidden="true" className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-surface-2 text-white/85">
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-body font-semibold leading-tight text-white">{title}</span>
          <span className="block text-small text-white/60">{sub}</span>
        </span>
        <ChevronRight aria-hidden="true" className="h-4 w-4 shrink-0 text-white/40" strokeWidth={1.75} />
      </Link>
    </li>
  );
}

export default function Links() {
  const { lang, t } = useLanguage();
  const l = t.links;

  return (
    <div className="relative isolate min-h-[100dvh] overflow-hidden bg-surface-0 text-white">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[340px]">
        <img
          src="/hero-texture-800.webp"
          width="800"
          height="1200"
          alt=""
          decoding="async"
          fetchPriority="low"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-0/30 via-surface-0/70 to-surface-0" />
      </div>

      <main className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-[calc(env(safe-area-inset-top)+0.75rem)]">
        <div className="flex justify-end">
          <LanguageSwitch className="rounded-full bg-white/[0.05] px-1 ring-1 ring-hairline" />
        </div>

        <header className={cn("mt-2 text-center", ENTER)}>
          <img src="/apple-touch-icon.png" width="72" height="72" alt="" className="mx-auto h-[72px] w-[72px] rounded-[18px] shadow-lift [@media(max-height:620px)]:h-14 [@media(max-height:620px)]:w-14 [@media(max-height:620px)]:rounded-[14px]" />
          <h1 className="mt-4 [@media(max-height:620px)]:mt-2 font-heading text-[2.5rem] uppercase leading-none tracking-wide">Strivis</h1>
          <p className="mt-2 font-heading text-[1.0625rem] uppercase tracking-[0.08em] text-primary">{t.hero.titleLines.join(" ")}</p>
          <p className="mx-auto mt-2 max-w-[22rem] text-small text-white/70 [text-wrap:balance] [@media(max-height:620px)]:hidden">{l.lead}</p>
        </header>

        <Bezel tone="accent" className={cn("mt-6 delay-75 [@media(max-height:620px)]:mt-4", ENTER)} coreClassName="flex flex-col items-center gap-2 px-4 py-5">
          <AppStoreBadge height={52} href={APP_STORE_INSTAGRAM_URL} />
          <p className="text-small font-semibold text-white/60">{l.devices}</p>
        </Bezel>

        <ul aria-label={l.shotsLabel} className={cn("mt-4 grid grid-cols-3 gap-2 delay-150 [@media(max-height:760px)]:hidden", ENTER)}>
          {SHOTS.map((id) => {
            const shot = shotById(t.screenshots, id);
            return (
              <li key={id} className="min-w-0 overflow-hidden rounded-tile ring-1 ring-hairline">
                <img src={shot.src480} width="480" height="1039" alt={shot.alt} loading="lazy" decoding="async" className="aspect-[3/4] w-full object-cover object-top" />
              </li>
            );
          })}
        </ul>

        <Bezel as="nav" aria-label={l.moreLabel} className={cn("mt-4 delay-200", ENTER)} coreClassName="p-0">
          <ul>
            <Row to={localizedPath("/", lang)} icon={Globe} title={l.website} sub="strivis.app" />
            <Row to={localizedPath("/support", lang)} icon={LifeBuoy} title={l.support} sub={l.supportSub} />
          </ul>
        </Bezel>

        <footer className={cn("mt-auto pt-6 text-center delay-300 [@media(max-height:620px)]:pt-3", ENTER)}>
          <nav aria-label={t.footer.legalLabel} className="flex flex-wrap justify-center gap-x-5">
            {l.legal.map((item) => (
              <Link key={item.to} to={item.to} className={cn("inline-flex min-h-11 items-center rounded-sm text-small text-white/75 hover:text-white", FOCUS)}>
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-small text-white/45">© 2026 Simon Paretski</p>
        </footer>
      </main>
    </div>
  );
}
