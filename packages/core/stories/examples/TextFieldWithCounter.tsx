import { useState } from 'react';
import { TextField } from '@chayns-ui/core';

export default function TextFieldWithCounter() {
  const [value, setValue] = useState('');

  return (
    <TextField
      counter={`${value.length} / 120`}
      helpText="Wir verwenden die Adresse nur für wichtige Hinweise."
      maxLength={120}
      onChange={(event) => setValue(event.target.value)}
      placeholder="E-Mail-Adresse"
      type="email"
      value={value}
    />
  );
}

TextFieldWithCounter.displayName = 'TextFieldWithCounter';
