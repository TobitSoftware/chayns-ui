import type { SwitchProps } from './Switch.types.js';

function Switch({ children, className, ...inputProps }: SwitchProps) {
  const inputClassName = ['chayns-switch__input', className].filter(Boolean).join(' ');

  return (
    <label className="chayns-switch">
      <span className="chayns-switch__label">{children}</span>
      <input {...inputProps} className={inputClassName} type="checkbox" />
      <span aria-hidden="true" className="chayns-switch__control">
        <span className="chayns-switch__knob" />
      </span>
    </label>
  );
}

export default Switch;
