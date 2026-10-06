import type { ComponentPropsWithRef } from 'react';

/** Number of decimal places; omitted precision uses integers. */
export enum StepperPrecisions {
  Zero = 0,
  One = 1,
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
}
export const STEPPER_PRECISIONS = [0, 1, 2, 3, 4, 5, 6] as const;
export type StepperPrecision = (typeof STEPPER_PRECISIONS)[number];

/** Controlled exact quantity; native div props/ref address the labelled group. */
export interface StepperProps extends Omit<
  ComponentPropsWithRef<'div'>,
  'children' | 'role' | 'aria-label' | 'aria-labelledby'
> {
  value: number;
  min: number;
  max: number;
  step: number;
  precision?: StepperPrecision;
  onValueChange: (value: number) => void;
  label: string;
  decreaseLabel: string;
  increaseLabel: string;
  formatValue: (value: number) => string;
}
