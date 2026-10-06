# Component foundation release review — 2026-10-06

The release adds Breadcrumb, Pagination, Slider, Tooltip and Stepper, exposes
configuration enums without breaking existing literal props, and adds underline
Tabs while keeping attached Tabs as the default. It also repairs native props/refs,
state handling and documented component audit findings. Stepper precision defaults
to 0; decimal operation supports 0–6 places. Tabs and SegmentedControl automatically
propose the first enabled entry, while controlled consumers confirm it.

## Changesets plan

| Package | Current | Planned | Change |
|---|---|---|---|
| @chayns-ui/core | 0.9.4 | 0.10.0 | Minor |
| @chayns-ui/layout | 0.6.3 | 0.7.0 | Minor |
| @chayns-ui/tokens | 0.8.0 | 0.8.1 | Patch |

The release changeset follows the established two-stage workflow. When it reaches
main, Changesets updates the version PR and changelogs. Merging that version PR
publishes the packages; this preparation does not run npm publication.
[Version PR #3](https://github.com/TobitSoftware/chayns-ui/pull/3) was rechecked on
2026-10-06 after the changeset reached main. Its release description now includes
Core 0.10.0, Layout 0.7.0 and Tokens 0.8.1, matching the plan above.

## Validation and remaining review

`corepack pnpm verify` passed: 185 unit tests, 89 Storybook interaction/a11y tests,
31 specifications and concise usage guides, 61 explicit component names, 11 enum/list pairs, lint/types,
deterministic token generation, distribution checks, tree-shaking and packed
consumer typecheck/build/SSR. All 89 static stories load in Chromium and WebKit.
The guides render their six consumer sections on all 29 shared documentation pages;
cross-component navigation was checked in the rendered Storybook. Underline Tabs
now demonstrates both fixed entries and working optional add/remove composition.

The icon-rule follow-up reuses the existing renderer for Stepper and consistently
switches owned action glyphs to Solid on enabled hover/active, while informational
glyphs stay Regular. SVG replacement and native control states were checked in
Chromium and WebKit, including PopupList portal content. Individual component CSS
imports retain their shared icon dependencies. Card now combines its hover shadow
with the confirmed 1px lift; Reduced Motion suppresses the decorative movement.
The static import verifier isolates pages to avoid attributing cancelled requests
from a previous story to the next one. Full verification remains green.

Before merging the version PR, complete the manual screenreader, visual/theme/
density, zoom/reflow and pointer release checks. The automated checks do not
substitute for that evidence. Safari currently works according to the user; no
root cause or verified fix is claimed for the earlier intermittent import issue.
The [audit results](../03-components/component-audit-results-2026-10-06.md) record
scope, compatibility and remaining release evidence.
