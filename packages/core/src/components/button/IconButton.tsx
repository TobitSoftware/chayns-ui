import type { IconButtonProps } from './Button.types.js';
import ButtonIcon from './ButtonIcon.js';
import { getButtonClassName } from './buttonClassName.js';

function IconButton({
  className,
  icon,
  type = 'button',
  variant,
  ...buttonProps
}: IconButtonProps) {
  const resolvedClassName = getButtonClassName('chayns-icon-button', variant, className);

  return (
    <button {...buttonProps} className={resolvedClassName} type={type}>
      <ButtonIcon icon={icon} />
    </button>
  );
}

export default IconButton;
