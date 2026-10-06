# Icon rule review — 2026-10-06

The global ICON-001–003 contract remains: interactive icons use Regular at rest,
Solid on enabled hover/active, and Regular when disabled. Informational icons stay
Regular, except for the explicitly confirmed whole-Card header hover feedback
(CARD-006); single-weight/brand/custom glyphs keep the available weight. Focus alone
is not an active pointer state. Wrappers own visibility so Font Awesome SVG
replacement cannot reveal both weights. Public APIs and icon name values stay intact. Components using the shared renderer
import the existing button stylesheet, including for individual component CSS
entries. The existing copy step rewrites relative imports for the flat dist layout;
no new exports, dependencies or build tools are introduced. Internal decorative
icon wrappers in Core, Tabs and AppLayout use `pointer-events: none`, so pointer
hits reach their native controls. With SVG replacement, WebKit previously left
SplitButton's native `:active` false when pressing directly on its chevron; the
same pointer interaction now activates the button and applies the .97 press scale.

The Stepper's intended weights matched the global rule, but its first implementation
hid the glyph nodes themselves. Unlayered Font Awesome SVG display styling overrode
that hiding. The wrapper repair solved duplicate rendering; this follow-up also
reuses the existing internal ButtonIcon instead of retaining Stepper-specific markup
and weight CSS.

| Component / role | Outcome |
| --- | --- |
| Button / IconButton | Existing shared wrapper rendering and enabled hover/active switching retained. |
| Stepper | Uses the existing shared renderer and its global control state selectors. |
| SplitButton | Uses the same shared state selectors; duplicate local weight rules removed. |
| Pagination arrows / SegmentedControl / PopupList / ComboBox trigger / Banner close / Breadcrumb links | Previously rendered both weights but stayed Regular because only Button/SplitButton selectors switched them. Their native owners now participate in the shared switching rules. |
| Accordion disclosure chevron | Replaced Regular-only glyph with the existing shared renderer; rotation, dimensions and disabled semantics stay unchanged. |
| Tabs owned close affordance | Existing internal TabsIcon now supplies wrapped weights and enabled Tab/Add state switching. Examples use this same internal renderer for composed tab/add glyphs. |
| AppLayout actions / disclosure / collapse | Existing wrapper renderer retained; added active switching and disabled guards; removed focus-only Solid switching. |
| Card header | CARD-006 supersedes the initial informational-only classification: hovering the whole Card switches its owned header glyph to Solid and changes/scales its icon surface. |
| Banner information / Breadcrumb current page and separators | Informational Regular glyphs remain unchanged on hover; Banner close retains its own action feedback. |
| ComboBox selected checkmark | Informational state marker corrected from Solid to Regular. |
| Checkbox checked glyph | Informational Regular marker retained; its visibility/motion selectors now handle both font and SVG glyphs. |
| Avatar / AvatarGroup / Badge / List / Popup content / Accordion leading slot | Consumer-supplied glyphs/content remain consumer-owned. They are not implicitly reinterpreted or mutated. |
| Remaining controls / loaders | No owned Font Awesome action glyphs. Button loading remains within its existing documented renderer. |

Consumer composition can contain arbitrary JSX, including standalone `i` elements.
The library cannot infer their glyph pairing or informational/action role. These
children remain the consumer's responsibility; this review does not invent a public
Icon component or add undocumented icon props to Tabs/List/Popup.

Checked source: all Core/Layout TSX icon occurrences and their owning CSS; existing
component specifications and ICON-001–003. Bodywork HTML and tobit-ds.css were
rechecked on 2026-10-06. This review records owned glyph behavior, not a complete
manual accessibility or visual release audit.

## Verification

Full verification passes with 185 unit tests and 89 Storybook tests. Browser checks
in Chromium and WebKit simulate Font Awesome SVG replacement with unlayered display
rules and verify resting, hover, active and disabled glyphs on the affected owners.
The PopupList portal is checked separately. A packed standalone Stepper stylesheet
resolves its shared icon rules in both engines, without loading aggregate Core CSS.
Card header weights now follow the explicit user correction: Regular at rest,
Solid on whole-Card hover, including under Reduced Motion; unrelated nested native
actions retain their own states. The initial Regular-on-hover classification is superseded.

## Exact Bodywork motion follow-up

Checked live Bodywork HTML and `tobit-ds.css` on 2026-10-06: `#motion`, `.lift`,
`.card-icon`, `.btn-anim`, `.icon-btn`, `.tr` and `#status .badge-anim`.
Card moves -4px over 220ms with the entry curve, changes its owned icon surface
colors over 220ms and scales that surface to 1.08 over 280ms; it has no press effect.
Button uses -1px hover / .97 press and 140ms transform / 180ms shadow-filter;
IconButton uses its distinct -2px hover / .9 press and .tr timings. SplitButton
reuses Button styles for both halves. Existing Badge sizes move -2px with 150ms
transform, 200ms filter/shadow, saturation 1.18 and the reference shadow. Reduced
Motion removes decorative transforms and transitions without losing icon/color feedback.

Real pointer checks in Chromium and WebKit cover hover on Card content away from
the icon, exact computed transitions/easing/transforms/colors, press precedence,
leave, disabled, keyboard focus, SVG replacement and Reduced Motion. Banner surface
and informational glyph have no hover motion/weight change. Chip, Tag and Filter
are not implemented public components; their eventual contracts must record the
user-confirmed lift and Regular/Solid rule. Existing Badge emoji/consumer children
remain consumer-owned rather than introducing an unconfirmed icon prop.
