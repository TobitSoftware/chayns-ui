import relatedUsage from '../../../docs/03-components/accordion-group/accordion-group-usage.md?raw';
import usage from '../../../docs/03-components/accordion/accordion-usage.md?raw';
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
    docs: { description: { component: usage } },
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
        <Accordion.Content>
          chayns UI ist die modulare Komponentenbibliothek für konsistente chayns-Oberflächen.
        </Accordion.Content>
      </Accordion>
    </div>
  ),
};

export const DefaultOpen: Story = {
  render: () => (
    <div className="chayns-storybook-example-accordion">
      <Accordion defaultOpen title="Was ist chayns UI?">
        <Accordion.Content>
          chayns UI ist die modulare Komponentenbibliothek für konsistente chayns-Oberflächen.
        </Accordion.Content>
      </Accordion>
    </div>
  ),
};

export const Grouped: Story = {
  parameters: { docs: { description: { story: relatedUsage } } },
  render: () => (
    <div className="chayns-storybook-example-accordion">
      <AccordionGroup defaultOpenId="lieferung">
        <Accordion id="lieferung" title="Lieferung">
          <Accordion.Content>
            Standardlieferungen sind innerhalb von zwei bis drei Werktagen bei dir.
          </Accordion.Content>
        </Accordion>
        <Accordion id="ruecksendung" title="Rücksendung">
          <Accordion.Content>
            Rücksendungen sind innerhalb von 30 Tagen kostenlos möglich.
          </Accordion.Content>
        </Accordion>
        <Accordion id="zahlung" title="Zahlung">
          <Accordion.Content>Wir akzeptieren die gängigen Zahlungsmethoden.</Accordion.Content>
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
        <Accordion.Content>Passe hier grundlegende Optionen an.</Accordion.Content>
        <div className="chayns-storybook-example-accordion-nested">
          <Accordion title="Benachrichtigungen">
            <Accordion.Content>Lege fest, worüber du informiert werden möchtest.</Accordion.Content>
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
        <Accordion.Content>Dieser Bereich ist derzeit nicht verfügbar.</Accordion.Content>
      </Accordion>
    </div>
  ),
};

export const List: Story = {
  render: () => (
    <div className="chayns-storybook-example-constrained">
      <AccordionGroup defaultOpenId="budget">
        <Accordion appearance="list" id="budget">
          <Accordion.Head>
            <Accordion.Head.Leading>
              <Avatar name="Eva Sommer" size="small" />
            </Accordion.Head.Leading>
            <Accordion.Head.Content subtitle="Freigabe durch Eva Sommer" title="Q3-Budget" />
          </Accordion.Head>
          <Accordion.Content>Das Budget wurde geprüft und kann verwendet werden.</Accordion.Content>
        </Accordion>
        <Accordion appearance="list" id="planung">
          <Accordion.Head>
            <Accordion.Head.Leading>
              <i aria-hidden="true" className="far fa-calendar" />
            </Accordion.Head.Leading>
            <Accordion.Head.Content
              subtitle="Die nächste Planungsrunde startet am Montag"
              title="Planung"
            />
          </Accordion.Head>
          <Accordion.Content>Die nächste Planungsrunde startet am Montag.</Accordion.Content>
        </Accordion>
      </AccordionGroup>
    </div>
  ),
};

export const NestedGroup: Story = {
  render: () => (
    <Accordion defaultOpen title="Einstellungen">
      <AccordionGroup defaultOpenId="general">
        <Accordion id="general" title="Allgemein">
          <Accordion.Content>Allgemeine Einstellungen</Accordion.Content>
        </Accordion>
        <Accordion id="notifications" title="Benachrichtigungen">
          <Accordion.Content>Benachrichtigungen anpassen</Accordion.Content>
        </Accordion>
      </AccordionGroup>
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Benachrichtigungen' }));
    await expect(canvas.getByRole('button', { name: 'Allgemein' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    await expect(canvas.getByRole('button', { name: 'Einstellungen' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
  },
};
