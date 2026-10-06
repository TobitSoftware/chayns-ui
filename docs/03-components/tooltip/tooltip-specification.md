---
{
  "name": "Tooltip",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "ready",
  "useWhen": [
    "Explain a control briefly on hover/focus without taking over its primary action."
  ],
  "doNotUseWhen": [
    "Do not hide essential instructions in a tooltip or put interactive menu actions into it."
  ],
  "alternatives": [
    "help text",
    "PopupList",
    "Banner"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/Tooltip:Default"
  ]
}
---
# Tooltip — Component Specification

## Selection guide

Use when: Explain a control briefly on hover/focus without taking over its primary action.

Do not use when: Do not hide essential instructions in a tooltip or put interactive menu actions into it.

Alternatives: help text, PopupList, Banner.

## Public contract — confirmed 2026-10-06

content is already localized, non-interactive ReactNode. children is exactly one
ref-/native-prop-capable trigger element, excluding Fragment and native disabled
controls. General native HTML props and public ref address that trigger; native
button/link-specific props remain on children. Existing events run first, then
outer consumer handlers, then internal behavior unless preventDefault cancels it.
Existing child/public aria-describedby IDs are retained and merged with a stable
tooltip ID. The explanation has role=tooltip; no aria-expanded or popup/menu role.
The component never moves focus or substitutes trigger semantics.

Open immediately on hover, focus or touch tap; first tap also retains the native
trigger action. Stay open while pointer traverses trigger/hoverable explanation.
Blur, leaving both surfaces, outside press and Escape dismiss. Escape keeps it
suppressed until a new focus/pointer entry/tap. No generic delay, placement, locale
or controlled-state API. No actions, essential instructions or disabled-trigger
wrapper behavior. Hover continuity across the existing gap is a transparent hit
bridge, not additional visible geometry.

Bodywork .tipbox checked 2026-10-06: text background/surface foreground, fs-caption
weight500, k6/k10 padding, radius8, 9px gap, 5px arrow, opacity/transform .15s ease
and 0 6px 16px -6px black/.4 shadow, z-tooltip. User confirmed upper centered
placement with the existing overlay viewport fallback and multi-line wrapping at
constrained widths. Internal portal uses document.body; SSR renders the trigger
without accessing browser APIs. Existing density tokens apply without a local size
prop. Reduced motion removes decorative transitions. No fonts are loaded.

Acceptance: focus/touch/hover open, consumer cancellation preserves action ownership,
Escape suppresses immediate reopening, pointer transfer retains the explanation,
outside/blur dismiss, native refs including cleanup and merged descriptions survive,
viewport placement and long localized content reflow. Storybook: Core/Tooltip:Default
with keyboard/touch/hover checks. Manual contrast, density, screenreader and zoom
checks remain release evidence. No unknown design-review point blocks this scope.
