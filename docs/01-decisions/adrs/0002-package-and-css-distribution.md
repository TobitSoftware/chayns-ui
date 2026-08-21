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
