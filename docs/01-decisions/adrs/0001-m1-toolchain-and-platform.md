# ADR 0001 — Milestone 1 Toolchain and Platform

- Status: Accepted
- Date: 2026-08-21
- Scope: Milestone 1 foundation and Button

## Context

Milestone 1 needs a reproducible modern React library toolchain without adding legacy output or a repository orchestrator. Registry metadata and official release documentation were checked on 2026-08-21.

## Decision

- Node.js `24.19.0` is the pinned development and CI runtime.
- pnpm `11.22.0` manages the workspace and lockfile; no task orchestrator is introduced.
- React and React DOM `19.2.8` are used for development. Core declares `react >=19.2 <20` as its only peer dependency.
- TypeScript `6.0.3` is used because the selected typed-lint stack supports TypeScript `<6.1`; TypeScript 7 is not selected for this milestone.
- Vite `8.2.2` and `@vitejs/plugin-react 6.1.0` provide the React build baseline.
- The browser contract is Vite 8's fixed Baseline Widely Available target: Chrome 111, Edge 111, Firefox 114 and Safari 16.4 or newer. No legacy plugin or polyfill bundle is supplied.
- Source uses the automatic JSX runtime and strict TypeScript library settings.
- Library modules must be import-time SSR safe and deterministic. They do not use DOM globals, effects, generated IDs or environment-dependent initial markup.

## Consequences

The package is modern-only and ESM-only. Consumers requiring React 18, CommonJS or older browsers are outside Milestone 1. Interactive consumers remain responsible for placing event-bearing usage inside their framework's client boundary.

## Rejected alternatives

- TypeScript 7: rejected for Milestone 1 because the selected typed-lint integration does not yet declare compatible support.
- npm or Yarn workspaces: rejected to keep one explicitly selected manager.
- Turbo or Nx: rejected because two packages and root tooling do not justify another orchestration layer.
- CommonJS and legacy-browser output: rejected by the confirmed distribution and compatibility decisions.

## Addendum (2026-09-14): loosened consumer compatibility range

Developer feedback questioned why `peerDependencies.react` and `engines.node` mirror the
development/CI baseline (React 19.2, Node 24) instead of a wider, minimally-required consumer
range, especially since no React 19.2-only feature (e.g. `useEffectEvent`, `Activity`, `ref` as a
plain prop) is used by Core or Layout components. Per PLATFORM-004 (UI Decision Register), the
development/CI baseline in this ADR is unchanged, but the **published** peer/engine ranges are
loosened to `react >=18 <20` and `node >=18`. Components that forward a `ref` (currently
`AppLayout`, `Tabs` in `@chayns-ui/layout`) keep `forwardRef` rather than the React 19-only
`ref`-as-prop pattern, since the range now includes React 18. Button and IconButton do not forward
a `ref` and are unaffected.
