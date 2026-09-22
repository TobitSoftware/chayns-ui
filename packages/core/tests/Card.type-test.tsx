import { createRef } from 'react';

import Card from '../src/components/card/Card.js';

export const flatCard = <Card>Content</Card>;
export const composedCard = (
  <Card>
    <Card.Header icon="fa-chart-line">Content</Card.Header>
  </Card>
);
export const referencedCard = (
  <Card ref={createRef<HTMLDivElement>()} aria-label="Panel" role="group">
    Content
  </Card>
);
export const emptyCard = <Card />;
