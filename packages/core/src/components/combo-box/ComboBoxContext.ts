import { createContext, useContext } from 'react';

import type { ComboBoxOptionProps } from './ComboBox.types.js';

export interface ComboBoxContextValue {
  activeValue?: string | undefined;
  close: () => void;
  inputText: string;
  isSelected: (value: string) => boolean;
  multiple: boolean;
  optionId: (value: string) => string;
  select: (value: string) => void;
  visibleValues: string[];
}

export const ComboBoxContext = createContext<ComboBoxContextValue | null>(null);

export function useComboBoxContext(): ComboBoxContextValue {
  const context = useContext(ComboBoxContext);

  if (context === null) {
    throw new Error('ComboBox.Option must be rendered within ComboBox.');
  }

  return context;
}

export function getOptionLabel(option: ComboBoxOptionProps['children']): string {
  if (typeof option === 'string' || typeof option === 'number') {
    return String(option);
  }

  return '';
}
