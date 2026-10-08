# @chayns-ui/core

## 0.11.2

### Patch Changes

- 15a4f0c: Round only the outer edge of the SplitButton menu trigger so it joins flush with the primary action.

## 0.11.1

### Patch Changes

- d3d0665: Keep the active Attached tab foreground near-white in dark and auto-dark mode, matching Underline without changing geometry or APIs.

  Show public component composition in Storybook usage code instead of render/play configuration or opaque example wrappers. Stateful examples include their complete hooks, initial data and handlers from the same source used to render the story. Keep interaction and accessibility tests intact. Remove standard visual and animation details from usage-specific documentation across components.

## 0.11.0

### Minor Changes

- 4bfd529: Enclose the wider 2px Tabs underline in a shorter, vertically centered keyboard focus ring ending at the line and use the semantic near-white active foreground in dark and auto-dark mode. Crossfade panels with 200ms exit and 220ms entry while keeping only the new view accessible. Keep the outgoing panel transparent until React removes it, preventing a flash at fade completion. Bound rapid switches to one outgoing panel and move the shared underline through transform without per-frame React updates. Honor live Reduced Motion changes and retain native part/ref ownership.

  Require explicit Accordion.Content for ordinary content in default and list appearances. Nested Accordions, AccordionGroups and Lists omit the additional wrapper; mixed padded content and nested siblings share one labelled panel without dropping siblings. Existing direct ordinary children need Content to retain their previous padding. Public props and static List.Item APIs stay unchanged.

## 0.10.0

### Minor Changes

- 4f7302c: Add Breadcrumb, Pagination, Slider, Tooltip and decimal-capable Stepper with Bodywork-based selection guidance, native semantics and localized content contracts. Stepper precision defaults to integer operation.

  Expose enums for finite configuration values while retaining existing literal props and runtime lists. Add attached/underline Tabs appearances, automatic enabled-entry selection for Tabs and SegmentedControl, and independent exclusive state for nested Accordion groups.

  Correct native prop/ref forwarding, popup interactions and positioning, picker accessibility and formatting work, option identities, AvatarGroup truncation, status foregrounds and action focus shadows. Validate component documentation and configuration exports, and check every built Storybook story in Chromium and WebKit before publication.

  Provide linked Storybook usage guides that explain purpose, exclusions, genuine alternatives, complementary components, usage and important behavior. Correct selection guidance such as AccordionGroup as an Accordion companion, and keep machine-readable alternatives and combinations aligned. Establish reusable authoring rules and typecheck the public-import examples against package exports, including configuration enums; validate shared Docs and story links while retaining full implementation specifications. Demonstrate fixed underline tabs and consumer-owned optional addition/removal without introducing new configuration props.

  Keep exactly one Stepper icon weight visible when Font Awesome replaces icons with SVGs, including hover, active and disabled states.

  Apply the shared Regular/Solid icon rules consistently to owned controls, retain Regular informational glyphs outside the explicitly confirmed Card hover feedback and support individually imported component stylesheets. Reproduce the checked Bodywork 4px Card lift, exact easing/timing and Solid header icon with accent surface colors and scaling, without a press effect. Match Button and IconButton hover/press transforms and timings, share Button state styles across SplitButton halves, and add the 2px Badge lift with reference saturation and shadow. Disable decorative transforms and transitions under reduced motion while retaining immediate state feedback. Prevent decorative SVG icons from intercepting pointer hits so native press feedback works in WebKit.

## 0.9.4

### Patch Changes

- 842c961: Fix ComboBox popup positioning, motion and overflow handling.

## 0.9.3

### Patch Changes

- Fix ComboBox popup positioning, motion and overflow handling.

## 0.9.2

### Patch Changes

- Release compatibility update for the semantic overlay z-layer and dialog/drawer backdrop token scale.

## 0.9.1

### Patch Changes

- Correct the large Avatar typography token.

## 0.9.0

### Minor Changes

- Add decorative Spinner and accessible Progress components.

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
