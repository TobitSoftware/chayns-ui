---
{
  "name": "AvatarGroup",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Represent several identities as overlapping Avatar tiles."
  ],
  "doNotUseWhen": [
    "Do not use instead of a readable identity list or status indicators."
  ],
  "alternatives": [
    "List",
    "Avatar"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/",
    "../avatar/avatar-specification.md"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/AvatarGroup:Default",
    "Core/AvatarGroup:Small"
  ]
}
---
# AvatarGroup — Component Specification

## Selection guide

Use when: Represent several identities as overlapping Avatar tiles.

Do not use when: Do not use instead of a readable identity list or status indicators.

Alternatives: List, Avatar.

This component shares its confirmed API, native/ref, token, accessibility and acceptance
contract with [avatar specification](../avatar/avatar-specification.md).
Read that normative specification before implementation.
