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
  "checkedOn": "2026-10-06",
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

Tabs use ARIA tab roles, roving focus, automatic cyclic Arrow activation and Home/End. `Tab` invokes an optional `onRemove` on Delete/Backspace; `Add` is an independent native button. Consumer handlers run before selection and may cancel it. The active panel alone renders and is labelled by its Tab. Native attributes target their matching parts and component-owned role/relationship attributes are omitted.

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
underline, checked 2026-10-06. List gap is 30 density units; inline padding is `--k5`,
tab gap `--k7`, vertical padding `--k12`, icon size `--k16`. The active underline is
1px, at `--k8` from the bottom, extends `--k3` on each side. Invalid sample `left/right:-3`
is confirmed as -3px. The sample icon baseline correction of 1.1px has no demonstrated
need for native inline icon composition; no wrapper-specific offset is applied.
Below 900px inline tab padding is `--k2`; list overflow is horizontal and labels stay
visible. Active, idle, hover and disabled use accent, text, text-2 and disabled-fg
instead of application hardcoded colours. Minimum targets and focus ring remain.
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
