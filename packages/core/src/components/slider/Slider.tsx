import { forwardRef, useMemo, useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { composeNativeRefs } from '../../utils/native-ref.js';
import type { SliderProps } from './Slider.types.js';

const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  {
    className,
    defaultValue,
    formatValue,
    id,
    label,
    max,
    min,
    onChange,
    step,
    value,
    ...inputProps
  },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const minimum = Number(min ?? 0);
  const maximum = Number(max ?? 100);
  const initialValue = Number(value ?? defaultValue ?? (minimum + maximum) / 2);
  const [displayValue, setDisplayValue] = useState(initialValue);
  const formattedValue = formatValue(displayValue);
  const setRef = useMemo(() => composeNativeRefs(inputRef, ref), [ref]);

  useEffect(() => {
    if (inputRef.current) setDisplayValue(inputRef.current.valueAsNumber);
  }, [defaultValue, max, min, step, value]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
    if (value === undefined) setDisplayValue(event.currentTarget.valueAsNumber);
  }

  return (
    <div className="chayns-slider">
      <div className="chayns-slider__label-row">
        <label htmlFor={inputId}>{label}</label>
        <output aria-hidden="true" className="chayns-slider__value" htmlFor={inputId}>
          {formattedValue}
        </output>
      </div>
      <input
        {...inputProps}
        aria-valuetext={formattedValue}
        className={['chayns-slider__input', className].filter(Boolean).join(' ')}
        defaultValue={defaultValue}
        id={inputId}
        max={max}
        min={min}
        onChange={handleChange}
        ref={setRef}
        step={step}
        type="range"
        value={value}
      />
    </div>
  );
});
Slider.displayName = 'Slider';
export default Slider;
