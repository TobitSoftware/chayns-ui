import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Spinner from '../src/components/spinner/Spinner.js';

describe('Spinner', () => {
  it('renders a decorative spinner and forwards native div props', () => {
    const ref = createRef<HTMLDivElement>();
    const handleClick = vi.fn();

    render(
      <Spinner
        className="consumer-class"
        data-purpose="loading"
        data-testid="spinner"
        onClick={handleClick}
        ref={ref}
      />,
    );

    const spinner = screen.getByTestId('spinner');
    expect(spinner).toBe(ref.current);
    expect(spinner).toHaveClass('chayns-spinner', 'consumer-class');
    expect(spinner).toHaveAttribute('aria-hidden', 'true');
    expect(spinner).toHaveAttribute('data-purpose', 'loading');

    fireEvent.click(spinner);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders on the server without a focus target', () => {
    const html = renderToString(<Spinner data-testid="spinner" />);
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain('tabindex');
  });
});
