import type { ReactNode } from 'react';

/** Props for a single disclosure accordion. */
export interface AccordionProps {
  /** Visible, localized header label used as the accessible name. */
  title: ReactNode;

  /** Panel content revealed when the accordion is open. */
  children?: ReactNode;

  /** Controlled open state. Ignored when inside an AccordionGroup. */
  open?: boolean;

  /** Uncontrolled initial open state. Ignored when inside an AccordionGroup. */
  defaultOpen?: boolean;

  /** Called with the next open state on user toggle. */
  onOpenChange?: (open: boolean) => void;

  /** Disables the header trigger. */
  disabled?: boolean;

  /**
   * Stable id used to wire header and panel and, inside an AccordionGroup, to
   * identify the item. Falls back to a generated id.
   */
  id?: string;

  /** Additional class names on the accordion root element. */
  className?: string;
}

/** Props for a group of mutually exclusive accordions. */
export interface AccordionGroupProps {
  /** Accordion items belonging to the group. */
  children?: ReactNode;

  /** Controlled id of the currently open item, or null when all are closed. */
  openId?: string | null;

  /** Uncontrolled id of the initially open item. */
  defaultOpenId?: string | null;

  /** Called with the next open item id, or null when the group closes. */
  onOpenChange?: (openId: string | null) => void;

  /** Additional class names on the group root element. */
  className?: string;
}
