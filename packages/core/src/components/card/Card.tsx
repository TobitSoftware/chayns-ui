import { forwardRef } from 'react';

import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import type { CardHeaderProps, CardProps } from './Card.types.js';

const CardHeader = forwardRef<HTMLElement, CardHeaderProps>(function CardHeader(
  { children, className, icon, ...headerProps },
  ref,
) {
  const resolvedClassName = ['chayns-card__header', className].filter(Boolean).join(' ');

  return (
    <header {...headerProps} className={resolvedClassName} ref={ref}>
      {icon ? (
        <span aria-hidden="true" className="chayns-card__header-icon">
          <ButtonIcon icon={icon} />
        </span>
      ) : null}
      <span className="chayns-card__header-content">{children}</span>
    </header>
  );
});

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, ...cardProps },
  ref,
) {
  const resolvedClassName = ['chayns-card', className].filter(Boolean).join(' ');

  return (
    <div {...cardProps} className={resolvedClassName} ref={ref}>
      {children}
    </div>
  );
});

const Card = Object.assign(CardRoot, { Header: CardHeader });

export default Card;
