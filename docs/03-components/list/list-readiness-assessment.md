# List and ListItem — Component Implementation Readiness Gate

## Gate Metadata

- Component Name: List and ListItem
- Component Category: Core
- Component Specification: `list-specification.md`
- Specification Status: READY FOR IMPLEMENTATION
- Relevant Decision IDs: CORE-001–007, LIST-001–004, A11Y-001–007, DENSITY-001–005, DIST-012–013
- Foundation Dependencies: token transfer for `--text`, `--text-3`, `--accent`, `--hover`, `--disabled-fg`, `--fs-body`, `--fs-meta`, `--k8`–`--k16`, focus-ring tokens
- Related Components: Card, Accordion
- Review Context: Design System row language transferred from `tobit-ds.css`; user authorized Milestone-1 implementation of Card/List/Accordion
- Gate Date: 2026-08-21
- Gate Result: READY

## Gate Checks

| # | Check | Result | Evidence / Reason |
|---|---|---|---|
| 01 | Specification Exists | PASS | Normative List/ListItem specification exists in this directory. |
| 02 | Specification Status | PASS | READY FOR IMPLEMENTATION with zero blockers. |
| 03 | Source Decisions | PASS | Design System row treatment and repository decisions cited. |
| 04 | Component Category and Boundary | PASS | Generic visible rows are Core; no business/chayns API behavior. |
| 05 | Purpose and Selection Boundary | PASS | List vs Card vs Accordion boundaries are explicit. |
| 06 | Anatomy and Composition | PASS | `ul` > `li` > row action (+ trailing sibling); slots defined. |
| 07 | Semantic Contract | PASS | Native list; `<a>`/`<button>`/`<div>` row modes; trailing never nested. |
| 08 | Public API Contract | PASS | `ListProps`/`ListItemProps`, mutually exclusive `href`/`onClick`, defaults. |
| 09 | DOM Contract | PASS | One `ul`; one `li` with a single row action and optional trailing sibling. |
| 10 | Variants | PASS | Three prop-derived row modes; no invented color variants. |
| 11 | Local Size Variants vs Density | PASS | No local S/M/L; spacing/text resolve via density tokens. |
| 12 | State Model | PASS | default/hover/focus-visible/disabled scoped to interactive rows. |
| 13 | State Combinations | PASS | disabled suppresses hover/activation; focus may coexist with hover. |
| 14 | State Ownership | PASS | No React state; native/CSS states only. |
| 15 | Context Dependencies | PASS | No Context; CSS inheritance only. |
| 16 | Token Availability | PASS | All consumed variables exist in generated baseline CSS. |
| 17 | Density | PASS | Row padding/gap/text sizes resolve through `--sf` tokens. |
| 18 | Color and Theme | PASS | Only resolved variables; light/dark/high-contrast/color-deficiency covered. |
| 19 | Typography | PASS | Title `--fs-body`/`--text`; subtitle `--fs-meta`/`--text-3`; single-line truncation. |
| 20 | Accessibility | PASS | Native list/link/button; unread not color-only; visible focus; valid nested-interactive avoidance. |
| 21 | Keyboard | PASS | Native Tab/Enter/Space; static rows not focusable; disabled skipped. |
| 22 | Focus | PASS | `:focus-visible` softened-accent `box-shadow` ring; no programmatic focus. |
| 23 | Motion | PASS | Short background transition only; disabled under reduced motion. |
| 24 | Internationalization and Content | PASS | Consumer-resolved localizable title/subtitle/unreadLabel; no fragments; truncation visual only. |
| 25 | Responsive and Layout | PASS | Fills inline size; body shrinks, leading/trailing keep size. |
| 26 | Container Interaction | PASS | Container owns placement and external spacing. |
| 27 | Loading and Async | N/A | Not supported by a static list. |
| 28 | Error / Invalid | N/A | List owns no validation/error state. |
| 29 | Dependencies | PASS | React peer only; explicit token/Core CSS; no runtime deps. |
| 30 | Escape Hatches and Overrides | PASS | Native props/className and slots allowed; no interactive nesting. |
| 31 | Test Contract | PASS | Render, row modes, disabled, unread label, trailing-sibling and SSR cases implemented. |
| 32 | Visual Verification Contract | PASS | Row modes across states and light/dark defined. |
| 33 | AI Usage Contract | PASS | Selection, context and forbidden assumptions are explicit. |
| 34 | Open Decisions | PASS | No blocking OPENs; selection/virtualization out of scope. |
| 35 | Repository Preconditions | PASS | Workspace, tokens, Core build, tests and Storybook are green. |
| 36 | Required Reviews / Approvals | PASS | User authorized Milestone-1 List implementation. |
| 37 | Implementation Plan Is Decision-Free | PASS | Tasks map directly to the complete specification. |

## Blocking Items

No blocking items.

## N/A Justifications

- Checks 27, 28: List is a static presentational collection with no async or validation/error behavior.

## Final Assessment

- Total PASS: 35
- Total N/A: 2
- Total BLOCK: 0
- Gate Result: READY

This READY result authorizes implementation only for the List and ListItem contracts in the referenced specification.
