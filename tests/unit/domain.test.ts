import { describe, it, expect } from 'vitest';
import { domainColor, domainLabel } from '@/lib/domain';

describe('domainColor', () => {
  it('gives every class a complete literal, and the neutral set to a missing domain', () => {
    expect(domainColor('aerospace').fill).toBe('fill-domain-aero');
    expect(domainColor(undefined)).toEqual(domainColor('rail'));
  });
});

describe('domainLabel', () => {
  it('names a known domain the way the hero writes it, and has a word for none', () => {
    expect(domainLabel('healthcare-robotics')).toBe('Healthcare Robotics');
    expect(domainLabel('ai-native')).toBe('AI-Native');
    expect(domainLabel(undefined)).toBe('Other');
  });
});
