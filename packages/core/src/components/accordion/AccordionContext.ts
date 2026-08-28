import { createContext } from 'react';

/**
 * Nesting depth of the current accordion subtree. Depth 0 is a top-level
 * accordion; any depth greater than 0 renders as an automatically detected
 * wrapped (nested) accordion. Each open panel provides an incremented depth to
 * its content.
 */
export const AccordionDepthContext = createContext<number>(0);

/** Exclusive open-state contract shared by an AccordionGroup with its items. */
export interface AccordionGroupContextValue {
  /** Whether the item registered under this id is the open one. */
  isOpen: (id: string) => boolean;

  /** Toggles the item registered under this id within the group. */
  toggle: (id: string) => void;
}

/**
 * Present when an Accordion is rendered inside an AccordionGroup. Items then
 * share the group's exclusive open state instead of owning local state.
 */
export const AccordionGroupContext = createContext<AccordionGroupContextValue | null>(null);
