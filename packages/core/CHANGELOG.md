# @chayns-ui/core

## 0.8.0

### Minor Changes

- Add the Skeleton loading-state component and improve the deterministic avatar initials color fallback.

## 0.7.0

### Minor Changes

- 153710d: Add DateTimePicker with controlled local date or time selection, cyclic wheel interaction and locale-aware formatting. Publish the `grey` and complete Accent primitive color scales.
- 83e6c9e: Complete the Bodywork component rework baseline with Banner, native ownership and
  ref forwarding improvements, supporting form descriptions, and accessible
  ComboBox option interaction.

## 0.6.0

### Minor Changes

- Add the Bodywork-aligned `Banner` component with localized close labels and
  controlled or uncontrolled visibility.
- Complete native ref and event ownership for core controls, add supporting
  descriptions to Checkbox, RadioGroup and Switch, and align Accordion leading
  content and ComboBox option keyboard semantics.
- Centralize Storybook fixtures and document the current ComboBox, Badge,
  password-field and Banner contracts.
- Extend Button and IconButton with FontAwesome Brands icon support.
- Add Bodywork-aligned Button and IconButton loading states with stable labels,
  accessible busy semantics and native disabled behavior.

## 0.5.0

### Minor Changes

- Align implemented core components with the Bodywork Design System. This adds the Bodywork avatar size contract, native Avatar and AvatarGroup props and refs, visible ComboBox multi-select checkboxes, and Bodywork list preview behavior. Badge is now a static status component; its removable API has been removed in favor of a separately specified interactive chip or tag contract.

## 0.4.2

### Patch Changes

- Align TextField and TextArea with Bodywork by reintroducing a floating label rendered from the native `placeholder` prop, matching Bodywork focus/filled states and label contrast.
- Add a sliding indicator to SegmentedControl and match Bodywork button transitions.

## 0.4.1

### Patch Changes

- Use native TextField and TextArea placeholders without a floating-label overlay. The former `label` prop is removed; use compatible `aria-label` or `aria-labelledby` props for accessible names.

## 0.4.0

### Minor Changes

- be6f8b1: Finalize native-prop forwarding and compound component contracts. Core adds
  TextField, TextArea, Checkbox, Switch, RadioGroup, SegmentedControl and
  Banner; `ListItem` is replaced by `List.Item`, and Popup uses
  Trigger/Content slots. Layout replaces the Tabs `tabs[]` API with value-based
  parts and replaces AppLayout data props with named compound parts. These
  intentional pre-1.0 breaking migrations require consumer updates.

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
