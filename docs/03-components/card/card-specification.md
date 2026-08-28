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

Card is a purely presentational surface primitive. It renders a bordered, rounded container using the Design System surface tokens so that grouped content sits on a consistent background. It owns presentation only — no interaction, no business logic, no application state.

## Use When — Required

Use Card to visually group related content on a distinct surface, matching the Design System `.card` treatment. Compose any content inside it via `children`.

## Do Not Use When — Required

Do not use Card as a button, link or otherwise interactive element; it exposes no click or keyboard semantics. Interactive card patterns are composed by the consumer using a native interactive child. Do not use Card to introduce padding conventions — the Design System `.card` has no intrinsic padding; internal spacing is owned by the composed content or a container.

## Related Components and Selection Boundaries — Conditional

List and Accordion reuse the same surface/border/radius language but add their own structure and interaction. Card is the plain surface with no rows, dividers or disclosure behavior.

## Anatomy — Conditional

- Root: one native `<div>` with class `chayns-card` and, when elevated, `chayns-card--elevated`.
- Content: arbitrary consumer `children`.

No wrapper, header, footer or media subcomponents exist in Milestone 1.

## Semantic Contract — Conditional

Root is a non-semantic `<div>`. Card adds no ARIA role; consumers may pass `role`/`aria-*` for their specific composition. Card never sets an accessible name of its own.

## Variants — Required

Card has no color/emphasis variants. The single optional visual modifier is `elevated`, which adds the Design System card shadow (`--shadow-card`) to lift the surface. Default is a flat bordered surface.

## Local Size Variants — Conditional

None. Card has no S/M/L prop. Radius and border are density-independent, matching the Design System.

## States — Conditional

None. Card is static and has no hover, focus, active or disabled state of its own.

## State Priority and Combination Matrix — Conditional

Not applicable; Card has no states.

## Public API Contract — Required

```ts
interface CardProps extends React.ComponentPropsWithRef<'div'> {
  children?: React.ReactNode;
  elevated?: boolean;
}
```

All native `div` props, `data-*`, `aria-*`, handlers, `className` and `ref` are forwarded to the root. `elevated` defaults to `false`. No `as`, `asChild`, `padding`, `variant` or interactive escape prop exists.

## Native Props and DOM Contract — Conditional

Exactly one native `<div>` root. `className` is merged after the component classes so consumers can extend but the component classes always apply. `ref` targets `HTMLDivElement`.

## Composition — Required

Card composes arbitrary `children`. It owns the surface only; the composed content owns its own spacing, layout and semantics.

## Context Dependencies — Required

No React Context. Resolved CSS custom properties arrive through normal CSS inheritance.

## State Ownership — Required

No React state. Card is stateless.

## Design Tokens — Conditional

`--surface` (background), `--border` (1px border color), `--shadow-card` (elevated only). Radius `16px` is confirmed Design System component evidence.

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

No interactivity, no padding convention, no header/footer/media subcomponents, no color variants, no elevation scale beyond the single `elevated` shadow.

## Escape Hatches and Overrides — Required

Consumers may extend via native props and `className`. They must not repurpose Card as an interactive control by attaching click handlers without providing correct native interactive semantics in the composed content.

## Examples — Recommended

- Flat surface grouping text content.
- Elevated surface (`elevated`) for a raised card.

## Do / Don't — Recommended

- Do compose content and let the content own its padding.
- Don't rely on Card for click/keyboard behavior.

## Test Contract — Required

- Renders a `div.chayns-card` with forwarded `children`.
- Applies `chayns-card--elevated` only when `elevated`.
- Forwards native props and merges `className`.
- Server-renders without error.

## Visual Verification Contract — Conditional

Flat and elevated surfaces across light and dark reference modes.

## AI Usage Contract — Required

### Use when
Grouping related content on a Design System surface.

### Do not use when
An interactive control is needed — use Button/List/Accordion or a native interactive child.

### Required context
None beyond resolved theme tokens.

### Forbidden assumptions
No intrinsic padding, no interactivity, no additional variants.

### Related decisions
CARD-001–003.

## Open Decisions — Required

None blocking. Optional future additions (padding tokens, header/footer slots) are out of scope for Milestone 1.

## Readiness Assessment — Required

See `card-readiness-assessment.md`. Gate result: READY.

## Specification Change Rules — Required

Any new variant, slot, padding convention or interactive behavior requires a new decision and a specification update before implementation.
