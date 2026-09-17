import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}
export type TabsListProps = ComponentPropsWithRef<'div'>;
export interface TabsTabProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'aria-controls' | 'aria-selected' | 'children' | 'role' | 'tabIndex' | 'type'
> {
  value: string;
  children: ReactNode;
  onRemove?: () => void;
}
export interface TabsPanelProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'aria-labelledby' | 'children' | 'role'
> {
  value: string;
  children: ReactNode;
}
export type TabsAddProps = ComponentPropsWithRef<'button'>;
