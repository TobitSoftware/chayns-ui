import { createRef } from 'react';

import { List, ListItem } from './index.js';

export const staticList = (
  <List>
    <ListItem subtitle="Preview" title="Title" />
  </List>
);
export const referencedList = (
  <List ref={createRef<HTMLUListElement>()} aria-label="Messages">
    <ListItem title="Title" />
  </List>
);
export const actionRow = <ListItem onClick={() => undefined} title="Action" />;
export const linkRow = <ListItem href="#target" title="Navigate" />;
export const unreadRow = <ListItem title="Title" unread unreadLabel="Unread" />;
export const richRow = (
  <ListItem leading={<span>A</span>} title="Title" trailing={<button type="button">More</button>} />
);
export const disabledActionRow = <ListItem disabled onClick={() => undefined} title="Action" />;

// @ts-expect-error title is required
export const missingTitle = <ListItem subtitle="Preview" />;
// @ts-expect-error href must be a string
export const invalidHref = <ListItem href={5} title="Navigate" />;
