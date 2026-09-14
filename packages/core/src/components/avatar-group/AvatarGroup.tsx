import { Children, cloneElement, isValidElement } from 'react';

import type { AvatarProps } from '../avatar/Avatar.types.js';
import type { AvatarGroupProps } from './AvatarGroup.types.js';

const AvatarGroup = ({ children, className, id, max, size = 'default' }: AvatarGroupProps) => {
  const avatars = Children.toArray(children).filter((child) => isValidElement<AvatarProps>(child));
  const limited = typeof max === 'number' && max > 0;
  const visibleCount = limited ? Math.max(max - 1, 0) : avatars.length;
  const overflowCount = limited && avatars.length > max ? avatars.length - visibleCount : 0;

  return (
    <span
      className={[
        'chayns-avatar-group',
        size === 'small' ? 'chayns-avatar-group--small' : null,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      id={id}
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
};

export default AvatarGroup;
