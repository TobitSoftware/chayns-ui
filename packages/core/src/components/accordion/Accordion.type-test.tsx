import { Accordion, AccordionGroup } from './index.js';

export const standalone = <Accordion title="Title">Content</Accordion>;
export const uncontrolled = (
  <Accordion defaultOpen title="Title">
    Content
  </Accordion>
);
export const controlled = (
  <Accordion onOpenChange={(open) => open} open title="Title">
    Content
  </Accordion>
);
export const disabledAccordion = (
  <Accordion disabled title="Title">
    Content
  </Accordion>
);
export const group = (
  <AccordionGroup defaultOpenId="a" onOpenChange={(id) => id}>
    <Accordion id="a" title="A">
      A
    </Accordion>
    <Accordion id="b" title="B">
      B
    </Accordion>
  </AccordionGroup>
);
export const controlledGroup = (
  <AccordionGroup openId={null}>
    <Accordion id="a" title="A">
      A
    </Accordion>
  </AccordionGroup>
);

// @ts-expect-error title is required
export const missingTitle = <Accordion>Content</Accordion>;
export const wrappedProp = (
  <Accordion
    // @ts-expect-error there is no isWrapped prop; wrapping is auto-detected
    isWrapped
    title="Title"
  >
    Content
  </Accordion>
);
export const invalidOpen = (
  <Accordion
    // @ts-expect-error open must be a boolean
    open="yes"
    title="Title"
  >
    Content
  </Accordion>
);
