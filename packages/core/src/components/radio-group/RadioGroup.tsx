import { forwardRef, useState } from 'react';

import { RadioGroupContext, useRadioGroupContext } from './RadioGroupContext.js';
import type { RadioGroupProps, RadioProps } from './RadioGroup.types.js';

const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { children, className, disabled, value, ...inputProps },
  ref,
) {
  const group = useRadioGroupContext();
  const isDisabled = group.disabled || disabled === true;
  const inputClassName = ['chayns-radio__input', className].filter(Boolean).join(' ');

  return (
    <label className="chayns-radio">
      <input
        {...inputProps}
        checked={group.value === value}
        className={inputClassName}
        disabled={isDisabled}
        name={group.name}
        onChange={() => group.selectValue(value)}
        ref={ref}
        type="radio"
        value={value}
      />
      <span aria-hidden="true" className="chayns-radio__control" />
      <span className="chayns-radio__label">{children}</span>
    </label>
  );
});

const RadioGroupRoot = forwardRef<HTMLFieldSetElement, RadioGroupProps>(function RadioGroupRoot(
  {
    children,
    className,
    defaultValue,
    disabled,
    label,
    name,
    onValueChange,
    value,
    ...fieldsetProps
  },
  ref,
) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const selectedValue = isControlled ? value : uncontrolledValue;
  const resolvedClassName = ['chayns-radio-group', className].filter(Boolean).join(' ');

  function selectValue(nextValue: string) {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }

    onValueChange?.(nextValue);
  }

  return (
    <RadioGroupContext.Provider
      value={{ disabled: disabled === true, name, selectValue, value: selectedValue }}
    >
      <fieldset {...fieldsetProps} className={resolvedClassName} disabled={disabled} ref={ref}>
        <legend className="chayns-radio-group__legend">{label}</legend>
        <div className="chayns-radio-group__options">{children}</div>
      </fieldset>
    </RadioGroupContext.Provider>
  );
});

const RadioGroup = Object.assign(RadioGroupRoot, { Radio });

export default RadioGroup;
