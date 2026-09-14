import type { ReactNode } from 'react';

export interface AvatarProps {
  /** Full name used for the accessible name and initials fallback. */
  name: string;

  /** Avatar geometry. */
  size?: 'default' | 'small';

  /** Optional image source. Initials are shown when omitted or unavailable. */
  src?: string;

  /** Optional accessible name override for the avatar. */
  alt?: string;

  /** Decorative content positioned at the lower edge of the avatar. */
  badge?: ReactNode;

  /** Additional class names on the avatar root. */
  className?: string;

  /** Optional id on the avatar root. */
  id?: string;
}
