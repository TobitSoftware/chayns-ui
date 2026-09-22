# Banner — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `#status` → “Banner”, checked 2026-09-22
- Relevant Decisions: MESSAGE-004, DESIGN-011

## Purpose and boundary

Banner communicates a message that applies to a complete area and remains
visible until the consumer closes it or the underlying condition changes. It
It is the shared status surface for a page, panel or form section.

## Public API and native ownership

`Banner` renders a native `aside`, forwards compatible aside props and its ref,
and accepts `children`, `tone`, optional `icon`, and an optional close action.
When `onClose` is supplied, `closeLabel` is required and a native close button
is rendered. `open` and `defaultOpen` support controlled and uncontrolled
visibility; `onOpenChange` reports the next visibility state.

The component owns no translation. Consumers provide localized content and the
localized close label. The default state is visible and the default tone is
`neutral`.

## Composition and accessibility

Banner has no public visual subcomponents. The icon is decorative and must not
be the only source of meaning. The close button is the only interactive child
and owns its native button semantics and focus. A consumer may provide an
accessible name through native `aria-label` or `aria-labelledby` props on the
aside.

## Bodywork evidence

Bodywork uses a full-width area with a 1px status border, 12px radius, `--k13`
vertical and `--k16` horizontal padding, a status icon, flexible content and
a close affordance. Tone colors use the existing semantic status tokens.

## Verification

Tests cover tone geometry, native props/ref, controlled and uncontrolled close
behavior, localized close naming, server rendering and the absence of a close
control when no close handler is supplied. Storybook covers success and
warning examples and reduced-motion behavior.
