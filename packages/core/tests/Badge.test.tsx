import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

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

  it('exposes a named status and calls the removable action', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();

    render(
      <Badge aria-label="Teamfilter" onRemove={onRemove} removeLabel="Teamfilter entfernen">
        Team
      </Badge>,
    );

    expect(screen.getByRole('status', { name: 'Teamfilter' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Teamfilter entfernen' }));
    expect(onRemove).toHaveBeenCalledOnce();
  });

  it('renders on the server', () => {
    expect(renderToString(<Badge tone="danger">Fehler</Badge>)).toContain('Fehler');
  });
});
