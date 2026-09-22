# Tabs — Component Specification

- Component Category: Layout
- Specification Status: READY FOR IMPLEMENTATION
- Relevant Decisions: CORE-010–012, LAYOUT-031–033, LAYOUT-036

Tabs is a value-paired compound control: `Tabs.List` owns `tablist` div props, `Tabs.Tab value` owns native button props, `Tabs.Panel value` owns panel div props and `Tabs.Add` owns native button props. Root owns `value`, `defaultValue` and `onValueChange`; stable values create tab/panel IDs. Children outside Tabs fail in development.

Tabs use ARIA tab roles, roving focus, automatic cyclic Arrow activation and Home/End. `Tab` invokes an optional `onRemove` on Delete/Backspace; `Add` is an independent native button. Consumer handlers run before selection and may cancel it. The active panel alone renders and is labelled by its Tab. Native attributes target their matching parts and component-owned role/relationship attributes are omitted.

The visual contract is a top-attached tab strip: the list uses the accent
surface, tabs are rounded only at their top corners, and the active tab joins
the surface of the panel below it. The panel has its own border and surface
background and starts below the strip, so its background cannot bleed into the
tab area. The tab top radius and the AppLayout content corner both use
`--k12`; lower tab corners remain square.
