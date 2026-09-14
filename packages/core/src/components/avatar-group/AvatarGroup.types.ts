import type { ReactNode } from 'react';

import type { AvatarProps } from '../avatar/Avatar.types.js';

export interface AvatarGroupProps {
  /** Avatar children displayed with overlap. */
  children?: ReactNode;

  /** Maximum number of visible tiles, including the overflow tile. */
  max?: number;

  /** Size applied to every Avatar child and the overflow tile. */
  size?: AvatarProps['size'];

  /** Additional class names on the group root. */
  className?: string;

  /** Optional id on the group root. */
  id?: string;
}
