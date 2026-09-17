import { createRef } from 'react';
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

  it('rejects Segment outside its documented parent', () => {
    expect(() =>
      render(<SegmentedControl.Segment value="week">Woche</SegmentedControl.Segment>),
    ).toThrow('SegmentedControl.Segment must be rendered within SegmentedControl.');
  });
});
