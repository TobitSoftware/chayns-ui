import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Props for a visible-label native checkbox used as an immediate setting. */
export interface SwitchProps extends Omit<ComponentPropsWithRef<'input'>, 'children' | 'type'> {
  /** Visible, localized label associated with the native checkbox. */
  children: Exclude<ReactNode, boolean | null | undefined>;

  /** Switch owns its native input type. */
  type?: never;
}
