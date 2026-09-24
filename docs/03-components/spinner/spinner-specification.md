# Spinner - Component Specification

## Metadata

- Component Name: Spinner
- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Core
- Design Reference: Bodywork Design System `Fortschritt`, checked 2026-09-24
- Related Components: Progress, Skeleton
- Last Reviewed: 2026-09-24

## Purpose

Spinner is a decorative indicator for loading whose duration is unknown. The
surrounding loading region owns all user-facing loading status communication.

## Use When

Use Spinner when loading duration or progress is unknown.

## Do Not Use When

Do not use Spinner when the progress is known; use Progress instead. Do not use
Spinner as a placeholder for an already known layout; use Skeleton instead.

## Anatomy and Composition

- Root: one non-interactive native `div`.
- No children, slots, compound parts, internal state, or context.
- Its fixed width and height are `var(--k30)`.

## Public API Contract

```ts
export interface SpinnerProps
  extends Omit<
    ComponentPropsWithRef<'div'>,
    'aria-hidden' | 'children' | 'role' | 'tabIndex'
  > {
  children?: never;
  role?: never;
  tabIndex?: never;
  'aria-hidden'?: never;
}
```

### Prop Ownership Map

| Surface | Native target / ref | Forwarded | Owned / excluded |
|---|---|---|---|
| `Spinner` | Root `div` / `HTMLDivElement` | Compatible native `div` props, including `className`, `style`, events, `data-*`, and remaining compatible `aria-*` attributes | `children`, `role`, `tabIndex`, and `aria-hidden` are excluded. |

The component writes `aria-hidden="true"` after forwarded props. It has no
internal event handling, so forwarded consumer handlers retain normal native
behavior. Consumers must not make a Spinner interactive.

## Semantic and Accessibility Contract

Spinner is always decorative and removed from the accessibility tree with
`aria-hidden="true"`. It has no focus target, accessible name, status
announcement, keyboard behavior, or live region. The surrounding loading
region communicates loading status when necessary.

## Styling and Motion Contract

Spinner is a circular 3px border ring. The base ring is `--surface-alt`; the
upper quarter is `--accent`. It has fixed `width` and `height` of `var(--k30)`.

```css
animation: dsSpin 0.8s linear infinite;

@keyframes dsSpin {
  100% {
    transform: rotate(360deg);
  }
}
```

This documented Bodywork rotation is the component-specific motion contract.
At `prefers-reduced-motion: reduce`, the Spinner remains visible and static.
It has no disabled, error, responsive, density, localization, RTL, or
theme-specific state.

## Test and Visual Verification Contract

Tests cover ref and native prop forwarding, forced decorative semantics, lack
of a focus target, and server rendering. Type tests reject children, role,
tabIndex, and consumer `aria-hidden`.

Visual verification covers the 30-token geometry, 3px ring, token colors,
0.8-second linear rotation, Light/Dark token resolution, and static rendering
with reduced motion.

## Open Decisions

No blocking open decisions remain.
