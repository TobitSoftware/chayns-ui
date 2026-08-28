# List and ListItem — Component Specification

## Metadata — Required

- Component Name: List and ListItem
- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Core
- Design Reference: chayns Design System list rows (`.row-anim` row treatment, surface/border/hover language from `tobit-ds.css`), inspected 2026-08-21
- Relevant Decision IDs: CORE-001–007, LIST-001–004, A11Y-001–007, DENSITY-001–005, DIST-012–013
- Foundation Dependencies: token catalogue transfer (`--text`, `--text-3`, `--accent`, `--hover`, `--disabled-fg`, `--fs-body`, `--fs-meta`, `--k8`, `--k12`, `--k16`, focus-ring tokens), density matrix, generated `@chayns-ui/tokens` subset
- Related Components: Card (surface), Accordion (disclosure)
- Last Reviewed: 2026-08-21

## Purpose — Required

List renders a vertical collection of rows. ListItem renders a single row with a primary label, an optional secondary line, optional leading and trailing slots, and an optional unread indicator. Each row can be static, a navigation link, or an action button. The components own presentation and generic accessibility only — no data fetching, selection or business logic.

## Use When — Required

Use List + ListItem to present a vertical sequence of comparable rows (messages, entries, settings). Use `href` for a row that navigates and `onClick` for a row that performs an action. Use the `trailing` slot for row-level secondary controls or metadata.

## Do Not Use When — Required

Do not use List for tabular multi-column data or for grouped disclosure content (use Accordion). Do not place the whole row's primary action and additional interactive controls in the same interactive element — trailing controls are rendered as siblings of the row action to avoid invalid nested interactive content.

## Related Components and Selection Boundaries — Conditional

Card is a plain surface; List adds row structure. Accordion adds disclosure. A row's primary action is a single native `<a>` or `<button>`; secondary row controls live in `trailing`, outside that action element.

## Anatomy — Conditional

- List root: one native `<ul class="chayns-list">`.
- ListItem root: one native `<li class="chayns-list-item">`.
- Row action: `chayns-list-item__action`, rendered as `<a>` (when `href`), `<button>` (when `onClick`), or a non-interactive `<div>` otherwise. Interactive actions add `chayns-list-item__action--interactive`.
- Optional unread indicator: `chayns-list-item__unread` (accent dot) with an optional visually-hidden localized label.
- Optional leading slot: `chayns-list-item__leading`.
- Body: `chayns-list-item__body` containing `chayns-list-item__title` and optional `chayns-list-item__subtitle`.
- Optional trailing slot: `chayns-list-item__trailing`, a sibling of the row action inside the `<li>`.

## Semantic Contract — Conditional

List is a native `<ul>`; each ListItem is a native `<li>`. A row that navigates is a native `<a>`; a row that acts is a native `<button type="button">`; a static row is a non-interactive `<div>`. Trailing interactive controls are never nested inside the row action element. The unread indicator exposes a localized accessible name via a visually-hidden span when `unreadLabel` is provided and is otherwise `aria-hidden`.

## Variants — Required

ListItem has three mutually exclusive row modes derived from props, not a `variant` prop: static (default), link (`href`), action (`onClick`). No color/emphasis variants exist.

## Local Size Variants — Conditional

None. No S/M/L prop. Global density controls row spacing and text size through resolved tokens.

## States — Conditional

- default: row presentation.
- hover (interactive rows only, pointer devices): `--hover` background.
- focus-visible (interactive rows only): softened-accent `box-shadow` ring using `--focus-ring-size` and `rgba(var(--focus-ring-rgb), var(--focus-ring-alpha-strong))`, matching the Button focus contract.
- disabled (action rows only): native `disabled`, muted foreground (`--disabled-fg`), no hover/activation.

Static and link rows have no disabled state (native `<a>` has no disabled).

## State Priority and Combination Matrix — Conditional

`disabled` (action rows) suppresses hover and activation. `focus-visible` may coexist with hover on interactive rows. Static rows expose no interactive states.

## Public API Contract — Required

```ts
interface ListProps extends React.ComponentPropsWithRef<'ul'> {
  children?: React.ReactNode;
}

interface ListItemProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  unread?: boolean;
  unreadLabel?: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  className?: string;
  id?: string;
}
```

List forwards all native `ul` props, `className` and `ref`. ListItem exposes an explicit, curated prop surface. `href` and `onClick` are the mutually exclusive interactivity switches; `href` takes precedence when both are set. `disabled` applies only to the action-button row.

## Native Props and DOM Contract — Conditional

List emits one `<ul>`. ListItem emits one `<li>` containing exactly one row action element and, when provided, one trailing element as its sibling. The row action is `<a>`, `<button>` or `<div>` per the rules above.

## Composition — Required

List composes ListItem children (or arbitrary `<li>` content). ListItem composes `leading`, `title`, `subtitle` and `trailing` content provided by the consumer. Trailing controls are the consumer's responsibility to make accessible; the component only positions them outside the row action.

## Context Dependencies — Required

No React Context. Resolved CSS custom properties arrive through normal CSS inheritance.

## State Ownership — Required

No React state. Hover, focus and disabled are native/CSS states. The consumer owns navigation targets, action handlers and unread status.

## Design Tokens — Conditional

`--text` (title), `--text-3` (subtitle), `--accent` (unread dot), `--hover` (hover background), `--disabled-fg` (disabled foreground), `--fs-body`, `--fs-meta`, spacing `--k8`/`--k10`/`--k12`/`--k16`, radius `10px` on the row action, focus tokens `--focus-ring-size`/`--focus-ring-rgb`/`--focus-ring-alpha-strong`.

## Density Contract — Conditional

Row padding, gaps and text sizes resolve through global `--sf` at S/M/L via the referenced tokens. Radius, colors and focus are density-independent.

## Color and Theme Contract — Conditional

Only resolved variables are consumed. `--text`, `--text-3`, `--accent`, `--hover`, `--disabled-fg` resolve per theme (light, dark, high contrast, color deficiency). No hard-coded colors.

## Typography Contract — Conditional

Title uses `--fs-body` and `--text`; subtitle uses `--fs-meta` and `--text-3`. Title and subtitle are single-line and truncate with ellipsis; they do not shrink font size to fit.

## Accessibility Contract — Required

List/ListItem use native list semantics. Interactive rows are native links/buttons with a visible label as their accessible name. Trailing controls stay outside the row action to keep interactive content valid. The unread dot is not conveyed by color alone: when meaningful, `unreadLabel` supplies a localized visually-hidden accessible name. Interactive rows show a visible focus ring and are fully keyboard operable via native semantics; disabled action rows are removed from activation. No positive tabindex, no focus trap.

## Keyboard Contract — Conditional

Native: Tab/Shift+Tab move between interactive rows and trailing controls; Enter activates links and buttons; Space activates buttons. Static rows are not focusable. Disabled action rows are skipped.

## Focus Contract — Conditional

Interactive rows use `:focus-visible` with the softened-accent `box-shadow` ring. No programmatic focus management.

## Motion Contract — Required

Only a short background transition on interactive rows (`background`, ≤0.16s). It is disabled under `prefers-reduced-motion`. No layout-affecting motion.

## Internationalization and Content Contract — Conditional

Title, subtitle and `unreadLabel` are consumer-resolved localizable content. The component makes no locale/direction assumptions and composes no sentences from fragments. Truncation is visual only; the full text remains in the DOM.

## Responsive and Layout Behavior — Conditional

List fills its container's inline size. Rows are single-line with truncating text; the body flexes and shrinks (`min-inline-size: 0`) while leading/trailing keep their intrinsic size.

## Container Interaction — Conditional

The container owns List placement and external spacing. Within a row, the row action owns its internal padding and the trailing slot owns its own end padding.

## Loading and Async Contract — Required

Not supported. Consumers render whatever rows they have.

## Error Contract — Conditional

Not applicable; List owns no validation or error presentation.

## Performance Characteristics — Conditional

List and ListItem are lightweight and tree-shake independently from other components.

## Dependencies — Required

React peer only; token/Core CSS for `chayns-list`. No runtime dependencies, no icon runtime.

## Non-Goals — Required

No virtualization, selection model, multi-column layout, drag-and-drop, swipe actions, dividers configuration or color variants in Milestone 1.

## Escape Hatches and Overrides — Required

Consumers may extend List via native `ul` props/`className` and provide custom `leading`/`trailing` content. They must not nest interactive controls inside the row action.

## Examples — Recommended

- Message rows with title, subtitle and unread indicator.
- Interactive rows: an action row (`onClick`) and a navigation row (`href`).

## Do / Don't — Recommended

- Do put row-level secondary actions in `trailing`.
- Don't wrap the whole row action and a trailing button in one interactive element.

## Test Contract — Required

- List renders `ul.chayns-list` with its items and forwards native props/className.
- Static row renders no button/link; renders title/subtitle.
- Action row renders a `<button>` and forwards clicks; disabled action row does not activate.
- Link row renders an `<a href>`.
- Unread indicator exposes a localized visually-hidden label.
- Trailing controls are siblings of, not inside, the row action.
- Server-renders without error.

## Visual Verification Contract — Conditional

Static, action and link rows in default/hover/focus/disabled across light and dark reference modes.

## AI Usage Contract — Required

### Use when
Presenting a vertical sequence of comparable rows.

### Do not use when
Tabular multi-column data or disclosure content is needed.

### Required context
Localized `title`/`subtitle`/`unreadLabel`; navigation target or action handler.

### Forbidden assumptions
No selection model, no nested interactive row action, no color variants.

### Related decisions
LIST-001–004.

## Open Decisions — Required

None blocking. Selection, virtualization and swipe actions are explicitly out of Milestone 1 scope.

## Readiness Assessment — Required

See `list-readiness-assessment.md`. Gate result: READY.

## Specification Change Rules — Required

Any new row mode, selection model, layout mode or interactive nesting requires a new decision and a specification update before implementation.
