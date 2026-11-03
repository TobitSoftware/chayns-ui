# SideKick Input — visual evidence and accepted mapping

Checked: 2026-10-22. Status: **ACCEPTED for functional implementation — SIDEKICK-026**.
Reference: [Bodywork / Muster / KI & Sidekick](https://tappqa.tobit.com/Bodywork/DesignSystem/#/muster/ki-sidekick).

Follow-up checked 2026-10-23 and 2026-10-26: [Live design recheck](sidekick-input-design-recheck.md).
The user's specified microphone/pause/check/cancel design supersedes the generic
text-button exception below for active dictation. The default/capture API
revision is confirmed by SIDEKICK-028–030; the earlier functional-first acceptance must
not be read as acceptance of the user-reported visual and feature omissions.

## Evidence and limits

Live HTML and tobit-ds.css were downloaded again on 2026-10-22 and were byte-identical
to the files inspected in the analysis. SHA-256: CSS
`341cd2a2e0c8fa4bfeb3db708bcddcb86120701f3ba0ad9873329857cb2af98d`;
HTML `c23cbb7f7178c665fddfdc8b52ee6f22d6115a8a0f3f6dd6e71f121b1317089e`.
The web reader could not access Bodywork; direct HTTP retrieval succeeded. Figma
node 1595:1633 is linked by Bodywork but was not independently inspected.

Source selectors `.sk-input`, `.sk-input--1line`, `.sk-input-text`, `.sk-input-field`,
`.sk-chip`, `.sk-chip--agent`, `.sk-mic`, `.sk-action`, `.sk-menu`, `.sk-menu--plus`
and the sk-row container query provide the mapping below. Existing browser reference
checks covered prompt replacement, menus/Escape, long text and a 375px viewport.
They are not acceptance evidence for the proposed rich-text implementation.

## Source-backed mapping for the ordinary composer

| Part/state | Bodywork evidence | Library mapping |
| --- | --- | --- |
| Surface, twoLine | gap/padding k12, max-width 960px, blur 20px, 0.5px border, radius 24px | Preserve those source values; spacing uses sp-3, existing k values for explicitly evidenced control measures. |
| oneLine idle | padding k11/k12, pill 999px | Preserve; layout is a design variant, no local density size prop. |
| oneLine wraps | grid text above actions, gap k12/k8, radius 24px | Preserve visual arrangement; DOM reading/focus order must match it. |
| Editor | padding k4/k8, fs-bodyl, line-height 1.4, one to ten lines | Replace textarea with RichTextEditor using exactly these outer text metrics; after ten lines scroll internally. No native manual resize. |
| Prompt chip | height k28, gap k4, padding-inline k12, fs-body, 0.5px border, pill | Preserve; native button with external action instead of Bodywork prefill. |
| Add | k28 square, 0.5px border, icon k10 | Preserve; composer-owned native button, not a new IconButton size. |
| Selector chip | height k28, gap k8, padding k2/k12/k2/k2, avatar k24 | Preserve; generic internal avatar uses supplied image or icon, otherwise initials from the visible label. No Bodywork image URL or mirrored PNG is shipped. |
| Selector name | full label above 520px sk-row container width, short label at/below | Both labels externally supplied; accessible name always includes the full label. Chevron stays visible at both widths, matching live source rather than the contradictory prose note. |
| Dictation/Voice/Send idle | k30 square; dictation outlined, Voice/Send accent/on-accent | Preserve; Voice and Send share one visible action position. Hidden actions are absent/inert, never invisible focus stops. |
| Icons | fa-plus, fa-microphone, fa-waveform-lines, fa-paper-plane, fa-chevron-down | Existing host-supplied FontAwesome contract; Regular at rest, Solid hover/active if available. No icon dependency. |
| Send icon adjustment | translate -1.5u / +1.5u | Preserve source optical correction; no independently tuned offset. |
| Selector menu | border-box width 280px, k6 padding, k8 trigger gap, border 1px, radius 12px | Preserve; z-popover, surface, border, shadow-pop. Upward-first, inline-end alignment with collision handling in the interaction contract. |
| Add menu | min-width 200px, k8/k12 rows, k12 icon gap | Preserve, viewport-clamped; inline-start alignment. Long names wrap when necessary. |
| Selector rows | k7/k10 padding, k10 gap, radius 8px, fs-body, description fs-caption | Preserve; checked tint, hover token and visible focus ring supplement source hover-only focus. Group headings fs-micro/700/0.8px letter spacing, localized heading text not forcibly uppercased if it harms supplied language. |

General relationship gaps use the existing sp-1/sp-2/sp-3 scale. Source-backed
component measures may use k2/k7/k10/k11/k24/k28/k30; these are already emitted by
scale.css. Existing source-specific literal radii 8/12/24/999px are documented here,
not newly named radius tokens or an invented intermediate radius scale.

## Color token transfer

These Bodywork component tokens are absent from the current token artifacts. The
accepted transfer adds the evidenced names to the token package's resolved color
output and public token typing; Core consumes them rather than defining a private
competing theme. No ThemeConfig option is added.

| Token | Light | Dark | Accepted accessibility treatment |
| --- | --- | --- | --- |
| --sk-input-bg | rgba(255,255,255,.8) | rgba(22,36,42,.8) | Preserve alpha; verify on supported page/surface backgrounds. |
| --sk-input-shadow | 0 4px 10px rgba(0,0,0,.1) | 0 4px 10px rgba(0,0,0,.35) | Preserve source shadow. |
| --sk-agent-bg | #f7f7f7 | #22333a | Preserve; verify text/icon contrast. |
| --sk-input-border | source rgba(0,0,0,.04) | source rgba(255,255,255,.08) | Accepted correction to existing text-3 (SIDEKICK-027) for an identifiable control boundary in all modes. Do not ship source alpha as a contrast claim. |
| --sk-chip-border | source rgba(0,0,0,.1) | source rgba(255,255,255,.16) | Accepted correction to text-3 (SIDEKICK-027) for outlined interactive chips. |
| --sk-avatar-border | rgba(0,0,0,.25) | rgba(255,255,255,.25) | Preserve decorative border; avatar has adjacent identity text. |
| --sk-placeholder | source rgba(0,0,0,.4) | source rgba(255,255,255,.45) | Accepted correction to text-3, following TextArea's documented AA correction. |
| --tint | mix accent 14% / white 86% | mix #1a3138 88% / accent 12% | Required checked-row dependency already specified above. Exact live applyTheme calculation checked 2026-10-23; dark high contrast uses base 93% / accent 7%. Consume the resolved accent; preserve the check icon as the noncolor indicator. |

High-contrast uses text-3 for both borders and text-3 for placeholder. In
forced-colors use Canvas/CanvasText and a solid system-color focus outline; no
background image conveys required identity. Default text uses text; secondary text
uses text-2/text-3, actions accent/on-accent, hover/selected states hover/tint. Disabled
uses existing disabled-bg/disabled-fg/disabled-border. A read-only editor retains
legibility; capture status explicitly explains why editing is locked. Pending uses
the existing Core Spinner plus disabled action semantics, not opacity alone.

Contrast checks are implementation acceptance requirements, not completed evidence:
4.5:1 normal text, 3:1 necessary control boundaries/state indicators, visible focus
and all supported reference theme combinations. If text-3 fails in the
actual composited surface, stop the affected implementation and resolve the token
mapping; do not invent a color or weaken WCAG. The same rule applies to custom
consumer theme inputs under the existing resolver contract.

## V-01 — accepted bounded visual treatment

Audio styling is already deferred by SIDEKICK-012. SIDEKICK-026 extends **functional-first**
treatment only to the newly requested areas without a Bodywork design:

- **Inline mentions:** reuse SearchBox's surface-alt/text-2/pill visual language,
  with inherited editor font/line-height, sp-1 inline padding and no extra block
  padding. Text wraps as a whole atom where possible; a longer-than-container label
  may wrap visually inside the noneditable atom without becoming partially editable.
  No avatar, trailing remove icon or new semantic color is introduced inside text.
- **Mention results:** reuse existing SearchBox listbox surface/options and focus
  colors, adapt the anchoring to the editor. Text-only labels in the first scope;
  status/error text uses existing text roles. This is reuse of styling/behavior
  patterns, not an instance of SearchBox nested in the editor.
- **Attachment items:** Core owns a wrapping list above editor, gap sp-2. Item uses
  existing Card visual language, consumer content bounded to available width, and
  a separate existing ghost IconButton with the supplied remove name. No fixed
  thumbnail size, upload bar, file-type catalogue or invented status design.
- **Text snippets:** existing ghost Button, before the outer composer surface,
  wrapping with sp-2 gaps and sp-2 separation from it. Full localized labels wrap;
  the composer owns this relationship rather than each Button adding margins.
- **Audio controls:** active dictation follows the user-confirmed X/microphone/check
  design in shared contract section 9 (2026-10-23), replacing the initial generic
  text buttons. Voice mute/end retains the functional-first treatment. No waveform/
  timer or new color value is invented.
- **Accessibility corrections:** the border/placeholder corrections above; full
  accessible labels; at least 24 by 24 CSS-pixel action hit areas even at density S;
  visible menu-option focus; popup collision/scroll and small-width reflow rules.

These are accepted explicit design exceptions, not claims of exact Bodywork
fidelity for undocumented states. The designer's final reference and a subsequent
specification/visual review are required before calling those visuals final or
claiming release readiness. Do not extend this exception to other components or undocumented interaction behavior.

## Responsive, density and motion acceptance

- Global S/M/L uses existing sf .9/1/1.125 and k/sp/fs variables. Radii, borders,
  960px cap, 520px breakpoint and 20px blur follow source density-independent values.
  Enforce the 24px pointer minimum even where density-scaled source metrics shrink.
- Width follows the container without external margins. Prompts horizontally scroll
  inside their own region with focus-ring room (source k4 padding/negative margin).
  Remove source fading masks when they obscure a focused action. No page overflow.
- At widths too small for a oneLine action row, use the expanded text-over-actions
  arrangement; actions may wrap into visual/DOM order rather than overlap. Full
  selector names have short forms; unconstrained content never shrinks local fonts.
  Attachments/snippets wrap; menus clamp and scroll. Verify at 320 CSS px and 400%
  browser zoom plus 200% text size and WCAG text-spacing overrides.
- Preserve ordinary action entry .22s cubic-bezier(.22,.61,.36,1) and exit .14s
  cubic-bezier(.4,0,.7,.2) for opacity/transform; hidden controls become inert
  immediately. Focus border/shadow .18s ease, border-radius .15s ease, hover .12s
  ease, chevron/plus rotation .2s cubic-bezier(.22,.61,.36,1), matching source.
- The source's multiline height transition is an allowed documented exception to
  transform/opacity, not a new global animation rule. Entry .22s and exit .14s use
  the source curves; no height animation during each provisional dictation result.
  Menus reuse Popup's documented .18s opacity/transform behavior.
- Reduced Motion disables all decorative transitions/rotations/height animation
  and smooth scrolling. A necessary pending Spinner follows its existing contract.
  Functional-first states add no new motion. No animated blur/width/font properties.

## Storybook evidence

Implemented evidence as of the 2026-10-23 user-review correction: 24 Composer/Business
browser stories pass, including axe, native-control interaction, dictation
pause/resume/accept/cancel and consumer attachment selection/removal/send. Additional
editor stories cover the rich-text contract. Direct Chromium/WebKit typing and
motion checks preserve editor focus; reduced motion disables surface animations.
The complete Business Default uses real browser APIs. Recording/Paused stories use
explicit recognition doubles, not a claimed successful real-device transcription.
See the design recheck and implementation report for reference interactions,
measured geometry, verification limits and remaining manual/design acceptance.


## 2026-10-26 measured interaction audit

The [quality audit](sidekick-input-quality-audit.md) records the renewed live
Bodywork check for idle/filled/cleared, hover/focus, action exchanges, menus,
multiline/reversal, narrow layouts and the confirmed dictation states. Ordinary
geometry matches within 0.05 CSS px across 24 Chromium/WebKit × S/M/L × width
comparisons. Four regression stories cover action motion, reversed expansion,
long-label reflow and external draft/focus restoration. The mapping above remains
authoritative; no new token, public variant or functional-first styling decision
was introduced. Existing AA exceptions and remaining manual/design acceptance
obligations are explicit in that report.


The final raster check additionally transfers the verified antialiased rendering
and clipped selector identity border overlay, scoped to this composer/menu. Fonts
remain host-provided. The normalized idle/filled comparison accounts explicitly
for theme, accepted AA corrections and the excluded Bodywork identity PNG; see
the quality audit for the measured per-channel difference and its limited scope.
