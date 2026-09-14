import type { ButtonProps } from './Button.types.js';
import ButtonIcon from './ButtonIcon.js';

function Button({
  children,
  className,
  icon,
  type = 'button',
  variant,
  ...buttonProps
}: ButtonProps) {
  const resolvedClassName = ['chayns-button', `chayns-button--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...buttonProps} className={resolvedClassName} type={type}>
      {icon ? <ButtonIcon icon={icon} /> : null}
      {children}
    </button>
  );
}

export default Button;
