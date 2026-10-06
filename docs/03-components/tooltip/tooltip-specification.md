---
{
  "name": "Tooltip",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "blocked",
  "useWhen": [
    "Explain a control briefly on hover/focus without taking over its primary action."
  ],
  "doNotUseWhen": [
    "Do not hide essential instructions in a tooltip or put interactive menu actions into it."
  ],
  "alternatives": [
    "help text",
    "PopupList",
    "Banner"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": []
}
---
# Tooltip — Component Specification

## Selection guide

Use when: Explain a control briefly on hover/focus without taking over its primary action.

Do not use when: Do not hide essential instructions in a tooltip or put interactive menu actions into it.

Alternatives: help text, PopupList, Banner.

## Confirmed scope and blockers

Confirmed: children provide the existing trigger; opening must work on hover,
keyboard focus and touch. Bodywork’s Tooltip & Dropdown section distinguishes the
short explanation from the action menu supplied by PopupList. The .tipbox reference
was checked on 2026-10-06: text/surface foreground/background, fs-caption, weight500,
k6/k10 padding, radius8, 9px anchor gap, 5px arrow, opacity/transform .15s ease.
Reduced motion removes decorative transitions. Hover-only Bodywork examples do not
resolve the touch policy or the complete keyboard/description/focus contract.

OPEN: does the first touch execute the trigger action while opening the explanation,
or only explain? Finish the precise public content/trigger/native-ref/event contract,
Escape/dismissal and hoverable-content behaviour before declaring READY. Do not derive
an API or pointer policy from browser-specific hover emulation. No implementation
or Storybook evidence exists. Required future checks include trigger semantics,
localized description, keyboard/Escape, touch action composition, contrast, viewport,
hover persistence, reduced motion and zoom/reflow.
