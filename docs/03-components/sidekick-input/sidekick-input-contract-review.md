# SideKick Input — accepted implementation contract

Date: 2026-10-22. Status: **ACCEPTED — SIDEKICK-025/026**.

The user accepted R-01 (technical/API/distribution/evidence frame) and R-02/V-01
(functional-first additional visual treatment) through structured questions on
2026-10-22. This document is normative together with the component specifications.
SIDEKICK-001–026 remain authoritative. No production code or dependency is added
as part of the specification work. Examples describe future public exports.

## 1. Component and distribution boundary

| Public component | Package | Responsibility |
| --- | --- | --- |
| RichTextEditor | `@chayns-ui/core` | Generic controlled text/break/atomic-mention editing, query suggestions, selection and history. |
| MessageComposer | `@chayns-ui/core` | Complete visible composer, attachment presentation/removal, prompt actions, snippet insertion, grouped selector, menus, capture UI and native browser capture. Composes RichTextEditor. |
| SideKickInput | `@chayns-ui/business` | Maps agent/model identities and external data/actions into MessageComposer, captures draft snapshots and orchestrates optimistic send. Renders Core only. |

No fourth public component, public Context or public Compound Part is needed. An
attachment is an exported data item, rendered inside Core-owned item/list structure.
Its content is a named consumer content slot; its remove button belongs to Core.
Internal editor nodes, action buttons and menu rows are implementation details.

Rejected: extending TextArea with a second editing engine, interactive Badge,
Business-owned HTML for the composer, and a Compound tree derived only from visual
anatomy. Existing Button/Avatar/Spinner and shared overlay/focus helpers are reused
where their confirmed contracts fit. Composer-specific chip and icon geometry is
internal Core UI and does not add an undocumented size/appearance to IconButton.

The new Business package follows existing ESM/preserveModules, declarations,
source-map and React compatibility conventions. Peer dependencies are React
`>=18 <20` and the compatible workspace Core version selected at implementation.
It has no service SDK, runtime dependencies or CSS of its own. No new major/minor
package version is chosen here; use the repository's release workflow later.

Core adds explicit editor/composer CSS artifacts and aggregate CSS inclusion.
Keep the current distribution contract (including DIST-015); do not introduce a
second CSS loading mechanism. The Node import path must remain CSS-free and SSR-safe.
Token ownership belongs to the token package; Business adds no tokens/styles.

## 2. Public content and identity types

The following are accepted TypeScript contracts, not currently exported symbols.
Use readonly inputs and detached callback payloads; do not mutate consumer objects.

```ts
export enum RichTextNodeTypes {
  Text = 'text',
  LineBreak = 'lineBreak',
  Mention = 'mention',
}
export type RichTextNode =
  | { readonly type: 'text'; readonly text: string }
  | { readonly type: 'lineBreak' }
  | { readonly type: 'mention'; readonly id: string; readonly label: string };
export interface RichTextDocument {
  readonly version: 1;
  readonly content: readonly RichTextNode[];
}
export interface MentionItem {
  readonly id: string;
  readonly label: string;
}
export interface MentionQuery {
  readonly id: string;
  readonly text: string;
}
export interface MentionResults {
  readonly queryId: string;
  readonly items: readonly MentionItem[];
  readonly isLoading?: boolean;
  readonly error?: string;
}
export interface RichTextEditorCommands {
  focus(): void;
  insertText(text: string): void;
  clearHistory(): void;
}
```

The empty document is `{ version: 1, content: [] }`. Runtime validation rejects
unknown versions/node types, malformed data and empty mention IDs/labels with a
descriptive developer error. IDs are opaque; repeated mentions of the same identity
are allowed. Consecutive text nodes merge; empty text nodes disappear. CRLF/CR
normalize to LF and LF becomes lineBreak nodes. Do not trim, collapse spaces,
Unicode-normalize or remove leading/trailing breaks from the stored/sent draft.

Plain-text projection concatenates text, LF and `@` plus mention label. Emptiness
uses trimmed projected text; an actual mention is always substantive. Literal
`@name` never becomes an identity without explicit suggestion selection.
Whitespace-only text hides send and permits initial dictation; starting dictation
replaces that insignificant whitespace. A nonempty attachment list does not make
the editor text nonempty. Attachment-only submission uses the explicit opt-in below.

## 3. RichTextEditor API and event contract

```ts
export interface RichTextEditorProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  | 'children' | 'dangerouslySetInnerHTML' | 'contentEditable'
  | 'defaultValue' | 'onChange' | 'onSubmit' | 'role'
  | 'aria-multiline' | 'aria-readonly' | 'aria-disabled'
  | 'aria-autocomplete' | 'aria-controls' | 'aria-activedescendant'
> {
  value: RichTextDocument;
  onValueChange: (value: RichTextDocument) => void;
  onSubmit?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  commandsRef?: React.Ref<RichTextEditorCommands>;
  onMentionQueryChange?: (query: MentionQuery | null) => void;
  mentionResults?: MentionResults;
  mentionStatusText?: string;
}
```

Direct compatible div props and the ordinary ref target the actual editable div,
including className/style, id, lang, dir, spellCheck, data attributes and events.
An accessible name through aria-label or aria-labelledby is required at runtime.
Placeholder is a hint, never the accessible name or an HTML label association.
`commandsRef` is a separate imperative API; no engine/selection object escapes.
No children, HTML import, public plugin system, uncontrolled/default value, native
form-value behavior, floating label or generic prop bag is introduced.

The editable uses `role="textbox"`, `aria-multiline="true"`, appropriate read-only/
disabled states, and an internal aria-describedby link to mention status when
needed. The external describedby IDs remain present. While a query is active it
uses aria-autocomplete=list, aria-controls and aria-activedescendant pointing at a
listbox option. Do not put aria-expanded on a textbox; there is no combobox role
override. Popup options are not separate Tab stops. The edit DOM belongs to Lexical;
React must not reconcile consumer children inside it.

Consumer capture handlers run at native capture time, consumer bubble handlers
at their normal React bubble time. Composer/editor key defaults run **after** the
consumer onKeyDown and are skipped if it prevented default. An implementation
must intercept/defer Lexical Enter defaults accordingly; moving a bubble handler
to capture or calling it twice is not acceptable. onValueChange reports committed
normalized document updates, never selection-only changes. Native onInput is an
observation event and cannot cancel an already committed model update; use
onBeforeInput.preventDefault() to veto a cancelable beforeinput edit. The engine
must honor that veto and the tests must verify actual DOM/model agreement.

Controlled echoes of the last emitted normalized value preserve selection/history.
A different external value replaces the document, closes the query, clears history
and moves an existing editor selection to the new end without stealing focus.
No onValueChange echo is emitted. insertText restores the last valid selection,
replaces it, inserts text/breaks as one undoable action and focuses the editor. If
there has never been an editor selection, insert at the end. Invalidated selections
fall back to the current end. Focus alone does not change the value.

### Mention, clipboard, history and IME

- @ starts a query at the caret at document start or after whitespace, followed by
  zero or more characters up to whitespace or another @. Email-like text does not
  trigger it. Noncollapsed selection, caret inside an atom, Escape, blur or leaving
  that range closes it and reports null. Do not fetch/debounce in Core.
- Every changed query/range receives an opaque instance-local query ID. Only results
  with the current ID are actionable, so stale asynchronous responses cannot insert
  into a new range. Stable result IDs must be unique within one result list.
- ArrowDown/Up navigate eligible current results cyclically; first Down chooses
  first, first Up last. Home/End retain editor movement. Enter chooses the active
  result before submission; Tab closes without selecting and retains native flow.
  No result is initially active; Enter may submit literal @ text if none is active.
- Selecting replaces only the active @ query with an atomic mention and one trailing
  space, unless whitespace already follows. It preserves surrounding content, closes
  results and focuses the editor. Undo restores the query in one step. A mention is
  a styled, noneditable inline element with visible `@label`, not an independent
  button or Tab stop; its ID is data, never interpreted HTML.
- Arrow movement skips a whole mention; adjacent Backspace/Delete removes it as a
  whole immediately. Range replacement/cut expands a partial atom selection to the
  whole atom. Pointer selection cannot edit its label. Repeated identities are legal.
- Copy/cut supplies text/plain only; paste and drop accept text/plain only. Mention
  identity intentionally does not survive clipboard transfer, including between
  instances. No custom MIME, HTML deserialization, files, upload, linkification or
  drag-to-reorder is added. Cutting deletes only after clipboard write succeeds.
- Composition owns Enter while IME is active (including browser composition-ending
  Enter); no send, snippet, mention selection or query update during composition.
  Emit/update the final value/query when composition ends. Shift+Enter adds a break;
  plain Enter calls onSubmit when supplied; otherwise it adds a break. Ctrl/Cmd+Z
  undo and platform redo use Lexical history; snippets/mentions are distinct actions.
- Dictionary suggestions and native spell checking remain available; readOnly blocks
  all mutations including paste/drop, mention selection, snippets and Undo/Redo.
  Read-only still permits selection/copy. Disabled also excludes normal Tab focus.

## 4. MessageComposer data and API

```ts
export enum MessageComposerLayouts {
  OneLine = 'oneLine',
  TwoLine = 'twoLine',
}
export type MessageComposerLayout = 'oneLine' | 'twoLine';
export interface ComposerAction {
  readonly id: string;
  readonly label: string;
  readonly icon?: ButtonIcon;
  readonly disabled?: boolean;
}
export interface ComposerSnippet {
  readonly id: string;
  readonly label: string;
  readonly text: string;
  readonly disabled?: boolean;
}
export interface ComposerAttachment {
  readonly id: string;
  readonly content: React.ReactNode;
  readonly removeLabel: string;
  readonly disabled?: boolean;
}
export interface ComposerSelectionItem {
  readonly id: string;
  readonly label: string;
  readonly shortLabel: string;
  readonly description?: string;
  readonly avatarSrc?: string;
  readonly icon?: ButtonIcon;
  readonly disabled?: boolean;
}
export interface ComposerSelectionGroup {
  readonly id: string;
  readonly label?: string;
  readonly items: readonly ComposerSelectionItem[];
}
export interface ComposerSelector {
  readonly selectedItem: ComposerSelectionItem;
  readonly groups: readonly ComposerSelectionGroup[];
  readonly onSelect: (id: string) => void;
  readonly action?: ComposerAction;
  readonly onAction?: (id: string) => void;
}
export interface MessageComposerProps extends RichTextEditorProps {
  layout: MessageComposerLayout;
  labels: ComposerLabels;
  rootProps?: Omit<React.ComponentPropsWithRef<'div'>, 'children' | 'dangerouslySetInnerHTML'>;
  attachments?: readonly ComposerAttachment[];
  onAttachmentRemove?: (id: string) => void;
  actions?: readonly ComposerAction[];
  onAction?: (id: string) => void;
  prompts?: readonly ComposerAction[];
  onPrompt?: (id: string) => void;
  snippets?: readonly ComposerSnippet[];
  selector?: ComposerSelector;
  pending?: boolean;
  allowAttachmentOnly?: boolean;
  error?: string;
  dictation?: DictationOptions;
  voice?: VoiceOptions;
  onCaptureError?: (error: ComposerCaptureError) => void;
}
```

`ButtonIcon` is the existing public Core icon type. Optional arrays default empty;
boolean props default false; omitted capture options disable the respective feature.
Callbacks for supplied interactive collections are required at runtime; empty lists
hide their affordance. IDs are nonempty and unique within each collection/selection
across groups. Duplicate or malformed IDs throw clear developer errors. No item
limit is silently imposed: Bodywork's three prompts are examples, excess prompts
scroll. The selector is optional in either layout; its presence is explicit instead
of being inferred from chat history. Long/full accessible names are preserved.

Core reports onSubmit without clearing. It never interprets an action ID, changes
selectedItems, removes attachments/prompts or reorders recents. Attachment content
is externally supplied noninteractive presentation (for example an image or a Core
composition); Core supplies the list, bounded item container and separate remove
button. Upload/progress/error/preview workflows are external. No native file picker,
hidden upload input, rich file-drop or paste-upload support is implied.

Direct props/ref still target the editor. rootProps targets only the outer wrapper;
it may supply layout class/style and a wrapper ref, never editor props. Owned child
structure and event defaults cannot be replaced by children/HTML. Native root and
editor handlers run only on their actual target/bubble path; both may observe one
bubbling event without being composed twice onto the editor. No form is created;
all internal actions are type=button. Within this scope only Send or idle Voice is
Primary, never both. Submission checks must be identical for keyboard and pointer.

### State priority and interaction

| Condition | Editing | Send/prompt | Other actions |
| --- | --- | --- | --- |
| disabled | disabled; not in Tab sequence | disabled | disabled, menus close and capture aborts |
| readOnly | selection/copy only | disabled | all mutating/configuration actions disabled; capture ends |
| dictation starting/listening/pausing/paused/ending | locked, selectable | disabled | pause/resume/end only; start Voice disabled |
| voice permission/connecting/connected | locked, selectable | disabled | mute when stream exists, end always; start dictation disabled |
| pending only | editable | disabled | snippets, attachments, selector and menu may change the next draft |
| otherwise | editable | substantive document, or allowed attachment-only send; prompts independently available | according to item disabled/capability |

Features locked during capture include snippets, mentions, attachments, menus and
selector changes. Native external value replacement is still supported; it cancels
capture before applying a different document, without overwriting the replacement.
Setting disabled/readOnly or removing capture configuration ends the session. Late
callbacks are ignored; late MediaStreams have their tracks stopped immediately.

For an empty, idle editor show supported/enabled dictation and Voice starts. For a
sendable draft show Send. A nonempty unsendable whitespace/attachment-only state
does not show an enabled Send. A pending sendable draft shows a disabled/loading
Send with the same name. A dictation session retains visible pause/resume/end controls
after live text arrives; the ordinary empty-field visibility rule must not hide them.
Error does not replace the draft or focus; it supplies localized visible text linked
to the editor and announced once on change. There is no automatic retry/network UI.

### Menus and focus

Add uses a native menu button and menuitems. Selector uses menuitemradio entries in
labelled groups and optional menuitem action; all selection entries are one logical
single-choice set across groups. The selected item may be absent from recents; its
full object still labels the trigger, and no other option is checked automatically.
Empty groups are omitted; an empty selector menu disables its trigger.

Enter/Space/ArrowDown opens at the first enabled menu item; ArrowUp opens at the
last. Up/Down wrap enabled entries, Home/End select first/last, Enter/Space activate.
Typing printable characters cycles by case-insensitive label prefix using the
existing platform string comparison; no locale sorting/filtering is added. Escape
closes and restores the trigger. Tab/Shift+Tab closes and proceeds from the trigger
in document tab order despite portal placement; outside press retains the clicked
target. Actions close and focus the trigger before calling the consumer, so an
external dialog can then take focus. No disabled entry is activatable.

Only one composer popup is open. All menus and mention suggestions are portalled
to body, start above (add aligned inline-start, selector inline-end), flip below
when required, clamp to the viewport with a 16px edge inset reduced only if the
viewport itself is smaller, and scroll internally when necessary. Recompute on
scroll/resize/element geometry changes, including mobile visualViewport changes.
Do not change Popup's existing default placement/API implicitly; an internal helper
extension must preserve existing consumers and have positioning regression tests.

DOM/focus order follows visible order: snippet buttons, attachment remove buttons,
editor, add, prompt buttons, selector, capture/send controls in twoLine; in oneLine
the ordinary add/editor order follows Bodywork. Expanded oneLine moves text above
actions in both DOM and visual order without remounting/losing selection. Focused
chips scroll into view with no forced smooth animation. After a prompt/attachment
disappears through a synchronous consumer update, focus next enabled sibling, then
previous sibling, then editor; do not steal focus if the user already moved elsewhere.
Stopping dictation restores editable editor focus at the end. Ending Voice returns
focus to its start control if present, otherwise editor. Visibility changes never
leave focus on an aria-hidden/unmounted action. No positive tabindex or trap.

## 5. Native capture contract

```ts
export enum ComposerVoiceStates {
  Idle = 'idle', Connecting = 'connecting', Connected = 'connected', Error = 'error',
}
export type ComposerVoiceState = 'idle' | 'connecting' | 'connected' | 'error';
export interface DictationOptions {
  readonly language: string;
  readonly disabled?: boolean;
}
export interface VoiceOptions {
  readonly disabled?: boolean;
  readonly state: ComposerVoiceState;
  readonly onStream: (stream: MediaStream) => void;
  readonly onEnd: () => void;
  readonly error?: string;
}
export enum ComposerCaptureSources { Dictation = 'dictation', Voice = 'voice' }
export interface ComposerCaptureError {
  readonly source: 'dictation' | 'voice';
  readonly code: string;
}
```

Error code is the browser's open string vocabulary, not a guessed finite enum.
Do not expose browser exceptions as user-facing English messages. The labels
contract maps `{source,code}` to already localized complete error text. An optional
external Voice error is also already localized. Capture callbacks do not send audio
or recognized text to a library service. No WebSocket, WebRTC, transcription service,
audio player, encoded chunks or speech polyfill is included.

### Dictation state machine

1. Detect SpeechRecognition or webkitSpeechRecognition after client mount, with an
   initially absent start action during SSR/hydration. Check again on activation.
   Start only after user action when enabled, idle and projected text is empty.
2. Capture the current language for the session; configure interimResults and
   continuous recognition. Native permission/errors may still fail after detection.
   A changed language cancels the old recognition; no implicit language fallback.
3. The session owns committed text plus the current provisional suffix. Emit live
   controlled values containing provisional text; a revised result replaces its
   suffix instead of being appended again. Final results replace/commit that suffix.
   Speech remains text nodes, never interpreted markup or mention syntax.
4. Pause transitions to pausing and calls stop(), waits for last results/onend, then
   paused. Discard any still-unconfirmed suffix on end; retain finalized text. Resume
   is unavailable while pausing and starts a new recognition run from the committed
   end. No hidden automatic microphone restart after onend. Unexpected normal onend
   becomes paused with a visible status, so the user decides whether to continue.
5. End while listening calls stop() and waits for final results/onend before unlocking.
   End from paused ends immediately. If the platform never produces onend, abort
   after a 2-second internal cleanup deadline, discard provisional suffix, preserve
   final text, display/report code `stop-timeout` and unlock. This deadline is a
   accepted technical fail-safe, not a new public timing configuration.
6. An error ends the session, preserves final text, discards provisional text and
   announces/reports the error once. User can edit or start again if the draft is
   empty. A generation token prevents late results resurrecting stopped sessions.
   Unmount aborts without delivering further document changes or callbacks.

Interim changes create no individual Undo entries. The finished dictation is one
undoable insertion. Pause does not unlock editing. Undo becomes available after
ending; one Undo removes the finished dictation. An external replacement or send
history boundary cannot be undone into another document.

### Voice lifecycle

Detect secure-context mediaDevices.getUserMedia support without prompting on mount.
Start only on a user gesture in an empty idle editor and when external state is
idle. Request `{ audio: true, video: false }`; no processing constraints or devices
are selected implicitly. The component owns the resulting tracks and pending request
generation. After capture resolves, call onStream once and show the externally
controlled connecting/connected state. Consumer updates state and owns transport.

Mute is local, reflected by aria-pressed and a localized mute/unmute name, and toggles
owned audio tracks' enabled properties. End during permission invalidates the request;
late success stops tracks without onStream. End with a stream stops all owned tracks
and calls onEnd once. Transition from active to external idle/error also ends capture;
external error text is displayed. A stream callback that throws stops tracks and
restores idle before rethrowing; the library never leaks a microphone on callback
failure. Track ended events stop the session and notify onEnd. Cleanup is idempotent;
unmount stops tracks and reports end for an active handed-out session once, but does
not update React state or emit new document values. Mute cannot start transport.

## 6. Labels and localization

All labels are complete resolved strings supplied by the consumer. Core knows no
textstring IDs and never derives recognition language or RTL from UI language.

```ts
export interface ComposerLabels {
  readonly add: string;
  readonly selector: string;
  readonly send: string;
  readonly startDictation: string;
  readonly pauseDictation: string;
  readonly resumeDictation: string;
  readonly endDictation: string;
  readonly dictationStarting: string;
  readonly dictationListening: string;
  readonly dictationPausing: string;
  readonly dictationPaused: string;
  readonly dictationEnding: string;
  readonly startVoice: string;
  readonly endVoice: string;
  readonly muteVoice: string;
  readonly unmuteVoice: string;
  readonly voiceRequesting: string;
  readonly voiceConnecting: string;
  readonly voiceConnected: string;
  readonly captureError: (error: ComposerCaptureError) => string;
}
```

Unused-feature labels may still be supplied as one stable application labels object;
there are no internal English/German fallbacks. Attachment remove names and selection
group/item labels come with those items. Mention loading/no-results/error announcements
use externally supplied mentionStatusText/error. Full status sentences are not assembled
from label fragments. A polite atomic status region announces mode changes/errors
once; it must not read every provisional syllable or move focus. aria-describedby
preserves consumer IDs. Visible errors are text as well as color. Product locale,
dates, currencies/timezone and RTL-specific redesign are outside this scope; native
dir and Unicode/bidi text remain supported without breaking semantic order.

## 7. SideKickInput API and optimistic dispatch

```ts
export enum SideKickSelectionKinds {
  Automatic = 'automatic', Agent = 'agent', Model = 'model',
}
export type SideKickSelection =
  | { readonly kind: 'automatic' }
  | { readonly kind: 'agent' | 'model'; readonly id: string };
export interface SideKickIdentity {
  readonly id: string;
  readonly label: string;
  readonly shortLabel: string;
  readonly description?: string;
  readonly avatarSrc?: string;
  readonly icon?: ButtonIcon;
  readonly disabled?: boolean;
}
export interface SideKickDraft {
  readonly document: RichTextDocument;
  readonly attachmentIds: readonly string[];
  readonly selection: SideKickSelection;
}
export interface SideKickAgentSelector {
  readonly value: SideKickSelection;
  readonly selectedIdentity?: SideKickIdentity;
  readonly automatic: Omit<SideKickIdentity, 'id'>;
  readonly recentAgents: readonly SideKickIdentity[];
  readonly recentModels: readonly SideKickIdentity[];
  readonly recentAgentsLabel: string;
  readonly recentModelsLabel: string;
  readonly onValueChange: (value: SideKickSelection) => void;
  readonly allAction?: ComposerAction;
  readonly onAllAction?: () => void;
}
export interface SideKickInputProps extends Omit<
  MessageComposerProps, 'selector' | 'onSubmit'
> {
  agentSelector?: SideKickAgentSelector;
  onSend: (draft: SideKickDraft) => void;
}
```

Omitting agentSelector hides the selector and snapshots automatic selection. A
selected nonautomatic identity must be supplied even if it is not in recents.
Business creates collision-free internal IDs from kind and opaque ID (no unsafe
delimiter concatenation). Agent and model IDs may coincide. Group order is automatic,
recent agents, recent models, all-action; consumer order within groups is preserved.
No arbitrary recent limit or automatic-selection service behavior is imposed.

Snapshots contain detached serializable document, ordered attachment IDs and
selection; no ReactNode, Lexical state, MediaStream or mutable source array. Additional
application/project/temporary-chat metadata is held by the consumer's integration,
not guessed by this library. Consumer-supplied attachments are not silently cleared
by the component; the consumer updates their list for the next draft on send and
retains the attachment records/resources referenced by the snapshot IDs for retry.

Dispatch order is: validate eligibility and latch this revision, capture
snapshot, synchronously call onSend(snapshot), then request onValueChange(empty) and
clear editor history. Do not await network results. This hands off the draft before
clearing; a synchronous onSend exception preserves the draft and resets the latch.
A consumer returning normally must retain the snapshot before its first await and
catch its own async failures. Core never restores a failed draft over new typing.
onValueChange must apply the controlled clear. Until that empty value or a different
document revision is acknowledged, the same revision cannot dispatch again; do not
rely only on a later pending prop. Pending independently disables send/prompt actions.

After dispatch focus the editor if focus was inside the composer and was not moved
by the consumer callback. Undo cannot restore a sent draft. Resubmission after failure
is explicit consumer draft restoration as a new controlled value. Whitespace and
mention identity are preserved in the snapshot. Prompt actions use onPrompt(id),
do not call onSend and do not clear document/attachments. Consumer owns prompt send,
removal and error/retry data. Library cannot guarantee persistence of consumer data.

## 8. Readiness and implementation boundary

R-01 is accepted by SIDEKICK-025 and R-02/V-01 by SIDEKICK-026. The component
specifications and final readiness assessment authorize only this bounded scope.
Unrelated features, extra public Parts, editor formatting, service integrations and
new visual variants remain outside it. A discovered ambiguity stops the affected step.

New component Storybook implementations do not yet exist. SIDEKICK-025 explicitly
accepts checked source/current Core reuse evidence and the concrete acceptance plan
for preimplementation READY. Actual public-example typechecks, real new stories,
package/browser/device and manual evidence are mandatory during implementation
completion. preImplementation metadata identifies this phase; it must be removed
when public implementation evidence is available. No planned result is called passed.
