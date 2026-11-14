import { expect } from 'vitest';
import { axe } from 'jest-axe';

/**
 * axe-core allows one run at a time per process and throws "Axe is already
 * running" at the next caller. A run outlives a test that timed out on it, so
 * one slow page used to fail every test after it in the file with that message
 * — eleven misleading failures for one real one (CON-VER-005, CON-VER-008).
 * Each run now waits for the previous one to settle before it starts, so a
 * timeout fails only the test that was slow (SPEC-0001 R10).
 */
let previous: Promise<unknown> = Promise.resolve();

export function runAxe(container: Element) {
  // Chained synchronously: assigning `previous` after an await let two calls
  // made back to back both wait on the same settled promise and collide.
  const run = previous.catch(() => undefined).then(() => axe(container));
  previous = run;
  return run;
}

export async function expectNoViolations(container: HTMLElement) {
  expect(await runAxe(container)).toHaveNoViolations();
}
