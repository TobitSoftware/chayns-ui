# SideKick Input — technical proposal

Date: 2026-10-22. Status: **ACCEPTED; see normative specifications**.

SIDEKICK-001–026 are confirmed. Lexical is selected, paused dictation remains locked,
and the user has accepted the full technical/distribution/evidence frame and bounded
functional-first visual additions. This document preserves the editor alternatives
and rationale; the [accepted contract](sidekick-input-contract-review.md), component
specifications and [READY assessment](sidekick-input-readiness-assessment.md) govern
implementation. ADR 0004 records the bounded runtime-dependency exception.

## Chosen public content boundary

The user delegated the appropriate content format (SIDEKICK-016). Use a versioned,
serializable document instead of HTML or an engine-specific public EditorState.
The following shape describes that technical choice; exact exported TypeScript
names belong in the component specifications:

```json
{
  "version": 1,
  "content": [
    { "type": "text", "text": "Bitte frage " },
    { "type": "mention", "id": "agent-42", "label": "Support" },
    { "type": "lineBreak" },
    { "type": "text", "text": "nach dem aktuellen Stand." }
  ]
}
```

Mention IDs are opaque consumer identities. Rendering adds mention presentation;
labels/IDs are not interpreted as HTML. An adapter maps between this document and
internal editor state. Normalization, validation and plain-text projection must be
specified and tested; no engine runtime object escapes through the consumer API.

This permits changing the editor engine without migrating application data and
retains identity across serialization, retry and controlled value replacement.
It does not authorize arbitrary rich formatting: only text, breaks and mentions
are in the confirmed first scope.

## Editor engine options

### A — Lexical-backed Core editor (selected)

Use Lexical internally behind the document adapter. Its documented token-mode text
nodes are immutable and deleted as a whole, matching the mention requirement.
The engine also supplies selection, editing and history facilities. Compose only
needed packages and restrict features/imported contents to the confirmed scope.
Prefer the framework-independent engine with a focused React lifecycle adapter
if that covers the requirements without reimplementing editing behavior. Do not
add the full React plugin collection merely for the wrapper; verify the minimal
module set and transitive dependencies before installation.

References checked 2026-10-22:

- [Lexical nodes](https://lexical.dev/docs/concepts/nodes), particularly token mode.
- [Lexical React integrations](https://lexical.dev/docs/react/plugins), text editing
  and history; current documentation recommends extensions where available.
- [Lexical serialization](https://lexicaljs.com/docs/serialization/), internal state
  serialization and clipboard interchange. Public application data stays adapted.

Accepted repository decision: ADR 0004 provides a bounded exception to ADR 0002's
no-Core-runtime-dependencies rule. List/pin the selected editor packages and required peer ranges
in the implementation specification and lockfile. Change package validation to an explicit allowlist for
that scope; retain the documented conditional CSS contract (DIST-015), explicit CSS artifacts, SSR safety,
tree-shaking and the existing React consumer compatibility checks. No dependencies
have been installed at this stage.

### B — Separate editor package in the logical Core layer (not selected)

Keep the existing Core package dependency-free and introduce a separate generic
Core editor/composer package that owns the editor dependencies. Business composes
that package and existing Core controls. This preserves the current Core manifest
contract but introduces an additional public package and explicit CSS distribution.
It needs a confirmed package/dependency map; Core must not acquire a dependency on
Business or create a cycle through the new editor package.

### C — Maintain a dependency-free editor implementation (not selected)

Keep the current runtime dependency policy. The library then owns editing, atomic
selection/deletion, browser history, clipboard, IME, controlled reconciliation and
accessibility behavior without an editor engine. This is a substantially larger
implementation/maintenance scope than the original textarea reference. It must be
specified and tested as such; do not silently replace an editor engine with an
untested contenteditable wrapper.

## Core and Business implementation map

With the selected engine boundary:

- Generic editing, atomic mention interaction, suggestion UI, complete composer
  surface, action chips, attachment-item presentation, focus and keyboard handling
  belong to the logical Core layer. Exact names/APIs are fixed in the accepted contract.
- Native dictation and microphone capture use browser APIs with lifecycle cleanup.
  They do not fetch business data or connect to Sidekick services.
- SideKickInput maps external agents, recents, prompts, menu actions and attachments
  to Core UI. It reports consumer actions and performs optimistic editor clearing.
- A physical Business package does not yet exist. Accepted distribution is
  `@chayns-ui/business`, following the existing workspace's package, ESM, declaration,
  explicit-CSS and verification patterns. Its visible markup/styles must come from
  Core. The accepted physical package addition is not an
  excuse to put Business responsibility in the existing Core package.
- Storybook demonstrates consumer-controlled values and mocked actions/services.
  Real Sidekick endpoints are outside the library scope.

## Optimistic send acceptance contract

Capture an immutable draft snapshot before clearing. The snapshot must retain the
structured document and the relevant externally supplied attachment/agent identity
for the consumer's send/retry integration. Clearing is optimistic and does not wait
for the network result. The consumer owns failed-draft storage and retry; an error
must not automatically overwrite a newer draft. A submission creates an editor
history boundary so Undo cannot accidentally restore a sent draft into a second send.
Callback order/cancellation and failure behavior must be explicit in the specification.

## Confirmed paused-dictation behavior

SIDEKICK-024 accepts the proposed lock throughout the dictation session, including
pauses. Dictation starts empty, pause waits for final results, resume continues at
the dictation end and ending dictation unlocks the editor. Pause and end must remain
distinct controls; pausing must not imply that manual editing becomes available.
No reconciliation policy for manual edits during a pause is needed.

## Verification before functional completion

The component-specific specifications and bounded READY assessment now record
the chosen architecture and confirmed product contracts. Before implementation,
read them together with the shared acceptance/visual contracts. Final audio-state styling remains intentionally deferred by SIDEKICK-012.

Verification must exercise engine adapter round trips, atomic mentions/deletion,
@ queries and externally changing results, keyboard/focus/IME, text-only paste,
Undo/Redo and send-history boundaries, externally controlled resets, optimistic
send snapshots, attachment actions, text snippets, speech interim/final updates,
pause/resume and errors, mutually exclusive capture, late permission results,
MediaStream/mute/track cleanup, SSR and public type/package compatibility. Browser
stories and manual keyboard/screenreader checks supplement unit tests. Do not claim
final visual design or release readiness from functional-only audio stories.
