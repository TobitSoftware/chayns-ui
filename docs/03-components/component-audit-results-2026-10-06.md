# Component audit results — 2026-10-06

## Scope and interpretation

The inventory is 24 original Core components and two Layout components, plus the
confirmed Breadcrumb, Pagination, Slider, Tooltip and Stepper additions. Explicit names also cover
internal JSX components. Bodywork HTML and tobit-ds.css were inspected on 2026-10-06;
selection reasons were reconciled with confirmed repository decisions. See
[Bodywork selection review](bodywork-selection-review.md) and each component specification.

The entries below record source review and executable regression evidence. They do
not assert completed manual screenreader, visual, target-size, zoom/reflow, pointer
or complete theme/density-matrix release checks. Existing open cases are visible.

## Inventory

| Component | Review outcome and remaining scope |
|---|---|
| Button | Corrected status foreground and invalid shadow/focus token composition; native activation, cancellation, loading and form tests retained. |
| IconButton | Shares corrected action styles; accessible-label, native ref/props and loading checks retained. |
| Badge | Semantic status foregrounds correct light-mode small-text contrast. |
| Skeleton | Shape/runtime values, decorative semantics and reduced-motion source reviewed; no new behavior change. |
| Spinner | Loading semantics, names and necessary motion reviewed; no new behavior change. |
| Progress | Native/root prop mapping and types repaired; secondary text uses a readable existing token. |
| Banner | Static tone/dismissal responsibility and native props reviewed; no new behavior change. |
| ComboBox | Named listbox, distinct option IDs, stable consumer refs and zero-transition close cleanup repaired. Large combined module remains a maintainability follow-up. |
| DateTimePicker | Wheel duplicates removed from accessible/Tab sequence; colleague's width/label refinement preserved; formatters/sizer cached and internal responsibilities separated. Initial full sizing examples still have a cost. |
| TextField | Native primary input, associated label/help/error/counter ownership and controlled/native contract reviewed. |
| TextArea | Native textarea, label/help/error/counter and disabled/error contracts reviewed. |
| Checkbox | Native checked/defaultChecked/change, form semantics, label and indeterminate contract reviewed. |
| Switch | Immediate settings selection rule reconciled with Bodywork; native checked/change and disabled behavior reviewed. |
| RadioGroup | Bodywork two-to-five options rule, native radio form/keyboard semantics and grouping reviewed. |
| SegmentedControl | Stable registration/refs and identical-measurement state updates repaired; selected geometry observed. Automatic enabled-entry selection and controlled proposal de-duplication resolve AUDIT-002. |
| Popup | Trigger action/ref composition, scoped cancellation/dismissal and viewport positioning repaired; generic surfaces do not take menu focus. |
| PopupList | Existing action Dropdown; owns menu role, initial focus and arrow navigation. No duplicate Dropdown API added. |
| SplitButton | Shares corrected action foreground; primary/menu responsibilities and legacy public trigger contract reviewed. |
| Card | Static grouping, native slot owners and Bodywork selection reason reviewed; does not become a whole-surface action. |
| Avatar | Existing size values exposed as a runtime array/union; accessible fallback/image behavior reviewed. |
| AvatarGroup | Exact-limit truncation repaired; shared size and overflow contract reviewed. |
| List | Native anchor/button/span refs and attributes repaired; sibling trailing actions retained. Bodywork compact one-line preview reason documented. |
| Accordion | Native header-part forwarding repaired; disclosure/region and wrapped contract reviewed. |
| AccordionGroup | Top-level exclusivity checks pass. Nested groups now keep independent exclusivity with the confirmed compact shared frame, resolving AUDIT-003. |
| AppLayout | Native link/button props/refs and rich-label disclosure naming repaired; route ownership remains application-level. |
| Tabs | Attached default retained; underline addition has its confirmed reference and shared semantics. DOM-order/disabled navigation and refs repaired. Automatic enabled-entry selection, controlled proposals and focus entry resolve AUDIT-001. |
| Breadcrumb | Added native hierarchy links/current-page semantics with reference geometry and responsive spacing. |
| Pagination | Added controlled page navigation with bounded positions, localized labels, native buttons and cancellation. |
| Slider | Added native single range, visible/spoken formatting, form props/ref and density-independent minimum pointer height. |
| Tooltip | Added non-interactive descriptions on existing triggers, preserved actions/refs/native events, hover/focus/touch support, hover continuity and Escape/outside dismissal. |
| Stepper | Added bounded controlled exact quantities, precision 0–6 with integer default, safe scaled arithmetic, localized buttons and politely announced values. |

## Standard and compatibility

All source remains valid modern standardized ECMAScript. The installed linter parses
the current grammar; TypeScript 6.0.3 has no dedicated ES2026 target. ES2024 emit/lib
settings and the confirmed browser/React/Node consumer targets remain in place.
No experimental ESNext APIs or runtime polyfills were introduced. Existing finite
variants keep their literal values and gain exported configuration enums. Enum/list
parity and public export coverage are checked automatically.

The display-name validator checks named JSX declarations. Component metadata has one
selection source shared with Storybook and a schema/coverage/reference validator.
Changing an explicitly owned prop remains a specification/API task; the audit does
not claim every possible override or invalid compound tree is safe.

## Verification and live Storybook investigation

`corepack pnpm verify` passed after the conflict resolution and final corrections
on 2026-10-06. It includes formatting, 31 component specifications, 61 named JSX
declarations and 11 public configuration enum/list pairs, JavaScript/CSS lint, TypeScript, package builds, 185 unit tests in
33 files, public type tests and deterministic token output. All 88 Storybook
interaction/a11y tests passed, and every one of the 88 built stories rendered
without module errors in both Chromium and WebKit. Packed package contents,
exports/ESM types, tree-shaking and consumer typecheck/build/SSR also passed.
CI and Pages build verification now check the static artifact before upload.
These automated results do not close the manual release checks listed above.

The user confirmed that the live import error occurs in Safari while the same view
opens in Chrome. The reported live import error was not reproduced in current
Chromium or the installed Playwright WebKit 26.5. That test engine does not establish
compatibility with the user's particular Safari version or profile. The static
import check logs engine versions so this evidence can be compared explicitly.
Live story modules returned successful responses during inspection. This does not
identify the user's actual failing Safari/runtime/network condition. Exact browser
version and failed request/console details would be needed if the error returns.
On 2026-10-06 the user subsequently confirmed that Safari now also works normally.
The investigation is therefore dormant pending recurrence; no root cause or verified
fix is claimed, and no further browser details are currently requested.
No npm publication has been performed by the agent.

## Completed additions and remaining release evidence

All five selected additions are implemented within confirmed component-specific
READY contracts. The user resolved touch, decimal precision/default, automatic
selection and nested-group decisions through structured questions on 2026-10-06.
These gaps are no longer implementation blockers. Enums are recorded in AGENTS.md
and the component standard without breaking existing literal types/value lists.

Manual screenreader, full visual/theme/density, zoom/reflow and relevant pointer
release evidence remain separate from the passing automated checks. Changesets
plans Core 0.10.0, Layout 0.7.0 and Tokens 0.8.1. The established release workflow
updates its version PR when the release changeset reaches main; publishing follows
only after that version PR is merged. The existing GitHub version PR #3 was observed
with an outdated 0.7.0 Core plan; it must refresh before being treated as this release.
