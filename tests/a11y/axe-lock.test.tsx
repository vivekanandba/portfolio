import { it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { runAxe } from '../fixtures/axe';

it('a second axe run waits for one still in flight instead of failing (SPEC-0001 R10)', async () => {
  const { container } = render(
    <main>
      <h1>One</h1>
      <p>Two</p>
    </main>,
  );
  // An abandoned run, as a timed-out test leaves behind: started, never awaited by its caller.
  const abandoned = runAxe(container);
  await expect(runAxe(container)).resolves.toBeDefined();
  await abandoned;
});

it('without the queue, the same overlap throws — the failure the queue prevents', async () => {
  const { container } = render(<p>x</p>);
  const first = axe(container);
  await expect(axe(container)).rejects.toThrow(/already running/i);
  await first;
});
