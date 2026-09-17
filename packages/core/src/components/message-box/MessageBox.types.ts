import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Supported static MessageBox presentations. */
export type MessageBoxTone = 'neutral' | 'admin' | 'warning';

/** Props for a static, freely composed aside note. */
export interface MessageBoxProps extends Omit<ComponentPropsWithRef<'aside'>, 'children' | 'role'> {
  /** Surface presentation for the static note. */
  tone?: MessageBoxTone;
  /** Consumer-composed content such as title, text, icon and follow action. */
  children: ReactNode;

  /** MessageBox owns its static note role. */
  role?: never;
}
