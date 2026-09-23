import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';

import { DATE_TIME_PICKER_MINUTE_STEPS, type DateTimePickerProps } from './DateTimePicker.types.js';

const WHEEL_LOOP_CYCLES = 11;
const WHEEL_CENTER_CYCLE = Math.floor(WHEEL_LOOP_CYCLES / 2);
type DatePart = 'date' | 'fullYear' | 'month';

interface WheelOption {
  label: string;
  value: number;
}

interface WheelProps {
  ariaLabel: string;
  onEscape: () => void;
  onSelect: (value: number) => void;
  options: readonly WheelOption[];
  selected: number;
}

function dateAtMidnight(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate());
}

function clampDate(value: Date, minDate?: Date, maxDate?: Date) {
  const date = dateAtMidnight(value);
  if (minDate !== undefined && date < dateAtMidnight(minDate)) return new Date(minDate);
  if (maxDate !== undefined && date > dateAtMidnight(maxDate)) return new Date(maxDate);
  return value;
}

function normalizeMinute(value: Date, minuteStep: number) {
  const normalized = new Date(value);
  normalized.setMinutes(Math.floor(normalized.getMinutes() / minuteStep) * minuteStep);
  return normalized;
}

function Wheel({ ariaLabel, onEscape, onSelect, options, selected }: WheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<{ pointerId: number; scrollTop: number; startY: number } | undefined>(
    undefined,
  );
  const ignoreClickRef = useRef(false);

  useEffect(() => {
    if (typeof selectedRef.current?.scrollIntoView === 'function') {
      selectedRef.current.scrollIntoView({ block: 'center' });
    }
  }, []);

  function applyPerspective() {
    const wheel = wheelRef.current;
    const itemHeight = selectedRef.current?.offsetHeight;
    if (!wheel || !itemHeight) return;

    const position = wheel.scrollTop / itemHeight;
    for (const option of wheel.querySelectorAll<HTMLButtonElement>(
      '.chayns-date-time-picker__wheel-option',
    )) {
      const index = Number(option.dataset.wheelIndex);
      const distance = Math.max(-2.5, Math.min(2.5, index - position));
      const progress = Math.min(1, Math.abs(distance) / 2.5);

      option.style.color = progress < 0.2 ? 'var(--text)' : 'var(--text-3)';
      option.style.fontWeight = progress < 0.2 ? '600' : '400';
      option.style.opacity = String(1 - progress * 0.7);
      option.style.transform = `rotateX(${distance * 22}deg) scale(${1 - progress * 0.24})`;
    }
  }

  function selectCenteredValue() {
    const wheel = wheelRef.current;
    const itemHeight = selectedRef.current?.offsetHeight;
    if (!wheel || !itemHeight) return;

    const index = Math.round(wheel.scrollTop / itemHeight);
    const option = options[((index % options.length) + options.length) % options.length];
    if (option !== undefined && option.value !== selected) onSelect(option.value);
  }

  function handleScroll() {
    const wheel = wheelRef.current;
    const itemHeight = selectedRef.current?.offsetHeight;
    if (!wheel || !itemHeight) return;

    const index = Math.round(wheel.scrollTop / itemHeight);
    const normalizedIndex = ((index % options.length) + options.length) % options.length;
    if (index < options.length * 2 || index >= options.length * (WHEEL_LOOP_CYCLES - 2)) {
      wheel.scrollTop = (WHEEL_CENTER_CYCLE * options.length + normalizedIndex) * itemHeight;
    }

    applyPerspective();
    selectCenteredValue();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onEscape();
      return;
    }

    const index = options.findIndex((option) => option.value === selected);
    let nextIndex = index;
    if (event.key === 'ArrowDown') nextIndex = Math.min(index + 1, options.length - 1);
    if (event.key === 'ArrowUp') nextIndex = Math.max(index - 1, 0);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = options.length - 1;
    const nextOption = options[nextIndex];
    if (nextIndex !== index && nextOption !== undefined) {
      event.preventDefault();
      onSelect(nextOption.value);
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    dragRef.current = {
      pointerId: event.pointerId,
      scrollTop: event.currentTarget.scrollTop,
      startY: event.clientY,
    };
    ignoreClickRef.current = false;
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;
    const distance = event.clientY - drag.startY;
    if (Math.abs(distance) > 3) {
      ignoreClickRef.current = true;
      event.currentTarget.scrollTop = drag.scrollTop - distance;
    }
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = undefined;
    if (typeof event.currentTarget.releasePointerCapture === 'function') {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    selectCenteredValue();
  }

  return (
    <div
      aria-label={ariaLabel}
      className="chayns-date-time-picker__wheel"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onScroll={handleScroll}
      ref={wheelRef}
      role="listbox"
      tabIndex={0}
    >
      {Array.from({ length: WHEEL_LOOP_CYCLES }, (_, cycle) =>
        options.map((option, optionIndex) => (
          <button
            aria-selected={option.value === selected}
            className="chayns-date-time-picker__wheel-option"
            data-wheel-index={cycle * options.length + optionIndex}
            key={`${cycle}-${option.value}`}
            onClick={(event) => {
              if (ignoreClickRef.current) {
                event.preventDefault();
                event.stopPropagation();
                ignoreClickRef.current = false;
                return;
              }
              onSelect(option.value);
            }}
            ref={
              cycle === WHEEL_CENTER_CYCLE && option.value === selected ? selectedRef : undefined
            }
            role="option"
            type="button"
          >
            {option.label}
          </button>
        )),
      )}
    </div>
  );
}

const DateTimePicker = forwardRef<HTMLButtonElement, DateTimePickerProps>(function DateTimePicker(
  {
    className,
    disabled,
    id,
    label,
    locale,
    maxDate,
    minDate,
    minuteStep = 1,
    mode = 'time',
    onChange,
    onClick,
    onKeyDown,
    placeholder,
    value,
    wheelLabels,
    ...buttonProps
  },
  ref,
) {
  if (!DATE_TIME_PICKER_MINUTE_STEPS.includes(minuteStep)) {
    throw new Error('DateTimePicker minuteStep must be one of: 1, 5, 15, 30.');
  }

  if (
    minDate !== undefined &&
    maxDate !== undefined &&
    dateAtMidnight(minDate) > dateAtMidnight(maxDate)
  ) {
    throw new Error('DateTimePicker requires minDate to be earlier than or equal to maxDate.');
  }

  const generatedId = useId();
  const triggerId = id ?? generatedId;
  const popupId = `${triggerId}-popup`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const displayValue =
    value === null
      ? null
      : mode === 'date'
        ? clampDate(value, minDate, maxDate)
        : normalizeMinute(value, minuteStep);
  const activeValue = displayValue ?? new Date();
  const isTwelveHour =
    new Intl.DateTimeFormat(locale, { hour: 'numeric' }).resolvedOptions().hour12 === true;

  useEffect(() => {
    if (!open) return undefined;
    function closeOnOutsidePress(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) close();
    }
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  });

  const years = useMemo(() => {
    const today = new Date().getFullYear();
    const first = minDate?.getFullYear() ?? today - 100;
    const last = maxDate?.getFullYear() ?? today + 100;
    return Array.from({ length: last - first + 1 }, (_, index) => first + index);
  }, [maxDate, minDate]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

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

  const formattedValue =
    displayValue === null
      ? placeholder
      : mode === 'time'
        ? `${new Intl.DateTimeFormat(locale, {
            hour: 'numeric',
            minute: '2-digit',
          }).format(displayValue)}${locale.toLowerCase().startsWith('de') ? ' Uhr' : ''}`
        : new Intl.DateTimeFormat(locale, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format(displayValue);
  const hours = Array.from({ length: isTwelveHour ? 12 : 24 }, (_, index) =>
    isTwelveHour ? index + 1 : index,
  ).map((hour) => ({ label: String(hour).padStart(2, '0'), value: hour }));
  const minutes = Array.from({ length: 60 / minuteStep }, (_, index) => {
    const minute = index * minuteStep;
    return { label: String(minute).padStart(2, '0'), value: minute };
  });
  const months = Array.from({ length: 12 }, (_, month) => ({
    label: new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2026, month, 1)),
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
  const datePartOrder = new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  })
    .formatToParts(activeValue)
    .flatMap<DatePart>((part) => {
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
      new Intl.DateTimeFormat(locale, { hour: 'numeric' })
        .formatToParts(new Date(2026, 0, 1, period === 0 ? 1 : 13))
        .find((part) => part.type === 'dayPeriod')?.value ?? (period === 0 ? 'AM' : 'PM'),
    value: period,
  }));
  const resolvedClassName = [
    'chayns-date-time-picker',
    `chayns-date-time-picker--${mode}`,
    open ? 'chayns-date-time-picker--open' : '',
    displayValue !== null ? 'chayns-date-time-picker--filled' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={resolvedClassName} ref={rootRef}>
      <button
        {...buttonProps}
        aria-controls={open ? popupId : undefined}
        aria-expanded={open}
        aria-haspopup="dialog"
        className={['chayns-date-time-picker__trigger', className].filter(Boolean).join(' ')}
        disabled={disabled}
        id={triggerId}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) setOpen((current) => !current);
        }}
        onKeyDown={(event) => {
          onKeyDown?.(event);
          if (event.key === 'Escape' && open && !event.defaultPrevented) {
            event.preventDefault();
            close();
          }
        }}
        ref={(element) => {
          triggerRef.current = element;
          if (typeof ref === 'function') ref(element);
          else if (ref !== null) ref.current = element;
        }}
        type="button"
      >
        {formattedValue}
      </button>
      <label className="chayns-date-time-picker__label" htmlFor={triggerId}>
        {label}
      </label>
      {open && !disabled ? (
        <div
          aria-label={label}
          className="chayns-date-time-picker__popup"
          id={popupId}
          role="dialog"
        >
          <div className="chayns-date-time-picker__selection" />
          <div className="chayns-date-time-picker__wheels">
            {mode === 'time' ? (
              <>
                <Wheel
                  ariaLabel={wheelLabels.hour}
                  onEscape={close}
                  onSelect={(hour) => updateTime('hours', hour)}
                  options={hours}
                  selected={
                    isTwelveHour ? activeValue.getHours() % 12 || 12 : activeValue.getHours()
                  }
                />
                <Wheel
                  ariaLabel={wheelLabels.minute}
                  onEscape={close}
                  onSelect={(minute) => updateTime('minutes', minute)}
                  options={minutes}
                  selected={activeValue.getMinutes()}
                />
                {isTwelveHour ? (
                  <Wheel
                    ariaLabel={wheelLabels.dayPeriod}
                    onEscape={close}
                    onSelect={updatePeriod}
                    options={dayPeriods}
                    selected={activeValue.getHours() >= 12 ? 1 : 0}
                  />
                ) : null}
              </>
            ) : (
              datePartOrder.map((part) => (
                <Wheel
                  ariaLabel={
                    part === 'date'
                      ? wheelLabels.day
                      : part === 'month'
                        ? wheelLabels.month
                        : wheelLabels.year
                  }
                  key={part}
                  onEscape={close}
                  onSelect={(nextValue) => updateDate(part, nextValue)}
                  options={dateOptions(part)}
                  selected={dateValue(part)}
                />
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
});

export default DateTimePicker;
