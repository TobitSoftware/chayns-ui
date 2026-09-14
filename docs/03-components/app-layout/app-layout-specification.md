# AppLayout - Component Specification

## Metadata - Required

- Component Name: AppLayout
- Component Category: Layout
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Layout
- Design Reference: User-provided AppLayout reference, reviewed 2026-09-14
- Relevant Decision IDs: ARCH-001-006, CORE-001-007, LAYOUT-001-005, TOKEN-001-006, COLOR-001-006, A11Y-001-007, MOTION-001-007, ICON-001-003
- Foundation Dependencies: `--accent`, `--on-accent`, state, spacing, icon, focus and motion tokens
- Related Components: Button/IconButton, future Icon component
- Last Reviewed: 2026-09-14

## Purpose - Required

AppLayout provides the reusable application shell consisting of a top header,
a left navigation area and a content area. It coordinates spatial layout and
generic navigation UI state; it does not fetch data, route, persist user
preferences or call chayns APIs.

## Use When - Required

Use AppLayout when an application needs a persistent top edge, left
application navigation and a content surface that fills the remaining
viewport.

## Do Not Use When - Required

Do not use AppLayout for routing, page-level business state, a standalone
toolbar, a generic two-column layout, or a navigation pattern whose responsive
behavior differs from this application-shell contract.

## Related Components and Selection Boundaries - Conditional

AppLayout is a Layout Component. Button/IconButton provide the native action
semantics for navigation and the collapse toggle. A future Icon component
owns Font Awesome rendering; AppLayout must not introduce a second icon
rendering contract.

## Anatomy - Required

- Root: full-area layout container.
- Header: fixed 64px region spanning the application width.
- Logo: image or SVG URL rendered in the header.
- Sidebar: left navigation region, spanning the area below the header.
- Navigation: recursively nested items with icon, name and optional children.
- Sidebar footer: a separating line and the right-aligned collapse toggle.
- Content: consumer-provided `children` rendered in the area to the right of
  the sidebar and below the header.

The first contract does not include header action slots.

## Semantic Contract - Required

The header is a `header`, the navigation is a labelled `nav` with a list, and
the content area is a `main`. Parent items use one native action button and a
separate native disclosure button.

Navigation item actions and disclosure controls use native buttons. A
clickable `div` is not allowed.

## Public API Contract - Required

The following is the intended shape; names and controlled-state semantics are
confirmed, while the DOM/ref forwarding details remain part of the technical
review:

```ts
interface AppLayoutItem {
  id: string;
  name: string;
  icon: string;
  children?: AppLayoutItem[];
}

interface AppLayoutProps {
  logo: string;
  items: AppLayoutItem[];
  onClick: (id: string) => void;
  navigationLabel: string;
  collapseLabel: string;
  expandLabel: string;
  activeItemId?: string;
  children?: React.ReactNode;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}
```

`logo` is a URL for an image or SVG resource and is decorative (`alt=""`).
`icon` is a Font Awesome Classic `fa-*` name, matching the existing IconButton
contract.
Names and accessible names are already resolved by the consuming application;
AppLayout does not know text-string IDs or introduce translation behavior.

## Composition - Required

`items` are recursively composable. Parent and child items each have an
`id`, can invoke `onClick(id)`, and may have children. A parent action and its
disclosure action are separate native buttons. Activating the item invokes
`onClick(id)`; activating disclosure only changes the open state.

`children` is arbitrary consumer content and owns its internal semantics and
layout. AppLayout owns only the shell geometry and content placement.

## Variants - Required

- Expanded sidebar.
- Collapsed sidebar.

There is no local S/M/L size prop. Global density remains an environment
input. Header height is 64px for this contract and is not a public prop.

## States - Required

- Sidebar expanded or collapsed.
- Active item, identified by `activeItemId`.
- Item hover, focus and pressed states.
- Expandable parent open or closed, subject to the unresolved disclosure
  contract.
- Reduced-motion presentation.

The active item is independent of disclosure state. Collapse does not change
the active item or disclosure state.

When collapsed, only top-level item icons and the sidebar toggle remain
visible. Disclosure controls and nested children are hidden until the sidebar
is expanded again.

## State Ownership - Required

Collapse supports both uncontrolled (`defaultCollapsed`) and controlled
(`collapsed` plus `onCollapsedChange`) use. Persistence is outside AppLayout.
The active item is externally owned through `activeItemId`; AppLayout does not
derive it from URL or routing state.

Nested disclosure state is owned internally by AppLayout. Active ancestors do
not open automatically.

## Design Tokens - Required

The implementation uses existing resolved semantic tokens for the accent
background, foreground, interaction states, spacing, icon geometry, focus and
motion. The expanded sidebar uses a fixed token-derived width and the
collapsed sidebar uses the control height plus spacing. Navigation labels are
truncated with an ellipsis and never change sidebar width.

## Color and Theme Contract - Required

The shell background uses the resolved primary semantic color. Text, icons,
active states and focus indicators must use semantic theme tokens and remain
usable in light, dark, contrast and color-deficiency modes. AppLayout does not
resolve or calculate colors. The content area uses the same primary semantic
background and foreground tokens as the header and sidebar, so transparent
consumer content remains on the shell background. The content area has a
rounded logical top-start corner.

## Accessibility Contract - Required

The shell must meet WCAG 2.2 AA and remain fully keyboard operable. Focus must
be visible, state must not be communicated by color alone, and collapsed
navigation must not leave hidden interactive descendants in the tab order.

The navigation label is supplied by `navigationLabel`. Native buttons provide
keyboard operation; disclosure controls expose `aria-expanded` and
`aria-controls`. Collapsed labels remain accessible through each item's
`aria-label`. Focus stays on the activated control.

## Responsive and Layout Behavior - Required

The header is 64px high. The root fills the available application area;
content occupies the remaining area to the right of the sidebar and below the
header. Expanded and collapsed sidebar widths must come from confirmed tokens.

No mobile overlay variant is implemented. The sidebar remains a fixed left
column; normal browser zoom and reflow apply without special breakpoints.
Opening a group never changes the sidebar width.
The collapsed navigation does not expose a scrollbar.

## Motion Contract - Required

Sidebar and disclosure transitions may use only the globally permitted
properties (`transform`, `opacity`, and where explicitly applicable
`grid-template-rows`). Children use a `grid-template-rows` transition and the
sidebar toggle uses the `fa-sidebar` icon, aligned to the right. The sidebar
width uses a `grid-template-columns` transition, and Children use the
permitted `grid-template-rows` transition. Non-essential motion must be
disabled for `prefers-reduced-motion`; labels do not animate.

## Internationalization and Content Contract - Required

`name` is supplied as already resolved, localizable content. The component
must tolerate longer localized names without local font shrinking or a fixed
text clipping policy. Directionality/RTL behavior is not assumed and must be
decided if this component is required to support RTL.

## Loading and Error Contract - Conditional

AppLayout owns no data loading. Invalid logo URLs use native image behavior.
An empty `items` array renders an empty navigation list.

## Dependencies - Required

React peer dependency and the existing token/Core CSS delivery model only.
No Font Awesome runtime, translation library, router, persistence library or
chayns API dependency may be added by AppLayout.

## Non-Goals - Required

No routing, URL synchronization, data fetching, permissions, persistence,
header action system, theme resolver, locale resolver or business rules.

## Test and Acceptance Contract - Required

After the blocking decisions are confirmed, tests must cover:

- full-area shell with 64px header and content placement;
- logo URL rendering and accessible naming;
- recursive item rendering and `onClick(id)` for parent and child;
- active item rendering from `activeItemId`;
- controlled and uncontrolled collapse with change notification;
- keyboard operation, focus visibility and hidden collapsed descendants;
- nested disclosure semantics and screenreader state;
- long localized names, zoom/reflow and reduced motion;
- light/dark/high-contrast/color-deficiency token behavior;
- SSR-safe deterministic rendering.

## AI Usage Contract - Required

Use AppLayout for a reusable application shell, not for routing or product
business logic. Do not infer Font Awesome syntax, tokens, breakpoints,
disclosure semantics or logo fallback behavior from the screenshot or from
legacy code. Stop implementation when any of those decisions remains open.
