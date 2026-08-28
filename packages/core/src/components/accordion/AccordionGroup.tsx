import { useCallback, useMemo, useState } from 'react';

import { AccordionGroupContext } from './AccordionContext.js';
import type { AccordionGroupContextValue } from './AccordionContext.js';
import type { AccordionGroupProps } from './Accordion.types.js';

function AccordionGroup({
  children,
  className,
  defaultOpenId = null,
  onOpenChange,
  openId,
}: AccordionGroupProps) {
  const [uncontrolledOpenId, setUncontrolledOpenId] = useState<string | null>(defaultOpenId);

  const isControlled = openId !== undefined;
  const currentOpenId = isControlled ? openId : uncontrolledOpenId;

  const isOpen = useCallback((id: string) => currentOpenId === id, [currentOpenId]);

  const toggle = useCallback(
    (id: string) => {
      const nextOpenId = currentOpenId === id ? null : id;
      if (!isControlled) setUncontrolledOpenId(nextOpenId);
      onOpenChange?.(nextOpenId);
    },
    [currentOpenId, isControlled, onOpenChange],
  );

  const contextValue = useMemo<AccordionGroupContextValue>(
    () => ({ isOpen, toggle }),
    [isOpen, toggle],
  );

  const rootClassName = ['chayns-accordion-group', className].filter(Boolean).join(' ');

  return (
    <AccordionGroupContext.Provider value={contextValue}>
      <div className={rootClassName}>{children}</div>
    </AccordionGroupContext.Provider>
  );
}

export default AccordionGroup;
