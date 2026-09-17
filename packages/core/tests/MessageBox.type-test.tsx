import { createRef } from 'react';

import MessageBox from '../src/components/message-box/MessageBox.js';

export const validMessageBox = (
  <MessageBox
    aria-label="Hinweis"
    data-purpose="retention"
    ref={createRef<HTMLElement>()}
    tone="admin"
  >
    Hinweis zur Aufbewahrung
  </MessageBox>
);

// @ts-expect-error children are required
export const missingContent = <MessageBox />;
// @ts-expect-error MessageBox owns the static note role
export const customRole = <MessageBox role="alert">Hinweis</MessageBox>;
// @ts-expect-error tone is constrained to Bodywork variants
export const unsupportedTone = <MessageBox tone="danger">Hinweis</MessageBox>;
