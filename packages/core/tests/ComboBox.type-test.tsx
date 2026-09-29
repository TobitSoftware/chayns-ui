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

export const validButtonProp = (
  <ComboBox aria-label="Kategorie" title="Kategorie">
    {design}
  </ComboBox>
);

// prettier-ignore
export const invalidInputProp = (
  // @ts-expect-error input-only props are not part of the button contract
  <ComboBox aria-label="Kategorie" autoComplete="off">
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
