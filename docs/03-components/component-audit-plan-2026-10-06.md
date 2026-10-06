# Component foundation audit and next additions — 2026-10-06

## Authorized scope

1. Explicit displayName on every library component, compound part and internal React component.
2. Standardized modern ECMAScript source while retaining existing consumer compatibility.
3. One documented selection contract per component, grounded in Bodywork Do/Don't reasons;
   schema-validated Markdown metadata and direct Storybook documentation.
4. Audit all existing components for correctness, accessibility, state/effects, refs,
   native props, performance, guidelines and specification contradictions. Preserve props
   unless they violate confirmed rules; document necessary corrections.
5. Add Tabs attached/underline appearance; attached stays the compatible default.
6. Add Tooltip, Breadcrumb, Pagination, Slider and Stepper only after their relevant gates
   are resolved. Dialog/Drawer modernization initially belongs to the chayns API.
   PopupList already supplies the action Dropdown; do not introduce a competing menu API.
7. Investigate the live Storybook module-import error and verify the actual static build.
8. Commit finalized work in atomic logical steps; uncertain work stays uncommitted.

## Evidence and current progress

Final source review, completed repairs and verification results are recorded in
[the audit results](component-audit-results-2026-10-06.md). The full verification
passed after integrating the colleague's picker refinement. The structured follow-up questions resolved the remaining implementation contracts;
this is not a blanket manual accessibility release approval.

The starting implementation exports 24 Core components and two Layout components,
including compounds. All were inspected; helper components and Storybook environment
components are included in the displayName scope. Existing APIs/specifications take
priority over external examples. The 2026-10-06 Bodywork HTML and CSS are reachable;
user screenshots additionally confirm the underline geometry. Counts in earlier
progress commentary were preliminary; exported component coverage is the authoritative
inventory. New Breadcrumb/Pagination/Slider scopes are confirmed.

The original repository verification stopped at formatting, and the existing testing
stack lacked its required DOM peer after automatic peer installation was disabled.
These are baseline repair tasks, not a new test architecture. Initial unit suites pass,
but unit success does not prove visual equivalence or completed accessibility release checks.

Observed repair topics include AvatarGroup truncation, native/ref forwarding in compound
parts, disabled/DOM-order Tabs navigation, repeated SegmentedControl registration and
indicator updates, ComboBox reduced-motion close cleanup and option-ID collisions,
Popup role/focus/positioning, and Wheel keyboard/accessible duplication. Each fix needs
its own appropriate regression evidence before its implementation commit.

## Follow-up decisions resolved 2026-10-06

- Tooltip keeps the first touch action and supplies hover/focus/touch descriptions
  on the existing trigger, with merged native props/refs and defined dismissal.
- Stepper uses precision 0–6, default 0, safe scaled arithmetic and native buttons.
- Tabs/SegmentedControl propose the first enabled DOM-order entry automatically;
  controlled consumers confirm it and uncontrolled components adopt it.
- Nested Accordion groups retain their own exclusivity and compact shared frame.
- Public finite configuration values expose enums alongside compatible literal types.
- All selected additions are implemented; manual release evidence remains separate.

## Commit and verification sequence

Commit diagnostic names separately. Record confirmed decisions, plan and Bodywork
reconciliation separately from implementation. Repair the existing verification baseline,
then commit fixes grouped by behaviour with regression tests. Commit additive components
individually with their specifications, readiness scope, CSS export, stories and tests.
Commit the shared documentation/schema tooling with complete references.

Run formatting, docs validation, lint, CSS lint, types, package builds, unit/type tests,
Storybook browser/a11y checks and distribution/consumer checks. Add a static-browser
smoke check so dynamic story imports are tested in the artifact that is deployed.
Chromium and current WebKit tests help diagnose the reported error; they do not prove
compatibility with the user's exact Safari version. Manual screenreader, visual,
zoom/reflow and relevant pointer checks remain explicit release evidence.
