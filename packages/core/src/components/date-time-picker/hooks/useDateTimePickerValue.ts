import { useMemo } from 'react';
import { clampDate, dateAtMidnight, normalizeMinute } from '../date-time-picker-utils.js';
import type { DateTimePickerProps } from '../DateTimePicker.types.js';
type DatePart = 'date' | 'fullYear' | 'month';
type ValueProps = Pick<
  DateTimePickerProps,
  'value' | 'locale' | 'onChange' | 'placeholder' | 'wheelLabels'
> &
  Required<Pick<DateTimePickerProps, 'minuteStep' | 'mode'>> & {
    minDate: Date | undefined;
    maxDate: Date | undefined;
  };

export function useDateTimePickerValue({
  value,
  locale,
  maxDate,
  minDate,
  onChange,
  placeholder,
  wheelLabels,
  minuteStep,
  mode,
}: ValueProps) {
  const { hourFormatter, monthFormatter, timeFormatter, dateFormatter, dateOrderFormatter } =
    useMemo(
      () => ({
        hourFormatter: new Intl.DateTimeFormat(locale, { hour: 'numeric' }),
        monthFormatter: new Intl.DateTimeFormat(locale, { month: 'long' }),
        timeFormatter: new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit' }),
        dateFormatter: new Intl.DateTimeFormat(locale, {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        dateOrderFormatter: new Intl.DateTimeFormat(locale, {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        }),
      }),
      [locale],
    );
  let displayValue = value;
  if (value !== null) {
    displayValue =
      mode === 'date' ? clampDate(value, minDate, maxDate) : normalizeMinute(value, minuteStep);
  }
  const activeValue = displayValue ?? new Date();
  const isTwelveHour = hourFormatter.resolvedOptions().hour12 === true;

  const years = useMemo(() => {
    const today = new Date().getFullYear();
    const first = minDate?.getFullYear() ?? today - 100;
    const last = maxDate?.getFullYear() ?? today + 100;
    return Array.from({ length: last - first + 1 }, (_, index) => first + index);
  }, [maxDate, minDate]);

  function emit(nextValue: Date) {
    onChange(mode === 'date' ? clampDate(nextValue, minDate, maxDate) : nextValue);
  }

  function updateTime(part: 'hours' | 'minutes', nextValue: number) {
    const next = new Date(activeValue);
    if (part === 'hours') {
      const hour = isTwelveHour ? (nextValue % 12) + (next.getHours() >= 12 ? 12 : 0) : nextValue;
      next.setHours(hour);
    } else {
      next.setMinutes(nextValue);
    }
    emit(next);
  }

  function updatePeriod(period: number) {
    const next = new Date(activeValue);
    next.setHours((next.getHours() % 12) + period * 12);
    emit(next);
  }

  function updateDate(part: DatePart, nextValue: number) {
    const next = new Date(activeValue);
    const originalDay = next.getDate();
    next.setDate(1);
    if (part === 'fullYear') next.setFullYear(nextValue);
    if (part === 'month') next.setMonth(nextValue);
    if (part === 'date') next.setDate(nextValue);
    if (part !== 'date') {
      next.setDate(
        Math.min(originalDay, new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()),
      );
    }
    emit(next);
  }

  let formattedValue = placeholder;
  if (displayValue !== null) {
    if (mode === 'time')
      formattedValue = `${timeFormatter.format(displayValue)}${locale.toLowerCase().startsWith('de') ? ' Uhr' : ''}`;
    else formattedValue = dateFormatter.format(displayValue);
  }
  const timeSizingValues = useMemo(() => {
    if (mode !== 'time') return [];
    return Array.from({ length: 24 * (60 / minuteStep) }, (_, index) => {
      const candidate = new Date(2026, 0, 1);
      candidate.setHours(Math.floor(index / (60 / minuteStep)));
      candidate.setMinutes((index % (60 / minuteStep)) * minuteStep);
      return `${timeFormatter.format(candidate)}${locale.toLowerCase().startsWith('de') ? ' Uhr' : ''}`;
    });
  }, [locale, minuteStep, mode, timeFormatter]);
  const dateSizingValues = useMemo(() => [formattedValue], [formattedValue]);
  const sizingValues = mode === 'time' ? timeSizingValues : dateSizingValues;

  const hours = Array.from({ length: isTwelveHour ? 12 : 24 }, (_, index) =>
    isTwelveHour ? index + 1 : index,
  ).map((hour) => ({ label: String(hour).padStart(2, '0'), value: hour }));
  const minutes = Array.from({ length: 60 / minuteStep }, (_, index) => {
    const minute = index * minuteStep;
    return { label: String(minute).padStart(2, '0'), value: minute };
  });
  const months = Array.from({ length: 12 }, (_, month) => ({
    label: monthFormatter.format(new Date(2026, month, 1)),
    value: month,
  })).filter((month) => {
    const first = new Date(activeValue.getFullYear(), month.value, 1);
    const last = new Date(activeValue.getFullYear(), month.value + 1, 0);
    return (
      (minDate === undefined || last >= dateAtMidnight(minDate)) &&
      (maxDate === undefined || first <= dateAtMidnight(maxDate))
    );
  });
  const days = Array.from(
    { length: new Date(activeValue.getFullYear(), activeValue.getMonth() + 1, 0).getDate() },
    (_, index) => ({ label: String(index + 1).padStart(2, '0'), value: index + 1 }),
  ).filter((day) => {
    const candidate = new Date(activeValue.getFullYear(), activeValue.getMonth(), day.value);
    return (
      (minDate === undefined || candidate >= dateAtMidnight(minDate)) &&
      (maxDate === undefined || candidate <= dateAtMidnight(maxDate))
    );
  });
  const datePartOrder = dateOrderFormatter.formatToParts(activeValue).flatMap<DatePart>((part) => {
    if (part.type === 'day') return ['date'];
    if (part.type === 'month') return ['month'];
    if (part.type === 'year') return ['fullYear'];
    return [];
  });
  const yearOptions = years.map((year) => ({ label: String(year), value: year }));

  function dateOptions(part: DatePart) {
    if (part === 'date') return days;
    if (part === 'month') return months;
    return yearOptions;
  }

  function dateValue(part: DatePart) {
    if (part === 'date') return activeValue.getDate();
    if (part === 'month') return activeValue.getMonth();
    return activeValue.getFullYear();
  }
  const dayPeriods = [0, 1].map((period) => ({
    label:
      hourFormatter
        .formatToParts(new Date(2026, 0, 1, period === 0 ? 1 : 13))
        .find((part) => part.type === 'dayPeriod')?.value ?? (period === 0 ? 'AM' : 'PM'),
    value: period,
  }));
  function dateLabel(part: DatePart) {
    if (part === 'date') return wheelLabels.day;
    if (part === 'month') return wheelLabels.month;
    return wheelLabels.year;
  }
  return {
    displayValue,
    sizingValues,
    formattedValue,
    activeValue,
    isTwelveHour,
    hours,
    minutes,
    dayPeriods,
    datePartOrder,
    dateOptions,
    dateValue,
    dateLabel,
    updateDate,
    updateTime,
    updatePeriod,
  };
}
