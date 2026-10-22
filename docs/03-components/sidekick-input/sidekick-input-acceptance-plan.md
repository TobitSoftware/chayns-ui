# SideKick Input — implementation acceptance plan

Date: 2026-10-22. Status: **planned, not executed**. This plan is shared by the
RichTextEditor, MessageComposer and SideKickInput specifications. It is not a claim
that tests, stories, microphone capture or accessibility checks have passed.

## Test ownership and meaningful acceptance

| Owner | Acceptance cases | Required evidence during implementation |
| --- | --- | --- |
| Document adapter | Empty document, normalization, CRLF, spaces/breaks preserved, repeated mentions, invalid versions/nodes/IDs/labels, text projection, detached payloads and round trip | Unit tests exercising the public contract, including adversarial HTML-looking labels. |
| RichTextEditor | Real insertion/replacement, selection preservation on controlled echo, external reset, atom arrow/deletion/range replacement, Undo/Redo, snippet insertion, paste/copy/cut/drop, last selection fallback | Browser interaction tests against actual Lexical DOM/model; jsdom alone is insufficient. |
| Mentions | @ boundaries including email/Unicode, empty query, query ID changes/stale results, keyboard/pointer selection, selected-range replacement, no auto-conversion, loading/error/no-result announcements, focus and blur | Controlled Storybook harness and tests with out-of-order mocked consumer responses. |
| Native events/refs | Direct props/ref on editable, rootProps/ref on outer wrapper, merged describedby, cancelable consumer keyboard/default behavior, beforeinput agreement, disabled/readOnly and no double invocation | Runtime browser tests plus public TypeScript tests against emitted declarations. |
| Composer layout/actions | oneLine/twoLine, true text wrapping, ten-line overflow, external prompts/actions/removal, snippets replacing saved selection, attachment-only opt-in, selector absent/present, all groups and selected value outside recents | Browser stories and interaction assertions; test controlled updates, not only callback spies. |
| Menus | Enter/Space/arrows/Home/End/typeahead, selected radio semantics, disabled skipping, Escape/Tab/outside dismissal and focus, trigger removal, one popup, portal geometry/scroll/resize/visualViewport | Browser keyboard/position tests; regress existing Popup defaults. |
| Optimistic send | Pointer/Enter parity, immutable full snapshot, exact callback order, immediate clear, duplicate revision latch before pending arrives, new draft while pending, prompt distinct from send, async failure retained by consumer, explicit retry restore and history boundary | Business integration harness with simulated failure and subsequent new typing; no real network. |
| Composition/IME | Enter that ends IME never sends/selects, interim composition not queried, Shift+Enter, platform history, readOnly capture locks, native spellcheck | Browser automation with composition events plus manual real IME verification. Synthetic events alone do not prove OS IME behavior. |
| Dictation | Support/prefixed detection, no mount prompt, external language, live provisional replacement without duplication, multiple finals, pause/stop/end ordering, paused lock, resume end, natural onend, timeout, errors, generation cleanup, disable/language/value changes | Deterministic fake SpeechRecognition with deliberately late/out-of-order callbacks. Manual supported-browser capture with permission denial and final-result checks. |
| Voice | Unsupported/insecure context, request rejection, permission pending/end/unmount, late success track cleanup, stream handed out once, external connecting/connected/idle/error, mute track.enabled, track ended, throwing callback, once-only onEnd | Fake mediaDevices/MediaStream tracks with cleanup assertions plus manual real microphone test. Do not request device permission in automated CI or on story load. |
| Mutual exclusion | Cannot overlap Voice/dictation, pending request counts as active, all editor mutations locked while capture active/paused, ending restores correct focus | Cross-feature browser tests and fake-capture stories. |
| Localization/content | All visible/accessible strings external, no language inference, full labels despite short display, long labels/Unicode/bidi, no locale sorting or sentence fragments | Non-German long-content stories and names/description assertions. |
| Accessibility | Semantics, names/states, no hidden focus stops, live mode/error status once without reading syllables, logical DOM/focus order and no trap, portal relations | Axe as error plus manual keyboard and screenreader matrix. Passing axe alone is insufficient. |
| Visual/tokens | Source-backed geometry, token transfer/mode mappings, minimum targets, alpha surface contrast, focus and forced colors, density, zoom/reflow, Reduced Motion | Token output tests, screenshots and contrast/target measurements with recorded backgrounds. |
| Distribution | Node SSR import with no DOM/CSS/audio access, React 18/19 types/runtime, direct Core/Business declarations/exports, explicit CSS artifacts, unrelated Button import does not retain Lexical, packed consumer | Existing package/consumer/type/tree-shaking tooling extended to the bounded new scope; no new build system. |

## Planned Storybook catalogue

These names are planned exports, **not existing story links**. Reuse existing
`args` for simple leaf cases, `render` for controlled composition, and `play` only
for interactions. Query canvas with within(canvasElement), portal content through
document.body. Consumer source uses public imports and shows the actual hooks/data.

| Planned page | Planned stories |
| --- | --- |
| Core/RichTextEditor | Basic, AtomicMentions, MentionQueryRace, SelectionAndSnippets, PlainTextClipboard, HistoryAndExternalReset, ReadOnlyAndDisabled, LongLocalizedContent |
| Core/MessageComposer | TwoLine, OneLine, MultilineOverflow, PromptActions, AttachmentsAndSnippets, GroupedSelector, MenuKeyboard, DictationLifecycle, VoiceLifecycle, UnsupportedCapture, CaptureErrors, ThemesAndDensity, ReducedMotion, NarrowAndZoom |
| Business/SideKickInput | ControlledSend, OptimisticFailureAndRetry, NewDraftWhilePending, AgentsAndModels, ExternalMenuActions, ConsumerVoiceConnection |

Capture stories start with deterministic mocks. Mocking is visibly documented as
Storybook scaffolding, not part of the public component API. Real native capture
requires an explicit user action in a separate manual check; do not install browser
API replacements globally for unrelated stories or exercise real Sidekick endpoints.

## Manual matrix and release boundary

Record browser/OS, date, assistive technology/version and results for keyboard-only,
NVDA with a supported Windows browser, and VoiceOver with Safari; verify mention
reading, caret/deletion, listbox active option, radio menus, mode/error messages,
capture permission dismissal and restored focus. Verify native dictation where
available and hidden unavailable controls in browsers without recognition support.
No claim of universal recognition/browser/offline support is permitted.

Check light/dark, each S/M/L, high contrast/forced colors, color-deficiency modes,
Reduced Motion, 320px available width, 200% text size, 400% zoom and text spacing.
Record actual text/control contrast and effective pointer hit areas in each relevant
state. A failed AA check blocks completion even in functional-first visual scope.

Functional completion requires the agreed behavior, unit/browser/type/package
checks and manual evidence. Final audio/attachment/mention/snippet design remains
subject to the accepted visual exception and designer follow-up; functional completion
must not be labelled final visual approval or release readiness.

## Documentation tooling prerequisite

The current validator assumes an implemented public import and at least one actual
story even for a new preimplementation component (it unconditionally requires a
usage import and typechecks all examples). This conflicts with specification-first
authoring when no public implementation exists. Accepted bounded resolution (SIDEKICK-025):

- Draft/blocked documents may carry clearly labelled planned examples/stories without
  attempting imports of nonexistent components.
- A preimplementation READY record must contain an explicit acceptance/story plan
  and source/reuse evidence; it must not invent executed stories. SIDEKICK-025
  explicitly accepts this form of preimplementation evidence for this scope.
- Implemented components continue to require actual public imports, typechecked
  examples, real story exports and usage-guide imports. Existing checks are preserved.
- The metadata schema recognizes the Business package accepted by SIDEKICK-025. These are accepted documentation lifecycle changes (SIDEKICK-025),
  not permission to weaken tests/accessibility or add production components early.

This adjustment was accepted in R-01 (SIDEKICK-025). The checker requires a confirmed
decision and nonempty referenced plan and rejects planned evidence for implemented or
already exported components. Existing implementation evidence checks remain mandatory.

## Research evidence and limitations

GitNexus was refreshed with --index-only before exploration. The graph located
PopupList/useOverlayPosition/SearchBox/Avatar/ButtonIcon and package verification;
findings were checked against source/types/CSS. A spurious PopupList-to-Accordion
path and missing constant-export call edges mean graph paths are not accepted as
dependency proof. Cross-language field warnings remain analyzer limitations.

Metadata/types research selected lexical, @lexical/plain-text and @lexical/history
0.52.0 as direct Core dependencies. registerPlainText, registerHistory and
createEmptyHistoryState were verified in the published .d.ts files. All are MIT;
their optional TypeScript peer >=5.2 includes the workspace compiler. They introduce
no React/ReactDOM peer. Existing React 18–19 compatibility still requires packed
consumer verification; absence of a peer is not runtime proof.

The reachable Lexical modules at 0.52.0 include internal, utils, dragon, clipboard,
extension, selection, html and list, in addition to the three direct packages.
Non-Lexical transitive requirements include @preact/signals-core ^1.14.4 and
@types/trusted-types ^2.0.7. Preserve exact resolved lockfile versions during
implementation and review any change to this graph. The presence of html/list
helpers does not enable public HTML paste or list formatting. No @lexical/react,
Yjs, service SDK or icon package is selected. Package metadata does not declare a
Node engines range; do not interpret that absence as tested Node/browser support.

The scoped Core manifest allowlist is exactly the three direct package names at
0.52.0. Externalize their module boundaries in the preserved-module build, verify
SSR imports and ensure tree shaking removes the editor for unrelated component use.
If actual integration requires an additional direct module or a different version,
update/review the technical contract under the accepted Lexical boundary before
installing it. No dependencies or lockfile changes were made during specification.
