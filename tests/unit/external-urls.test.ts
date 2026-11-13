import { describe, it, expect } from 'vitest';
import { linkSchema, projectSchema, certificationSchema } from '../../src/content/schema';

/**
 * Every external link field renders as an <a href>. A string that merely parses
 * as a URL is not enough: `javascript:` parses, and both zod 3 and zod 4 accepted
 * it here until 2026-11-13 (SPEC-0002 R9). Content is authored, not submitted,
 * so this guards against a slip rather than an attacker — but a slip that ships
 * a script link is still a script link.
 */
const BAD = [
  'javascript:alert(1)',
  'data:text/html,<b>x</b>',
  'vbscript:msgbox(1)',
  'file:///etc/passwd',
];
const GOOD = ['https://example.com/a?b=c', 'http://example.org'];

describe('external URL fields accept only http(s)', () => {
  const fields = {
    'link.href': (v: string) => linkSchema.safeParse({ label: 'x', href: v }).success,
    'project.href': (v: string) => projectSchema.shape.href.safeParse(v).success,
    'certification.url': (v: string) => certificationSchema.shape.url.safeParse(v).success,
  };

  for (const [name, accepts] of Object.entries(fields)) {
    it.each(BAD)(`${name} refuses %s`, (v) => expect(accepts(v)).toBe(false));
    it.each(GOOD)(`${name} accepts %s`, (v) => expect(accepts(v)).toBe(true));
  }
});
