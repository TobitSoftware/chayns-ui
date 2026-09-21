# Badge — Component Specification

## Metadata

- Component Category: Core
- Specification Status: BLOCKED — DESIGN REVIEW
- Design Reference: chayns UI decision register and token foundation, checked 2026-09-21
- Relevant Decisions: BADGE-001–002, DESIGN-011

## Purpose and boundary

Badge is a compact status indicator for short localized content. Use it for a state, category or count that belongs to nearby content. The Bodywork “Badges & Chips” contract permits an optional removable mode; it does not create a separate public Chip component.

## Public API and native ownership

`Badge` renders a native `span`, forwards compatible span props and its ref to that span, and accepts `children`, `tone`, `size`, optional `onRemove` and required `removeLabel` when removable. The finite values are exported through `BADGE_TONES` and `BADGE_SIZES`. Without `aria-label`, the badge is decorative or part of the surrounding accessible name. With `aria-label`, it renders `role="status"` and uses the localized label as its accessible name. Removable badges render a native close button with the localized `removeLabel`; `onRemove` is called and visibility remains controlled by the consumer.

## Visual and accessibility contract

The default tone is `neutral` and the default size is `md`. `sm` and `md` are confirmed design variants. Tone styling uses the existing semantic accent, surface, success, warning and danger tokens. The close control is the only interactive part. Its content remains short and must wrap or be shortened by the consumer before composition when the product text requires a sentence.

## Design review blocker

Bodywork is the required source for the badge radius and the exact `sm`/`md` geometry. The referenced DesignSystem endpoint was unreachable on 2026-09-21, so no CSS values are implemented or inferred. The component cannot receive READY status until the Bodywork reference and those measurements are confirmed.

## Verification

Runtime, type and SSR tests cover native props/ref, tone and size values, decorative semantics and named status semantics. Storybook covers the canonical badge and an accessible status example. Bodywork geometry remains a visual review item for final release verification.
