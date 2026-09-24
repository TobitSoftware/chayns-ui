# Progress - Component Specification

## Metadata

- Component Name: Progress
- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Core
- Design Reference: Bodywork Design System `Fortschritt`, checked 2026-09-24
- Related Components: Spinner, Skeleton
- Last Reviewed: 2026-09-24

## Purpose

Progress communicates known completion as a visible whole-number percentage.
It owns its visible label, percent, progressbar semantics, and value
normalization.

## Use When

Use Progress when completion is known as a percentage.

## Do Not Use When

Do not use Progress for unknown duration; use Spinner instead. Do not use it
for known-layout placeholders; use Skeleton instead.

## Anatomy and Composition

- Root: one layout `div` that fills available width.
- Label row: a visible `label` text and visible percentage.
- Control: a native `div` with `role="progressbar"`, containing its fill.
- No children, compound parts, internal state, or context.

## Public API Contract

```ts
export interface ProgressProps
  extends Omit<
    ComponentPropsWithRef<'div'>,
    | 'aria-label'
    | 'aria-labelledby'
    | 'aria-valuemax'
    | 'aria-valuemin'
    | 'aria-valuenow'
    | 'aria-valuetext'
    | 'children'
    | 'role'
    | 'tabIndex'
  > {
  label: string;
  rootProps?: Omit<ComponentPropsWithRef<'div'>, 'children'>;
  value: number;
  children?: never;
  role?: never;
  tabIndex?: never;
  'aria-label'?: never;
  'aria-labelledby'?: never;
  'aria-valuemax'?: never;
  'aria-valuemin'?: never;
  'aria-valuenow'?: never;
  'aria-valuetext'?: never;
}
```

`value` accepts a percentage. Finite decimal values are rounded to the nearest
integer and then clamped to 0 through 100. `NaN` becomes 0; positive and
negative infinity become 100 and 0 respectively.

### Prop Ownership Map

| Surface | Native target / ref | Forwarded | Owned / excluded |
|---|---|---|---|
| `Progress` | `div[role="progressbar"]` / `HTMLDivElement` | Compatible native `div` props, including `className`, `style`, events, `data-*`, and remaining compatible `aria-*` attributes | `label`, `rootProps`, `value`, `children`, `role`, `tabIndex`, accessible-name ARIA props, and ARIA value props are excluded. |
| `rootProps` | Layout root `div` | Compatible native `div` props except `children`, including its own `ref`, `className`, `style`, events, `data-*`, and `aria-*` attributes | `children` is excluded. |

The component writes its semantic ARIA attributes after forwarded control props.
It has no internal event handling; forwarded handlers retain normal native
behavior. Consumers must not make the progressbar control interactive.

## Semantic and Accessibility Contract

The control has `role="progressbar"`, `aria-valuemin="0"`,
`aria-valuemax="100"`, and normalized `aria-valuenow`. It obtains its
accessible name from the visible label through internal `aria-labelledby`.
`aria-valuetext` mirrors the visible `"<value> %"` text. It creates no focus
target, keyboard behavior, or live region.

## Styling and Motion Contract

The root and track fill available width. The label row uses:

```css
display: flex;
justify-content: space-between;
font-size: var(--fs-meta);
color: var(--muted);
margin-bottom: 7px;
```

The track is 8px high, fully rounded, and uses `--surface-alt`. The fill uses
`--accent`, is fully rounded, and occupies the normalized percentage width.
Value changes have no transition, so reduced motion needs no separate style.
It has no disabled, error, density, localization, RTL, or theme-specific
state.

## Test and Visual Verification Contract

Tests cover visible label and percent, normalized finite and non-finite values,
role and owned ARIA values, direct-control and root prop/ref forwarding, lack
of a focus target, and server rendering. Type tests reject children, role,
tabIndex, consumer-owned accessible-name/value ARIA props, and missing label or
value.

Visual verification covers 100% width, label-row layout, 7px gap, 8px rounded
track, fill widths at 0/64/100, Light/Dark token resolution, and no value
transition.

## Open Decisions

No blocking open decisions remain.
