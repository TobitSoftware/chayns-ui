import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from '../src/components/button/Button.js';

describe('Button', () => {
  it('renders one named native button with a safe default type', () => {
    const { container } = render(<Button variant="primary">Create</Button>);
    const button = screen.getByRole('button', { name: 'Create' });

    expect(container.children).toHaveLength(1);
    expect(button).toHaveAttribute('type', 'button');
    expect(button).toHaveClass('chayns-button', 'chayns-button--primary');
  });

  it.each(['submit', 'reset'] as const)('preserves an explicit %s type', (type) => {
    render(
      <Button type={type} variant="outline">
        Continue
      </Button>,
    );

    expect(screen.getByRole('button', { name: 'Continue' })).toHaveAttribute('type', type);
  });

  it('forwards native props, events, data, aria, className and ref', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const ref = createRef<HTMLButtonElement>();

    render(
      <Button
        aria-describedby="description"
        className="consumer-class"
        data-purpose="example"
        onClick={handleClick}
        ref={ref}
        variant="ghost"
      >
        Options
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Options' });
    await user.click(button);

    expect(handleClick).toHaveBeenCalledOnce();
    expect(ref.current).toBe(button);
    expect(button).toHaveClass('consumer-class', 'chayns-button--ghost');
    expect(button).toHaveAttribute('data-purpose', 'example');
    expect(button).toHaveAttribute('aria-describedby', 'description');
  });

  it('uses native disabled behavior', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <Button disabled onClick={handleClick} variant="danger">
        Delete
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Delete' });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it.each(['primary', 'outline', 'ghost', 'danger'] as const)(
    'exposes the documented %s style hook',
    (variant) => {
      render(<Button variant={variant}>Action</Button>);

      expect(screen.getByRole('button', { name: 'Action' })).toHaveClass(
        `chayns-button--${variant}`,
      );
    },
  );

  it('renders an optional leading icon with internally managed weights', () => {
    render(
      <Button icon="fa-plus" variant="primary">
        Create
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Create' });
    const icon = button.querySelector('.chayns-button-icon');

    expect(icon).toHaveAttribute('aria-hidden', 'true');
    expect(icon?.children).toHaveLength(2);
    expect(icon?.children[0]?.querySelector('i')).toHaveClass('far', 'fa-plus');
    expect(icon?.children[1]).toHaveClass('chayns-button-icon__weight--active');
    expect(icon?.children[1]?.querySelector('i')).toHaveClass('fas', 'fa-plus');
  });

  it('renders a Brands icon without Classic weight classes', () => {
    render(
      <Button icon="fab fa-github" variant="primary">
        Open GitHub
      </Button>,
    );

    const icon = screen.getByRole('button', { name: 'Open GitHub' }).querySelector('i');

    expect(icon).toHaveClass('fab', 'fa-github');
    expect(icon).not.toHaveClass('far');
    expect(icon).not.toHaveClass('fas');
  });

  it('renders safely on the server', () => {
    const markup = renderToString(<Button variant="primary">Server action</Button>);

    expect(markup).toContain('<button');
    expect(markup).toContain('type="button"');
    expect(markup).toContain('Server action');
  });
});
