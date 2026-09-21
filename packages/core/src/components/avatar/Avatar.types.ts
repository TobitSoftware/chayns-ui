import type { ComponentPropsWithRef, ReactNode } from 'react';

/**
 * @description Props for a single circular identity avatar: an image with a
 * deterministic initials-and-tone fallback. `size` is a designer-approved
 * local geometry variant for this component, not a global S/M/L density
 * variant.
 */
export interface AvatarProps extends Omit<
  ComponentPropsWithRef<'span'>,
  'children' | 'role' | 'aria-label'
> {
  /**
   * @description Full name used to derive both the accessible name (unless
   * `alt` is given) and the initials fallback shown when no image is
   * available.
   */
  name: string;

  /**
   * @description Avatar geometry variant.
   * @default 'default'
   */
  size?: 'default' | 'small' | 'large';

  /**
   * @description Optional image source. Initials are shown instead when
   * omitted or when the image fails to load.
   */
  src?: string;

  /**
   * @description Optional accessible name override for the avatar, used
   * instead of `name` when the visible identity text differs from the
   * accessible name.
   */
  alt?: string;

  /**
   * @description Decorative content positioned at the lower edge of the
   * avatar, for example a presence or status marker. Always rendered
   * `aria-hidden` — any meaning it conveys must also be available elsewhere.
   */
  badge?: ReactNode;
}
