import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ButtonIcon } from '@chayns-ui/core';

/** Named configuration values; existing literal props and value lists remain supported. */
export enum TabsAppearances {
  Attached = 'attached',
  Underline = 'underline',
}

export const TABS_APPEARANCES = ['attached', 'underline'] as const;
export type TabsAppearance = (typeof TABS_APPEARANCES)[number];

/** Peer content views; use navigation links for routes and SegmentedControl for settings. */
export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  children: ReactNode;
  /** attached joins a panel surface; underline switches peer views on one shared surface. */
  appearance?: TabsAppearance;
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
  /** Optional decorative leading glyph; uses the same Classic/Brands/custom names as Button. */
  icon?: ButtonIcon;
  /** Omit for a fixed tab. Receives removal requests; the consumer owns the tab/panel entries. */
  onRemove?: (value: string) => void;
}
export interface TabsPanelProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'aria-labelledby' | 'children' | 'role'
> {
  value: string;
  children: ReactNode;
}
/** Optional add action: compose with onClick and a localized name, or omit to keep the list fixed. */
export type TabsAddProps = ComponentPropsWithRef<'button'>;
