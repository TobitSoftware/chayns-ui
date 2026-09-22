import type { ComponentPropsWithRef, ReactNode } from 'react';

import type { ButtonIcon } from '../button/Button.types.js';

/**
 * @description Props for the presentational surface container. `Card` is
 * purely presentational: it exposes no click or keyboard semantics. Forwards
 * all remaining native `div` props, `className` and `ref`.
 */
export interface CardProps extends ComponentPropsWithRef<'div'> {
  /**
   * @description Content rendered inside the card surface. Card owns the
   * standard Design System inner spacing around this content.
   */
  children?: ReactNode;
}

export interface CardHeaderProps extends ComponentPropsWithRef<'header'> {
  /** Optional leading icon rendered in the semantic header area. */
  icon?: ButtonIcon;
  children?: ReactNode;
}
