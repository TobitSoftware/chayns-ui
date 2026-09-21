# Badge — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `#status` → “Badges & Chips”, checked 2026-09-21
- Relevant Decisions: BADGE-001–002, DESIGN-011

## Purpose and boundary

Badge is a compact status indicator for short localized content. Use it for a state, category or count that belongs to nearby content. The Bodywork “Badges & Chips” contract permits an optional removable mode; it does not create a separate public Chip component.

## Public API and native ownership

`Badge` renders a native `span`, forwards compatible span props and its ref to that span, and accepts `children`, `tone`, `size`, optional `onRemove` and required `removeLabel` when removable. The finite values are exported through `BADGE_TONES` and `BADGE_SIZES`. Without `aria-label`, the badge is decorative or part of the surrounding accessible name. With `aria-label`, it renders `role="status"` and uses the localized label as its accessible name. Removable badges render a native close button with the localized `removeLabel`; `onRemove` is called and visibility remains controlled by the consumer.

## Visual and accessibility contract

The default tone is `neutral` and the default size is `md`. `sm` and `md` are confirmed design variants. Tone styling uses the existing semantic accent, surface, success, warning and danger tokens. The close control is the only interactive part. Its content remains short and must wrap or be shortened by the consumer before composition when the product text requires a sentence.

## Bodywork evidence

Bodywork defines the status badge as `.badge`: inline-flex, centered content, `--k5` gap, `--k4` vertical and `--k12` horizontal padding, 999px radius, `--fs-caption` and weight 500. `.badge-chip` uses `--k6` gap, `--k5` vertical and `--k12` horizontal padding with `--fs-meta`. Status backgrounds use `--success-bg`, `--warning-bg` and `--danger-bg`; chayns UI uses the accessible `--text` foreground where the Bodywork status foreground does not meet the confirmed contrast requirement. Count uses `--accent`/`--on-accent` and chips use `--surface-alt`/`--accent`. Bodywork states that badges show status and are not buttons; the removable extension is the explicitly confirmed chayns UI API for chip-like use.

## Verification

Runtime, type and SSR tests cover native props/ref, tone and size values, decorative semantics, named status semantics and the removable action. Storybook covers status, count, chip and removable examples. Bodywork review states are default, hover/focus of the remove control, status tones, count, chip and reduced motion.
