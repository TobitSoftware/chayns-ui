import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Tooltip from '../src/components/tooltip/Tooltip.js';

describe('Tooltip', () => {
  it('opens on focus, merges descriptions, preserves refs and dismisses with Escape', async () => {
    const user = userEvent.setup();
    const childRef = createRef<HTMLButtonElement>();
    const outerRef = createRef<HTMLElement>();
    render(
      <>
        <span id="existing">Existing description</span>
        <Tooltip content="Explanation" ref={outerRef} data-hint="details">
          <button aria-describedby="existing" ref={childRef} type="button">
            Details
          </button>
        </Tooltip>
      </>,
    );
    const trigger = screen.getByRole('button');
    expect(childRef.current).toBe(trigger);
    expect(outerRef.current).toBe(trigger);
    expect(trigger).toHaveAttribute('data-hint', 'details');
    await user.tab();
    const hint = screen.getByRole('tooltip');
    expect(trigger.getAttribute('aria-describedby')?.split(' ')).toEqual(['existing', hint.id]);
    expect(trigger).toHaveAccessibleDescription('Existing description Explanation');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).toBeNull();
    expect(trigger).toHaveFocus();
    fireEvent.pointerLeave(trigger);
    expect(screen.queryByRole('tooltip')).toBeNull();
    fireEvent.pointerEnter(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
  });

  it('retains hover across the surface and dismisses when leaving both', () => {
    render(
      <Tooltip content="Explanation">
        <button type="button">Details</button>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button');
    fireEvent.pointerEnter(trigger);
    const hint = screen.getByRole('tooltip');
    fireEvent.pointerLeave(trigger, { relatedTarget: hint });
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.pointerLeave(hint, { relatedTarget: document.body });
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('keeps the first touch action and honors consumer cancellation', () => {
    const childAction = vi.fn();
    const outerAction = vi.fn();
    const { rerender } = render(
      <Tooltip content="Explanation" onClick={outerAction}>
        <button onClick={childAction} type="button">
          Details
        </button>
      </Tooltip>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(childAction).toHaveBeenCalledTimes(1);
    expect(outerAction).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    fireEvent.pointerDown(document.body);
    expect(screen.queryByRole('tooltip')).toBeNull();
    rerender(
      <Tooltip content="Explanation" onClick={outerAction}>
        <button onClick={(event) => event.preventDefault()} type="button">
          Details
        </button>
      </Tooltip>,
    );
    fireEvent.click(screen.getByRole('button'));
    expect(outerAction).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('tooltip')).toBeNull();
  });

  it('cleans up child callback refs and server-renders the native trigger', () => {
    const cleanup = vi.fn();
    const ref = vi.fn(() => cleanup);
    const { unmount } = render(
      <Tooltip content="Explanation">
        <button ref={ref} type="button">
          Details
        </button>
      </Tooltip>,
    );
    expect(ref).toHaveBeenCalledTimes(1);
    unmount();
    expect(cleanup).toHaveBeenCalledTimes(1);
    expect(
      renderToString(
        <Tooltip content="Explanation">
          <button type="button">Details</button>
        </Tooltip>,
      ),
    ).toContain('Details');
  });
});
