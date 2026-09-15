import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import PopupList from '../src/components/popup/PopupList.js';

describe('PopupList', () => {
  it('opens, focuses the first item and closes after an action', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <PopupList
        items={[{ icon: 'fa-clock', onClick, text: 'Later' }]}
        trigger={<button type="button">More</button>}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'More' }));

    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Later' })).toHaveFocus();

    await user.click(screen.getByRole('menuitem', { name: 'Later' }));

    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('supports Escape and cyclic arrow navigation', async () => {
    const user = userEvent.setup();

    render(
      <PopupList
        items={[
          { icon: 'fa-clock', onClick: vi.fn(), text: 'Later' },
          { icon: 'fa-calendar', onClick: vi.fn(), text: 'Schedule' },
        ]}
        trigger={<button type="button">More</button>}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'More' });
    await user.click(trigger);
    await user.keyboard('{ArrowDown}');

    expect(screen.getByRole('menuitem', { name: 'Schedule' })).toHaveFocus();

    await user.keyboard('{Escape}');

    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
