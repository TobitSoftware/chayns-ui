import type { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';

export interface ComboBoxOptionProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'children' | 'role' | 'aria-selected' | 'tabIndex'
> {
  value: string;
  children: Exclude<ReactNode, boolean | null | undefined>;
  disabled?: boolean;
  role?: never;
  'aria-selected'?: never;
  tabIndex?: never;
}

type ComboBoxBaseProps = Omit<
  ComponentPropsWithRef<'button'>,
  | 'children'
  | 'defaultValue'
  | 'value'
  | 'multiple'
  | 'type'
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-haspopup'
> & {
  children: ReactNode;
  placeholder?: string;
};

export interface ComboBoxSingleProps extends ComboBoxBaseProps {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export interface ComboBoxMultipleProps extends ComboBoxBaseProps {
  multiple: true;
  value?: ReactElement<ComboBoxOptionProps>[];
  defaultValue?: ReactElement<ComboBoxOptionProps>[];
  onValueChange?: (value: ReactElement<ComboBoxOptionProps>[]) => void;
}

export type ComboBoxProps = ComboBoxSingleProps | ComboBoxMultipleProps;
