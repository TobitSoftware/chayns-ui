import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AppLayout } from '../src/components/app-layout/AppLayout.js';

function Example({
  onCollapsedChange = vi.fn(),
}: {
  onCollapsedChange?: (value: boolean) => void;
}) {
  return (
    <AppLayout onCollapsedChange={onCollapsedChange}>
      <AppLayout.Header>
        <AppLayout.Logo src="/logo.svg" />
      </AppLayout.Header>
      <AppLayout.Navigation aria-label="Hauptnavigation">
        <AppLayout.Navigation.Item label="Posteingang">
          <AppLayout.Navigation.Item label="Gelesen" />
        </AppLayout.Navigation.Item>
        <AppLayout.Navigation.Item href="#calendar" isActive label="Kalender" />
      </AppLayout.Navigation>
      <AppLayout.CollapseToggle collapseLabel="Einklappen" expandLabel="Ausklappen" />
      <AppLayout.Content>Inhalt</AppLayout.Content>
    </AppLayout>
  );
}
describe('AppLayout', () => {
  it('renders named semantic parts', () => {
    render(<Example />);
    expect(screen.getByRole('navigation', { name: 'Hauptnavigation' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Inhalt');
    expect(screen.getByRole('presentation')).toHaveAttribute('alt', '');
  });
  it('keeps disclosures closed initially and supports collapse', async () => {
    const user = userEvent.setup();
    const onCollapsedChange = vi.fn();
    render(<Example onCollapsedChange={onCollapsedChange} />);
    expect(screen.queryByRole('button', { name: 'Gelesen' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Posteingang', expanded: false }));
    expect(screen.getByRole('button', { name: 'Gelesen' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Einklappen' }));
    expect(onCollapsedChange).toHaveBeenCalledWith(true);
  });
  it('rejects Navigation.Item outside Navigation', () => {
    expect(() => render(<AppLayout.Navigation.Item label="X" />)).toThrow(
      'AppLayout.Navigation.Item must be rendered within AppLayout.Navigation.',
    );
  });
});
