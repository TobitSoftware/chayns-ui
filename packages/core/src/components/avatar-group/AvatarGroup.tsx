import { Children, cloneElement, forwardRef, isValidElement } from 'react';

import type { AvatarProps } from '../avatar/Avatar.types.js';
import type { AvatarGroupProps } from './AvatarGroup.types.js';

const AvatarGroup = forwardRef<HTMLSpanElement, AvatarGroupProps>(function AvatarGroup(
  { children, className, max, size = 'default', ...spanProps },
  ref,
) {
  const avatars = Children.toArray(children).filter((child) => isValidElement<AvatarProps>(child));
  const limited = typeof max === 'number' && Number.isFinite(max) && max >= 1;
  const hasOverflow = limited && avatars.length > max;
  const visibleCount = hasOverflow ? Math.max(Math.floor(max) - 1, 0) : avatars.length;
  const overflowCount = hasOverflow ? avatars.length - visibleCount : 0;

  return (
    <span
      className={['chayns-avatar-group', `chayns-avatar-group--${size}`, className]
        .filter(Boolean)
        .join(' ')}
      {...spanProps}
      ref={ref}
    >
      {avatars.slice(0, visibleCount).map((avatar) =>
        cloneElement(avatar, {
          size,
        }),
      )}
      {overflowCount > 0 ? (
        <span aria-hidden="true" className="chayns-avatar-group__overflow">
          +{overflowCount}
        </span>
      ) : null}
    </span>
  );
});

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
