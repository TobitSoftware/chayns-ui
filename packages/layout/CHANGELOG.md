# @chayns-ui/layout

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
