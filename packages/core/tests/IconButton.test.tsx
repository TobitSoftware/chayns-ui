import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import IconButton from '../src/components/icon-button/IconButton.js';

describe('IconButton', () => {
  it('uses the explicit accessible name and hides icon content from accessibility', () => {
    render(<IconButton aria-label="Attach file" icon="fa-paperclip" variant="ghost" />);

    const button = screen.getByRole('button', { name: 'Attach file' });
    const icon = button.querySelector('.chayns-button-icon');

    expect(button).toHaveAttribute('type', 'button');
    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(button).toHaveClass('chayns-icon-button--ghost');
  });

  it('supports aria-labelledby, native props and a native ref', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();

    render(
      <>
        <span id="icon-button-label">More options</span>
        <IconButton
          aria-labelledby="icon-button-label"
          className="consumer-class"
          data-purpose="example"
          icon="fa-ellipsis"
          onClick={handleClick}
          ref={ref}
          type="submit"
          variant="outline"
        />
      </>,
    );

    const button = screen.getByRole('button', { name: 'More options' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
    expect(ref.current).toBe(button);
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toHaveAttribute('data-purpose', 'example');
    expect(button).toHaveClass('consumer-class');
  });

  it('renders regular and solid weights from one icon name', () => {
    render(<IconButton aria-label="Favorite" icon="fa-star" variant="primary" />);

    const button = screen.getByRole('button', { name: 'Favorite' });
    const icons = button.querySelectorAll('.chayns-button-icon__weight');

    expect(icons).toHaveLength(2);
    expect(icons[0]?.querySelector('i')).toHaveClass('far', 'fa-star');
    expect(icons[1]).toHaveClass('chayns-button-icon__weight--active');
    expect(icons[1]?.querySelector('i')).toHaveClass('fas', 'fa-star');
  });

  it('renders a Brands icon without Classic weight classes', () => {
    render(<IconButton aria-label="GitHub" icon="fab fa-github" variant="primary" />);

    const icon = screen.getByRole('button', { name: 'GitHub' }).querySelector('i');

    expect(icon).toHaveClass('fab', 'fa-github');
    expect(icon).not.toHaveClass('far');
    expect(icon).not.toHaveClass('fas');
  });

  it('uses native disabled behavior', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <IconButton
        aria-label="Unavailable"
        disabled
        icon="fa-lock"
        onClick={handleClick}
        variant="primary"
      />,
    );

    const button = screen.getByRole('button', { name: 'Unavailable' });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders safely on the server', () => {
    const markup = renderToString(
      <IconButton aria-label="Server icon action" icon="fa-server" variant="ghost" />,
    );

    expect(markup).toContain('<button');
    expect(markup).toContain('aria-label="Server icon action"');
    expect(markup).toContain('fa-server');
  });
});
