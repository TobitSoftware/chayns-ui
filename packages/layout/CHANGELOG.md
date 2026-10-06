# @chayns-ui/layout

## 0.7.0

### Minor Changes

- 4f7302c: Add Breadcrumb, Pagination, Slider, Tooltip and decimal-capable Stepper with Bodywork-based selection guidance, native semantics and localized content contracts. Stepper precision defaults to integer operation.

  Expose enums for finite configuration values while retaining existing literal props and runtime lists. Add attached/underline Tabs appearances, automatic enabled-entry selection for Tabs and SegmentedControl, and independent exclusive state for nested Accordion groups.

  Correct native prop/ref forwarding, popup interactions and positioning, picker accessibility and formatting work, option identities, AvatarGroup truncation, status foregrounds and action focus shadows. Validate component documentation and configuration exports, and check every built Storybook story in Chromium and WebKit before publication.

  Provide linked Storybook usage guides that explain purpose, exclusions, genuine alternatives, complementary components, usage and important behavior. Correct selection guidance such as AccordionGroup as an Accordion companion, and keep machine-readable alternatives and combinations aligned. Establish reusable authoring rules and typecheck the public-import examples against package exports, including configuration enums; validate shared Docs and story links while retaining full implementation specifications. Demonstrate fixed underline tabs and consumer-owned optional addition/removal without introducing new configuration props.

  Keep exactly one Stepper icon weight visible when Font Awesome replaces icons with SVGs, including hover, active and disabled states.

  Apply the shared Regular/Solid icon rules consistently to owned controls, retain Regular informational glyphs outside the explicitly confirmed Card hover feedback and support individually imported component stylesheets. Reproduce the checked Bodywork 4px Card lift, exact easing/timing and Solid header icon with accent surface colors and scaling, without a press effect. Match Button and IconButton hover/press transforms and timings, share Button state styles across SplitButton halves, and add the 2px Badge lift with reference saturation and shadow. Disable decorative transforms and transitions under reduced motion while retaining immediate state feedback. Prevent decorative SVG icons from intercepting pointer hits so native press feedback works in WebKit.

### Patch Changes

- Updated dependencies [4f7302c]
  - @chayns-ui/core@0.10.0

## 0.6.3

### Patch Changes

- Require @chayns-ui/core 0.7.0 or newer.

## Unreleased

### Documentation and Story Changes

- Add a combined AppLayout and Tabs integration story covering navigation
  collapse and content switching.
- Move layout story geometry into shared Storybook fixtures.

## 0.6.2

### Patch Changes

- Restore the AppLayout and Tabs workspace visuals while retaining their compound-component APIs, native prop forwarding, keyboard navigation and accessibility relationships.

## 0.6.1

### Patch Changes

- Match Bodywork Tabs pill styling.
- Updated dependencies
  - @chayns-ui/core@0.4.2

## 0.6.0

### Minor Changes

- be6f8b1: Finalize native-prop forwarding and compound component contracts. Core adds
  TextField, TextArea, Checkbox, Switch, RadioGroup, SegmentedControl and
  Banner; `ListItem` is replaced by `List.Item`, and Popup uses
  Trigger/Content slots. Layout replaces the Tabs `tabs[]` API with value-based
  parts and replaces AppLayout data props with named compound parts. These
  intentional pre-1.0 breaking migrations require consumer updates.

### Patch Changes

- Updated dependencies [be6f8b1]
  - @chayns-ui/core@0.4.0

## 0.5.0

### Minor Changes

- Publish the current Layout release as version 0.5.0.

## 0.3.2

### Patch Changes

- 2b44f08: Refactor
- Updated dependencies [2b44f08]
  - @chayns-ui/core@0.3.1

## 0.3.1

### Patch Changes

- Fix layout stylesheet exports and Tabs content styling.

## 0.3.0

### Minor Changes

- Republish under version 0.3.0. The previous 0.2.0 publish attempt failed in CI
  because npm Trusted Publishing (OIDC) had not yet been configured for the
  `@chayns-ui/layout` package; only `0.1.0` ever reached the npm registry. No
  functional changes since 0.2.0 (AppLayout, Tabs) — this bump simply moves past
  the never-published 0.2.0 version and aligns with `@chayns-ui/core`/`@chayns-ui/tokens` at 0.3.0.

## 0.2.0

### Minor Changes

- Add the first release of `@chayns-ui/layout`: `AppLayout`, an application
  shell with a header logo, a collapsible sidebar of recursively nested
  navigation items and a consumer-owned content area; and `Tabs`, a tabbed
  layout pattern for switching between peer content regions with keyboard
  navigation and an optional add-tab trigger. Both are ESM-only with a single
  root JavaScript export and an explicit CSS export
  (`@chayns-ui/layout/app-layout.css`).

### Patch Changes

- Updated dependencies
- Updated dependencies
- Updated dependencies
  - @chayns-ui/core@0.3.0
