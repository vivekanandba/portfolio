#!/usr/bin/env node
/**
 * Budgets for the built output.
 *
 * Nothing measured the size of what ships. A 3 MB photograph or a runaway
 * bundle would deploy without a word, and the first person to notice would be a
 * reader on a phone (SPEC-0003).
 *
 * Budgets are set a little above today's numbers: tight enough that a mistake
 * trips them, loose enough that ordinary writing does not. Raise one only with
 * the change that needs it, and say why in the commit.
 *
 *   node scripts/size-budget.mjs [--dir out]
 */
import { readdirSync, statSync } from 'node:fs';
import { join, relative, extname } from 'node:path';

const args = process.argv.slice(2);
const DIR = args.includes('--dir') ? args[args.indexOf('--dir') + 1] : 'out';

const KB = 1024;
const MB = 1024 * KB;

const BUDGETS = [
  {
    what: 'total client JavaScript',
    match: (p) => p.includes('_next/static') && extname(p) === '.js',
    limit: 3 * MB,
  },
  {
    what: 'any single image',
    match: (p) => /\.(jpe?g|png|webp|avif)$/i.test(p),
    limit: 600 * KB,
    perFile: true,
  },
  {
    what: 'any single video',
    match: (p) => /\.(mp4|webm)$/i.test(p),
    limit: 2 * MB,
    perFile: true,
  },
  {
    what: 'any single HTML page',
    match: (p) => extname(p) === '.html',
    limit: 800 * KB,
    perFile: true,
  },
  { what: 'the whole site', match: () => true, limit: 60 * MB },
];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
}

let files;
try {
  files = walk(DIR);
} catch (error) {
  console.error(`size-budget: cannot read ${DIR} — ${error.message}`);
  console.error('size-budget: run the build first.');
  process.exit(2);
}

const human = (n) => (n >= MB ? `${(n / MB).toFixed(2)} MB` : `${Math.round(n / KB)} KB`);
const failures = [];

for (const budget of BUDGETS) {
  const matched = files.filter((f) => budget.match(relative(DIR, f)));

  if (budget.perFile) {
    const over = matched
      .map((f) => [relative(DIR, f), statSync(f).size])
      .filter(([, size]) => size > budget.limit)
      .sort((a, b) => b[1] - a[1]);
    const largest = matched.length ? Math.max(...matched.map((f) => statSync(f).size)) : 0;
    console.log(
      `  ${over.length ? 'FAIL' : 'ok  '}  ${budget.what}: largest ${human(largest)} of ${human(budget.limit)} (${matched.length} files)`,
    );
    for (const [name, size] of over)
      failures.push(`${name} is ${human(size)}, over ${human(budget.limit)}`);
  } else {
    const total = matched.reduce((sum, f) => sum + statSync(f).size, 0);
    const over = total > budget.limit;
    console.log(
      `  ${over ? 'FAIL' : 'ok  '}  ${budget.what}: ${human(total)} of ${human(budget.limit)}`,
    );
    if (over) failures.push(`${budget.what} is ${human(total)}, over ${human(budget.limit)}`);
  }
}

if (failures.length > 0) {
  console.error(`\n${failures.length} over budget:\n`);
  for (const f of failures) console.error(`  - ${f}`);
  console.error('\nShrink it, or raise the budget in scripts/size-budget.mjs and say why.');
  process.exit(1);
}
console.log(`\nEvery budget met across ${files.length} files in ${DIR}/.`);
