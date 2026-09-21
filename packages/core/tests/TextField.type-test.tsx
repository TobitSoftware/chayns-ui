import { createRef } from 'react';

import TextField from '../src/components/text-field/TextField.js';

export const validTextField = (
  <TextField
    aria-label="Account email"
    data-purpose="email"
    inputMode="email"
    maxLength={120}
    placeholder="name@example.com"
    ref={createRef<HTMLInputElement>()}
    required
    type="email"
  />
);

export const validPasswordField = (
  <TextField autoComplete="current-password" placeholder="Passwort" type="password" />
);

// @ts-expect-error custom labels are not part of the placeholder contract
export const customLabel = <TextField label="Name" />;
// @ts-expect-error input children are forbidden
export const inputChildren = <TextField>Name</TextField>;
// @ts-expect-error descriptions are component-owned
export const customDescription = <TextField aria-describedby="description" />;
// @ts-expect-error invalid state is component-owned by error
export const customInvalid = <TextField aria-invalid />;
