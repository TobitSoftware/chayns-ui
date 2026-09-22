import { forwardRef } from 'react';

import type { ButtonProps } from './Button.types.js';
import ButtonIcon from './button-icon/ButtonIcon.js';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    'aria-busy': ariaBusy,
    children,
    className,
    disabled,
    icon,
    loading = false,
    type = 'button',
    variant,
    ...buttonProps
  },
  ref,
) {
  const resolvedClassName = [
    'chayns-button',
    `chayns-button--${variant}`,
    loading ? 'chayns-button--loading' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      {...buttonProps}
      aria-busy={loading ? true : ariaBusy}
      className={resolvedClassName}
      disabled={loading || disabled}
      ref={ref}
      type={type}
    >
      {loading ? <ButtonIcon icon="fa-spinner" /> : icon ? <ButtonIcon icon={icon} /> : null}
      {children}
    </button>
  );
});

export default Button;
