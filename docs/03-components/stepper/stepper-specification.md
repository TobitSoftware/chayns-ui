---
{
  "name": "Stepper",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "blocked",
  "useWhen": [
    "Adjust exact numeric quantities in small increments."
  ],
  "doNotUseWhen": [
    "Do not use for approximate bounded settings or free text."
  ],
  "alternatives": [
    "Slider",
    "TextField"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": []
}
---
# Stepper — Component Specification

## Selection guide

Use when: Adjust exact numeric quantities in small increments.

Do not use when: Do not use for approximate bounded settings or free text.

Alternatives: Slider, TextField.

## Confirmed scope and blockers

Confirmed controlled API: value, min, max, step, onValueChange, label,
decreaseLabel, increaseLabel and formatValue. No editable text input and no
hold-to-repeat. Content is already localized; no locale or currency is inferred.
Bodywork #picker Stepper was checked on 2026-10-06: native decrement/increment
buttons, input-border 1.5px frame and dividers, radius10, k40 button geometry,
text-2/surface controls, body-large icons, 52px minimum value cell, fs-body/text
weight600. Container owns external spacing. No motion is needed.

OPEN: safe integers only, or decimals with confirmed precision, rounding and alignment
to the min/step grid? Numeric validation and boundary behaviour cannot be finalized
until this is answered. Native buttons, accessible names, disabled boundaries,
controlled updates and localized value announcements must be specified and tested.
No implementation or Storybook evidence exists. Required future checks include bounds,
controlled updates, precision, ref/native props, keyboard activation, naming/value
announcements, theme/density, reduced motion and zoom/reflow.
