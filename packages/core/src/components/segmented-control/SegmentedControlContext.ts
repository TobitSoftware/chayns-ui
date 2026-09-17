import { createContext, useContext } from 'react';

interface SegmentedControlContextValue {
  moveFocus: (currentValue: string, key: string) => void;
  registerSegment: (value: string, element: HTMLButtonElement) => () => void;
  selectValue: (value: string) => void;
  value: string;
}

const SegmentedControlContext = createContext<SegmentedControlContextValue | null>(null);

function useSegmentedControlContext() {
  const context = useContext(SegmentedControlContext);

  if (context === null) {
    throw new Error('SegmentedControl.Segment must be rendered within SegmentedControl.');
  }

  return context;
}

export { SegmentedControlContext, useSegmentedControlContext };
export type { SegmentedControlContextValue };
