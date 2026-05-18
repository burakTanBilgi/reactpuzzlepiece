/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  test: {
    globals: true,                              // describe/it/expect without imports
    environment: 'happy-dom',                   // fast DOM polyfill for React Testing Library
    setupFiles: ['./tests/setup.js'],
    include: ['tests/**/*.test.{js,jsx}'],
    css: false,                                 // skip CSS parsing during tests
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/main.jsx',
        'src/ui/pages/LandingPage.jsx',         // explicitly out of scope
        'src/ui/pages/DocsPage.jsx',
        'src/ui/components/docs/**',
      ],
    },
  },
});
