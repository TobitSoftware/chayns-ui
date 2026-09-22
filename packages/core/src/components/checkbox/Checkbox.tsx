import { forwardRef } from 'react';

import type { CheckboxProps } from './Checkbox.types.js';

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { children, className, description, ...inputProps },
  ref,
) {
  const inputClassName = ['chayns-checkbox__input', className].filter(Boolean).join(' ');

  return (
    <label className="chayns-checkbox">
      <input {...inputProps} className={inputClassName} ref={ref} type="checkbox" />
      <span aria-hidden="true" className="chayns-checkbox__control" />
      <span className="chayns-checkbox__content">
        <span className="chayns-checkbox__label">{children}</span>
        {description !== undefined ? (
          <span className="chayns-checkbox__description">{description}</span>
        ) : null}
      </span>
    </label>
  );
});

export default Checkbox;
