import '@testing-library/jest-dom/vitest';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import { toHaveNoViolations } from 'jest-axe';

// jest-axe matcher (toHaveNoViolations) for Vitest's expect.
expect.extend(toHaveNoViolations);

afterEach(() => cleanup());
