import { Mail } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { FaqItem } from "@/components/home/Faq";
import { useOpenSet } from "@/hooks/useOpenSet";
import { Bezel } from "@/components/ui/bezel";
import { isPreLaunch } from "@/lib/launchDate";

const SUPPORT_EMAIL = "strivisofficial+support@gmail.com";

const FAQ = [
  {
    q: "How do I cancel my Premium subscription?",
    a: "Manage or cancel anytime in your device's subscription settings. On iPhone, open Settings > [your name] > Subscriptions. Strivis never charges you directly; all payments go through the App Store.",
  },
  {
    q: "I bought Premium but the app still shows the paywall.",
    a: "Open Settings inside the app and tap \"Restore purchases\". This re-links your existing purchase to your account. If it still doesn't unlock, email us with your purchase date and we'll sort it out.",
  },
  {
    q: "How do I delete my account and data?",
    a: "In the app: Settings > Account > Delete account. Your profile and all associated data are deleted right away. If you can no longer sign in, email us from the address linked to your account and we'll do it for you.",
  },
];

// Read mode: one column, 16 px+ text, the email as a surface with a real
// button, the common questions as the same accordion the home page uses.
export default function Support() {
  const [open, toggle] = useOpenSet();
  // The home page (and its FAQ) only exists from launch day on.
  const showFaqLink = !isPreLaunch();

  return (
    <SiteShell footerSource="support">
      <div className="mx-auto max-w-2xl px-5 pb-20 pt-28 sm:px-6 md:pb-28 md:pt-36">
        <h1 className="font-heading uppercase text-h2-sm md:text-h2">Support</h1>
        <p className="mt-4 text-body text-white/75 md:text-lead">Questions, bugs or feedback about Strivis? We read every email.</p>

        <Bezel className="mt-10" coreClassName="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between md:p-7">
          <div>
            <h2 className="text-small font-semibold text-white/60">Email us</h2>
            <p className="mt-1 break-all text-body font-semibold text-white">{SUPPORT_EMAIL}</p>
          </div>
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="press inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 text-small font-semibold text-primary-foreground hover:bg-primary/90 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            Write an email
          </a>
        </Bezel>

        <h2 className="mt-16 font-heading uppercase text-h3">Common questions</h2>
        <div className="mt-3">
          {FAQ.map((item, i) => (
            <FaqItem key={item.q} id={`support-${i}`} item={item} headingLevel="h3" isOpen={open.has(i)} onToggle={() => toggle(i)} />
          ))}
        </div>
        {showFaqLink && (
          <p className="mt-6 text-body text-white/70">
            More answers in the{" "}
            <a href="/#faq" className="rounded-sm text-white underline hover:text-primary">
              FAQ
            </a>
            .
          </p>
        )}
      </div>
    </SiteShell>
  );
}
