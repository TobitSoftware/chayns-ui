# SplitButton — Component Implementation Readiness Gate

- Component Specification: `split-button-specification.md`
- Gate Result: READY
- Evidence: Button contract, Popup compound contract and existing Bodywork join geometry.

The native owners, PopupList delegation, keyboard/focus model, disabled behaviour, visual token mapping and verification matrix are explicit. SplitButton is READY for only this contract.

## Global icon rule follow-up — 2026-10-06

READY remains the existing component contract with ICON-001–003 consistently
applied to owned action/information glyphs. Existing internal wrappers and native
owners determine Regular/Solid; API, token mapping, focus, events and geometry stay
unchanged. Bodywork/global source checked 2026-10-06; states and findings are in the
[icon rule review](../icon-rule-review-2026-10-06.md). No new design-review gap.

## Bodywork motion correction — 2026-10-06

READY includes reuse of BUTTON-017 on both native halves, as confirmed by the
live Bodywork Split-Button example's shared Button classes. The specification
records source/date, timing, token mapping, hover/press precedence, Reduced Motion
and existing Primary/AllVariants/Disabled Storybook evidence. Joined geometry,
public API and PopupList ownership remain intact; no open design review applies.
