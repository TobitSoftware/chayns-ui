import type { ChangeEventHandler, ComponentPropsWithRef, ReactNode } from 'react';

export interface SearchBoxItem<T> {
  id: string;
  item: T;
}

export interface SearchBoxProps<T> extends Omit<
  ComponentPropsWithRef<'input'>,
  | 'aria-activedescendant'
  | 'aria-autocomplete'
  | 'aria-controls'
  | 'aria-expanded'
  | 'defaultValue'
  | 'onChange'
  | 'onSelect'
  | 'placeholder'
  | 'role'
  | 'value'
> {
  getItemLabel: (item: T) => string;
  getRemoveItemLabel: (item: T) => string;
  inputValue: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onInputValueChange: (value: string) => void;
  onRemove: (item: SearchBoxItem<T>) => void;
  onSelect: (item: SearchBoxItem<T>) => void;
  placeholder: string;
  renderSelectedItem: (item: T) => ReactNode;
  renderSuggestion: (item: T) => ReactNode;
  selectedItems: SearchBoxItem<T>[];
  suggestions: SearchBoxItem<T>[];
  suggestionsLabel?: string;
}
