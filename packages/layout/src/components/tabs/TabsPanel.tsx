import { forwardRef, useCallback } from 'react';

import { useTabs } from './TabsContext.js';
import type { TabsPanelProps } from './Tabs.types.js';
import useElementRef from './hooks/useElementRef.js';
import usePanelMotion from './hooks/usePanelMotion.js';

interface MountedPanelProps extends TabsPanelProps {
  active: boolean;
  animateInitial: boolean;
  baseId: string;
  complete: () => void;
}

// Native ref ownership exists only while a panel is mounted, including its short exit.
const MountedPanel = forwardRef<HTMLDivElement, MountedPanelProps>(function MountedPanel(
  { active, animateInitial, baseId, complete, children, className, value, ...props },
  ref,
) {
  const [element, setElement] = useElementRef(ref);
  usePanelMotion(element, active, complete, animateInitial);
  return (
    <div
      {...props}
      aria-hidden={active ? props['aria-hidden'] : true}
      aria-labelledby={`${baseId}-tab-${value}`}
      className={['chayns-tabs__panel', !active && 'chayns-tabs__panel--exiting', className]
        .filter(Boolean)
        .join(' ')}
      id={`${baseId}-panel-${value}`}
      inert={!active || props.inert}
      ref={setElement}
      role="tabpanel"
      tabIndex={active ? (props.tabIndex ?? 0) : -1}
    >
      {children}
    </div>
  );
});
MountedPanel.displayName = 'Tabs.MountedPanel';

const Panel = forwardRef<HTMLDivElement, TabsPanelProps>(function Panel(props, ref) {
  const tabs = useTabs('Panel');
  const active = tabs.value === props.value;
  const finishExit = tabs.finishExit;
  const complete = useCallback(() => finishExit(props.value), [finishExit, props.value]);
  if (!active && tabs.exitingValue !== props.value) return null;
  return (
    <MountedPanel
      {...props}
      active={active}
      animateInitial={tabs.exitingValue !== undefined}
      baseId={tabs.baseId}
      complete={complete}
      ref={ref}
    />
  );
});
Panel.displayName = 'Tabs.Panel';
export default Panel;
