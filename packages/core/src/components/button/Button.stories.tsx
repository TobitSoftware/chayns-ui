import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';

import Button from './Button.js';

const meta = {
  title: 'Core/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    children: 'Erstellen',
    variant: 'primary',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'Visible, non-empty content that labels the native button.',
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
      control: 'text',
      description:
        'Optional leading FontAwesome Classic icon name. The component renders Regular at rest and Solid on hover or active.',
      table: {
        category: 'Content',
        type: { summary: '`fa-${string}`' },
      },
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
    controls: { include: ['variant', 'icon', 'children', 'type', 'disabled'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { icon: 'fa-plus', onClick: fn() },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Erstellen' });
    const target = button.getBoundingClientRect();

    await expect(target.width).toBeGreaterThanOrEqual(24);
    await expect(target.height).toBeGreaterThanOrEqual(24);

    const restingShadow = getComputedStyle(button).boxShadow;
    await userEvent.tab();
    await expect(button).toHaveFocus();
    const focusedShadow = getComputedStyle(button).boxShadow;
    await expect(getComputedStyle(button).outlineStyle).toBe('none');
    await expect(focusedShadow).not.toBe('none');
    await expect(focusedShadow).not.toBe(restingShadow);

    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
export const Outline: Story = {
  args: { children: 'Antworten', icon: 'fa-reply-all', variant: 'outline' },
};
export const Ghost: Story = {
  args: { children: 'Optionen', icon: 'fa-gear', variant: 'ghost' },
};
export const Danger: Story = {
  args: { children: 'Löschen', icon: 'fa-trash', variant: 'danger' },
};
export const Disabled: Story = { args: { children: 'Aktion', disabled: true } };

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="chayns-storybook-example-row">
      <Button icon="fa-plus" variant="primary">
        Erstellen
      </Button>
      <Button icon="fa-reply-all" variant="outline">
        Antworten
      </Button>
      <Button icon="fa-gear" variant="ghost">
        Optionen
      </Button>
      <Button icon="fa-trash" variant="danger">
        Löschen
      </Button>
    </div>
  ),
};

export const LongLocalizedContent: Story = {
  args: {
    children: 'Änderungen für alle ausgewählten Empfängerinnen und Empfänger übernehmen',
    variant: 'outline',
  },
  decorators: [
    (StoryComponent) => (
      <div className="chayns-storybook-example-constrained">
        <StoryComponent />
      </div>
    ),
  ],
};

export const FormBehavior: Story = {
  render: () => (
    <form className="chayns-storybook-example-row" onSubmit={(event) => event.preventDefault()}>
      <Button variant="ghost">Optionen</Button>
      <Button icon="fa-plus" type="submit" variant="primary">
        Erstellen
      </Button>
    </form>
  ),
};
