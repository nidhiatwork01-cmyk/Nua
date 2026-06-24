/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: ['chrome61', 'firefox60', 'safari11', 'edge18'],
    cssTarget: ['chrome61', 'firefox60', 'safari11', 'edge18']
  },
  test: {
    globals: true,
    environment: 'jsdom'
  }
})
