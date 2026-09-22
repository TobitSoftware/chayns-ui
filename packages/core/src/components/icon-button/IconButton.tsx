import { forwardRef } from 'react';

import type { IconButtonProps } from './IconButton.types.js';
import ButtonIcon from '../button/button-icon/ButtonIcon.js';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { className, icon, type = 'button', variant, ...buttonProps },
  ref,
) {
  const resolvedClassName = ['chayns-icon-button', `chayns-icon-button--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...buttonProps} className={resolvedClassName} ref={ref} type={type}>
      <ButtonIcon icon={icon} />
    </button>
  );
});

export default IconButton;
