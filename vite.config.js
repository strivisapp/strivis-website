import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Every first screen (home hero, countdown, subpage headings) sets its
// headline in Anton, so its Latin woff2 is preloaded instead of being found
// only after the CSS has loaded. The file name carries a content hash, so it
// is looked up in the finished bundle. Same origin, so CSP font-src 'self'
// already covers it.
function preloadHeadingFont() {
  return {
    name: 'strivis:preload-heading-font',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const file = Object.keys(ctx.bundle ?? {}).find((name) => /anton-latin-400-normal-[\w-]+\.woff2$/.test(name))
        if (!file) return html
        return [{ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${file}`, crossorigin: '' }, injectTo: 'head' }]
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), preloadHeadingFont()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
