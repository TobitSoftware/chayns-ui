import { useState } from 'react';
import { DateTimePicker, DateTimePickerModes } from '@chayns-ui/core';
import type { DateTimePickerProps } from '@chayns-ui/core';

export default function ControlledTimePicker({
  value: initialValue = new Date(2026, 8, 22, 10, 30),
  ...props
}: Partial<DateTimePickerProps> = {}) {
  const [value, setValue] = useState(initialValue);
  return (
    <DateTimePicker
      label="Uhrzeit"
      locale="de-DE"
      mode={DateTimePickerModes.Time}
      placeholder="Uhrzeit auswählen"
      wheelLabels={{
        day: 'Tag',
        dayPeriod: 'Tageszeit',
        hour: 'Stunde',
        minute: 'Minute',
        month: 'Monat',
        year: 'Jahr',
      }}
      {...props}
      value={value}
      onChange={setValue}
    />
  );
}
ControlledTimePicker.displayName = 'ControlledTimePicker';
