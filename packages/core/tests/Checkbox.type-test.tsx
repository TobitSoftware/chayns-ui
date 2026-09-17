import { createRef } from 'react';

import Checkbox from '../src/components/checkbox/Checkbox.js';

export const validCheckbox = (
  <Checkbox
    data-purpose="terms"
    defaultChecked
    name="terms"
    ref={createRef<HTMLInputElement>()}
    required
    value="yes"
  >
    Bedingungen akzeptieren
  </Checkbox>
);

// @ts-expect-error visible label is required
export const missingLabel = <Checkbox />;
// @ts-expect-error Checkbox owns its input type
export const customType = <Checkbox type="radio">Option</Checkbox>;
