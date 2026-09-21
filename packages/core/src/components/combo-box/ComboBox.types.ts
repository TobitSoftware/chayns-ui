import type { ComponentPropsWithRef, ReactElement, ReactNode } from 'react';

export interface ComboBoxOptionProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'children' | 'role' | 'aria-selected'
> {
  value: string;
  children: Exclude<ReactNode, boolean | null | undefined>;
  role?: never;
  'aria-selected'?: never;
}

type ComboBoxBaseProps = Omit<
  ComponentPropsWithRef<'input'>,
  | 'children'
  | 'defaultValue'
  | 'value'
  | 'multiple'
  | 'role'
  | 'aria-activedescendant'
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-autocomplete'
  | 'onBlur'
  | 'onChange'
  | 'onKeyDown'
> & {
  children: ReactNode;
  /** Bodywork floating label. */
  placeholder?: string;
  /** Opens the popup when the input receives focus. */
  openOnFocus?: boolean;
  onBlur?: ComponentPropsWithRef<'input'>['onBlur'];
  onChange?: ComponentPropsWithRef<'input'>['onChange'];
  onKeyDown?: ComponentPropsWithRef<'input'>['onKeyDown'];
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
