# SideKick Input scope — Component Implementation Readiness Gate

- Gate Result: **READY**
- Checked: 2026-10-22
- Scope: Core RichTextEditor, Core MessageComposer, Business SideKickInput
- Product / scope decisions: SIDEKICK-001–026; editor boundary ADR 0004
- Open implementation blockers: **0**
- Specifications: [RichTextEditor](../rich-text-editor/rich-text-editor-specification.md),
  [MessageComposer](../message-composer/message-composer-specification.md),
  [SideKickInput](sidekick-input-specification.md)
- Normative shared contracts: [technical/API](sidekick-input-contract-review.md),
  [visual/token mapping](sidekick-input-visual-contract.md),
  [test/story acceptance plan](sidekick-input-acceptance-plan.md)

## Confirmed review outcome

On 2026-10-22 the user answered both structured questions:

- **R-01: Rahmen übernehmen.** SIDEKICK-025 accepts the exact technical/API,
  distribution, event/state/interaction and preimplementation evidence frame.
- **R-02 / V-01: Funktional zuerst.** SIDEKICK-026 extends functional-first treatment
  to mentions/results, attachment items and the snippet strip, including documented
  AA corrections. Existing audio authorization SIDEKICK-012 remains in force.

These are accepted decisions, not unresolved TECH/DESIGN REVIEW items. No additional
confirmation is needed within their scope. Final designer treatment is a later
visual/release obligation; WCAG 2.2 AA and functional acceptance are not deferred.

## Component-specific authorization

| Component | Category/package | Gate | Bounded authorized work |
| --- | --- | --- | --- |
| RichTextEditor | Core / @chayns-ui/core | READY | Controlled structured document, internal Lexical adapter, atomic mentions/results, selection/clipboard/history, native props/ref, editor semantics and tests. |
| MessageComposer | Core / @chayns-ui/core | READY | Complete source-backed composer UI, accepted functional-first additions, declarative items/selection/actions, native capture and cleanup, tokens/CSS and tests. |
| SideKickInput | Business / @chayns-ui/business | READY | Core-only composition, identity mapping and optimistic snapshot/clear orchestration; peer-only package and integration tests. |

The acceptance plan records the direct Lexical 0.52.0 allowlist and actual researched
transitive graph. The scoped implementation includes token transfer, CSS artifacts,
package/consumer/story integration on the current infrastructure. No service SDK,
voice transport, arbitrary editor formatting, new global theme input, extra public
Compound Parts or unrelated component variant is authorized.

## Gate checks

PASS below means the requirement is specified and accepted for implementation.
It does **not** mean a not-yet-existing runtime or manual test has passed.

| Check | Result | Evidence |
| --- | --- | --- |
| Specification exists and status | PASS | Three normative READY specifications; accepted R-01/R-02 outcome. |
| Confirmed decisions and responsible review | PASS | SIDEKICK-001–026, ADR 0004, recorded user answers. |
| Purpose/category/use/not-use boundaries | PASS | Generic editing/composition versus AI context/send orchestration; no service ownership. |
| Anatomy/composition/Context | PASS | Minimal direct API, named item content and wrapper target; no artificial Parts or public Context. |
| Native semantics/DOM/ref/props | PASS | Editable div primary control, native action buttons, Core-owned lists/menus; ordinary ref versus commandsRef/rootProps. |
| API/defaults/value validity/event composition | PASS | Exact types, exclusions, defaults, query identities and consumer/default event behavior in technical contract. |
| Variants/local size | PASS | Only oneLine/twoLine layout; no new local S/M/L size API. |
| State/priority/controlled/persistence | PASS | Complete capture/pending/disabled/readOnly priority and external/local ownership matrix. |
| Editor/mention/clipboard/history/IME | PASS | Atomic edits, plaintext transfer, controlled echo/reset, composition Enter and send-history boundaries. |
| Keyboard/focus/ARIA | PASS | Textbox/listbox/menu/radio semantics, navigation, dismissal, portal Tab flow, hidden/removed-action focus and no trap. |
| Labels/status/error/localization | PASS | Complete resolved text contracts, external speech language and errors; no internal translation/locale guess. |
| Tokens/foundation transfer | PASS | Checked source values and accepted mappings; required new sk tokens explicitly transferred in scope, not guessed. |
| Density/theme/type/geometry | PASS | Existing global scales, source dimensions, alpha surfaces and accepted visual exceptions; no font loading. |
| Contrast/targets/forced colors/zoom/reflow | PASS | Explicit measurable AA acceptance; corrections authorized, failed actual checks block completion. |
| Motion/Reduced Motion | PASS | Exact source transitions/height exception plus disabled decorative motion; no new capture animation. |
| Responsive/container/overflow | PASS | Width/growth/ten-line scroll, narrow fallback, popup collision, long content and correct DOM order. |
| Async/error/capture/races | PASS | Query generation IDs, recognition final/interim/pause/end, permission races, stream ownership/mute/cleanup and consumer transport. |
| Optimistic send/retry | PASS | Detached snapshot before controlled clear, duplicate revision latch, external retention/retry and no overwrite of a new draft. |
| Platform/dependency/distribution | PASS | Bounded Lexical exception, published metadata/types and graph, Core/Business direction and mandatory SSR/React/package checks. |
| Performance/escape hatches/non-goals/AI usage | PASS | No engine recreation on echoes, no selection-only emissions, frame-coalesced positioning; allowed overrides and forbidden assumptions explicit. |
| Test and visual acceptance | PASS | Unit/browser/type/package/mode/contrast/device/manual matrix in the acceptance plan. |
| Bodywork and Storybook evidence phase | PASS | Verified source/reuse evidence below and approved preimplementation plan per SIDEKICK-025; no invented executed stories. |
| Documentation tooling | PASS | Scoped plan metadata and Business schema support; actual implementation checks retained and regression-tested. |
| Decision-free implementation within scope | PASS | No remaining product/API/design/foundation interpretation blocker; new discoveries still stop their affected step. |

## Reference / evidence record

- Bodywork: Muster / KI & Sidekick, sidekick-input, checked 2026-10-22. Live HTML/CSS
  retrieved again and hashes matched earlier analysis. Exact selectors/token values
  and density/motion mappings are in the visual contract. Figma was not inspected.
- Checked reference states: empty/filled, oneLine/twoLine, focused, prompt activation,
  agent/add menus and Escape, long-text growth, 375px viewport; source dark/high-
  contrast selectors and Reduced Motion rules. These are reference checks only.
- Checked existing Core sources: TextArea, SearchBox, Popup/PopupList and positioning,
  Button/IconButton/Avatar/Spinner patterns and token artifacts. GitNexus findings
  were verified against code; misleading/missing graph edges remain limitations.
- Reuse Storybook exports verified to exist: Core/SearchBox:RecipientSelection,
  Core/Popup:ActionList, Core/Popup:KeyboardNavigation, Core/Avatar:Initials and
  Core/Avatar:WithImage. These demonstrate their existing contracts only.
- New component stories/runtime/device/manual evidence: **not yet available**.
  The explicit SIDEKICK-025 preimplementation exception requires the concrete plan
  now and actual evidence with implementation. No microphone/service was activated.

## Documentation verification

The docs checker validates the existing actual public examples and stories, plus
three explicitly approved preimplementation plans. New examples are syntax/import
checked only until their public exports exist; the output distinguishes those phases.
A public implementation/implemented status cannot keep plan-only evidence. Regression
fixtures exercise approved/unapproved/missing plans, syntax/private imports/error
suppression, public-export graduation and actual implemented-example type failures.

Two pre-existing independent example fences (Badge and DateTimePicker) lacked their
own public imports and failed the unchanged strict example rule. Those documentation
examples were corrected; no component API or runtime was changed. Final verification results:

- Documentation checker: PASS — 35 specifications, 35 existing public typed examples,
  actual existing story references and 3 approved preimplementation plans.
- Documentation-checker regression fixtures: PASS — 11 tests, including retaining
  actual typechecking for implemented components and rejecting plan-only exports.
- ESLint and Prettier on changed tooling: PASS, zero warnings.
- Contract declaration consistency: PASS — six TypeScript blocks compiled in memory
  against current React/native types; this is not a future public-export test.
- Local scope links: PASS — 37 targets across 15 specification/contract/ADR documents.
- Git diff whitespace check: PASS.

No UI runtime/build/device tests were run because no UI implementation or package
configuration changed. Their required acceptance remains in the plan.

## Remaining obligations after READY

- Implement only the accepted contracts and run the mandatory actual test/story/type/
  package/consumer/SSR/tree-shaking and manual keyboard/screenreader/device checks.
- Remove preImplementation metadata when public code/evidence is present; do not
  leave syntax-only examples in an implemented component's documentation.
- Complete designer review of the explicitly provisional additional visuals before
  claiming final visual or release approval. Do not defer a functional or AA failure.
- Stop/document/clarify any new implementation-discovered ambiguity; READY is not
  permission to invent APIs, tokens, formats, states or service behavior.

This assessment completes the requested specification/READY task. It does not start
production implementation, install dependencies, change token output or publish code.
