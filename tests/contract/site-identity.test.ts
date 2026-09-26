import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';

/**
 * The marks, and the typeface they are cut from.
 *
 * This is a contract test rather than a unit test because none of it is code:
 * it asserts that committed binary files are the right shape and that the font
 * they were generated from is present with its licence. The site had no favicon
 * at all until now, and nothing anywhere would have said so — that absence is
 * the whole reason SPEC-0004 exists.
 *
 * Byte-for-byte reproducibility is proven by `scripts/make-icons.py --verify`,
 * which needs Python and stays a manual gate like the repo's other generators.
 */
const ROOT = resolve(__dirname, '../..');

/** PNG stores width and height as big-endian uint32 at offsets 16 and 20. */
function pngSize(file: string): { width: number; height: number } {
  const b = readFileSync(file);
  expect(b.subarray(0, 4).toString('hex'), `${file} is a PNG`).toBe('89504e47');
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

describe('the marks', () => {
  it.each([
    ['src/app/icon.png', 32],
    ['src/app/apple-icon.png', 180],
  ])('%s is a square %ipx PNG', (rel, expected) => {
    const { width, height } = pngSize(join(ROOT, rel));
    expect(width).toBe(expected);
    expect(height).toBe(expected);
  });

  it.each([
    ['public/icon-192.png', 192],
    ['public/icon-512.png', 512],
    ['public/icon-512-maskable.png', 512],
  ])('%s is a square %ipx PNG for the manifest', (rel, expected) => {
    const { width, height } = pngSize(join(ROOT, rel));
    expect(width).toBe(expected);
    expect(height).toBe(expected);
  });

  it('the maskable icon differs from the plain one, and carries less ink', () => {
    // Android masks the installed icon into a circle or squircle and crops the
    // rest, so the maskable variant keeps the mark inside the safe zone. Less
    // ink near the edges compresses better — a cheap proxy for "the content
    // shrank" that needs no pixel decoding in a test.
    const plain = readFileSync(join(ROOT, 'public/icon-512.png'));
    const maskable = readFileSync(join(ROOT, 'public/icon-512-maskable.png'));
    expect(maskable.equals(plain)).toBe(false);
    expect(maskable.byteLength).toBeLessThan(plain.byteLength);
  });

  it('public/favicon.ico carries the three legacy sizes', () => {
    const b = readFileSync(join(ROOT, 'public/favicon.ico'));
    // ICO header: reserved(2) type(2) count(2), then 16 bytes per entry whose
    // first two are width and height, with 0 meaning 256.
    expect(b.readUInt16LE(0)).toBe(0);
    expect(b.readUInt16LE(2), 'type 1 is an icon').toBe(1);
    const count = b.readUInt16LE(4);
    const sizes = Array.from({ length: count }, (_, i) => b.readUInt8(6 + i * 16) || 256);
    expect(sizes.sort((a, z) => a - z)).toEqual([16, 32, 48]);
  });

  it('is small enough that it is never the reason a page is slow', () => {
    // A favicon is requested on every cold page load, including the 404.
    for (const rel of ['src/app/icon.png', 'public/favicon.ico']) {
      expect(readFileSync(join(ROOT, rel)).byteLength, rel).toBeLessThan(16 * 1024);
    }
  });
});

describe('the vendored typeface', () => {
  const dir = join(ROOT, 'source/fonts');

  it('is present with its licence beside it', () => {
    // SIL OFL permits redistribution only with the licence. Shipping the font
    // without it is the kind of omission nobody notices until it matters.
    expect(existsSync(dir), 'source/fonts exists').toBe(true);
    const files = readdirSync(dir);
    expect(
      files.some((f) => f.endsWith('.ttf')),
      'a TTF is vendored',
    ).toBe(true);
    expect(files).toContain('OFL.txt');
    expect(readFileSync(join(dir, 'OFL.txt'), 'utf8')).toContain('SIL Open Font License');
  });

  it('never reaches the browser', () => {
    // It is a build input for the icon generator. The site loads Fraunces
    // through next/font; a copy in public/ would ship a second, unused 350 KB.
    for (const d of ['public', 'src']) {
      const stray = readdirSync(join(ROOT, d), { recursive: true, encoding: 'utf8' }).filter((f) =>
        /\.(ttf|otf|woff2?)$/.test(f),
      );
      expect(stray, `no font files under ${d}/`).toEqual([]);
    }
  });
});

describe('the generator', () => {
  it('declares the axes it picks per size, and can verify its own output', () => {
    const src = readFileSync(join(ROOT, 'scripts/make-icons.py'), 'utf8');
    // Rendering a display-grade serif at 16px loses the hairlines entirely, so
    // the optical-size axis is chosen per output size. If that goes, the
    // favicon quietly turns to mush and no test would otherwise notice.
    expect(src).toContain('def axes_for(');
    expect(src).toContain('--verify');
    expect(src).toContain('WONK');
  });

  it('renders each .ico entry natively rather than downsampling the largest', () => {
    // Pillow will happily take one image and a list of sizes, resizing
    // internally — which hands the 16px entry a shrunken copy of the 48px
    // render, display-grade hairlines and all. That is precisely what
    // axes_for() exists to avoid, and it is invisible in the output unless you
    // go looking, so the guard is on the call rather than the pixels.
    const src = readFileSync(join(ROOT, 'scripts/make-icons.py'), 'utf8');
    expect(src).toContain('append_images');
  });
});
