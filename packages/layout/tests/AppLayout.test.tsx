import { createRef } from 'react';
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
      <AppLayout.Footer>
        <button type="button">Einstellungen</button>
        <AppLayout.CollapseToggle collapseLabel="Einklappen" expandLabel="Ausklappen" />
      </AppLayout.Footer>
      <AppLayout.Content>Inhalt</AppLayout.Content>
    </AppLayout>
  );
}
describe('AppLayout', () => {
  it('renders named semantic parts', () => {
    render(<Example />);
    expect(screen.getByRole('navigation', { name: 'Hauptnavigation' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Inhalt');
    expect(document.querySelector('.chayns-app-layout__footer')).toHaveTextContent('Einstellungen');
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
  it('forwards anchor props and refs and names rich-label disclosures', () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <AppLayout>
        <AppLayout.Navigation>
          <AppLayout.Navigation.Item
            href="/calendar"
            label="Calendar"
            ref={ref}
            target="_blank"
            rel="noreferrer"
          />
          <AppLayout.Navigation.Item label={<span>Reports</span>}>
            <AppLayout.Navigation.Item label="Monthly" />
          </AppLayout.Navigation.Item>
        </AppLayout.Navigation>
      </AppLayout>,
    );
    expect(screen.getByRole('link', { name: 'Calendar' })).toBe(ref.current);
    expect(ref.current).toHaveAttribute('target', '_blank');
    expect(ref.current).toHaveAttribute('rel', 'noreferrer');
    expect(screen.getByRole('button', { name: 'Reports', expanded: false })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  });

  it('rejects Navigation.Item outside Navigation', () => {
    expect(() => render(<AppLayout.Navigation.Item label="X" />)).toThrow(
      'AppLayout.Navigation.Item must be rendered within AppLayout.Navigation.',
    );
  });

  it('places Footer content and CollapseToggle in the sidebar footer', async () => {
    const user = userEvent.setup();
    render(<Example />);

    const footer = document.querySelector('.chayns-app-layout__footer');
    expect(footer).not.toBeNull();
    expect(footer).toContainElement(screen.getByRole('button', { name: 'Einstellungen' }));
    expect(
      screen.getByRole('button', { name: 'Einklappen' }).closest('.chayns-app-layout__sidebar'),
    ).not.toBeNull();
    await user.click(screen.getByRole('button', { name: 'Einklappen' }));
    expect(screen.getByRole('button', { name: 'Ausklappen' })).toBeInTheDocument();
    expect(
      document.querySelector(
        '.chayns-app-layout--collapsed .chayns-app-layout__footer > :not(.chayns-app-layout__collapse)',
      ),
    ).toBe(screen.getByRole('button', { name: 'Einstellungen' }));
  });
});
