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

## Global icon rule follow-up — 2026-10-06

Owned action glyphs follow ICON-001–003: Regular at rest/disabled and Solid on
enabled hover/active; informational markers stay Regular. The existing internal
renderers use wrappers to remain stable under Font Awesome SVG replacement. Public
props, token geometry, native events and focus ownership remain unchanged. The
[icon rule review](../icon-rule-review-2026-10-06.md) records owner-specific findings
and consumer-content boundaries.
