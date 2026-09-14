import type { ReactNode } from 'react';

import type { AvatarProps } from '../avatar/Avatar.types.js';

/**
 * @description Props for a compact, overlapping stack of `Avatar` children
 * with an overflow tile once `max` is exceeded.
 */
export interface AvatarGroupProps {
  /**
   * @description `Avatar` children displayed with overlap, in order.
   */
  children?: ReactNode;

  /**
   * @description Maximum number of visible tiles, including the overflow
   * tile shown for any remaining avatars beyond this count. Omit to render
   * every child without an overflow tile.
   */
  max?: number;

  /**
   * @description Size applied uniformly to every `Avatar` child and to the
   * overflow tile; overrides each child's own `size`.
   * @default 'default'
   */
  size?: AvatarProps['size'];

  /**
   * @description Additional class names appended to the group root element.
   */
  className?: string;

  /**
   * @description Optional id on the group root element.
   */
  id?: string;
}
