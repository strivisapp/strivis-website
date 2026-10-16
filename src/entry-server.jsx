/* eslint-disable react/only-export-components -- a build-time entry for Node, never hot-reloaded */
import { StrictMode } from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

// Build-time entry for scripts/prerender.mjs (`vite build --ssr`, never
// shipped to the browser): renders one route of the same App the browser
// hydrates. prerenderToNodeStream waits for the lazy pages (React.lazy), so
// the HTML is complete.
export async function render(location) {
  const { prelude } = await prerenderToNodeStream(
    <StrictMode>
      <StaticRouter location={location}>
        <App />
      </StaticRouter>
    </StrictMode>,
    // One piece of HTML: React would otherwise move large Suspense
    // boundaries to the end of the stream and stitch them back in with an
    // inline script, which the CSP blocks.
    { progressiveChunkSize: Number.MAX_SAFE_INTEGER }
  );
  let html = "";
  for await (const chunk of prelude) html += chunk;
  return html;
}

export { PAGE_META, NOT_FOUND_PAGE, metaFor, structuredDataFor, sitemapXml } from "./lib/seo.js";
