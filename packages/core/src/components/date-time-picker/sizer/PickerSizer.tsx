import { memo } from 'react';

interface PickerSizerProps {
  values: readonly string[];
  placeholder: string | null;
}

const PickerSizer = memo(function PickerSizer({ values, placeholder }: PickerSizerProps) {
  return (
    <span aria-hidden="true" className="chayns-date-time-picker__sizer">
      {placeholder === null ? null : <span>{placeholder}</span>}
      {values.map((value) => (
        <span key={value}>{value}</span>
      ))}
    </span>
  );
});
PickerSizer.displayName = 'DateTimePicker.Sizer';
export default PickerSizer;
