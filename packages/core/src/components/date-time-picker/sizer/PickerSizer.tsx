import { memo } from 'react';

interface PickerSizerProps {
  valueGroups: readonly (readonly string[])[];
  placeholder: string | null;
}

const PickerSizer = memo(function PickerSizer({ valueGroups, placeholder }: PickerSizerProps) {
  return (
    <span aria-hidden="true" className="chayns-date-time-picker__sizer">
      {placeholder === null ? null : <span>{placeholder}</span>}
      {valueGroups.map((values, index) => (
        <span className="chayns-date-time-picker__sizer-group" key={index}>
          {values.map((value) => (
            <span key={value}>{value}</span>
          ))}
        </span>
      ))}
    </span>
  );
});
PickerSizer.displayName = 'DateTimePicker.Sizer';
export default PickerSizer;
