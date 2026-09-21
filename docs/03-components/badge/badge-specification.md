# Badge — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `#status` → “Badges & Chips”, checked 2026-09-21
- Relevant Decisions: BADGE-001, DESIGN-011

## Purpose and boundary

Badge is a compact, non-interactive status indicator for short localized content. Use it for a state, category or count that belongs to nearby content. Interactive or removable tags and chips belong to a separately specified component when needed.

## Public API and native ownership

`Badge` renders a native `span`, forwards compatible span props and its ref to that span, and accepts `children`, `tone` and `size`. The finite values are exported through `BADGE_TONES` and `BADGE_SIZES`. Without `aria-label`, the badge is decorative or part of the surrounding accessible name. With `aria-label`, it renders `role="status"` and uses the localized label as its accessible name.

## Visual and accessibility contract

The default tone is `neutral` and the default size is `sm`. `sm` maps to the Bodywork status badge and `md` maps to the compact chip geometry. Tone styling uses the existing semantic accent, surface, success, warning and danger tokens. The badge has no interactive descendants. A close action must be composed by a separately specified interactive chip or tag.

## Bodywork evidence

Bodywork defines the status badge as `.badge`: inline-flex, centered content, `--k5` gap, `--k4` vertical and `--k12` horizontal padding, 999px radius, `--fs-caption` and weight 500. `.badge-chip` uses `--k6` gap, `--k5` vertical and `--k12` horizontal padding with `--fs-meta`. Status backgrounds use `--success-bg`, `--warning-bg` and `--danger-bg`; chayns UI uses the accessible `--text` foreground where the Bodywork status foreground does not meet the confirmed contrast requirement. Count uses `--accent`/`--on-accent` and chips use `--surface-alt`/`--accent`. Bodywork states that badges show status and are not buttons. Its removable tag and chip patterns are kept separate from this status component.

## Verification

Runtime, type and SSR tests cover native props/ref, tone and size values, decorative semantics and named status semantics. Storybook covers status, count and chip-like static content. Bodywork review states are default, status tones, count, chip and reduced motion.
