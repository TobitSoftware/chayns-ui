---
{
  "name": "SplitButton",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Pair a principal action with related variants, such as send, send later and save draft."
  ],
  "doNotUseWhen": [
    "Do not use when alternatives are equivalent without a principal action; choose separate outline Buttons. A primary SplitButton counts toward the one-primary-per-scope limit."
  ],
  "alternatives": [
    "Button",
    "PopupList"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/SplitButton:Primary",
    "Core/SplitButton:AllVariants",
    "Core/SplitButton:Disabled",
    "Core/SplitButton:LongLocalizedLabel"
  ],
  "combinations": [
    "Button",
    "PopupList",
    "Card"
  ]
}
---
# SplitButton — Component Specification

## Selection guide

Use when: Pair a principal action with related variants, such as send, send later and save draft.

Do not use when: Do not use when alternatives are equivalent without a principal action; choose separate outline Buttons. A primary SplitButton counts toward the one-primary-per-scope limit.

Alternatives: Button, PopupList.

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Relevant Decisions: CORE-010–012, POPUP-005–008, SPLIT-001–004

SplitButton composes one native primary Button and the public PopupList trigger for related alternatives. The wrapper owns compatible div props and ref; primary Button props are the documented `variant`, `children`, `icon`, `onClick` and `disabled` contract. The secondary trigger is owned by PopupList, including its expanded state, dismissal and menu focus. Both controls remain sibling native buttons in DOM order.

All four Button variants are supported. Disabled disables both buttons. The primary action and alternatives use their native handlers; alternative activation closes the PopupList through its public composition and restores trigger focus. SplitButton owns no overlay state, ARIA menu attributes or private portal. The primary label provides the secondary trigger name through `aria-labelledby` while the chevron remains decorative.

Bodywork joined geometry applies: the primary end radius is removed, trigger start border separates both actions, and both native halves reuse the confirmed Button hover/press motion (BUTTON-017). Tests cover independent primary/secondary activation, disabled state, visible trigger name and PopupList integration.

## Global icon rule follow-up — 2026-10-06

Owned action glyphs follow ICON-001–003: Regular at rest/disabled and Solid on
enabled hover/active; informational markers stay Regular. The existing internal
renderers use wrappers to remain stable under Font Awesome SVG replacement. Public
props, token geometry, native events and focus ownership remain unchanged. The
[icon rule review](../icon-rule-review-2026-10-06.md) records owner-specific findings
and consumer-content boundaries.

## Bodywork motion correction — 2026-10-06

The live Bodywork Split-Button example renders both halves with the Button classes
(checked 2026-10-06). The secondary native trigger therefore reuses the existing
Button class and renderer rather than duplicating divergent state styling. Both
halves follow BUTTON-017: hover lift -1px, brightness 1.06, press resets translation
and scales .97, transform 140ms ease and shadow/filter 180ms ease. Reduced Motion
disables transforms/transitions and keyboard focus retains its ring on hover.
The established joined geometry and native PopupList relationship stay unchanged.
Storybook evidence: `Core/SplitButton:Primary`, `AllVariants`, `Disabled`. Checked
states: rest, hover, press, disabled, keyboard focus and Reduced Motion. No new API,
variant, token or unresolved design review is introduced.
