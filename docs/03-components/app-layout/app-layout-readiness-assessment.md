# AppLayout - Component Implementation Readiness Gate

## Gate Metadata

- Component Name: AppLayout
- Component Category: Layout
- Component Specification: `app-layout-specification.md`
- Specification Status: BLOCKED
- Relevant Decision IDs: ARCH-001-006, CORE-001-007, LAYOUT-001-005, TOKEN-001-006, COLOR-001-006, A11Y-001-007, MOTION-001-007, ICON-001-003
- Foundation Dependencies: existing accent/state/focus/motion tokens, Font Awesome `fa-*` contract and native navigation semantics
- Related Components: Button/IconButton, future Icon component
- Review Context: User-provided reference and requirements reviewed 2026-09-14
- Gate Date: 2026-09-14
- Gate Result: BLOCKED

## Reassessment required

This assessment applies only to the replaced data API. LAYOUT-032 and
CORE-010–011 require a revised compound specification and a new full gate
assessment before implementation. The historical checks below do not authorize
the migration.

## Gate Checks

| # | Check | Result | Evidence / Reason |
|---|---|---|---|
| 01 | Specification Exists | PASS | Normative specification exists in this directory. |
| 02 | Specification Status | PASS | Specification is READY FOR IMPLEMENTATION after the recorded decisions. |
| 03 | Source Decisions | PASS | Icon, disclosure, collapse, responsive and accessibility contracts are confirmed. |
| 04 | Component Category and Architecture Boundary | PASS | App shell coordination is a Layout responsibility with no business or chayns API behavior. |
| 05 | Purpose and Selection Boundary | PASS | Application shell use and non-use cases are documented. |
| 06 | Anatomy and Composition | PASS | Parent action and separate disclosure control are explicit. |
| 07 | Semantic Contract | PASS | Header, nav, main and native buttons are confirmed. |
| 08 | Public API Contract | PASS | Labels, icon format and controlled-state contract are defined. |
| 09 | DOM Contract | PASS | Root/ref and native button DOM are defined by the implementation contract. |
| 10 | Variants | PASS | Only expanded and collapsed sidebar states are in scope; no invented visual variants. |
| 11 | Local Size Variants vs Density | PASS | No local S/M/L prop; header height is a fixed contract requirement. |
| 12 | State Model | PASS | Collapse, active, disclosure, focus and reduced-motion states are defined. |
| 13 | State Combinations and Priority | PASS | Active state is independent of disclosure and collapse state. |
| 14 | State Ownership | PASS | Collapse is intended controlled/uncontrolled; active item remains external; persistence is outside. |
| 15 | Context Dependencies | N/A | No semantic context dependency is required by the current draft. |
| 16 | Token Availability | PASS | Existing semantic color, spacing, icon, focus and motion tokens cover the contract. |
| 17 | Density | PASS | No local size prop; existing global density tokens are consumed. |
| 18 | Color and Theme | PASS | Accent/on-accent and state tokens are resolved by the theme layer. |
| 19 | Typography | PASS | Navigation inherits the existing body typography token. |
| 20 | Accessibility | PASS | Navigation label, native controls, collapsed labels and state semantics are defined. |
| 21 | Keyboard | PASS | Native buttons and disclosure controls provide keyboard operation. |
| 22 | Focus | PASS | Focus remains on the activated control; hidden descendants are removed from navigation. |
| 23 | Motion | PASS | Only permitted properties are used and reduced motion disables transitions. |
| 24 | Internationalization and Content | PASS | Required labels and names are consumer-provided; no RTL/mobile variant is claimed. |
| 25 | Responsive and Layout | PASS | Fixed desktop sidebar and content-sized expanded state are defined. |
| 26 | Container Interaction | PASS | Content placement is owned by AppLayout; content internals remain consumer-owned. |
| 27 | Loading and Async | N/A | AppLayout owns no async data or loading state. |
| 28 | Error / Invalid | PASS | Native image behavior and empty navigation behavior are defined. |
| 29 | Dependencies | PASS | No new runtime dependency is authorized; existing React/CSS delivery is sufficient in principle. |
| 30 | Escape Hatches and Overrides | PASS | Root native div props, ref, className and style are forwarded. |
| 31 | Test Contract | PASS | Render, interaction, keyboard, state and SSR cases are enumerated. |
| 32 | Visual Verification Contract | PASS | Expanded/collapsed, state and theme token cases are defined. |
| 33 | AI Usage Contract | PASS | No-guessing and selection boundaries are explicit. |
| 34 | Open Decisions | PASS | No implementation-relevant open decisions remain. |
| 35 | Repository Preconditions | PASS | New package follows the existing pnpm/Vite/TypeScript workspace model. |
| 36 | Required Reviews / Approvals | PASS | User confirmed the implementation decisions in this task. |
| 37 | Implementation Plan Is Decision-Free | PASS | Implementation maps directly to the confirmed contract. |

## Blocking Items

None.

## Final Assessment

- Total PASS: 33
- Total BLOCK: 0
- Total N/A: 2
- Historical Gate Result: READY (superseded)

This historical READY result no longer authorizes implementation.
