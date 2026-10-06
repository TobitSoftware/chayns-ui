import { StrictMode } from 'react';
import { render, screen } from '@testing-library/react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
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
  it('renders the legacy removal affordance and preserves consumer key cancellation', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onKeyDown = vi.fn((event: ReactKeyboardEvent<HTMLButtonElement>) =>
      event.preventDefault(),
    );
    render(
      <Tabs defaultValue="one">
        <Tabs.List aria-label="Bereiche">
          <Tabs.Tab onKeyDown={onKeyDown} onRemove={onRemove} value="one">
            Eins
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">Erster Inhalt</Tabs.Panel>
      </Tabs>,
    );

    const tab = screen.getByRole('tab', { name: 'Eins' });
    await user.click(tab.querySelector('[data-tabs-remove]')!);
    expect(onRemove).toHaveBeenCalledTimes(1);

    tab.focus();
    await user.keyboard('{Delete}');
    expect(onKeyDown).toHaveBeenCalledTimes(1);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
  it('skips disabled tabs in DOM order after reordering children', async () => {
    const user = userEvent.setup();
    const contents = (reverse: boolean) => (
      <Tabs defaultValue="one">
        <Tabs.List aria-label="Order">
          {(reverse ? ['one', 'three', 'two'] : ['one', 'two', 'three']).map((value) => (
            <Tabs.Tab key={value} value={value}>
              {value}
            </Tabs.Tab>
          ))}
          <Tabs.Tab disabled value="disabled">
            Disabled
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>
    );
    const { rerender } = render(contents(false));
    rerender(contents(true));
    screen.getByRole('tab', { name: 'one' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'three' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'two' })).toHaveFocus();
  });

  it('retains the appearance default and shared panel relationships', () => {
    const { container, rerender } = render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one">One</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">Content</Tabs.Panel>
      </Tabs>,
    );
    expect(container.firstChild).toHaveClass('chayns-tabs--attached');
    rerender(
      <Tabs appearance="underline" defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one">One</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="one">Content</Tabs.Panel>
      </Tabs>,
    );
    expect(container.firstChild).toHaveClass('chayns-tabs--underline');
    expect(screen.getByRole('tab')).toHaveAttribute(
      'aria-controls',
      screen.getByRole('tabpanel').id,
    );
  });

  it('passes the removed value and allows click cancellation', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one" onRemove={onRemove}>
            One
          </Tabs.Tab>
          <Tabs.Tab value="two" onRemove={onRemove} onClick={(event) => event.preventDefault()}>
            Two
          </Tabs.Tab>
        </Tabs.List>
      </Tabs>,
    );
    await user.click(screen.getByRole('tab', { name: 'One' }).querySelector('[data-tabs-remove]')!);
    expect(onRemove).toHaveBeenLastCalledWith('one');
    await user.click(screen.getByRole('tab', { name: 'Two' }).querySelector('[data-tabs-remove]')!);
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('retains callback refs across selection updates and runs cleanup on removal', async () => {
    const user = userEvent.setup();
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { unmount } = render(
      <Tabs defaultValue="one">
        <Tabs.List>
          <Tabs.Tab value="one" ref={ref}>
            One
          </Tabs.Tab>
          <Tabs.Tab value="two">Two</Tabs.Tab>
        </Tabs.List>
      </Tabs>,
    );
    await user.click(screen.getByRole('tab', { name: 'Two' }));
    expect(ref).toHaveBeenCalledTimes(1);
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenCalledTimes(1);
  });

  it('rejects public parts outside Tabs', () => {
    expect(() => render(<Tabs.Tab value="one">Eins</Tabs.Tab>)).toThrow(
      'Tabs.Tab must be rendered within Tabs.',
    );
  });
});

it('automatically adopts the first enabled tab and recovers from removal', () => {
  const onValueChange = vi.fn();
  const { rerender } = render(
    <Tabs onValueChange={onValueChange}>
      <Tabs.List>
        <Tabs.Tab disabled value="disabled">
          Disabled
        </Tabs.Tab>
        <Tabs.Tab value="one">One</Tabs.Tab>
        <Tabs.Tab value="two">Two</Tabs.Tab>
      </Tabs.List>
    </Tabs>,
  );
  expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  expect(onValueChange).toHaveBeenCalledExactlyOnceWith('one');
  rerender(
    <Tabs onValueChange={onValueChange}>
      <Tabs.List>
        <Tabs.Tab value="two">Two</Tabs.Tab>
      </Tabs.List>
    </Tabs>,
  );
  expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
  expect(onValueChange).toHaveBeenLastCalledWith('two');
});

it('proposes a controlled tab once in StrictMode and waits for parent confirmation', () => {
  const onValueChange = vi.fn();
  const { rerender } = render(
    <StrictMode>
      <Tabs value="missing" onValueChange={onValueChange}>
        <Tabs.List>
          <Tabs.Tab value="one">One</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </StrictMode>,
  );
  expect(onValueChange).toHaveBeenCalledExactlyOnceWith('one');
  expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'false');
  expect(screen.getByRole('tab')).toHaveAttribute('tabindex', '0');
  rerender(
    <StrictMode>
      <Tabs value="one" onValueChange={onValueChange}>
        <Tabs.List>
          <Tabs.Tab value="one">One</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </StrictMode>,
  );
  expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
  expect(onValueChange).toHaveBeenCalledTimes(1);
});

it('clears semantic selection when every tab becomes disabled', () => {
  const { rerender } = render(
    <Tabs defaultValue="one">
      <Tabs.List>
        <Tabs.Tab value="one">One</Tabs.Tab>
      </Tabs.List>
    </Tabs>,
  );
  rerender(
    <Tabs defaultValue="one">
      <Tabs.List>
        <Tabs.Tab value="one" disabled>
          One
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>,
  );
  expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'false');
  expect(screen.getByRole('tab')).toHaveAttribute('tabindex', '-1');
});
