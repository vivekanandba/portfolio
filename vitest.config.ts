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
  },
  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },
});
