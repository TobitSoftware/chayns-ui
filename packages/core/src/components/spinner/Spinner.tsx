import { forwardRef } from 'react';

import type { SpinnerProps } from './Spinner.types.js';

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(function Spinner(
  {
    'aria-hidden': _ariaHidden,
    children: _children,
    className,
    role: _role,
    tabIndex: _tabIndex,
    ...divProps
  },
  ref,
) {
  void _ariaHidden;
  void _children;
  void _role;
  void _tabIndex;

  const resolvedClassName = ['chayns-spinner', className].filter(Boolean).join(' ');

  return <div {...divProps} aria-hidden="true" className={resolvedClassName} ref={ref} />;
});

export default Spinner;
