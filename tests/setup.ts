import '@testing-library/jest-dom/vitest';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

// jest-axe matcher (toHaveNoViolations) for Vitest's expect.
expect.extend(toHaveNoViolations);

// jsdom doesn't implement matchMedia; the theme toggle reads it on mount.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
}

afterEach(() => cleanup());

// next/navigation needs a mounted app router, which jsdom doesn't have. The
// components under test only ever call router.push, so a stub is faithful.
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), prefetch: vi.fn() }),
  usePathname: () => '/',
}));
