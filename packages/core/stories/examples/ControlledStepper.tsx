import { useState } from 'react';
import { Stepper } from '@chayns-ui/core';
import type { StepperProps } from '@chayns-ui/core';

export default function ControlledStepper({
  value: initialValue = 2,
  ...props
}: Partial<StepperProps> = {}) {
  const [value, setValue] = useState(initialValue);
  return (
    <Stepper
      label="Anzahl"
      min={0}
      max={5}
      step={1}
      decreaseLabel="Anzahl verringern"
      increaseLabel="Anzahl erhöhen"
      formatValue={String}
      {...props}
      value={value}
      onValueChange={setValue}
    />
  );
}
ControlledStepper.displayName = 'ControlledStepper';
