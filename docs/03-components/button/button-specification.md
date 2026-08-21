# Button and IconButton — Component Specification

## Metadata — Required

- Component Name: Button and IconButton
- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Core
- Design Reference: chayns Design System “Buttons & Aktionen”, inspected 2026-08-21
- Relevant Decision IDs: CORE-001–007, BUTTON-001–011, ICON-001–003, A11Y-001–007, DENSITY-001–005, PLATFORM-001–003, DIST-012–013
- Foundation Dependencies: token catalogue Milestone 1 transfer, density matrix, typography, motion, accessibility, generated `@chayns-ui/tokens` subset
- Related Components: future Link (navigation; not part of this milestone)
- Last Reviewed: 2026-08-21

## Purpose — Required

Button triggers a generic user action with a visible text label. IconButton triggers a compact action represented by a familiar icon while retaining a programmatic accessible name. Both provide presentation, native interaction and generic accessibility only; they do not own business logic, navigation, async work or application state.

## Use When — Required

Use Button for actions whose label can be visible. Use IconButton only in a familiar compact action context such as a toolbar or list row and only with a localized accessible name. Select the variant from the semantic action hierarchy; one semantic action scope has at most one Primary action.

## Do Not Use When — Required

Do not use either component for navigation; use a native link/future Link. Do not use IconButton when the icon is ambiguous without visible text. Do not use Button as a toggle, selected control, loading indicator, menu, split button or local size control.

## Related Components and Selection Boundaries — Conditional

Button is an action, never an anchor. IconButton is not a compressed text Button and has a square/circular visual contract. Split Button, Segmented Control and Link are separate future specifications.

## Anatomy — Conditional

- Button root: one native `<button>` and no wrapper.
- Button content: required consumer content; it must provide a non-empty visible label. Decorative content inside it remains the consumer's responsibility.
- IconButton root: one native `<button>` and no external wrapper.
- Regular icon slot: required consumer React node, rendered inside an `aria-hidden` internal span.
- Active icon slot: optional consumer React node, rendered inside an `aria-hidden` internal span and shown on hover/active. When absent, the regular icon remains visible.

## Semantic Contract — Conditional

Both roots are native buttons. `aria-disabled` never replaces native `disabled`. Button obtains its accessible name from required visible content unless the consumer uses a compatible native naming prop. IconButton requires exactly one of non-empty `aria-label` or `aria-labelledby` at the TypeScript contract level. Internal icon wrappers are decorative and cannot add duplicate accessible names.

## Variants — Required

- `primary`: the single highest-emphasis action in its semantic action scope.
- `outline`: an equal/secondary alternative next to the primary action.
- `ghost`: a tertiary, minimally emphasized action.
- `danger`: a destructive action, including reversible destructive actions under the repository decision.

`variant` is required and has no default. No other variant exists in Milestone 1.

## Local Size Variants — Conditional

None. Button and IconButton have no S/M/L prop. Global S/M/L density controls their geometry through resolved tokens.

## States — Conditional

- default: variant presentation and native availability.
- hover: pointer-only visual feedback; never the only access to meaning.
- active: native press state plus immediate evidenced scale feedback; Primary also uses `--accent-active`.
- focus-visible: full-color resolved focus ring using `--focus-ring-size` and `--focus-ring-rgb`.
- disabled: native `disabled`, no focus or activation. Primary and Danger use disabled background/foreground; Outline uses surface, disabled foreground and disabled border; Ghost stays transparent with disabled foreground. Hover/active styling does not apply.

There is no loading, selected, toggled, read-only, error or success state.

## State Priority and Combination Matrix — Conditional

`disabled` has highest priority and suppresses hover/active behavior. `focus-visible` can coexist with default, hover or active while enabled. `active` overrides the applicable enabled default/hover color where specified. The active icon appears for enabled IconButton hover and active states; disabled always shows the regular icon.

## Public API Contract — Required

```ts
type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';

interface ButtonProps extends Omit<React.ComponentPropsWithRef<'button'>, 'children'> {
  variant: ButtonVariant;
  children: React.ReactNode;
}

type IconButtonAccessibleName =
  | { 'aria-label': string; 'aria-labelledby'?: never }
  | { 'aria-label'?: never; 'aria-labelledby': string };

type IconButtonProps = Omit<
  React.ComponentPropsWithRef<'button'>,
  'children' | 'aria-label' | 'aria-labelledby'
> &
  IconButtonAccessibleName & {
    variant: ButtonVariant;
    icon: React.ReactNode;
    activeIcon?: React.ReactNode;
  };
```

Compatible native props, `data-*`, `aria-*`, handlers and `className` are forwarded. `type` defaults to `button`; explicit `submit` and `reset` are preserved. React 19 ref-as-prop targets the native button. No `as`, `asChild`, `size`, `loading`, `selected`, `pressed`, navigation or style-variant escape prop exists.

## Native Props and DOM Contract — Conditional

Each component emits exactly one native root button. Button has no internal wrapper imposed by the component. IconButton has only the two documented decorative icon spans inside its root. The ref is stable and targets `HTMLButtonElement`. Native form behavior, name/value, autofocus, event and ARIA props remain browser/React behavior.

## Composition — Required

Button composes required consumer `children`; content must include a meaningful visible label and remain robust when localized. IconButton does not accept children and composes only `icon` plus optional `activeIcon`. Neither exposes subcomponents or Context.

## Context Dependencies — Required

No React Context dependency. Resolved CSS custom properties arrive through normal CSS inheritance from the host/theme environment.

## State Ownership — Required

No React state. Hover, active, focus and disabled are native/CSS states. Business/application code owns action results and availability.

## Design Tokens — Conditional

Shared: `--fs-body`, `--sp-2`, `--btn-py`, `--focus-ring-size`, `--focus-ring-rgb`, semantic variant colors and disabled roles. Button uses `--btn-px`; Ghost uses `--sp-4`; IconButton uses `--ctrl-h`. Primary uses `--shadow-btn` and `--shadow-btn-hover`. Outline border width `1.5px`, Pill radius `999px`, IconButton `50%`, weight `500`, line-height `1.1`, Button active scale `.97` and IconButton active scale `.9` are confirmed component property evidence.

## Density Contract — Conditional

All internal spacing, text size and control geometry resolve through global `--sf` at S/M/L. Radius, border width, color, focus, shadows and immediate active transform are density-independent. M is supplied by the token baseline default.

## Color and Theme Contract — Conditional

Core consumes only resolved variables and has no theme logic. Supported reference selectors are light, dark, high contrast and color deficiency. Primary uses accent/on-accent; Outline uses surface/accent; Ghost uses transparent/text-2; Danger uses danger background/foreground. Calibrated reference Danger values and all tested pairs must meet normal-text contrast. Forced Colors uses platform system colors without changing semantics.

## Typography Contract — Conditional

Use inherited font family, `--fs-body`, weight `500`, line-height `1.1` and inherited letter spacing. Core loads no font. Labels wrap instead of shrinking or truncating and remain usable with localized/Unicode text and text-spacing overrides.

## Accessibility Contract — Required

Native role, state and activation are preserved. Every Button has a visible non-empty label; every IconButton has a localized programmatic name. Disabled controls are removed from sequential focus and cannot activate. Focus is visible in all supported modes and Forced Colors. Meaning is not color-only: text labels/name and icon shape communicate purpose; variant color communicates emphasis but never replaces wording. Minimum targets exceed 24×24 CSS px at S/M/L. Components support 200% zoom, reflow, text spacing and long content without loss of function.

## Keyboard Contract — Conditional

Native button behavior only: Tab/Shift+Tab moves focus in document order; Space and Enter activate enabled controls according to browser semantics; disabled controls are skipped and do not activate. No custom key handler is added.

## Focus Contract — Conditional

No programmatic focus or restoration. The native button receives focus. `:focus-visible` renders the specified ring; `:focus:not(:focus-visible)` gets no custom ring. Consumer `className` must not remove the required focus indicator.

## Motion Contract — Required

No CSS transition, animation, delay or easing. Active transform is immediate direct property evidence. There is no functional dependency on Motion and no component-specific Reduced Motion branch.

## Internationalization and Content Contract — Conditional

Consumers provide already resolved visible labels and accessible names. Core knows no textstring IDs and creates no natural-language text. Labels and accessible names are localizable. No locale, region, currency, timezone or RTL requirement is inferred. Logical CSS is used; RTL support is not claimed.

## Responsive and Layout Behavior — Conditional

Button is inline-flex, has no external margin, can wrap its label, and does not set a consumer width. It respects constrained containers and `max-inline-size: 100%`. IconButton keeps square geometry and does not shrink below `--ctrl-h`.

## Container Interaction — Conditional

The container owns placement, action-scope relationships, gaps and external margins. Components expose `className` only for documented native-compatible composition; consumers must not override semantic states or required accessibility styling.

## Loading and Async Contract — Required

Unsupported. An async owner may set native `disabled` while processing, but Button does not infer, announce or render loading and exposes no loading prop.

## Error Contract — Conditional

Not applicable. These controls do not validate input or present errors.

## Performance Characteristics — Conditional

Stateless function components with deterministic markup, no effects, IDs, DOM reads or browser globals. Import and server render must succeed without a DOM.

## Dependencies — Required

Core peer: React `>=19.2 <20`. Runtime dependencies: none. CSS dependency: consumer explicitly loads resolved token CSS and Core Button or aggregate CSS. No icon-library runtime is bundled; consumer icons must come from the approved project icon system.

## Non-Goals — Required

Navigation, loading, toggle/selected state, local sizing, polymorphism, tooltip, menu, split button, icon-library integration, business logic, theme resolution and margins.

## Escape Hatches and Overrides — Required

Native props and `className` are the only general escape hatches. There is no variant token override API. Consumer CSS must not remove focus, enabled/disabled distinctions, target size or accessible content.

## Examples — Recommended

Canonical: `<Button variant="primary">Erstellen</Button>`. Icon-only: `<IconButton variant="ghost" icon={<RegularIcon />} activeIcon={<SolidIcon />} aria-label="Anhang hinzufügen" />`.

## Do / Don't — Recommended

Do begin visible labels with a clear verb, keep one Primary per semantic scope and label IconButton explicitly. Do not label an action only “OK”, use a button for navigation, or place an ambiguous icon without visible text.

## Test Contract — Required

Unit tests cover native role/name, required variant rendering, default/explicit type, native prop/event/data/ARIA forwarding, ref target, disabled suppression, class merging, all variants, IconButton naming and icon-pair fallback. Type fixtures reject missing/invalid variants, missing Button content, missing IconButton name, both name forms together, children on IconButton and unsupported APIs. SSR render/import is tested. Stories cover variants, states, icon pair/fallback, form use, long localized/Unicode content, constrained width and every density/theme/accessibility mode. Axe errors fail. Manual verification covers keyboard, accessibility tree/screenreader, focus, Forced Colors, contrast, 200% zoom/reflow, text spacing, pointer targets and Reduced Motion.

## Visual Verification Contract — Conditional

Canonical Chromium screenshots cover four variants and IconButton across light/dark, S/M/L, high contrast and color deficiency; enabled default/hover/active/focus-visible/disabled states; long text; constrained width; icon pair and fallback. CI uses pinned Chromium and does not assert host font loading.

## AI Usage Contract — Required

### Use when

Use Button for a generic text-labelled action and IconButton for a familiar compact icon action with an explicit localized accessible name.

### Do not use when

Do not use for navigation, loading, selection/toggle, menus, split actions or business-specific behavior.

### Required context

The semantic action hierarchy, whether the action is destructive, the resolved label/name and container-owned placement must be known.

### Forbidden assumptions

Do not infer a default variant, local size, loading state, tooltip, icon library, navigation target, action scope or translated text.

### Related decisions

BUTTON-001–011, ICON-001–003, CORE-004–007, A11Y-001–007, DENSITY-001–005.

## Open Decisions — Required

No component-relevant open decisions. OPEN-008–011 and OPEN-016–022 are not dependencies of this stateless, text-consuming native action control.

## Readiness Assessment — Required

- Design Rules Complete: yes
- Foundation Dependencies Complete: yes
- API Contract Complete: yes
- Semantic Contract Complete: yes
- Accessibility Contract Complete: yes
- Keyboard Contract Complete: yes
- State Matrix Complete: yes
- Density Contract Complete: yes
- Motion Contract Complete: yes
- Internationalization Contract Complete: yes
- Test Contract Complete: yes
- Visual Verification Contract Complete: yes
- Open Implementation Blockers: 0
- Specification Status: READY FOR IMPLEMENTATION

## Specification Change Rules — Required

Any new variant, state, icon contract, local size, polymorphism, DOM wrapper, context, motion, text ownership, loading behavior, token mapping or semantic behavior requires a documented specification/decision update, a new readiness assessment and matching public/type/behavior/a11y/visual tests before implementation.
