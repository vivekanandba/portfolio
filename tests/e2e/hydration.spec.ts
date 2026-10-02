import { test, expect } from '@playwright/test';

/**
 * Hydration must succeed (SPEC-0011 R9). When the server HTML and the client
 * tree disagree, React 19 discards the document and re-renders it, and in doing
 * so strips everything the pre-paint script put on <html>: the `js` class the
 * reveals hang on and the saved theme. Every section then shows at once and a
 * chosen theme is forgotten — silently, on every page view. Found on 2026-10-02
 * when the arc's SVG <title> rendered empty on the server and full on the
 * client; the live site, without the arc, hydrated cleanly.
 *
 * Hydration is "done" once Next's route announcer exists: the client appends
 * `<next-route-announcer>` to the body on mount, and the server never renders
 * it. (The first Reveal is not a usable signal — at desktop height every
 * Reveal starts below the fold.)
 */
const hydrated = (page: import('@playwright/test').Page) =>
  page.locator('next-route-announcer').waitFor({ state: 'attached' });
const ROUTES = ['', 'work/gadjoy/', 'writing/bid-to-handover/'];

for (const path of ROUTES) {
  test(`hydrates /${path} without a React error and keeps the pre-paint stamps`, async ({
    page,
    context,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'one browser is enough');
    await context.addInitScript(() => {
      try {
        localStorage.setItem('theme', 'dark');
      } catch {
        /* storage refused: the theme assertion below will say so */
      }
    });
    const errors: string[] = [];
    page.on('console', (m) => {
      // Network failures log as console errors too; those are not React's.
      if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) {
        errors.push(m.text().slice(0, 200));
      }
    });
    page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));

    await page.goto(path);
    await hydrated(page);

    const html = page.locator('html');
    await expect(html, 'the js class the reveals hang on').toHaveClass(/\bjs\b/);
    await expect(html, 'the theme chosen before this visit').toHaveAttribute('data-theme', 'dark');
    expect(errors, 'React logged an error while hydrating').toEqual([]);
  });
}

test.describe('the arc', () => {
  test.use({ reducedMotion: 'no-preference' });

  test('draws itself once its section reveals, and not before', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'one browser is enough');
    await page.goto('');
    await hydrated(page);

    // Below the fold: clipped to nothing, waiting (SPEC-0006 R10). The
    // endpoints are asserted, never a frame in between — a timing assertion
    // under machine load is a benchmark, not a gate (CON-VER-008).
    const strip = page.locator('#about svg.arc-draw');
    await expect(strip).toHaveCSS('clip-path', 'inset(0px 100% 0px 0px)');
    await expect(strip).toHaveCSS('transition-property', 'clip-path');

    await page.evaluate(() => document.getElementById('about')!.scrollIntoView());
    // Settled: open, with room on the right for the now cap, which sits half outside the box.
    await expect(strip).toHaveCSS('clip-path', 'inset(0px -2px 0px 0px)', { timeout: 5000 });
  });
});
