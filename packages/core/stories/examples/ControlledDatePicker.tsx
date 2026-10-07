import { useState } from 'react';
import { DateTimePicker, DateTimePickerModes } from '@chayns-ui/core';
import type { DateTimePickerProps } from '@chayns-ui/core';

export default function ControlledDatePicker({
  value: initialValue = new Date(2026, 8, 22),
  ...props
}: Partial<DateTimePickerProps> = {}) {
  const [value, setValue] = useState(initialValue);
  return (
    <DateTimePicker
      label="Datum"
      locale="de-DE"
      mode={DateTimePickerModes.Date}
      placeholder="Datum auswählen"
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
ControlledDatePicker.displayName = 'ControlledDatePicker';
