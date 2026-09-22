# AI Component Usage Guide (DRAFT — not confirmed)

> **Status: DRAFT / discussion proposal, not a confirmed policy document.**
> This is not the "AI Development Rules" or "Component Selection Rules" document referenced in
> AGENTS.md's Documentation Strategy, and it does not close `AI-005` (OPEN: machine-readable
> component specification format) in the UI Decision Register. AGENTS.md explicitly says those
> documents should not yet be fully authored outside a documented READY assessment. This draft
> covers every component that currently has its own Specification and a Gate Result: READY
> Readiness Assessment under `docs/03-components/` (Button, IconButton, Card, List/ListItem,
> Accordion/AccordionGroup, Avatar/AvatarGroup, AppLayout, Tabs). It exists so the format/content
> can be reviewed and confirmed — or rejected/reshaped — before it is promoted to a binding
> document or extended with a machine-readable format.
>
> Do not treat this file as authoritative for any component beyond what a CONFIRMED decision or a
> component's own Readiness Assessment already covers. Where this draft and the UI Decision
> Register disagree, the Register wins. Every "Use When" / "Do Not Use When" statement below is a
> restatement of that component's own Specification, not a new rule.

## Purpose

This draft answers the question: when another AI model (or a human) is asked to build a UI with
`chayns-ui`, how should it decide **whether**, **when**, and **in which combination** to use a
given component, and what must it avoid?

## How to read one of these entries

Each entry below is intentionally short and only states what is already CONFIRMED elsewhere
(Decision Register, Specification, Readiness Assessment). It does not add new rules.

## Native props and compound components

Place a native attribute, event, `data-*` attribute or compatible `aria-*` attribute on the public component or compound part that renders the corresponding native element. Do not use a generic props bag when the target is unclear.

Use a public compound child only below its documented parent. Do not import or render an internal part directly. A component specification defines the parent requirement, DOM/ref owner and accessibility contract; if it does not, the component is not ready to use or implement.

Do not create subcomponents merely to mirror visual anatomy. Use a leaf component, `children` or an explicitly documented slot when that is the confirmed contract.

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
on `Button` itself (use `IconButton` for icon-only). Pass `loading` only while the owning action is
running; the component keeps its label, exposes `aria-busy` and applies native `disabled`.

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

## Card

**Use when** related content needs to visually sit on a distinct, bordered surface (matching the
Design System `.card` treatment).

**Do not use when**:
* The container itself needs to be clickable/focusable — `Card` exposes no click or keyboard
  semantics. Compose a native interactive element (e.g. a `Button` or an `<a>`) inside it instead
  of adding `onClick` to the `Card` itself.
* You need a specific internal padding convention — `Card` has no intrinsic padding; spacing is
  owned by the composed content or a container, not by `Card`.

**Props**: `children` (content) and optional `elevated` (adds the resting elevation token). No
other visual variants exist.

## List / ListItem

**Use when** you need a vertical sequence of comparable rows (e.g. messages, entries, settings)
where each row has a primary label and, optionally, a secondary line.

**Do not use when**:
* The content is tabular/multi-column — `List` is not a table.
* You need grouped disclosure content — use `Accordion`/`AccordionGroup` instead.

**Row interaction**: use `href` for a row that navigates and `onClick` for a row that performs an
action; do not add both, and do not nest another interactive element (e.g. a `Button`) inside the
same interactive row target. Use the `trailing` slot for row-level metadata or secondary controls
displayed on the right — render trailing controls as siblings of the row action, not nested inside
it, to avoid invalid nested interactive content.

**Current API note**: `ListItem` currently exposes a boolean `unread`/`unreadLabel` contract
(LIST-003). Per `LIST-006` (CONFIRMED in the Decision Register), this boolean contract is intended
to be replaced by a more generic, composable "standard content" concept for the `trailing` slot —
but that replacement is **not yet implemented in code**. Do not invent the new prop names yourself;
use the current `unread`/`unreadLabel` props as shipped until the List specification is revised.

## Accordion / AccordionGroup

**Use when** you need one independent expandable section (`Accordion`) or a set of mutually
exclusive expandable sections, e.g. an FAQ (`AccordionGroup`).

**Do not use when**:
* The pattern is primary navigation or switching between peer views — that is `Tabs`, not
  `Accordion`.
* Content should always stay visible — do not use a permanently-`open` Accordion to fake a plain
  content section.

**Composition rule**: nesting one `Accordion` inside another `Accordion`'s content automatically
produces the "Wrapped" presentation via React context — there is no separate `WrappedAccordion`
component and no prop for it. Do not build one.

## Avatar / AvatarGroup

**Use when** you need to represent a person or identity compactly, including as the leading
content of a `ListItem`.

**Do not use when**:
* You need a generic status indicator or icon container — `Avatar` is identity-specific, not a
  generic circular icon slot.
* The image/initials data is itself the business logic — `Avatar` only renders `name`/`src`/`alt`
  it is given; it does not fetch or resolve identity data itself.

**Props**: `name` is required (drives both the accessible name and the initials fallback); `src`
is optional (falls back to initials when omitted or when the image fails to load); `size` is
`'default' | 'small'` only. `AvatarGroup` composes multiple `Avatar` children with overlap and an
optional `max` prop that caps visible tiles (showing an overflow tile beyond that).

## AppLayout and Tabs (from `@chayns-ui/layout`)

These ship from a separate package (`@chayns-ui/layout`) with their own peer dependency on
`@chayns-ui/core`.

**AppLayout** — use when an application needs a persistent top header, a left navigation area and
a content area filling the remaining viewport. Do not use it for routing, page-level business
state, a standalone toolbar, a generic two-column layout, or navigation with different responsive
behavior than this specific application-shell contract.

**Tabs** — use when one content region has multiple peer views and exactly one is selected at a
time. Do not use it for navigation between routes, independent actions, accordion-like disclosure,
or workflows where multiple panels must stay visible simultaneously at once.

Their full Specifications and Readiness Assessments (`docs/03-components/app-layout/` and
`docs/03-components/tabs/`) remain the source of truth for props, motion and accessibility detail
beyond this summary.

## What this draft deliberately does not cover yet

* A machine-readable/structured format (JSON/YAML front-matter, a schema another model could parse
  programmatically instead of prose) — this is exactly what `AI-005` leaves OPEN. This draft is
  intentionally prose-only until that format decision is made.
* Combination rules across multiple components (e.g. "use X inside Y, never Z") beyond what is
  already stated per-component above — to be added only as concrete combinations get confirmed.
* Any component without its own confirmed Specification and Gate Result: READY Readiness
  Assessment — extend this draft only alongside that component's own gate.

## Next steps for this draft

1. Confirm whether this scope/format (short prose Use-When / Do-Not-Use-When / Required Props /
   Anti-patterns per component) is the right shape, or whether a different structure is preferred
   before extending it to more components.
2. If confirmed, decide where it should live long-term (its own document under `docs/04-ai/`, or
   merged into each component's own specification file) and whether it should close `AI-005` or
   remain a separate, ongoing document.
3. Only after that: extend coverage to further components as they reach their own Implementation
   Readiness Gate.

## Composition and design review rules

AI-assisted implementation MUST start with the documented Canonical API. Advanced Composition is considered only after the standard case is clear. An agent MUST NOT invent visual Anatomy, a Compound Part, a token, or a design-system value. If Bodywork evidence, accessibility behavior, API ownership, or a relevant state is missing or ambiguous, the affected implementation step remains blocked and the gap is documented for human clarification.

Stories use `args` for simple leaf components. They use `render` only for actual children, slot, compound, form, or layout composition. Interaction checks use `play` and query Story DOM through `within(canvasElement)`; portal content is queried through `document.body`.
