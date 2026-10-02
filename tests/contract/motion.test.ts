import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * SPEC-0011 R11: anything that moves is guarded, and everything quick stays
 * quick. Read from the classes and the stylesheet rather than remembered.
 */
function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : /\.tsx?$/.test(f) ? [p] : [];
  });
}
const files = [...walk('src/components'), ...walk('src/app')];
const css = readFileSync('src/app/globals.css', 'utf8');

describe('movement is guarded', () => {
  it('every translate, rotate, scale or keyframe utility in a component runs under motion-safe', () => {
    const offenders: string[] = [];
    for (const f of files) {
      for (const cls of readFileSync(f, 'utf8').match(
        /[\w:/-]*(?:-translate-|translate-|rotate-|scale-|animate-)[\w/.-]+/g,
      ) ?? []) {
        // The scroll reveal's entrance is the one keyframe the reduced-motion block switches off by name.
        if (cls.startsWith('motion-safe:') || cls === 'animate-fade-up') continue;
        offenders.push(`${f}: ${cls}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it('every custom animation class the stylesheet defines is switched off under reduced motion', () => {
    const reduced = css.slice(css.indexOf('prefers-reduced-motion'));
    for (const cls of ['icon-in', 'palette-backdrop', 'palette-panel', 'disclosure', 'arc-draw']) {
      expect(css.includes(`.${cls}`), `${cls} is defined`).toBe(true);
      expect(reduced.includes(`.${cls}`), `${cls} is stilled under reduced motion`).toBe(true);
    }
  });
});

describe('quick things stay quick', () => {
  it('no component asks for a duration over 300ms', () => {
    const slow: string[] = [];
    for (const f of files) {
      for (const m of readFileSync(f, 'utf8').matchAll(/duration-(\d+)/g)) {
        if (Number(m[1]) > 300) slow.push(`${f}: ${m[0]}`);
      }
    }
    expect(slow).toEqual([]);
  });

  it('every transition or animation in the stylesheet is 300ms or less, except the two named', () => {
    // The scroll reveal (600ms) predates the rule; the arc's wipe is the one
    // set-piece (SPEC-0006 R10). Both are allowed by selector, nothing else is.
    const allowed = /\.reveal|\.arc-draw/;
    const slow: string[] = [];
    for (const block of css.split('}')) {
      const selector = block.slice(0, block.indexOf('{')).trim().split('\n').pop() ?? '';
      for (const m of block.matchAll(/(?:transition|animation)[^;]*?(\d*\.?\d+)s/g)) {
        if (Number(m[1]) > 0.3 && !allowed.test(selector)) slow.push(`${selector}: ${m[0]}`);
      }
    }
    expect(slow).toEqual([]);
  });
});
