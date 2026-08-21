import type { IconButtonProps } from './Button.types.js';
import { getButtonClassName } from './buttonClassName.js';

function IconButton({
  activeIcon,
  className,
  icon,
  type = 'button',
  variant,
  ...buttonProps
}: IconButtonProps) {
  const hasActiveIcon = activeIcon !== undefined && activeIcon !== null;
  const baseClassName = getButtonClassName('chayns-icon-button', variant, className);
  const resolvedClassName = hasActiveIcon
    ? `${baseClassName} chayns-icon-button--paired`
    : baseClassName;

  return (
    <button {...buttonProps} className={resolvedClassName} type={type}>
      <span aria-hidden="true" className="chayns-icon-button__icon">
        {icon}
      </span>
      {hasActiveIcon ? (
        <span
          aria-hidden="true"
          className="chayns-icon-button__icon chayns-icon-button__icon--active"
        >
          {activeIcon}
        </span>
      ) : null}
    </button>
  );
}

export default IconButton;
