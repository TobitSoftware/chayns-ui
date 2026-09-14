import type { ComponentPropsWithRef, ReactNode } from 'react';

/**
 * @description Props for the presentational surface container. `Card` is
 * purely presentational: it exposes no click or keyboard semantics and no
 * intrinsic padding. Forwards all remaining native `div` props, `className`
 * and `ref`.
 */
export interface CardProps extends ComponentPropsWithRef<'div'> {
  /**
   * @description Content rendered inside the card surface. Any content may be
   * composed inside; internal spacing is owned by that content or a
   * container, not by `Card`.
   */
  children?: ReactNode;

  /**
   * @description Adds the subtle resting card elevation token on top of the
   * Design System `.card` surface treatment.
   * @default false
   */
  elevated?: boolean;
}
