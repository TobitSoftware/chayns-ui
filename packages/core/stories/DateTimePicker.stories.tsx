import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import DateTimePicker from '../src/components/date-time-picker/DateTimePicker.js';

const wheelLabels = {
  day: 'Tag',
  dayPeriod: 'Tageszeit',
  hour: 'Stunde',
  minute: 'Minute',
  month: 'Monat',
  year: 'Jahr',
};

const meta = {
  title: 'Core/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
  parameters: { a11y: { test: 'error' } },
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Time: Story = {
  args: {
    label: 'Uhrzeit',
    locale: 'de-DE',
    onChange: () => undefined,
    placeholder: 'Uhrzeit auswählen',
    value: new Date(2026, 8, 22, 10, 30),
    wheelLabels,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <DateTimePicker {...args} onChange={setValue} value={value} />;
  },
};

export const DateMode: Story = {
  args: {
    label: 'Datum',
    locale: 'de-DE',
    mode: 'date',
    onChange: () => undefined,
    placeholder: 'Datum auswählen',
    value: new Date(2026, 8, 22),
    wheelLabels,
  },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return <DateTimePicker {...args} onChange={setValue} value={value} />;
  },
};
