import { ListItem } from './docs/ListItem.js';
import { ListItemAction } from './docs/ListItemAction.js';
import { ListItemBody } from './docs/ListItemBody.js';
import { ListItemDescription } from './docs/ListItemDescription.js';
import { ListItemLeading } from './docs/ListItemLeading.js';
import { ListItemStatus } from './docs/ListItemStatus.js';
import { ListItemTitle } from './docs/ListItemTitle.js';
import { ListItemTrailing } from './docs/ListItemTrailing.js';
import usage from '../../../docs/03-components/list/list-usage.md?raw';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import Avatar from '../src/components/avatar/Avatar.js';
import List from '../src/components/list/List.js';

const meta = {
  title: 'Core/List',
  component: List,
  subcomponents: {
    'List.Item': ListItem as never,
    'List.Item.Action': ListItemAction as never,
    'List.Item.Body': ListItemBody as never,
    'List.Item.Description': ListItemDescription as never,
    'List.Item.Leading': ListItemLeading as never,
    'List.Item.Status': ListItemStatus as never,
    'List.Item.Title': ListItemTitle as never,
    'List.Item.Trailing': ListItemTrailing as never,
  },
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: usage } },
    a11y: { test: 'error' },
  },
} satisfies Meta<typeof List>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {
  decorators: [
    (Story) => (
      <div className="chayns-storybook-example-constrained">
        <Story />
      </div>
    ),
  ],
  render: () => (
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
  ),
};
