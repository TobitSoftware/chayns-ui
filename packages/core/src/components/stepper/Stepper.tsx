import { forwardRef, useId, type MouseEvent } from 'react';
import { stepperValues } from './stepper-values.js';
import type { StepperProps } from './Stepper.types.js';

const Stepper = forwardRef<HTMLDivElement, StepperProps>(function Stepper(
  {
    className,
    decreaseLabel,
    formatValue,
    increaseLabel,
    label,
    max,
    min,
    onClick,
    onValueChange,
    precision = 0,
    step,
    value,
    ...rootProps
  },
  ref,
) {
  const labelId = useId();
  const next = stepperValues(value, min, max, step, precision);
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>('button[data-stepper-direction]');
    if (!button || !event.currentTarget.contains(button) || button.disabled) return;
    onValueChange(button.dataset.stepperDirection === 'decrease' ? next.decrease : next.increase);
  }
  return (
    // Native buttons provide keyboard activation; the group delegates their clicks.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <div
      {...rootProps}
      aria-labelledby={labelId}
      className={['chayns-stepper', className].filter(Boolean).join(' ')}
      onClick={handleClick}
      ref={ref}
      role="group"
    >
      <span className="chayns-stepper__label" id={labelId}>
        {label}
      </span>
      <div className="chayns-stepper__control">
        <button
          aria-label={decreaseLabel}
          className="chayns-stepper__button"
          data-stepper-direction="decrease"
          disabled={value === min}
          type="button"
        >
          <i aria-hidden="true" className="far fa-minus chayns-stepper__icon" />
          <i aria-hidden="true" className="fas fa-minus chayns-stepper__icon--active" />
        </button>
        <span aria-atomic="true" aria-live="polite" className="chayns-stepper__value">
          {formatValue(value)}
        </span>
        <button
          aria-label={increaseLabel}
          className="chayns-stepper__button chayns-stepper__button--increase"
          data-stepper-direction="increase"
          disabled={value === max}
          type="button"
        >
          <i aria-hidden="true" className="far fa-plus chayns-stepper__icon" />
          <i aria-hidden="true" className="fas fa-plus chayns-stepper__icon--active" />
        </button>
      </div>
    </div>
  );
});
Stepper.displayName = 'Stepper';
export default Stepper;
