# SegmentedControl — Component Implementation Readiness Gate

## Gate Metadata

- Component Specification: `segmented-control-specification.md`
- Gate Result: READY
- Evidence: CORE-010–012, SEGMENT-001–003 and Bodywork `sticky-seg`.

## Gate Checks

| # | Check | Result | Evidence |
| --- | --- | --- | --- |
| 01–09 | Specification, boundary, anatomy, semantics, API and DOM/ref | PASS | Root, label and button contracts are explicit. |
| 10–15 | Variants, state, ownership and Context | PASS | Required selection and roving-focus owner are defined. |
| 16–19 | Tokens, density, color and typography | PASS | Bodywork toggle token and generated foundation mapping exist. |
| 20–23 | Accessibility, keyboard, focus and motion | PASS | Radiogroup contract and all supported keys are fixed. |
| 24–30 | Content, layout, error/async, dependencies and overrides | PASS | Two-to-four usage scope and explicit omissions are documented. |
| 31–37 | Tests, visual verification, AI use, open points and implementation plan | PASS | Outside-child and disabled-key matrix is defined. |

## Final Assessment

SegmentedControl is READY for only the linked contract.

## Automatic selection extension — 2026-10-06

READY includes the confirmed automatic initial/replacement proposal contract in the
specification. Uncontrolled defaultValue is optional; controlled ownership remains.
Unit evidence covers missing/disabled/removal cases and StrictMode proposal de-duplication.
Native keyboard, focus, tokens, localization and reduced-motion contracts are unchanged.

## Global icon rule follow-up — 2026-10-06

READY remains the existing component contract with ICON-001–003 consistently
applied to owned action/information glyphs. Existing internal wrappers and native
owners determine Regular/Solid; API, token mapping, focus, events and geometry stay
unchanged. Bodywork/global source checked 2026-10-06; states and findings are in the
[icon rule review](../icon-rule-review-2026-10-06.md). No new design-review gap.
