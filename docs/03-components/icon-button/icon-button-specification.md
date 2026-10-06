---
{
  "name": "IconButton",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Choose a square icon-only action when its meaning is established and a localized accessible name is supplied."
  ],
  "doNotUseWhen": [
    "Do not squeeze an ordinary Primary button into an icon control or omit an accessible name; use Button when a visible label helps."
  ],
  "alternatives": [
    "Button"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/",
    "../button/button-specification.md"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/IconButton:Attachment",
    "Core/IconButton:Highlighted",
    "Core/IconButton:Disabled",
    "Core/IconButton:Loading",
    "Core/IconButton:AllVariants"
  ]
}
---
# IconButton — Component Specification

## Selection guide

Use when: Choose a square icon-only action when its meaning is established and a localized accessible name is supplied.

Do not use when: Do not squeeze an ordinary Primary button into an icon control or omit an accessible name; use Button when a visible label helps.

Alternatives: Button.

This component shares its confirmed API, native/ref, token, accessibility and acceptance
contract with [button specification](../button/button-specification.md).
Read that normative specification before implementation.
