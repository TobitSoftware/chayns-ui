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
