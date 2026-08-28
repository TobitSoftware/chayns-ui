import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Props for the presentational surface container. */
export interface CardProps extends ComponentPropsWithRef<'div'> {
  /** Content rendered inside the card surface. */
  children?: ReactNode;

  /** Adds the subtle resting card elevation token. */
  elevated?: boolean;
}
