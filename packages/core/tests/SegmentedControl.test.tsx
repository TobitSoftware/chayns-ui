import { createRef, StrictMode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import SegmentedControl from '../src/components/segmented-control/SegmentedControl.js';

function Segments() {
  return (
    <>
      <SegmentedControl.Segment value="week">Woche</SegmentedControl.Segment>
      <SegmentedControl.Segment value="month">Monat</SegmentedControl.Segment>
      <SegmentedControl.Segment value="year">Jahr</SegmentedControl.Segment>
    </>
  );
}

describe('SegmentedControl', () => {
  it('forwards root and button native props and refs', () => {
    const rootRef = createRef<HTMLDivElement>();
    const segmentRef = createRef<HTMLButtonElement>();

    render(
      <SegmentedControl data-purpose="range" defaultValue="week" label="Zeitraum" ref={rootRef}>
        <SegmentedControl.Segment ref={segmentRef} value="week">
          Woche
        </SegmentedControl.Segment>
        <SegmentedControl.Segment data-segment="month" value="month">
          Monat
        </SegmentedControl.Segment>
      </SegmentedControl>,
    );

    const group = screen.getByRole('radiogroup', { name: 'Zeitraum' });
    expect(group).toBe(rootRef.current);
    expect(group).toHaveAttribute('data-purpose', 'range');
    expect(segmentRef.current).toBe(screen.getByRole('radio', { name: 'Woche' }));
    expect(screen.getByRole('radio', { name: 'Monat' })).toHaveAttribute('data-segment', 'month');
  });

  it('updates an uncontrolled selection and moves roving focus cyclically', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SegmentedControl defaultValue="week" label="Zeitraum" onValueChange={onValueChange}>
        <Segments />
      </SegmentedControl>,
    );

    const week = screen.getByRole('radio', { name: 'Woche' });
    week.focus();
    await user.keyboard('{ArrowLeft}');

    expect(screen.getByRole('radio', { name: 'Jahr' })).toHaveFocus();
    expect(screen.getByRole('radio', { name: 'Jahr' })).toHaveAttribute('aria-checked', 'true');
    expect(onValueChange).toHaveBeenCalledWith('year');

    await user.keyboard('{Home}');
    expect(week).toHaveFocus();
    expect(week).toHaveAttribute('aria-checked', 'true');
  });

  it('skips disabled segments and exposes controlled selection', async () => {
    const onValueChange = vi.fn();
    const user = userEvent.setup();

    render(
      <SegmentedControl label="Zeitraum" onValueChange={onValueChange} value="month">
        <SegmentedControl.Segment value="week">Woche</SegmentedControl.Segment>
        <SegmentedControl.Segment value="month">Monat</SegmentedControl.Segment>
        <SegmentedControl.Segment disabled value="year">
          Jahr
        </SegmentedControl.Segment>
      </SegmentedControl>,
    );

    const month = screen.getByRole('radio', { name: 'Monat' });
    expect(month).toHaveAttribute('aria-checked', 'true');
    month.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('radio', { name: 'Woche' })).toHaveFocus();
    expect(onValueChange).toHaveBeenCalledWith('week');
    expect(screen.getByRole('radio', { name: 'Monat' })).toHaveAttribute('aria-checked', 'true');
  });

  it('keeps public segment refs attached while the selection changes', async () => {
    const user = userEvent.setup();
    const ref = vi.fn();
    render(
      <SegmentedControl defaultValue="week" label="Range">
        <SegmentedControl.Segment value="week" ref={ref}>
          Week
        </SegmentedControl.Segment>
        <SegmentedControl.Segment value="month">Month</SegmentedControl.Segment>
      </SegmentedControl>,
    );
    await user.click(screen.getByRole('radio', { name: 'Month' }));
    expect(ref).toHaveBeenCalledTimes(1);
    expect(ref).toHaveBeenCalledWith(screen.getByRole('radio', { name: 'Week' }));
  });

  it('rejects Segment outside its documented parent', () => {
    expect(() =>
      render(<SegmentedControl.Segment value="week">Woche</SegmentedControl.Segment>),
    ).toThrow('SegmentedControl.Segment must be rendered within SegmentedControl.');
  });
});

it('automatically adopts the first enabled segment and recovers from removal', () => {
  const onValueChange = vi.fn();
  const { rerender } = render(
    <SegmentedControl label="Period" onValueChange={onValueChange}>
      <SegmentedControl.Segment value="disabled" disabled>
        Disabled
      </SegmentedControl.Segment>
      <SegmentedControl.Segment value="one">One</SegmentedControl.Segment>
      <SegmentedControl.Segment value="two">Two</SegmentedControl.Segment>
    </SegmentedControl>,
  );
  expect(screen.getByRole('radio', { name: 'One' })).toHaveAttribute('aria-checked', 'true');
  expect(onValueChange).toHaveBeenCalledExactlyOnceWith('one');
  rerender(
    <SegmentedControl label="Period" onValueChange={onValueChange}>
      <SegmentedControl.Segment value="two">Two</SegmentedControl.Segment>
    </SegmentedControl>,
  );
  expect(screen.getByRole('radio', { name: 'Two' })).toHaveAttribute('aria-checked', 'true');
  expect(onValueChange).toHaveBeenLastCalledWith('two');
});

it('proposes a controlled segment once in StrictMode and waits for the parent', () => {
  const onValueChange = vi.fn();
  const { rerender } = render(
    <StrictMode>
      <SegmentedControl label="Period" value="missing" onValueChange={onValueChange}>
        <SegmentedControl.Segment value="one">One</SegmentedControl.Segment>
      </SegmentedControl>
    </StrictMode>,
  );
  expect(onValueChange).toHaveBeenCalledExactlyOnceWith('one');
  expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'false');
  expect(screen.getByRole('radio')).toHaveAttribute('tabindex', '0');
  rerender(
    <StrictMode>
      <SegmentedControl label="Period" value="one" onValueChange={onValueChange}>
        <SegmentedControl.Segment value="one">One</SegmentedControl.Segment>
      </SegmentedControl>
    </StrictMode>,
  );
  expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'true');
  expect(onValueChange).toHaveBeenCalledTimes(1);
});

it('clears semantic selection when every segment is disabled', () => {
  const { rerender } = render(
    <SegmentedControl label="Period" defaultValue="one">
      <SegmentedControl.Segment value="one">One</SegmentedControl.Segment>
    </SegmentedControl>,
  );
  rerender(
    <SegmentedControl label="Period" defaultValue="one">
      <SegmentedControl.Segment value="one" disabled>
        One
      </SegmentedControl.Segment>
    </SegmentedControl>,
  );
  expect(screen.getByRole('radio')).toHaveAttribute('aria-checked', 'false');
  expect(screen.getByRole('radio')).toHaveAttribute('tabindex', '-1');
});
