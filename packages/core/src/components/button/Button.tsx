import type { ButtonProps } from './Button.types.js';
import ButtonIcon from './ButtonIcon.js';
import { getButtonClassName } from './buttonClassName.js';

function Button({
  children,
  className,
  icon,
  type = 'button',
  variant,
  ...buttonProps
}: ButtonProps) {
  const resolvedClassName = getButtonClassName('chayns-button', variant, className);

  return (
    <button {...buttonProps} className={resolvedClassName} type={type}>
      {icon ? <ButtonIcon icon={icon} /> : null}
      {children}
    </button>
  );
}

export default Button;
