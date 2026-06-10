import { defineConfig, devices } from '@playwright/test';

// E2E runs against the static export served locally on the /portfolio base path.
const PORT = 4321;
const BASE_PATH = '/portfolio';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    // Trailing slash so relative goto('') resolves to the base-path root, not origin.
    baseURL: `http://localhost:${PORT}${BASE_PATH}/`,
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // Build with the production base path, then stage the export UNDER that base
    // path so the local server mirrors how GitHub Pages serves a project page
    // (https://user.github.io/portfolio/...). No `-s` fallback — missing assets
    // must 404 rather than silently resolve to index.html.
    command: [
      `BASE_PATH=${BASE_PATH} npm run build`,
      `rm -rf .pw-site && mkdir -p .pw-site${BASE_PATH}`,
      `cp -r out/. .pw-site${BASE_PATH}/`,
      // GitHub Pages serves the repo's 404.html from the site root for any path.
      `cp out/404.html .pw-site/404.html`,
      `npx serve .pw-site -l ${PORT}`,
    ].join(' && '),
    url: `http://localhost:${PORT}${BASE_PATH}/`,
    timeout: 180_000,
    reuseExistingServer: !process.env.CI,
  },
});
