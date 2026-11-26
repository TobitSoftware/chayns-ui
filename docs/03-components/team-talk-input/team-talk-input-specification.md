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
- Specification Status: Implemented within READY scope, including checkbox-based Add overlay
- Owner / Responsible Area: chayns UI; product/design acceptance by the requesting user
- Design Reference: User-provided screenshots and prototype clipping only; checked 2026-11-25. Bodywork is outdated and excluded by explicit user instruction.
- Relevant Decisions: BUS-001–004, TEAMTALK-001–009, TEAMTALK-011–014, TEAMTALK-016–020; readiness assessment at `team-talk-input-readiness-assessment.md`
- Foundation Dependencies: Existing Core Popup, Checkbox, Avatar, IconButton and Button components
- Related Components: Avatar, AvatarGroup, Popup, Checkbox, IconButton and Button
- Last Reviewed: 2026-11-25

This specification includes the user-authorized Add overlay composed from existing Core parts. Search data and membership updates remain controlled by the consumer.

## Purpose

TeamTalkInput is a Business component for a TeamTalk message-entry surface. The scope includes the input, current participant display, optional Leave action and an Add-person overlay composed from Core Popup and Checkbox. The consumer supplies and controls searchable people, query/loading state and membership updates; the component does not fetch data from a chayns API.

Conversation history and message rendering are outside the component. @-mention behavior is explicitly excluded from the first scope.

## Use When

Use for TeamTalk-specific message entry that needs its current participant avatars and add/leave actions, where the consuming application supplies person/search/member data and handles the resulting actions.

## Do Not Use When

Do not use as a generic text composer, full conversation/history component, or data-fetching/chat service.

## Related Components and Selection Boundaries

The Add overlay is composed directly from existing Core Popup, Checkbox, Avatar, IconButton and Button. Each result is a native Checkbox whose `children` compose the avatar, name and optional description. No new Core MultiSelect component or SearchBox-based chip UI is introduced. The consumer supplies externally filtered people and owns membership updates.

## Anatomy and Composition

The supplied screenshots and prototype are the authoritative references. Conceptual anatomy (not a public compound API):

- **Participants:** overlapping/stacked participant avatars.
- **Leave action:** optional participant action; shown only when a leave callback is supplied.
- **Add action:** opens a popup containing a controlled search input, externally filtered checkbox rows and an Apply footer.
- **Composer:** pill-shaped multiline text area with a trailing action. Empty text shows agree only when the consumer allows it; otherwise a disabled send action. Non-empty text shows send.
- **Person rows:** Core Checkbox with composed Avatar, name and optional generic description.
- **Selection:** temporary while the popup is open; Apply reports only newly selected people. Escape, outside press or close without Apply discards pending selection.

Conversation history, message bubbles, typing state, @ mentions, thread state and transport are not included.

## Semantic and Accessibility Contract

The root is a native `div`; the composer is a native multiline `textarea` inside a native `form`, and icon actions are native buttons through Core `IconButton`. The composer starts at the standard `--ctrl-h` control height with reduced inner padding and grows evenly with multiline content. The textarea stays vertically centered with equal top and bottom spacing; the submit button is centered in the one-line minimum-height composer and follows the growing content while keeping a fixed bottom inset. The textarea accessible name and placeholder, action names and participant-group name are supplied as localized labels. Enter submits the form; Shift+Enter inserts a newline. IME composition Enter does not submit. Add opens a Core Popup dialog; the search input receives focus on open, and popup Escape/outside-close restores focus to the trigger. Person rows are native Core Checkboxes with composed Avatar/name/description children, and each remains reachable by Tab/Space. Pending choices are discarded unless Apply is activated. Root `div` props/ref are forwarded to the root; `textareaProps` and its ref target the primary textarea. The consumer textarea `onChange` runs before `onValueChange`; `preventDefault()` suppresses the latter. Leave button `onClick` runs before `onLeave`; `preventDefault()` suppresses the component callback. Message callback exceptions propagate. Manual keyboard, screenreader, contrast, target-size, responsive and zoom verification remain release checks.

## Public API and Data Ownership

Confirmed decisions:

- `value`, members, search query and search results are controlled by the consumer. TeamTalkInput does not clear the draft after sending.
- Person search is external: query changes are reported to the consumer, which supplies filtered results and loading state.
- Search result information includes stable ID, name, optional generic description and avatar data.
- Add opens a checkbox popup. Pending selection is applied in one action; only newly selected people are reported to `onAddPeople`.
- Leave action is rendered only if its callback is supplied; activation reports directly, without built-in confirmation, undo or rejoin behavior.
- The consumer controls whether agree is available. Empty value + agree available produces an agree send payload with empty text; empty value without agree disables sending. A non-empty value produces a message payload.
- @ mentions are excluded from this scope.

The public API exports `TeamTalkInput`, `TeamTalkInputProps`, `TeamTalkInputLabels`, `TeamTalkMember`, `TeamTalkPerson` and `TeamTalkSendPayload`. Native root props/ref target the root `div`; textarea props/ref target the composer via `textareaProps`; Add trigger props/ref target its native button via `addButtonProps`; Apply button props target its native button via `applyButtonProps`. `peopleQuery` and `peopleSuggestions` are controlled by the consumer; `onPeopleQueryChange` reports search input, and `peopleLoading` represents external retrieval. Existing member IDs are filtered out of suggestions. Each rendered option uses native Core Checkbox semantics with composed children. Selection is temporary per popup session; `onAddPeople` receives only the selected, non-member results on Apply, and membership updates remain consumer-owned. Escape/outside close discards pending selection, restores trigger focus and resets a nonempty query through `onPeopleQueryChange('')`. All visible and accessible labels, including selection-count formatting, are consumer-localized. Apply button native `onClick` runs before `onAddPeople`; calling `preventDefault()` cancels the add action.

A public send payload must be a discriminated message/agree union. Agree payload's text is `''`. Send does not call `onValueChange`; clearing is controlled by the consumer.

## Variants and Local Size

No confirmed component variants or local size variants. Density remains the global S/M/L input. The single shown composition does not authorize additional variants.

## States and Behavior

Confirmed/observed reference states:

- Empty composer, agree allowed: thumbs-up action.
- Empty composer, agree unavailable: disabled send-arrow action.
- Non-empty composer: enabled send-arrow action. The thumbs-up/send-arrow icon swap uses the prototype transition tokens and is disabled for Reduced Motion.
- Add button opens the people popup; search query and loading/results are controlled by the consumer.
- Checkbox selection is temporary until Apply; current members are excluded and Apply reports selected new people only.
- Escape/outside press closes and discards selection; closing resets a nonempty controlled query.
- Leave action is conditional on supplied callback.

Pending/error behavior for sending, participant overflow/empty states, disabled input, callback errors and whitespace-only input remain OPEN. Search errors are not included; consumer loading and no-results states are specified.

## Visual Reference Contract

The supplied screenshots and prototype clipping are the only component-specific visual/behavior sources. Bodywork is outdated and MUST NOT be used for this component. The authorized overlay reference shows a 290-unit people popup, search field, scrollable checkbox rows with avatar/name/secondary text and selection footer.

The prototype's relevant CSS source evidence (selectors from the clipping, checked 2026-11-25; use these files only, not Bodywork). Current implementation matches participant stack/composer geometry and interaction states.

- `.tt-top`: flex row, centered, space-between; padding `var(--k2) var(--k8) var(--k6) var(--k16)`.
- `.stack .avatar`: `--k26` square, `--fs-micro`, surface separation ring; adjacent avatars overlap by `--k6`.
- `.tt-compose`: margin `0 var(--k16) var(--k12)`; flex row; gap `--k8`; source min-height `--k52`; `1px solid var(--border)`; radius `24px`; source padding `--k8 var(--k10) var(--k8) var(--k18)`. The requested implementation adjustment uses `--ctrl-h` minimum height and reduced padding `--k4 var(--k6) var(--k4) var(--k12)` so the one-line composer matches a standard TextField height; it grows evenly around the textarea, which remains vertically centered with equal top/bottom inset. Per the later user refinement, composer hover uses the same accent border color as focus. The submit action stays vertically centered in the one-line state and moves down with the growing textarea, preserving its bottom inset. `var(--surface-2)` background. Focus uses `--accent` and focus ring tokens; hover uses the same `--accent` border color. Textarea typography uses `--fs-body`, text `--text`, placeholder `--muted`.
- `.tt-send`: `--k32` square, pill, accent background/on-accent, hover accent-hover, press scale `--motion-scale-press-s`; icon state swap uses the prototype's opacity/transform tokens `--dur-micro`, `--ease-enter`, `--dur-spring`, `--spring-default`, `--motion-scale-swap`.
- `.people-menu`: width `calc(290 * var(--u))`.
- `.menu-search`: `--k36` height, `--k8` gap, `--k12` horizontal padding, pill, surface, input-border; hover/focus tokens follow prototype. Following the user's visual refinement, hover border uses the same accent color as focus.
- `.people-list`: max-height `calc(300 * var(--u))`, vertical scrolling.
- `.person-item`: gap `--k10`; avatar `--k28`; checkbox `--k18` with radius 5 and prototype check/selected-state transitions. In implementation each row is a Core Checkbox with composed custom children. The user-requested refinement increases row padding to `--k12` and adds a `--surface-alt` hover background. Rows use border-box sizing and the list clips horizontal overflow so the popup does not acquire a sideways scrollbar.
- `.people-foot`: gap `--k8`, padding `--k8 var(--k4) --k2`, margin-top `--k4`, top border `var(--border-soft)`.

This records source declarations, not a completed token audit. Implemented current-scope geometry follows the prototype declarations listed above. Responsive/zoom/Reduced Motion implications and full contrast remain release verification. Screenshots establish participant row/composer and the Add-person overlay. They do not establish unshown states or dimensions not corroborated by prototype CSS. No new token or geometry may be invented.

## Responsive, Internationalization and Motion

No Bodywork reference applies. Exact responsive/viewport collision behavior, narrow-width layout, text wrapping/scrolling, RTL requirements and reduced-motion mapping must be checked against the supplied prototype and screenshots; where the prototype does not settle a necessary accessibility behavior, leave it OPEN for the user. Visible labels, names, descriptions and accessible names are consumer-resolved/localized. No translation infrastructure or locale fallback is introduced. Motion is limited to source-backed prototype transitions and global Reduced Motion requirements; do not invent duration/curve/property.

## Dependencies and Non-Goals

Business uses Core-only visible UI. Required Core dependencies: Avatar/AvatarGroup, Popup, Checkbox and IconButton/Button. No generic Core MultiSelect is required. No chayns API, person directory, search service, message history, chat transport, persistence or @ mentions are included.

## Test and Visual Verification Contract

Unit tests cover controlled textarea, Enter/Shift+Enter handling, message/agree payloads, consumer-owned clearing, native textarea props/events, conditional leave, controlled add search, query reset, existing-member exclusion, temporary selection and Apply. Storybook covers empty/agree, participants, Add overlay and message send/leave. Production build includes the separately exported Business stylesheet. Responsive/reflow/zoom, contrast/target size, and manual keyboard/screenreader checks remain release verification. Search error behavior remains out of scope.

## AI Usage Contract

- Use when: a TeamTalk-specific input needs participants, add/leave actions and agree-aware send.
- Do not use when: generic text entry or a complete conversation/history is needed.
- Required context: controlled draft/members, agree permission, externally controlled people query/results/loading and localized overlay labels.
- Forbidden assumptions: use of outdated Bodywork, internal data fetching, prototype demo services, @ mentions, guessed tokens, guessed unsourced behavior.

## Open Decisions

The overlay extension was specified against TEAMTALK-016–020 and implemented using existing READY Core primitives. Browser, screenreader, zoom, contrast, responsive and Reduced Motion checks remain release verification.
