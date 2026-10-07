---
{
  "name": "Tabs",
  "package": "@chayns-ui/layout",
  "category": "Layout",
  "status": "implemented",
  "useWhen": [
    "Switch among a few peer views on one page; Bodywork recommends up to five as selection guidance, not a runtime maximum. Attached joins an active tab to its panel surface; underline switches views on a shared surface."
  ],
  "doNotUseWhen": [
    "Do not use for ordered workflow steps, routes, independent actions or simultaneous panels. More than five views generally belong in application navigation."
  ],
  "alternatives": [
    "native anchor",
    "SegmentedControl",
    "Accordion"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-07",
  "stories": [
    "Layout/Tabs:WorkspaceTabs",
    "Layout/Tabs:Underline",
    "Layout/Tabs:UnderlineEditable",
    "Layout/Tabs:AutomaticSelection"
  ],
  "combinations": [
    "AppLayout",
    "Card"
  ]
}
---
# Tabs — Component Specification

## Selection guide

Use when: Switch among a few peer views on one page; Bodywork recommends up to five as selection guidance, not a runtime maximum. Attached joins an active tab to its panel surface; underline switches views on a shared surface.

Do not use when: Do not use for ordered workflow steps, routes, independent actions or simultaneous panels. More than five views generally belong in application navigation.

Alternatives: native anchor, SegmentedControl, Accordion.

- Component Category: Layout
- Specification Status: READY FOR IMPLEMENTATION
- Relevant Decisions: CORE-010–012, LAYOUT-031–033, LAYOUT-036

Tabs is a value-paired compound control: `Tabs.List` owns `tablist` div props, `Tabs.Tab value` owns native button props, `Tabs.Panel value` owns panel div props and `Tabs.Add` owns native button props. Root owns `value`, `defaultValue` and `onValueChange`; stable values create tab/panel IDs. Children outside Tabs fail in development.

Tabs use ARIA tab roles, roving focus, automatic cyclic Arrow activation and Home/End. `Tab` invokes an optional `onRemove` on Delete/Backspace; `Add` is an independent native button. Consumer handlers run before selection and may cancel it. The active panel is labelled by its Tab and is the only accessible/interactive panel. During the confirmed crossfade, at most one outgoing panel remains visually mounted for 200ms. Native attributes target their matching parts and component-owned role/relationship attributes are omitted.

The visual contract is a top-attached tab strip: the list itself is
transparent and inherits its surrounding shell surface, while tabs are
rounded only at their top corners. The list is `--k42` high, the first tab is
flush with its start edge, and tabs may show a leading icon and a close icon.
The active tab joins the surface of the panel below it. The panel has its own
border and surface background and starts below the strip, so its background
cannot bleed into the tab area. The tab top radius and the AppLayout content
corner both use `--k12`; lower tab corners remain square.

## Appearance and selection rules (confirmed 2026-10-06)

`TabsAppearances.Attached` and `TabsAppearances.Underline` expose the configuration as
a TypeScript enum. `TABS_APPEARANCES = ['attached', 'underline'] as const` and the
`TabsAppearance` literal type remain compatible. Import the enum from `@chayns-ui/layout`
and use `<Tabs appearance={TabsAppearances.Underline}>`; existing literal props remain valid.
Root accepts `appearance`, default `attached`, with no change to existing props.
Use attached for a top strip whose active tab joins its panel surface. Use underline
for peer content views on a shared surface. Neither appearance is route navigation,
a settings value selector (SegmentedControl), or disclosure (Accordion).

The user-provided screenshot and dashboard SCSS are the confirmed reference for
underline, checked 2026-10-06. List gap is 30 density units; inline padding is `--k6`,
tab gap `--k7`, vertical padding `--k12`, icon size `--k16`. The active underline is
2px, at `--k6` from the bottom, extends `--k6` on each side,
as superseded by the user on 2026-10-07. List inline padding is correspondingly
`--k6` so the underline and expanded keyboard focus area are not clipped. The sample icon baseline correction of 1.1px has no demonstrated
need for native inline icon composition; no wrapper-specific offset is applied.
Below 900px inline tab padding is `--k2`; list overflow is horizontal and labels stay
visible. Active uses accent in light mode and text in dark mode; idle, hover and
disabled use text, text-2 and disabled-fg instead of application hardcoded colours. Minimum targets and focus ring remain.
Colour transition is the reference 0.2s ease, removed with reduced motion. Outside
margins and white application background belong to the consumer. Panel keeps existing
content padding and loses its attached border/surface for underline. Add/remove remain
available with unchanged semantics. Keyboard order follows DOM order and skips disabled
tabs. Storybook evidence: WorkspaceTabs and Underline, including click interaction.

## Native contract and audit boundaries — 2026-10-06

The existing compound API remains: Tabs owns selection and IDs, List owns tablist,
Tab owns the native button/selected state, Panel owns its matching region, Add owns
a separate native button. Refs target those native elements. Tab invokes consumer
click/key handlers first; preventDefault cancels selection and removal. onRemove
receives the removed string value; existing zero-argument callbacks remain assignable.
Stable registration preserves callback-ref cleanup and reflects current DOM order.

The appearance addition and automatic selection contract below are READY. Controlled
selection remains consumer-owned; invalid-value proposals do not override it. Manual
accessibility and visual checks are still required for a release claim.

## Automatic initial selection — confirmed 2026-10-06

The first enabled DOM-order entry is proposed when the value is missing, invalid,
removed or disabled. Uncontrolled adopts it; controlled calls onValueChange once
per invalid value/candidate pair and waits for parent confirmation. Valid selection
resets that guard. While waiting, only the first enabled entry is a Tab stop and no
invalid entry is semantically selected. With no enabled entries there is no selection.
Selection alone never moves focus; keyboard navigation keeps its documented behavior.
Root/child props, event cancellation, density, geometry and reduced motion stay intact.
READY extends to this confirmed state handling. Acceptance checks cover disabled
first entries, DOM reorder, removal, controlled refusal/acceptance, no enabled entries
and StrictMode callback de-duplication.

## Optional tab actions — confirmed 2026-10-06

Both appearances support fixed and editable collections through the existing compound
API. Omit `onRemove` on an individual `Tabs.Tab` to omit its close affordance and
Delete/Backspace removal; passing the callback enables removal for that item only.
Omit `Tabs.Add` entirely when adding is unavailable. When allowed, compose `Tabs.Add`
with a localized `aria-label` and native `onClick`; the application owns its entries.
The user chose to retain this explicit Add composition instead of introducing List
`onAdd`, additional visibility booleans or an automatically rendered button.
No new public API, geometry, token or focus behavior is introduced. Controlled and
uncontrolled selection remain available; callbacks do not mutate consumer entries.

Storybook `Underline` shows a fixed collection. `UnderlineEditable` shows optional
per-item removal (Inbox stays fixed), working addition/removal and replacement
selection after removal. Existing consumer event cancellation remains in force.

## Global icon rule follow-up — 2026-10-06

Owned action glyphs follow ICON-001–003: Regular at rest/disabled and Solid on
enabled hover/active; informational markers stay Regular. The existing internal
renderers use wrappers to remain stable under Font Awesome SVG replacement. Public
props, token geometry, native events and focus ownership remain unchanged. The
[icon rule review](../icon-rule-review-2026-10-06.md) records owner-specific findings
and consumer-content boundaries.

## Underline focus and dark contrast correction — 2026-10-07

Confirmed user reference: the supplied pseudo-element CSS replaces the original
2026-10-06 underline geometry. The underline uses absolute positioning,
`inset-block-end: var(--k6)`, `inset-inline: calc(-1 * var(--k6))`,
`block-size: 2px`, empty content and `background: currentColor`. The keyboard
focus indicator encloses the entire tab including that inline extension, using
a non-interactive before pseudo-element and the existing inset focus-ring tokens.
The list reserves `--k6` at both inline edges; desktop/mobile tab padding, gaps
and native hit/keyboard ownership otherwise remain unchanged.

In explicitly dark themes and auto mode resolving to dark, the active underline
tab uses existing `--text` instead of `--accent`. Text, icons and underline inherit
that semantic near-white foreground, including high-contrast/color-deficiency
modes. Explicit light mode retains `--accent`. Attached appearance is unchanged.
This is the user-confirmed component state mapping, not a new palette or token.

Acceptance: keyboard focus spans both ends of the 2px underline, including first
and last tabs and the mobile layout; no clipping in the horizontal scroll list.
Light/dark/auto and S/M/L retain the semantic token mapping. Disabled and optional
remove/add actions keep their existing contracts. Storybook evidence: Underline
and UnderlineEditable; browser checks cover actual focus and computed geometry.
Bodywork Motion/global icon reference checked 2026-10-07; the supplied user CSS
is authoritative for this component-specific visual correction.

## Panel crossfade and moving underline — 2026-10-07

Confirmed by structured user answers: both appearances crossfade; underline also
uses a shared moving indicator. Public props, native part/ref owners and selection
callbacks stay unchanged. Bodywork Motion was rechecked live on 2026-10-07: short
200–240ms transitions, faster exit than entry, entry curve
`cubic-bezier(.22,.61,.36,1)` and exit curve `cubic-bezier(.4,0,.7,.2)`.
The user confirmed 200ms exit and 220ms entry for this component-specific contract.

Selection, roving focus and selected-tab ARIA update immediately. The new panel
mounts immediately and fades from opacity 0 to its normal consumer opacity over
220ms; the previous one fades to 0 over 200ms. The outgoing panel immediately
becomes inert, aria-hidden and untabbable, then unmounts on completion. At most
one outgoing panel exists; a further selection discards an older exit and starts
from the latest view. Interrupted transitions retain their current opacity; removed
entries and root unmount cancel owned animations. Only opacity is animated.
The initial valid panel appears immediately.

Root owns a shared two-row grid: List in the first row and the documented sibling
Panels sharing the second cell. During the brief crossfade this cell reserves the
larger content height; after exit it follows the active panel. Height is not animated.
No public wrapper, keep-mounted prop, per-frame React state or new dependency exists.
Only active and outgoing content remain mounted; persistent application state still
belongs outside Panels. Consumers place content wrappers inside their Panels.

Underline List owns one private aria-hidden, non-interactive indicator. It uses the
confirmed 2px height, `--k6` bottom offset and 6-unit extension on both sides.
Position and width follow the selected native button, including horizontal scrolling,
resize, density, changed labels and dynamic/reordered/disabled entries. Its only
animated property is transform (translation and scale), 220ms with the entry curve.
Geometry is measured on selection and relevant layout changes, not on animation
frames. Initial placement and layout corrections are immediate. Tab-local after
pseudo-elements provide the same static underline until a shared indicator is ready.

Reduced Motion immediately switches/unmounts panels and places the indicator,
including changes to the preference during a running transition. Without animation
API support the same immediate fallback applies. The outgoing panel contributes no
focus target or announced content. Consumer native events/ref targets are retained.
Tests cover rapid selection, exit completion/cancellation, reduced motion, unmount,
selection accessibility and dynamic entries; Chromium/WebKit evidence covers
opacity-only fades, translated/scaled line, focus bounds, dark/auto colours, scrolling,
resize and density. Stories: WorkspaceTabs, Underline and UnderlineEditable.

When selection becomes invalid, obsolete panel/indicator motion ends immediately;
no invalid initial content is faded out during automatic selection reconciliation.
With no enabled entry, observer callbacks do not create a self-scheduling frame loop.
Story interaction tests await actual panel completion before final-state contrast
checks; they do not disable accessibility auditing or introduce fixed sleeps.

## Centered focus and stable exit endpoint — 2026-10-07

The user confirmed the underline focus width and requested a shorter, centered
height ending at the underline. The before pseudo-element uses symmetric
`inset-block: var(--k6)`: its bottom coincides with the underline's bottom edge,
and its center remains the native tab's center. Inline extension, inset ring,
native hit target and keyboard behavior stay unchanged. No new token is required.

A browser reproduction in Chromium and WebKit showed the exiting panel returning
to its underlying opacity between animation completion and React unmount. The
exit must retain opacity 0 until unmount, including live Reduced Motion changes.
Reactivation continues from the currently rendered opacity, including a finished
exit awaiting removal. Entry restores the consumer opacity normally; cleanup
releases owned animations. No duration, curve, public API or per-frame work changes.

Acceptance: real browser animation completion leaves the still-mounted exit at
opacity 0; forward/backward and interrupted switches do not restore outgoing
opacity. S/M/L and mobile focus remains centered and ends at the underline.
Storybook evidence: WorkspaceTabs and Underline; regression checks finish the
native exit and inspect its computed opacity before the completion callback runs.
The existing Bodywork reference, token mapping, accessibility and Reduced Motion
contracts above remain authoritative. No unresolved design-review point exists.

## Attached dark foreground correction — 2026-10-07

The user confirmed that the existing dark/auto-dark `--text` active foreground
mapping also applies to Attached. Active text, inherited icon content and any
currentColor underline use the semantic near-white foreground in both appearances.
Light mode retains `--accent`; geometry, surfaces, disabled state, keyboard and
motion remain unchanged. No additional line or variant is introduced in Attached.
The checked Bodywork reference above remains unchanged; this user correction is
explicitly authoritative. WorkspaceTabs and Underline cover the state mapping;
browser acceptance compares light/dark/auto in both appearances and S/M/L.
