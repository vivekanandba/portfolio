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
  /**
   * Pixel baselines are compared against images committed to the repo, and text
   * renders differently on different machines — so they are their own project,
   * run only inside the Playwright container where the fonts are fixed. The
   * behavioural projects skip the file entirely, so `npm run test:e2e` stays
   * runnable anywhere (SPEC-0003).
   */
  expect: {
    toHaveScreenshot: {
      /**
       * An absolute pixel budget, not a ratio.
       *
       * This was `maxDiffPixelRatio: 0.01`, which sounds strict and is not: the
       * nav baseline is 1280x65, so one percent of it is 832 pixels — an entire
       * word. Renaming the site owner from "Vivekanand B" to "Vivekanand
       * Balakrishnan" changed the most prominent text in the nav and all
       * sixteen baselines still passed.
       *
       * A ratio scales the tolerance with the image, which is backwards: a
       * short wide strip is exactly where a small absolute change matters most.
       * Baselines are generated and compared inside the same container, so
       * genuine antialiasing drift is a handful of pixels, not hundreds.
       */
      maxDiffPixels: 120,
      animations: 'disabled',
      caret: 'hide',
    },
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'] },
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      testIgnore: /visual\.spec\.ts/,
    },
    {
      name: 'visual',
      testMatch: /visual\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] },
    },
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
