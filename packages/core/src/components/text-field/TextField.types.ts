import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Props for a native single-line input with optional help and error content. */
export interface TextFieldProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'aria-describedby' | 'aria-invalid' | 'children'
> {
  /** Supporting content linked to the input. */
  helpText?: ReactNode;
  /** Validation content linked to the input and reflected through aria-invalid. */
  error?: ReactNode;
  /** Visible, consumer-provided counter content. */
  counter?: ReactNode;

  /** Description IDs are generated from the documented help/error slots. */
  'aria-describedby'?: never;

  /** Invalid state is derived exclusively from the documented error slot. */
  'aria-invalid'?: never;
}
