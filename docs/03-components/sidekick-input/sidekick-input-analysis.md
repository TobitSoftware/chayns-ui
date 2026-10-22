# SideKick Input — Bodywork analysis

Checked on 2026-10-22. Status: **HISTORICAL ANALYSIS; implementation gate superseded by the READY assessment**. This is an evidence and clarification
record, not itself a component specification or implementation approval. The current
[readiness assessment](sidekick-input-readiness-assessment.md) and accepted contracts
resolve the historical OPEN inventory below through SIDEKICK-001–026. Confirmed user
decisions below take precedence over the observed Bodywork demo.

## Reference and verification

- [Bodywork: Muster / KI & Sidekick](https://tappqa.tobit.com/Bodywork/DesignSystem/#/muster/ki-sidekick), section `sidekick-input`.
- Live HTML, `tobit-ds.css` and inline demo handlers were inspected. Bodywork links
  the design to Figma node `1595:1633`; Figma itself was not inspected.
- Chromium checks exercised prompt activation, replacement of existing text,
  agent-menu opening, ArrowDown, Escape, long-text growth, whitespace-only Enter
  and a 375px viewport. These are reference checks, not acceptance tests.
- Repository architecture, Decision Register, SearchBox, TextArea, Badge and Popup
  contracts were checked against their implementations.
- GitNexus was stale and refreshed with `gitnexus analyze --index-only` before
  local graph queries. Search found relevant Core definitions and stories.
  SearchBox's exported constant has no graph call edges; source inspection was
  therefore necessary. The analyzer also reports unresolved cross-language fields;
  absent graph edges are not proof that something is unused.
- Storybook evidence: none for SideKick Input. No complete keyboard, screenreader,
  contrast, density, theme, zoom/reflow or reduced-motion verification was performed.

## Observed Bodywork contract — superseded where explicitly noted below

- Two layouts: 2-line for starting a chat, 1-line for an ongoing conversation.
  These are distinct layouts, independent of global S/M/L density.
- The textarea starts with one line and grows to ten, then scrolls internally.
  A wrapping 1-line layout changes to text above a separate action row, retaining
  its ongoing-chat purpose rather than automatically adding prompts/agent selection.
- Enter sends; Shift+Enter inserts a line break; IME composition suppresses sending.
  The demo treats trimmed-empty text as empty and trims sent text.
- Empty input shows dictation and voice-chat actions; non-empty input shows Send.
- The 2-line layout supports up to three optional prompt chips. The documented
  New Chat property controls agent-chip visibility; it is not independently
  demonstrated by an interactive toggle.
- A prompt chip prefills text. The live demo replaces an existing draft, does not
  send immediately and leaves focus on the chip.
- Agent selection has a fixed automatic option, separate recent-agent and
  recent-model groups, selection checkmarks and an all-agents/models action.
  Selection moves the entry to the start of its group in demo-local state.
- Both menus open upward and close on outside press or Escape. Escape restores
  trigger focus; selecting an agent also restores trigger focus. ArrowDown did
  not move focus in the tested agent menu.
- Add offers images, files, temporary chat and project assignment. These items only
  close the demo menu. Dictation and voice-chat buttons have no implemented action;
  the all-agents/models item only closes its menu.
- No attachment previews, upload progress/errors, recording, sending, response
  streaming, cancellation or request failure states are specified in this section.

## Confirmed user decisions — 2026-10-22

The Decision Register records these as SIDEKICK-001–024:

- SideKickInput performs Business orchestration. Consumers supply data and service
  actions through defined interfaces; visible UI and generic interaction stay in Core.
- Add-menu actions, including attachments, temporary chat and project assignment,
  are externally configurable, not a hard-coded product catalogue.
- Externally supplied attachment items appear inside the field above the textarea;
  their content comes from outside. Rendering/API details remain OPEN.
- Native SpeechRecognition dictation is part of the input, with browser capability
  detection and a disabling property. Text appears live; stopping and resuming are
  required. The corrected contract offers initial dictation only for an empty field,
  locks manual text editing while active, and supports pause/resume. Initial insertion
  therefore needs no cursor/selection rule. SIDEKICK-013 confirms resuming at the
  end of the existing dictation. SIDEKICK-024 also locks editing while paused.
  The consumer explicitly supplies recognition language. Interim-result reconciliation and pause lifecycle details remain OPEN.
- Voice-chat UI is included and an audio stream is passed outside. The consumer owns
  connection establishment and communication. The accepted outgoing type is a live
  MediaStream obtained by the component through getUserMedia; the component stops
  its tracks on end/unmount. The consumer reports connection states back.
- The user explicitly authorizes functional-first dictation/voice implementation.
  The designer will supply final audio-state visuals in Bodywork afterward. This
  closes the question of whether to wait for that design; it does not decide open
  functional, public-API, keyboard or accessibility contracts or assert release readiness.
- Person-like agent entries represent AI identities/contexts and specializations,
  not human message recipients. This resolves the apparent Bodywork contradiction.
- In-field prompt chips invoke an external action for immediate submission of a
  predefined prompt. The consumer sends and removes the chip. They do not prefill
  the textarea. This explicitly overrides Bodywork's observed prompt behavior.
- Text prefilling instead uses a separate list of secondary buttons above the
  field. SIDEKICK-021 resolves insertion at the last selection with subsequent
  editor focus; geometry still needs its documented reference mapping.

## Rich-text requirement — confirmed 2026-10-22

SIDEKICK-014 requires a rich-text editor with styled, atomic mention elements in its
HTML DOM. Mention text is not partially editable/removable; removal affects the
whole mention. The earlier textarea-based implementation direction is superseded.
The observed Bodywork textarea remains historical visual-reference evidence, not
permission to implement this requirement with TextArea.

The HTML DOM requirement alone did not decide the public format. SIDEKICK-016
subsequently delegates and resolves that choice as a structured document. The
following original questions are reconciled by SIDEKICK-015–022 below:

- Supported nodes/formatting: plain text, line breaks and mentions only, or also
  emphasis, links, lists, code, other entities and formatting controls.
- Canonical controlled value, serialization/paste policy, stable mention identity,
  imported-content validation and outbound plain-text representation if required.
- Mention trigger, query/external suggestion data, selection UI, names/rendering,
  keyboard/IME behavior and whether deleting an adjacent atom is immediate or first
  selects it. Literal at-sign text must not silently become a domain identity.
- Clipboard and undo/redo behavior that preserve mention identity and atomicity.
- Editor selection/ref/native props and accessibility, live provisional dictation
  as text rather than HTML, and selection/history consistency across pause/resume.
- Editor engine/dependency and package scope. Repository source/manifest searches
  found no existing rich-text/mention implementation or declared editor engine.
  GitNexus search is exploratory and does not replace those source checks.

The generic editor and mention interaction belong in Core. Business composes Core
and maps external identity/search data and actions. The later decisions select Lexical and accept the exact contracts below; no
productive rich-text implementation has started during specification work.

## Core and Business boundary

ARCH-002/003 and BUS-001/002 distinguish generic UI interaction from domain rules.
SIDEKICK-001 confirms Business orchestration with externally supplied data/services.
Chips and selection state alone do not establish Business responsibility.

Core must own the complete visible input surface, rich-text editing, chip/button
presentation, menu presentation and interaction, focus, responsive layout and motion.
Business composes that UI and maps prompts, agents/models, permissions and service
operations. Product-specific workflow navigation and persistence need explicit owners.
Native dictation/media capture is browser integration, not domain logic; its hook and
component ownership must be documented without moving visible UI into Business.

Candidate reuse and gaps:

| Existing Core | Finding |
| --- | --- |
| TextArea | Explicitly excludes rich text in its existing specification. It cannot supply the editor required by SIDEKICK-014. |
| SearchBox | Demonstrates generic selection ownership but uses an editable input combobox, removable selected chips and a listbox. It does not model prompt actions or an agent menu. |
| Badge | Non-interactive span; cannot represent an action chip by attaching click behavior. |
| Avatar | Candidate for identity presentation; sizes, fallback and the Bodywork-specific avatar need reconciliation. |
| IconButton | Candidate for action semantics; existing appearance/geometry must be reconciled before introducing any visual variant. |
| Popup / PopupList | Existing overlay/dismissal and action-menu foundations. Current PopupList items expose icon/text/action, without selected radio items, sections or secondary text. Generic Popup does not supply menu focus/semantics. Upward-first placement and geometry also require an explicit contract. |

This analysis itself does not approve new names, dependencies or APIs. SIDEKICK-025
subsequently approves Core RichTextEditor/MessageComposer and the Business contract;
SIDEKICK-026 approves the bounded visual scope. Choose
the smallest API after responsibilities are confirmed; visual anatomy alone does not justify compound components.

## Visual mapping and design review

The source explicitly defines the `--sk-input-bg`, `--sk-input-border`,
`--sk-input-shadow`, `--sk-chip-border`, `--sk-agent-bg`, `--sk-avatar-border`,
`--sk-placeholder` and `--sk-avatar-img` properties, with dark-mode and partial
high-contrast overrides. They are not yet a confirmed library token mapping.

Bodywork uses density-scaled `--k*` spacing and `--fs-bodyl`/`--fs-body` typography.
At M the main geometry includes 12px container padding, 24px expanded radius,
960px maximum width, pill compact radius, 28px chips/add action, 30px voice/send
controls and 24px chip avatars. Menus have 12px radius, `--shadow-pop` and
`--z-popover`. Under a 520px row container, the agent label switches to its short
form; at 375px viewport the live trigger displayed Auto.

These source measurements are evidence, not permission to add tokens or silently
extend existing Core components. Required design-review work remains OPEN:

- Resolve the Bodywork chip note saying Desktop controls the chevron against CSS
  that keeps it displayed and uses a container query for the short name.
- Specify long agent names/short labels, very narrow widths, menu overflow,
  viewport collision/flip rules, touch and zoom/reflow behavior.
- Reconcile low-opacity placeholder and subtle field border with the confirmed
  WCAG AA requirement. Existing TextField/TextArea already use a stronger text
  token for accessible placeholders/labels; source opacity is not an AA proof.
- Map radius, color, dimension, avatar and motion values into approved foundations;
  confirm required assets/fallback rather than inheriting a Bodywork asset URL.
- Bodywork animates action swaps with opacity/scale/translate (220ms entry, 140ms
  exit), field focus over 180ms, and multiline height using Web Animations.
  The height transition is an explicit Bodywork reference, not an invented effect.
  Reduced-motion handling exists for the main swaps/height change but needs a
  complete audit including menu entry and plus/chevron rotation.
- Specify disabled, read-only, pending, unavailable and error visuals for the
  states actually included in the agreed scope.

SIDEKICK-012 explicitly defers final dictation/voice-state styling for functional
implementation. Do not request that authorization again. Other relevant unresolved
DESIGN REVIEW points still block their affected scope; final visual/release evidence
must be obtained after the designer updates Bodywork.

## Initial OPEN inventory — reconciled by subsequent decisions

This historical inventory must be read together with SIDEKICK-015–022 and the
clarification outcome below. Confirmed later decisions close their corresponding
questions; do not ask them again. Remaining gate findings are listed separately.

| ID | Decision required |
| --- | --- |
| SK-OPEN-01 | RESOLVED in principle by SIDEKICK-001: Business orchestration, external data/service actions, Core-owned UI. Detailed boundaries, state and persistence ownership remain part of SK-OPEN-03/06/14. |
| SK-OPEN-02 | Scope clarified by SIDEKICK-002–005/007–008: configurable external actions and attachment items, native live dictation, externally connected voice chat, action chips and separate text-prefill buttons. Capability absence, disabling and API contracts remain OPEN. |
| SK-OPEN-03 | Consumer supplies data/services per SIDEKICK-001. Define stable identity, capability/permission filtering, automatic-selection meaning, recent limits/order/storage, all-agents/models action and loading/empty/failure behavior. Direct endpoint/SDK integration is not required by this decision. |
| SK-OPEN-04 | RESOLVED by SIDEKICK-006: person-like entries are AI identities/contexts with topical specializations, not human recipients. |
| SK-OPEN-05 | In-field chip action resolved by SIDEKICK-007: external immediate-prompt action, consumer sends/removes. Define effects on an existing draft/attachments, pending/error behavior and focus after chip removal. Separately define text insertion/caret/focus policy for the external secondary-button list from SIDEKICK-008. |
| SK-OPEN-06 | Define layout ownership, New Chat visibility, the transition after first send, agent persistence/switching in an ongoing chat and controlled/uncontrolled editor content/selection contracts, accounting for SIDEKICK-014. |
| SK-OPEN-07 | Define rich-document submission payload, serialization, whitespace preservation, draft clearing on dispatch versus success, pending editing, duplicate prevention, response-running state, failure/retry and cancellation if included. |
| SK-OPEN-08 | SIDEKICK-003 confirms externally supplied attachment contents/items inside the field above text. Define item/slot contract, Core rendering, removal, preview/progress/error needs, overflow and attachment-only send. External action contracts must state ownership of file picking/upload/validation and whether paste/drop is included; no internal upload behavior is implied. These visible states lack Bodywork evidence. |
| SK-OPEN-09 | SIDEKICK-002 makes temporary-chat/project menu actions externally configurable. Define whether they are callbacks only or also require selected-context display/removal/state; no internal workflow is implied. |
| SK-OPEN-10 | SIDEKICK-004/009/010 confirm initial native live recognition only in an empty field, editing locked while active, pause/resume and externally supplied language. The previous cursor/selection rule for initial start was withdrawn by the user correction. SIDEKICK-005/011 confirm live MediaStream, component-owned capture/cleanup and external connection states. SIDEKICK-013 confirms resuming at the existing dictation end. Define interim/final reconciliation, pause completion/manual editing during pause, restart behavior, unsupported/disabled behavior, permissions/errors, mutual exclusion, mute and connection-state contracts. Final audio-state design is explicitly deferred by SIDEKICK-012; do not treat that design deferral as a missing authorization. |
| SK-OPEN-11 | Define keyboard/focus matrix for menus, selection and prompt activation; radio-menu semantics/groups; event cancellation; rich-editor native props/ref; accessible labels/status/error text; focus after hidden actions or request outcomes. Reuse established Core patterns where compatible. |
| SK-OPEN-12 | Resolve the design-review points above and specify supported themes/densities, reduced motion, target sizes, contrast, zoom/reflow and any relevant RTL requirement. |
| SK-OPEN-13 | Define already localized labels/prompt contents/status strings and ownership of system text. Core receives resolved strings; no new translation infrastructure or guessed IDs. |
| SK-OPEN-14 | Document Core/Business API, approved token mapping, dependency/package scope, acceptance tests and Storybook evidence. No general Business implementation/package approval follows from existing Core infrastructure. |

## Browser API research — 2026-10-22

- [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
  has limited browser availability. An exposed constructor is not proof of permission,
  language/service availability or offline processing. Some browsers use a remote
  recognition service; native integration does not imply local-only recognition.
- [Interim results](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/interimResults)
  are provisional and may change. Live insertion therefore needs a stable text base
  and replacement of the provisional range rather than repeated appending. Whether
  provisional text is part of the consumer-controlled value remains a product/API decision.
- [stop()](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/stop)
  attempts to return a result from captured audio; abort discards recognition work.
  Resuming is an application lifecycle contract, not a browser pause/resume guarantee.
- [Speech language](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition/lang)
  uses a BCP 47 tag; leaving it unset invokes document/browser defaults. The project
  must not silently choose a locale; SIDEKICK-010 now confirms an external source.
- [getUserMedia()](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
  supplies a permission-gated MediaStream in a secure context. SIDEKICK-011 now
  confirms live MediaStream output and component capture/cleanup ownership. Mute,
  connection transitions and external failure/stop paths still need explicit contracts.
- Bodywork's hide-microphone-on-filled behavior conflicts with live dictation and
  resuming into a populated draft. Recording, stop/resume and voice connection UI
  need documented extensions, with final styling deferred by SIDEKICK-012. The user
  has explicitly supplied the language-source and active-editing-lock decisions.

No browser microphone or speech service was activated during this research.

## Clarification outcome — confirmed 2026-10-22

SIDEKICK-015–022 close the latest product questions:

- Editor scope: text, line breaks and atomic mentions; external paste is plain text.
- User delegated the best content-format choice. The chosen technical boundary is
  a versioned structured document with text, line-break and mention nodes. Mention
  identity is retained; engine state and HTML rendering are internal concerns.
- @ triggers external suggestions with stable IDs/names; adjacent Backspace/Delete
  removes a mention immediately as a whole.
- Consumer controls content, selected agent, ordered recents and chat layout. No
  automatic post-send chat-layout transition or internal recents persistence.
- Optimistic submission clears the editor and reports a draft snapshot to the
  consumer. The consumer sends, retains failed drafts and owns retry. Pending blocks
  repeat sends/prompt actions; consumer may enable attachment-only submission.
- Attachments are externally supplied items with Core presentation/removal and
  external content/list ownership, consistent with the earlier slot requirement.
- Secondary buttons insert at the last selection/cursor and then focus the editor.
- Dictation/voice are exclusive. Voice offers mute/end and locks editing. Pausing
  recognition waits for final results; resume appends at the dictation end.
  Unsupported/disabled start actions are absent; runtime errors are displayed and
  reported outside. SIDEKICK-024 subsequently confirms that paused dictation remains locked.

The user approved optimistic submission instead of the earlier proposal to wait for
consumer-controlled clearing. Do not restore a failed draft over a newer draft.

## Latest clarification — engine and paused editing

SIDEKICK-023 delegates the engine decision with an explicit preference for limiting
external dependencies. Lexical is selected for the difficult editing responsibilities
(atomic nodes, selection, history and IME); simple UI composition, document adapters
and Business orchestration remain library-owned. ADR 0004 records the bounded Core
runtime-dependency exception. No packages have been installed.

SIDEKICK-024 confirms that the editor remains locked while dictation is paused.
Ending the session unlocks manual editing. These two previously outstanding
questions no longer require user clarification.

## Implementation-gate outcome — 2026-10-22

The user accepted R-01's complete technical/API/distribution/evidence frame and
R-02/V-01's functional-first additional visual treatment through structured questions.
SIDEKICK-025/026 record those answers. RichTextEditor, MessageComposer and SideKickInput
now have normative specifications and a bounded READY assessment with zero open
implementation blockers. The shared contracts supersede this document's historical
OPEN/design-review wording; do not ask resolved questions again.

The accepted preimplementation evidence consists of checked Bodywork/current Core
sources and a concrete test/story plan, explicitly authorized by SIDEKICK-025.
Actual implementation/browser/type/package/manual evidence is still required for
completion. The designer's final additional-state visuals remain a later obligation
under SIDEKICK-026 and are not silently asserted to exist.

## Required implementation evidence after clarification

Specifications and readiness assessments must separately cover each new or extended
Core contract and the Business composition. Required evidence includes native prop
and ref forwarding, event order/cancellation, editor/layout growth and resize, keyboard
and IME behavior, menu selection/focus/dismissal, controlled state, async failures for
included features, localization, SSR as applicable, reduced motion, theme/density,
responsive and long-content stories, atomic mentions, selection/history, clipboard,
serialization and dictation integration, and manual keyboard/screenreader/visual checks.

Existing Bodywork demo omissions are not accepted library behavior. SIDEKICK-012
explicitly allows functional-first audio UI with final styling deferred; it is not
blanket permission to guess missing functional/API/accessibility decisions. The normative specifications and READY assessment now close the relevant functional
OPEN items and record the bounded implementation scope. Final design and release checks remain a later step.
