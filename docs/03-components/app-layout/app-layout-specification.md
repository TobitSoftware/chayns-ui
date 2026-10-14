---
{
  "name": "AppLayout",
  "package": "@chayns-ui/layout",
  "category": "Layout",
  "status": "implemented",
  "useWhen": [
    "Build the confirmed reusable application shell with header, navigation and content."
  ],
  "doNotUseWhen": [
    "Do not use for routing, persistence or arbitrary two-column layout."
  ],
  "alternatives": [
    "native page structure"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Layout/AppLayout:MailWorkspace",
    "Layout/AppLayout:Collapsed"
  ],
  "combinations": [
    "Breadcrumb",
    "Tabs",
    "Card",
    "List"
  ]
}
---
# AppLayout — Component Specification

## Selection guide

Use when: Build the confirmed reusable application shell with header, navigation and content.

Do not use when: Do not use for routing, persistence or arbitrary two-column layout.

Alternatives: native page structure.

- Component Category: Layout
- Specification Status: READY FOR IMPLEMENTATION
- Relevant Decisions: CORE-010–012, LAYOUT-032, LAYOUT-034–035

AppLayout uses named composition only: `Header` owns header props, `Logo` owns decorative img props, `Navigation` owns nav props, `Navigation.Item` owns its anchor-or-button props, `Content` owns main props, `Footer` owns native footer props and `CollapseToggle` owns button props. The root owns controlled/uncontrolled `collapsed`, `defaultCollapsed` and `onCollapsedChange` state.

Navigation.Item has a required `label` for its own native action and optional `children` containing recursive Navigation.Item elements. Items with children expose a separately labelled disclosure button; every disclosure starts closed and independent branches may remain open together. An `href` renders a link, otherwise Item renders a button. `isActive` sets `aria-current="page"`. Logo defaults to `alt=""`; collapsed labels remain accessible. Parts outside their documented parent throw in development.

`Footer` is the lower sidebar region. It renders a native `<footer>` below the scrolling Navigation, separated by the sidebar divider. Application-owned controls are composed through its `children`; a `CollapseToggle` in the Footer moves to the inline end, while other children remain at the inline start. Footer forwards compatible native footer props and ref. The Bodywork footer rail reference supplied on 2026-10-14 was checked for its divider, lower placement and right-aligned collapse control; `--sp-2`, `--ctrl-h` and `--on-accent` provide the existing token mapping. The Footer contains no library-owned text, state or keyboard behavior beyond its composed native controls.

## Foundation audit — 2026-10-06

Navigation.Item forwards compatible anchor props when href exists, otherwise native
button props, and the matching native ref. Rich ReactNode labels name the separate
disclosure button through aria-labelledby. aria-current belongs to page links.
Navigation and disclosure remain separate native controls as already specified.

## Global icon rule follow-up — 2026-10-06

Owned action glyphs follow ICON-001–003: Regular at rest/disabled and Solid on
enabled hover/active; informational markers stay Regular. The existing internal
renderers use wrappers to remain stable under Font Awesome SVG replacement. Public
props, token geometry, native events and focus ownership remain unchanged. The
[icon rule review](../icon-rule-review-2026-10-06.md) records owner-specific findings
and consumer-content boundaries.
