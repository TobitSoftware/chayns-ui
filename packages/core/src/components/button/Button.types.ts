import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Supported visual emphasis levels for Button and IconButton. */
export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

/** FontAwesome Classic icon name with a Regular and Solid pair. */
export type ButtonIcon = `fa-${string}`;

/** Visible content that gives a Button its accessible name. */
export type ButtonContent = Exclude<ReactNode, boolean | null | undefined>;

/** Props for a visible-label native action button. */
export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  /** Visual emphasis that communicates the action's role. */
  variant: ButtonVariant;

  /** Optional leading FontAwesome Classic icon name. */
  icon?: ButtonIcon;

  /** Visible, non-empty content used as the button label. */
  children: ButtonContent;
}
