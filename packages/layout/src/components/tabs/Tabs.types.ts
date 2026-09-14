import type { ComponentPropsWithRef, ReactNode } from 'react';

export type TabsIcon = `fa-${string}`;

export interface TabsEntry {
  icon: TabsIcon;
  name: string;
  isActive: boolean;
  onClick: () => void;
  onRemove?: () => void;
  content: ReactNode;
}

export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  tabs: TabsEntry[];
  onAdd?: () => void;
  addLabel?: string;
}
