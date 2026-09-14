import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Tabs } from '../src/components/tabs/Tabs.js';

function renderTabs(activeIndex = 0) {
  const onFirstClick = vi.fn();
  const onSecondClick = vi.fn();

  render(
    <Tabs
      tabs={[
        {
          content: <p>First content</p>,
          icon: 'fa-inbox',
          isActive: activeIndex === 0,
          name: 'First',
          onClick: onFirstClick,
        },
        {
          content: <p>Second content</p>,
          icon: 'fa-calendar',
          isActive: activeIndex === 1,
          name: 'Second',
          onClick: onSecondClick,
        },
      ]}
    />,
  );

  return { onFirstClick, onSecondClick };
}

describe('Tabs', () => {
  it('renders the active content and ARIA relationships', () => {
    renderTabs(1);

    const tab = screen.getByRole('tab', { name: 'Second' });
    const panel = screen.getByRole('tabpanel');

    expect(tab).toHaveAttribute('aria-selected', 'true');
    expect(tab).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', tab.id);
    expect(panel).toHaveTextContent('Second content');
    expect(screen.queryByText('First content')).not.toBeInTheDocument();
  });

  it('activates and focuses the next tab with ArrowRight', async () => {
    const user = userEvent.setup();
    const { onSecondClick } = renderTabs();

    screen.getByRole('tab', { name: 'First' }).focus();
    await user.keyboard('{ArrowRight}');

    expect(onSecondClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('tab', { name: 'Second' })).toHaveFocus();
  });

  it('falls back to the first tab when no tab is active', () => {
    renderTabs(-1);

    expect(screen.getByRole('tab', { name: 'First' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First content');
  });

  it('renders optional remove and add actions', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    const onAdd = vi.fn();

    render(
      <Tabs
        addLabel="Add tab"
        onAdd={onAdd}
        tabs={[
          {
            content: 'Content',
            icon: 'fa-inbox',
            isActive: true,
            name: 'Inbox',
            onClick: vi.fn(),
            onRemove,
          },
        ]}
      />,
    );

    const inboxTab = screen.getByRole('tab', { name: 'Inbox' });
    await user.click(inboxTab.querySelector('[data-tabs-remove]')!);
    await user.click(screen.getByRole('button', { name: 'Add tab' }));

    expect(onRemove).toHaveBeenCalledOnce();
    expect(onAdd).toHaveBeenCalledOnce();
  });
});
