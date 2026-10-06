---
{
  "name": "AccordionGroup",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Use when related disclosures are mutually exclusive: opening one closes another in the same group."
  ],
  "doNotUseWhen": [
    "Do not use when sections must stay independently open, content must always remain visible, or a workflow has ordered steps."
  ],
  "alternatives": [
    "Accordion",
    "Tabs"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/",
    "../accordion/accordion-specification.md"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/Accordion:Standalone",
    "Core/Accordion:DefaultOpen",
    "Core/Accordion:Grouped",
    "Core/Accordion:Wrapped",
    "Core/Accordion:Disabled",
    "Core/Accordion:List"
  ]
}
---
# AccordionGroup — Component Specification

## Selection guide

Use when: Use when related disclosures are mutually exclusive: opening one closes another in the same group.

Do not use when: Do not use when sections must stay independently open, content must always remain visible, or a workflow has ordered steps.

Alternatives: Accordion, Tabs.

This component shares its confirmed API, native/ref, token, accessibility and acceptance
contract with [accordion specification](../accordion/accordion-specification.md).
Read that normative specification before implementation.
