import { createRef } from 'react';

import TextArea from '../src/components/text-area/TextArea.js';

export const validTextArea = (
  <TextArea
    aria-label="Profile description"
    data-purpose="description"
    label="Beschreibung"
    maxLength={500}
    placeholder="Beschreibe dein Profil"
    ref={createRef<HTMLTextAreaElement>()}
    required
    rows={4}
  />
);

// @ts-expect-error visible label is required
export const missingLabel = <TextArea />;
// @ts-expect-error textarea children are forbidden
export const textareaChildren = <TextArea label="Beschreibung">Text</TextArea>;
// @ts-expect-error descriptions are component-owned
export const customDescription = <TextArea aria-describedby="description" label="Beschreibung" />;
// @ts-expect-error invalid state is component-owned by error
export const customInvalid = <TextArea aria-invalid label="Beschreibung" />;
