import { test, expect } from '@playwright/test';

/**
 * Pixel baselines: the check nobody had, because every screenshot of this site
 * was taken by a script written that day and thrown away (SPEC-0003).
 *
 * **Regions, not whole pages, and deliberately.** A full-page baseline of the
 * archive is sixty-eight thousand pixels tall, and one added entry rewrites all
 * of it — a diff nobody can read, failing for a reason nobody cares about. What
 * these pin is the *chrome and the typography*: the nav, the hero, a page
 * header, the palette. Those are where a CSS regression actually shows, and
 * they do not move when content is added.
 *
 * These run only in the `visual` project, inside the Playwright container, so
 * the fonts are the same ones the committed baselines were made with.
 */

/** Reveal holds sections at opacity 0 until the observer fires. */
async function settle(page: import('@playwright/test').Page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 50));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 100));
  });
}

const SURFACES = [
  { name: 'nav', path: '', selector: 'header' },
  { name: 'landing-hero', path: '', selector: '#top' },
  { name: 'turning-points', path: '', selector: '#turning-points' },
  { name: 'project-header', path: 'work/aircare/', selector: 'main > * >> nth=0' },
  { name: 'post-header', path: 'writing/bid-to-handover/', selector: 'article' },
  { name: 'footer', path: '', selector: '#contact' },
] as const;

for (const scheme of ['light', 'dark'] as const) {
  test.describe(`${scheme} theme`, () => {
    test.use({ colorScheme: scheme, reducedMotion: 'reduce' });

    for (const surface of SURFACES) {
      test(`${surface.name}`, async ({ page }) => {
        const response = await page.goto(surface.path, { waitUntil: 'networkidle' });
        // A 404 renders too, and would happily produce a stable baseline of
        // nothing. Prove the page is real first.
        expect(response?.status(), `${surface.path || '/'} should be served`).toBe(200);
        await settle(page);

        await expect(page.locator(surface.selector).first()).toHaveScreenshot(
          `${surface.name}-${scheme}.png`,
        );
      });
    }

    test('command palette', async ({ page }) => {
      await page.goto('', { waitUntil: 'networkidle' });
      await expect(async () => {
        await page.keyboard.press('ControlOrMeta+k');
        await expect(page.getByRole('combobox')).toBeVisible({ timeout: 1000 });
      }).toPass();
      await expect(page.getByRole('dialog')).toHaveScreenshot(`palette-${scheme}.png`);
    });

    test('404', async ({ page }) => {
      await page.goto('this-page-does-not-exist/');
      await settle(page);
      await expect(page).toHaveScreenshot(`not-found-${scheme}.png`, { fullPage: true });
    });
  });
}
