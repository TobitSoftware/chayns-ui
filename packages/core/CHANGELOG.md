# @chayns-ui/core

## 0.3.2

### Patch Changes

- Fix ListItem hover styling so the hover background includes trailing content.

## 0.3.1

### Patch Changes

- 2b44f08: Refactor

## 0.3.0

### Minor Changes

- Add Avatar and AvatarGroup components: a circular identity avatar with an
  image source and a deterministic initials-and-accent-tone fallback
  (`default` and `small` size variants), plus AvatarGroup for an overlapping
  stack of avatars with an optional `max` overflow tile.
- Add Popup and SplitButton components. `Popup` renders custom overlay content
  anchored to a trigger element; `PopupList` renders a list of contextual
  actions inside a `Popup`. `SplitButton` combines a primary action button
  with a secondary trigger that opens a `PopupList` of alternative actions.
  Adds the token foundation these components resolve against.
- `@chayns-ui/core` now exposes a single root JavaScript export (`.`) instead
  of per-component JavaScript subpath exports (for example the previous
  `@chayns-ui/core/button`); import all components from the package root
  instead, for example `import { Button, IconButton } from '@chayns-ui/core'`.
  CSS subpath exports (`./button.css`, `./card.css`, `./avatar.css`,
  `./list.css`, `./accordion.css`, `./styles.css`) are unaffected and continue
  to be imported explicitly as before. Tree-shaking is unaffected: it is
  guaranteed by side-effect-free, `preserveModules` JavaScript output, not by
  per-component subpath entry points.

## 0.2.1

### Patch Changes

- b32cfff: Refresh the package README with the live Storybook link, the full CSS export
  matrix and clearer usage guidance. No runtime or API changes.

## 0.2.0

### Minor Changes

- 14b50ee: Establish the generated token foundation and publish the first native Button and IconButton contracts.
- be52f1b: Add the first stable component set beyond Button/IconButton, implemented 1:1 against the chayns Design System:

  - **Card** — presentational surface primitive (`--surface`, 1px `--border`, radius 16) with an optional `elevated` shadow.
  - **List** and **ListItem** — accessible vertical rows with static, link (`href`) and action (`onClick`) modes, optional leading/trailing slots and a non-color-only unread indicator.
  - **Accordion** and **AccordionGroup** — native disclosure with `grid-template-rows` motion, exclusive grouping and automatic Wrapped detection for nested accordions (no `isWrapped` prop).

  Also aligns the Button/IconButton focus indicator with the Design System: a softened-accent `box-shadow` focus ring that stands off the button surface instead of a flat outline.
