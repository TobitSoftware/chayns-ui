import { createRef } from 'react';

import { Card } from './index.js';

export const flatCard = <Card>Content</Card>;
export const elevatedCard = <Card elevated>Content</Card>;
export const referencedCard = (
  <Card ref={createRef<HTMLDivElement>()} aria-label="Panel" role="group">
    Content
  </Card>
);
export const emptyCard = <Card />;

// @ts-expect-error elevated must be a boolean
export const invalidElevated = <Card elevated="yes">Content</Card>;
