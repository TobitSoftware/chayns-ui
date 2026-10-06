---
{
  "name": "ComboBox",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Select known options compactly; multiple selection with four or more options avoids an overly long checkbox list."
  ],
  "doNotUseWhen": [
    "Do not hide two or three independent choices when visible Checkbox controls suffice; do not use for free text or identity selection that requires avatar/channel business context."
  ],
  "alternatives": [
    "RadioGroup",
    "Checkbox",
    "TextField"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/ComboBox:SingleSelect",
    "Core/ComboBox:MultiSelect"
  ]
}
---
# ComboBox — Component Specification

## Selection guide

Use when: Select known options compactly; multiple selection with four or more options avoids an overly long checkbox list.

Do not use when: Do not hide two or three independent choices when visible Checkbox controls suffice; do not use for free text or identity selection that requires avatar/channel business context.

Alternatives: RadioGroup, Checkbox, TextField.

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: user-provided ComboBox screenshot, checked 2026-09-29; Bodywork Design System `#picker`, checked 2026-09-21
- Relevant Decisions: COMBO-001–002, COMBO-005–012, DESIGN-011

## Confirmed contract

ComboBox is a non-editable native button that opens a popup listbox of `ComboBox.Option` children. The parent owns the selected value, option identity, popup state and keyboard interaction through React Context. `Option` is valid only under `ComboBox`, owns its native option row and uses a unique string `value` with visible `children` as its label. The open listbox is portalled to `document.body`, aligned to the trigger's lower edge with `--k4` spacing and given its border-box inline size; it tracks the trigger during scrolling and resizing so container overflow, including Accordion disclosure clipping, cannot cut it off.

The `multiple` prop selects the mode. Without `multiple`, `value`/`defaultValue` and `onValueChange` use a single string. With `multiple`, the value is the selected `ComboBox.Option` element collection and `onValueChange` returns that collection. The trigger displays the selected label in single-select and selected labels as a comma-separated list in multi-select; it displays the placeholder when no option is selected. This trigger value is a single line and truncates with an ellipsis when space is insufficient. Options remain visible when the popup opens, including selected options. The trigger has a pointer cursor. Enter, Space, Alt+ArrowDown, ArrowDown and ArrowUp open the popup. Opening focuses the first selected option, or the first option if none is selected. Options use the Listbox pattern with `role="option"`, roving `tabIndex` and `aria-selected`. Each selection closes the popup.

Escape closes the popup and restores focus to the trigger. An outside click closes it and follows normal pointer focus. Tab and Shift+Tab close the popup without focus manipulation, preserving normal tab order. Selection closes the popup and restores focus to the trigger. ArrowUp and ArrowDown navigate cyclically through focusable options; Home and End focus the first and last focusable options. Disabled options remain visible but are neither focusable nor selectable. When no visible placeholder is provided, `aria-label` or `aria-labelledby` is required.

Compatible native Button props and the ref target the trigger; `type` is always `button`. Consumer `onClick` and `onKeyDown` run before internal behavior, and `preventDefault()` suppresses that behavior. The user-provided screenshot, checked 2026-09-29, is the design reference for the revised trigger, selected single option and popup. Verification covers controlled and uncontrolled values, selected-option visibility, single- and multi-select closing behavior, keyboard navigation, disabled options, focus restoration, native Button props/ref, SSR, long localized content and reduced motion.

## Bodywork evidence

The user-provided screenshot defines the revised non-editable trigger, selected single-option checkmark, pointer cursor and popup state. The trigger retains the field geometry of `--input-py`, `--input-px`, a 1.5px border, 10px radius and the floating label pattern. The popup uses `--z-popover`, `--surface`, `--border`, 12px radius, `--shadow-pop` and compact option rows with `--k9`/`--k12` padding. It is fixed-positioned in its document-body portal with `--k4` spacing below the trigger and uses matching border-box width. It enters and exits via `opacity` and upward `transform` over 0.18s ease; reduced motion disables both transitions. Multi-Select uses checkbox option geometry and comma-separated trigger labels. The documented use case is four or more options; the component also exposes the confirmed single-select mode.

## Verification contract

The implementation covers controlled and uncontrolled values, opening with all options visible, single- and multi-option selection, Escape and outside-close behavior, cyclic keyboard navigation, disabled options, focus restoration, generated ARIA relationships, native Button props/ref, SSR, portal rendering and alignment inside an Accordion, and long localized trigger values/placeholders with ellipsis. Storybook includes the canonical compound example and interaction evidence. Reviewed states are default, focus, open, selected, multi-selected and reduced motion.

## Foundation audit — 2026-10-06

The listbox shares the trigger's resolved accessible name. Option IDs encode the
complete value so punctuation cannot collapse distinct values into one DOM ID.
Closing content unmounts after its computed transition duration, including a
zero-duration/reduced-motion fallback when no transitionend event is dispatched.
Composed refs preserve consumer cleanup. Regression tests exercise these cases.
