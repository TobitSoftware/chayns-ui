import type { ComponentPropsWithRef, ReactNode } from 'react';

/**
 * @description A FontAwesome Classic icon name in its Regular form, used for
 * tab entry icons.
 */
export type TabsIcon = `fa-${string}`;

/**
 * @description A single tab: its trigger button and the peer content it
 * represents. Selection is externally owned — `Tabs` never infers or
 * reconciles `isActive` itself; the consumer must update it on `onClick`.
 */
export interface TabsEntry {
  /**
   * @description FontAwesome Classic icon name shown on the tab trigger.
   */
  icon: TabsIcon;

  /**
   * @description Visible, already-resolved localized tab label.
   */
  name: string;

  /**
   * @description Whether this entry is the currently selected tab. Exactly
   * one entry in a `tabs` array is expected to be active at a time; the
   * consumer, not `Tabs`, is responsible for keeping this consistent.
   */
  isActive: boolean;

  /**
   * @description Called when this tab's trigger is activated. The consumer
   * is expected to update `isActive` in response.
   */
  onClick: () => void;

  /**
   * @description Optional remove handler. When supplied, a remove affordance
   * is rendered as part of the same native tab button, and `Delete` or
   * `Backspace` triggers it while the tab is focused.
   */
  onRemove?: () => void;

  /**
   * @description Peer panel content for this tab. Only the active entry's
   * `content` is rendered.
   */
  content: ReactNode;
}

/**
 * @description Props for a tabbed layout pattern that switches between peer
 * content regions. `Tabs` owns no routing, persistence, business state or
 * translation; selection state lives entirely in `tabs[].isActive`. Forwards
 * remaining native `div` props (except `children`, which `Tabs` derives from
 * `tabs`), `className` and `ref`.
 */
export interface TabsProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  /**
   * @description Ordered tab entries; exactly one should have `isActive`
   * `true`.
   */
  tabs: TabsEntry[];

  /**
   * @description Optional handler that renders an add-tab trigger when
   * supplied together with `addLabel`.
   */
  onAdd?: () => void;

  /**
   * @description Localized accessible name for the add-tab trigger. Required
   * for the add trigger to render; supplying `onAdd` without `addLabel` does
   * not render the control.
   */
  addLabel?: string;
}
