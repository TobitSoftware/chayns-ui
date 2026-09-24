import React, { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { addons, types, useGlobals } from 'storybook/manager-api';

const ADDON_ID = 'chayns-ui/accent-color';
const TOOL_ID = `${ADDON_ID}/tool`;
const DEFAULT_ACCENT_COLOR = '#0f6d7e';
const DEBOUNCE_DELAY_MS = 150;
const HEX_COLOR_PATTERN = /^#[\da-f]{6}$/i;

function toAccentColor(value: unknown): string {
  return typeof value === 'string' && HEX_COLOR_PATTERN.test(value)
    ? value.toLowerCase()
    : DEFAULT_ACCENT_COLOR;
}

interface AccentColorInputProps {
  initialAccentColor: string;
  updateGlobals: (newGlobals: Record<string, unknown>) => void;
}

function AccentColorInput({ initialAccentColor, updateGlobals }: AccentColorInputProps) {
  const [accentColor, setAccentColor] = useState(initialAccentColor);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timeout.current !== undefined) window.clearTimeout(timeout.current);
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const color = event.currentTarget.value;

    setAccentColor(color);
    if (timeout.current !== undefined) window.clearTimeout(timeout.current);

    timeout.current = window.setTimeout(() => {
      updateGlobals({ accentColor: color });
    }, DEBOUNCE_DELAY_MS);
  };

  return (
    <input
      aria-label="Accent color"
      onChange={handleChange}
      title="Accent color"
      type="color"
      value={accentColor}
    />
  );
}

function AccentColorTool() {
  const [globals, updateGlobals] = useGlobals();
  const accentColor = toAccentColor(globals.accentColor);

  return (
    <AccentColorInput
      key={accentColor}
      initialAccentColor={accentColor}
      updateGlobals={updateGlobals}
    />
  );
}

addons.register(ADDON_ID, () => {
  addons.add(TOOL_ID, {
    title: 'Accent color',
    type: types.TOOL,
    render: AccentColorTool,
  });
});
