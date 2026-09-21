# ComboBox — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `#picker`, checked 2026-09-21
- Relevant Decisions: COMBO-001–005, DESIGN-011

## Confirmed contract

ComboBox is an editable ARIA combobox with a native text input and a popup list of `ComboBox.Option` children. The parent owns the selected value, input text, option identity, popup state, active descendant and keyboard interaction through React Context. `Option` is valid only under `ComboBox` and owns its native option row. Options use a unique string `value` and visible `children` as their label.

The `multiple` prop selects the mode. Without `multiple`, `value`/`defaultValue` and `onValueChange` use a single string. With `multiple`, the value is the selected `ComboBox.Option` element collection and `onValueChange` returns that collection. The input filters options, free text is allowed, Escape restores the last confirmed text and closes the popup, and blur commits the current text in single-select mode. Native input props and ref target the input; the component owns the combobox ARIA relationship and generated option IDs.

## Design review blocker

Bodywork defines the field as a `.ff-field` using `--input-py`, `--input-px`, a 1.5px border, 10px radius and the floating label pattern. The popup uses `--z-popover`, `--surface`, `--border`, 12px radius, `--shadow-pop` and compact option rows with `--k9`/`--k12` padding. Multi-Select renders selected values as accent chips and options with checkbox geometry. The documented use case is four or more options; the component also exposes the confirmed single-select mode.

## Verification contract

The implementation covers controlled and uncontrolled values, filtering, free text, option selection, Escape restore, blur commit, keyboard navigation, focus, generated ARIA relationships, native props/ref, SSR and long localized content. Storybook includes the canonical compound example and interaction evidence. Bodywork review states are default, focus, open, selected, multi-selected and reduced motion.
