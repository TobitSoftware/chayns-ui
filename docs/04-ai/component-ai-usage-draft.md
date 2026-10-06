# AI Component Usage Guide

## Status and source of truth

The earlier draft is superseded by the confirmed per-component selection metadata
(AI-006, AI-008). Read each component's Markdown Specification under
[components](../03-components/); its JSON-compatible YAML frontmatter supplies
`useWhen`, `doNotUseWhen`, `alternatives`, sources and Storybook evidence. The schema
and `pnpm docs:check` keep coverage and references verifiable. Storybook displays
that same source, avoiding a separate stale API guide.

The Decision Register and confirmed specifications take priority over Bodywork.
Use the [Bodywork reconciliation](../03-components/bodywork-selection-review.md)
to see why an explicitly confirmed library contract differs from its reference.

## Selection and composition

Start with Bodywork's reason for using the component, not only its appearance.
Use the smallest documented API. A compound part belongs only below its documented
parent; native props target the native element represented by that public surface.
Choose native links for navigation and buttons for actions. Core never resolves
business data, routes, textstring IDs or locales for an application.

Finite variants come from their exported union and runtime values. State, density,
accessible names and reduced-motion rules are part of the component contract.
Unknown APIs, variants, geometry or behaviour are not resolved by example code:
record the ambiguity and ask for clarification before implementing that step.

`PopupList` is the existing action Dropdown. It differs from `ComboBox`, which
selects data, and from `Popup`, whose generic surface has no implicit menu role.
`Tabs` is for paired peer panels; `SegmentedControl` selects equivalent representations
or settings; `RadioGroup` represents native form choices.

`implemented` metadata means code exists. It does not claim release readiness,
completed manual accessibility checks or permission to broaden its API.

A blocked or draft specification describes planning scope, not an importable public
component. Check both metadata status and package exports before generating usage.
