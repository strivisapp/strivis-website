import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Latin only: the site is English (German later), and the full files add
// 27 @font-face rules for cyrillic, greek and vietnamese to the CSS.
import '@fontsource/anton/latin-400.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-500.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-700.css'
import './index.css'
import App from './App.jsx'
import { stripAuthParams } from './lib/stripAuthParams.js'

// Before the router or any script reads the URL (see stripAuthParams.js).
stripAuthParams()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
