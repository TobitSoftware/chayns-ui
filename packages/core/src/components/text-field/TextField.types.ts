import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Props for a labelled native single-line input. */
export interface TextFieldProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'aria-describedby' | 'aria-invalid' | 'children'
> {
  /** Visible label associated with the native input. */
  label: ReactNode;
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
