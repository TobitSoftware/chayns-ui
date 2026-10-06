# Icon rule review — 2026-10-06

The global ICON-001–003 contract remains: interactive icons use Regular at rest,
Solid on enabled hover/active, and Regular when disabled. Informational icons stay
Regular; single-weight/brand/custom glyphs keep the available weight. Focus alone
is not an active pointer state. Wrappers own visibility so Font Awesome SVG
replacement cannot reveal both weights. Public APIs and icon name values stay intact. Components using the shared renderer
import the existing button stylesheet, including for individual component CSS
entries. The existing copy step rewrites relative imports for the flat dist layout;
no new exports, dependencies or build tools are introduced.

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
| Card header / Banner information / Breadcrumb current page and separators | Informational Regular glyphs remain unchanged on hover. |
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
Card retains its informational Regular icon during the hover lift.
