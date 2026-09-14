# AI Component Usage Guide (DRAFT — not confirmed)

> **Status: DRAFT / discussion proposal, not a confirmed policy document.**
> This is not the "AI Development Rules" or "Component Selection Rules" document referenced in
> AGENTS.md's Documentation Strategy, and it does not close `AI-005` (OPEN: machine-readable
> component specification format) in the UI Decision Register. AGENTS.md explicitly says those
> documents should not yet be fully authored outside a documented READY assessment. This draft is
> scoped only to the two components that currently have a Gate Result: READY assessment (Button,
> IconButton) plus the Layout-package components merged from `feature/app-layout`, and it exists so
> the format/content can be reviewed and confirmed — or rejected/reshaped — before it is extended to
> further components or promoted to a binding document.
>
> Do not treat this file as authoritative for any component beyond what a CONFIRMED decision or a
> component's own Readiness Assessment already covers. Where this draft and the UI Decision
> Register disagree, the Register wins.

## Purpose

This draft answers the question: when another AI model (or a human) is asked to build a UI with
`chayns-ui`, how should it decide **whether**, **when**, and **in which combination** to use a
given component, and what must it avoid?

## How to read one of these entries

Each entry below is intentionally short and only states what is already CONFIRMED elsewhere
(Decision Register, Specification, Readiness Assessment). It does not add new rules.

---

## Button

**Use when** a single native, clickable action needs a visible text label (e.g. "Save", "Delete",
"Continue").

**Do not use when**:
* The action is navigation to another URL/route — use an `<a>`-based component instead once one
  exists (native web semantics, ARCH/CORE principles). Do not repurpose `Button` for navigation.
* No visible label is desired — use `IconButton` instead, not `Button` with an icon-only child.
* More than one *primary* (`variant="primary"`) action would exist in the same action scope
  (Page/Card/Dialog/Drawer/Form/Wizard-Step/closed Accordion content, see AGENTS.md "Primary
  actions"). Pick at most one `primary` per scope; use `outline`/`ghost` for the rest.
* The action is destructive (delete, remove, revoke) — use `variant="danger"`, not `primary` or a
  custom color.

**Required props**: `variant` (`primary` | `outline` | `ghost` | `danger`) and visible `children`.
Both are mandatory; there is no default variant (BUTTON-006) and no icon-only/empty-label mode for
`Button` (`children` must be visible content, BUTTON-009).

**Composition**: `icon` is optional and always leading; there is no trailing-icon or icon-only mode
on `Button` itself (use `IconButton` for icon-only). Do not pass a spinner/loading prop — Loading
state is explicitly not part of the Milestone 1 API (see Button Specification, "Not part of
Milestone 1").

**Anti-patterns to avoid**:
* Wrapping `Button` in a custom `<div onClick>`/`<span onClick>` instead of relying on the native
  `<button>` it already renders.
* Re-implementing hover/active styling, disabled handling, or focus rings — these are owned by the
  component and its CSS export (`@chayns-ui/core/button.css`), not by consumer overrides.
* Inventing a new `variant` value beyond the four confirmed ones (BUTTON-006).

## IconButton

**Use when** a single native, clickable action needs to render as icon-only (e.g. in a toolbar,
table row, or compact control cluster) **and** an accessible name can be supplied programmatically.

**Do not use when**:
* A visible text label is acceptable/desired — prefer `Button` (with or without a leading `icon`)
  for better discoverability; do not default to `IconButton` purely to save space unless the
  surrounding UI pattern (e.g. dense toolbar) already establishes icon-only controls as the norm.
* No accessible name can be provided — `IconButton` requires exactly one of `aria-label` or
  `aria-labelledby` (mutually exclusive, both enforced at the type level).

**Required props**: `variant`, `icon`, and exactly one of `aria-label` / `aria-labelledby`.

**Anti-patterns to avoid**:
* Supplying both `aria-label` and `aria-labelledby` at once, or neither.
* Passing `children` — `IconButton` does not accept visible children; it is icon-only by contract.
* Using a decorative-only icon glyph as the sole content without any accessible name mechanism.

## Icon contract shared by Button and IconButton

Icons are a single FontAwesome Classic name in the `fa-*` form (e.g. `fa-plus`). The component
renders both a Regular and a Solid weight internally and cross-fades between them on hover/active
— **do not** pass separate "regular" and "solid" icon props, and do not pre-resolve the weight
yourself; passing one `icon` name is the entire contract (BUTTON-012/BUTTON-013/LAYOUT-012).

## AppLayout and Tabs (from `@chayns-ui/layout`, merged `feature/app-layout`)

These ship from a separate package (`@chayns-ui/layout`) with their own peer dependency on
`@chayns-ui/core`. Their Specifications and Readiness Assessments (see
`docs/03-components/app-layout/` and `docs/03-components/tabs/`) are the source of truth for their
props and behavior; this draft does not restate them and should be extended alongside a follow-up
review of those documents rather than guessed from this file alone.

## What this draft deliberately does not cover yet

* Avatar/AvatarGroup, Card, List/ListItem, Accordion/AccordionGroup: these exist in the codebase
  but are outside this draft's initial scope; do not infer AI usage guidance for them from this
  file. Extend this draft (or the eventual confirmed document) alongside their own specs.
* A machine-readable/structured format (JSON/YAML front-matter, a schema another model could parse
  programmatically instead of prose) — this is exactly what `AI-005` leaves OPEN. This draft is
  intentionally prose-only until that format decision is made.
* Combination rules across multiple components (e.g. "use X inside Y, never Z") beyond what is
  already stated per-component above — to be added only as concrete combinations get confirmed.

## Next steps for this draft

1. Confirm whether this scope/format (short prose Use-When / Do-Not-Use-When / Required Props /
   Anti-patterns per component) is the right shape, or whether a different structure is preferred
   before extending it to more components.
2. If confirmed, decide where it should live long-term (its own document under `docs/04-ai/`, or
   merged into each component's own specification file) and whether it should close `AI-005` or
   remain a separate, ongoing document.
3. Only after that: extend coverage to further components as they reach their own Implementation
   Readiness Gate.
