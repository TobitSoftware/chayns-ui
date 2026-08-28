import type { CardProps } from './Card.types.js';

function Card({ children, className, elevated = false, ...cardProps }: CardProps) {
  const resolvedClassName = ['chayns-card', elevated ? 'chayns-card--elevated' : null, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div {...cardProps} className={resolvedClassName}>
      {children}
    </div>
  );
}

export default Card;
