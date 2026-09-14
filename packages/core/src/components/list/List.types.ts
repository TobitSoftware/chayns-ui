import type { ComponentPropsWithRef, MouseEventHandler, ReactNode } from 'react';

/**
 * @description Props for the vertical list container. Renders a native
 * `<ul>` and forwards all remaining native list props, `className` and
 * `ref`.
 */
export interface ListProps extends ComponentPropsWithRef<'ul'> {
  /**
   * @description List items, typically `ListItem` elements.
   */
  children?: ReactNode;
}

/**
 * @description Props for a single list row, rendered as a navigation link
 * when `href` is set or as an action button when `onClick` is set.
 */
export interface ListItemProps {
  /**
   * @description Primary single-line row label.
   */
  title: ReactNode;

  /**
   * @description Optional secondary single-line preview text shown below
   * `title`.
   */
  subtitle?: ReactNode;

  /**
   * @description Optional leading slot, for example an `Avatar` or icon.
   */
  leading?: ReactNode;

  /**
   * @description Optional trailing slot for row-level actions or metadata,
   * freely composable as any `ReactNode`. Consumers render their own content
   * here, including any future standard-content sub-components chayns UI
   * provides for recurring trailing content.
   */
  trailing?: ReactNode;

  /**
   * @description Shows an accent unread indicator.
   * @default false
   * @remarks Pending replacement per LIST-006 (CONFIRMED): this boolean
   * contract is planned to be superseded by a generic, non-chat-specific
   * status/accent indicator composed via `trailing`. The exact replacement
   * component/prop name is not yet decided — do not assume a new prop name
   * is already available.
   */
  unread?: boolean;

  /**
   * @description Localized accessible name for the unread indicator. Required
   * for the indicator to be perceivable by assistive technology; see the
   * `unread` remarks regarding its planned replacement.
   */
  unreadLabel?: string;

  /**
   * @description Renders the row as a navigation link (native `<a>`) with
   * this destination. Mutually exclusive in practice with `onClick` — a row
   * represents either navigation or an action, not both.
   */
  href?: string;

  /**
   * @description Renders the row as an action button (native `<button>`)
   * with this click handler.
   */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /**
   * @description Disables the action button variant. Not applicable when the
   * row renders as a navigation link.
   * @default false
   */
  disabled?: boolean;

  /**
   * @description Additional class names appended to the list item element.
   */
  className?: string;

  /**
   * @description Optional id on the list item element.
   */
  id?: string;
}
