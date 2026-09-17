import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface ControlledSelection {
  /** Controlled selected segment value. */
  value: string;
  /** Receives the next value after activation. */
  onValueChange: (value: string) => void;
  defaultValue?: never;
}

export interface UncontrolledSelection {
  /** Initial selected segment value. */
  defaultValue: string;
  /** Controlled value is not accepted for uncontrolled use. */
  value?: never;
  /** Receives the next value after activation. */
  onValueChange?: (value: string) => void;
}

/** Props for a labelled, single-selection segmented radiogroup. */
export type SegmentedControlProps = Omit<
  ComponentPropsWithRef<'div'>,
  'aria-labelledby' | 'children' | 'role'
> &
  (ControlledSelection | UncontrolledSelection) & {
    /** Visible, localized group label. */
    label: Exclude<ReactNode, boolean | null | undefined>;
    /** SegmentedControl.Segment children. */
    children: ReactNode;
    /** SegmentedControl owns the radiogroup semantics and label relationship. */
    role?: never;
    'aria-labelledby'?: never;
  };

/** Props for a visible-label native button segment. */
export interface SegmentProps extends Omit<
  ComponentPropsWithRef<'button'>,
  'aria-checked' | 'children' | 'onClick' | 'onKeyDown' | 'role' | 'tabIndex' | 'type'
> {
  /** Stable value that identifies this segment in its control. */
  value: string;
  /** Visible, localized button label. */
  children: Exclude<ReactNode, boolean | null | undefined>;
  /** SegmentedControl owns the native button semantics and interactions. */
  type?: never;
  role?: never;
  'aria-checked'?: never;
  tabIndex?: never;
  onClick?: never;
  onKeyDown?: never;
}
