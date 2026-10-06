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
export interface NavigationItemContent {
  /** Leading FontAwesome icon; content and routing remain application-owned. */
  icon?: `fa-${string}`;
  label: ReactNode;
  children?: ReactNode;
  isActive?: boolean;
}
export type AppLayoutNavigationItemProps = NavigationItemContent &
  (
    | (Omit<ComponentPropsWithRef<'a'>, 'children'> & { href: string })
    | (Omit<ComponentPropsWithRef<'button'>, 'children' | 'type'> & {
        href?: undefined;
        type?: never;
      })
  );
export type AppLayoutContentProps = ComponentPropsWithRef<'main'>;
export interface AppLayoutCollapseToggleProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'children' | 'type' | 'aria-label'
> {
  collapseLabel: string;
  expandLabel: string;
  children?: ReactNode;
}
