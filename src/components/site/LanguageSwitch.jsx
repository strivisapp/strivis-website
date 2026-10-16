import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/i18n/context";
import { LANGS, switchPath } from "@/i18n/lang";
import { cn } from "@/lib/utils";

const FOCUS = "outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-ink";

// The language switch (wireframe variant A, approved 2026-10-16). Real links
// to the same page in the other language, so it works before JavaScript and
// crawlers follow it; a click also remembers the choice (src/i18n/lang.js).
// No automatic redirect by browser language.
//
//   variant="inline"    desktop nav: "EN | DE", two 44 px text buttons, the
//                       active one white, the other muted.
//   variant="segmented" top of the phone menu: "English | Deutsch".
//   variant="footer"    "English · Deutsch" in every footer.
export function LanguageSwitch({ variant = "inline", className, onChoose }) {
  const { lang, t, choose } = useLanguage();
  const { pathname, hash } = useLocation();

  const items = LANGS.map((code) => ({
    code,
    to: `${switchPath(pathname, code)}${hash}`,
    // A page that exists once stays put: no second history entry for it.
    replace: switchPath(pathname, code) === pathname,
    label: variant === "inline" ? t.language.short[code] : t.language.names[code],
    // "EN" alone doesn't say which language it is to a screen reader.
    ariaLabel: variant === "inline" ? t.language.names[code] : undefined,
    active: code === lang,
  }));

  const onClick = (code) => () => {
    choose(code);
    onChoose?.();
  };

  if (variant === "segmented") {
    return (
      <nav aria-label={t.language.label} className={cn("flex gap-1 rounded-full bg-white/[0.06] p-1", className)}>
        {items.map((item) => (
          <Link
            key={item.code}
            to={item.to}
            replace={item.replace}
            hrefLang={item.code}
            lang={item.code}
            aria-current={item.active ? "true" : undefined}
            onClick={onClick(item.code)}
            className={cn(
              "press flex h-11 flex-1 items-center justify-center rounded-full text-small font-bold",
              FOCUS,
              item.active ? "bg-white text-ink" : "text-white/65 hover:text-white"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  const separator = variant === "inline" ? "|" : "·";
  return (
    <nav aria-label={t.language.label} className={cn("flex items-center", className)}>
      {items.map((item, i) => (
        <Fragment key={item.code}>
          {i > 0 && (
            <span aria-hidden="true" className="px-0.5 text-small text-white/30">
              {separator}
            </span>
          )}
          <Link
            to={item.to}
            replace={item.replace}
            hrefLang={item.code}
            lang={item.code}
            aria-label={item.ariaLabel}
            aria-current={item.active ? "true" : undefined}
            onClick={onClick(item.code)}
            className={cn(
              "inline-flex h-11 items-center rounded-sm transition-colors duration-200",
              variant === "inline" ? "min-w-11 justify-center px-1.5 text-small font-bold tracking-[0.06em]" : "px-1 text-small",
              FOCUS,
              item.active ? "text-white" : "text-white/55 hover:text-white"
            )}
          >
            {item.label}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
