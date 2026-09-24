import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

// Unknown paths after launch (old Base44 links like /login or /premium, typos).
// Says so plainly and offers the two ways on, instead of silently showing the
// home page under a wrong URL.
export default function NotFound() {
  return (
    <main className="min-h-svh bg-ink text-white flex items-center px-6">
      <div className="max-w-xl mx-auto">
        <p className="font-heading text-8xl md:text-9xl text-primary leading-none mb-6">404</p>
        <h1 className="font-heading uppercase text-4xl md:text-5xl tracking-wide leading-[0.95] mb-4 text-balance">This page doesn't exist.</h1>
        <p className="text-white/65 text-base md:text-lg mb-10 max-w-md">
          The link may be old or mistyped. Strivis itself lives in the iPhone app — here's the way back.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            to="/"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-7 text-sm font-semibold text-primary-foreground hover:bg-primary/90 active:scale-[0.98] transition outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
          >
            <ArrowLeft className="w-4 h-4" /> Back to the home page
          </Link>
          <Link to="/support" className="text-sm text-white/70 underline underline-offset-4 hover:text-white rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary">
            Contact support
          </Link>
        </div>
      </div>
    </main>
  );
}
