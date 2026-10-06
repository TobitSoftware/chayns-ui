---
{
  "name": "Breadcrumb",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Show the return path in a hierarchy of three or more levels."
  ],
  "doNotUseWhen": [
    "Do not use for flat navigation or peer panel selection."
  ],
  "alternatives": [
    "Tabs",
    "native navigation links"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/Breadcrumb:Default",
    "Core/Breadcrumb:EdgeCases"
  ],
  "combinations": [
    "AppLayout",
    "Card",
    "List"
  ]
}
---
# Breadcrumb — Component Specification

## Selection guide

Use when: Show the return path in a hierarchy of three or more levels.

Do not use when: Do not use for flat navigation or peer panel selection.

Alternatives: Tabs, native navigation links.

- Category: Core
- Status: READY FOR IMPLEMENTATION
- Decisions: user decisions 2026-10-06; CORE-010–012; A11Y-001–007
- Reference: https://tappqa.tobit.com/Bodywork/DesignSystem/ and tobit-ds.css, checked 2026-10-06

## Purpose and selection

A hierarchy path with native links for ancestors and a non-link current item. Use for three or more levels; flat navigation uses navigation links or Tabs for peer panels.

## Contract

Public API: native nav props plus `items: readonly { label: ReactNode; href?: string; icon?: ButtonIcon }[]`.
Only the last item omits href; it is current and receives aria-current="page". Earlier
items require href; no routing integration. Root ref targets nav, native props target
nav. Labels and optional icons are supplied resolved by the consumer. The ordered
list owns separators (decorative Regular chevrons). Ancestor links preserve native
keyboard/open-in-new-tab behaviour. Current item is plain text, not a button. Native
nav events are forwarded unchanged. No state, context, variants, motion, loading,
local density, API access, or business logic. No truncation: horizontal overflow keeps
long localized paths accessible.

Bodywork #navigation breadcrumb: `--k9` gap, `--fs-body`, ancestor `--text-2`, current
`--text` weight 500, separator `--icon`, home icon gap 6px. No exterior 24px margin.
The existing Bodywork small-screen override at 640px uses `--k6`, no wrapping and horizontal
scroll. chayns UI uses horizontal overflow at every width without hiding labels;
this is the accessibility-preserving responsive adaptation of the same breadcrumb.
Focus ring uses existing focus tokens. No transition; reduced motion is not applicable.
Native links meet target size with the minimum `max(24px, --k24)` height, including density S.

Acceptance: nav/ref/data-* forwarding, ordered links/current item, decorative
separators, invalid non-terminal current items rejected, long labels at 320px/zoom,
keyboard links, dark/density/contrast and automated a11y story checks.

## Evidence and release checks

Storybook: Core/Breadcrumb, Default and EdgeCases. Visual states: resting, hover, focus,
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
