import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./test/setup.ts'],
    // RegisterIframe renders a real Townscript <link>/<iframe>; stop happy-dom
    // from fetching those external resources (the fetches only abort on
    // teardown and spam the output — they are not what we're testing).
    environmentOptions: {
      happyDOM: {
        settings: {
          disableCSSFileLoading: true,
          disableJavaScriptFileLoading: true,
          disableIframePageLoading: true,
        },
      },
    },
    // ESM-safe: import.meta.dirname (Node 21.2+) instead of CommonJS __dirname.
    // Mirrors the "@/*" -> "./*" alias from tsconfig.json so imports resolve
    // identically in tests and in the Next.js build.
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
})
