# Tabs — Component Specification

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

`TABS_APPEARANCES = ['attached', 'underline'] as const` defines `TabsAppearance`.
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

The appearance addition is ready within the existing explicitly initialized selection
contract. Entry focus when neither value nor defaultValue matches an enabled Tab
remains OPEN: focus-only entry, automatic selection, or required initialization need
a confirmed product decision. Consumer-owned selection/removal is not silently replaced.
This known gap blocks an unrestricted accessibility release claim for Tabs.
