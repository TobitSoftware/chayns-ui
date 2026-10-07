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
  "checkedOn": "2026-10-07",
  "stories": [
    "Core/Accordion:Standalone",
    "Core/Accordion:DefaultOpen",
    "Core/Accordion:Grouped",
    "Core/Accordion:Wrapped",
    "Core/Accordion:Disabled",
    "Core/Accordion:List",
    "Core/Accordion:NestedGroup"
  ],
  "combinations": [
    "Accordion",
    "TextField",
    "Button"
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

## Content composition — 2026-10-07

Ordinary child content uses one explicit Accordion.Content for its confirmed inset.
A nested group itself is a direct child of the containing Accordion, without an
additional Content wrapper around the group. The same exception covers nested
Accordions/Lists. Mixed ordinary content has its own Content beside those structures.
The [Accordion specification](../accordion/accordion-specification.md) defines the
user-confirmed spacing correction, native panel owner and Bodywork exception.
