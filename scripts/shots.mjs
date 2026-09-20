#!/usr/bin/env node
/**
 * Write the key pages to screenshots/ so they can be looked at.
 *
 * This exists because every screenshot of this site so far came from a script
 * written that day and thrown away, which means nobody else could take one and
 * nothing was repeatable. It is deliberately not a test: no assertions, no
 * baselines, no failures. `tests/e2e/visual.spec.ts` is the gate; this is the
 * thing you run when you want to see the site (SPEC-0003).
 *
 *   npm run shots                     # against the local build
 *   npm run shots -- --base <url>     # against the deployed site
 *   npm run shots -- --theme dark
 *   npm run shots -- --scale 2     # retina, four times the bytes
 *
 * Two details that cost a retry each the first time:
 *   - `Reveal` holds sections at opacity 0 until IntersectionObserver fires, so
 *     a plain headless screenshot is a header and a blank page. Every page is
 *     walked to the bottom and back before the shutter.
 *   - reducedMotion: 'reduce' stops transitions mid-flight from smearing.
 */
import { mkdir, rm } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};

const BASE = (flag('base', 'http://localhost:4321/portfolio') ?? '').replace(/\/$/, '');
const THEME = flag('theme', 'light');
const OUT = flag('out', 'screenshots');
const SCALE = Number(flag('scale', '1'));

const PAGES = [
  ['landing', '/'],
  ['work-index', '/work/'],
  ['project', '/work/aircare/'],
  ['writing-index', '/writing/'],
  ['post', '/writing/bid-to-handover/'],
  ['archive', '/archive/legend/'],
  ['recommendations', '/recommendations/'],
  ['not-found', '/this-page-does-not-exist/'],
];

const VIEWPORTS = [
  ['desktop', { width: 1440, height: 900 }],
  ['mobile', { width: 412, height: 915 }],
];

/** Walk the page so every Reveal section has fired before the shutter. */
async function settle(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 120));
  });
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
let written = 0;

for (const [label, viewport] of VIEWPORTS) {
  const context = await browser.newContext({
    viewport,
    reducedMotion: 'reduce',
    colorScheme: THEME === 'dark' ? 'dark' : 'light',
    deviceScaleFactor: SCALE,
  });
  const page = await context.newPage();

  for (const [name, path] of PAGES) {
    const res = await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' }).catch(() => null);
    if (!res) {
      console.warn(`  skipped ${name} (${path}) — no response`);
      continue;
    }
    await settle(page);
    const file = `${OUT}/${label}-${THEME}-${name}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(`  ${file}  (${res.status()})`);
    written += 1;
  }
  await context.close();
}

await browser.close();
console.log(`\n${written} screenshots in ${OUT}/ — ${THEME} theme, against ${BASE}`);
