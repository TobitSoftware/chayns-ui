# Skeleton - Component Specification

## Metadata

- Component Name: Skeleton
- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Core
- Design Reference: Bodywork Design System `Fortschritt`, checked 2026-09-23
- Related Components: Spinner, Progress bar
- Last Reviewed: 2026-09-23

## Purpose

Skeleton is a decorative placeholder for content that is loading into an already
known layout. It owns only the placeholder surface and its loading animation;
the surrounding loading region owns any user-facing loading status.

## Use When

Use Skeleton while known layout regions are populated with content.

## Do Not Use When

Do not use Skeleton when the target layout is unknown. Use a Spinner when the
loading duration is unknown, and a progress bar with its visible percentage
when progress is known.

## Anatomy and Composition

- Root: one non-interactive native `div`.
- No children, slots, compound parts, internal state, or context.
- Consumers set the rendered width and height through the forwarded `style` or
  `className` props. Skeleton defines no sizing props or default geometry.
- `circular` requires the consumer to provide equal width and height.

## Public API Contract

```ts
export const SKELETON_SHAPES = ['square', 'rounded', 'circular'] as const;
export type SkeletonShape = (typeof SKELETON_SHAPES)[number];

export interface SkeletonProps
  extends Omit<
    ComponentPropsWithRef<'div'>,
    'aria-hidden' | 'children' | 'role' | 'tabIndex'
  > {
  shape?: SkeletonShape;
  children?: never;
  role?: never;
  tabIndex?: never;
  'aria-hidden'?: never;
}
```

`shape` defaults to `rounded`. `square` uses `0`, `rounded` uses the Bodywork
`6px` geometry, and `circular` uses `50%` border radius. The direct Bodywork
geometry is documented property evidence; no new radius token is introduced.

### Prop Ownership Map

| Surface | Native target / ref | Forwarded | Owned / excluded |
|---|---|---|---|
| `Skeleton` | Root `div` / `HTMLDivElement` | Compatible native `div` props, including `className`, `style`, events, `data-*`, and remaining compatible `aria-*` attributes | `shape`; `children`, `role`, `tabIndex`, and `aria-hidden` are excluded. |

The component always writes `aria-hidden="true"` after forwarded props. It has
no internal event handling, so forwarded consumer handlers retain normal native
behavior. Consumers must not make a Skeleton interactive.

## Semantic and Accessibility Contract

Skeleton is always decorative and is removed from the accessibility tree using
`aria-hidden="true"`. It creates no focus target, accessible name, status
announcement, keyboard behavior, or live region. The surrounding loading
region is responsible for communicating loading status when necessary.

## Styling and Motion Contract

The Bodywork placeholder surface uses the following confirmed pattern:

```css
background: linear-gradient(
  90deg,
  var(--surface-alt) 25%,
  var(--border-soft) 37%,
  var(--surface-alt) 63%
);
background-size: 800px 100%;
animation: dsShimmer 1.4s ease infinite;
```

`dsShimmer` moves `background-position` from `-400px 0` to `400px 0`. This is
an explicit Bodywork component-specific motion reference and therefore an
allowed exception to the general `transform`/`opacity` motion-property policy.
It intentionally supersedes the earlier preliminary `grey-003` color request:
the Bodywork gradient is the binding component color contract.

When `prefers-reduced-motion: reduce` is active, Skeleton remains visible but
the shimmer animation is disabled. It has no other interaction, disabled,
error, responsive, density, localization, RTL, or theme-specific state.

## Test and Visual Verification Contract

Tests must cover the default and all explicit shapes, root-ref forwarding,
native `className`, `style`, `data-*`, and event forwarding, forced decorative
semantics, lack of a focus target, and server rendering. Type tests must reject
children, `role`, `tabIndex`, and consumer `aria-hidden`.

Visual verification must cover the Bodywork gradient, 800px background size,
1.4-second shimmer range, all three radii, externally supplied dimensions,
Light/Dark theme token resolution, and static rendering with reduced motion.

## Open Decisions

No blocking open decisions remain.
