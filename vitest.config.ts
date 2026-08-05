import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    // Vitest owns unit/component/a11y tests; Playwright owns e2e.
    include: ['tests/**/*.test.{ts,tsx}'],
    exclude: ['tests/e2e/**', 'node_modules', 'out', '.next'],
    coverage: {
      provider: 'v8',
      // Measure the app, not the tests or config.
      include: ['src/**'],
      reporter: ['text-summary', 'text', 'html'],
      // Floors sit a few points under the measured numbers (95.0 / 89.4 / 88.8)
      // so ordinary changes don't trip them, but a real regression does. Raise
      // them when coverage improves; never lower them to make a build pass.
      thresholds: { statements: 93, lines: 93, branches: 86, functions: 85 },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
});
