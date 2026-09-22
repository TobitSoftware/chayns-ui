import { forwardRef, useState } from 'react';

import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import type { BannerProps } from './Banner.types.js';

const Banner = forwardRef<HTMLElement, BannerProps>(function Banner(
  {
    children,
    className,
    closeLabel,
    defaultOpen = true,
    icon,
    onClose,
    onOpenChange,
    open,
    tone = 'neutral',
    ...asideProps
  },
  ref,
) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isOpen = open ?? uncontrolledOpen;

  function handleClose() {
    if (open === undefined) {
      setUncontrolledOpen(false);
    }

    onOpenChange?.(false);
    onClose?.();
  }

  if (!isOpen) {
    return null;
  }

  const resolvedClassName = ['chayns-banner', `chayns-banner--${tone}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <aside {...asideProps} className={resolvedClassName} ref={ref}>
      {icon ? (
        <span aria-hidden="true" className="chayns-banner__icon">
          <ButtonIcon icon={icon} />
        </span>
      ) : null}
      <div className="chayns-banner__content">{children}</div>
      {onClose ? (
        <button
          aria-label={closeLabel}
          className="chayns-banner__close"
          onClick={handleClose}
          type="button"
        >
          <ButtonIcon icon="fa-xmark" />
        </button>
      ) : null}
    </aside>
  );
});

export default Banner;
