import type { CheckboxProps } from './Checkbox.types.js';

function Checkbox({ children, className, ...inputProps }: CheckboxProps) {
  const inputClassName = ['chayns-checkbox__input', className].filter(Boolean).join(' ');

  return (
    <label className="chayns-checkbox">
      <input {...inputProps} className={inputClassName} type="checkbox" />
      <span aria-hidden="true" className="chayns-checkbox__control" />
      <span className="chayns-checkbox__label">{children}</span>
    </label>
  );
}

export default Checkbox;
