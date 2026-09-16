import type { ComponentPropsWithRef, ReactNode } from 'react';

/**
 * @description A FontAwesome Classic icon name in its Regular form, used for
 * navigation item icons in `AppLayout`.
 */
export type AppLayoutIcon = `fa-${string}`;

/**
 * @description A single, recursively composable navigation entry in the
 * `AppLayout` sidebar. Parent and child items each act as their own action
 * button; a parent item with `children` additionally exposes a separate
 * disclosure control, so activating the parent's own action and toggling its
 * nested children are independent.
 */
export interface AppLayoutItem {
  /**
   * @description Stable identifier passed to `onClick` and compared against
   * `activeItemId`.
   */
  id: string;

  /**
   * @description Visible, localized navigation label. Remains accessible for
   * each item even while the sidebar is collapsed.
   */
  name: string;

  /**
   * @description FontAwesome Classic icon name shown for this item, including
   * in the collapsed sidebar.
   */
  icon: AppLayoutIcon;

  /**
   * @description Nested child items, rendered behind this item's own
   * disclosure control and hidden while the sidebar is collapsed.
   */
  children?: AppLayoutItem[];
}

/**
 * @description Props for the top-level application shell: a header with a
 * logo, a collapsible sidebar of recursively nested navigation items, and a
 * consumer-owned content area. Forwards all remaining native `div` props
 * (except `children` and `onClick`, which have `AppLayout`-specific meaning),
 * `className` and `ref`.
 */
export interface AppLayoutProps extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'onClick'> {
  /**
   * @description URL of an image or SVG resource rendered as the header logo.
   * Always decorative (`alt=""`); it does not itself provide any accessible
   * name.
   */
  logo: string;

  /**
   * @description Optional consumer-provided content rendered in the remaining
   * header area to the right of the logo.
   */
  headerContent?: ReactNode;

  /**
   * @description Top-level navigation items, recursively composable via each
   * item's own `children`. An empty array renders an empty navigation list.
   */
  items: AppLayoutItem[];

  /**
   * @description Called with an item's `id` when that item's own action is
   * activated, for both parent and child items. Toggling a parent's
   * disclosure control does not call `onClick`.
   */
  onClick: (id: string) => void;

  /**
   * @description Localized accessible name for the navigation landmark.
   */
  navigationLabel: string;

  /**
   * @description Localized accessible name for the sidebar toggle control
   * when activating it will collapse the sidebar.
   */
  collapseLabel: string;

  /**
   * @description Localized accessible name for the sidebar toggle control
   * when activating it will expand the sidebar.
   */
  expandLabel: string;

  /**
   * @description `id` of the currently active navigation item. `AppLayout`
   * only renders the active visual state; it does not derive or own
   * activeness from routing.
   */
  activeItemId?: string;

  /**
   * @description Consumer-provided content rendered in the area beside the
   * sidebar. Owns its own internal semantics and scrolling.
   */
  children?: ReactNode;

  /**
   * @description Controlled collapsed state of the sidebar.
   */
  collapsed?: boolean;

  /**
   * @description Uncontrolled initial collapsed state of the sidebar.
   * Persisting the collapsed state across sessions is outside `AppLayout`'s
   * responsibility.
   * @default false
   */
  defaultCollapsed?: boolean;

  /**
   * @description Called with the next collapsed state when the sidebar
   * toggle is activated, for both the controlled and uncontrolled usage.
   */
  onCollapsedChange?: (collapsed: boolean) => void;
}
