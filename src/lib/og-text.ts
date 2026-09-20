/**
 * Text sanitising for the statically generated OpenGraph cards.
 *
 * next/og renders with Satori and a bundled font. Hand it a glyph that font
 * lacks and it tries to download a dynamic font at build time — which fails in
 * CI (offline, HTTP 400) and leaves the character missing from the card. The
 * build says so, but only as one warning line in an otherwise passing build:
 * the `₹` in the AirCare card's headline metric shipped broken that way until
 * the coverage work surfaced it.
 *
 * Only glyphs with evidence of failing are listed. The font handles em dashes,
 * curly quotes, arrows and the rest of the site's typography perfectly well —
 * substituting those would degrade the cards to fix a problem that isn't there.
 * The evidence is the build log: `₹` is the only glyph it has ever warned about,
 * and `≈` was found the same way before it.
 */

/** Glyphs the bundled font lacks, and the ASCII that reads the same. */
const SUBSTITUTIONS: [RegExp, string][] = [
  [/≈\s*/g, '~'],
  [/₹\s*/g, 'Rs '],
];

export function sanitizeForCard(text: string): string {
  return SUBSTITUTIONS.reduce(
    (out, [pattern, replacement]) => out.replace(pattern, replacement),
    text,
  );
}

/**
 * Glyphs known to break a card. `₹` proves the whole currency block
 * (U+20A0–U+20BF) is unsupported, so a euro or yen would fail the same way and
 * is caught before anyone ships one.
 */
export const UNSAFE_FOR_CARD = /[₠-₿≈]/;

/** Every unrenderable character in a string, for a test that names them. */
export function unsafeGlyphs(text: string): string[] {
  return [...text].filter((ch) => UNSAFE_FOR_CARD.test(ch));
}
