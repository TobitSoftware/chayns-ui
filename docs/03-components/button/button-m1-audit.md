# Button and IconButton — Milestone 1 Audit

## Audit metadata

- Date: 2026-08-21
- Scope: `@chayns-ui/core` Button/IconButton and required `@chayns-ui/tokens` foundation
- Environment: full local `pnpm verify` on the exact pinned Node 24.19.0; implementation checks additionally ran on Node 22.15.0 with the expected engine warning
- Status: IMPLEMENTED; npm publication remains separately authorized

## Traceability

| Contract | Evidence | Result |
|---|---|---|
| Readiness precedes code | READY assessment commit precedes implementation commit | PASS |
| Native semantics and API | DOM/unit, type-negative and SSR tests | PASS |
| Variants and states | canonical stories and generated token CSS | PASS |
| Keyboard and focus | Chromium story interaction plus native disabled tests | PASS |
| Accessible names | DOM role/name tests, IconButton type union and story axe | PASS |
| Browser accessibility | 15 Chromium stories with axe configured as errors | PASS |
| Package contract | tarball allowlist, `publint` and Are The Types Wrong | PASS |
| Consumer contract | isolated packed Vite typecheck/build and SSR render | PASS |
| Tree-shaking | code-retaining packed root/subpath builds exclude IconButton | PASS |
| Reproducible tokens | two builds produce an identical SHA-256 digest | PASS |

The final Core tarball is 5,010 bytes compressed (16,335 bytes unpacked, 25 entries). The Tokens tarball is 3,115 bytes compressed (11,671 bytes unpacked, 6 entries). Neither contains tests, stories, dependencies or tooling.

## Accessibility evidence

| Check | Method | Result |
|---|---|---|
| Role/name/state | Chromium axe plus DOM assertions | PASS |
| Tab focus, Enter and Space | Chromium story interaction | PASS |
| Disabled activation/focus exclusion | native disabled DOM and user-event assertions | PASS |
| Focus indicator | `:focus-visible` computed-style assertion and visual Storybook review | PASS |
| Pointer target | Chromium bounding-box assertion against WCAG 2.2 AA 24 × 24 minimum | PASS |
| Long/localized and Unicode content | constrained-width canonical stories | PASS |
| Light/dark/density/accessibility modes | generated-token story matrix | PASS |
| Forced colors | explicit `@media (forced-colors: active)` implementation review | PASS |
| Reduced Motion | no transition or animation exists; state change is immediate | PASS |
| 200% zoom/reflow and text spacing | constrained composition and manual Storybook review | PASS |

No known WCAG 2.2 AA failure was found in the implemented scope. Automated evidence remains intentionally narrower than the full accessibility claim; the matrix records the complementary implementation and visual review.

## Release boundary

The local packages are ready for review. npm scope ownership, credentials, publication and push are external actions and were not attempted. OPEN-009 Theme Resolver and all unrelated OPEN decisions remain outside this milestone.
