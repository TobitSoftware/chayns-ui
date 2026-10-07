import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import DateTimePicker from '../src/components/date-time-picker/DateTimePicker.js';

const wheelLabels = {
  day: 'Tag',
  dayPeriod: 'Tageszeit',
  hour: 'Stunde',
  minute: 'Minute',
  month: 'Monat',
  year: 'Jahr',
};

describe('DateTimePicker', () => {
  it('opens its wheel dialog and closes it with Escape', async () => {
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        onChange={() => undefined}
        placeholder="Uhrzeit auswählen"
        value={new Date(2026, 8, 22, 10, 30)}
        wheelLabels={wheelLabels}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Uhrzeit' });
    expect(trigger).toHaveTextContent('10:30 Uhr');

    await user.click(trigger);
    expect(screen.getByRole('dialog', { name: 'Uhrzeit' })).toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('renders its open dialog in a document-body portal', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        onChange={() => undefined}
        placeholder="Uhrzeit auswählen"
        value={new Date(2026, 8, 22, 10, 30)}
        wheelLabels={wheelLabels}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Uhrzeit' }));

    const dialog = screen.getByRole('dialog', { name: 'Uhrzeit' });
    expect(document.body).toContainElement(dialog);
    expect(container).not.toContainElement(dialog);
  });

  it('keeps repeated wheel copies out of the keyboard and accessibility sequence', async () => {
    const user = userEvent.setup();
    render(
      <DateTimePicker
        label="Zeit"
        placeholder="Zeit auswählen"
        locale="de-DE"
        onChange={() => undefined}
        value={new Date(2026, 8, 22, 10, 30)}
        wheelLabels={wheelLabels}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Zeit' }));
    const wheel = screen.getByRole('listbox', { name: 'Stunde' });
    expect(wheel.querySelectorAll('[role="option"]')).toHaveLength(24 * 11);
    expect(
      screen.getAllByRole('option', { name: '10' }).filter((option) => wheel.contains(option)),
    ).toHaveLength(1);
    expect(document.getElementById(wheel.getAttribute('aria-activedescendant')!)).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(wheel.querySelectorAll('[role="option"][tabindex="0"]')).toHaveLength(0);
    wheel.focus();
    await user.tab();
    expect(screen.getByRole('listbox', { name: 'Minute' })).toHaveFocus();
  });

  it('hides the visual label when it has a value while preserving its accessible name', () => {
    render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        onChange={() => undefined}
        placeholder="Uhrzeit auswählen"
        value={new Date(2026, 8, 22, 10, 30)}
        wheelLabels={wheelLabels}
      />,
    );

    expect(screen.getByRole('button', { name: 'Uhrzeit' })).toHaveTextContent('10:30 Uhr');
    expect(document.querySelector('.chayns-date-time-picker__label')).not.toBeInTheDocument();
  });

  it('emits a local Date when a wheel option changes', async () => {
    const onChange = vi.fn<(value: Date) => void>();
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        onChange={onChange}
        placeholder="Uhrzeit auswählen"
        value={new Date(2026, 8, 22, 10, 30)}
        wheelLabels={wheelLabels}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Uhrzeit' }));
    await user.click(screen.getAllByRole('option', { name: '11' })[0]!);

    expect(onChange).toHaveBeenLastCalledWith(expect.any(Date));
    expect(onChange.mock.calls.at(-1)?.[0].getHours()).toBe(11);
  });

  it('renders only the configured minute intervals', async () => {
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        minuteStep={15}
        onChange={() => undefined}
        placeholder="Uhrzeit auswählen"
        value={new Date(2026, 8, 22, 10, 32)}
        wheelLabels={wheelLabels}
      />,
    );

    const trigger = screen.getByRole('button', { name: 'Uhrzeit' });
    expect(trigger).toHaveTextContent('10:30 Uhr');
    await user.click(trigger);

    expect(screen.getAllByRole('option', { name: '45' })).not.toHaveLength(0);
    expect(screen.queryByRole('option', { name: '46' })).not.toBeInTheDocument();
  });
  it('honours preventDefault from the consumer click handler', async () => {
    const user = userEvent.setup();

    render(
      <DateTimePicker
        label="Uhrzeit"
        locale="de-DE"
        onChange={() => undefined}
        onClick={(event) => event.preventDefault()}
        placeholder="Uhrzeit auswählen"
        value={null}
        wheelLabels={wheelLabels}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Uhrzeit' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('retains locale formatters and sizing examples across value changes', () => {
    const OriginalFormatter = Intl.DateTimeFormat;
    const formatters = vi.spyOn(Intl, 'DateTimeFormat').mockImplementation(function (...args) {
      return new OriginalFormatter(...args);
    });
    try {
      const props = {
        label: 'Zeit',
        placeholder: 'Auswählen',
        locale: 'de-DE',
        onChange: () => undefined,
        wheelLabels,
      };
      const { rerender } = render(
        <DateTimePicker {...props} value={new Date(2026, 8, 22, 10, 30)} />,
      );
      const constructions = formatters.mock.calls.length;
      expect(constructions).toBeLessThan(20);
      const sizingExample = document.querySelector('.chayns-date-time-picker__sizer > span');
      rerender(<DateTimePicker {...props} value={new Date(2026, 8, 22, 11, 45)} />);
      expect(formatters.mock.calls).toHaveLength(constructions);
      expect(document.querySelector('.chayns-date-time-picker__sizer > span')).toBe(sizingExample);
      expect(screen.getByRole('button', { name: 'Zeit' })).toHaveTextContent('11:45 Uhr');
    } finally {
      formatters.mockRestore();
    }
  });

  it('reserves the longest available date width when the selected month changes', () => {
    const props = {
      label: 'Datum',
      locale: 'de-DE',
      mode: 'date' as const,
      onChange: () => undefined,
      placeholder: 'Datum auswählen',
      wheelLabels,
    };
    const { rerender } = render(<DateTimePicker {...props} value={new Date(2026, 8, 22)} />);
    const sizer = document.querySelector('.chayns-date-time-picker__sizer');

    expect(sizer).toHaveTextContent('30. September 2026');

    rerender(<DateTimePicker {...props} value={new Date(2026, 6, 22)} />);

    expect(document.querySelector('.chayns-date-time-picker__sizer')).toBe(sizer);
    expect(sizer).toHaveTextContent('30. September 2026');
  });

  it('normalizes an out-of-range date without emitting a change', () => {
    const onChange = vi.fn();

    render(
      <DateTimePicker
        label="Datum"
        locale="de-DE"
        maxDate={new Date(2026, 8, 30)}
        minDate={new Date(2026, 8, 1)}
        mode="date"
        onChange={onChange}
        placeholder="Datum auswählen"
        value={new Date(2026, 9, 1)}
        wheelLabels={wheelLabels}
      />,
    );

    expect(screen.getByRole('button', { name: 'Datum' })).toHaveTextContent('30. September 2026');
    expect(onChange).not.toHaveBeenCalled();
  });
});
