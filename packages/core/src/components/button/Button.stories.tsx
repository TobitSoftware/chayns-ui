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
    controls: { include: ['variant', 'children', 'type', 'disabled'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { onClick: fn() },
  render: ({ children, ...buttonProps }) => (
    <Button {...buttonProps}>
      <i aria-hidden="true" className="far fa-plus" />
      {children}
    </Button>
  ),
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Erstellen' });
    const target = button.getBoundingClientRect();

    await expect(target.width).toBeGreaterThanOrEqual(24);
    await expect(target.height).toBeGreaterThanOrEqual(24);
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(getComputedStyle(button).outlineStyle).not.toBe('none');
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};
export const Outline: Story = { args: { children: 'Antworten', variant: 'outline' } };
export const Ghost: Story = {
  args: { children: 'Optionen', variant: 'ghost' },
  render: ({ children, ...buttonProps }) => (
    <Button {...buttonProps}>
      <i aria-hidden="true" className="far fa-gear" />
      {children}
    </Button>
  ),
};
export const Danger: Story = {
  args: { children: 'Löschen', variant: 'danger' },
  render: ({ children, ...buttonProps }) => (
    <Button {...buttonProps}>
      <i aria-hidden="true" className="far fa-trash" />
      {children}
    </Button>
  ),
};
export const Disabled: Story = { args: { children: 'Aktion', disabled: true } };

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
      <Button type="submit" variant="primary">
        <i aria-hidden="true" className="far fa-plus" />
        Erstellen
      </Button>
    </form>
  ),
};
