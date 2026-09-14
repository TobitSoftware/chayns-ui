import type { ComponentPropsWithRef, ReactNode } from 'react';

export type AppLayoutIcon = `fa-${string}`;

export interface AppLayoutItem {
  id: string;
  name: string;
  icon: AppLayoutIcon;
  children?: AppLayoutItem[];
}

export interface AppLayoutProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onClick'> {
  logo: string;
  items: AppLayoutItem[];
  onClick: (id: string) => void;
  navigationLabel: string;
  collapseLabel: string;
  expandLabel: string;
  activeItemId?: string;
  children?: ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}
