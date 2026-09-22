import {
  Children,
  createElement,
  forwardRef,
  isValidElement,
  useContext,
  useId,
  useState,
} from 'react';
import type { MouseEvent, ReactElement } from 'react';

import {
  AccordionDepthContext,
  AccordionGroupContext,
  AccordionItemContext,
  useAccordionItemContext,
} from './AccordionContext.js';
import type {
  AccordionContentProps,
  AccordionHeadContentProps,
  AccordionHeadProps,
  AccordionPartProps,
  AccordionProps,
} from './Accordion.types.js';

function Part({ children, className, name }: AccordionPartProps & { name: string }) {
  useAccordionItemContext(name);
  return (
    <span
      className={[`chayns-accordion__${name.toLowerCase()}`, className].filter(Boolean).join(' ')}
    >
      {children}
    </span>
  );
}

const HeadLeading = (props: AccordionPartProps) => <Part {...props} name="leading" />;
const HeadTrailing = (props: AccordionPartProps) => <Part {...props} name="trailing" />;

function HeadContent({ className, subtitle, title }: AccordionHeadContentProps) {
  useAccordionItemContext('Head.Content');

  return (
    <span className={['chayns-accordion__head-content', className].filter(Boolean).join(' ')}>
      <span className="chayns-accordion__title">{title}</span>
      {subtitle ? <span className="chayns-accordion__subtitle">{subtitle}</span> : null}
    </span>
  );
}

const AccordionHead = forwardRef<HTMLButtonElement, AccordionHeadProps>(function AccordionHead(
  { children, className, onClick, ...buttonProps },
  ref,
) {
  const { disabled, headerId, isOpen, onToggle, panelId } = useAccordionItemContext('Head');

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (!event.defaultPrevented) onToggle();
  }

  return (
    <button
      {...buttonProps}
      aria-controls={panelId}
      aria-expanded={isOpen}
      className={['chayns-accordion__header', className].filter(Boolean).join(' ')}
      disabled={disabled}
      id={headerId}
      onClick={handleClick}
      ref={ref}
      type="button"
    >
      <i aria-hidden="true" className="chayns-accordion__chevron far fa-chevron-right" />
      {children}
    </button>
  );
});

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  function AccordionContent({ children, className, ...panelProps }, ref) {
    const depth = useContext(AccordionDepthContext);
    const { headerId, isOpen, panelId } = useAccordionItemContext('Content');

    return (
      <div
        {...panelProps}
        aria-hidden={!isOpen}
        aria-labelledby={headerId}
        className={['chayns-accordion__panel', className].filter(Boolean).join(' ')}
        id={panelId}
        inert={!isOpen}
        ref={ref}
        role="region"
        style={{ ...panelProps.style, gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="chayns-accordion__inner">
          <div className="chayns-accordion__content">
            <AccordionDepthContext.Provider value={depth + 1}>
              {children}
            </AccordionDepthContext.Provider>
          </div>
        </div>
      </div>
    );
  },
);

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    appearance = 'default',
    children,
    className,
    defaultOpen = false,
    disabled = false,
    id,
    leading,
    onOpenChange,
    open,
    subtitle,
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
  const isOpen = isGrouped ? group.isOpen(baseId) : (open ?? uncontrolledOpen);
  const wrapped = depth > 0;
  const isList = appearance === 'list';

  function handleToggle() {
    if (isGrouped) {
      group.toggle(baseId);
      return;
    }

    const nextOpen = !isOpen;
    if (open === undefined) setUncontrolledOpen(nextOpen);
    onOpenChange?.(nextOpen);
  }

  const variantClassName = isGrouped
    ? 'chayns-accordion--grouped'
    : wrapped
      ? 'chayns-accordion--wrapped'
      : 'chayns-accordion--standalone';
  const directChildren = Children.toArray(children);
  const compoundHead = directChildren.find(
    (child) => isValidElement(child) && child.type === AccordionHead,
  );
  const hasCompoundLeading =
    isValidElement(compoundHead) &&
    Children.toArray((compoundHead as ReactElement<AccordionHeadProps>).props.children).some(
      (child) => isValidElement(child) && child.type === HeadLeading,
    );
  const rootClassName = [
    'chayns-accordion',
    variantClassName,
    isOpen ? 'chayns-accordion--open' : null,
    disabled ? 'chayns-accordion--disabled' : null,
    leading || hasCompoundLeading ? 'chayns-accordion--has-leading' : null,
    isList ? 'chayns-accordion--list' : null,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const hasCompoundHead = compoundHead !== undefined;
  const compoundContent = directChildren.find(
    (child) => isValidElement(child) && child.type === AccordionContent,
  );
  const hasCompoundContent = compoundContent !== undefined;
  const panelChildren = children;

  return (
    <div {...rootProps} className={rootClassName} id={id} ref={ref}>
      <AccordionItemContext.Provider
        value={{ disabled, headerId, isOpen, onToggle: handleToggle, panelId }}
      >
        {hasCompoundHead ? (
          compoundHead
        ) : (
          <AccordionHead>
            {leading ? <HeadLeading>{leading}</HeadLeading> : null}
            <HeadContent title={title} subtitle={subtitle} />
          </AccordionHead>
        )}
        {hasCompoundContent ? (
          createElement(AccordionContent, {
            ...(compoundContent as ReactElement<AccordionContentProps>).props,
          })
        ) : (
          <AccordionContent>{panelChildren}</AccordionContent>
        )}
      </AccordionItemContext.Provider>
    </div>
  );
});

const Accordion = Object.assign(AccordionRoot, {
  Content: AccordionContent,
  Head: Object.assign(AccordionHead, {
    Content: HeadContent,
    Leading: HeadLeading,
    Trailing: HeadTrailing,
  }),
});

export default Accordion;
