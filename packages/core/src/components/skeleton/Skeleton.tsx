import { forwardRef } from 'react';

import type { SkeletonProps } from './Skeleton.types.js';

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
  {
    'aria-hidden': _ariaHidden,
    children: _children,
    className,
    role: _role,
    shape = 'rounded',
    tabIndex: _tabIndex,
    ...divProps
  },
  ref,
) {
  void _ariaHidden;
  void _children;
  void _role;
  void _tabIndex;

  const resolvedClassName = ['chayns-skeleton', `chayns-skeleton--${shape}`, className]
    .filter(Boolean)
    .join(' ');

  return <div {...divProps} aria-hidden="true" className={resolvedClassName} ref={ref} />;
});

export default Skeleton;
