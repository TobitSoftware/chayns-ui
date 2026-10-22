---
{
  "name": "SideKickInput",
  "package": "@chayns-ui/business",
  "category": "Business",
  "status": "ready",
  "useWhen": [
    "Provide a Sidekick dialog input with external agent/model context, prompt actions and optimistic draft handoff."
  ],
  "doNotUseWhen": [
    "Do not use for a generic composer or as a Sidekick backend, upload service or voice transport."
  ],
  "alternatives": [
    "MessageComposer"
  ],
  "combinations": [
    "MessageComposer"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/#/muster/ki-sidekick",
    "sidekick-input-contract-review.md",
    "sidekick-input-visual-contract.md",
    "sidekick-input-acceptance-plan.md"
  ],
  "checkedOn": "2026-10-22",
  "stories": [],
  "preImplementation": {
    "plan": "sidekick-input-acceptance-plan.md",
    "decision": "SIDEKICK-025"
  }
}
---
# SideKickInput — Component Specification

## Metadata

- Component Category: Business
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI; product/design acceptance by the requesting user
- Design Reference: Bodywork / Muster / KI & Sidekick; checked 2026-10-22
- Relevant Decisions: SIDEKICK-001–026, CORE native-prop/composition/a11y/i18n rules, ADR 0004
- Foundation Dependencies: existing spacing/density/type/color/focus/overlay patterns;
  scoped token transfer and Lexical integration described in the shared contracts
- Related Components: MessageComposer
- Last Reviewed: 2026-10-22 (specification/source review; no implementation test claim)

SIDEKICK-025 accepts the complete technical/API/distribution/evidence contract
(R-01). SIDEKICK-026 accepts the bounded functional-first visual treatment (R-02 /
V-01). These contracts are now normative. Imports in examples remain unavailable
until implementation; planned tests are not executed evidence. READY authorizes
only the component-specific scope described here, not unrelated features or release.

## Purpose

SideKickInput maps external AI identities/recents into Core selector data, reports
external actions and orchestrates optimistic send snapshots. Its entire visible UI
comes from MessageComposer. It adds no DOM structure or CSS. Selection alone is not
the reason for Business classification: agent/model semantics and draft handoff are.

## Use When

Provide a Sidekick dialog input with external agent/model context, prompt actions and optimistic draft handoff.

## Do Not Use When

Do not use for a generic composer or as a Sidekick backend, upload service or voice transport.

## Related Components and Selection Boundaries

The alternatives above are available existing components where implemented; the new
RichTextEditor/MessageComposer contracts are accepted and not yet implemented. Use the
smallest component that owns the needed behavior. Business consumes Core only.

## Anatomy, Composition and Context Dependencies

SideKickInput returns the Core MessageComposer composition. No Business wrapper,
Compound Part, DOM-owning Context or public native editor replacement is permitted.
Native editor props/ref and rootProps are forwarded to their documented Core targets.
Snapshot payloads contain document, ordered attachment IDs and selection, not UI nodes.

No public Context requirement. Any private Context is an implementation detail and
must not change standalone placement or consumer APIs. Container spacing belongs to
the composer/consumer container; no child adds external margins to position itself.

## Semantic, Public API and Native Props Contract

[Shared contract](sidekick-input-contract-review.md) is the exact accepted
API/types, defaults, native target/ref, exclusions, item validity and event contract.
Sections 2–3 apply to the editor; section 4 to the composer; section 7 to Business.
Compatible native events/props must not be silently dropped or overwritten. Refs
remain React 18 compatible; no React 19-only ref-as-prop assumption.

## Variants, Local Size Variants and State Priority

No new visual variants or local sizes. Core layout/states are forwarded. Business
adds a submission-revision latch so a late pending update cannot duplicate a send.
Prompt actions remain distinct and never clear the current draft. A selected agent
outside recents still labels the selector using selectedIdentity.

No independent local density prop. Finite public configuration exposes the plural
TypeScript enums specified in the shared contract while retaining literal values.

## State Ownership

Consumer owns the document, attachment/prompts lists, selection/recents order,
pending, service requests, failed-draft persistence and retry. Business owns only
mapping and the transient dispatch latch; Core owns focus/capture/menus. No recents
persistence, automatic post-send layout change or service integration is added.

## Design Tokens, Density, Theme and Typography

Business introduces no visual values, CSS or motion. It inherits the complete Core
visual contract, including the explicitly accepted functional-first V-01 scope.
All theme/density/zoom behavior is verified through the composed Core surface.

[Visual contract](sidekick-input-visual-contract.md) records the checked
selectors, values, token transfer, light/dark/high-contrast/forced-color handling,
S/M/L behavior, text roles and unresolved visual decision V-01. No font is loaded.

## Accessibility, Keyboard and Focus Contract

The shared contract fixes editable multiline textbox and atomic mention semantics,
nonfocusable atoms, listbox navigation, menu buttons/radio groups, complete localized
names, read-only/disabled states, status announcements and focus restoration. Its
sections 3–6 define exact key priority, IME guards, Tab/Escape behavior, cancellation,
portal relationships and disappearance of a focused action. No implicit form or
positive tabindex; all actions are native buttons. The visual contract fixes target
minimums, contrast obligations and zoom/reflow. WCAG 2.2 AA remains mandatory in the
functional-first scope; unknown/failing semantics cannot be deferred to visual design.

## Motion Contract

Source-backed ordinary composer transitions and Reduced Motion are enumerated in
the visual contract. Standalone editor adds no decorative transition. Business
adds none. Existing necessary Spinner behavior remains governed by its specification.

## Internationalization and Content Contract

All UI, status, error, accessible and item names are already localized consumer data.
Core has no textstring IDs or translation library; no default language/locale,
recognition language, timezone, sorting or RTL behavior is inferred. Dictation
language is explicit. Long strings wrap/scroll without reducing local typography.
The full-label accessible name is retained when the visible selector uses shortLabel.

## Responsive, Layout and Container Interaction

Follow the source-backed width/growth/ten-line overflow, narrow layout, scrolling,
wrapping, viewport collision and DOM-order rules in the shared visual/interaction
contracts. Consumer container owns outer placement; rootProps addresses only the
composer wrapper. Native className/style remain available but cannot replace owned
semantics, disable pointer minimums or introduce keyboard/contrast violations.

## Loading, Async and Error Contract

The shared contracts define external mention query IDs/results, no internal fetching,
pending-send behavior, local capture transitions/cleanup and localized errors. No
retry, upload, transport, cancellation of an external request or failed-draft storage
is silently implemented. Capture runtime errors preserve finalized text and report
outward; code/configuration errors throw descriptive developer errors. Error does
not overwrite a newer controlled value or move focus. External async actions belong
to the consumer; no new timeout except the explicit accepted recognition stop guard.

## Performance Characteristics

Selection-only updates do not emit value changes. Normalize/serialize on content
updates; do not recreate the engine on a controlled echo. Interim recognition is
suffix replacement rather than repeated document appends/history pushes. Overlay
updates coalesce geometry reads on animation frames and clean up observers/listeners.
There is no unconfirmed content-length limit, virtualization or debounce policy.

## Dependencies

Generic editor uses the bounded Lexical 0.52.0 package set researched in the
[acceptance plan](sidekick-input-acceptance-plan.md); no installation yet.
Composer uses Core UI plus native SpeechRecognition/mediaDevices APIs. Business
uses the accepted Core/React peer-only package. Dependency direction never points
from Core to Business. Architecture/distribution review R-01 is accepted by SIDEKICK-025.

## Non-Goals

No general document formatting, HTML imports, collaboration, file upload, Sidekick
SDK/endpoints, voice transport/playback, recents persistence or translation system.
No final visual approval for functional-first additions; no release-readiness claim.

## Escape Hatches and Overrides

Only compatible native props, editor commands, rootProps and documented externally
supplied collections/content are available. No arbitrary editor plugins/HTML, hidden
engine state, generic props bag or replacement of Core-owned button/menu structures.

## Test and Visual Verification Contract

The [acceptance plan](sidekick-input-acceptance-plan.md) specifies adapter,
real-browser editing/IME, keyboard/focus, capture races, optimistic send, SSR/package,
TypeScript, token/contrast, visual and manual screenreader cases. Planned stories
are explicitly separate from executed evidence. No new component story exists yet.
Existing Core reuse evidence is listed in the visual contract and proves only those
existing contracts. Completion requires actual new stories and test/manual evidence.

## AI Usage Contract

- Use when: Provide a Sidekick dialog input with external agent/model context, prompt actions and optimistic draft handoff.
- Do not use when: Do not use for a generic composer or as a Sidekick backend, upload service or voice transport.
- Required context: controlled document/item state, resolved labels, capture-language
  source when enabled, accepted contract and source-backed visual scope.
- Forbidden assumptions: installed new public exports, internal data retrieval,
  unsupported capture capability, automatic recents/layout transitions or final design.
- Related decisions: SIDEKICK-001–026 and ADR 0004; accepted reviews R-01/R-02 (SIDEKICK-025/026).

## Canonical Example

The [consumer guide](sidekick-input-usage.md) contains the smallest controlled public usage.
It requires no Compound Parts or internal CSS classes. Examples are syntax-checked
against the contract; actual public-export typechecks follow with implementation.

## Open Decisions

No component-relevant implementation blockers. R-01 is resolved by SIDEKICK-025;
R-02 / V-01 is resolved by SIDEKICK-026. Final visual design for the explicitly
provisional additions is a designer follow-up before final visual/release approval,
not an unresolved functional requirement. New ambiguities stop the affected step.

## Readiness Assessment

- Design Rules Complete: yes for the accepted functional scope, including explicit visual exceptions
- Foundation Dependencies Complete: yes; exact source/token transfer is part of the accepted scope
- API Contract Complete: yes — SIDEKICK-025
- Semantic / Keyboard / Focus / Accessibility Contract Complete: yes
- State Matrix / Density / Motion / Internationalization Contract Complete: yes
- Test / Visual Verification Contract Complete: yes; execution required during implementation
- Storybook Evidence: existing Core reuse plus approved preimplementation plan; no new stories executed
- Open Implementation Blockers: 0
- Specification Status: READY FOR IMPLEMENTATION
- Detailed gate: [readiness assessment](sidekick-input-readiness-assessment.md)

## Specification Change Rules

Accepted changes update this specification, shared contracts, Decision Register and
readiness assessment before code. An implementation-discovered ambiguity stops the
affected step. Changes to APIs, serialization, event order, semantics, focus, package
boundaries, tokens or visual exceptions require renewed scoped review and matching
test/story/type/usage updates. A partially implemented component is not authorization.
