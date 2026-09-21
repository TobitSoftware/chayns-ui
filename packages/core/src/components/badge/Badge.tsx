import { forwardRef } from 'react';

import type { BadgeProps } from './Badge.types.js';

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    'aria-label': ariaLabel,
    children,
    className,
    onRemove,
    removeLabel,
    size = 'sm',
    tone = 'neutral',
    ...spanProps
  },
  ref,
) {
  const resolvedClassName = [
    'chayns-badge',
    `chayns-badge--${tone}`,
    `chayns-badge--${size}`,
    onRemove ? 'chayns-badge--removable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      {...spanProps}
      aria-label={ariaLabel}
      className={resolvedClassName}
      ref={ref}
      role={ariaLabel === undefined ? undefined : 'status'}
    >
      <span className="chayns-badge__content">{children}</span>
      {onRemove ? (
        <button
          aria-label={removeLabel}
          className="chayns-badge__remove"
          onClick={onRemove}
          type="button"
        >
          ×
        </button>
      ) : null}
    </span>
  );
});

export default Badge;
