# Avatar - Component Specification

## Metadata

- Component Name: Avatar
- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Core
- Design Reference: Bodywork Design System `#medien`, checked 2026-09-21
- Related Components: ListItem
- Last Reviewed: 2026-09-14

## Purpose

Avatar presents a person's image or a deterministic initials fallback in a
compact circular identity surface. It owns presentation and generic
accessibility only; it does not fetch images or resolve business identity.
AvatarGroup composes Avatar children into an overlapping group and optionally
limits the visible tiles with a `max` prop.

## Use When

Use Avatar to identify a person or identity in a compact UI, including as the
leading content of a ListItem.

## Do Not Use When

Do not use Avatar as a status indicator, a generic icon container, or a source
of business data.

## Anatomy

- Root: a non-interactive element with the avatar presentation class.
- Image: optional native `img` when `src` is supplied and usable.
- Initials fallback: at most two uppercase letters derived from `name`.
- Geometry: `size="small"`, `size="default"` and `size="large"` use the
  Bodywork 36, 44 and 52 px geometry tokens respectively.
- Group: `AvatarGroup` accepts Avatar children, overlaps them, and renders a
  final `+N` overflow tile when `max` is exceeded.
- Optional bottom badge slot: consumer-provided content overlaid at the lower
  edge.

## Initials and Color Contract

`name` is required. Initials use the first character of the first and last
whitespace-separated name words, or the first character only when there is one
word. The result is uppercased and limited to two characters.

When no image is shown, the background color is deterministic for the same
name. Its hue is derived by the confirmed character-code hash, with 65%
saturation. To preserve contrast with the centrally resolved `--on-accent`
foreground, the initials fallback uses 25% HSL lightness in Light mode and
70% in Dark mode. Core does not choose the foreground color; `--on-accent`
continues to resolve it centrally as white in Light mode and near-black in
Dark mode.

## Public API Proposal

```ts
interface AvatarProps {
  name: string;
  src?: string;
  alt?: string;
  badge?: React.ReactNode;
  className?: string;
  id?: string;
}
```

`alt` is optional and defaults to `name`. When `src` is absent or the image
fails to load, initials are rendered while the accessible name remains
`alt ?? name`. Avatar supports the explicit `small`, `default` and `large`
geometry variants; these are separate from global density values. Avatar and
AvatarGroup forward compatible native span props and refs to their roots.

`AvatarGroup` applies its own `size` to every Avatar child. When `max` is
exceeded, it renders the first `max - 1` children and uses the final tile for
the remaining count. The overflow tile is decorative; accessible names remain
provided by the visible Avatar children.

## Semantic and Accessibility Contract

Avatar is non-interactive by default and must not create a focus target.
Meaningful image content requires a localized accessible name. A badge is
always decorative and must not contain interactive controls. An interactive
status or control belongs outside Avatar and must not be nested in a ListItem
row action.

## Open Decisions

No blocking open decisions remain. `src` omission and image errors use the
initials fallback; `alt` defaults to `name`; badges are decorative; colors use
the confirmed name-derived HSL fallback and `--on-accent`.

## Test and Visual Verification Contract

Tests must cover one-word and multi-word names, whitespace normalization,
uppercase initials, deterministic HSL output, Light/Dark lightness mapping,
image rendering/fallback, badge composition, accessible naming, server
rendering, no accidental focus target, group overlap, group size override, and
overflow counts. Visual verification must cover density sizes, image/fallback
states, badge placement, group overlap, overflow tile, light/dark/high-contrast
and localized names.

## Readiness

The readiness assessment authorizes implementation within this contract.
