import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';

/**
 * next/font/google is resolved by the Next compiler, not by Node, so under
 * Vitest `Inter(...)` is not a function. The mock returns the same shape the
 * real loader does — a CSS variable name the layout puts on <html>.
 */
vi.mock('next/font/google', () => ({
  Inter: () => ({ variable: '--font-sans', className: 'mock-inter' }),
  Fraunces: () => ({ variable: '--font-display', className: 'mock-fraunces' }),
}));

/**
 * TourBar and CommandPalette are client components that render nothing until
 * they mount, and next/script with strategy="afterInteractive" is injected by
 * the Next runtime — so none of the three leaves a trace in static markup.
 * Their own behaviour is covered in tests/interaction-layer.test.tsx and
 * tests/tours.test.tsx; what the layout owns is that they are mounted at all,
 * on every page, with the right props. Stubs make that assertable.
 */
const paletteProps: { extra?: { label?: string }[] }[] = [];

vi.mock('@/components/Tours', () => ({
  TourBar: () => <div data-stub="tourbar" />,
}));
vi.mock('@/components/CommandPalette', () => ({
  CommandPalette: (props: { extra?: { label?: string }[] }) => {
    paletteProps.push(props);
    return <div data-stub="palette" />;
  },
}));
vi.mock('next/script', () => ({
  // `strategy` is Next's own prop, not a DOM attribute — spreading it onto a
  // <script> makes React warn and models the component wrongly.
  default: ({ strategy: _strategy, ...rest }: Record<string, string>) => (
    <script data-stub="next-script" {...rest} />
  ),
}));

/**
 * RootLayout renders <html>/<body>, which React 19 refuses to mount inside the
 * <div> Testing Library renders into — the container comes back empty. Server
 * rendering to static markup is both the way that works and the way Next
 * actually uses this component, so it is the faithful test, not a workaround.
 *
 * Fresh module per test so the analytics env var is read at import time.
 */
async function renderLayout() {
  const { default: RootLayout } = await import('@/app/layout');
  const html = renderToStaticMarkup(
    <RootLayout>
      <p data-testid="child">page content</p>
    </RootLayout>,
  );
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return { html, doc };
}

const ORIGINAL = process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;

beforeEach(() => vi.resetModules());
afterEach(() => {
  if (ORIGINAL === undefined) delete process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;
  else process.env.NEXT_PUBLIC_GOATCOUNTER_CODE = ORIGINAL;
});

describe('the root layout', () => {
  it('puts both font variables on <html> and renders its children', async () => {
    const { doc } = await renderLayout();
    const root = doc.documentElement;
    expect(root.getAttribute('lang')).toBe('en');
    expect(root.className).toContain('--font-sans');
    expect(root.className).toContain('--font-display');
    expect(doc.querySelector('[data-testid="child"]')?.textContent).toBe('page content');
  });

  it('opens the body with a skip link to #top', async () => {
    const { doc } = await renderLayout();
    const skip = doc.querySelector('a[href="#top"]');
    expect(skip, 'skip link').not.toBeNull();
    expect(skip!.textContent).toMatch(/skip to content/i);
    // It must be the first link in the body so keyboard users reach it first.
    expect(doc.body.querySelector('a')).toBe(skip);
  });

  it('stamps .js and applies a saved theme before paint, inside a try/catch', async () => {
    const { doc } = await renderLayout();
    const pre = Array.from(doc.querySelectorAll('script')).find((s) =>
      s.innerHTML.includes("classList.add('js')"),
    );
    expect(pre, 'pre-paint script').toBeDefined();
    // Private-mode localStorage throws; the script must not take the page down.
    expect(pre!.innerHTML).toContain('try{');
    expect(pre!.innerHTML).toContain('catch(e){}');
    expect(pre!.innerHTML).toContain("localStorage.getItem('theme')");
  });

  it('emits Person structured data as valid JSON-LD', async () => {
    const { doc } = await renderLayout();
    const ld = doc.querySelector('script[type="application/ld+json"]');
    expect(ld, 'JSON-LD script').not.toBeNull();
    const parsed = JSON.parse(ld!.innerHTML);
    expect(parsed['@type']).toBe('Person');
    expect(parsed.name).toBeTruthy();
  });

  it('mounts the tour bar and the command palette on every page', async () => {
    paletteProps.length = 0;
    const { doc } = await renderLayout();
    expect(doc.querySelector('[data-stub="tourbar"]'), 'tour bar').not.toBeNull();
    expect(doc.querySelector('[data-stub="palette"]'), 'command palette').not.toBeNull();
  });

  it('feeds the palette the archive and writing entries, so search covers them', async () => {
    paletteProps.length = 0;
    await renderLayout();
    expect(paletteProps).toHaveLength(1);
    // Both sources must contribute, or ⌘K silently stops finding half the site.
    expect(paletteProps[0].extra?.length ?? 0).toBeGreaterThan(1);
  });

  it('omits analytics when no site code is configured', async () => {
    delete process.env.NEXT_PUBLIC_GOATCOUNTER_CODE;
    const { html } = await renderLayout();
    expect(html).not.toContain('goatcounter.com');
  });

  it('emits the GoatCounter tag when a site code is configured', async () => {
    process.env.NEXT_PUBLIC_GOATCOUNTER_CODE = 'testsite';
    const { html } = await renderLayout();
    expect(html).toContain('testsite.goatcounter.com');
  });
});

describe('the root layout in a production build', () => {
  it('registers the service worker, at its base-path URL, after load', async () => {
    // Registration is gated on NODE_ENV so `next dev` never caches development
    // pages. Vitest runs as 'test', so the branch is dark unless a test flips it.
    vi.stubEnv('NODE_ENV', 'production');
    try {
      const { html } = await renderLayout();
      expect(html).toContain("'serviceWorker' in navigator");
      expect(html).toMatch(/serviceWorker\.register\("[^"]*\/sw\.js"\)/);
      expect(html).toContain("addEventListener('load'");
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it('does not register one outside production', async () => {
    const { html } = await renderLayout();
    expect(html).not.toContain('serviceWorker.register');
  });
});

describe('the root layout metadata', () => {
  it('exports site metadata and both theme colours', async () => {
    const { metadata, viewport } = await import('@/app/layout');
    expect(metadata.title).toBeTruthy();
    const colors = (viewport.themeColor ?? []) as { media: string; color: string }[];
    expect(colors.map((c) => c.color)).toEqual(['#FAFAF7', '#131316']);
    expect(colors.map((c) => c.media)).toEqual([
      '(prefers-color-scheme: light)',
      '(prefers-color-scheme: dark)',
    ]);
  });
});
