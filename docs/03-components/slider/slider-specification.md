---
{
  "name": "Slider",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Adjust one approximate bounded value with immediate effect and a visible formatted value."
  ],
  "doNotUseWhen": [
    "Do not use for exact quantities, free text or a multi-thumb range."
  ],
  "alternatives": [
    "Stepper",
    "TextField"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/Slider:Default",
    "Core/Slider:EdgeCases"
  ],
  "combinations": [
    "Card",
    "Switch"
  ]
}
---
# Slider — Component Specification

## Selection guide

Use when: Adjust one approximate bounded value with immediate effect and a visible formatted value.

Do not use when: Do not use for exact quantities, free text or a multi-thumb range.

Alternatives: Stepper, TextField.

- Category: Core
- Status: READY FOR IMPLEMENTATION
- Decisions: user decisions 2026-10-06; CORE-010–012; A11Y-001–007
- Reference: https://tappqa.tobit.com/Bodywork/DesignSystem/ and tobit-ds.css, checked 2026-10-06

## Purpose and selection

One native range value with a visible formatted value. Use for approximate bounded settings with immediate effect; Stepper is for exact quantities and TextField for free text.

## Contract

Public API: compatible native input props except type/children and component-owned
aria-valuetext, plus `label: ReactNode` and required `formatValue(value): string`.
Native value/defaultValue/onChange remain native platform values and events; the
native input owns min/max/step, keyboard behaviour, disabled and form participation.
The default native range interval is 0..100, default value its midpoint; native
sanitization defines displayed initial normalization. Native props and ref target input.
The wrapper only lays out an associated label and a visible output. Internal state
tracks the native effective value only for uncontrolled display. Consumer onChange
runs first; native value is read for display, including when the handler cancels.
Consumer formatValue supplies all localized units/formatting; the same string becomes
aria-valuetext. No locale, currency, textstring ID or guessed suffix. No multi-thumb
mode, root props bag, context, variants, local size, loading or async logic.

Bodywork #picker .ds-range: 100% width, `--k20` input height; 4px pill track input-border,
Firefox progress accent; `--k18` surface thumb, 2px accent border, shadow-card,
transform .15s ease, hover/active scale(1.12), established focus ring. Label fs-body
weight500/text; output fs-meta weight600/accent. A 24px minimum interactive height
satisfies pointer targets without altering visible track/thumb. No exterior 26px margin,
no component font loading. Reduced motion disables thumb transform transition.
Labels wrap and input shrinks in available width.

Acceptance: controlled/native/uncontrolled/default/min-max-step display, native keyboard,
change forwarding/cancellation, form/ref/native prop targets, accessible label/value text,
no multi-thumb API, disabled, localized labels/zoom/320px, theme/density and browser a11y.

## Evidence and release checks

Storybook: Core/Slider, Default and EdgeCases. Visual states: resting, hover, focus,
active/current, disabled when applicable; light/dark, S/M/L and reduced motion.
No open product/design decision for this bounded implementation scope. Readiness
permits implementation; actual browser/keyboard/a11y verification and manual screenreader
and zoom/reflow review remain release checks, not assumed from the gate.

The value uses Bodywork’s Roboto Mono family with a monospace fallback; consumers
load fonts. Label-to-control spacing is `--k10` from the reference.
