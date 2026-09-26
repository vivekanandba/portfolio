import { test, expect } from '@playwright/test';

/**
 * The installable half of SPEC-0004, checked in a real browser: the worker
 * registers and takes control, the shell is precached, and a visited page is
 * written into the cache.
 *
 * What is deliberately NOT tested here: going offline. Playwright's
 * `context.setOffline(true)` cuts the page's network but not the service
 * worker's — verified: with emulation on, navigating to an unvisited page
 * returned the real page, because the worker's own fetch() succeeded. A test
 * that passes whether or not the cache is used proves nothing, so the offline
 * fallback is proven instead by running the generated worker's logic with a
 * rejecting fetch, in tests/unit/sw.test.ts (R19). Cache *contents* are asserted
 * here because those cannot be faked by emulation either way.
 */
const cacheOf = (page: import('@playwright/test').Page, path: string) =>
  page.evaluate(async (p) => {
    const keys = await caches.keys();
    for (const k of keys) {
      if (await (await caches.open(k)).match(p)) return k;
    }
    return null;
  }, path);

test('registers a service worker whose scope is the site', async ({ page, baseURL }) => {
  await page.goto('');
  const scope = await page.evaluate(async () => (await navigator.serviceWorker.ready).scope);
  expect(scope).toBe(baseURL);
});

test('precaches the shell, including the offline page, at install', async ({ page, baseURL }) => {
  await page.goto('');
  await page.evaluate(() => navigator.serviceWorker.ready);
  const base = new URL(baseURL!).pathname;
  await expect
    .poll(() => cacheOf(page, `${base}offline/`), { timeout: 5000 })
    .toMatch(/^portfolio-/);
  await expect.poll(() => cacheOf(page, `${base}manifest.webmanifest`)).toMatch(/^portfolio-/);
});

test('writes a visited page into the cache, network first', async ({ page, baseURL }) => {
  await page.goto('');
  await page.evaluate(() => navigator.serviceWorker.ready);
  // The first navigation happened before the worker controlled the page; this
  // one goes through it.
  await page.goto('writing/');
  const base = new URL(baseURL!).pathname;
  await expect
    .poll(() => cacheOf(page, `${base}writing/`), { timeout: 5000 })
    .toMatch(/^portfolio-/);
});

test('the manifest is installable: standalone, with 192 and 512 icons and a maskable one', async ({
  request,
  baseURL,
}) => {
  const res = await request.get(new URL('manifest.webmanifest', baseURL).toString());
  expect(res.status()).toBe(200);
  const m = await res.json();
  expect(m.display).toBe('standalone');
  const sizes = m.icons.map((i: { sizes: string }) => i.sizes);
  expect(sizes).toEqual(expect.arrayContaining(['192x192', '512x512']));
  expect(m.icons.some((i: { purpose?: string }) => i.purpose === 'maskable')).toBe(true);
  for (const icon of m.icons) {
    const r = await request.get(new URL(icon.src.replace(/^\//, ''), baseURL).toString());
    expect(r.status(), `${icon.src} is served`).toBe(200);
  }
});
