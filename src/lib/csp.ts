/**
 * The site's Content-Security-Policy, as a `<meta http-equiv>` value.
 *
 * GitHub Pages cannot set response headers (SPEC-0002), so a meta tag is the
 * only lever this site has. That costs real protection and the honest thing is
 * to name it rather than ship a policy that looks stronger than it is:
 *
 *   - `frame-ancestors`, `report-uri` and `sandbox` are **ignored** in a meta
 *     policy by specification. Listing them would read as clickjacking
 *     protection and provide none, so they are absent and recorded instead.
 *   - `X-Content-Type-Options` has no meta form at all.
 *   - A meta policy cannot carry a nonce, and Next inlines both the RSC payload
 *     and the pre-paint theme script, so `script-src` needs `'unsafe-inline'`.
 *
 * What remains is still worth having. The built output loads nothing off-origin
 * — every external URL on the site is a link, not a resource — so `default-src`,
 * `connect-src`, `base-uri`, `form-action` and `object-src` can all be tight,
 * and those are what an injected tag reaches for when it tries to phone home.
 */

/** Directives a meta policy silently ignores; asserted absent by the tests. */
export const META_CANNOT_SET = ['frame-ancestors', 'report-uri', 'report-to', 'sandbox'] as const;

const GOATCOUNTER_SCRIPT = 'https://gc.zgo.at';

export function contentSecurityPolicy({ goatCounterCode }: { goatCounterCode?: string }): string {
  const script = ["'self'", "'unsafe-inline'"];
  const connect = ["'self'"];

  // Analytics is opt-in at build time. When it is off, nothing off-origin is
  // permitted at all; when it is on, exactly its two origins open.
  if (goatCounterCode) {
    script.push(GOATCOUNTER_SCRIPT);
    connect.push(`https://${goatCounterCode}.goatcounter.com`);
  }

  const directives: [string, string[]][] = [
    ['default-src', ["'self'"]],
    ['script-src', script],
    // next/font injects a <style> element; Tailwind ships as a file.
    ['style-src', ["'self'", "'unsafe-inline'"]],
    ['img-src', ["'self'", 'data:']],
    ['font-src', ["'self'", 'data:']],
    ['connect-src', connect],
    ['base-uri', ["'self'"]],
    ['form-action', ["'self'"]],
    ['object-src', ["'none'"]],
    ['upgrade-insecure-requests', []],
  ];

  return directives
    .map(([name, values]) => (values.length ? `${name} ${values.join(' ')}` : name))
    .join('; ');
}
