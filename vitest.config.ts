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
      // Floors sit a few points under the measured numbers so ordinary changes
      // don't trip them, but a real regression does. Raise them when coverage
      // improves; never lower them to make a build pass.
      //
      // The global numbers alone are not enough: 27 fully-covered content data
      // files dominate the average, so a new untested file in lib/ or
      // components/ could land at 0% without moving it. Hence per-directory
      // floors on the two places real logic lives.
      thresholds: {
        statements: 93,
        lines: 93,
        branches: 86,
        functions: 85,
        // measured: 100 / 83.3 / 100
        'src/lib/**': { statements: 95, lines: 95, branches: 80, functions: 95 },
        // measured: 95.1 / 88.6 / 86.2
        'src/components/**': { statements: 90, lines: 90, branches: 84, functions: 80 },
      },
    },
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
});
