import { forwardRef } from 'react';

import type { IconButtonProps } from './IconButton.types.js';
import ButtonIcon from '../button/button-icon/ButtonIcon.js';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    'aria-busy': ariaBusy,
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
    'chayns-icon-button',
    `chayns-icon-button--${variant}`,
    loading ? 'chayns-icon-button--loading' : '',
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
      <ButtonIcon icon={loading ? 'fa-spinner' : icon} />
    </button>
  );
});

export default IconButton;
