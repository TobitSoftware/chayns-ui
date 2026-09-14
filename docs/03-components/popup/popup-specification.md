# Popup and PopupList – Component Specification

## Metadata — Required

- Component Name: Popup and PopupList
- Component Category: Core
- Specification Status: BLOCKED
- Owner / Responsible Area: chayns UI Core
- Relevant Decision IDs: OVERLAY-001–003, POPUP-001–005, A11Y-001–007

## Purpose — Required

`Popup` is an independent Core overlay basis. It must provide a reusable
composition boundary for a popup surface without owning business logic.
`PopupList` is the initially planned variant for action entries.

## Use When — Required

Use the base for a confirmed popup interaction that is not a Dialog, Tooltip,
Context Menu or Select. Use `PopupList` when the consumer needs configurable
action entries with an icon, visible text and `onClick`.

## Do Not Use When — Required

Do not use the component for modal Dialog behavior, tooltips, navigation,
selection controls or business-specific data and state.

## Related Components and Selection Boundaries — Conditional

Dropdown, Popover, Context Menu and Select remain distinct patterns. The
relationship between the generic Popup name and those patterns is not yet
resolved.

## Anatomy — Conditional

The base surface, trigger/anchor relationship, optional wrapper, portal
behavior and `PopupList` entry markup are not yet fixed.

## Semantic Contract — Conditional

The semantic role and ARIA contract of the base and `PopupList` are open. A
menu pattern may not be assumed from the visual list alone.

## Variants — Required

The base variant model and the complete initial variant set are open.
`PopupList` is confirmed as an intended initial variant, but its normative
semantics remain blocked.

## Local Size Variants — Conditional

No local S/M/L API is planned. Density mapping is open until the required
geometry and token mapping are confirmed.

## States — Conditional

Open and closed are relevant. Disabled, empty, item activation, focus and
dismissal states require a complete interaction specification.

## State Priority and Combination Matrix — Conditional

Blocked pending keyboard, focus, dismissal and disabled-state decisions.

## Public API Contract — Required

The base composition API, trigger/anchor API and `PopupList` item type are
open. The `PopupList` item must contain:

```ts
type PopupListItem = {
  icon: string;
  text: string;
  onClick: () => void;
};
```

The exact icon contract, native prop forwarding, ref targets, identifiers,
disabled behavior and whether arbitrary children are supported require
confirmation.

## Native Props and DOM Contract — Conditional

The semantic surface and any trigger/anchor DOM contract are open. No DOM
wrapper or portal strategy may be selected by implementation convenience.

## Composition — Required

`Popup` is a separate component from `SplitButton`. `PopupList` is a variant
or composition of the base, not an inline implementation hidden inside
SplitButton. The exact composition API is open.

## Context Dependencies — Required

No context contract is confirmed. A context mechanism may only be introduced
after the anchor, overlay and focus relationship is specified.

## State Ownership — Required

The initial Popup open state is internally uncontrolled. The required default
state, trigger ownership and future extensibility of this restriction remain
open.

## Design Tokens — Conditional

Surface, border, radius, shadow, spacing, icon, focus and z-layer tokens are
not yet confirmed for this component.

## Density Contract — Conditional

Global S/M/L density applies, but the mapping for popup geometry and list
entries is open.

## Color and Theme Contract — Conditional

The component must consume resolved semantic tokens and support applicable
reference modes. Exact roles and contrast evidence are open.

## Typography Contract — Conditional

List text remains consumer-provided and localizable. Typography roles and
long-text behavior require confirmation.

## Accessibility Contract — Required

Accessible name, role, state, item semantics, screenreader announcements,
focus entry, focus containment, focus restoration, Escape, outside dismissal,
pointer target, zoom/reflow and reduced-motion behavior are not sufficiently
specified. Implementation is blocked.

## Keyboard Contract — Conditional

Escape closes as a confirmed product rule. The remaining keyboard model,
including Tab, Arrow keys, Home/End and activation behavior, is open.

## Focus Contract — Conditional

Focus visibility is required. Initial focus, focus movement, focus containment
and restoration on close are open.

## Motion Contract — Required

No motion or transition may be implemented until the popup transition and
Reduced Motion behavior are confirmed.

## Internationalization and Content Contract — Conditional

`text` is already resolved consumer content and must remain localizable. No
locale or fallback policy is owned by Core.

## Responsive and Layout Behavior — Conditional

Placement, collision handling, width constraints, reflow and long localized
text behavior are open.

## Container Interaction — Conditional

The trigger/container relationship and outside-click boundary are open.
Outside-click dismissal itself is confirmed for the initial variant.

## Loading and Async Contract — Required

The base does not load data. Async `onClick` behavior and whether the popup
closes before or after a returned promise are open.

## Error Contract — Conditional

Business errors are outside Core. Item failure presentation is not owned by
this component and requires no inferred fallback.

## Performance Characteristics — Conditional

The intended implementation should be deterministic and SSR-safe, but portal,
event-listener and browser-boundary requirements are open.

## Dependencies — Required

No additional dependency is authorized. Required overlay primitives and token
dependencies remain open under OVERLAY-003 and OPEN-017.

## Non-Goals — Required

Business logic, data loading, navigation, Dialog behavior, Tooltip behavior,
Select behavior and a hidden Split Button implementation are out of scope.

## Escape Hatches and Overrides — Required

No consumer escape hatch is confirmed. Unspecified `className`, style,
positioning or accessibility overrides must not be added.

## Examples — Recommended

Examples are blocked until the base composition and semantic list pattern are
confirmed.

## Do / Don't — Recommended

Do use resolved consumer content and keep actions explicit. Do not infer a
menu role or keyboard model from the screenshot.

## Test Contract — Required

Tests must eventually cover public API and item typing, rendering, opening and
closing, Escape, outside dismissal, item activation, focus order and
restoration, semantic roles and names, disabled/empty behavior, SSR,
localization, zoom/reflow, pointer targets, contrast, modes and Reduced
Motion. The exact assertions are blocked by the missing semantic contract.

## Visual Verification Contract — Conditional

Popup surface, list variant, placement, states, density, modes and long text
require a confirmed visual contract before screenshots can be defined.

## AI Usage Contract — Required

Agents must not infer menu semantics, focus behavior, positioning, layer
values, tokens, portal strategy or additional variants.

## Open Decisions — Required

POPUP-005 is blocking this specification. See the open points in the
Accessibility, Keyboard, Focus, Responsive and Dependencies sections.

## Readiness Assessment — Required

- Design Rules Complete: no
- Foundation Dependencies Complete: no
- API Contract Complete: no
- Semantic Contract Complete: no
- Accessibility Contract Complete: no
- Keyboard Contract Complete: no
- State Matrix Complete: no
- Density Contract Complete: no
- Motion Contract Complete: no
- Internationalization Contract Complete: yes for consumer-provided text
- Test Contract Complete: no
- Visual Verification Contract Complete: no
- Open Implementation Blockers: multiple
- Specification Status: BLOCKED

## Specification Change Rules — Required

Any resolution of POPUP-005 must update this specification, its readiness
assessment, the Decision Register and the corresponding test contract before
implementation.
