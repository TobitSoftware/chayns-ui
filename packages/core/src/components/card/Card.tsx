import { forwardRef } from 'react';

import type { CardProps } from './Card.types.js';

const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, className, elevated = false, ...cardProps },
  ref,
) {
  const resolvedClassName = ['chayns-card', elevated ? 'chayns-card--elevated' : null, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div {...cardProps} className={resolvedClassName} ref={ref}>
      {children}
    </div>
  );
});

export default Card;
