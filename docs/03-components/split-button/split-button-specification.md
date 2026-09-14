# Split Button – Component Specification

## Metadata — Required

- Component Name: Split Button
- Component Category: Core
- Specification Status: BLOCKED
- Owner / Responsible Area: chayns UI Core
- Related Components: Button, Popup, PopupList
- Relevant Decision IDs: BUTTON-001–006, POPUP-001–005, SPLIT-001–004, A11Y-001–007

## Purpose — Required

Split Button combines one visible primary action with a separate trigger that
opens a Popup containing alternative actions. It provides generic UI
interaction only and owns no business logic.

## Use When — Required

Use it when one primary action has multiple related alternatives that belong in
the same semantic action scope.

## Do Not Use When — Required

Do not use it for unrelated actions, navigation, toggles, selection controls or
when more than one primary action would result in the same action scope.

## Related Components and Selection Boundaries — Conditional

The left action is related to Button. The right action must use Popup; the
initial list variant must use PopupList. The exact composition and API
boundaries are open.

## Anatomy — Conditional

The visual two-part control is confirmed conceptually. Root wrapper, two native
button roots, shared/separate borders and the trigger icon contract are open.

## Semantic Contract — Conditional

Both actions must retain native button semantics. The right trigger's
expanded/controls semantics and popup relationship are open.

## Variants — Required

The allowed Button variants and whether all are supported by Split Button are
open. No new visual variant may be inferred from the screenshot.

## Local Size Variants — Conditional

No local S/M/L API is planned. Density mapping and any component-specific
geometry remain open.

## States — Conditional

Primary action states, trigger states, open/closed, disabled and focus-visible
states are relevant. Their priority and combinations are open.

## State Priority and Combination Matrix — Conditional

Blocked pending separate focus targets, disabled ownership, popup state
semantics and visual/token decisions.

## Public API Contract — Required

The primary action API, alternative item API, variant requirements, icon
contract, native prop forwarding, refs, defaults and disabled behavior are
open. The component must not silently invent a loading, selected or local-size
prop.

## Native Props and DOM Contract — Conditional

The two native button contract, wrapper necessity, ref targets and DOM order
are open. The logical focus order must remain the DOM order.

## Composition — Required

Split Button must compose with the independent Popup rather than implement a
private popup structure. Whether consumers pass a Popup or a PopupList
configuration remains open.

## Context Dependencies — Required

No context is confirmed. Any trigger-to-popup relationship must be explicitly
specified before implementation.

## State Ownership — Required

The initial popup open state is internally uncontrolled. The exact owner of
trigger state, default state and lifecycle synchronization is open.

## Design Tokens — Conditional

Shared Button roles are reusable only where their semantics remain valid.
Joined geometry, divider, radius, focus and popup-trigger tokens are open.

## Density Contract — Conditional

Global density applies. Split geometry and trigger sizing require explicit
mapping.

## Color and Theme Contract — Conditional

Resolved semantic roles and supported modes are required. Exact variant/state
mapping and contrast evidence are open.

## Typography Contract — Conditional

The primary label is consumer-provided and localizable. Typography and
wrapping behavior are open.

## Accessibility Contract — Required

The two focusable actions, accessible names, expanded state, popup relation,
keyboard behavior, focus restoration, disabled behavior, pointer targets,
zoom/reflow and reduced-motion behavior are not complete. Implementation is
blocked.

## Keyboard Contract — Conditional

Native activation of the primary action is expected, but the trigger-to-popup
keyboard model and popup navigation are open.

## Focus Contract — Conditional

Both actions require visible focus. Focus entry, movement into the popup and
restoration after dismissal are open.

## Motion Contract — Required

No split or popup transition may be implemented until the Motion and Reduced
Motion behavior is confirmed.

## Internationalization and Content Contract — Conditional

The primary label, trigger name and list-item text are resolved consumer
content. Core owns no translation IDs or fallback policy.

## Responsive and Layout Behavior — Conditional

Joined geometry, wrapping, constrained widths, popup placement and reflow are
open.

## Container Interaction — Conditional

The container owns placement, action scope and external spacing. The exact
anchor relationship is open.

## Loading and Async Contract — Required

Split Button does not infer loading or async state. Alternative action
completion and popup close timing are open.

## Error Contract — Conditional

Business errors are outside Core.

## Performance Characteristics — Conditional

SSR safety, event handling and any browser-only overlay work require the Popup
contract first.

## Dependencies — Required

Only existing Core Button/Popup contracts and confirmed foundations may be
used. No dependency addition is authorized.

## Non-Goals — Required

Business logic, navigation, selection state, loading UI, a second primary
action and an inline private popup implementation are out of scope.

## Escape Hatches and Overrides — Required

Only explicitly documented native props and composition APIs may be exposed.
No style, positioning or accessibility escape hatch is confirmed.

## Examples — Recommended

Examples are blocked until the Popup and Split Button API and semantics are
confirmed.

## Do / Don't — Recommended

Do keep one primary action per semantic scope. Do not use the visual split
shape to infer unsupported variants or interaction rules.

## Test Contract — Required

Tests must eventually cover both native actions, primary activation, trigger
opening, Popup integration, dismissal, keyboard and focus behavior, accessible
names/states, disabled behavior, variants, density, modes, long localized
content, SSR, pointer targets and Reduced Motion. Exact cases are blocked by
the unresolved contracts above.

## Visual Verification Contract — Conditional

Joined button geometry, states, popup placement, density, modes, focus and
long content require confirmation before a screenshot matrix can be finalized.

## AI Usage Contract — Required

Agents must not infer trigger semantics, variant availability, token mapping,
focus behavior, popup positioning or alternative item ownership.

## Open Decisions — Required

SPLIT-004 and the blocking Popup decisions prevent implementation readiness.

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
- Internationalization Contract Complete: yes for consumer-provided content
- Test Contract Complete: no
- Visual Verification Contract Complete: no
- Open Implementation Blockers: multiple
- Specification Status: BLOCKED

## Specification Change Rules — Required

Any resolution of SPLIT-004 or its Popup dependencies must update this
specification, the Popup specifications, readiness assessments, the Decision
Register and the matching test/visual contracts before implementation.
