import type { Meta, StoryObj } from '@storybook/react-vite';

import IconButton from './IconButton.js';

const meta = {
  title: 'Core/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: {
    'aria-label': 'Anhang hinzufügen',
    icon: <i className="far fa-paperclip" />,
    activeIcon: <i className="fas fa-paperclip" />,
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
    activeIcon: {
      control: false,
      description:
        'Optional decorative solid icon displayed on hover and while the button is active.',
      table: { category: 'Content', type: { summary: 'ReactNode' } },
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
      control: false,
      description: 'Required decorative regular icon displayed in the resting state.',
      table: { category: 'Content', type: { summary: 'ReactNode' } },
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
      include: [
        'variant',
        'icon',
        'activeIcon',
        'aria-label',
        'aria-labelledby',
        'type',
        'disabled',
      ],
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RegularAndSolidPair: Story = {};
export const SingleAvailableIcon: Story = { args: { activeIcon: null } };
export const Disabled: Story = { args: { disabled: true } };
