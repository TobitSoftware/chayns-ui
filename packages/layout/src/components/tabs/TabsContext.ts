import { createContext, useContext } from 'react';
import type { TabsAppearance } from './Tabs.types.js';

export interface TabsContextValue {
  baseId: string;
  appearance: TabsAppearance;
  exitingValue: string | undefined;
  finishExit: (value: string) => void;
  select: (value: string) => void;
  tabs: Map<string, HTMLButtonElement>;
  entryValue: string | undefined;
  register: (value: string, node: HTMLButtonElement | null) => void;
  notify: () => void;
  value: string | undefined;
}
export const TabsContext = createContext<TabsContextValue | null>(null);
export function useTabs(part: string) {
  const context = useContext(TabsContext);
  if (context === null) throw new Error(`Tabs.${part} must be rendered within Tabs.`);
  return context;
}
