import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs } from '../src/components/tabs/Tabs.js';

function Example({ onValueChange = vi.fn() }: { onValueChange?: (value: string) => void }) {
  return (
    <Tabs defaultValue="one" onValueChange={onValueChange}>
      <Tabs.List aria-label="Bereiche">
        <Tabs.Tab value="one">Eins</Tabs.Tab>
        <Tabs.Tab value="two">Zwei</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="one">Erster Inhalt</Tabs.Panel>
      <Tabs.Panel value="two">Zweiter Inhalt</Tabs.Panel>
    </Tabs>
  );
}
describe('Tabs', () => {
  it('pairs tab and panel by their stable value', () => {
    render(<Example />);
    const tab = screen.getByRole('tab', { name: 'Eins' });
    const panel = screen.getByRole('tabpanel');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    expect(panel).toHaveTextContent('Erster Inhalt');
  });
  it('automatically activates and focuses tabs with cyclic arrows', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<Example onValueChange={onValueChange} />);
    screen.getByRole('tab', { name: 'Eins' }).focus();
    await user.keyboard('{ArrowLeft}');
    expect(screen.getByRole('tab', { name: 'Zwei' })).toHaveFocus();
    expect(onValueChange).toHaveBeenCalledWith('two');
  });
  it('rejects public parts outside Tabs', () => {
    expect(() => render(<Tabs.Tab value="one">Eins</Tabs.Tab>)).toThrow(
      'Tabs.Tab must be rendered within Tabs.',
    );
  });
});
