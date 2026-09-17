import { createRef } from 'react';

import RadioGroup from '../src/components/radio-group/RadioGroup.js';

export const validRadioGroup = (
  <RadioGroup
    data-purpose="visibility"
    defaultValue="all"
    label="Sichtbarkeit"
    name="visibility"
    ref={createRef<HTMLFieldSetElement>()}
  >
    <RadioGroup.Radio ref={createRef<HTMLInputElement>()} required value="all">
      Alle
    </RadioGroup.Radio>
  </RadioGroup>
);

// @ts-expect-error group label is required
export const missingGroupLabel = <RadioGroup name="visibility" />;
export const customRadioType = (
  <RadioGroup.Radio
    // @ts-expect-error native radio type is owned by RadioGroup.Radio
    type="checkbox"
    value="all"
  >
    Alle
  </RadioGroup.Radio>
);
export const customRadioName = (
  <RadioGroup.Radio
    // @ts-expect-error group owns the shared radio name
    name="another"
    value="all"
  >
    Alle
  </RadioGroup.Radio>
);
export const customChecked = (
  <RadioGroup.Radio
    // @ts-expect-error group owns selected state
    checked
    value="all"
  >
    Alle
  </RadioGroup.Radio>
);
