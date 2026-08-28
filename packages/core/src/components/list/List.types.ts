import type { ComponentPropsWithRef, MouseEventHandler, ReactNode } from 'react';

/** Props for the vertical list container. */
export interface ListProps extends ComponentPropsWithRef<'ul'> {
  /** List items, typically ListItem elements. */
  children?: ReactNode;
}

/** Props for a single list row. */
export interface ListItemProps {
  /** Primary single-line row label. */
  title: ReactNode;

  /** Optional secondary single-line preview text. */
  subtitle?: ReactNode;

  /** Optional leading slot, for example an avatar or icon. */
  leading?: ReactNode;

  /** Optional trailing slot for row-level actions or metadata. */
  trailing?: ReactNode;

  /** Shows an accent unread indicator. */
  unread?: boolean;

  /** Localized accessible name for the unread indicator. */
  unreadLabel?: string;

  /** Renders the row as a navigation link with this destination. */
  href?: string;

  /** Renders the row as an action button with this handler. */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /** Disables the action button variant. */
  disabled?: boolean;

  /** Additional class names on the list item element. */
  className?: string;

  /** Optional id on the list item element. */
  id?: string;
}
