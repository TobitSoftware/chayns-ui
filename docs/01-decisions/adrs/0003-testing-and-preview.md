# ADR 0003 — Testing, Preview and Release Intent

- Status: Accepted
- Date: 2026-08-21
- Scope: Milestone 1 verification

## Context

The first component must prove behavior, accessibility, preview, package and external-consumer contracts. Automated accessibility checks are necessary but cannot replace manual evidence.

## Decision

- Vitest 4, jsdom, React Testing Library and user-event cover component behavior.
- Consumer-style TypeScript fixtures cover positive and expected-error public type cases.
- Storybook `10.4.6` with `@storybook/react-vite`, addon-a11y and addon-vitest is the isolated preview and Chromium browser-test environment.
- Story a11y violations are errors. Manual keyboard, semantic/screenreader, focus, contrast, forced-colors, zoom/reflow, text-spacing and pointer-target review remains a release requirement.
- Package verification uses packed tarballs, publint, Are The Types Wrong, ESM smoke imports and an isolated Vite consumer.
- Tree-shaking checks inspect packed consumer metafiles and reject tests, stories, generators, tooling and bundled React.
- Changesets records release intent. Milestone 1 includes no publish workflow, registry token or automatic npm mutation.
- GitHub Actions runs the frozen full verification pipeline on Node 24.

## Consequences

Storybook is test and preview infrastructure, not the normative component specification. A green automated pipeline does not by itself satisfy the manual accessibility release gate.

## Rejected alternatives

- react-test-renderer: rejected in favor of DOM-observable behavior.
- The legacy Storybook test runner: rejected in favor of the supported Vitest browser integration.
- External visual-regression SaaS: rejected for Milestone 1; deterministic local Chromium artifacts are sufficient.
- A publish workflow: rejected until npm scope ownership and authorization are separately confirmed.
