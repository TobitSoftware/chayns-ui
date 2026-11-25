---
{
  "name": "TeamTalkInput",
  "package": "@chayns-ui/business",
  "category": "Business",
  "status": "implemented",
  "useWhen": [
    "Provide the TeamTalk message-entry surface with participant display and participant add/leave actions."
  ],
  "doNotUseWhen": [
    "Do not use as a generic composer, complete TeamTalk conversation, message history, or chat service."
  ],
  "alternatives": [],
  "combinations": [],
  "sourceReferences": [
    "team-talk-input-usage.md"
  ],
  "checkedOn": "2026-11-25",
  "stories": ["business/TeamTalkInput:EmptyWithoutAgree", "business/TeamTalkInput:AgreeEnabled", "business/TeamTalkInput:WithParticipants", "business/TeamTalkInput:MessageAndLeave"]
}
---
# TeamTalkInput — Component Specification

## Metadata

- Component Category: Business
- Specification Status: Implemented within the limited READY scope; deferred overlay remains out of scope
- Owner / Responsible Area: chayns UI; product/design acceptance by the requesting user
- Design Reference: User-provided screenshots and prototype clipping only; checked 2026-11-25. The prototype is available in the conversation source record; Bodywork is outdated and excluded by explicit user instruction.
- Relevant Decisions: BUS-001–004, TEAMTALK-001–015; limited READY assessment at `team-talk-input-readiness-assessment.md`
- Foundation Dependencies: Existing Core input, buttons and avatar components
- Related Components: Avatar, AvatarGroup, IconButton and Button. The add-person overlay/Core MultiSelect is deferred to a later scope.
- Last Reviewed: 2026-11-25

This specification records the implemented current-scope contract. The deferred Add-person overlay is not authorized by this assessment.

## Purpose

TeamTalkInput is a Business component for a TeamTalk message-entry surface. The current scope includes the input, current participant display, an optional leave action and a visible disabled Add button. The person-selection overlay and add behavior are deferred. The consumer supplies and controls person/member data; the component does not fetch data from a chayns API.

Conversation history and message rendering are outside the component. @-mention behavior is explicitly excluded from the first scope.

## Use When

Use for TeamTalk-specific message entry that needs its current participant avatars and add/leave actions, where the consuming application supplies person/search/member data and handles the resulting actions.

## Do Not Use When

Do not use as a generic text composer, full conversation/history component, or data-fetching/chat service.

## Related Components and Selection Boundaries

Existing Core Avatar, AvatarGroup, IconButton and Button are candidates for direct reuse. The add-person overlay is deferred by TEAMTALK-015. It is not part of this implementation step, and the visible Add button is disabled without an action. When the overlay is taken up later, it must use a separately specified generic Core MultiSelect matching the checkbox-row overlay shown in the user references. Existing SearchBox is not an accepted visual/interaction substitute because its selected-chip composition differs; the Core MultiSelect must receive its own implementation READY before that later overlay work begins.

## Anatomy and Composition

The supplied screenshots and prototype are the authoritative references. Conceptual anatomy (not a public compound API):

- **Participants:** overlapping/stacked participant avatars.
- **Leave action:** optional participant action; shown only when a leave callback is supplied.
- **Add action:** visible but disabled in the current scope; it has no callback or action until the deferred overlay is specified.
- **Composer:** pill-shaped text input with a trailing action. Empty text shows the agree action only when the consumer allows it; otherwise the action is disabled. Non-empty text shows send.
- **Person-selection overlay:** deferred to a later scope; it is not rendered in the current implementation.

Conversation history, message bubbles, typing state, @ mentions, thread state and transport are not included.

## Semantic and Accessibility Contract

The root is a native `div`; the composer is a native multiline `textarea` inside a native `form`, and icon actions are native buttons through Core `IconButton`. The composer starts at the standard `--ctrl-h` control height with reduced inner padding and grows evenly with multiline content. The textarea stays vertically centered with equal top and bottom spacing; the submit button is centered in the one-line minimum-height composer and follows the growing content while keeping a fixed bottom inset. The textarea accessible name and placeholder, action names and participant-group name are supplied as localized labels. Enter submits the form; Shift+Enter inserts a newline. IME composition Enter does not submit. The disabled Add action is a native disabled button. Root `div` props/ref are forwarded to the root; `textareaProps` and its ref target the primary textarea. The consumer input `onChange` runs before `onValueChange`; `preventDefault()` suppresses the latter. Leave button `onClick` runs before `onLeave`; `preventDefault()` suppresses the component callback. Message callback exceptions propagate. Overlay-specific popup/list semantics, dismissal/focus restore, result-update focus handling, and live search/selection announcements are deferred. Manual keyboard, screenreader, contrast and target-size verification remain release checks.

## Public API and Data Ownership

Confirmed decisions:

- `value` and member/result data are controlled by the consumer. TeamTalkInput does not clear the draft after sending.
- Person search is external: query changes are reported to the consumer, which supplies controlled results and search status.
- Search result information includes stable ID, name, optional secondary text and avatar data.
- Add action is visible but disabled in the current scope; the person picker and member-add callback are deferred.
- Leave action is rendered only if its callback is supplied; activation reports directly, without built-in confirmation, undo or rejoin behavior.
- The consumer controls whether agree is available. Empty value + agree available produces an agree send payload with empty text; empty value without agree disables sending. A non-empty value produces a message payload.
- @ mentions are excluded from this scope.

The current public API is exported as `TeamTalkInput`, `TeamTalkInputProps`, `TeamTalkInputLabels`, `TeamTalkMember` and `TeamTalkSendPayload`. Native root props and ref target the root `div`; direct native textarea props and ref target the composer textarea via `textareaProps`. Textarea `onChange` runs before `onValueChange`; calling `preventDefault()` in the native handler cancels the latter. Textarea `onKeyDown` runs before the built-in Enter/Shift+Enter handling; calling `preventDefault()` cancels built-in handling. Leave button `onClick` runs before `onLeave`; preventing default cancels `onLeave`. The prototype trims the draft for emptiness and trims message text in the send payload. Search/query lifecycle, selection, member-add callback, result identity, duplicate/existing-member handling and partial add failure are deferred with the overlay. All labels used in the current scope are resolved/localized by the consumer.

A public send payload must be a discriminated message/agree union. Agree payload's text is `''`. Send does not call `onValueChange`; clearing is controlled by the consumer.

## Variants and Local Size

No confirmed component variants or local size variants. Density remains the global S/M/L input. The single shown composition does not authorize additional variants.

## States and Behavior

Confirmed/observed reference states:

- Empty composer, agree allowed: thumbs-up action.
- Empty composer, agree unavailable: disabled send-arrow action.
- Empty composer, agree allowed: thumbs-up action.
- Non-empty composer: enabled send-arrow action. The thumbs-up/send-arrow icon swap uses the prototype transition tokens and is disabled for Reduced Motion.
- Add button remains visible and disabled; activating it is impossible and no action is reported.
- Overlay, query, row selection and member-add states are deferred to a later scope.
- Leave action is conditional on supplied callback.

Pending/error behavior for sending, participant overflow/empty states, disabled input, callback errors and whitespace-only input remain OPEN. Search/add async states and overlay behavior are deferred.

## Visual Reference Contract

The supplied screenshots and prototype clipping are the only component-specific visual/behavior sources. Bodywork is outdated and MUST NOT be used for this component.

The prototype's relevant CSS source evidence (selectors from the clipping, checked 2026-11-25; use these files only, not Bodywork). Current implementation matches participant stack/composer geometry and interaction states.

- `.tt-top`: flex row, centered, space-between; padding `var(--k2) var(--k8) var(--k6) var(--k16)`.
- `.stack .avatar`: `--k26` square, `--fs-micro`, surface separation ring; adjacent avatars overlap by `--k6`.
- `.tt-compose`: margin `0 var(--k16) var(--k12)`; flex row; gap `--k8`; source min-height `--k52`; `1px solid var(--border)`; radius `24px`; source padding `--k8 var(--k10) var(--k8) var(--k18)`. The requested implementation adjustment uses `--ctrl-h` minimum height and reduced padding `--k4 var(--k6) var(--k4) var(--k12)` so the one-line composer matches a standard TextField height; it grows evenly around the textarea, which remains vertically centered with equal top/bottom inset. The submit action stays vertically centered in the one-line state and moves down with the growing textarea, preserving its bottom inset. `var(--surface-2)` background. Hover/focus use `--input-border-hover`, `--accent`, focus ring tokens. Textarea typography uses `--fs-body`, text `--text`, placeholder `--muted`.
- `.tt-send`: `--k32` square, pill, accent background/on-accent, hover accent-hover, press scale `--motion-scale-press-s`; icon state swap uses the prototype's opacity/transform tokens `--dur-micro`, `--ease-enter`, `--dur-spring`, `--spring-default`, `--motion-scale-swap`.
- `.people-menu`: width `calc(290 * var(--u))`.
- `.menu-search`: `--k36` height, `--k8` gap, `--k12` horizontal padding, pill, surface, input-border; hover/focus tokens follow prototype.
- `.people-list`: max-height `calc(300 * var(--u))`, vertical scrolling.
- `.person-item`: gap `--k10`; avatar `--k28`; checkbox `--k18` with radius 5 and prototype check/selected-state transitions.
- `.people-foot`: gap `--k8`, padding `--k8 var(--k4) --k2`, margin-top `--k4`, top border `var(--border-soft)`.

This records source declarations, not a completed token audit. Implemented current-scope geometry follows the prototype declarations listed above. Responsive/zoom/Reduced Motion implications and full contrast remain release verification. Screenshots establish participant row/composer and the deferred search/multi-select overlay. They do not establish unshown states or dimensions not corroborated by prototype CSS. No new token or geometry may be invented. The overlay's detailed visual contract is deferred with that feature.

## Responsive, Internationalization and Motion

No Bodywork reference applies. Exact responsive/viewport collision behavior, narrow-width layout, text wrapping/scrolling, RTL requirements and reduced-motion mapping must be checked against the supplied prototype and screenshots; where the prototype does not settle a necessary accessibility behavior, leave it OPEN for the user. Visible labels, names, descriptions and accessible names are consumer-resolved/localized. No translation infrastructure or locale fallback is introduced. Motion is limited to source-backed prototype transitions and global Reduced Motion requirements; do not invent duration/curve/property.

## Dependencies and Non-Goals

Business uses Core-only visible UI. Required Core dependencies for the current scope: Avatar/AvatarGroup and IconButton/Button. The generic Core MultiSelect is a deferred dependency for the later overlay scope. No chayns API, person directory, search service, message history, chat transport, persistence or @ mentions are included.

## Test and Visual Verification Contract

Unit tests cover controlled textarea, Enter/Shift+Enter handling, message/agree payloads, consumer-owned clearing, native textarea props/events, conditional leave and disabled Add. Storybook covers empty/agree, participants, message send and leave interaction. Production build includes the separately exported Business stylesheet. Responsive/reflow/zoom, contrast/target size, and manual keyboard/screenreader checks remain release verification. External search, selection/add ordering, overlay keyboard/focus/dismissal, search loading/error, and duplicate/existing ID cases are deferred and must be added to a later overlay readiness assessment.

## AI Usage Contract

- Use when: a TeamTalk-specific input needs participants, add/leave actions and agree-aware send.
- Do not use when: generic text entry or a complete conversation/history is needed.
- Required context: controlled draft/members, agree permission; Add remains disabled and the overlay is out of scope.
- Forbidden assumptions: use of outdated Bodywork, internal data fetching, prototype demo services, @ mentions, guessed tokens, guessed unsourced behavior.

## Open Decisions

The current scope was assessed READY on 2026-11-25 and implemented within that boundary. The Add-person overlay and Core MultiSelect remain deferred and require a later specification and independent readiness review. Browser, screenreader, zoom, contrast, responsive and Reduced Motion checks remain release verification.
