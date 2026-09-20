import { describe, it, expect } from 'vitest';
import { sanitizeForCard, unsafeGlyphs, UNSAFE_FOR_CARD } from '@/lib/og-text';

/**
 * The substitution table behind the OpenGraph cards. Its whole job is to be
 * narrow: replace what Satori's bundled font genuinely cannot draw, and leave
 * the site's typography alone.
 */
describe('sanitizing card text', () => {
  it('spells out rupee amounts, which the bundled font cannot draw', () => {
    expect(sanitizeForCard('₹7,500 per node')).toBe('Rs 7,500 per node');
    expect(sanitizeForCard('~₹1 crore each')).toBe('~Rs 1 crore each');
    expect(sanitizeForCard('₹ 7,500')).toBe('Rs 7,500');
  });

  it('replaces the approximation sign with ASCII', () => {
    expect(sanitizeForCard('≈0.96 correlation')).toBe('~0.96 correlation');
    expect(sanitizeForCard('≈ 40 parts')).toBe('~40 parts');
  });

  it('leaves typography the font handles exactly as written', () => {
    // Substituting these would degrade the cards to fix a problem that does not
    // exist — the build has never warned about any of them.
    const kept = 'Sanas — a B2C app · “quoted” · ‘single’ · 12×3 · 5µm · A → B …';
    expect(sanitizeForCard(kept)).toBe(kept);
  });

  it('is a no-op on text that needs nothing', () => {
    expect(sanitizeForCard('')).toBe('');
    expect(sanitizeForCard('plain ASCII only')).toBe('plain ASCII only');
  });
});

describe('detecting glyphs a card cannot render', () => {
  it('names each offending character', () => {
    expect(unsafeGlyphs('₹7,500 and ≈0.96')).toEqual(['₹', '≈']);
    expect(unsafeGlyphs('nothing wrong here')).toEqual([]);
  });

  it('catches the rest of the currency block, not just the rupee', () => {
    // The rupee proves the block is unsupported; a euro would fail identically.
    for (const glyph of ['€', '₩', '₽', '₦']) {
      expect(UNSAFE_FOR_CARD.test(glyph), glyph).toBe(true);
    }
    // The dollar sign is ASCII and renders fine.
    expect(UNSAFE_FOR_CARD.test('$')).toBe(false);
  });

  it('finds nothing to complain about once the text is sanitised', () => {
    expect(unsafeGlyphs(sanitizeForCard('₹7,500, ≈0.96, 12×3, A → B'))).toEqual([]);
  });
});
