import { forwardRef, useRef } from 'react';

import { useTabs } from './TabsContext.js';
import type { TabsListProps } from './Tabs.types.js';
import useElementRef from './hooks/useElementRef.js';
import useUnderlineIndicator from './hooks/useUnderlineIndicator.js';

const List = forwardRef<HTMLDivElement, TabsListProps>(function List(
  { children, className, ...props },
  ref,
) {
  const tabs = useTabs('List');
  const [element, setElement] = useElementRef(ref);
  const indicator = useRef<HTMLSpanElement | null>(null);
  useUnderlineIndicator(element, indicator, tabs);
  return (
    <div
      {...props}
      className={['chayns-tabs__list', className].filter(Boolean).join(' ')}
      ref={setElement}
      role="tablist"
    >
      {children}
      {tabs.appearance === 'underline' ? (
        <span aria-hidden="true" className="chayns-tabs__indicator" ref={indicator} />
      ) : null}
    </div>
  );
});
List.displayName = 'Tabs.List';
export default List;
