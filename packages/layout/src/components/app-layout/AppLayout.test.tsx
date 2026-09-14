import { renderToString } from 'react-dom/server';
import type { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { AppLayout } from './AppLayout.js';

const items = [
  {
    id: 'inbox',
    name: 'Inbox',
    icon: 'fa-inbox' as const,
    children: [{ id: 'read', name: 'Read', icon: 'fa-folder' as const }],
  },
  { id: 'calendar', name: 'Calendar', icon: 'fa-calendar' as const },
];

function renderLayout(props: Partial<ComponentProps<typeof AppLayout>> = {}) {
  return render(
    <AppLayout
      collapseLabel="Collapse navigation"
      expandLabel="Expand navigation"
      items={items}
      navigationLabel="Application navigation"
      onClick={vi.fn()}
      logo="/logo.svg"
      {...props}
    >
      <p>Content</p>
    </AppLayout>,
  );
}

describe('AppLayout', () => {
  it('renders the shell, decorative logo and content', () => {
    renderLayout();

    expect(screen.getByRole('navigation', { name: 'Application navigation' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toHaveTextContent('Content');
    expect(screen.getByRole('presentation')).toHaveAttribute('alt', '');
    expect(screen.getAllByRole('button', { name: 'Inbox' })[0]).toBeInTheDocument();
  });

  it('invokes onClick for parent and child actions without toggling disclosure', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    renderLayout({ onClick });

    await user.click(screen.getAllByRole('button', { name: 'Inbox' })[0]!);
    expect(onClick).toHaveBeenCalledWith('inbox');
    expect(screen.queryByRole('button', { name: 'Read' })).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Inbox', expanded: false }));
    expect(screen.getByRole('button', { name: 'Read' })).toBeInTheDocument();
  });

  it('supports controlled and uncontrolled collapse', async () => {
    const user = userEvent.setup();
    const onCollapsedChange = vi.fn();
    renderLayout({ onCollapsedChange });

    const toggle = screen.getByRole('button', { name: 'Collapse navigation' });
    await user.click(toggle);

    expect(onCollapsedChange).toHaveBeenCalledWith(true);
    expect(screen.getAllByRole('button', { name: 'Inbox' })[0]).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Expand navigation' })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Inbox', expanded: false }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Read' })).not.toBeInTheDocument();
  });

  it('renders deterministic server markup without throwing', () => {
    expect(
      renderToString(
        <AppLayout
          collapseLabel="Collapse navigation"
          expandLabel="Expand navigation"
          items={items}
          navigationLabel="Application navigation"
          onClick={() => undefined}
          logo="/logo.svg"
        >
          Content
        </AppLayout>,
      ),
    ).toContain('Application navigation');
  });
});
