# Tabs and content-spacing release review — 2026-10-07

The previous foundation release was merged in version PR #3. This follow-up uses a
new changeset: Core 0.10.0 → 0.11.0 and Layout 0.7.0 → 0.8.0. Tokens are unchanged.
After the consumer pushes these commits to main, the established Changesets
workflow creates/updates the next version PR. No push or publication is performed
as part of this preparation.

## Behavior and compatibility

Tabs uses the supplied 2px underline at `--k6`, with a shorter centered keyboard
focus ring ending at the line and near-white `--text` in dark/auto-dark mode.
The confirmed 200ms exit / 220ms entry crossfade keeps at most one outgoing panel inert, aria-hidden and untabbable; only
the new view is accessible. The transparent exit endpoint remains until React
unmount, preventing an opacity reset/flash; reactivation starts at the currently
rendered opacity, including finished exits. A shared line moves through transform
only. Geometry measurements are event-driven, with no per-frame React state.
Public props stay compatible; inactive content still unmounts after the bounded exit. Reduced Motion
switches immediately, including preference changes during a running animation.

The user clarified that the content-spacing request targets Accordion's list
appearance, not a new static List.Item API. Ordinary content now explicitly uses
Accordion.Content. Nested Accordions, groups and lists omit the extra inset,
including mixed siblings beside ordinary Content. One labelled region/native ref
owner remains. Stories and usage examples show the corrected composition.
This intentionally changes the appearance of ordinary direct children: consumers
wrap them in Accordion.Content to preserve previous padding. No prop is removed.
The specification records the user exception to Bodywork's nested parent inset.
The pre-stable minor version follows the existing migration/release policy.

## Validation

`corepack pnpm verify` passed: 196 unit tests, 89 Storybook interaction/a11y tests,
31 typed usage examples, 62 explicit component names and the unchanged 11 enum/list
pairs, plus lint/types, deterministic tokens, distributions, tree-shaking and the
packed consumer typecheck/build/SSR. All 89 static stories load in both engines.

Additional Chromium/WebKit checks cover opacity/transform ownership, bounded exit
lifetime, inert/ARIA, first/last focus bounds across S/M/L, light/dark/auto modes,
resize/scroll, rapid selection and live Reduced Motion. Additional native-animation
checks confirm an exit remains at opacity 0 before React removes it. Frame sampling
in both appearances and forward/backward directions found no rising outgoing
opacity; symmetric block focus insets end at the line across S/M/L. Lifecycle tests
include completion/cancellation, finished-exit reactivation, StrictMode, native ref
cleanup, invalid initial selection and absence of observer frame loops without
enabled tabs. Story interaction tests await actual panel completion before their
final-state contrast audit. Accordion browser checks cover explicit ordinary/list insets, mixed siblings, unpadded wrapped/group
placement and single native panel semantics.

The component-specific specifications/readiness assessments record the checked
Bodywork reference (2026-10-07), user decisions, token mapping, native ownership,
Reduced Motion rules, story evidence and acceptance criteria. Existing full-release
manual screenreader/theme/reflow review requirements remain applicable.
