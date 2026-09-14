import type { Meta, StoryObj } from '@storybook/react-vite';

import Avatar from './Avatar.js';
import AvatarGroup from './AvatarGroup.js';

const meta = {
  title: 'Core/AvatarGroup',
  component: AvatarGroup,
  tags: ['autodocs'],
  parameters: {
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof AvatarGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <AvatarGroup {...args}>
      <Avatar
        name="Eva Fischer"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop"
      />
      <Avatar
        name="Thomas Müller"
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop"
      />
      <Avatar name="Klaus Peters" />
      <Avatar name="Peter Schmidt" />
      <Avatar name="Maria Sommer" />
    </AvatarGroup>
  ),
  args: {
    max: 4,
  },
};

export const Small: Story = {
  render: () => (
    <AvatarGroup max={4} size="small">
      <Avatar name="Eva Fischer" />
      <Avatar name="Thomas Müller" />
      <Avatar name="Klaus Peters" />
      <Avatar name="Peter Schmidt" />
    </AvatarGroup>
  ),
};
