import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import Accordion from '../src/components/accordion/Accordion.js';
import AccordionGroup from '../src/components/accordion-group/AccordionGroup.js';

describe('AccordionGroup', () => {
  it('owns the group root DOM contract', () => {
    const rootRef = createRef<HTMLDivElement>();

    render(
      <AccordionGroup aria-label="Sections" data-purpose="accordion-group" ref={rootRef}>
        <Accordion id="one" title="One">
          Content
        </Accordion>
      </AccordionGroup>,
    );

    expect(rootRef.current).toHaveAttribute('aria-label', 'Sections');
    expect(rootRef.current).toHaveAttribute('data-purpose', 'accordion-group');
    expect(rootRef.current).toHaveClass('chayns-accordion-group');
  });

  it('keeps grouping and wrapped nesting independent', async () => {
    const user = userEvent.setup();

    render(
      <AccordionGroup defaultOpenId="outer">
        <Accordion id="outer" title="Outer">
          <Accordion title="Nested">Nested content</Accordion>
        </Accordion>
        <Accordion id="sibling" title="Sibling">
          Sibling content
        </Accordion>
      </AccordionGroup>,
    );

    const nested = screen.getByRole('button', { name: 'Nested' });
    expect(nested.closest('.chayns-accordion')).toHaveClass('chayns-accordion--wrapped');

    await user.click(screen.getByRole('button', { name: 'Sibling' }));

    expect(screen.getByRole('button', { name: 'Outer' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Sibling' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(nested.closest('.chayns-accordion')).toHaveClass('chayns-accordion--wrapped');
  });
});
