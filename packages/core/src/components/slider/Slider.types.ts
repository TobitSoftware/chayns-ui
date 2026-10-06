import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Approximate bounded immediate settings; use Stepper for exact quantities. */
export interface SliderProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'type' | 'aria-valuetext'
> {
  label: Exclude<ReactNode, boolean | null | undefined>;
  /** Resolves all locale/unit formatting for the visible output and aria-valuetext. */
  formatValue: (value: number) => string;
  type?: never;
  'aria-valuetext'?: never;
}
