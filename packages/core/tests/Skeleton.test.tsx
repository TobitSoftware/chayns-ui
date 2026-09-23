import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Skeleton from '../src/components/skeleton/Skeleton.js';

describe('Skeleton', () => {
  it('renders a rounded decorative placeholder by default and forwards native div props', () => {
    const ref = createRef<HTMLDivElement>();
    const handleClick = vi.fn();

    render(
      <Skeleton
        className="consumer-class"
        data-purpose="placeholder"
        data-testid="skeleton"
        onClick={handleClick}
        ref={ref}
        style={{ height: 24, width: 120 }}
      />,
    );

    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBe(ref.current);
    expect(skeleton).toHaveClass('chayns-skeleton', 'chayns-skeleton--rounded', 'consumer-class');
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');
    expect(skeleton).toHaveAttribute('data-purpose', 'placeholder');
    expect(skeleton).toHaveStyle({ height: '24px', width: '120px' });

    fireEvent.click(skeleton);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it.each(['square', 'rounded', 'circular'] as const)('renders the %s shape', (shape) => {
    render(<Skeleton data-testid="skeleton" shape={shape} />);
    expect(screen.getByTestId('skeleton')).toHaveClass(`chayns-skeleton--${shape}`);
  });

  it('renders on the server without children or a focus target', () => {
    const html = renderToString(<Skeleton data-testid="skeleton" />);
    expect(html).toContain('aria-hidden="true"');
    expect(html).not.toContain('tabindex');
  });
});
