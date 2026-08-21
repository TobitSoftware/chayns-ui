import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Supported visual emphasis levels for Button and IconButton. */
export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

/** Visible content that gives a Button its accessible name. */
export type ButtonContent = Exclude<ReactNode, boolean | null | undefined>;

/** Props for a visible-label native action button. */
export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  /** Visual emphasis that communicates the action's role. */
  variant: ButtonVariant;

  /** Visible, non-empty content used as the button label. */
  children: ButtonContent;
}

type IconButtonAccessibleName =
  | {
      /** Localized accessible name when no external label element exists. */
      'aria-label': string;
      'aria-labelledby'?: never;
    }
  | {
      'aria-label'?: never;

      /** ID of the element that provides the localized accessible name. */
      'aria-labelledby': string;
    };

interface IconButtonBaseProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'aria-label' | 'aria-labelledby' | 'children'
> {
  /** Visual emphasis that communicates the action's role. */
  variant: ButtonVariant;

  /** Decorative regular icon rendered in the resting state. */
  icon: ReactNode;

  /** Decorative solid icon rendered on hover and while active. */
  activeIcon?: ReactNode;
}

/** Props for a compact native action button with a required accessible name. */
export type IconButtonProps = IconButtonBaseProps & IconButtonAccessibleName;
