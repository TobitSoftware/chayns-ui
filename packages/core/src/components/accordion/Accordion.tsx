import { forwardRef, useContext, useId, useState } from 'react';

import { AccordionDepthContext, AccordionGroupContext } from './AccordionContext.js';
import type { AccordionProps } from './Accordion.types.js';

const Accordion = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    children,
    className,
    defaultOpen = false,
    disabled = false,
    id,
    onOpenChange,
    open,
    title,
    ...rootProps
  },
  ref,
) {
  const depth = useContext(AccordionDepthContext);
  const group = useContext(AccordionGroupContext);
  const generatedId = useId();
  const baseId = id ?? generatedId;
  const headerId = `${baseId}-header`;
  const panelId = `${baseId}-panel`;

  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const isGrouped = group !== null && depth === 0;

  let isOpen: boolean;
  if (isGrouped) {
    isOpen = group.isOpen(baseId);
  } else if (open !== undefined) {
    isOpen = open;
  } else {
    isOpen = uncontrolledOpen;
  }

  const handleToggle = () => {
    if (isGrouped) {
      group.toggle(baseId);
      return;
    }

    const nextOpen = !isOpen;
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  const wrapped = depth > 0;
  const variantClassName = isGrouped
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
    <div {...rootProps} className={rootClassName} id={id} ref={ref}>
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
        aria-hidden={!isOpen}
        aria-labelledby={headerId}
        className="chayns-accordion__panel"
        id={panelId}
        inert={!isOpen}
        role="region"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
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
});

export default Accordion;
