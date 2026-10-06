# Bodywork component selection reconciliation

Checked 2026-10-06 against the live Bodywork HTML usage rows and `tobit-ds.css`.
Reference: https://tappqa.tobit.com/Bodywork/DesignSystem/ . This records selection
reasons and contradictions, not a claim of completed visual/screenreader testing.
Confirmed repository decisions take priority. Frontmatter restates the applicable
reason; it does not create variants shown only in Bodywork.

| Area | Bodywork reason | Library reconciliation |
| --- | --- | --- |
| Button / IconButton | Choose action emphasis; one primary per closed scope; verb label; compact icon actions use IconButton. | Aligned. Navigation remains native links and icon actions require a localized accessible name. |
| SplitButton | A principal action has related variants; equivalent alternatives are separate outline buttons. | Aligned. Primary SplitButton counts as the scope's primary action. |
| SegmentedControl / Tabs | Two to four equivalent representations (list/cards/calendar) use SegmentedControl; up to five peer views on one page use Tabs; ordered steps use the setup assistant. | Confirmed semantic distinction: settings/representations use radiogroup, paired panels use Tabs. Counts are selection guidance, not a new runtime maximum. Attached panel geometry is the confirmed Layout contract; underline is the user-confirmed 2026-10-06 reference, not Bodywork's pill sample. |
| Card / List | Many comparable entries use List; standalone content uses Card, including clickable card patterns in Bodywork. | CARD-003 keeps Core Card presentational; native interactive children supply interaction. CARD-004 supersedes the old no-padding/elevated description. The earlier AI draft was stale and is replaced. |
| Accordion / AccordionGroup | Independent disclosures versus mutually exclusive related disclosures; wrapped nesting is automatic; deeper than two levels should become a view. | Aligned selection guidance. Group exclusivity and wrapped context are independent. Nested group behaviour requires an implementation audit; no new Wrapped prop is introduced. |
| TextField / TextArea | Free text uses a floating label; known answers use selection controls; exact small quantities use Stepper. | Aligned. Multiline text uses TextArea. Unit suffix APIs shown by Bodywork are not invented for the current TextField. |
| Radio / Checkbox / ComboBox / Switch | Two to five exclusive choices use Radios; two or three independent choices use visible Checkboxes; four or more multiple choices use Multi-Select; immediate binary settings use Switch. | Aligned selection guidance. The confirmed ComboBox contract closes after each selection and its own specification controls chip/display behaviour. |
| DateTimePicker | Bodywork shows a calendar date picker and recommends date selection instead of free date text. | PICKER-008 explicitly authorizes the wheel POC as the current visual reference. Do not imply that the wheel implementation matches Bodywork's calendar, or replace it silently. |
| Progress / Spinner / Skeleton | Known percentage, unknown duration, or known loading layout respectively. | Aligned. Progress exposes a visible percentage; decorative Spinner/Skeleton rely on the owning region's accessible busy/status information. |
| Avatar / AvatarGroup | Existing image first, initials fallback, uniform overlapping group with final overflow count. | Aligned. Core consumes identities; it does not fetch or infer domain data. |
| Badge / Banner | Badge is state/count associated with another element; Banner persists for a region until dismissal or resolution. | Aligned. Badge is not an action; field errors stay at the field and short action feedback belongs in a future Toast API. |
| Popup / PopupList | Popover supplies quick contextual information/actions; Dropdown bundles actions; selection belongs in Select/Multi-Select. | Generic Popup owns no menu role/focus; PopupList is the existing Dropdown. Both follow confirmed native/ref, dismissal and positioning contracts. |
| Breadcrumb / Pagination | Hierarchy from three levels versus long page-loaded inventories; feeds use explicit load-more. | Aligned. Generic Pagination initially excludes table-specific total/range/page-size composition as confirmed by the user. |
| Slider / Stepper | Approximate immediate bounded values versus exact small-step quantities. | Single native Slider first; Stepper has no text entry or hold-repeat. User confirmed safe scaled decimal precision 0–6, default 0, min-based step alignment and rejection of invalid numeric configurations. |
| Tooltip | Short supplementary explanation; no essential information/actions; reference demo only hovers. | User explicitly extends opening to focus and touch click. The user confirmed that the first touch retains the trigger action and opens the explanation; native refs/events, hover continuity and Escape/blur/outside dismissal are specified. Essential information stays visible; no tooltip-only critical instruction. |

The reviewed explanations are paraphrased, not copied. Internal technical contracts
such as refs and event cancellation are repository clarifications. New variations
in the external document remain outside the component's gate until approved.

## Storybook documentation reconciliation — 2026-10-06

The live Bodywork usage descriptions were rechecked (151 usage rows) against
all 31 component specifications and public APIs. The consumer guides retain
six sections but explain purposes, selection reasons, composition and ownership
rather than reducing each topic to a slogan. AccordionGroup is a grouping companion
for Accordion; Avatar is the child of AvatarGroup. AppLayout is not replaced by
Card or Tabs, and neither TextField nor ComboBox replaces the wheel date picker.
These boundaries are now explicit in human guides and combination metadata.

The Spinner guide follows the confirmed SPIN-005 contract: rotation stops under
Reduced Motion; the named loading region keeps its status meaning. Numeric option
counts remain Bodywork selection guidance rather than new runtime limits.
Imports, enums, controlled values and application handlers are shown or explained;
TSX examples and links to shared Docs/Composition stories are checked automatically.
No component API, visual variant or READY scope changes in this documentation review.
