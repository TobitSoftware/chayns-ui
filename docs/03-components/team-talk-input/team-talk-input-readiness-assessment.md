# TeamTalkInput — Component Implementation Readiness Gate

- Gate Result: **READY — limited current scope**
- Checked: 2026-11-25 (preimplementation contract review); implementation verified 2026-11-25
- Scope: Business TeamTalkInput current step (composer, participant display, optional leave, visible disabled Add button; overlay deferred)
- Decisions: TEAMTALK-001–015 (CONFIRMED); user-provided screenshots/prototype are the sole component-specific references
- Specification: [TeamTalkInput](team-talk-input-specification.md)
- Open implementation blockers: **none within current implementation scope; overlay deferred**

## Confirmed scope decisions

- Current scope: input, current participant display, optional leave, and a visible disabled Add button; the add-person overlay is deferred. Conversation history/messages are not in scope.
- Person/member data are external and controlled. Search query is reported to the consumer; consumer provides results/status.
- Search result data has stable ID, name, optional description and avatar data.
- Agree is consumer-enabled and sends `{ type: 'agree', text: '' }`; message sends `{ type: 'message', text }`. Empty input without agree shows the send-arrow icon on a disabled action; allowing agree shows the thumbs-up icon, and the icon swap follows the prototype transition tokens with Reduced Motion support.
- Draft clearing is consumer-owned.
- Leave is immediate and only shown when callback supplied. No built-in confirmation/undo/rejoin.
- @ mentions are excluded.
- User screenshots and prototype are the sole component-specific design/behavior references. Bodywork is outdated and excluded.
- The Core MultiSelect and add-person overlay are deferred from the current scope. If added later, use a separately READY generic Core MultiSelect; existing SearchBox is not an accepted substitute.

## Blockers

| Area | Status | Blocker |
|---|---|---|
| Core dependency | DEFERRED | Core MultiSelect is not needed for the current implementation because the Add button is disabled and the overlay is omitted. It becomes a prerequisite only when the overlay is brought into scope. |
| Public API | READY | Component uses a controlled text value and onValueChange, requires localized labels, controlled members and onSend; native root and textarea props/ref are forwarded. Event composition is specified in the implementation contract. Search/member-add API remains deferred with the overlay. |
| Search async states | DEFERRED | Loading/error/no-results states and result lifecycle identity are required only when the overlay is implemented later. |
| Add behavior | DEFERRED | Add button is rendered disabled, with no action. Selection, existing-member exclusion, external membership updates and overlay behavior belong to the later overlay scope. |
| Send behavior | READY | Prototype uses trimmed emptiness and submits trimmed message text. Agree is available only when enabled; payload text is empty. Composer is a controlled multiline textarea: Enter submits, Shift+Enter inserts a newline, and IME composition does not submit. The requested initial height matches the Core TextField control height with reduced padding; the textarea remains vertically centered with equal inner spacing, and the action is centered in the one-line composer then follows the growing content while preserving the same bottom inset. Disabled state is explicit; callback exceptions propagate and do not mutate controlled value. |
| Leave | READY | Optional callback controls visibility; activation calls it directly. Native button props/ref are forwarded through IconButton; shared disabled state applies. |
| Participants | READY | Consumer order is preserved; Core AvatarGroup renders all avatars when max is omitted. Empty members render an empty named group. Avatar accessible names come from the required person name. |
| Accessibility | READY — specified semantics | Native form/textarea/button semantics; localized accessible names are required; Enter submits and Shift+Enter inserts a newline; disabled Add is natively disabled; participant group and avatars have names. Overlay requirements are deferred. Contrast, target sizes and manual keyboard/screenreader verification remain release checks. |
| Visual/Foundation | READY — source-matched current states | Current participant/composer/Add geometry and send-icon state transitions follow the supplied prototype CSS. Overlay-specific visual contract is deferred. Responsive/zoom/Reduced Motion/contrast checks remain release verification. No Bodywork allowed. |
| Tests/Stories | READY | Focused unit tests and Storybook stories cover controlled input, agree/message states/payload, trimmed text, disabled Add and conditional leave. Build/typecheck, unit tests, ESLint, Prettier, Stylelint and documentation verification pass. Manual accessibility checks remain before release. |

## Reference and evidence record

- Screenshots checked 2026-11-25 and authorized as the visual reference for the shown participant/composer and add-person overlay states.
- Prototype clipping inspected 2026-11-25 for TeamTalk markup, CSS, membership/add/search/send handlers. Current participant/composer source values are recorded in the specification; overlay-specific evidence is deferred with that scope.
- Bodywork is outdated and explicitly excluded by TEAMTALK-014; it is not used as a source for this scope.
- @ mentions in the prototype are excluded by explicit user decision.
- Storybook coverage: `packages/business/stories/TeamTalkInput.stories.tsx`; unit coverage: `packages/business/tests/TeamTalkInput.test.tsx` (8 tests pass). Build/typecheck, ESLint, Prettier and Stylelint pass for component/package files. Documentation gate and production stylesheet packaging are verified. Manual browser, screenreader, zoom, contrast, responsive and Reduced Motion verification remain release checks.

## Gate decision

The documented current scope was READY for implementation and is now implemented: composer, participant display, optional Leave, and a visible disabled Add button. This limited READY does not include the add-person overlay, search or adding participants. The overlay requires its own specification and readiness review before implementation.
