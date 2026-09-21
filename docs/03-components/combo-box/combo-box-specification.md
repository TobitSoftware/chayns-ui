# ComboBox — Component Specification

## Metadata

- Component Category: Core
- Specification Status: BLOCKED — DESIGN REVIEW
- Design Reference: Bodywork Design System, concrete ComboBox reference unavailable on 2026-09-21
- Relevant Decisions: COMBO-001–005, DESIGN-011

## Confirmed contract

ComboBox is an editable ARIA combobox with a native text input and a popup list of `ComboBox.Option` children. The parent owns the selected value, input text, option identity, popup state, active descendant and keyboard interaction through React Context. `Option` is valid only under `ComboBox` and owns its native option row. Options use a unique string `value` and visible `children` as their label.

The `multiple` prop selects the mode. Without `multiple`, `value`/`defaultValue` and `onValueChange` use a single string. With `multiple`, the value is the selected `ComboBox.Option` element collection and `onValueChange` returns that collection. The input filters options, free text is allowed, Escape restores the last confirmed text and closes the popup, and blur commits the current text in single-select mode. Native input props and ref target the input; the component owns the combobox ARIA relationship and generated option IDs.

## Design review blocker

The exact Bodywork input geometry, popup placement, option states, colors, spacing, radius, focus treatment and motion are unavailable because the referenced DesignSystem endpoint could not be reached on 2026-09-21. No ComboBox CSS or READY implementation may be produced until that review is confirmed.

## Verification contract

The eventual implementation must cover controlled and uncontrolled values, filtering, free text, option selection, Escape restore, blur commit, keyboard navigation, focus, generated ARIA relationships, native props/ref, SSR and long localized content. Storybook must include the canonical compound example and interaction evidence.
