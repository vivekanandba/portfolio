import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Nav } from '@/components/Nav';

describe('Nav mobile menu', () => {
  it('toggles the menu and aria-expanded on button click', () => {
    render(<Nav />);
    const button = screen.getByRole('button', { name: /open menu/i });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('list', { name: '' })).toBeTruthy(); // desktop list always in DOM

    fireEvent.click(button);
    expect(screen.getByRole('button', { name: /close menu/i })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(document.getElementById('mobile-menu')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });

  it('closes the menu when a link is clicked', () => {
    render(<Nav />);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    const menu = document.getElementById('mobile-menu')!;
    const skillsLink = Array.from(menu.querySelectorAll('a')).find(
      (a) => a.textContent === 'Skills',
    )!;
    fireEvent.click(skillsLink);
    expect(document.getElementById('mobile-menu')).not.toBeInTheDocument();
  });
});
