import type { Meta, StoryObj } from '@storybook/react-vite';

import Banner from '../src/components/banner/Banner.js';
import { BANNER_TONES } from '../src/components/banner/Banner.types.js';

const meta = {
  title: 'Core/Banner',
  component: Banner,
  tags: ['autodocs'],
  args: {
    children: 'Deine Einstellungen wurden gespeichert.',
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
export const Warning: Story = {
  args: {
    children: 'Bitte prüfe die Angaben vor dem Fortfahren.',
    icon: 'fa-triangle-exclamation',
    tone: 'warning',
  },
};
