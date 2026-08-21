import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from './Button.js';
import IconButton from './IconButton.js';

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

  it('renders safely on the server', () => {
    const markup = renderToString(<Button variant="primary">Server action</Button>);

    expect(markup).toContain('<button');
    expect(markup).toContain('type="button"');
    expect(markup).toContain('Server action');
  });
});

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
