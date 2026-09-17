import { createRef } from 'react';

import TextField from '../src/components/text-field/TextField.js';

export const validTextField = (
  <TextField
    aria-label="Account email"
    data-purpose="email"
    inputMode="email"
    label="E-Mail-Adresse"
    maxLength={120}
    placeholder="name@example.com"
    ref={createRef<HTMLInputElement>()}
    required
    type="email"
  />
);

// @ts-expect-error visible label is required
export const missingLabel = <TextField />;
// @ts-expect-error input children are forbidden
export const inputChildren = <TextField label="Name">Name</TextField>;
// @ts-expect-error descriptions are component-owned
export const customDescription = <TextField aria-describedby="description" label="Name" />;
// @ts-expect-error invalid state is component-owned by error
export const customInvalid = <TextField aria-invalid label="Name" />;
