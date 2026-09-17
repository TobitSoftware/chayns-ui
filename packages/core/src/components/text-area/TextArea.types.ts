import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Props for a native multi-line textarea with optional help and error content. */
export interface TextAreaProps extends Omit<
  ComponentPropsWithRef<'textarea'>,
  'aria-describedby' | 'aria-invalid' | 'children'
> {
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
