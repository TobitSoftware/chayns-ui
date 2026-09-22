import type { ComponentPropsWithRef, ReactNode } from 'react';

/** Props for a labelled native radio fieldset. */
export interface RadioGroupProps extends Omit<
  ComponentPropsWithRef<'fieldset'>,
  'children' | 'name'
> {
  /** Optional visible, localized group label rendered as its legend. */
  label?: Exclude<ReactNode, boolean | null | undefined>;
  /** Shared native name forwarded to every Radio. */
  name: string;
  /** Controlled selected option value. */
  value?: string;
  /** Initial selected option value for uncontrolled use. */
  defaultValue?: string;
  /** Called after native radio selection changes. */
  onValueChange?: (value: string) => void;
  /** RadioGroup.Radio children. */
  children: ReactNode;
}

/** Props for a visible-label radio option inside RadioGroup. */
export interface RadioProps extends Omit<
  ComponentPropsWithRef<'input'>,
  'children' | 'type' | 'name' | 'checked' | 'defaultChecked' | 'onChange'
> {
  /** Stable value that identifies this option in its group. */
  value: string;
  /** Visible, localized option label. */
  children: Exclude<ReactNode, boolean | null | undefined>;

  /** Optional localized supporting text associated with the radio label. */
  description?: ReactNode;

  /** RadioGroup owns the input type and selection relationship. */
  type?: never;
  name?: never;
  checked?: never;
  defaultChecked?: never;
  onChange?: ComponentPropsWithRef<'input'>['onChange'];
}
