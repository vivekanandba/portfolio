import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * WCAG contrast gate for the palette: the accent and both domain hues are used
 * for small text (track labels, arc numerals), so they must hold >=4.5:1
 * against paper in BOTH color schemes. Locks the hex values against drift.
 */

const css = readFileSync(join(__dirname, '../src/app/globals.css'), 'utf8');

function parseSchemeVars(block: string): Record<string, [number, number, number]> {
  const vars: Record<string, [number, number, number]> = {};
  for (const m of block.matchAll(/--c-([a-z-]+):\s*(\d+)\s+(\d+)\s+(\d+)/g)) {
    vars[m[1]] = [Number(m[2]), Number(m[3]), Number(m[4])];
  }
  return vars;
}

const darkStart = css.indexOf('@media (prefers-color-scheme: dark)');
if (darkStart === -1) throw new Error('dark scheme block not found in globals.css');
const light = parseSchemeVars(css.slice(0, darkStart));
const darkEnd = css.indexOf('}', css.indexOf('}', css.indexOf('{', darkStart) + 1) + 1);
const dark = parseSchemeVars(css.slice(darkStart, darkEnd));

function luminance([r, g, b]: [number, number, number]) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrast(a: [number, number, number], b: [number, number, number]) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

const SMALL_TEXT_TOKENS = ['accent', 'domain-aero', 'domain-health', 'muted'] as const;

describe.each([
  ['light', light],
  ['dark', dark],
] as const)('%s scheme', (_name, vars) => {
  it('defines paper and all small-text tokens', () => {
    expect(vars.paper).toBeDefined();
    for (const t of SMALL_TEXT_TOKENS) expect(vars[t], t).toBeDefined();
  });

  it.each(SMALL_TEXT_TOKENS)('%s holds >=4.5:1 on paper', (token) => {
    expect(contrast(vars[token], vars.paper)).toBeGreaterThanOrEqual(4.5);
  });
});
