import type { ComponentPropsWithRef } from 'react';

export interface SpinnerProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'aria-hidden' | 'children' | 'role' | 'tabIndex'
> {
  children?: never;
  role?: never;
  tabIndex?: never;
  'aria-hidden'?: never;
}
