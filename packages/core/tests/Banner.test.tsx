import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Banner from '../src/components/banner/Banner.js';

describe('Banner', () => {
  it('renders Bodywork tone, icon and native aside ownership', () => {
    const ref = createRef<HTMLElement>();

    render(
      <Banner data-purpose="notice" icon="fa-circle-check" ref={ref} tone="success">
        Gespeichert
      </Banner>,
    );

    expect(ref.current).toHaveClass('chayns-banner', 'chayns-banner--success');
    expect(ref.current).toHaveAttribute('data-purpose', 'notice');
    expect(screen.getByText('Gespeichert')).toBeInTheDocument();
  });

  it('closes uncontrolled content and calls the close handlers', async () => {
    const onClose = vi.fn();
    const onOpenChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Banner closeLabel="Meldung schließen" onClose={onClose} onOpenChange={onOpenChange}>
        Hinweis
      </Banner>,
    );

    await user.click(screen.getByRole('button', { name: 'Meldung schließen' }));

    expect(screen.queryByText('Hinweis')).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledOnce();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
