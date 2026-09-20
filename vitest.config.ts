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
      reporter: ['text-summary', 'text', 'html', 'json-summary'],
      // Floors sit a couple of points under the measured numbers so ordinary
      // changes don't trip them, but a real regression does. Raise them when
      // coverage improves; never lower them to make a build pass (CON-COV-002).
      //
      // These are AGGREGATE floors, and an aggregate hides things: this repo
      // once read 97.94% statements while three files in src/app were at
      // exactly 0%, because src/app had no floor of its own. Two changes came
      // out of that — src/app is now listed like the others, and
      // `scripts/coverage-floor.mjs` enforces a per-file floor that no average
      // can paper over. Vitest's own `thresholds.perFile` cannot do both, so
      // the two checks are deliberately separate. `npm run test:coverage`
      // runs them in order.
      thresholds: {
        // measured 2026-09-20: 99.95 / 96.15 / 99.36 / 99.95
        statements: 98,
        lines: 98,
        branches: 94,
        functions: 97,
        // measured: 100 / 98.35 / 100 / 100
        'src/lib/**': { statements: 98, lines: 98, branches: 95, functions: 98 },
        // measured: 99.86 / 95.99 / 98.97 / 99.86
        'src/components/**': { statements: 98, lines: 98, branches: 93, functions: 96 },
        // measured: 100 / 94.97 / 100 / 100 — the directory that had no floor.
        'src/app/**': { statements: 98, lines: 98, branches: 92, functions: 98 },
        // measured: 100 / 95 / 100 / 100
        'src/content/**': { statements: 98, lines: 98, branches: 92, functions: 98 },
      },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
});
