import { forwardRef } from 'react';

import type { SwitchProps } from './Switch.types.js';

const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { children, className, description, ...inputProps },
  ref,
) {
  const inputClassName = ['chayns-switch__input', className].filter(Boolean).join(' ');

  return (
    <label className="chayns-switch">
      <span className="chayns-switch__content">
        <span className="chayns-switch__label">{children}</span>
        {description !== undefined ? (
          <span className="chayns-switch__description">{description}</span>
        ) : null}
      </span>
      <input {...inputProps} className={inputClassName} ref={ref} type="checkbox" />
      <span aria-hidden="true" className="chayns-switch__control">
        <span className="chayns-switch__knob" />
      </span>
    </label>
  );
});

export default Switch;
