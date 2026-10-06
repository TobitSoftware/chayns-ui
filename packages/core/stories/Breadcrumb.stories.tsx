import specification from '../../../docs/03-components/breadcrumb/breadcrumb-specification.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import Breadcrumb from '../src/components/breadcrumb/Breadcrumb.js';

const meta = {
  title: 'Core/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: specification.slice(specification.indexOf('\n---\n') + 5) } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof Breadcrumb>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Pfad',
    items: [
      { label: 'Start', href: '/', icon: 'fa-house' },
      { label: 'Projekte', href: '/projects' },
      { label: 'Kampagne' },
    ],
  },
};
export const EdgeCases: Story = {
  args: {
    'aria-label': 'Pfad',
    items: [
      { label: 'Startseite', href: '/' },
      { label: 'Internationalisierte Projektverwaltung', href: '/projects' },
      { label: 'Eine sehr lange lokalisierte Kampagnenbezeichnung' },
    ],
  },
};
