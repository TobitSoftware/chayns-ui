import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Props for a visible-label native checkbox. */
export interface CheckboxProps extends Omit<ComponentPropsWithRef<'input'>, 'children' | 'type'> {
  /** Visible, localized label associated with the native checkbox. */
  children: Exclude<ReactNode, boolean | null | undefined>;

  /** Checkbox owns its native input type. */
  type?: never;
}
