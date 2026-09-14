import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SplitButton from '../src/components/split-button/SplitButton.js';

describe('SplitButton', () => {
  it('keeps the primary action and popup trigger separate', async () => {
    const user = userEvent.setup();
    const primaryClick = vi.fn();
    const alternativeClick = vi.fn();

    render(
      <SplitButton
        items={[{ icon: 'fa-clock', onClick: alternativeClick, text: 'Later' }]}
        onClick={primaryClick}
        variant="primary"
      >
        Send
      </SplitButton>,
    );

    const buttons = screen.getAllByRole('button');
    await user.click(buttons[0]!);
    expect(primaryClick).toHaveBeenCalledOnce();

    await user.click(buttons[1]!);
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
  });
});
