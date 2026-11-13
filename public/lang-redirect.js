// The language on arrival at the bare home address, before anything is
// drawn. scripts/prerender.mjs puts this file at the top of the <head> of the
// English home page (dist/index.html) only: never /de, never a deep page, so
// a link to a specific page always stays where it points. A plain file, not
// inline: the CSP (vercel.json) allows scripts from this site only.
//
// The rule is arrivalRedirect in src/i18n/lang.js, written out again here
// because a classic script can't import a module; tests/i18n.test.mjs runs
// this file against arrivalRedirect so the two stay the same. A choice made
// with the language switch wins (German goes to /de, English stays);
// without one, a browser that prefers German goes to /de. The move is not
// stored. While the German page loads, html[data-lang-redirect] keeps the
// English page hidden (src/index.css) and src/main.jsx doesn't start React.
(function () {
  try {
    var path = location.pathname;
    if (path.length > 1) path = path.replace(/\/+$/, "") || "/";
    if (path !== "/") return;

    var lang = null;
    try {
      lang = window.localStorage.getItem("strivis_lang");
    } catch {
      lang = null;
    }
    if (lang !== "en" && lang !== "de") {
      lang = null;
      var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
      for (var i = 0; i < list.length; i++) {
        var primary = String(list[i]).toLowerCase().split(/[-_]/)[0];
        if (primary === "en" || primary === "de") {
          lang = primary;
          break;
        }
      }
    }
    if (lang !== "de") return;

    // The navigation starts here and finishes later; the attribute comes
    // second so a failed call never leaves the page hidden.
    location.replace("/de" + location.search + location.hash);
    document.documentElement.setAttribute("data-lang-redirect", "de");
  } catch {
    // Never block the page over this: it stays English.
  }
})();
