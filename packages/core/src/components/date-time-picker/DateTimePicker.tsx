import { forwardRef, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { composeNativeRefs } from '../../utils/native-ref.js';
import { useOverlayPosition } from '../../hooks/useOverlayPosition.js';
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
    inline = false,
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
  const popupRef = useRef<HTMLDivElement>(null);
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
    sizingValueGroups,
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

  useLayoutEffect(() => {
    const popup = popupRef.current;
    const trigger = triggerRef.current;
    if (!open || popup === null || trigger === null) return;

    const popupStyle = window.getComputedStyle(popup);
    const popupFrameWidth =
      Number.parseFloat(popupStyle.borderInlineStartWidth) +
      Number.parseFloat(popupStyle.borderInlineEndWidth) +
      Number.parseFloat(popupStyle.paddingInlineStart) +
      Number.parseFloat(popupStyle.paddingInlineEnd);
    const wheels = Array.from(
      popup.querySelectorAll<HTMLElement>('.chayns-date-time-picker__wheel'),
    );
    for (const wheel of wheels) {
      const contentWidth = Math.max(
        ...Array.from(
          wheel.querySelectorAll<HTMLElement>('.chayns-date-time-picker__wheel-sizer-option'),
        ).map((option) => option.getBoundingClientRect().width),
        wheel.scrollWidth,
      );
      wheel.style.inlineSize = `${contentWidth}px`;
      wheel.style.flex = `0 0 ${contentWidth}px`;
    }
    const wheelsWidth =
      popup.querySelector<HTMLElement>('.chayns-date-time-picker__wheels')?.scrollWidth ?? 0;
    const triggerWidth = trigger.getBoundingClientRect().width;

    if (wheelsWidth === 0 && triggerWidth === 0) return;
    popup.style.inlineSize = `${Math.max(triggerWidth, wheelsWidth + popupFrameWidth)}px`;
  }, [locale, maxDate, minDate, mode, open]);

  useOverlayPosition(popupRef, triggerRef.current, open, 'bottom', 4, true);

  useEffect(() => {
    if (!open) return undefined;
    function closeOnOutsidePress(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target) &&
        !popupRef.current?.contains(event.target)
      ) {
        close();
      }
    }
    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  });
  const resolvedClassName = [
    'chayns-date-time-picker',
    `chayns-date-time-picker--${mode}`,
    inline ? 'chayns-date-time-picker--inline' : '',
    open ? 'chayns-date-time-picker--open' : '',
    displayValue !== null ? 'chayns-date-time-picker--filled' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const wheelContent = (
    <>
      {mode !== 'time'
        ? datePartOrder.map((part) => (
            <Wheel
              ariaLabel={dateLabel(part)}
              disabled={disabled ?? false}
              key={part}
              onEscape={inline ? () => undefined : close}
              onSelect={(nextValue) => updateDate(part, nextValue)}
              options={dateOptions(part)}
              selected={dateValue(part)}
            />
          ))
        : null}
      {mode === 'date-time' ? (
        <span aria-hidden="true" className="chayns-date-time-picker__date-time-gap" />
      ) : null}
      {mode !== 'date' ? (
        <>
          <Wheel
            ariaLabel={wheelLabels.hour}
            disabled={disabled ?? false}
            onEscape={inline ? () => undefined : close}
            onSelect={(hour) => updateTime('hours', hour)}
            options={hours}
            selected={isTwelveHour ? activeValue.getHours() % 12 || 12 : activeValue.getHours()}
          />
          <Wheel
            ariaLabel={wheelLabels.minute}
            disabled={disabled ?? false}
            onEscape={inline ? () => undefined : close}
            onSelect={(minute) => updateTime('minutes', minute)}
            options={minutes}
            selected={activeValue.getMinutes()}
          />
          {isTwelveHour ? (
            <Wheel
              ariaLabel={wheelLabels.dayPeriod}
              disabled={disabled ?? false}
              onEscape={inline ? () => undefined : close}
              onSelect={updatePeriod}
              options={dayPeriods}
              selected={activeValue.getHours() >= 12 ? 1 : 0}
            />
          ) : null}
        </>
      ) : null}
    </>
  );

  return (
    <div className={resolvedClassName} ref={rootRef}>
      {inline ? (
        <>
          <div aria-label={label} className="chayns-date-time-picker__wheels" role="group">
            <div className="chayns-date-time-picker__selection" />
            {wheelContent}
          </div>
        </>
      ) : (
        <>
          <PickerSizer
            placeholder={displayValue === null ? placeholder : null}
            valueGroups={sizingValueGroups}
          />
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
        </>
      )}
      {open && !disabled && !inline && typeof document !== 'undefined'
        ? createPortal(
            <div
              aria-label={label}
              className={[
                'chayns-date-time-picker__popup',
                `chayns-date-time-picker__popup--${mode}`,
              ].join(' ')}
              id={popupId}
              ref={popupRef}
              role="dialog"
            >
              <div className="chayns-date-time-picker__wheels">
                <div className="chayns-date-time-picker__selection" />
                {wheelContent}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
});

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;
