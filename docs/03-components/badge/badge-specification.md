# Badge — Component Specification

## Metadata

- Component Category: Core
- Specification Status: BLOCKED — DESIGN REVIEW
- Design Reference: chayns UI decision register and token foundation, checked 2026-09-21
- Relevant Decisions: CORE-013, DESIGN-011

## Purpose and boundary

Badge is a compact, non-interactive status indicator for short localized content. Use it for a state, category or count that belongs to nearby content. It does not own actions, navigation or tooltip behaviour.

## Public API and native ownership

`Badge` renders one native `span`, forwards compatible span props and its ref to that span, and accepts `children`, `tone` and `size`. The finite values are exported through `BADGE_TONES` and `BADGE_SIZES`. Without `aria-label`, the badge is decorative or part of the surrounding accessible name. With `aria-label`, it renders `role="status"` and uses the localized label as its accessible name.

## Visual and accessibility contract

The default tone is `neutral` and the default size is `md`. `sm` and `md` are confirmed design variants. Tone styling uses the existing semantic accent, surface, success, warning and danger tokens. Badge is never a button or link. Its content remains short and must wrap or be shortened by the consumer before composition when the product text requires a sentence.

## Design review blocker

Bodywork is the required source for the badge radius and the exact `sm`/`md` geometry. The referenced DesignSystem endpoint was unreachable on 2026-09-21, so no CSS values are implemented or inferred. The component cannot receive READY status until the Bodywork reference and those measurements are confirmed.

## Verification

Runtime, type and SSR tests cover native props/ref, tone and size values, decorative semantics and named status semantics. Storybook covers the canonical badge and an accessible status example. Bodywork geometry remains a visual review item for final release verification.
