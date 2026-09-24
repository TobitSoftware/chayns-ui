import type { ComponentPropsWithRef } from 'react';

type ProgressbarAriaProps =
  | 'aria-label'
  | 'aria-labelledby'
  | 'aria-valuemax'
  | 'aria-valuemin'
  | 'aria-valuenow'
  | 'aria-valuetext';

export interface ProgressProps extends Omit<
  ComponentPropsWithRef<'div'>,
  ProgressbarAriaProps | 'children' | 'role' | 'tabIndex'
> {
  label: string;
  rootProps?: Omit<ComponentPropsWithRef<'div'>, 'children'>;
  value: number;
  children?: never;
  role?: never;
  tabIndex?: never;
  'aria-label'?: never;
  'aria-labelledby'?: never;
  'aria-valuemax'?: never;
  'aria-valuemin'?: never;
  'aria-valuenow'?: never;
  'aria-valuetext'?: never;
}
