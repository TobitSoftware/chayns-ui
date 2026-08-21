import type { ButtonProps } from './Button.types.js';
import { getButtonClassName } from './buttonClassName.js';

function Button({ children, className, type = 'button', variant, ...buttonProps }: ButtonProps) {
  const resolvedClassName = getButtonClassName('chayns-button', variant, className);

  return (
    <button {...buttonProps} className={resolvedClassName} type={type}>
      {children}
    </button>
  );
}

export default Button;
