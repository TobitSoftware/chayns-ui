import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Accordion from './Accordion.js';
import AccordionGroup from './AccordionGroup.js';

describe('Accordion', () => {
  it('renders a header button wired to a labelled region panel', () => {
    render(<Accordion title="Titel">Inhalt</Accordion>);

    const header = screen.getByRole('button', { name: 'Titel' });
    const panel = screen.getByRole('region', { name: 'Titel' });

    expect(header).toHaveAttribute('aria-expanded', 'false');
    expect(header).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', header.id);
  });

  it('toggles uncontrolled open state on click', async () => {
    const user = userEvent.setup();
    render(<Accordion title="Titel">Inhalt</Accordion>);

    const header = screen.getByRole('button', { name: 'Titel' });
    expect(header).toHaveAttribute('aria-expanded', 'false');

    await user.click(header);
    expect(header).toHaveAttribute('aria-expanded', 'true');
    expect(header.closest('.chayns-accordion')).toHaveClass('chayns-accordion--open');
  });

  it('respects the controlled open prop and reports intended changes', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <Accordion onOpenChange={handleOpenChange} open title="Titel">
        Inhalt
      </Accordion>,
    );

    const header = screen.getByRole('button', { name: 'Titel' });
    expect(header).toHaveAttribute('aria-expanded', 'true');

    await user.click(header);

    expect(handleOpenChange).toHaveBeenCalledWith(false);
    expect(header).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders as standalone at the top level', () => {
    render(<Accordion title="Titel">Inhalt</Accordion>);

    expect(screen.getByRole('button', { name: 'Titel' }).closest('.chayns-accordion')).toHaveClass(
      'chayns-accordion--standalone',
    );
  });

  it('auto-detects nesting and renders the inner accordion as wrapped', async () => {
    const user = userEvent.setup();

    render(
      <Accordion defaultOpen title="Außen">
        <Accordion title="Innen">Verschachtelt</Accordion>
      </Accordion>,
    );

    const inner = screen.getByRole('button', { name: 'Innen' }).closest('.chayns-accordion');
    expect(inner).toHaveClass('chayns-accordion--wrapped');
    expect(inner).not.toHaveClass('chayns-accordion--standalone');

    // sanity: interaction still works on the nested accordion
    await user.click(screen.getByRole('button', { name: 'Innen' }));
    expect(screen.getByRole('button', { name: 'Innen' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <Accordion disabled onOpenChange={handleOpenChange} title="Titel">
        Inhalt
      </Accordion>,
    );

    const header = screen.getByRole('button', { name: 'Titel' });
    expect(header).toBeDisabled();

    await user.click(header);
    expect(handleOpenChange).not.toHaveBeenCalled();
  });

  it('renders safely on the server', () => {
    const markup = renderToString(<Accordion title="Titel">Inhalt</Accordion>);

    expect(markup).toContain('chayns-accordion--standalone');
    expect(markup).toContain('Titel');
  });
});

describe('AccordionGroup', () => {
  it('keeps items mutually exclusive', async () => {
    const user = userEvent.setup();

    render(
      <AccordionGroup>
        <Accordion id="a" title="A">
          Inhalt A
        </Accordion>
        <Accordion id="b" title="B">
          Inhalt B
        </Accordion>
      </AccordionGroup>,
    );

    const a = screen.getByRole('button', { name: 'A' });
    const b = screen.getByRole('button', { name: 'B' });

    await user.click(a);
    expect(a).toHaveAttribute('aria-expanded', 'true');
    expect(b).toHaveAttribute('aria-expanded', 'false');

    await user.click(b);
    expect(a).toHaveAttribute('aria-expanded', 'false');
    expect(b).toHaveAttribute('aria-expanded', 'true');
  });

  it('closes the open item when its header is clicked again', async () => {
    const user = userEvent.setup();

    render(
      <AccordionGroup defaultOpenId="a">
        <Accordion id="a" title="A">
          Inhalt A
        </Accordion>
        <Accordion id="b" title="B">
          Inhalt B
        </Accordion>
      </AccordionGroup>,
    );

    const a = screen.getByRole('button', { name: 'A' });
    expect(a).toHaveAttribute('aria-expanded', 'true');

    await user.click(a);
    expect(a).toHaveAttribute('aria-expanded', 'false');
  });

  it('renders grouped items with the grouped variant', () => {
    render(
      <AccordionGroup>
        <Accordion id="a" title="A">
          Inhalt A
        </Accordion>
      </AccordionGroup>,
    );

    expect(screen.getByRole('button', { name: 'A' }).closest('.chayns-accordion')).toHaveClass(
      'chayns-accordion--grouped',
    );
  });

  it('supports controlled open state', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();

    render(
      <AccordionGroup onOpenChange={handleOpenChange} openId="a">
        <Accordion id="a" title="A">
          Inhalt A
        </Accordion>
        <Accordion id="b" title="B">
          Inhalt B
        </Accordion>
      </AccordionGroup>,
    );

    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('button', { name: 'B' }));

    expect(handleOpenChange).toHaveBeenCalledWith('b');
    // stays controlled by the prop until the parent updates it
    expect(screen.getByRole('button', { name: 'A' })).toHaveAttribute('aria-expanded', 'true');
  });
});
