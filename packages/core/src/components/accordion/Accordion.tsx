import { useContext, useId, useState } from 'react';

import { AccordionDepthContext, AccordionGroupContext } from './AccordionContext.js';
import type { AccordionProps } from './Accordion.types.js';

function Accordion({
  children,
  className,
  defaultOpen = false,
  disabled = false,
  id,
  onOpenChange,
  open,
  title,
}: AccordionProps) {
  const depth = useContext(AccordionDepthContext);
  const group = useContext(AccordionGroupContext);
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const headerId = `${baseId}-header`;
  const panelId = `${baseId}-panel`;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  let isOpen: boolean;
  if (group) {
    isOpen = group.isOpen(baseId);
  } else if (open !== undefined) {
    isOpen = open;
  } else {
    isOpen = uncontrolledOpen;
  }

  const handleToggle = () => {
    if (group) {
      group.toggle(baseId);
      return;
    }

    const nextOpen = !isOpen;
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const grouped = group !== null;
  const wrapped = !grouped && depth > 0;
  const variantClassName = grouped
    ? 'chayns-accordion--grouped'
    : wrapped
      ? 'chayns-accordion--wrapped'
      : 'chayns-accordion--standalone';

  const rootClassName = [
    'chayns-accordion',
    variantClassName,
    isOpen ? 'chayns-accordion--open' : null,
    disabled ? 'chayns-accordion--disabled' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={rootClassName}>
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="chayns-accordion__header"
        disabled={disabled}
        id={headerId}
        onClick={handleToggle}
        type="button"
      >
        <i aria-hidden="true" className="chayns-accordion__chevron far fa-chevron-right" />
        <span className="chayns-accordion__title">{title}</span>
      </button>
      <div
        aria-labelledby={headerId}
        className="chayns-accordion__panel"
        id={panelId}
        role="region"
      >
        <div className="chayns-accordion__inner">
          <div className="chayns-accordion__content">
            <AccordionDepthContext.Provider value={depth + 1}>
              {children}
            </AccordionDepthContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
