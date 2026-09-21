import Badge from '../src/components/badge/Badge.js';

export const validBadge = (
  <Badge tone="accent" size="sm">
    Beta
  </Badge>
);
// @ts-expect-error arbitrary tones are not part of the public value set
export const invalidTone = <Badge tone="critical">Error</Badge>;
// @ts-expect-error arbitrary sizes are not part of the public value set
export const invalidSize = <Badge size="large">Error</Badge>;
