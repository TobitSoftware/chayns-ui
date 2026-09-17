# Tabs - Component Specification

## Metadata

- Component Name: Tabs
- Component Category: Layout
- Specification Status: BLOCKED
- Owner / Responsible Area: chayns UI Layout
- Design Reference: User-provided tab-bar reference, reviewed 2026-09-14
- Relevant Decision IDs: ARCH-001-006, CORE-001-007, LAYOUT-001-005, TOKEN-001-006, A11Y-001-007, ICON-001-003
- Foundation Dependencies: `--surface`, confirmed spacing/radius/typography/focus tokens, Font Awesome `fa-*` contract
- Related Components: future Icon component; no routing or business component
- Last Reviewed: 2026-09-14

> **Reassessment required:** LAYOUT-031 replaces the documented `tabs[]` contract with value-paired compound parts. This specification does not yet define the required compound parent/child, native-prop ownership, ref, event or add/remove contracts. It is therefore not implementation-ready.

## Purpose

Tabs provides a reusable layout pattern for switching between peer content
sections. It owns the tab-bar presentation and tab interaction semantics, but
does not own routing, persistence, business state, translation, or content
creation.

## Use When

Use Tabs when one content region has multiple peer views and exactly one view
is selected at a time.

## Do Not Use When

Do not use Tabs for navigation between routes, independent actions, accordions,
or workflows that require multiple panels to remain simultaneously visible.

## Anatomy

- Tab list: required; a semantic `tablist`.
- Tab: required per entry; icon and resolved name are supplied by the consumer.
- Active panel: required for the active entry; only its supplied `content` is
  rendered.

The reference indicates a transparent tab-bar background, with the active tab
using the `surface` token and inactive tab treatments remaining transparent.
Exact geometry, active indicator and state colors remain unconfirmed.

## Semantic and Keyboard Contract

The intended interaction is the ARIA Tabs pattern: `tablist`, `tab` and
`tabpanel`, selected state, controlled relationships and arrow-key navigation.
Native buttons remain the activation controls; clickable non-buttons are not
allowed.

The following implementation details are still blocking and MUST be confirmed:
- stable panel ID generation and whether an accessible panel label is required.

Arrow-key navigation uses automatic activation: moving to another tab invokes
its `onClick`, and the consumer is expected to update `isActive`.

The focus model uses roving `tabIndex`: only the active tab is in the normal
tab sequence, while arrow keys move focus between tabs.

Left/right navigation wraps from the last tab to the first and vice versa.
Home focuses the first tab and End focuses the last tab.

If no entry is active, the first entry is treated as selected. If multiple
entries are active, the first active entry is selected. The component still
invokes the selected entry's callback for keyboard activation; the consumer
must reconcile the supplied `isActive` values.

## Public API Contract

The confirmed direction is an array API:

```ts
interface TabsEntry {
  icon: `fa-${string}`;
  name: string;
  isActive: boolean;
  onClick: () => void;
  onRemove?: () => void;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabsEntry[];
  onAdd?: () => void;
  addLabel?: string;
}
```

`name` is already resolved localizable content. `isActive`, `onClick` and
optional `onRemove` are consumer-owned. The remove affordance is part of the
same native tab button; clicking its icon invokes `onRemove`, and Delete or
Backspace does the same while the tab is focused. `onAdd` renders an optional
add button when `addLabel` is supplied. The component must not infer active
state from URL, index or business data. The root forwards native `div` props
and its ref.

## Variants and Local Size

No component variants or local S/M/L size prop are confirmed. Global density is
an environment input.

## States

Relevant states are default, hover, focus-visible, pressed and selected.
Disabled, loading, invalid, error and success are not part of the confirmed
contract. Active content is rendered only for the selected entry.

The component uses the effective active entry for selected and focus state.
It does not maintain a temporary internal selection while the consumer updates
`isActive`.

## State Ownership

Selection is externally owned through each entry's `isActive` value and
`onClick` callback. Tabs does not maintain a second selection state and does
not persist selection. The exact behavior after activation before the consumer
updates `isActive` is an implementation blocker.

## Design Tokens and Styling

The active tab, including its optional remove control, MUST use the confirmed
`--surface` token as one shared surface with a continuous rounded top edge and
the same `--k12` radius used by the AppLayout content corner.
`--accent` as its text/icon color. Inactive tabs and their optional remove
controls use a 10% `--surface` overlay over the surrounding background. Their
text/icon color uses the resolved contrast token for that background, so the
theme chooses the readable light or dark color. The remove icon is smaller than
the tab icon. The tab-list and add button are transparent. No additional
active indicator is used.

## Accessibility, Responsive and Motion

The component must meet WCAG 2.2 AA, support keyboard operation, expose the
selected state to assistive technology, preserve visible focus, support zoom
and reflow, and keep localized names usable. Non-essential motion must respect
`prefers-reduced-motion`; no motion property is authorized yet.

At insufficient available width, tab labels are hidden and only the icons
remain visible. The tab names remain the accessible names. The responsive trigger uses a CSS container query. The icon-only presentation
retains each tab's accessible name. RTL follows native logical layout and
keyboard direction.

## Test and Acceptance Contract

Before implementation, tests must be defined for rendering, active-content
selection, callback invocation, ARIA relationships, keyboard navigation,
focus visibility, long localized names, zero/multiple active entries, zoom,
reflow, reduced motion and SSR-safe output. The current open DOM, token,
responsive and motion decisions prevent a READY assessment.

## Open Decisions

Panel IDs are generated from the component instance. The active tab owns the
panel's accessible name through `aria-labelledby`; no extra panel-label API is
required. No non-essential motion is used.
