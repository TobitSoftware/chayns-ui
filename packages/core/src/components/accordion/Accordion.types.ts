import type { ComponentPropsWithRef, ReactNode } from 'react';

/**
 * @description Props for a single disclosure accordion: a header button that
 * expands and collapses an associated content region. Nesting an `Accordion`
 * inside another `Accordion`'s content is automatically detected via React
 * context and rendered as the "Wrapped" presentation — there is no separate
 * component or prop for that case.
 */
export interface AccordionProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'children' | 'id' | 'title'
> {
  /**
   * @description Visible, localized header label used as the accordion's
   * accessible name.
   */
  title: ReactNode;

  /**
   * @description Panel content revealed when the accordion is open.
   */
  children?: ReactNode;

  /**
   * @description Controlled open state. Ignored when the accordion is
   * rendered inside an `AccordionGroup`, which owns exclusivity instead.
   */
  open?: boolean;

  /**
   * @description Uncontrolled initial open state. Ignored when inside an
   * `AccordionGroup`.
   * @default false
   */
  defaultOpen?: boolean;

  /**
   * @description Called with the next open state on user toggle, for both
   * the controlled and uncontrolled usage.
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * @description Disables the header trigger, preventing toggling.
   * @default false
   */
  disabled?: boolean;

  /**
   * @description Stable id used to wire the header and panel via ARIA and,
   * inside an `AccordionGroup`, to identify this item. Falls back to a
   * generated id when omitted.
   */
  id?: string;

  /**
   * @description Additional class names appended to the accordion root
   * element.
   */
  className?: string;
}

/**
 * @description Props for a group of mutually exclusive accordions: at most
 * one child `Accordion` is open at a time, and the group renders its
 * children as one joined surface.
 */
export interface AccordionGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  /**
   * @description `Accordion` items belonging to the group.
   */
  children?: ReactNode;

  /**
   * @description Controlled id of the currently open item, or `null` when
   * all items are closed.
   */
  openId?: string | null;

  /**
   * @description Uncontrolled id of the initially open item.
   * @default null
   */
  defaultOpenId?: string | null;

  /**
   * @description Called with the next open item id, or `null` when the group
   * closes entirely, for both the controlled and uncontrolled usage.
   */
  onOpenChange?: (openId: string | null) => void;

  /**
   * @description Additional class names appended to the group root element.
   */
  className?: string;
}
