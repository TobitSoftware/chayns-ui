import type { ComponentPropsWithRef } from 'react';

export const DATE_TIME_PICKER_MODES = ['date', 'time'] as const;
export const DATE_TIME_PICKER_MINUTE_STEPS = [1, 5, 15, 30] as const;

export type DateTimePickerMode = (typeof DATE_TIME_PICKER_MODES)[number];
export type DateTimePickerMinuteStep = (typeof DATE_TIME_PICKER_MINUTE_STEPS)[number];

export interface DateTimePickerWheelLabels {
  day: string;
  dayPeriod: string;
  hour: string;
  minute: string;
  month: string;
  year: string;
}

export interface DateTimePickerProps extends Omit<
  ComponentPropsWithRef<'button'>,
  | 'aria-controls'
  | 'aria-expanded'
  | 'aria-haspopup'
  | 'aria-label'
  | 'aria-labelledby'
  | 'children'
  | 'onChange'
  | 'type'
  | 'value'
> {
  label: string;
  locale: string;
  minDate?: Date;
  maxDate?: Date;
  minuteStep?: DateTimePickerMinuteStep;
  mode?: DateTimePickerMode;
  onChange: (value: Date) => void;
  placeholder: string;
  value: Date | null;
  wheelLabels: DateTimePickerWheelLabels;
}
