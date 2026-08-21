import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from './Button';
import IconButton from './IconButton';

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

  it('renders safely on the server', () => {
    const markup = renderToString(<Button variant="primary">Server action</Button>);

    expect(markup).toContain('<button');
    expect(markup).toContain('type="button"');
    expect(markup).toContain('Server action');
  });
});

describe('IconButton', () => {
  it('uses the explicit accessible name and hides icon content from accessibility', () => {
    render(<IconButton aria-label="Attach file" icon={<span>regular</span>} variant="ghost" />);

    const button = screen.getByRole('button', { name: 'Attach file' });
    const iconWrapper = button.querySelector('.chayns-icon-button__icon');

    expect(button).toHaveAttribute('type', 'button');
    expect(iconWrapper).toHaveAttribute('aria-hidden', 'true');
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
          icon={<span>regular</span>}
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

  it('renders regular and active icons as decorative paired slots', () => {
    render(
      <IconButton
        activeIcon={<span>solid</span>}
        aria-label="Favorite"
        icon={<span>regular</span>}
        variant="primary"
      />,
    );

    const button = screen.getByRole('button', { name: 'Favorite' });
    const icons = button.querySelectorAll('.chayns-icon-button__icon');

    expect(button).toHaveClass('chayns-icon-button--paired');
    expect(icons).toHaveLength(2);
    expect(icons[0]).toHaveAttribute('aria-hidden', 'true');
    expect(icons[1]).toHaveClass('chayns-icon-button__icon--active');
  });

  it.each([undefined, null])('uses one icon when the active pair is %s', (activeIcon) => {
    render(
      <IconButton
        activeIcon={activeIcon}
        aria-label="Settings"
        icon={<span>regular</span>}
        variant="danger"
      />,
    );

    const button = screen.getByRole('button', { name: 'Settings' });

    expect(button.querySelectorAll('.chayns-icon-button__icon')).toHaveLength(1);
    expect(button).not.toHaveClass('chayns-icon-button--paired');
  });

  it('uses native disabled behavior', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <IconButton
        aria-label="Unavailable"
        disabled
        icon={<span>regular</span>}
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
      <IconButton aria-label="Server icon action" icon={<span>regular</span>} variant="ghost" />,
    );

    expect(markup).toContain('<button');
    expect(markup).toContain('aria-label="Server icon action"');
  });
});
