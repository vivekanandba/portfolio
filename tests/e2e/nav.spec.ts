import { test, expect } from '@playwright/test';

/**
 * The navigation bar fits its row at every width (SPEC-0005 R7, SPEC-0004 R16).
 *
 * It did not. From 640 to about 1000px the landing bar showed its eight links
 * beside the owner's name, wrapped the name onto two lines and pushed the
 * Resume button past the edge of the viewport — and nothing measured there:
 * the pixel baseline is 1280 wide and the mobile project is 412. Phones,
 * tablets in both orientations, a small laptop, the baseline width.
 */
const WIDTHS = [360, 390, 412, 640, 768, 820, 1024, 1280];

for (const path of ['', 'work/gadjoy/']) {
  test(`the navigation bar on ${path || 'the landing page'} fits at every width`, async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop', 'one viewport sweep is enough');
    await page.goto(path);
    await page.evaluate(async () => {
      await document.fonts.ready;
      return document.fonts.status;
    });

    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 800 });
      const shape = await page
        .locator('header')
        .first()
        .evaluate((el) => {
          const spans = Array.from(el.querySelectorAll('nav a span'));
          const shown = spans.find((s) => getComputedStyle(s).display !== 'none')!;
          return {
            overflows: el.scrollWidth > el.clientWidth,
            // An inline element has one client rect per line box.
            nameLines: shown.getClientRects().length,
            name: shown.textContent,
          };
        });
      expect(shape.overflows, `${width}px: the bar overflows its viewport`).toBe(false);
      expect(
        shape.nameLines,
        `${width}px: "${shape.name}" wraps onto ${shape.nameLines} lines`,
      ).toBe(1);
    }
  });
}

test('the landing bar swaps its link row for the menu button where the row stops fitting', async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'one viewport sweep is enough');
  await page.goto('');
  const row = page.locator('header nav ul');
  const menu = page.getByRole('button', { name: /open menu/i });

  await page.setViewportSize({ width: 1024, height: 800 });
  await expect(row).toBeVisible();
  await expect(menu).toBeHidden();

  await page.setViewportSize({ width: 1023, height: 800 });
  await expect(row).toBeHidden();
  await expect(menu).toBeVisible();
});
