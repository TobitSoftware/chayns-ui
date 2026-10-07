import { useState } from 'react';
import { TextArea } from '@chayns-ui/core';

export default function TextAreaWithCounter() {
  const [value, setValue] = useState('');

  return (
    <TextArea
      counter={`${value.length} / 500`}
      helpText="Maximal 500 Zeichen."
      maxLength={500}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Nachricht"
      rows={4}
      value={value}
    />
  );
}

TextAreaWithCounter.displayName = 'TextAreaWithCounter';
