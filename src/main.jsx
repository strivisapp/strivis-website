import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Latin only: covers English and German (ä, ö, ü, ß, „ “ are in the Latin
// subset); the full files add 27 @font-face rules for cyrillic, greek and
// vietnamese to the CSS.
import '@fontsource/anton/latin-400.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-500.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-700.css'
import './index.css'
import App from './App.jsx'
import { stripAuthParams } from './lib/stripAuthParams.js'
import { prerenderedPage } from './lib/seo.js'
import { normalizePath, readStoredLang } from './i18n/lang.js'

// Before the router or any script reads the URL (see stripAuthParams.js).
stripAuthParams()

// Someone who picked German with the language switch gets the German home
// page when they come back to strivis.app. Only the bare home address, only
// on arrival, and only from their own choice: never from the browser's
// language, and links to a specific page stay as they are.
if (normalizePath(window.location.pathname) === '/' && readStoredLang() === 'de') {
  window.history.replaceState(window.history.state, '', `/de${window.location.search}${window.location.hash}`)
}

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Every page is prerendered at build time (scripts/prerender.mjs), and
// #root's data-page says which one. When it is the page at this address,
// React takes over the existing HTML (hydration); otherwise (the app's
// handoff pages from the empty shell, the 404 page for a German path, the
// German home after the redirect above) it renders from scratch.
const container = document.getElementById('root')
if (container.dataset.page && container.dataset.page === prerenderedPage(window.location.pathname)) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}

