import type { ComponentPropsWithRef, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

export type ButtonContent = Exclude<ReactNode, boolean | null | undefined>;

/** Props for a visible-label native action button. */
export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'children'> {
  variant: ButtonVariant;
  children: ButtonContent;
}

type IconButtonAccessibleName =
  | {
      'aria-label': string;
      'aria-labelledby'?: never;
    }
  | {
      'aria-label'?: never;
      'aria-labelledby': string;
    };

interface IconButtonBaseProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'aria-label' | 'aria-labelledby' | 'children'
> {
  variant: ButtonVariant;
  icon: ReactNode;
  activeIcon?: ReactNode;
}

/** Props for a compact native action button with a required accessible name. */
export type IconButtonProps = IconButtonBaseProps & IconButtonAccessibleName;
