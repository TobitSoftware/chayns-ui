import ComboBox from '../src/components/combo-box/ComboBox.js';

const design = <ComboBox.Option value="design">Design</ComboBox.Option>;

export const validSingle = (
  <ComboBox aria-label="Kategorie" defaultValue="design">
    {design}
  </ComboBox>
);

export const validMultiple = (
  <ComboBox aria-label="Kategorien" multiple defaultValue={[design]}>
    {design}
  </ComboBox>
);

// prettier-ignore
export const invalidMultipleValue = (
  // @ts-expect-error multiple mode requires an option-element collection
  <ComboBox aria-label="Kategorien" multiple value="design">
    {design}
  </ComboBox>
);

// prettier-ignore
export const invalidOptionRole = (
  // @ts-expect-error arbitrary option values are not omitted
  <ComboBox.Option role="option" value="design">
    Design
  </ComboBox.Option>
);
