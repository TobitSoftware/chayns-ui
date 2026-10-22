# ADR 0004 — Bounded Lexical dependency for the Core editor

- Status: Accepted (engine choice and dependency boundary; no component READY result)
- Date: 2026-10-22
- Scope: Generic rich-text editing required by SideKick Input
- Authority: SIDEKICK-014–017, SIDEKICK-023; explicit user delegation of engine choice
- Supersedes: ADR 0002's runtime-dependency prohibition only for this editor scope

## Context

SideKick Input needs text, line breaks and atomic mentions, with reliable selection,
IME input, clipboard handling and Undo/Redo. Existing TextArea is a native textarea
and cannot represent atomic HTML mention elements. A custom contenteditable wrapper
would transfer substantial editing-engine maintenance into this library.

The user explicitly allows Lexical if it is the sensible choice, delegates that
decision and asks to avoid dependencies for things that are simple to implement.

## Decision

Use Lexical internally in the generic Core editor. Its token-mode text nodes match
atomic mention editing; its selection and history infrastructure address requirements
that are substantially harder than layout or action dispatch. Choose only modules
required for the confirmed text/break/mention scope. The exact module set, pinned
versions and transitive/peer compatibility must be recorded before installation.
Framework-independent integration is preferred when it avoids unnecessary packages
without recreating editing behavior.

The Core runtime-dependency exception is limited to this engine and necessary
Lexical modules. Package verification must enforce an explicit allowlist rather
than remove dependency checks entirely. This decision does not authorize unrelated
libraries, a general rich-formatting feature set or a replacement build system.

Keep the public content boundary engine-independent: a versioned structured
document with text, line-break and mention nodes. Neither Lexical EditorState nor
HTML strings become the public storage or send contract. Mention identity must
survive serialization and retry; externally supplied labels are data, not HTML.

Core owns editor behavior and all visible UI. Business composes Core and orchestrates
external domain data and actions. Layout, chips, attachment presentation and service
dispatch do not acquire additional dependencies merely because Lexical is approved.
SIDEKICK-025 subsequently accepts the physical @chayns-ui/business package and
component APIs in the linked specifications. The shared acceptance plan records the
selected direct packages lexical, @lexical/plain-text and @lexical/history at 0.52.0,
their reachable dependency graph and mandatory integration checks. Do not add
@lexical/react, collaboration or service packages as part of this engine exception.

## Compatibility requirements

- Preserve the current CSS distribution contract, including DIST-015's conditional
  loading decision, explicit CSS artifact paths and preserved-module output. This
  ADR introduces no new CSS loading mechanism. Node SSR must remain CSS-free and
  importing the package must remain safe without browser globals.
- Verify actual supported React/browser ranges against installed package metadata;
  do not silently narrow existing consumer compatibility.
- Keep editor imports out of unrelated component modules. Verify tree shaking and
  packed-consumer behavior after integrating dependencies.
- Normalize and test the document adapter, atomic edits, clipboard, IME, controlled
  replacement, history boundaries and optimistic-send snapshots.
- Lexical does not replace the library's accessibility specification or evidence.

## Alternatives

- A bespoke dependency-free editing engine: rejected for this scope because owning
  atomic selection, history and browser editing quirks adds disproportionate risk.
- A separate editor package: not selected; the bounded exception permits the generic
  editor to remain in Core without introducing another package solely for its engine.
- Using Lexical state as the public document: rejected to avoid consumer lock-in.

## Readiness boundary

This ADR resolves the engine decision. It does not authorize implementation before
the relevant component specifications and scoped READY assessment exist. No runtime
packages or production components are added as part of recording this decision.
Final audio-state design remains deferred by SIDEKICK-012 independently of Lexical.

## References checked 2026-10-22

- [Lexical introduction](https://lexical.dev/docs/intro): framework-independent engine
  and optional modules; application-owned layout and storage.
- [Lexical nodes](https://lexical.dev/docs/concepts/nodes): token-mode atomic deletion.
- [Lexical history](https://lexical.dev/docs/packages/lexical-history): history lifecycle
  and clear-history command for the submission boundary.

## Accepted component frame — 2026-10-22

SIDEKICK-025 accepts the [implementation contract](../../03-components/sidekick-input/sidekick-input-contract-review.md),
including Core RichTextEditor/MessageComposer, the Business distribution and bounded
preimplementation evidence lifecycle. SIDEKICK-026 accepts the limited additional
functional-first visual treatment. The [readiness assessment](../../03-components/sidekick-input/sidekick-input-readiness-assessment.md)
is the component-specific implementation authorization; this ADR alone is not one.
