#!/usr/bin/env node
/**
 * Per-file coverage floor.
 *
 * Vitest's own `thresholds` check the aggregate, and an aggregate hides things:
 * this repo sat at 97.94% statements while `src/app/layout.tsx`,
 * `src/app/page.tsx` and `src/app/recommendations/page.tsx` were at exactly 0%.
 * Vitest does offer `thresholds.perFile`, but it is all-or-nothing — it applies
 * one number to every file and drops the aggregate check — so it cannot express
 * "95% overall and 90% per file" at the same time. Hence this.
 *
 * Branches are held to a lower floor on purpose. A file with four branch points
 * scores 75% for a single uncovered `?? fallback`, so a high per-file branch
 * floor buys assertions written to move a number rather than to catch a defect.
 * The aggregate branch threshold in vitest.config.ts is the real guard there.
 *
 * Run after `vitest run --coverage` (which writes coverage-summary.json).
 * Exits non-zero naming every file and metric below its floor (CON-VER-005:
 * a check that misdiagnoses is worse than no check).
 */
import { readFileSync } from 'node:fs';
import { resolve, relative } from 'node:path';

const FLOORS = { statements: 90, lines: 90, functions: 90, branches: 70 };

const root = process.cwd();
const summaryPath = resolve(root, 'coverage/coverage-summary.json');

let summary;
try {
  summary = JSON.parse(readFileSync(summaryPath, 'utf8'));
} catch (error) {
  console.error(`coverage-floor: cannot read ${relative(root, summaryPath)} — ${error.message}`);
  console.error('coverage-floor: run `npm run test:coverage` first.');
  process.exit(2);
}

const failures = [];
let checked = 0;

for (const [file, metrics] of Object.entries(summary)) {
  if (file === 'total') continue;
  checked += 1;
  for (const [metric, floor] of Object.entries(FLOORS)) {
    const { pct, total } = metrics[metric];
    // A file with no branches at all reports 100; a file with none of a metric
    // reports 0 with total 0. Neither is a finding.
    if (total === 0) continue;
    if (pct < floor) {
      failures.push({ file: relative(root, file), metric, pct, floor });
    }
  }
}

if (checked === 0) {
  console.error('coverage-floor: the summary contains no files — did the run collect coverage?');
  process.exit(2);
}

if (failures.length > 0) {
  console.error(`coverage-floor: ${failures.length} below the per-file floor\n`);
  const width = Math.max(...failures.map((f) => f.file.length));
  for (const f of failures) {
    console.error(
      `  ${f.file.padEnd(width)}  ${f.metric.padEnd(10)} ${f.pct.toFixed(2)}% < ${f.floor}%`,
    );
  }
  console.error('\nCover them, or state the exemption and why (CON-COV-002).');
  process.exit(1);
}

console.log(
  `coverage-floor: ${checked} files, all at or above ${FLOORS.statements}% ` +
    `statements/lines/functions and ${FLOORS.branches}% branches.`,
);
