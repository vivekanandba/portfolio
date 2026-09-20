import { test, expect } from '@playwright/test';

/**
 * A Content-Security-Policy that is too strict breaks the page silently: the
 * browser refuses a resource, logs a violation, and the page renders wrong with
 * no build or test failing. So the policy is checked against a real browser
 * loading the real built output, not against the string that produced it
 * (SPEC-0002). The unit test in tests/unit/csp.test.ts covers what the policy
 * says; this covers what the browser does with it.
 */
/**
 * Relative, never leading-slash: baseURL carries the /portfolio base path and an
 * absolute path would drop it, landing on a 404 where "no CSP violation" is
 * trivially true. These asserted nothing until that was caught.
 */
const PAGES = ['', 'work/aircare/', 'writing/', 'archive/legend/', 'recommendations/'];

for (const path of PAGES) {
  test(`${path} loads with no CSP violation and no blocked resource`, async ({ page }) => {
    const violations: string[] = [];
    const failures: string[] = [];

    page.on('console', (msg) => {
      const text = msg.text();
      if (/content security policy|refused to (load|execute|connect)/i.test(text)) {
        violations.push(text);
      }
    });
    page.on('requestfailed', (req) => {
      const reason = req.failure()?.errorText ?? '';
      // Only CSP blocks matter here; a flaky network is a different problem.
      if (/blocked/i.test(reason)) failures.push(`${req.url()} — ${reason}`);
    });

    const response = await page.goto(path, { waitUntil: 'networkidle' });

    // Prove the page is real before believing anything about it: a 404 has no
    // CSP violations either.
    expect(response?.status(), `${path || '/'} should be served`).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();

    expect(violations, `CSP violations on ${path || '/'}`).toEqual([]);
    expect(failures, `resources blocked on ${path || '/'}`).toEqual([]);
  });
}

test('the policy and referrer meta ship in the document', async ({ page }) => {
  await page.goto('');

  const policy = await page
    .locator('meta[http-equiv="Content-Security-Policy"]')
    .getAttribute('content');
  expect(policy, 'a Content-Security-Policy meta tag').toBeTruthy();
  expect(policy).toContain("default-src 'self'");
  expect(policy).toContain("object-src 'none'");
  expect(policy).toContain("base-uri 'self'");

  // Absent on purpose: a meta policy ignores frame-ancestors, so listing it
  // would read as clickjacking protection and provide none (SPEC-0002).
  expect(policy).not.toContain('frame-ancestors');

  await expect(page.locator('meta[name="referrer"]')).toHaveAttribute(
    'content',
    'strict-origin-when-cross-origin',
  );
});

test('the page still works under the policy — the palette opens and the theme flips', async ({
  page,
}) => {
  // Inline scripts are what a CSP most often kills. These two are the site's:
  // the pre-paint theme script and the hydrated ⌘K listener.
  await page.goto('');

  await expect(page.locator('html')).toHaveClass(/js/);

  await expect(async () => {
    await page.keyboard.press('ControlOrMeta+k');
    await expect(page.getByRole('combobox')).toBeVisible({ timeout: 1000 });
  }).toPass();

  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /switch to (dark|light) theme/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', /dark|light/);
});
