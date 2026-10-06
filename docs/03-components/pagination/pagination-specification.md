---
{
  "name": "Pagination",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Switch pages of a long page-loaded collection."
  ],
  "doNotUseWhen": [
    "Do not use for feeds, hierarchies or sequential workflow steps."
  ],
  "alternatives": [
    "load-more Button"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/Pagination:Default",
    "Core/Pagination:EdgeCases"
  ],
  "combinations": [
    "List",
    "Card"
  ]
}
---
# Pagination — Component Specification

## Selection guide

Use when: Switch pages of a long page-loaded collection.

Do not use when: Do not use for feeds, hierarchies or sequential workflow steps.

Alternatives: load-more Button.

- Category: Core
- Status: READY FOR IMPLEMENTATION
- Decisions: user decisions 2026-10-06; CORE-010–012; A11Y-001–007
- Reference: https://tappqa.tobit.com/Bodywork/DesignSystem/ and tobit-ds.css, checked 2026-10-06

## Purpose and selection

Controlled pagination for page-loaded collections. Use for long inventories; feeds use explicit load-more, and hierarchy navigation uses Breadcrumb.

## Contract

Public API: native nav props plus `page: number`, `pageCount: number`,
`onPageChange(page): void`, `labels: { previous: string; next: string; pageLabel(page): string }`.
Pages are 1-based integers. pageCount >= 1 and page within its bounds; invalid values
throw, never silently fetch or normalize. At most seven numeric/ellipsis positions:
all numbers for <=7 pages; start window 1..5,...,last for page<=4; end window
1,...,last-4..last for page>=last-3; otherwise 1,...,page-1,page,page+1,...,last.
Ellipsis is text, never a button. Previous/Next are disabled at bounds. The current
button has aria-current="page"; every numbered button has a localized pageLabel.
Clicking the current page emits no redundant callback. Button clicks bubble normally
to nav consumer events, and a cancelling nav event suppresses onPageChange.
Root ref targets nav, compatible nav props target nav. No router, fetching, page-size
selection, totals/range display or uncontrolled state in this initial scope. Table-specific
pagination metadata belongs to future Table composition, not this generic component.
No variants, context, motion, local size, loading or locale assumptions.

Bodywork #navigation pagination: gap `--k6`, controls `--k34` high/wide, 10px radius,
1px arrow border `--border`, transparent resting surface, arrow text `--text-2`,
number `--fs-body` weight 500, arrows `--fs-caption`; active accent/on-accent.
Focus/disabled use global tokens. Horizontal overflow preserves targets and labels.
Decorative transitions are absent; reduced motion is not applicable.

Acceptance: 1/7/8/many page windows, boundaries, invalid inputs, controlled callbacks,
current-page no-op, cancellation, localized Accessible Names, nav/ref forwarding,
keyboard buttons, long names/320px/zoom, all theme/density modes and story a11y.

## Evidence and release checks

Storybook: Core/Pagination, Default and EdgeCases. Visual states: resting, hover, focus,
active/current, disabled when applicable; light/dark, S/M/L and reduced motion.
No open product/design decision for this bounded implementation scope. Readiness
permits implementation; actual browser/keyboard/a11y verification and manual screenreader
and zoom/reflow review remain release checks, not assumed from the gate.

## Global icon rule follow-up — 2026-10-06

Owned action glyphs follow ICON-001–003: Regular at rest/disabled and Solid on
enabled hover/active; informational markers stay Regular. The existing internal
renderers use wrappers to remain stable under Font Awesome SVG replacement. Public
props, token geometry, native events and focus ownership remain unchanged. The
[icon rule review](../icon-rule-review-2026-10-06.md) records owner-specific findings
and consumer-content boundaries.
