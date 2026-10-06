---
{
  "name": "Popup",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Show a non-modal contextual surface at a trigger."
  ],
  "doNotUseWhen": [
    "Do not use as a modal decision or automatically assign menu semantics."
  ],
  "alternatives": [
    "PopupList",
    "Tooltip"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/Popup:ActionList",
    "Core/Popup:KeyboardNavigation",
    "Core/Popup:BaseComposition",
    "Core/Popup:LongLocalizedItems"
  ]
}
---
# Popup — Component Specification

## Selection guide

Use when: Show a non-modal contextual surface at a trigger.

Do not use when: Do not use as a modal decision or automatically assign menu semantics.

Alternatives: PopupList, Tooltip.

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

## Foundation audit — 2026-10-06

Generic Popup content does not acquire menu semantics or focus menu items.
PopupList owns its menu and initial item focus; menuitems use roving keyboard
navigation and stay outside the ordinary Tab sequence. The composed trigger runs
its child click handler first, then the wrapper handler, then toggles; preventDefault
stops subsequent steps. Child and public refs retain their lifecycle. Surfaces
reposition on scroll, resize and geometry changes and clamp to the viewport.
Menu-action dismissal only applies to the owning surface and honors cancellation.
