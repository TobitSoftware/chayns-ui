# Accordion and AccordionGroup — Component Specification

## Metadata — Required

- Component Name: Accordion and AccordionGroup
- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Core
- Design Reference: chayns Design System Accordions (corrected Wrapped description and examples), inline example markup and `tobit-ds.css` (`.row-anim`, `grid-template-rows` disclosure, surface/border tokens), inspected 2026-08-21
- Relevant Decision IDs: CORE-001–007, ACCORDION-001–006, MOTION-001–003, A11Y-001–007, DENSITY-001–005, DIST-012–013
- Foundation Dependencies: token catalogue transfer (`--surface`, `--border`, `--accent`, `--text`, `--text-3`, `--muted`, `--hover`, `--fs-body`, `--fs-caption`, `--icon`, `--k10`–`--k16`, focus-ring tokens), density matrix, motion contract, generated `@chayns-ui/tokens` subset
- Related Components: Card (surface language), List
- Last Reviewed: 2026-08-21

## Purpose — Required

Accordion is a single disclosure: a header button that expands and collapses an associated content region. AccordionGroup coordinates several Accordions so that at most one is open at a time and renders them as one joined surface. The components own presentation, disclosure interaction and generic accessibility only — no data fetching or business logic.

## Use When — Required

Use a standalone Accordion for an independent expandable section. Use AccordionGroup for a set of mutually exclusive sections (for example an FAQ). Nest an Accordion inside another Accordion's content to get the automatically detected Wrapped presentation.

## Do Not Use When — Required

Do not use Accordion for primary navigation, for tab-like switching between peer views (that is Tabs), or for always-visible content. Do not create a separate "WrappedAccordion" component — wrapping is detected automatically from nesting.

## Related Components and Selection Boundaries — Conditional

Three presentations exist, all from one Accordion component:

- Standalone: independent; own surface with border and radius `12px`.
- Grouped: inside an `AccordionGroup`; one shared surface (radius `12px`), items separated by top borders, mutually exclusive open state.
- Wrapped: an Accordion rendered inside another Accordion's content; indented, radius `10px`, more compact spacing.

Grouping (exclusivity) and Wrapped (nesting) are independent mechanisms. Wrapped is not an explicit prop.

## Anatomy — Conditional

- Accordion root: `<div class="chayns-accordion chayns-accordion--{standalone|grouped|wrapped}">`, plus `--open` and `--disabled` modifiers.
- Header: native `<button class="chayns-accordion__header">` containing a decorative chevron (`chayns-accordion__chevron`, FontAwesome `far fa-chevron-right`) and a title (`chayns-accordion__title`).
- Panel: `<div class="chayns-accordion__panel" role="region">` with an inner overflow wrapper (`chayns-accordion__panel-inner`) and content (`chayns-accordion__content`) that provides the next nesting depth to children.
- AccordionGroup root: `<div class="chayns-accordion-group">` wrapping grouped Accordions.

## Semantic Contract — Conditional

The header is a native `<button aria-expanded aria-controls>`; the panel is a `role="region"` with `aria-labelledby` pointing at the header. The chevron is decorative (`aria-hidden`). The header's visible title is its accessible name. Disabled uses native `disabled` on the header button.

## Variants — Required

The presentation (standalone / grouped / wrapped) is derived from context, not a `variant` prop. There are no color/emphasis variants.

## Local Size Variants — Conditional

None. No S/M/L prop. Global density controls spacing and text size through resolved tokens.

## States — Conditional

- collapsed (default): panel height 0, content hidden from AT and tab order.
- expanded (`--open`): panel height auto, chevron rotated 90°, title emphasized (weight 600), content visible.
- hover (pointer devices): `--hover` header background.
- focus-visible: softened-accent `box-shadow` ring on the header (`--focus-ring-size`, `rgba(var(--focus-ring-rgb), var(--focus-ring-alpha-strong))`), matching the Button focus contract.
- disabled: native `disabled` header, muted chevron and title (`--muted`), no hover/toggle.

## State Priority and Combination Matrix — Conditional

`disabled` suppresses hover and toggling. `focus-visible` may coexist with hover and with open/closed. In a group, opening one item closes the previously open item (exclusive). Collapsed panels are removed from tab order and the accessibility tree via the inner wrapper's delayed `visibility: hidden`.

## Public API Contract — Required

```ts
interface AccordionProps {
  title: React.ReactNode;
  children?: React.ReactNode;
  open?: boolean;            // controlled; ignored inside a group
  defaultOpen?: boolean;     // uncontrolled; ignored inside a group
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  id?: string;               // wires header/panel and identifies the item in a group
  className?: string;
}

interface AccordionGroupProps {
  children?: React.ReactNode;
  openId?: string | null;        // controlled open item id
  defaultOpenId?: string | null; // uncontrolled initial open item id
  onOpenChange?: (openId: string | null) => void;
  className?: string;
}
```

Outside a group, an Accordion is controlled (`open`/`onOpenChange`) or uncontrolled (`defaultOpen`). Inside a group, the group owns the open state and identifies the item by its `id` (falling back to a generated id). There is no `isWrapped` prop; Wrapped is detected via nesting context.

## Native Props and DOM Contract — Conditional

Each Accordion renders one root `div`, one native header `button`, and one panel `div[role=region]`. The header/panel are wired via generated or provided ids (`{id}-header`, `{id}-panel`). AccordionGroup renders one wrapping `div`.

## Composition — Required

Accordion composes a `title` (header label) and `children` (panel content). Nesting is achieved by rendering another Accordion within `children`; the inner Accordion reads an incremented nesting depth from context and renders Wrapped. AccordionGroup composes Accordion children and shares exclusive open state via context.

## Context Dependencies — Required

Two internal React Contexts:

- Nesting depth context (default 0): each open panel provides depth+1 to its content; depth > 0 renders Wrapped. Not consumed by application code.
- Group context (present only inside AccordionGroup): provides `isOpen(id)` and `toggle(id)` so member Accordions share the group's exclusive open state.

These contexts are internal implementation details, not a public API.

## State Ownership — Required

Standalone/nested Accordion owns its open state (controlled or uncontrolled). Inside a group, AccordionGroup owns the single open-item id (controlled via `openId` or uncontrolled via `defaultOpenId`). `onOpenChange` reports intended changes; controlled consumers must apply the change to re-render.

## Design Tokens — Conditional

Surface `--surface`, border `--border`, accent `--accent` (chevron), text `--text` (title), `--text-3` (content), `--muted` (disabled), hover `--hover`. Type `--fs-body` (title/content), `--fs-caption` (wrapped chevron). Icon box `--icon`. Spacing `--k10`/`--k12`/`--k14`/`--k15`/`--k16`. Radius `12px` (standalone/group) and `10px` (wrapped) are confirmed Design System evidence. Focus tokens as in the Button contract.

## Density Contract — Conditional

Header/content padding, gaps and text sizes resolve through global `--sf` at S/M/L via the referenced `--k*`/`--fs-*`/`--icon` tokens. Radius, colors and focus are density-independent.

## Color and Theme Contract — Conditional

Only resolved variables are consumed; they resolve per theme (light, dark, high contrast, color deficiency). The open/closed state is not conveyed by color alone — it is also conveyed by chevron rotation, title weight and `aria-expanded`.

## Typography Contract — Conditional

Title uses `--fs-body` and `--text`; open title uses weight 600. Content uses `--fs-body`, line-height 1.55 and `--text-3`. Wrapped chevron uses `--fs-caption`.

## Accessibility Contract — Required

Header is a native button with `aria-expanded` and `aria-controls`; the panel is a labelled `role="region"`. Collapsed content is removed from the accessibility tree and tab order (delayed `visibility: hidden`) so hidden interactive content is not reachable. State is conveyed by `aria-expanded`, chevron rotation and title weight (not color alone). Focus is visible on the header; disabled headers are removed from activation. No positive tabindex, no focus trap, no programmatic focus stealing.

## Keyboard Contract — Conditional

Native button semantics: Tab/Shift+Tab move to/from the header; Enter and Space toggle the header. When collapsed, interactive content inside the panel is not tab-reachable. Disabled headers are skipped.

## Focus Contract — Conditional

Header uses `:focus-visible` with the softened-accent `box-shadow` ring. No programmatic focus management; toggling does not move focus.

## Motion Contract — Required

Disclosure animates via `grid-template-rows` (0fr → 1fr, 0.25s ease) — the explicitly permitted layout-height exception — plus the chevron `transform: rotate` (0.2s ease) and header `background`. The inner wrapper toggles `visibility` with a transition delay so content hides only after collapse completes. Under `prefers-reduced-motion`, chevron, panel and visibility transitions are disabled. No other animated layout properties are used.

## Internationalization and Content Contract — Conditional

`title` and `children` are consumer-resolved localizable content; the component makes no locale/direction assumptions and composes no sentences from fragments. Longer/localized titles are not shrunk by local font resizing.

## Responsive and Layout Behavior — Conditional

Accordion fills its container's inline size. The title flexes and can shrink (`min-inline-size: 0`); the chevron keeps its intrinsic size. Content wraps and reflows; open height is driven by content.

## Container Interaction — Conditional

Standalone accordions do not own external spacing between siblings — the container owns stacking spacing. Grouped items are joined by the group's shared surface and internal separators. Wrapped accordions sit inside another accordion's content padding.

## Loading and Async Contract — Required

Not supported. Consumers render whatever content they have inside the panel.

## Error Contract — Conditional

Not applicable; Accordion owns no validation or error presentation.

## Performance Characteristics — Conditional

Accordion and AccordionGroup are lightweight, use only CSS-driven animation, and tree-shake independently from other components.

## Dependencies — Required

React peer only; token/Core CSS for `chayns-accordion`. Host-supplied FontAwesome Classic for the chevron glyph. No runtime dependencies, no bundled icon runtime.

## Non-Goals — Required

No `isWrapped` prop, no separate WrappedAccordion component, no multi-open group mode toggle in Milestone 1 (group is exclusive), no header-level actions, no animation of non-permitted layout properties, no controlled focus movement on toggle.

## Escape Hatches and Overrides — Required

Consumers may add `className` and `id`. They must not defeat the disclosure accessibility contract (for example by forcing panel visibility while `aria-expanded` is false) and must not replace native header semantics.

## Examples — Recommended

- Standalone Accordion (open by default).
- AccordionGroup of exclusive FAQ items.
- Wrapped: an Accordion nested inside another Accordion's content.
- Disabled Accordion.

## Do / Don't — Recommended

- Do nest an Accordion in content to get Wrapped automatically.
- Don't build a separate wrapped component or pass a wrapped flag.

## Test Contract — Required

- Header button wired to a labelled region panel via ids.
- Uncontrolled toggle updates `aria-expanded` and the `--open` class.
- Controlled `open` is respected and `onOpenChange` reports the intended next state.
- Standalone renders `--standalone`; nested renders `--wrapped` automatically.
- Disabled does not toggle.
- AccordionGroup keeps items mutually exclusive, renders `--grouped`, and supports controlled `openId`.
- Server-renders without error.

## Visual Verification Contract — Conditional

Standalone, grouped and wrapped presentations in collapsed/expanded/hover/focus/disabled across light and dark reference modes.

## AI Usage Contract — Required

### Use when
An expandable section (standalone), a set of exclusive sections (group) or a nested disclosure (wrapped) is needed.

### Do not use when
Peer-view switching (Tabs) or always-visible content is needed.

### Required context
Localized `title` and panel content; a stable `id` per item when using a group.

### Forbidden assumptions
No `isWrapped` prop, no separate wrapped component, no multi-open group, no color-only state.

### Related decisions
ACCORDION-001–006.

## Open Decisions — Required

None blocking. Multi-open group mode and header actions are explicitly out of Milestone 1 scope.

## Readiness Assessment — Required

See `accordion-readiness-assessment.md`. Gate result: READY.

## Specification Change Rules — Required

Any new presentation, group mode, wrapped prop, header action or animated property requires a new decision and a specification update before implementation.
