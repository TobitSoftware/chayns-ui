import { useState } from 'react';
import { Stepper, StepperPrecisions } from '@chayns-ui/core';
import type { StepperProps } from '@chayns-ui/core';

export default function DecimalStepper({
  value: initialValue = 0.2,
  ...props
}: Partial<StepperProps> = {}) {
  const [value, setValue] = useState(initialValue);
  return (
    <Stepper
      label="Gewicht"
      min={0}
      max={1}
      step={0.1}
      precision={StepperPrecisions.One}
      decreaseLabel="Gewicht verringern"
      increaseLabel="Gewicht erhöhen"
      formatValue={(value) => `${value.toFixed(1).replace('.', ',')} kg`}
      {...props}
      value={value}
      onValueChange={setValue}
    />
  );
}
DecimalStepper.displayName = 'DecimalStepper';
