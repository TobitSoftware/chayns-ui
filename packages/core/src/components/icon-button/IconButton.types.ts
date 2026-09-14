import type { ComponentPropsWithRef } from 'react';

import type { ButtonIcon, ButtonVariant } from '../button/Button.types.js';

type IconButtonAccessibleName =
  | {
      /** Localized accessible name when no external label element exists. */
      'aria-label': string;
      'aria-labelledby'?: never;
    }
  | {
      'aria-label'?: never;

      /** ID of the element that provides the localized accessible name. */
      'aria-labelledby': string;
    };

interface IconButtonBaseProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'aria-label' | 'aria-labelledby' | 'children'
> {
  /** Visual emphasis that communicates the action's role. */
  variant: ButtonVariant;

  /** FontAwesome Classic icon name rendered Regular at rest and Solid on interaction. */
  icon: ButtonIcon;
}

/** Props for a compact native action button with a required accessible name. */
export type IconButtonProps = IconButtonBaseProps & IconButtonAccessibleName;
