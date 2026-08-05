#!/usr/bin/env node
/**
 * External link integrity check.
 *
 * Every outward claim on this site is only as good as its link. A dead or
 * silently-redirected URL is the failure mode no unit test catches — it happens
 * off-box, after merge, when someone else's site changes. This walks every
 * external href in content and reports what no longer resolves.
 *
 * Deliberately NOT part of `npm test`: it makes real network calls, which would
 * make the unit suite slow and flaky. Run it on demand or on a schedule:
 *
 *   npm run check:links
 *
 * Exits 1 if any link fails, so CI can consume it when wanted.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT = 'src/content';
const TIMEOUT_MS = 15000;
const CONCURRENCY = 6;

/** Every https URL appearing in a string literal under src/content. */
function collect() {
  const found = new Map(); // url -> Set<file>
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(p);
        continue;
      }
      if (!entry.name.endsWith('.ts')) continue;
      for (const m of readFileSync(p, 'utf8').matchAll(/'(https:\/\/[^']+)'/g)) {
        if (!found.has(m[1])) found.set(m[1], new Set());
        found.get(m[1]).add(p);
      }
    }
  };
  walk(CONTENT);
  return [...found.entries()].map(([url, files]) => ({ url, files: [...files] }));
}

async function probe(url) {
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), TIMEOUT_MS);
  const opts = {
    redirect: 'follow',
    signal: ctl.signal,
    // Some hosts (Apple, FDA) reject default fetch agents outright.
    headers: { 'user-agent': 'Mozilla/5.0 (portfolio link check)' },
  };
  try {
    // HEAD is cheap; fall back to GET, which many hosts require.
    let res = await fetch(url, { ...opts, method: 'HEAD' });
    if ([403, 404, 405].includes(res.status)) {
      res = await fetch(url, { ...opts, method: 'GET' });
    }
    return { status: res.status, finalUrl: res.url };
  } catch (e) {
    return { status: 0, error: e.name === 'AbortError' ? 'timeout' : e.message.slice(0, 60) };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Bot-walled statuses. Udemy and LinkedIn front their pages with Cloudflare
 * ("Performing security verification"), so a 403/999 from them says nothing
 * about whether the link works for a person. Reporting these as failures makes
 * the check cry wolf, so they are surfaced as UNVERIFIED instead — visible, but
 * not a build-breaker. Verified by hand in a real browser: Udemy shows the
 * challenge page, not a 404.
 */
const BOT_WALLED = new Set([403, 429, 999]);
/** Compare without the fragment: fetch never sends it, so #anchor always "redirects". */
const norm = (u) => (u || '').replace(/#.*$/, '').replace(/\/$/, '');

const links = collect();
console.log(`Checking ${links.length} external links from ${CONTENT}/…\n`);

const results = [];
for (let i = 0; i < links.length; i += CONCURRENCY) {
  const batch = links.slice(i, i + CONCURRENCY);
  const done = await Promise.all(batch.map(async (l) => ({ ...l, ...(await probe(l.url)) })));
  for (const r of done) {
    const ok = r.status >= 200 && r.status < 400;
    const unverified = !ok && BOT_WALLED.has(r.status);
    const redirected = ok && r.finalUrl && norm(r.finalUrl) !== norm(r.url);
    const mark = ok ? (redirected ? '↪' : '✓') : unverified ? '?' : '✗';
    console.log(`${mark} ${String(r.status || r.error).padEnd(8)}${r.url}`);
    if (redirected) console.log(`           → ${r.finalUrl}`);
    results.push({ ...r, ok, unverified, redirected });
  }
}

const failed = results.filter((r) => !r.ok && !r.unverified);
const unverified = results.filter((r) => r.unverified);
const moved = results.filter((r) => r.redirected);
console.log(
  `\n${results.filter((r) => r.ok).length}/${results.length} resolved` +
    (moved.length ? ` · ${moved.length} redirected` : '') +
    (unverified.length ? ` · ${unverified.length} bot-walled (unverified)` : '') +
    (failed.length ? ` · ${failed.length} FAILED` : ''),
);
for (const m of moved) console.log(`  MOVED  ${m.url}\n      -> ${m.finalUrl}`);
for (const u of unverified) console.log(`  UNVERIFIED (${u.status}) ${u.url}`);
for (const f of failed) console.log(`  FAILED ${f.url}\n    in ${f.files.join(', ')}`);
process.exit(failed.length ? 1 : 0);
