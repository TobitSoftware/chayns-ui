import type { ComponentPropsWithRef } from 'react';

import type { ButtonIcon, ButtonVariant } from '../button/Button.types.js';

/**
 * @description The two mutually-exclusive accessible-name mechanisms an
 * `IconButton` can use, matching the native accessible-name contract:
 * exactly one of `aria-label` or `aria-labelledby` must be supplied.
 */
type IconButtonAccessibleName =
  | {
      /**
       * @description Localized accessible name when no external label
       * element exists.
       */
      'aria-label': string;
      'aria-labelledby'?: never;
    }
  | {
      'aria-label'?: never;

      /**
       * @description ID of the element that provides the localized
       * accessible name.
       */
      'aria-labelledby': string;
    };

export interface IconButtonBaseProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'aria-label' | 'aria-labelledby' | 'children'
> {
  /**
   * @description Visual emphasis that communicates the action's role within
   * its action scope, using the same four values as `Button`.
   */
  variant: ButtonVariant;

  /**
   * @description Required FontAwesome Classic or Brands icon name. Classic
   * icons render Regular at rest and Solid on hover/active; Brands icons
   * render without Classic weight classes. `IconButton` has no visible label,
   * so this is its only visible content.
   */
  icon: ButtonIcon;

  /** Shows a spinner while preserving the accessible name and disabling the action. */
  loading?: boolean;
}

/**
 * @description Props for a compact, icon-only native action button. Does not
 * accept `children` — it is icon-only by contract — and requires exactly one
 * of `aria-label` or `aria-labelledby` to guarantee an accessible name.
 */
export type IconButtonProps = IconButtonBaseProps & IconButtonAccessibleName;
