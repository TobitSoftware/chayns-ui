# SideKick Input — quality audit, 2026-10-26

Scope: the existing RichTextEditor / MessageComposer / SideKickInput READY contracts,
SIDEKICK-025–030 and the user's renewed request for exact ordinary Bodywork geometry,
hover/focus and interruptible motion. No public API, dependency or design token was
added. Core still owns all visible UI; Business still composes Core exclusively.

Reference: [Bodywork / Muster / KI & Sidekick](https://tappqa.tobit.com/Bodywork/DesignSystem/#/muster/ki-sidekick).
Live DOM, CSS, source resize logic and computed styles were inspected with Playwright.
Screenshots supplement the measurements; geometry was not inferred from screenshots.
The [visual contract](sidekick-input-visual-contract.md) remains normative, including
its explicit contrast, focus, responsive and functional-first exceptions.

## Reproduced defects and corrections

| Finding | Correction and evidence |
| --- | --- |
| Exiting microphone/Voice and entering Send occupied three flex positions for 140ms, displacing the selector in opposite directions. | Persistent CSS grid slots overlay Voice/Send/Accept. The microphone retains its physical position. CSS transitions reverse in place; there are no retention timers or remounted action buttons. Hidden actions immediately become disabled, aria-hidden and tabindex -1. StableActionTransitions samples actual browser frames and checks constant action-region width/position/height, bounded monotone selector entry, rapid reversal and DOM identity. |
| Primary actions did not have the source hover color. Menu keyboard focus lacked the source hover background. | Accent-hover, hover and focus backgrounds now use the existing source tokens. Ordinary pointer hover is guarded by the source hover media query. The already-confirmed visible AA focus outline remains. |
| Typography/identity paint differed at pixel level. | Source antialiased font rendering is scoped to the composer and its menu. The selector identity uses the source clipped border overlay; the Bodywork-specific mirrored PNG remains excluded by the accepted consumer identity contract. No font is loaded or globally assigned by Core. |
| Intrinsic Font Awesome glyph width was constrained to 1em; prompt and selector widths differed by 2.5px at M. | A composer/menu-scoped intrinsic-width override and source line-height 1.4 restore the measured widths, without changing the shared ButtonIcon contract. |
| Text changes repeatedly measured every row part and rebuilt a full editor probe; observer-driven height writes could cause ResizeObserver notification loops. | Action motion is CSS-owned. Height/FLIP responds to actual intrinsic changes; observer work is coalesced on animation frames. The oneLine probe is created once, inert and ID-free, updates content only when dirty, and skips unchanged geometry/font inputs. Observers, frames and the probe are cleaned up. |
| Reversing expansion mid-animation could cancel the old transforms and snap controls. Cached viewport coordinates could also become stale after page scrolling. | Running transforms are rebased on the previous target; part positions are relative to the surface. ReversibleExpansion checks expansion/collapse during active motion without editor replacement or focus loss. Source 220/140ms durations and curves remain unchanged. |
| A long translated selector label wrapping independently of the actions could be translated outside a narrow surface. | The source k30+k8 translation is enabled only for an adjacent action region with sufficient room. Wrapped labels remain within the surface under the already-confirmed reflow exception. LongSelectionLabels exercises a 272px composer. Ordinary source geometry is unchanged. |
| A consumer replacement could hide a focused capture action. | The disappearing action restores editor focus only when it still owns focus. ExternalDraftRestoresFocus exercises consumer-driven retry restoration. Dictation keeps the same microphone node across idle/listening/pause/resume. |

## Reference measurements

Both the source and Business Default were measured in Chromium and WebKit with
loaded Roboto/Font Awesome, sf 0.9 / 1 / 1.125, and composer widths 272 / 327 / 520 /
960 CSS px: **24 comparisons**. Surface, editor root, add, first prompt, selector,
identity circle, microphone and Voice bounds agreed within 0.05 CSS px. This is the
measurement tolerance, not a claim that every raster pixel is identical.

At sf 1 and width 960, both implementations produced:

| Part | x / y relative to surface | Width / height |
| --- | --- | --- |
| Surface | 0 / 0 | 960 / 98.390625 |
| Editor root | 13 / 13 | 934 / 30.390625 |
| Add | 13 / 56.390625 | 28 / 28 |
| First prompt | 49 / 56.390625 | 122.765625 / 28 |
| Selector, empty | 723.140625 / 56.390625 | 147.859375 / 28 |
| Selector, filled | 761.140625 / 56.390625 | 147.859375 / 28 |
| Microphone | 879 / 55.390625 | 30 / 30 |
| Voice/Send physical slot | 917 / 55.390625 | 30 / 30 |

The filled/empty exchange leaves the surface height and prompt-region width
unchanged. Native per-frame inspection confirms the source's 38px selector
translation at M and shared Voice/Send position. Selector menus measure 280px with
an 8px trigger gap; the selected row uses tint. The send glyph retains the source
-1.5u/+1.5u optical correction.

Default theme inputs differ: Bodywork starts at #0f6d7e; Storybook starts at #005eb8.
The component consumes the resolved accent rather than hard-coding Bodywork's
example color. SIDEKICK-027 intentionally strengthens source borders/placeholder;
the accepted AA focus outline intentionally supplements Bodywork's soft ring.
These differences must not be reported as an identical raster comparison.

A further 960 × 99 raster comparison checked empty and filled inputs with matching
host background, resolved theme inputs, pixel-aligned placement and the accepted
AA border/placeholder treatment applied to the reference. Bodywork's decorative
identity PNG was removed from the reference for this comparison because the
accepted library contract explicitly uses consumer-provided identity content.
Each image contained 95,040 pixels: only 36 pixels differed, by at most 1/255 per
channel, confined to the identity border. No other pixel differed. This narrowly
scoped, normalized raster result is not a claim of identical untouched screenshots
or of completed hover/focus/manual accessibility certification.

## Verification

| Check | Result |
| --- | --- |
| Workspace unit suite | 257 passed, 39 files |
| RichTextEditor / MessageComposer / SideKickInput browser stories, including axe | 42 passed, 3 files; includes four new regression stories |
| Additional scoped WCAG A/AA axe and target-size matrix | 36 combinations: idle, dictating and paused × light/dark × S/M/L × standard/high contrast; no violations, targets at least 24px |
| Native Chromium and WebKit interaction | Main Core/Business compositions, menus/Escape, typing/clearing, multiline and reduced motion checked; no horizontal page overflow at 320px |
| Rapid native typing | 20 complete typing/clear cycles per engine preserve every character |
| Real browser media plumbing with Chromium fake device | Consumer receives a native MediaStream with live audio track; end stops it; no physical-device or recognition-service claim |
| Dictation state presentation | X cancel, primary listening microphone, gray paused microphone, outlined check; lifecycle/late-event/undo tests retained |
| Performance instrumentation | One measuring probe throughout short and long oneLine input; no extra WAAPI animation for unchanged short-line geometry, no active animation after settling, no continued animation creation during idle; no page/ResizeObserver errors in checked runs |
| Core build, TypeScript/public fixtures, scoped ESLint/CSS lint and formatting | Passed |
| Documentation and component metadata | Passed |
| Fresh static Storybook build/import checks | Passed; all 137 stories render in Chromium and WebKit, with populated tables for 31 public compound parts |

The browser tests use actual DOM/model behavior; the native Playwright checks also
use trusted keyboard and pointer events. Recognition stories explicitly use API
doubles. The previous unrelated full-workspace SearchBox accessibility failure remains
recorded in the [implementation report](sidekick-input-implementation-report.md).
The earlier static Popup navigation timeout did not recur: the fresh 137-story
static import check passes in both engines. This is not a passing claim for the
entire workspace's axe/interaction suite, and no check was disabled.

## Limits and remaining acceptance

The checked states now satisfy the measured ordinary geometry and tested behavior.
A universal “perfect” or “100% accessible” claim would exceed this evidence:

- Physical microphone/speech-service behavior, OS interruption and device permission
  variations still need the accepted real-device matrix.
- VoiceOver/NVDA and the complete supported-browser, actual browser-zoom and text-size
  acceptance matrix remain manual work. Axe is not a screenreader certification.
- Final designer styling for active Voice and the other explicitly functional-first
  additions remains pending under SIDEKICK-026. Their current functional scope is
  authorized; their final visual design has not been invented in this audit.
- Air's embedded preview injects request headers that block the existing hosted
  Roboto/Font Awesome assets with CORS errors. Standalone Playwright loaded those
  assets successfully for the comparisons. No unrelated font-loading architecture
  was changed to hide the preview limitation.

GitNexus CLI was used before changes for graph exploration/impact and refreshed
with --index-only after the audit. Wrapped components and inferred callback edges
are not completely represented; source searches and the executable browser/unit
checks validate the affected paths. No publication or release approval is implied.
