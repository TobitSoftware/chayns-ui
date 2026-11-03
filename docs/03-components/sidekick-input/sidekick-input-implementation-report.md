# SideKick Input — Implementation evidence

Date: 2026-10-23. Scope: SIDEKICK-001–027, ADR 0004 and the three component-specific READY assessments.

Follow-up: [Live design recheck](sidekick-input-design-recheck.md) records the
user-reported default-feature and visual defects, ordinary-UI corrections, and
confirmed decisions for the updated dictation/default API. The original automated
results below do not establish visual fidelity or acceptance of that revision.

## Implementation

- Core exports RichTextEditor and MessageComposer, their engine-independent document/item APIs and configuration enums. Separate CSS exports and aggregate CSS are provided.
- Lexical 0.52.0 remains an internal adapter with exactly the three approved direct dependencies. Public declarations contain no engine state, HTML import or service integration.
- RichTextEditor supports controlled echoes, external replacements, native events/ref, plain-text clipboard/drop, atomic mentions, externally supplied queries/results, keyboard selection and selection-aware snippet insertion/history.
- MessageComposer owns all visible UI: configurable attachments/actions/prompts/snippets/selector, oneLine/twoLine arrangements, localized labels/status/errors and native dictation/voice capture.
- Dictation includes provisional/final results, explicit pause/resume/end, editor locking, capability checks, cleanup and a single undo transaction. Voice capture hands out a live MediaStream; the component owns track lifetime and mute while the consumer owns transport.
- SideKickInput in the new peer-only Business package renders MessageComposer only. Agent/model IDs are mapped without collisions. Sending snapshots the document, attachment IDs and selection before requesting a controlled clear. A revision latch blocks duplicate sends; retry persistence stays with the consumer.
- Business uses a workspace Core peer which is rewritten to the matching version when packing with pnpm. The release workflow must version Core and Business together; no publication or release approval is implied.
- SIDEKICK-027 records the accepted text-3 border correction. Existing theme/density/focus tokens are reused; scoped sk-* color tokens are transferred to explicit/automatic modes and public token typing.

## Automated evidence

| Check | Result |
| --- | --- |
| Workspace unit tests | 251 passed |
| New component Chromium stories, including axe checks | 29 passed |
| Build, TypeScript/public type fixtures, ESLint, CSS lint, formatting | Passed |
| Documentation / enum / displayName checks | Passed; 35 specifications and 38 typed Markdown examples |
| Package contents, publint, ESM type resolution | Passed |
| Packed React 18/19 production build and SSR | Passed |
| Button-only tree shaking and deterministic tokens | Passed |
| Full existing-component browser/static checks | Existing SearchBox accessibility failure / Popup WebKit navigation timeout described below |

Documentation-checker regression tests: 11 passed. Unit coverage is partial (83.7% workspace line coverage in the current run); the passing test count is not a claim of complete coverage. Browser interaction evidence is recorded separately.

Native Playwright typing, query activation, keyboard mention selection and atomic removal were additionally checked with Chromium and WebKit, using actual browser keyboard events.

Executable stories are provided under Core/RichTextEditor, Core/MessageComposer and Business/SideKickInput. They cover native event veto, atomic deletion, query selection, plaintext paste/cut, selection-aware insertion/undo, action menus, pending/disabled states, oneLine expansion without remount/focus loss, dictation pause/resume/finalization/undo, voice mute/end, agent/model selection, optimistic send and explicit draft restoration.

Unit coverage includes document validation/normalization/engine round trips, recognition result/session races and stop timeout, media permission/track ownership/late completion, capture cancellation and optimistic dispatch order/latching/snapshot detachment. Public TypeScript fixtures reject unmanaged HTML/content, local density and Business submit/selector overrides. Markdown usage examples typecheck against public exports.

Packed-consumer checks exercise editor/Business imports, both CSS artifacts, production bundling and SSR with React 19.2.8 and React 18.3.1. Package checks include tarball contents, publint and ESM declaration resolution for Business. The Button-only bundle check rejects retained Lexical/editor/composer code.

The complete workspace browser run also checks existing components. It currently reports an unrelated SearchBox RecipientSelection accessibility failure: aria-label on an i without a valid role, and text contrast below 4.5:1. Those existing design issues have not been silently changed as part of this component scope. The static Storybook check rendered all stories in Chromium; its WebKit pass encountered a navigation timeout in the existing Popup ActionList story. Neither failure is represented as a passing full-workspace verification.

## Visual/browser spot checks

Chromium screenshots were inspected for the complete composition, attachments/snippets, narrow layout and a dark narrow action menu. At 320 CSS px the checked examples have no horizontal page overflow; the action menu stays within the viewport. The complete composition's measured interactive targets are at least 24 CSS px (add/prompts/selector 28px, dictation 30px, snippet approximately 37px at M). Composer width caps at 960px. These spot checks do not replace the complete acceptance matrix.

## Remaining acceptance and release gates

The implementation is present and reviewable. Functional acceptance/release is not marked complete until the acceptance plan's manual evidence is available:

- Real browser/device microphone recognition, permissions, OS interruption and resumed capture; deterministic mocks cannot prove recognition-service/device behavior.
- Screenreader checks, complete keyboard review, supported browser matrix and actual 400% browser zoom / 200% text size / text-spacing matrix.
- Complete contrast/target verification across density, explicit/automatic light/dark, high contrast, forced colors and reduced motion.
- Final designer follow-up for the explicitly accepted functional-first audio, attachment, mention-result and snippet surfaces. Ordinary multiline transitions are now compared with the live reference in the user-review correction below; the complete visual acceptance matrix remains outstanding.

No tests are disabled or acceptance thresholds reduced to hide these obligations. Specifications retain READY lifecycle status while this acceptance evidence is pending; published exports and stories no longer use preimplementation metadata.

## Repository integration and exploration

GitNexus CLI was used because its MCP tools were unavailable. The index was refreshed with --index-only before exploration and again for implementation review. The graph found overlay/editor/capture, Core controls, packaging and AppLayout paths; findings were checked against source/tests. Some spurious call edges and missing constant/cross-language field inference limit the graph's value as dependency proof.

The full checks also exposed pre-existing compilation/lint issues: missing CSS module declarations, an unnamed inferred SearchBox story type, a DateTimePicker test using an unbound container, unused test bindings and AppLayout's mutable sidebar-render flag. Bounded fixes retain the existing UI/API; the existing AppLayout/DateTimePicker/Tabs tests continue to run. Generated GitNexus caches are excluded from formatting/linting.

Documentation tooling now distinguishes component exports from enum exports and checks new enums against compatible literal values without requiring a redundant new public list. Existing list compatibility checks remain enforced. Business is included in enum/displayName checks; Core's runtime allowlist is exactly the approved Lexical versions. ESNext.Disposable is a compiler declaration library needed by Lexical's internal types, not an added runtime polyfill.


## 2026-10-23 user-review correction

The live reference and the initial Storybook rendering were compared with
Playwright (typing, clearing, multiline input, add-menu/Escape and agent selection).
The missing default configuration and visual defects are recorded in the
[design recheck](sidekick-input-design-recheck.md); SIDEKICK-028–030 and shared
contract section 9 document the user's subsequent answers and the revised scope.

The correction implements default native dictation, optional language override /
HTML-lang/browser resolution, session discard with late-event/history protection,
X/microphone/check controls, primary listening and gray paused states. Voice is
hidden without a stream callback; that callback alone suffices for integration.
Consumer-owned state/end hooks remain available. All visible state UI stays in Core.

Ordinary geometry now matches the checked 98.39px reference height at M/960px.
Source-backed gaps, focus, icon/avatar geometry, menu grouping/selection, prompt
scrolling and ordinary measured height/FLIP transitions have been corrected.
Approved AA border/placeholder corrections remain. Business Default demonstrates
all ordinary controls and real browser APIs; Attachments exercises consumer file
selection, removal and sending. Recording/Paused explicitly simulate recognition.

Fresh verification for this correction:

- All 257 workspace unit tests passed (39 files); 35 targeted capture/Business unit
  tests include default language resolution and callback-only media integration.
- All 24 Composer/SideKickInput browser stories passed, including accessibility
  checks, cancel with late results and Undo/Redo, pause/resume/accept and attachment
  selection/removal/send. Recognition lifecycle tests use deterministic API doubles.
- TypeScript, public Core type fixtures, scoped ESLint/CSS lint/formatting,
  component checks and documentation checks passed; Core/Business builds passed.
- Direct Chromium and WebKit keyboard checks retain editor focus/content while
  expanding one-line input; reduced motion leaves no surface animation.
- Direct Chromium native getUserMedia with a synthetic browser microphone produced
  a live MediaStream, handed it to the consumer and ended its tracks on End.
  This uses the browser API, but is not a real microphone/recognition-service test.
- Direct Chromium checks confirmed default mic/voice visibility, Send replacement,
  functional popup selection/Escape, primary/gray dictation states and no horizontal
  page overflow at 320 CSS px. No page errors were observed in that check.

The original full-workspace browser/static limitations above were not reclassified
as passing. Real-device speech recognition, screenreader/complete AA acceptance
and the designer's remaining additional-state follow-up are still outstanding.

## Main-story correction — 2026-10-23

Core/MessageComposer:TwoLine now presents the complete Bodywork two-line example,
including functional consumer-owned files, prompts and selection. CompleteComposition
adds snippets to that same configuration. The first Business story forwards args
to its full example, allowing the existing dictation/voice props to be reviewed.
WithoutVoice demonstrates callback omission. Initial main stories stay in their
empty three-chip state; separate interaction stories exercise changes and sending.
Raw draft JSON is retained only in hidden test evidence outputs.

All 27 affected browser stories (Core 20 / Business 7), including axe checks, and
all 257 workspace unit tests pass. Token/Core builds, TypeScript, scoped ESLint,
CSS lint and formatting pass. Recognition lifecycle/recording/paused
stories now include the complete main-story controls. Native microphone recognition
and the outstanding manual/release matrix above are not represented as completed.

Direct Chromium and WebKit checks of both first stories confirm the 98.39px / 960px
surface, 12px/8px gaps, four menu actions and grouped context selection. After the
reference-derived resize transition settles, neither page overflows at 320px.
The native browser media check again delivered a live audio stream and ended its
tracks on End; reduced-motion and keyboard expansion checks passed in both engines.

The final source comparison corrected the menu's border-box width and k8 trigger
gap, and transferred the missing, already-specified --tint dependency using the
live applyTheme formulas. The check glyph now uses the source accent and size.
These bounded production CSS/placement/token corrections retain the existing
component API and the approved AA border/placeholder correction.

Air's embedded preview blocked the existing external Font Awesome/Roboto assets
with CORS errors. DOM interactions were checked there, and visual screenshots were
inspected in standalone Playwright with those assets loaded. This preview-host
limitation was not hidden or addressed through an unrelated font-loading change.


## 2026-10-26 quality correction

The [quality audit](sidekick-input-quality-audit.md) supersedes earlier test counts
for the affected current state: 257 workspace unit tests and 42 editor/composer/
Business browser stories pass. It records stable interruptible action slots,
source hover and geometry corrections, reduced layout work, reversible multiline
motion, narrow translated-label reflow and focus restoration. Additional native
Chromium/WebKit and 36 scoped axe/target matrix checks pass. The source/token
mapping, functional-first scope and manual release gates remain unchanged; this
is measured implementation evidence, not a blanket pixel/AA certification.
