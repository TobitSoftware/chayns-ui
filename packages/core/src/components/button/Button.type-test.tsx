import { createRef } from 'react';

import { Button, IconButton } from './index.js';

export const validButton = <Button variant="primary">Create</Button>;
export const validSubmitButton = (
  <Button ref={createRef<HTMLButtonElement>()} type="submit" variant="outline">
    Submit
  </Button>
);
export const validLabelledIconButton = (
  <IconButton aria-label="Settings" icon={<span />} variant="ghost" />
);
export const validReferencedIconButton = (
  <IconButton aria-labelledby="settings-label" icon={<span />} variant="danger" />
);

// @ts-expect-error variant is required
export const missingVariant = <Button>Create</Button>;
// @ts-expect-error visible content is required
export const missingContent = <Button variant="primary" />;
// @ts-expect-error unsupported variant
export const invalidVariant = <Button variant="secondary">Create</Button>;
export const loadingButton = (
  // @ts-expect-error Loading is not a Milestone 1 API
  <Button loading variant="primary">
    Create
  </Button>
);
export const polymorphicButton = (
  // @ts-expect-error polymorphism is not supported
  <Button as="a" variant="primary">
    Create
  </Button>
);
// @ts-expect-error IconButton requires exactly one accessible-name mechanism
export const unnamedIconButton = <IconButton icon={<span />} variant="ghost" />;
export const duplicateNameIconButton = (
  // @ts-expect-error accessible-name mechanisms are mutually exclusive
  <IconButton
    aria-label="Settings"
    aria-labelledby="settings-label"
    icon={<span />}
    variant="ghost"
  />
);
export const iconButtonWithChildren = (
  // @ts-expect-error IconButton does not accept children
  <IconButton aria-label="Settings" icon={<span />} variant="ghost">
    Settings
  </IconButton>
);
