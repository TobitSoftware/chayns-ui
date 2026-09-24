import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Progress from '../src/components/progress/Progress.js';

describe('Progress', () => {
  it('renders a labelled progressbar with visible and semantic percentage values', () => {
    render(<Progress label="Upload" value={64} />);

    const progressbar = screen.getByRole('progressbar', { name: 'Upload' });
    expect(screen.getByText('64 %')).toBeInTheDocument();
    expect(progressbar).toHaveAttribute('aria-valuemin', '0');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(progressbar).toHaveAttribute('aria-valuenow', '64');
    expect(progressbar).toHaveAttribute('aria-valuetext', '64 %');
    expect(progressbar.querySelector('.chayns-progress__fill')).toHaveStyle({ width: '64%' });
  });

  it.each([
    [64.5, 65],
    [-5, 0],
    [120, 100],
    [Number.NaN, 0],
    [Infinity, 100],
    [-Infinity, 0],
  ])('normalizes %s to %s', (value, expectedValue) => {
    render(<Progress label="Upload" value={value} />);

    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', String(expectedValue));
    expect(screen.getByText(`${expectedValue} %`)).toBeInTheDocument();
  });

  it('forwards direct props and refs to the progressbar and root props to the layout root', () => {
    const ref = createRef<HTMLDivElement>();
    const rootRef = createRef<HTMLDivElement>();
    const handleClick = vi.fn();

    render(
      <Progress
        className="consumer-bar"
        data-testid="progressbar"
        label="Upload"
        onClick={handleClick}
        ref={ref}
        rootProps={{ className: 'consumer-root', 'data-testid': 'progress-root', ref: rootRef }}
        value={64}
      />,
    );

    const progressbar = screen.getByTestId('progressbar');
    const root = screen.getByTestId('progress-root');
    expect(progressbar).toBe(ref.current);
    expect(root).toBe(rootRef.current);
    expect(progressbar).toHaveClass('chayns-progress__bar', 'consumer-bar');
    expect(root).toHaveClass('chayns-progress', 'consumer-root');

    fireEvent.click(progressbar);
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders on the server without a focus target', () => {
    const html = renderToString(<Progress label="Upload" value={64} />);
    expect(html).toContain('role="progressbar"');
    expect(html).not.toContain('tabindex');
  });
});
