import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Badge from '../src/components/badge/Badge.js';

describe('Badge', () => {
  it('renders Bodywork status geometry and native span props', () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <Badge className="consumer-class" data-purpose="status" ref={ref} tone="success">
        Gesendet
      </Badge>,
    );

    const badge = screen.getByText('Gesendet').parentElement;
    expect(badge).toBe(ref.current);
    expect(badge).toHaveClass('chayns-badge', 'chayns-badge--success', 'consumer-class');
    expect(badge).toHaveAttribute('data-purpose', 'status');
  });

  it('exposes a named status without introducing an interactive control', () => {
    render(<Badge aria-label="Teamfilter">Team</Badge>);
    expect(screen.getByRole('status', { name: 'Teamfilter' })).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders on the server', () => {
    expect(renderToString(<Badge tone="danger">Fehler</Badge>)).toContain('Fehler');
  });
});
