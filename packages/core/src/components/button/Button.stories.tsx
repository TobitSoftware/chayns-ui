import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

const meta = {
  title: 'Core/Button',
  component: Button,
  args: {
    children: 'Create',
    variant: 'primary',
  },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline', 'ghost', 'danger'] },
  },
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Outline: Story = { args: { children: 'Reply', variant: 'outline' } };
export const Ghost: Story = { args: { children: 'Options', variant: 'ghost' } };
export const Danger: Story = { args: { children: 'Delete', variant: 'danger' } };
export const Disabled: Story = { args: { children: 'Unavailable', disabled: true } };

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)' }}>
      <Button variant="primary">Create</Button>
      <Button variant="outline">Reply</Button>
      <Button variant="ghost">Options</Button>
      <Button variant="danger">Delete</Button>
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
      <div style={{ inlineSize: '12rem' }}>
        <StoryComponent />
      </div>
    ),
  ],
};

export const UnicodeContent: Story = {
  args: { children: '更新を保存 🌍', variant: 'primary' },
};

export const FormSubmit: Story = {
  render: () => (
    <form>
      <Button type="submit" variant="primary">
        Submit form
      </Button>
    </form>
  ),
};

export const DensityMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sp-4)' }}>
      {(['s', 'm', 'l'] as const).map((density) => (
        <div className={`chayns-density--${density}`} key={density}>
          <Button variant="primary">Density {density.toUpperCase()}</Button>
        </div>
      ))}
    </div>
  ),
};

export const ThemeAndAccessibilityModes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--sp-4)' }}>
      {[
        { className: 'chayns-theme--light', label: 'Light' },
        { className: 'chayns-theme--dark', label: 'Dark' },
        { className: 'chayns-theme--light chayns-contrast--high', label: 'High contrast' },
        {
          className: 'chayns-theme--light chayns-theme--color-deficiency',
          label: 'Color deficiency',
        },
      ].map(({ className, label }) => (
        <div
          className={className}
          key={label}
          style={{ background: 'var(--surface)', padding: 'var(--sp-4)' }}
        >
          <Button variant="danger">{label}</Button>
        </div>
      ))}
    </div>
  ),
};
