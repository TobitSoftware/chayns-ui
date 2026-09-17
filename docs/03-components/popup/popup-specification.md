# Popup — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Relevant Decisions: CORE-010–012, POPUP-005–008, A11Y-001–007

## Contract

Popup is a controlled or uncontrolled non-modal overlay. `Popup.Trigger` owns native button props and renders a native `button`; `Popup.Content` owns native div props and renders the portalled surface. Both are valid only below Popup. Popup exposes `open`, `defaultOpen`, `onOpenChange`, `closeOnEscape` and `closeOnOutsidePress`. Its root has no DOM node or ref.

Trigger fixes `type="button"`, `aria-expanded` and `aria-controls`; Content owns its id and position. Trigger click first calls the consumer handler, then toggles unless cancelled. Content gets no implicit role and never moves focus. Escape and a programmatic close restore focus to Trigger; outside press and Tab close without restoration. The surface is portalled to body, starts below the trigger, flips and clamps to viewport, and uses `--z-popover`.

PopupList is the menu-specific composition: it owns `role="menu"`, focuses its first menu item on open, closes after menu activation with focus restoration, wraps Arrow keys and supports Home/End. Tab closes with normal flow. Generic Popup never supplies menu ARIA.

## Native prop map and verification

| Part | Element / ref | Props |
| --- | --- | --- |
| Trigger | `<button>` / HTMLButtonElement | compatible button props except `type`, expanded/control ARIA and interaction collisions |
| Content | `<div>` / HTMLDivElement | compatible div props except owned `id`/positioning |
| PopupList item | `<button role="menuitem">` | documented icon/text/action contract |

Tests cover forwarding, handler cancellation, controlled state, dismissal/focus rules, placement and invalid compound placement. The menu keyboard matrix is tested separately from generic Popup.
