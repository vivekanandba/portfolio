#!/usr/bin/env node
/**
 * Dependency audit, reported as two trees rather than one number.
 *
 * A single count misleads, and so does the tool's own split. On 2026-09-20 this
 * repo had 26 advisories and `npm audit --omit=dev` called 6 of them production.
 * All six descend from `next`, so npm was right about the dependency graph — and
 * none of their code reaches the built output. Being in the production tree is
 * not the same as reaching a browser, and on a static export the gap is total.
 *
 *   production  — installed by anyone who installs this package. Fails on high.
 *   development — everything else. It never reaches a browser, but it executes
 *                 with real credentials on a developer's machine and in CI,
 *                 which is the live supply-chain path and the one that looks
 *                 harmless. Fails on critical, reports the rest.
 *
 * An advisory that cannot be patched here is listed in security/audit-allowlist.json
 * with the reason it cannot reach anyone (CON-SEC-003). This fails if such an
 * entry no longer matches a reported advisory, so the list cannot outlive what it
 * excuses.
 *
 * Exits non-zero naming each blocking advisory and its tree (CON-VER-005).
 */
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const ORDER = ['info', 'low', 'moderate', 'high', 'critical'];
const TREES = [
  { name: 'production', failFrom: 'high' },
  { name: 'development', failFrom: 'critical' },
];

/** npm audit exits non-zero whenever it finds anything, so its status is not the signal. */
function audit(args) {
  try {
    return JSON.parse(execFileSync('npm', ['audit', '--json', ...args], { encoding: 'utf8' }));
  } catch (error) {
    if (error.stdout) return JSON.parse(error.stdout);
    throw error;
  }
}

const allowlist = JSON.parse(readFileSync('security/audit-allowlist.json', 'utf8')).allowed;
const allowed = new Map(allowlist.map((a) => [`${a.tree}:${a.advisory}`, a]));
const matched = new Set();

const production = audit(['--omit=dev']).vulnerabilities ?? {};
const everything = audit([]).vulnerabilities ?? {};

let failed = false;

for (const tree of TREES) {
  // Each advisory is attributed to exactly one tree: development is what the
  // full audit reports minus what the production tree already claimed.
  const entries = Object.entries(tree.name === 'production' ? production : everything).filter(
    ([name]) => (tree.name === 'production' ? true : !(name in production)),
  );

  const threshold = ORDER.indexOf(tree.failFrom);
  const counts = ORDER.map((s) => [s, entries.filter(([, v]) => v.severity === s).length])
    .filter(([, n]) => n > 0)
    .map(([s, n]) => `${n} ${s}`)
    .join(', ');

  console.log(
    `\n${tree.name}: ${entries.length} advisor${entries.length === 1 ? 'y' : 'ies'}` +
      `${counts ? ` (${counts})` : ''} — fails on ${tree.failFrom} and above`,
  );

  const blocking = [];
  for (const [name, v] of entries) {
    const key = `${tree.name}:${name}`;
    const exemption = allowed.get(key);
    const blocks = ORDER.indexOf(v.severity) >= threshold;
    if (exemption) matched.add(key);

    const title = v.via?.find((x) => typeof x === 'object')?.title ?? v.via?.[0] ?? '';
    if (blocks && exemption) {
      console.log(`  allowed  ${name} (${v.severity}) — reviewed ${exemption.reviewed}`);
      console.log(`           ${exemption.reason}`);
    } else if (blocks) {
      blocking.push(name);
      console.log(`  FAIL     ${name} (${v.severity})${title ? ` — ${title}` : ''}`);
    } else {
      console.log(`  note     ${name} (${v.severity})${title ? ` — ${title}` : ''}`);
    }
  }

  if (blocking.length > 0) {
    failed = true;
    console.error(
      `\n${tree.name}: ${blocking.length} at or above ${tree.failFrom} with no recorded exemption. ` +
        `Patch them, or add one to security/audit-allowlist.json with the reason (CON-SEC-003).`,
    );
  }
}

// An exemption that no longer matches an advisory is a claim about a risk that
// is gone. Leaving it is how a list of exceptions becomes permanent.
const stale = [...allowed.keys()].filter((k) => !matched.has(k));
if (stale.length > 0) {
  failed = true;
  console.error(
    `\nstale exemptions — these no longer match any reported advisory, so remove them:\n` +
      stale.map((k) => `  ${k}`).join('\n'),
  );
}

if (!failed) {
  console.log(
    `\nBoth trees are within their thresholds, with ${matched.size} recorded exemption${
      matched.size === 1 ? '' : 's'
    }.`,
  );
}
process.exit(failed ? 1 : 0);
