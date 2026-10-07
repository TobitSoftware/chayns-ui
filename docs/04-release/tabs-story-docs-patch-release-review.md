# Tabs foreground and Storybook documentation patch — 2026-10-07

The previous Tabs/content release was merged in version PR #4. This follow-up
contains a patch changeset only: Core 0.11.0 → 0.11.1 and Layout 0.8.0 → 0.8.1.
Changesets status confirms these two patch releases; Tokens are unchanged.
The existing release workflow creates/updates the version PR after the consumer
pushes main. No push or publication is performed during this preparation.

## Behavior and compatibility

Active Attached tabs now use the existing semantic near-white `--text` foreground
in dark and auto-dark, matching Underline. Light mode retains `--accent`.
Inherited icons and currentColor decoration follow the foreground. The correction
adds no line, token, prop, geometry or interaction behavior.

Storybook usage source shows public JSX composition instead of CSF render/play
configuration. Stateful examples include React hooks, initial data and handlers
from the same public-import TSX files used directly as story render functions.
No opaque example wrapper is rendered. The editable Underline snippet applies its
actual appearance default to that shared source. Preview-only sizing is composed
through excluded decorators. Internal TabsIcon demo imports are removed; examples
use the smallest text-only public composition. Interaction and accessibility tests
remain active.

All component usage guides and stories were reviewed. Special notes retain
integration decisions, state ownership, composition constraints and meaningful
defaults; standard visual geometry and animation mechanics stay in specifications.
Tabs explains controlled initial/replacement selection, dynamic remove/add
ownership, stable values and keeping persistent state outside unmounted Panels.
The Card disableHover usage block now imports its public component explicitly.
Consumer APIs and package dependencies remain compatible.

## Validation

`corepack pnpm verify` passed: 199 unit tests, 90 Storybook interaction/a11y tests,
32 typed usage examples, 62 explicit component names and 11 enum/list pairs.
Lint, CSS, types, tokens, production distributions, tree-shaking and packed consumer
typecheck/build/SSR passed. All 90 static stories load in Chromium and WebKit.

Browser checks in Chromium and WebKit cover all 30 component Docs pages and 115
expanded usage source blocks: no exposed render/play configuration, opaque
TabsExample/counter wrappers or missing source. Stateful TSX examples also pass
workspace typechecking against their public imports. Both Tabs appearances retain
the confirmed foreground across S/M/L and light/dark/auto modes.

The Tabs specification and readiness assessment record the user-confirmed mapping,
existing Bodywork reference, state/token ownership and bounded acceptance scope.
The consumer documentation standard records the source-view and special-note
rules so future components follow the same conventions.
