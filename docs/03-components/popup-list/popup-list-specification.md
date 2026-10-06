---
{
  "name": "PopupList",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Bundle several secondary icon/text actions behind an existing trigger; this supplies the Bodywork Dropdown use case."
  ],
  "doNotUseWhen": [
    "Do not use for data selection (ComboBox), important information hidden in a tooltip, or a modal decision."
  ],
  "alternatives": [
    "ComboBox",
    "Tooltip"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/",
    "../popup/popup-specification.md"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/Popup:ActionList",
    "Core/Popup:KeyboardNavigation",
    "Core/Popup:BaseComposition",
    "Core/Popup:LongLocalizedItems"
  ]
}
---
# PopupList — Component Specification

## Selection guide

Use when: Bundle several secondary icon/text actions behind an existing trigger; this supplies the Bodywork Dropdown use case.

Do not use when: Do not use for data selection (ComboBox), important information hidden in a tooltip, or a modal decision.

Alternatives: ComboBox, Tooltip.

This component shares its confirmed API, native/ref, token, accessibility and acceptance
contract with [popup specification](../popup/popup-specification.md).
Read that normative specification before implementation.
