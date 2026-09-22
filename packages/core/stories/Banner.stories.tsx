import type { Meta, StoryObj } from '@storybook/react-vite';

import Banner from '../src/components/banner/Banner.js';
import { BANNER_TONES } from '../src/components/banner/Banner.types.js';

const meta = {
  title: 'Core/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: {
    children: (
      <>
        <strong>Deine Einstellungen wurden gespeichert.</strong>{' '}
        <span>Alle Änderungen wurden übernommen.</span>
      </>
    ),
    closeLabel: 'Meldung schließen',
    icon: 'fa-circle-check',
    onClose: () => undefined,
    tone: 'success',
  },
  argTypes: { tone: { control: 'select', options: BANNER_TONES } },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};
export const Neutral: Story = {
  render: () => (
    <Banner icon="fa-circle-info" tone="neutral">
      <>
        <strong>Synchronisierung läuft.</strong>{' '}
        <span>Deine Daten werden im Hintergrund aktualisiert.</span>
      </>
    </Banner>
  ),
  args: {
    children: (
      <>
        <strong>Synchronisierung läuft.</strong>{' '}
        <span>Deine Daten werden im Hintergrund aktualisiert.</span>
      </>
    ),
    icon: 'fa-circle-info',
    tone: 'neutral',
  },
};
export const Warning: Story = {
  args: {
    children: 'Bitte prüfe die Angaben vor dem Fortfahren.',
    icon: 'fa-triangle-exclamation',
    tone: 'warning',
  },
};
