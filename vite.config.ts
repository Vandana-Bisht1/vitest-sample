import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // 👋 add the line below to add jsdom to vite
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.ts', 
    reporters: ['junit', 'json', 'basic', 'html'],
    outputFile: {
      junit: './junit-report.xml',
      json: './json-report.json',
    },
    coverage: {
      provider: 'istanbul', // or 'v8'
      reporter: ['text', 'json', 'html'],
    },
  }
})
