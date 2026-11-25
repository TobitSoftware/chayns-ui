# TeamTalkInput — Component Implementation Readiness Gate

- Gate Result: **READY — current scope including Add overlay**
- Checked: 2026-11-25; overlay extension decision/spec review completed 2026-11-25
- Scope: Business TeamTalkInput composer, participant display, optional Leave, controlled person search, checkbox Add overlay and Apply action
- Decisions: TEAMTALK-001–009, TEAMTALK-011–014, TEAMTALK-016–020; user-provided screenshots/prototype are the sole component-specific references
- Specification: [TeamTalkInput](team-talk-input-specification.md)
- Open implementation blockers: **none for scoped behavior; search error state remains out of scope**

## Confirmed scope decisions

- Current scope: input, current participant display, optional leave and Add overlay. Conversation history/messages are not in scope.
- Person/member data are external and controlled. Search query is reported to the consumer; consumer provides filtered results and loading status.
- Search result data has stable ID, name, optional generic description and avatar data.
- Overlay selection is temporary; Apply reports only selected new results. Escape/outside close discards selection and clears the query.
- Agree is consumer-enabled and sends `{ type: 'agree', text: '' }`; message sends `{ type: 'message', text }`. Empty input without agree shows the send-arrow icon on a disabled action; allowing agree shows the thumbs-up icon, and the icon swap follows the prototype transition tokens with Reduced Motion support.
- Draft clearing is consumer-owned.
- Leave is immediate and only shown when callback supplied. No built-in confirmation/undo/rejoin.
- @ mentions are excluded.
- User screenshots and prototype are the sole component-specific design/behavior references. Bodywork is outdated and excluded.
- Add overlay uses existing Core Popup and Checkbox with composed custom Checkbox children; no new generic Core MultiSelect or SearchBox replacement is needed.

## Blockers

| Area | Status | Blocker |
|---|---|---|
| Core dependency | READY | Existing Core Popup, Checkbox, Avatar, IconButton and Button satisfy the selected implementation; no new Core primitive is required. |
| Public API | READY | Controlled query/results/loading, localized overlay labels, `onAddPeople`, native root/textarea/Add trigger/Apply props are documented and typed. Consumer owns search and membership updates. |
| Search async states | READY — limited | Consumer-owned loading and empty-result states are rendered. Search error state is explicitly out of scope. |
| Add behavior | READY | Existing members are excluded; temporary checkbox selection is discarded on close unless Apply reports selected new people. Query resets on close. |
| Send behavior | READY | Prototype uses trimmed emptiness and submits trimmed message text. Agree is available only when enabled; payload text is empty. Composer is a controlled multiline textarea: Enter submits, Shift+Enter inserts a newline, and IME composition does not submit. The requested initial height matches the Core TextField control height with reduced padding; the textarea remains vertically centered with equal inner spacing, and the action is centered in the one-line composer then follows the growing content while preserving the same bottom inset. Disabled state is explicit; callback exceptions propagate and do not mutate controlled value. |
| Leave | READY | Optional callback controls visibility; activation calls it directly. Native button props/ref are forwarded through IconButton; shared disabled state applies. |
| Participants | READY | Consumer order is preserved; Core AvatarGroup renders all avatars when max is omitted. Empty members render an empty named group. Avatar accessible names come from the required person name. |
| Accessibility | READY — specified semantics | Native form/textarea/button/checkbox semantics; localized accessible names and live loading/count announcements; search focus on open; Escape/outside close and focus restoration follow Core Popup; checkbox rows use Tab/Space. Contrast, target sizes and manual keyboard/screenreader verification remain release checks. |
| Visual/Foundation | READY — source-matched states | Current participant/composer/send and people-overlay geometry follow supplied prototype CSS. Responsive/zoom/Reduced Motion/contrast checks remain release verification. No Bodywork allowed. |
| Tests/Stories | READY | Focused unit tests and Storybook cover controlled input, agree/message states/payload, trimmed text, Add overlay, controlled search, focus, temporary selection, Apply and conditional Leave. Full verification is recorded after implementation below. Manual accessibility checks remain before release. |

## Reference and evidence record

- Screenshots checked 2026-11-25 and authorized as the visual reference for the shown participant/composer and add-person overlay states.
- Prototype clipping inspected 2026-11-25 for TeamTalk markup, CSS, membership/add/search/send handlers. Overlay evidence includes 290-unit popup width, 36-unit search field, 300-unit scroll list, avatar/name/secondary-text checkbox rows and selection-count/apply footer.
- Bodywork is outdated and explicitly excluded by TEAMTALK-014; it is not used as a source for this scope.
- @ mentions in the prototype are excluded by explicit user decision.
- Storybook coverage: `packages/business/stories/TeamTalkInput.stories.tsx`; unit coverage: `packages/business/tests/TeamTalkInput.test.tsx` (10 tests pass). Build, typecheck, unit tests, ESLint, Prettier, Stylelint, documentation gate and production stylesheet packaging are verified. Manual browser, screenreader, zoom, contrast, responsive and Reduced Motion verification remain release checks.

## Gate decision

The expanded scope was assessed READY and is implemented: composer, participant display, optional Leave, consumer-controlled search and the checkbox-based Add overlay. Search error, conversation history and @ mentions remain out of scope.
