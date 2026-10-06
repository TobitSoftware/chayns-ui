import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';
import { composeNativeRefs } from '../../utils/native-ref.js';
import { dateAtMidnight } from './date-time-picker-utils.js';
import { useDateTimePickerValue } from './hooks/useDateTimePickerValue.js';
import Wheel from './wheel/Wheel.js';
import PickerSizer from './sizer/PickerSizer.js';
import { DATE_TIME_PICKER_MINUTE_STEPS, type DateTimePickerProps } from './DateTimePicker.types.js';

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
  const setTriggerElement = useMemo(() => composeNativeRefs(triggerRef, ref), [ref]);
  const [open, setOpen] = useState(false);
  const {
    displayValue,
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
    sizingValues,
  } = useDateTimePickerValue({
    value,
    locale,
    maxDate,
    minDate,
    onChange,
    placeholder,
    wheelLabels,
    minuteStep,
    mode,
  });
  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }
  useEffect(() => {
    if (!open) return undefined;
    function closeOnOutsidePress(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) close();
    }
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  });
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
      <PickerSizer values={sizingValues} placeholder={displayValue === null ? placeholder : null} />
      <button
        {...buttonProps}
        aria-controls={open ? popupId : undefined}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={label}
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
        ref={setTriggerElement}
        type="button"
      >
        {formattedValue}
      </button>
      {displayValue === null ? (
        <label className="chayns-date-time-picker__label" htmlFor={triggerId}>
          {label}
        </label>
      ) : null}
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
                  ariaLabel={dateLabel(part)}
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

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
