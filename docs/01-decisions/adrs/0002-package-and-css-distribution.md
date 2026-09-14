# ADR 0002 — Package and CSS Distribution

- Status: Accepted
- Date: 2026-08-21
- Scope: Milestone 1 packages

## Context

The architecture requires independently distributable React/TypeScript and CSS artifacts. Core must remain side-effect free at JavaScript import time, and components may consume only resolved variables.

## Decision

- The public packages are `@chayns-ui/core` and `@chayns-ui/tokens`.
- Core is an ESM-only Vite library with preserved module boundaries, declarations, declaration maps, JavaScript source maps and explicit root plus `./button` entries.
- Core exports CSS explicitly as `./button.css` and `./styles.css`. JavaScript does not import or inject CSS.
- Tokens has no JavaScript runtime. A DTCG-shaped JSON source is transformed by a Style Dictionary-compatible generator into `baseline.css`; `patch.css` contains documented differences only and is empty in Milestone 1.
- Core package metadata marks only CSS artifacts as side effects and has no runtime dependencies.
- Consumers import resolved token CSS and component CSS explicitly.
- The default token artifact provides the evidenced light/dark and S/M/L mappings. Accessibility selectors only override values directly evidenced by the authoritative Design System. Arbitrary accent calibration remains outside this package.

## Public exports

`@chayns-ui/core` exports `.`, `./button`, `./button.css` and `./styles.css`. `@chayns-ui/tokens` exports `./baseline.css` and `./patch.css`.

## Consequences

CSS inclusion is deterministic and independently cacheable. Importing JavaScript alone has no styling side effect. The full Theme Resolver remains OPEN-009 and hosts may replace resolved custom properties without changing Core.

## Rejected alternatives

- Runtime CSS-in-JS and JavaScript-triggered CSS imports: rejected because they couple runtime code and styling.
- A monolithic bundle: rejected because explicit entries and preserved modules improve inspection and future tree shaking.
- Shipping an accent resolver: rejected because its algorithm and host integration remain open.

## Addendum (2026-09-14): automatic CSS loading investigated, not adopted yet

Developer feedback asked whether importing a component could also automatically load its CSS,
removing the need for a separate `import '@chayns-ui/core/button.css'` per component. This was
investigated and, per DIST-014 (UI Decision Register), the straightforward approach — a
side-effect `import './button.css'` inside the component source — was reproduced to break the
existing `verify-consumer` SSR contract: plain Node.js cannot import `.css` files
(`ERR_UNKNOWN_FILE_EXTENSION`), and `verify-consumer.mjs` runs the packed output with
`node src/ssr.mjs` without a bundler, per the import-time SSR-safety requirement in ADR 0001. The
explicit, side-effect-free CSS export model from this ADR therefore remains in effect (DIST-013)
until a concrete alternative distribution mechanism (e.g. bundler-only vs. Node-safe conditional
exports) is designed and confirmed as its own decision. This ADR is not superseded by this
addendum; it only records the investigated and rejected naive approach.
