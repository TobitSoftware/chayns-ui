import type { IconButtonProps } from '../button/Button.types.js';
import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import { getButtonClassName } from '../button/buttonClassName.js';

const IconButton = ({
  className,
  icon,
  type = 'button',
  variant,
  ...buttonProps
}: IconButtonProps) => {
  const resolvedClassName = getButtonClassName('chayns-icon-button', variant, className);

  return (
    <button {...buttonProps} className={resolvedClassName} type={type}>
      <ButtonIcon icon={icon} />
    </button>
  );
};

export default IconButton;
