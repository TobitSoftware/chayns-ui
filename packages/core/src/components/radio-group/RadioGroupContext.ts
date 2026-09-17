import { createContext, useContext } from 'react';

interface RadioGroupContextValue {
  disabled: boolean;
  name: string;
  selectValue: (value: string) => void;
  value: string | undefined;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const context = useContext(RadioGroupContext);

  if (context === null) {
    throw new Error('RadioGroup.Radio must be rendered within RadioGroup.');
  }

  return context;
}

export { RadioGroupContext, useRadioGroupContext };
export type { RadioGroupContextValue };
