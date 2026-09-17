import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ButtonIcon } from '../button/Button.types.js';

export interface PopupProps {
  children: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnEscape?: boolean;
  closeOnOutsidePress?: boolean;
}
export interface PopupTriggerProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'children' | 'type' | 'aria-controls' | 'aria-expanded'
> {
  children: ReactNode;
  /** Internal composition escape hatch for PopupList's documented trigger element. */
  asChild?: boolean;
  type?: never;
}
export type PopupContentProps = ComponentPropsWithRef<'div'>;
export interface PopupListItem {
  icon: ButtonIcon;
  text: string;
  onClick: () => void;
}
export interface PopupListProps {
  trigger: ReactNode;
  items: PopupListItem[];
  className?: string;
}
