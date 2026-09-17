import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface AppLayoutProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  children: ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}
export type AppLayoutHeaderProps = ComponentPropsWithRef<'header'>;
export type AppLayoutLogoProps = ComponentPropsWithRef<'img'>;
export type AppLayoutNavigationProps = ComponentPropsWithRef<'nav'>;
export interface AppLayoutNavigationItemProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'children' | 'ref' | 'type'
> {
  label: ReactNode;
  children?: ReactNode;
  href?: string;
  isActive?: boolean;
}
export type AppLayoutContentProps = ComponentPropsWithRef<'main'>;
export interface AppLayoutCollapseToggleProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'children' | 'type' | 'aria-label'
> {
  collapseLabel: string;
  expandLabel: string;
  children?: ReactNode;
}
