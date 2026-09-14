import type { Meta, StoryObj } from '@storybook/react-vite';

import IconButton from './IconButton.js';

const meta = {
  title: 'Core/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Anhang hinzufügen',
    icon: 'fa-paperclip',
    variant: 'ghost',
  },
  argTypes: {
    'aria-label': {
      control: 'text',
      description:
        'Localized accessible name. Use this or aria-labelledby, but never both at once.',
      table: { category: 'Accessibility', type: { summary: 'string' } },
    },
    'aria-labelledby': {
      control: false,
      description:
        'ID of an external element that provides the localized accessible name. Use this or aria-label.',
      table: { category: 'Accessibility', type: { summary: 'string' } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables focus and activation using the native disabled attribute.',
      table: {
        category: 'Native button',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    icon: {
      control: 'text',
      description:
        'Required FontAwesome Classic icon name. The component renders Regular at rest and Solid on hover or active.',
      table: { category: 'Content', type: { summary: '`fa-${string}`' } },
    },
    type: {
      control: 'inline-radio',
      description: 'Native button type. Defaults to button to prevent accidental form submission.',
      options: ['button', 'submit', 'reset'],
      table: {
        category: 'Native button',
        defaultValue: { summary: 'button' },
        type: { summary: 'button | submit | reset' },
      },
    },
    variant: {
      control: 'select',
      description: 'Required visual emphasis that communicates the action’s role.',
      options: ['primary', 'outline', 'ghost', 'danger'],
      table: {
        category: 'Appearance',
        type: { summary: 'primary | outline | ghost | danger' },
      },
    },
  },
  parameters: {
    a11y: { test: 'error' },
    controls: {
      include: ['variant', 'icon', 'aria-label', 'aria-labelledby', 'type', 'disabled'],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Attachment: Story = {};
export const Highlighted: Story = {
  args: {
    'aria-label': 'Sidekick öffnen',
    icon: 'fa-wand-magic-sparkles',
    variant: 'primary',
  },
};
export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="chayns-storybook-example-row">
      <IconButton aria-label="Erstellen" icon="fa-plus" variant="primary" />
      <IconButton aria-label="Antworten" icon="fa-reply-all" variant="outline" />
      <IconButton aria-label="Optionen" icon="fa-ellipsis" variant="ghost" />
      <IconButton aria-label="Löschen" icon="fa-trash" variant="danger" />
    </div>
  ),
};
