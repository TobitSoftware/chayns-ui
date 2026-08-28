---
'@chayns-ui/core': minor
---

Add the first stable component set beyond Button/IconButton, implemented 1:1 against the chayns Design System:

- **Card** — presentational surface primitive (`--surface`, 1px `--border`, radius 16) with an optional `elevated` shadow.
- **List** and **ListItem** — accessible vertical rows with static, link (`href`) and action (`onClick`) modes, optional leading/trailing slots and a non-color-only unread indicator.
- **Accordion** and **AccordionGroup** — native disclosure with `grid-template-rows` motion, exclusive grouping and automatic Wrapped detection for nested accordions (no `isWrapped` prop).

Also aligns the Button/IconButton focus indicator with the Design System: a softened-accent `box-shadow` focus ring that stands off the button surface instead of a flat outline.
