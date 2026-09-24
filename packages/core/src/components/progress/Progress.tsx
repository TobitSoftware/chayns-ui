import { forwardRef, useId } from 'react';

import type { ProgressProps } from './Progress.types.js';

function normalizeValue(value: number) {
  if (Number.isNaN(value)) {
    return 0;
  }

  if (value === Infinity) {
    return 100;
  }

  if (value === -Infinity) {
    return 0;
  }

  return Math.min(100, Math.max(0, Math.round(value)));
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    'aria-label': _ariaLabel,
    'aria-labelledby': _ariaLabelledBy,
    'aria-valuemax': _ariaValueMax,
    'aria-valuemin': _ariaValueMin,
    'aria-valuenow': _ariaValueNow,
    'aria-valuetext': _ariaValueText,
    children: _children,
    className,
    label,
    role: _role,
    rootProps,
    tabIndex: _tabIndex,
    value,
    ...progressbarProps
  },
  ref,
) {
  void _ariaLabel;
  void _ariaLabelledBy;
  void _ariaValueMax;
  void _ariaValueMin;
  void _ariaValueNow;
  void _ariaValueText;
  void _children;
  void _role;
  void _tabIndex;

  const labelId = useId();
  const normalizedValue = normalizeValue(value);
  const valueText = `${normalizedValue} %`;
  const { className: rootClassName, ...remainingRootProps } = rootProps ?? {};
  const resolvedRootClassName = ['chayns-progress', rootClassName].filter(Boolean).join(' ');
  const resolvedProgressbarClassName = ['chayns-progress__bar', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div {...remainingRootProps} className={resolvedRootClassName}>
      <div className="chayns-progress__label-row">
        <span id={labelId}>{label}</span>
        <span aria-hidden="true">{valueText}</span>
      </div>
      <div
        {...progressbarProps}
        aria-labelledby={labelId}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={normalizedValue}
        aria-valuetext={valueText}
        className={resolvedProgressbarClassName}
        ref={ref}
        role="progressbar"
      >
        <div
          aria-hidden="true"
          className="chayns-progress__fill"
          style={{ width: `${normalizedValue}%` }}
        />
      </div>
    </div>
  );
});

export default Progress;
