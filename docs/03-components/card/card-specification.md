# Card — Component Specification

## Metadata — Required

- Component Name: Card
- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Core
- Design Reference: chayns Design System `.card` surface (canonical `tobit-ds.css`, `.card { background: var(--surface); border: 1px solid var(--border); border-radius: 16px; }`), inspected 2026-08-21
- Relevant Decision IDs: CORE-001–007, CARD-001–003, A11Y-001–007, DENSITY-001–005, DIST-012–013
- Foundation Dependencies: token catalogue transfer (`--surface`, `--border`, `--shadow-card`), density matrix, generated `@chayns-ui/tokens` subset
- Related Components: List, Accordion (both compose on top of the card surface)
- Last Reviewed: 2026-08-21

## Purpose — Required

Card is a purely presentational surface primitive. It renders a padded, bordered, rounded container using the Design System surface tokens so that grouped content sits on a consistent background. It owns presentation only — no interaction, no business logic, no application state.

## Use When — Required

Use Card to visually group related content on a distinct surface, matching the Design System `.card` treatment. Compose any content inside it via `children`.

## Do Not Use When — Required

Do not use Card as a button, link or otherwise interactive element; it exposes no click or keyboard semantics. Interactive card patterns are composed by the consumer using a native interactive child. Card owns the Design System inner padding; the container owns external placement and spacing between cards.

## Related Components and Selection Boundaries — Conditional

List and Accordion reuse the same surface/border/radius language but add their own structure and interaction. Card is the plain surface with no rows, dividers or disclosure behavior.

## Anatomy — Conditional

- Root: one native `<div>` with class `chayns-card`.
- Optional `Card.Header`: a semantic native `<header>` with an optional leading icon and consumer content.
- Content: arbitrary consumer `children`.

No footer or media subcomponents exist in Milestone 1.

## Semantic Contract — Conditional

Root is a non-semantic `<div>`. Card adds no ARIA role; consumers may pass `role`/`aria-*` for their specific composition. Card never sets an accessible name of its own.

## Variants — Required

Card has no public color, emphasis or elevation prop. On hover-capable devices the surface receives the Design System hover shadow automatically.

## Local Size Variants — Conditional

None. Card has no S/M/L prop. Radius and border are density-independent, matching the Design System.

## States — Conditional

Card has no focus, active or disabled state. Hover elevation is a visual state on hover-capable devices.

## State Priority and Combination Matrix — Conditional

Not applicable; Card has no states.

## Public API Contract — Required

```ts
interface CardProps extends React.ComponentPropsWithRef<'div'> {
  children?: React.ReactNode;
}

interface CardHeaderProps extends React.ComponentPropsWithRef<'header'> {
  icon?: ButtonIcon;
  children?: React.ReactNode;
}
```

All native `div` props, `data-*`, `aria-*`, handlers, `className` and `ref` are forwarded to the root. `Card.Header` forwards compatible native header props and its ref. No `as`, `asChild`, `padding`, `elevated`, `variant` or interactive escape prop exists.

## Native Props and DOM Contract — Conditional

The root is a native `<div>` and owns compatible `div` props and its ref. `Card.Header` is a native `<header>` and owns compatible header props and its ref.

## Composition — Required

Card composes arbitrary `children` and owns the surface and inner padding. `Card.Header` owns the optional semantic header and leading icon area.

## Context Dependencies — Required

No React Context. Resolved CSS custom properties arrive through normal CSS inheritance.

## State Ownership — Required

No React state. Card is stateless.

## Design Tokens — Conditional

`--surface` (background), `--border` (1px border color), `--shadow-card` (hover), `--k16` (inner padding) and `--k32` (header icon area). Radius `16px` is confirmed Design System component evidence.

## Density Contract — Conditional

Card geometry (border width, radius) is density-independent, matching the Design System `.card`. Any density-sensitive spacing belongs to the composed content, not to Card.

## Color and Theme Contract — Conditional

Card consumes only resolved variables. `--surface` and `--border` resolve per theme (light, dark, high contrast, color deficiency). Card introduces no theme logic and no hard-coded colors.

## Typography Contract — Conditional

Not applicable; Card sets no typography. Content inherits typography from its context.

## Accessibility Contract — Required

Card is a non-interactive surface with no intrinsic accessible name, role or focus behavior. It introduces no contrast, keyboard or focus obligations of its own. Accessibility of the composed content is the consumer's responsibility. Card does not trap focus and does not alter tab order.

## Keyboard Contract — Conditional

Not applicable; Card is not interactive.

## Focus Contract — Conditional

Not applicable; Card is not focusable and manages no focus.

## Motion Contract — Required

No motion. Card has no transitions or animations.

## Internationalization and Content Contract — Conditional

Card renders consumer-provided content verbatim and makes no locale, direction or text assumptions. It applies no text truncation or fixed text container.

## Responsive and Layout Behavior — Conditional

Card is a block-level surface that fills its container's inline size by default. Placement, width constraints and external spacing are owned by the container.

## Container Interaction — Conditional

The container owns Card placement and external spacing. Card owns only its own surface, border and radius.

## Loading and Async Contract — Required

Not supported. Card renders whatever content it is given.

## Error Contract — Conditional

Not applicable; Card owns no validation or error presentation.

## Performance Characteristics — Conditional

Card is a single element with no runtime logic; it adds negligible cost and tree-shakes independently.

## Dependencies — Required

React peer only; token/Core CSS for `chayns-card`. No runtime dependencies, no icon runtime.

## Non-Goals — Required

No interactivity, no external margin API, no footer/media subcomponents, no color variants and no public elevation prop.

## Escape Hatches and Overrides — Required

Consumers may extend via native props and `className`. They must not repurpose Card as an interactive control by attaching click handlers without providing correct native interactive semantics in the composed content.

## Examples — Recommended

- Flat surface grouping text content.
- Hover surface with the automatic raised treatment.

## Do / Don't — Recommended

- Do compose content inside the Card-owned inner padding.
- Don't rely on Card for click/keyboard behavior.

## Test Contract — Required

- Renders a `div.chayns-card` with forwarded `children`.
- Renders `Card.Header` with native header props, ref and optional icon.
- Forwards native props and merges `className`.
- Server-renders without error.

## Visual Verification Contract — Conditional

Flat and hover surfaces across light and dark reference modes, including the optional header icon area.

## AI Usage Contract — Required

### Use when
Grouping related content on a Design System surface.

### Do not use when
An interactive control is needed — use Button/List/Accordion or a native interactive child.

### Required context
None beyond resolved theme tokens.

### Forbidden assumptions
No external padding prop, no interactivity, no additional variants.

### Related decisions
CARD-001–003.

## Open Decisions — Required

None blocking. Footer and media slots remain out of scope for Milestone 1.

## Readiness Assessment — Required

See `card-readiness-assessment.md`. Gate result: READY.

## Specification Change Rules — Required

Any new variant, slot, padding convention or interactive behavior requires a new decision and a specification update before implementation.
