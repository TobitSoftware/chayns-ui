# Component audit results — 2026-10-06

## Scope and interpretation

The inventory is 24 original Core components and two Layout components, plus the
confirmed Breadcrumb, Pagination and Slider additions. Explicit names also cover
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
| SegmentedControl | Stable registration/refs and identical-measurement state updates repaired; selected geometry observed. Missing-selection keyboard entry remains AUDIT-002. |
| Popup | Trigger action/ref composition, scoped cancellation/dismissal and viewport positioning repaired; generic surfaces do not take menu focus. |
| PopupList | Existing action Dropdown; owns menu role, initial focus and arrow navigation. No duplicate Dropdown API added. |
| SplitButton | Shares corrected action foreground; primary/menu responsibilities and legacy public trigger contract reviewed. |
| Card | Static grouping, native slot owners and Bodywork selection reason reviewed; does not become a whole-surface action. |
| Avatar | Existing size values exposed as a runtime array/union; accessible fallback/image behavior reviewed. |
| AvatarGroup | Exact-limit truncation repaired; shared size and overflow contract reviewed. |
| List | Native anchor/button/span refs and attributes repaired; sibling trailing actions retained. Bodywork compact one-line preview reason documented. |
| Accordion | Native header-part forwarding repaired; disclosure/region and wrapped contract reviewed. |
| AccordionGroup | Top-level exclusivity checks pass. Nested grouped/wrapped geometry and independent state remain AUDIT-003. |
| AppLayout | Native link/button props/refs and rich-label disclosure naming repaired; route ownership remains application-level. |
| Tabs | Attached default retained; underline addition has its confirmed reference and shared semantics. DOM-order/disabled navigation and refs repaired. Missing-selection entry remains AUDIT-001. |
| Breadcrumb | Added native hierarchy links/current-page semantics with reference geometry and responsive spacing. |
| Pagination | Added controlled page navigation with bounded positions, localized labels, native buttons and cancellation. |
| Slider | Added native single range, visible/spoken formatting, form props/ref and density-independent minimum pointer height. |

## Standard and compatibility

All source remains valid modern standardized ECMAScript. The installed linter parses
the current grammar; TypeScript 6.0.3 has no dedicated ES2026 target. ES2024 emit/lib
settings and the confirmed browser/React/Node consumer targets remain in place.
No experimental ESNext APIs or runtime polyfills were introduced. Existing finite
variants keep their values, including newly paired Avatar runtime values.

The display-name validator checks named JSX declarations. Component metadata has one
selection source shared with Storybook and a schema/coverage/reference validator.
Changing an explicitly owned prop remains a specification/API task; the audit does
not claim every possible override or invalid compound tree is safe.

## Verification and live Storybook investigation

`corepack pnpm verify` passed after the conflict resolution and final corrections
on 2026-10-06. It includes formatting, 31 component specifications, 59 named JSX
declarations, JavaScript/CSS lint, TypeScript, package builds, 163 unit tests in
31 files, public type tests and deterministic token output. All 82 Storybook
interaction/a11y tests passed, and every one of the 82 built stories rendered
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
version and failed request/console details remain needed if the error persists.
No live deployment or push is part of these local changes.

## Blocked next components

Tooltip and Stepper are selected but not implemented. Their specifications contain
the checked reference, confirmed scope and open contracts. The initial five-component
expansion is therefore partly complete; three additions are available locally.
The repository readiness gate prevents guessed touch, numeric, focus or nested-group
policies. General release readiness remains open until these relevant gaps and manual
accessibility/design checks are closed.
