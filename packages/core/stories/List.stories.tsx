import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Avatar from '../src/components/avatar/Avatar.js';
import List from '../src/components/list/List.js';

const meta = {
  title: 'Core/List',
  component: List,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof List>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  render: () => (
    <div style={{ maxInlineSize: '28rem' }}>
      <List>
        <List.Item>
          <List.Item.Action onClick={fn()}>
            <List.Item.Leading>
              <Avatar name="Eva Sommer" />
            </List.Item.Leading>
            <List.Item.Body>
              <List.Item.Title>Eva Sommer</List.Item.Title>
              <List.Item.Description>Das Q3-Budget ist freigegeben.</List.Item.Description>
            </List.Item.Body>
          </List.Item.Action>
          <List.Item.Trailing>
            <time dateTime="08:40">08:40</time>
            <List.Item.Status label="Neu" />
          </List.Item.Trailing>
        </List.Item>
        <List.Item>
          <List.Item.Action href="#dokumente">
            <List.Item.Body>
              <List.Item.Title>Dokumente</List.Item.Title>
              <List.Item.Description>Zur Übersicht navigieren</List.Item.Description>
            </List.Item.Body>
          </List.Item.Action>
        </List.Item>
      </List>
    </div>
  ),
};
