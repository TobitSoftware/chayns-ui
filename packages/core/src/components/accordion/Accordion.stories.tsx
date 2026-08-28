import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import Accordion from './Accordion.js';
import AccordionGroup from './AccordionGroup.js';

const meta = {
  title: 'Core/Accordion',
  component: Accordion,
  subcomponents: { AccordionGroup: AccordionGroup as never },
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
    controls: { disable: true },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Standalone: Story = {
  render: () => (
    <div style={{ maxInlineSize: '32rem' }}>
      <Accordion defaultOpen title="Was ist chayns UI?">
        chayns UI ist die modulare Komponentenbibliothek für konsistente chayns-Oberflächen.
      </Accordion>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const header = within(canvasElement).getByRole('button', { name: /Was ist chayns UI/ });
    await expect(header).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(header);
    await expect(header).toHaveAttribute('aria-expanded', 'false');
  },
};

export const Grouped: Story = {
  render: () => (
    <div style={{ maxInlineSize: '32rem' }}>
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
    <div style={{ maxInlineSize: '32rem' }}>
      <Accordion defaultOpen title="Erweiterte Einstellungen">
        Passe hier grundlegende Optionen an.
        <div style={{ marginBlockStart: 'var(--k10)' }}>
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
    <div style={{ maxInlineSize: '32rem' }}>
      <Accordion disabled title="Nicht verfügbar">
        Dieser Bereich ist derzeit nicht verfügbar.
      </Accordion>
    </div>
  ),
};
