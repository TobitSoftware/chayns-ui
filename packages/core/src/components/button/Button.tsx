import { forwardRef } from 'react';

import type { ButtonProps } from './Button.types.js';
import ButtonIcon from './button-icon/ButtonIcon.js';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, icon, type = 'button', variant, ...buttonProps },
  ref,
) {
  const resolvedClassName = ['chayns-button', `chayns-button--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...buttonProps} className={resolvedClassName} ref={ref} type={type}>
      {icon ? <ButtonIcon icon={icon} /> : null}
      {children}
    </button>
  );
});

export default Button;
