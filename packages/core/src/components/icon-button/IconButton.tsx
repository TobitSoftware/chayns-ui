import type { IconButtonProps } from './IconButton.types.js';
import ButtonIcon from '../button/button-icon/ButtonIcon.js';

function IconButton({
  className,
  icon,
  type = 'button',
  variant,
  ...buttonProps
}: IconButtonProps) {
  const resolvedClassName = ['chayns-icon-button', `chayns-icon-button--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button {...buttonProps} className={resolvedClassName} type={type}>
      <ButtonIcon icon={icon} />
    </button>
  );
}

export default IconButton;
