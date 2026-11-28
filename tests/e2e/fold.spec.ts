import { test, expect, type Page } from '@playwright/test';

/**
 * Records read summary first (SPEC-0006 R13, SPEC-0010 R11, SPEC-0011 R16).
 * The unit suite proves what is inside a fold and what never is; this proves
 * the things only a browser can: that a closed record hides its detail and a
 * tap shows it, that it does so with JavaScript off, that a link opens the
 * record it names, that paper gets everything, and that the page stays short.
 */
const hydrated = (page: Page) =>
  page.locator('next-route-announcer').waitFor({ state: 'attached' });

// Budgets are a phone's (412px wide), in CSS pixels, with every record closed.
// Measured 2026-11-28 in the pinned container: 2,468 and 1,304 — against 4,171
// and 2,276 on the live site the day before. The headroom (about a tenth) is
// for a reworded line, not for a new record: a seventh turning point is a
// decision, and it moves the number here.
const SECTIONS = [
  { id: 'turning-points', label: /saw, bet and cost/i, records: 6, budget: 2700 },
  { id: 'journey', label: /highlights/i, records: 6, budget: 1450 },
] as const;

const folds = (page: Page, section: string) => page.locator(`#${section} details.fold`);
const openStates = (page: Page, section: string) =>
  folds(page, section).evaluateAll((all) => all.map((d) => (d as HTMLDetailsElement).open));

for (const { id, label, records } of SECTIONS) {
  test.describe(`#${id}`, () => {
    test('is closed when the page loads, and one tap opens one record', async ({ page }) => {
      await page.goto('');
      await hydrated(page);
      expect(await openStates(page, id)).toEqual(Array(records).fill(false));

      const first = folds(page, id).first();
      const detail = first.locator(':scope > div');
      await expect(detail).toBeHidden();
      await first.locator('summary').click();
      await expect(detail).toBeVisible();
      expect(await openStates(page, id)).toEqual([true, ...Array(records - 1).fill(false)]);
      // The control is named for its record, not just for what it does.
      await expect(first.locator('summary')).toHaveText(label);
    });

    test('one control opens every record, and closes them again', async ({ page }) => {
      await page.goto('');
      await hydrated(page);
      const section = page.locator(`#${id}`);
      await section.getByRole('button', { name: 'Open all' }).click();
      expect(await openStates(page, id)).toEqual(Array(records).fill(true));
      await section.getByRole('button', { name: 'Close all' }).click();
      expect(await openStates(page, id)).toEqual(Array(records).fill(false));
      await expect(section.getByRole('button', { name: 'Open all' })).toBeVisible();
    });

    test('the control tells the truth when records are opened by hand', async ({ page }) => {
      await page.goto('');
      await hydrated(page);
      const section = page.locator(`#${id}`);
      const summaries = section.locator('details.fold > summary');
      for (let i = 0; i < records; i += 1) {
        await expect(section.getByRole('button', { name: 'Open all' })).toBeVisible();
        await summaries.nth(i).click();
      }
      await expect(section.getByRole('button', { name: 'Close all' })).toBeVisible();
      await summaries.nth(2).click();
      await expect(section.getByRole('button', { name: 'Open all' })).toBeVisible();
    });

    test('prints every record open, without the controls', async ({ page }) => {
      await page.goto('');
      await hydrated(page);
      await page.emulateMedia({ media: 'print' });
      const section = page.locator(`#${id}`);
      // Still closed: this is the stylesheet's half of the promise, the one
      // that holds where `beforeprint` never runs.
      expect(await openStates(page, id)).toEqual(Array(records).fill(false));
      for (let i = 0; i < records; i += 1) {
        await expect(folds(page, id).nth(i).locator(':scope > div')).toBeVisible();
      }
      await expect(section.locator('details.fold > summary').first()).toBeHidden();
      await expect(section.getByRole('button', { name: 'Open all' })).toBeHidden();
    });

    test('stays inside its height budget on a phone', async ({ page }, testInfo) => {
      test.skip(testInfo.project.name !== 'mobile', 'the budget is a phone’s');
      const { budget } = SECTIONS.find((s) => s.id === id)!;
      await page.goto('');
      await hydrated(page);
      await page.evaluate(() => document.fonts.ready);
      const height = await page
        .locator(`#${id}`)
        .evaluate((el) => el.getBoundingClientRect().height);
      expect(
        Math.round(height),
        `#${id} folded, at ${page.viewportSize()!.width}px wide`,
      ).toBeLessThanOrEqual(budget);
    });
  });
}

test.describe('a link to a record', () => {
  test('opens that record and no other, clear of the sticky bar', async ({ page }) => {
    // The page scrolls smoothly, and a position read while it is still moving
    // says nothing: with the scroll offset deleted this test passed, because
    // the heading was measured on its way up. Reduced motion makes the jump
    // instant, so what is measured is where the record came to rest.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('#tp-2016');
    await hydrated(page);
    await page.evaluate(() => document.fonts.ready);
    const record = page.locator('#tp-2016');
    await expect(record.locator('details.fold')).toHaveAttribute('open', '');
    expect((await openStates(page, 'turning-points')).filter(Boolean)).toHaveLength(1);
    await expect(record.getByRole('heading', { level: 3 })).toBeInViewport();
    // Not under the bar: the heading's top is below the header's bottom.
    const [headerBottom, headingTop] = await Promise.all([
      page
        .locator('header')
        .first()
        .evaluate((el) => el.getBoundingClientRect().bottom),
      record.getByRole('heading', { level: 3 }).evaluate((el) => el.getBoundingClientRect().top),
    ]);
    expect(headingTop).toBeGreaterThanOrEqual(headerBottom);
  });

  test('opens a second record when the hash changes on the page', async ({ page }) => {
    await page.goto('');
    await hydrated(page);
    await page.evaluate(() => {
      window.location.hash = '#tp-2020';
    });
    await expect(page.locator('#tp-2020 details.fold')).toHaveAttribute('open', '');
    expect((await openStates(page, 'turning-points')).filter(Boolean)).toHaveLength(1);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  for (const { id, records } of SECTIONS) {
    test(`#${id} still opens on a tap, and offers no control it cannot honour`, async ({
      page,
    }) => {
      await page.goto('');
      const section = page.locator(`#${id}`);
      await expect(section.locator('details.fold')).toHaveCount(records);
      const first = section.locator('details.fold').first();
      const detail = first.locator(':scope > div');
      await expect(detail).toBeHidden();
      await first.locator('summary').click();
      await expect(detail).toBeVisible();
      await expect(section.getByRole('button', { name: 'Open all' })).toBeHidden();
      // Hidden by the stylesheet, not missing: it is in the served HTML.
      await expect(section.locator('[data-needs-js] button')).toHaveCount(1);
    });
  }
});
