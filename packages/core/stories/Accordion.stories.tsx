import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import Accordion from '../src/components/accordion/Accordion.js';
import AccordionGroup from '../src/components/accordion-group/AccordionGroup.js';
import Avatar from '../src/components/avatar/Avatar.js';

const meta = {
  title: 'Core/Accordion',
  component: Accordion,
  subcomponents: { AccordionGroup: AccordionGroup as never },
  tags: ['autodocs'],
  args: { title: 'Accordion' },
  parameters: {
    a11y: { test: 'error' },
    controls: { disable: true },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standalone: Story = {
  render: () => (
    <div className="chayns-storybook-example-accordion">
      <Accordion title="Was ist chayns UI?">
        chayns UI ist die modulare Komponentenbibliothek für konsistente chayns-Oberflächen.
      </Accordion>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div className="chayns-storybook-example-accordion">
      <Accordion defaultOpen title="Was ist chayns UI?">
        chayns UI ist die modulare Komponentenbibliothek für konsistente chayns-Oberflächen.
      </Accordion>
    </div>
  ),
};

export const Grouped: Story = {
  render: () => (
    <div className="chayns-storybook-example-accordion">
      <AccordionGroup defaultOpenId="lieferung">
        <Accordion id="lieferung" title="Lieferung">
          Standardlieferungen sind innerhalb von zwei bis drei Werktagen bei dir.
        </Accordion>
        <Accordion id="ruecksendung" title="Rücksendung">
          Rücksendungen sind innerhalb von 30 Tagen kostenlos möglich.
        </Accordion>
        <Accordion id="zahlung" title="Zahlung">
          Wir akzeptieren die gängigen Zahlungsmethoden.
        </Accordion>
      </AccordionGroup>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByRole('button', { name: 'Lieferung' });
    const second = canvas.getByRole('button', { name: 'Rücksendung' });

    await expect(first).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(second);
    await expect(second).toHaveAttribute('aria-expanded', 'true');
    await expect(first).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Wrapped: Story = {
  render: () => (
    <div className="chayns-storybook-example-accordion">
      <Accordion defaultOpen title="Erweiterte Einstellungen">
        Passe hier grundlegende Optionen an.
        <div className="chayns-storybook-example-accordion-nested">
          <Accordion title="Benachrichtigungen">
            Lege fest, worüber du informiert werden möchtest.
          </Accordion>
        </div>
      </Accordion>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const nested = within(canvasElement)
      .getByRole('button', { name: 'Benachrichtigungen' })
      .closest('.chayns-accordion');
    await expect(nested).toHaveClass('chayns-accordion--wrapped');
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="chayns-storybook-example-accordion">
      <Accordion disabled title="Nicht verfügbar">
        Dieser Bereich ist derzeit nicht verfügbar.
      </Accordion>
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="chayns-storybook-example-constrained">
      <AccordionGroup defaultOpenId="budget">
        <Accordion
          id="budget"
          appearance="list"
          leading={<Avatar name="Eva Sommer" size="small" />}
          subtitle="Freigabe durch Eva Sommer"
          title="Q3-Budget"
        >
          Das Budget wurde geprüft und kann verwendet werden.
        </Accordion>
        <Accordion
          id="planung"
          appearance="list"
          leading={<i aria-hidden="true" className="far fa-calendar" />}
          subtitle="Die nächste Planungsrunde startet am Montag"
          title="Planung"
        >
          Die nächste Planungsrunde startet am Montag.
        </Accordion>
      </AccordionGroup>
    </div>
  ),
};
