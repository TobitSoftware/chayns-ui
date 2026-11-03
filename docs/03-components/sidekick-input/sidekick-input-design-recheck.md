# SideKick Input — live design recheck

Checked: 2026-10-23. Reference: [Bodywork / Muster / KI & Sidekick](https://tappqa.tobit.com/Bodywork/DesignSystem/#/muster/ki-sidekick).

This follow-up records defects in the initial implementation and the user's updated
capture requirements. It does not claim completed visual acceptance. Existing
SIDEKICK-027 accessibility corrections remain confirmed.

## Live browser evidence

Playwright Chromium opened the live reference and the running Storybook. Checks
used actual DOM interactions and computed CSS, with screenshots for comparison:

- Empty two-line reference: microphone and accent waveform action are both visible.
  At density M and width 960px the surface measures approximately 98.39px high.
- Typing replaces the microphone/voice actions with Send. Clearing restores them.
- Entering two lines in the one-line reference sets data-multiline=true, places
  text above the action row and uses 12px vertical / 8px horizontal gaps.
- Plus opens an upward, left-aligned menu containing Bilder, Dateien, Temporärer
  Chat and Projektzuordnung. Escape closes it.
- The agent menu opens upward, right-aligned, with a 280px width, grouped entries,
  checked selection and a final all-agents action. Selecting ChatGPT updates the
  trigger label. The short-label breakpoint is the row's 520px container width.
- Clicking the reference microphone did not enter a recording/paused state.
  The active dictation design below comes from the user's instruction, not from
  a claimed working recognition session in Bodywork.

Computed CSS was read from the live stylesheet; screenshot geometry was not used
to invent missing tokens. Browser/device speech recognition was not exercised.

## Confirmed defects and bounded corrections

The Business ControlledSend story is effectively an empty editor after its play
interaction; neither dictation nor voice is configured. CompleteComposition only
configures dictation. Consequently these stories do not demonstrate the requested
normal composer. The native recognition adapter exists, but opt-in configuration
and the generic active-state controls make it unavailable or unrecognizable in
the default presentation.

Source-backed ordinary-UI corrections made in this follow-up:

- Row gap k12 vertically / k8 horizontally, restoring the two-line text/action gap.
- Editor focus activates the source's outer accent line plus soft focus ring;
  a second inner editor outline is suppressed only inside this composer. Buttons
  retain their own focus indicators; forced colors gets a system-color outline.
- The optical paper-plane offset applies only to that glyph, not the waveform.
- Selected menu items use tint, headings use k8/k12/k4 padding.
- Action entry/exit includes the source's scale .6/1 as well as opacity; existing
  reduced-motion rules disable the decorative animations.

The follow-up additionally corrects selector identity geometry/placement, checked
menu tint and group separators, avatar/icon presentation, prompt sizing/overflow
and ordinary source-backed height/FLIP transitions. A new private motion hook uses
the reference's measured translations and height transition, 220/140ms and curves,
with cancellation/cleanup, reduced-motion handling and no animation during capture.
The source resizeSkField implementation was inspected in the live inline script.
At density M and width 960px the revised surface measures 98.39px, matching the
reference; source-backed editor/row gaps are 12/8px. Approved AA border/placeholder
corrections remain deliberately stronger than the low-contrast reference.

## User-confirmed capture design update

The following supersedes the generic text-button treatment of active dictation in
the earlier functional-first audio exception:

- Native dictation and voice UI belong to the component's normal feature set.
  Consumers can explicitly hide either feature with a property. Capability checks
  remain required. Transport and service communication remain consumer-owned.
- During active or paused dictation the left plus becomes an X through a 45-degree
  rotation and provides Cancel, even if there are no configured add-menu actions.
- The microphone remains in its usual position. Listening uses accent/on-accent;
  clicking pauses recognition, paused uses a gray background, clicking resumes.
- The waveform action is replaced by an outlined, transparent check action to
  accept dictation. It does not send the message.
- Text remains live and the editor remains locked while the session is active,
  including pause. Attachments and menu content still come from the consumer.

Shared contract section 9 documents the existing disabled-bg/text gray mapping,
transition-state action availability, focus return and accessible names before
implementation. No new color value is introduced.

## Focused clarification resolved

The user answered all structured questions on 2026-10-23:

1. X discards the entire session and restores the original empty draft.
2. Recognition language follows HTML lang / browser language with optional override.
3. Hide Voice when no stream callback exists; no extra visibility property is needed.

SIDEKICK-028–030 and shared contract section 9 record the resolved API/state/token/
focus/accessibility scope. Core/Business readiness assessments authorize that bounded
revision. Native dictation is now enabled by default; the existing disabled option
remains supported. Only onStream is required inside the optional voice object.

Business/SideKickInput:Default is a complete, interactive consumer example using
native APIs; Attachments provides file selection/removal and snapshot submission.
Core's Recording/Paused examples explicitly simulate recognition for reproducible
state evidence; Lifecycle/Cancel/Disabled exercise actual component transitions.

GitNexus was refreshed with --index-only before exploration. Its query resolves
the composer/capture/editor paths. Impact reports no resolved upstream callers
for the forwardRef-wrapped MessageComposer; source search confirms Business and
stories consume it. The missing graph edges are not evidence of no impact.

## Main-story recheck — 2026-10-23

The first Core/MessageComposer:TwoLine story still rendered a bare editor, even
after the Business default example had been completed. It now demonstrates the
same ordinary two-line composition as Bodywork: three prompt actions, automatic
context selection with grouped agents/models, all four add-menu entries, default
native dictation and voice through an explicitly supplied stream callback.
CompleteComposition reuses this configuration and adds the confirmed snippet strip.

The Core example now owns functional selection, file items/removal and prompt
removal; the component itself remains generic. Debug document JSON no longer
appears below the editor. Business Default forwards story args, including layout,
dictation and voice configuration; file selection/removal remains consumer-owned.
WithoutVoice demonstrates omission of the stream callback. The untouched first
stories have no play interaction that would leave the initial input filled or
remove its chips. Separate interaction stories exercise that behavior.

The full Core composition is also used by DictationLifecycle, DictationRecording
and DictationPaused, so X, primary/gray microphone and outlined acceptance action
can be reviewed with the normal surrounding controls. These recognition stories
explicitly use simulated browser APIs; the main stories use native APIs.

All 27 Composer/SideKickInput browser stories, including axe checks, pass after
this correction. The main-story interaction checks cover menu contents, selection,
prompt dispatch/removal without text insertion, attachments and optimistic send.
The final popup comparison additionally found a missing border-box declaration
(294px rendered width instead of 280px), a missing k8 trigger gap and the unresolved
--tint reference. These are corrected from the checked live CSS/applyTheme source.
The already-required tint dependency is transferred into explicit/automatic theme
tokens and public token typing: light uses accent 14% / white 86%; dark uses
#1a3138 88% / accent 12%, or base 93% / accent 7% in high contrast. The checked icon
uses accent/fs-caption/k16, as in the source. No component API or dependency was
introduced, and the confirmed AA border/placeholder exceptions remain unchanged.

## Full interaction audit — 2026-10-26

The renewed user request authorizes correction/review of all existing composer
states, including exact ordinary Bodywork motion, hover and focus. Live Chromium
inspection reads DOM, computed styles and per-frame bounds rather than inferring
geometry from screenshots. The component-specific READY scope and public API stay
unchanged. Existing AA requirements and SIDEKICK-027 remain normative: source
placeholder/border/focus treatments cannot silently weaken accessibility.

First reproduced defects: exiting mic/voice and entering Send occupy three flex
positions for 140ms; the selector first moves left, then right. Bodywork instead
overlays voice/send in one k30 slot, retains the microphone position and translates
the selector by k30+k8. Source durations are 220/140ms and the documented curves.
The library also omits primary-action hover, constrains Font Awesome's intrinsic
glyph width to 1em (2.5px differences in chips/selector), and repeatedly measures
all row parts for text mutations that do not alter layout. Corrections must use
stable overlapping slots, immediately inert hidden controls and interruptible CSS
transitions; only actual multiline geometry changes need measured height/FLIP.


The completed [quality audit](sidekick-input-quality-audit.md) records the fixes,
24 cross-browser/density/width geometry comparisons, frame sampling, long-label
reflow, performance instrumentation, 42 passing affected browser stories and the
remaining manual/design acceptance limits. Stable slots preserve the live 38px
selector movement at M; hidden controls are immediately inert. The source token
mapping and accepted AA corrections remain unchanged.
