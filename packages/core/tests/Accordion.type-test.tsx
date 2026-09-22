import { createRef } from 'react';

import Accordion from '../src/components/accordion/Accordion.js';
import AccordionGroup from '../src/components/accordion-group/AccordionGroup.js';

export const standalone = <Accordion title="Title">Content</Accordion>;
export const nativeRootContract = (
  <Accordion
    aria-label="Details"
    data-purpose="accordion"
    ref={createRef<HTMLDivElement>()}
    title="Title"
  >
    Content
  </Accordion>
);
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
  <AccordionGroup
    aria-label="Sections"
    defaultOpenId="a"
    onOpenChange={(id) => id}
    ref={createRef<HTMLDivElement>()}
  >
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

export const compound = (
  <Accordion>
    <Accordion.Head>
      <Accordion.Head.Content subtitle="Untertitel" title="Titel" />
    </Accordion.Head>
    <Accordion.Content>Content</Accordion.Content>
  </Accordion>
);
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
