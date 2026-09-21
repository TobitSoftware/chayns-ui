import Badge from '../src/components/badge/Badge.js';

export const validBadge = (
  <Badge tone="accent" size="sm">
    Beta
  </Badge>
);
export const validRemovableBadge = (
  <Badge onRemove={() => undefined} removeLabel="Beta entfernen">
    Beta
  </Badge>
);

// @ts-expect-error arbitrary tones are not part of the public value set
export const invalidTone = <Badge tone="critical">Error</Badge>;
// @ts-expect-error arbitrary sizes are not part of the public value set
export const invalidSize = <Badge size="large">Error</Badge>;
// @ts-expect-error removeLabel is required when onRemove is supplied
export const missingRemoveLabel = <Badge onRemove={() => undefined}>Beta</Badge>;
