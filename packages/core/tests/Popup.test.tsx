import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Popup from '../src/components/popup/Popup.js';
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

describe('Popup composition', () => {
  it('preserves the child action and its cancellation', async () => {
    const user = userEvent.setup();
    const childAction = vi.fn((event: React.MouseEvent<HTMLButtonElement>) =>
      event.preventDefault(),
    );
    const outerAction = vi.fn();
    render(
      <Popup>
        <Popup.Trigger asChild onClick={outerAction}>
          <button onClick={childAction} type="button">
            Open
          </button>
        </Popup.Trigger>
        <Popup.Content>Content</Popup.Content>
      </Popup>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(childAction).toHaveBeenCalledOnce();
    expect(outerAction).not.toHaveBeenCalled();
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('preserves child and public callback refs without reattaching on open changes', async () => {
    const user = userEvent.setup();
    const childRef = vi.fn();
    const publicRef = vi.fn();
    const { unmount } = render(
      <Popup>
        <Popup.Trigger asChild ref={publicRef}>
          <button ref={childRef} type="button">
            Open
          </button>
        </Popup.Trigger>
        <Popup.Content>Content</Popup.Content>
      </Popup>,
    );
    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(childRef).toHaveBeenCalledWith(trigger);
    await user.click(trigger);
    expect(childRef).toHaveBeenCalledTimes(1);
    expect(publicRef).toHaveBeenCalledTimes(1);
    unmount();
    expect(childRef).toHaveBeenLastCalledWith(null);
    expect(publicRef).toHaveBeenLastCalledWith(null);
  });
});
