import { describe, it, expect } from 'vitest';
import { contentSecurityPolicy, META_CANNOT_SET } from '@/lib/csp';

/**
 * GitHub Pages cannot set response headers, so the only lever this site has is
 * a <meta http-equiv> policy. Several directives are ignored in meta by spec —
 * frame-ancestors, report-uri, sandbox — and X-Content-Type-Options has no meta
 * form at all. Those are recorded rather than pretended (proposed fleet-wide in vivekanandba/constitution#5), and this
 * pins both what the policy says and what it honestly cannot do.
 */
function directives(policy: string): Record<string, string[]> {
  return Object.fromEntries(
    policy
      .split(';')
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => {
        const [name, ...values] = part.split(/\s+/);
        return [name, values];
      }),
  );
}

describe('the content security policy', () => {
  const policy = contentSecurityPolicy({});
  const d = directives(policy);

  it('defaults to self and forbids plugins outright', () => {
    expect(d['default-src']).toEqual(["'self'"]);
    expect(d['object-src']).toEqual(["'none'"]);
  });

  it('pins the things an injection would reach for', () => {
    // A rewritten <base> or a retargeted form is how an injected tag exfiltrates.
    expect(d['base-uri']).toEqual(["'self'"]);
    expect(d['form-action']).toEqual(["'self'"]);
  });

  it('allows no off-origin connection by default', () => {
    // The built output loads nothing off-origin; every external URL is a link.
    expect(d['connect-src']).toEqual(["'self'"]);
    expect(d['script-src']).not.toContain('https://gc.zgo.at');
  });

  it('permits the inline script Next emits, and says so rather than pretending', () => {
    // Next inlines the RSC payload and the pre-paint theme script, and a meta
    // policy cannot carry a nonce. This is the honest cost of static export.
    expect(d['script-src']).toContain("'self'");
    expect(d['script-src']).toContain("'unsafe-inline'");
    expect(d['style-src']).toContain("'unsafe-inline'");
  });

  it('allows data: images and fonts, which the icons and next/font need', () => {
    expect(d['img-src']).toContain('data:');
    expect(d['font-src']).toContain('data:');
  });

  it('opens exactly the two analytics origins when a site code is configured', () => {
    const withAnalytics = directives(contentSecurityPolicy({ goatCounterCode: 'testsite' }));
    expect(withAnalytics['script-src']).toContain('https://gc.zgo.at');
    expect(withAnalytics['connect-src']).toContain('https://testsite.goatcounter.com');
    // And nothing else moved.
    expect(withAnalytics['default-src']).toEqual(["'self'"]);
    expect(withAnalytics['object-src']).toEqual(["'none'"]);
  });

  it('carries no directive a meta tag would silently ignore', () => {
    // A policy that lists frame-ancestors in meta reads as clickjacking
    // protection and provides none. Better absent and recorded.
    for (const ignored of META_CANNOT_SET) {
      expect(policy, `${ignored} is ignored in a meta policy`).not.toContain(ignored);
    }
  });

  it('is a single line, since it goes in an attribute', () => {
    expect(policy).not.toContain('\n');
    expect(policy.trim()).toBe(policy);
  });
});
