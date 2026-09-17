# AppLayout — Component Specification

- Component Category: Layout
- Specification Status: READY FOR IMPLEMENTATION
- Relevant Decisions: CORE-010–012, LAYOUT-032, LAYOUT-034–035

AppLayout uses named composition only: `Header` owns header props, `Logo` owns decorative img props, `Navigation` owns nav props, `Navigation.Item` owns its anchor-or-button props, `Content` owns main props and `CollapseToggle` owns button props. The root owns controlled/uncontrolled `collapsed`, `defaultCollapsed` and `onCollapsedChange` state.

Navigation.Item has a required `label` for its own native action and optional `children` containing recursive Navigation.Item elements. Items with children expose a separately labelled disclosure button; every disclosure starts closed and independent branches may remain open together. An `href` renders a link, otherwise Item renders a button. `isActive` sets `aria-current="page"`. Logo defaults to `alt=""`; collapsed labels remain accessible. Parts outside their documented parent throw in development.
