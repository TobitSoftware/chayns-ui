# @chayns-ui/tokens

## 0.8.1

### Patch Changes

- 4f7302c: Add Breadcrumb, Pagination, Slider, Tooltip and decimal-capable Stepper with Bodywork-based selection guidance, native semantics and localized content contracts. Stepper precision defaults to integer operation.

  Expose enums for finite configuration values while retaining existing literal props and runtime lists. Add attached/underline Tabs appearances, automatic enabled-entry selection for Tabs and SegmentedControl, and independent exclusive state for nested Accordion groups.

  Correct native prop/ref forwarding, popup interactions and positioning, picker accessibility and formatting work, option identities, AvatarGroup truncation, status foregrounds and action focus shadows. Validate component documentation and configuration exports, and check every built Storybook story in Chromium and WebKit before publication.

  Provide linked Storybook usage guides that explain purpose, exclusions, genuine alternatives, complementary components, usage and important behavior. Correct selection guidance such as AccordionGroup as an Accordion companion, and keep machine-readable alternatives and combinations aligned. Establish reusable authoring rules and typecheck the public-import examples against package exports, including configuration enums; validate shared Docs and story links while retaining full implementation specifications. Demonstrate fixed underline tabs and consumer-owned optional addition/removal without introducing new configuration props.

  Keep exactly one Stepper icon weight visible when Font Awesome replaces icons with SVGs, including hover, active and disabled states.

  Apply the shared Regular/Solid icon rules consistently to owned controls, retain Regular informational glyphs outside the explicitly confirmed Card hover feedback and support individually imported component stylesheets. Reproduce the checked Bodywork 4px Card lift, exact easing/timing and Solid header icon with accent surface colors and scaling, without a press effect. Match Button and IconButton hover/press transforms and timings, share Button state styles across SplitButton halves, and add the 2px Badge lift with reference saturation and shadow. Disable decorative transforms and transitions under reduced motion while retaining immediate state feedback. Prevent decorative SVG icons from intercepting pointer hits so native press feedback works in WebKit.

## 0.8.0

### Minor Changes

- Add semantic overlay z-layer and dialog/drawer backdrop tokens.

## 0.7.0

### Minor Changes

- Add automatic color-mode tokens through the `theme-auto` class and type-safe CSS variable access.

## 0.6.1

### Patch Changes

- Add a Storybook accent color picker that applies the selected color through `applyTheme`.

## 0.6.0

### Minor Changes

- Add the framework-independent `applyTheme` API for globally configuring color mode, density, and accessibility mode.

## 0.5.0

### Minor Changes

- 153710d: Add DateTimePicker with controlled local date or time selection, cyclic wheel interaction and locale-aware formatting. Publish the `grey` and complete Accent primitive color scales.

## 0.4.0

### Minor Changes

- Publish the current success and warning background tokens required by status components.

## 0.3.0

### Minor Changes

- Add Popup and SplitButton components. `Popup` renders custom overlay content
  anchored to a trigger element; `PopupList` renders a list of contextual
  actions inside a `Popup`. `SplitButton` combines a primary action button
  with a secondary trigger that opens a `PopupList` of alternative actions.
  Adds the token foundation these components resolve against.

## 0.2.0

### Minor Changes

- 14b50ee: Establish the generated token foundation and publish the first native Button and IconButton contracts.
