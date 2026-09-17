import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Props for a labelled native multi-line textarea. */
export interface TextAreaProps extends Omit<
  ComponentPropsWithRef<'textarea'>,
  'aria-describedby' | 'aria-invalid' | 'children'
> {
  /** Visible label associated with the native textarea. */
  label: ReactNode;
  /** Supporting content linked to the textarea. */
  helpText?: ReactNode;
  /** Validation content linked to the textarea and reflected through aria-invalid. */
  error?: ReactNode;
  /** Visible, consumer-provided counter content. */
  counter?: ReactNode;

  /** Description IDs are generated from the documented help/error slots. */
  'aria-describedby'?: never;

  /** Invalid state is derived exclusively from the documented error slot. */
  'aria-invalid'?: never;
}
