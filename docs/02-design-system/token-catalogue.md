# chayns UI – Token Catalogue

## Purpose

Dieses Dokument ist der konkrete, versionierte Arbeitskatalog der in `chayns UI` bestätigten Design Tokens. Es ergänzt [tokens.md](tokens.md) als Token-Modell sowie [color-system.md](color-system.md), [typography.md](typography.md), [motion.md](motion.md) und [density.md](density.md).

Es ist die fachliche Grundlage für die spätere technische Token Source of Truth. Die zukünftige maschinenlesbare Token-Datei beziehungsweise Token-Build-Pipeline ist weiterhin nicht entschieden. Dieses Markdown-Dokument ist daher zunächst die normative Inventarisierung bestätigter Token-Daten, aber keine Runtime-Implementierung.

Die externen Daten wurden am 20.08.2026 aus der ausgelieferten [Tobit.Software-DesignSystem-CSS](https://tappqa.tobit.com/Bodywork/DesignSystem/tobit-ds.css) geprüft. Bei Konflikten haben bestätigte chayns-UI-Entscheidungen Vorrang.

## 2. Catalogue Status Model

### CONFIRMED

Tokenname und dokumentierte Bedeutung sind eindeutig bestätigt. Ist ein konkreter Wert direkt belegt, wird er angegeben.

### PARTIAL

Tokenname oder Rolle ist bestätigt, aber mindestens eine relevante Information fehlt, beispielsweise vollständige Rollenmetadaten, Density-Mapping oder die freigegebene chayns-UI-Zuordnung.

### DESIGN REVIEW

Eine visuelle oder semantische Entscheidung durch Design fehlt.

### TECH REVIEW

Die Designregel ist klar, aber technische Übertragung oder verlässliche Extraktion ist nicht abgeschlossen.

## 3. Catalogue Schema

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| Example only | — | — | This row is explanatory only and not a token. | — | — | — | — | — | All catalogued tables below use this schema. |

`Level` is Primitive, Semantic or Component-specific. `Density` is density-independent, density-dependent, mapping pending or not applicable. Unknown data is written as `not yet confirmed`, never inferred.

## 4. Density Factor

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--sf` | Density | Primitive | Global scaling factor for density-aware DesignSystem values. | S: `0.9`; M: `1`; L: `1.125`; M is default. | not applicable | S / M / L | CONFIRMED | DesignSystem CSS; DENSITY-001–003; `density.md` | The factor does not authorize deriving a token's effective S/M/L value unless its CSS mapping is directly confirmed. |

The DesignSystem also defines source helper `--u: calc(1px * var(--sf))`. It is not a confirmed public chayns-UI token contract; see Legacy / Source-only Tokens.

## 5. Spacing

General chayns-UI spacing uses `--sp-*` (TOKEN-003). The direct CSS mappings below are confirmed; their effective value is defined by the displayed formula, not newly calculated in this catalogue.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--sp-1` | Spacing | Primitive | Smallest confirmed general spacing step. | `calc(4 * var(--u))` | density-dependent | S / M / L | CONFIRMED | DesignSystem CSS; TOKEN-003 | General chayns-UI spacing API. |
| `--sp-2` | Spacing | Primitive | General spacing step. | `calc(8 * var(--u))` | density-dependent | S / M / L | CONFIRMED | DesignSystem CSS; TOKEN-003 | General chayns-UI spacing API. |
| `--sp-3` | Spacing | Primitive | General spacing step. | `calc(12 * var(--u))` | density-dependent | S / M / L | CONFIRMED | DesignSystem CSS; TOKEN-003 | General chayns-UI spacing API. |
| `--sp-4` | Spacing | Primitive | General spacing step. | `calc(16 * var(--u))` | density-dependent | S / M / L | CONFIRMED | DesignSystem CSS; TOKEN-003 | General chayns-UI spacing API. |
| `--sp-5` | Spacing | Primitive | General spacing step. | `calc(20 * var(--u))` | density-dependent | S / M / L | CONFIRMED | DesignSystem CSS; TOKEN-003 | General chayns-UI spacing API. |
| `--sp-6` | Spacing | Primitive | Largest currently confirmed general spacing step. | `calc(24 * var(--u))` | density-dependent | S / M / L | CONFIRMED | DesignSystem CSS; TOKEN-003 | General chayns-UI spacing API. |

## 6. Component-specific Measures

The following names, values and DesignSystem meanings are directly evidenced. The Button-specific allocations listed as CONFIRMED are documented source assignments, not a Button API. All other Component allocations remain PARTIAL; no related names may be created from them.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--btn-py` | Component-specific | Component-specific | Vertical padding assigned to the documented Primary, Outline and Destructive button styles. | `calc(11 * var(--u))` | density-dependent | S / M / L | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen”; TOKEN-004 | Source assignment only; it does not define a Button API or a local size variant. |
| `--btn-px` | Component-specific | Component-specific | Horizontal padding assigned to the documented Primary, Outline and Destructive button styles. | `calc(22 * var(--u))` | density-dependent | S / M / L | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen” | Ghost uses source-only `--k16`; that does not establish a public chayns-UI token. |
| `--input-py` | Control Geometry | Component-specific | Vertical padding used by documented input/search field patterns. | `calc(13 * var(--u))` | density-dependent | S / M / L | PARTIAL | DesignSystem CSS | Form-control composition remains TECH REVIEW. |
| `--input-px` | Control Geometry | Component-specific | Horizontal padding used by documented input/search field patterns. | `calc(16 * var(--u))` | density-dependent | S / M / L | PARTIAL | DesignSystem CSS | Form-control composition remains TECH REVIEW. |
| `--row-py` | Control Geometry | Component-specific | Vertical padding used by documented list rows. | `calc(12 * var(--u))` | density-dependent | S / M / L | PARTIAL | DesignSystem CSS | No general row component contract yet. |
| `--row-px` | Control Geometry | Component-specific | Horizontal padding used by documented list rows. | `calc(15 * var(--u))` | density-dependent | S / M / L | PARTIAL | DesignSystem CSS | No general row component contract yet. |
| `--ctrl-h` | Control Geometry | Component-specific | Square geometry assigned to documented Icon Buttons; also used by documented controls such as search. | `calc(42 * var(--u))` | density-dependent | S / M / L | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen” | Source assignment only; it does not define a general Button size API. |

## 7. Radius

The confirmed chayns-UI rule is a global primitive, density-independent Radius scale with no free intermediate values. The DesignSystem directly documents the principles Pill (`999px`), MD (`10px`) and SM (`6px`), plus nested-surface guidance. It does not expose canonical CSS custom-property names for those radius levels.

Consequently no Radius token is catalogued as a public chayns-UI token in this step. Naming, complete values and component-to-radius mapping remain TECH REVIEW. The visible CSS values are DesignSystem evidence, not a newly created token API.

### Button-specific property evidence

The delivered Button documentation identifies Pill (`999px`) as the standard radius for all surface buttons. It also documents MD (`10px`) for compact contexts such as dialogs and forms, and SM (`6px`) for tables and toolbars. These are directly documented, density-independent Button properties, not newly named public chayns-UI Radius tokens and not a Button variant API.

## 8. Typography

Font Provision remains outside components. The entries below are confirmed size mappings; Font Weight, Line Height and Letter Spacing are role metadata but are not fully extractable as canonical role data from the bound DesignSystem tables.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--fs-display` | Typography | Semantic | Rare, highly prominent display typography. | `calc(40 * var(--u))`; other role metadata: not yet confirmed. | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; `typography.md` | Font family remains host-provided. |
| `--fs-h1` | Typography | Semantic | Highest visual heading role in a content scope. | `calc(30 * var(--u))`; other role metadata: not yet confirmed. | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; `typography.md` | Does not determine HTML heading semantics. |
| `--fs-h2` | Typography | Semantic | Secondary visual heading role. | `calc(22 * var(--u))`; other role metadata: not yet confirmed. | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; `typography.md` | Full role composition pending. |
| `--fs-bodyl` | Typography | Semantic | Larger body-text role. | `calc(16 * var(--u))`; other role metadata: not yet confirmed. | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; `typography.md` | Full role composition pending. |
| `--fs-body` | Typography | Semantic | Regular body and UI-text role. | `calc(14 * var(--u))`; other role metadata: not yet confirmed. | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; `typography.md` | Full role composition pending. |
| `--fs-meta` | Typography | Semantic | Secondary metadata role. | `calc(13 * var(--u))`; other role metadata: not yet confirmed. | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; `typography.md` | Full role composition pending. |
| `--fs-caption` | Typography | Semantic | Short supplementary information role. | `calc(12 * var(--u))`; other role metadata: not yet confirmed. | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; `typography.md` | Full role composition pending. |
| `--fs-micro` | Typography | Semantic | Very small, bounded information role. | `calc(11 * var(--u))`; other role metadata: not yet confirmed. | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; `typography.md` | Full role composition pending. |

### Button-specific typography property evidence

The delivered Button CSS assigns `font-size: var(--fs-body)`, `font-weight: 500` and `line-height: 1.1` to the canonical Button classes. The delivered typography data identifies the Body role with Weight `400` and Letter Spacing `0`; the Button CSS itself does not declare Letter Spacing. This is direct source evidence, but it does not create a `button` Typography role or a component-specific Typography token. The complete chayns-UI role and component-token mapping remains PARTIAL.

## 9. Surface and Text Colors

All entries in this section are Semantic, density-independent Color roles. Contrast/Color-Deficiency CSS mappings for these individual roles are not directly defined in the current stylesheet; Color System governs any later resolver mapping.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--page` | Color | Semantic | Page-level background surface. | Light `#f4f6f6`; Dark `#0e171b`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |
| `--surface` | Color | Semantic | Primary content and control surface. | Light `#ffffff`; Dark `#16242a`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |
| `--surface-2` | Color | Semantic | Secondary surface. | Light `#fbfcfc`; Dark `#101b20`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |
| `--surface-alt` | Color | Semantic | Alternative neutral emphasis surface. | Light `#e9f0f2`; Dark `#263a43`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |
| `--text` | Color | Semantic | Highest-priority text. | Light `#191919`; Dark `#f3f8f8`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |
| `--text-2` | Color | Semantic | Secondary text. | Light `#3f3f3f`; Dark `#d4e0e1`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |
| `--text-3` | Color | Semantic | Tertiary supporting text. | Light `#5a6466`; Dark `#acbcc0`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |
| `--muted` | Color | Semantic | Most de-emphasized text role. | Light `#7f7f7f`; Dark `#a3b4b8`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |

## 10. Accent

Accent input is not automatically `--accent`. The resolved Accent role may be calibrated for accessibility. Components consume Semantic Accent roles; Primitive Accent levels are not a general public Component API.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--accent` | Color | Semantic | Resolved accent for primary actions and active states. | Light `#0f6d7e`; Dark `#55bfd4`. | density-independent | Light / Dark; resolver calibration allowed | CONFIRMED | DesignSystem CSS; COLOR-003–005 | Input-to-role formula is not yet confirmed. |
| `--accent-hover` | Color | Semantic | Accent hover state. | Light `#0c5b6a`; Dark `#6eccdd`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |
| `--accent-active` | Color | Semantic | Accent active/pressed state. | Light `#0a4e5b`; Dark `#3eaec4`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | — |
| `--on-accent` | Color | Semantic | Foreground content on Accent surface. | Light `#ffffff`; Dark `#0d161a`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; COLOR-004–005 | Chosen centrally, never by a component. |
| `--accent-rgb` | Color | Primitive | RGB channels of resolved Accent for defined compositing. | Light `15, 109, 126`; Dark `85, 191, 212`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Not a general Component color-selection API. |
| `--on-accent-rgb` | Color | Primitive | RGB channels of resolved On-Accent role. | Light `255, 255, 255`; Dark `14, 23, 27`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Not a general Component color-selection API. |
| `--accent-100` | Color | Primitive | Lightest documented Accent scale step. | Light `#eef7f8`; Dark `#e2f7fa`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Source primitive; not public Component API. |
| `--accent-200` | Color | Primitive | Accent scale step. | Light `#d3e7eb`; Dark `#caeff3`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | Source primitive; not public Component API. |
| `--accent-300` | Color | Primitive | Accent scale step. | Light `#a8c3ca`; Dark `#aee4ed`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | Source primitive; not public Component API. |
| `--accent-400` | Color | Primitive | Accent scale step. | Light `#629fac`; Dark `#90d8e5`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | Source primitive; not public Component API. |
| `--accent-500` | Color | Primitive | Accent scale step. | Light `#3f93a1`; Dark `#72cbdd`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | Source primitive; not public Component API. |
| `--accent-600` | Color | Primitive | Accent scale step. | Light `#278090`; Dark `#55bfd4`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | Source primitive; not public Component API. |
| `--accent-700` | Color | Primitive | Accent scale step. | Light `#0d6271`; Dark `#3eaec4`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | Source primitive; not public Component API. |
| `--accent-800` | Color | Primitive | Darkest documented Accent scale step. | Light `#0c5765`; Dark `#2f90a3`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | Source primitive; not public Component API. |

## 11. Status Colors

Danger retains the confirmed chayns-UI meaning: destructive actions, not only technically irreversible ones.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--success` | Color | Semantic | Success foreground/accent role. | Light `#039855`; Dark `#32d583`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Non-color signal still required where meaning matters. |
| `--success-bg` | Color | Semantic | Success background role. | Light `#e7f6ee`; Dark `rgba(50, 213, 131, 0.22)`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | — |
| `--warning` | Color | Semantic | Warning foreground/accent role. | Light `#dc6803`; Dark `#fdb022`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Non-color signal still required where meaning matters. |
| `--warning-bg` | Color | Semantic | Warning background role. | Light `#fef3e7`; Dark `rgba(253, 176, 34, 0.22)`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | — |
| `--danger` | Color | Semantic | Destructive/danger foreground role. | Light `#d92d20`; Dark `#f97066`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; BUTTON-004; `color-system.md` | Non-color signal still required where meaning matters. |
| `--danger-bg` | Color | Semantic | Destructive/danger background role. | Light `#fdeceb`; Dark `rgba(249, 112, 102, 0.22)`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | — |
| `--danger-bg-hover` | Color | Semantic | Hover background for documented danger usage. | Light `#f7d3cf`; Dark `rgba(249, 112, 102, 0.34)`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Does not itself define a complete danger component state model. |

## 12. Borders and Disabled

No canonical Border-Width token is present in the current DesignSystem CSS. Direct occurrences of `1px`, `1.5px` and `2px` are DesignSystem evidence only; naming and allocation remain TECH REVIEW. Border widths are confirmed density-independent by the Foundation rules.

### Button-specific property evidence

The documented Outline Button uses `1.5px solid var(--accent)`; its disabled presentation uses `1.5px solid var(--disabled-border)`. The documented Primary and Destructive button presentations use no Border. These are confirmed, density-independent Button property values, not new public Border-Width token names.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--border` | Border | Semantic | Standard boundary between surfaces or regions. | Light `#e5e9ea`; Dark `#3a4d54`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Width is a separate dimension. |
| `--border-soft` | Border | Semantic | De-emphasized boundary within a surface context. | Light `#eef1f1`; Dark `#314249`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Width is a separate dimension. |
| `--input-border` | Border | Semantic | Input/control boundary. | Light `#d3e0e4`; Dark `#476068`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Width is a separate dimension. |
| `--disabled-bg` | Color | Semantic | Disabled background surface. | Light `#cdd6d8`; Dark `#2d3f46`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | No arbitrary local disabled opacity. |
| `--disabled-fg` | Color | Semantic | Disabled foreground. | Light `#9bb0b4`; Dark `#789197`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | No arbitrary local disabled opacity. |
| `--disabled-border` | Border | Semantic | Disabled boundary. | Light `#d3e0e4`; Dark `#4a626a`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | Full component-state allocation remains TECH REVIEW. |

## 13. Focus

Focus data is split into Color, Geometry and Strength as required by the Color and Accessibility Foundations.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--focus-ring-rgb` | Color | Semantic | RGB channels used by the focus indicator. | Light `15, 109, 126`; Dark `110, 211, 230`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `color-system.md` | No component-selected focus color. |
| `--focus-ring-size` | Focus | Semantic | Focus-indicator geometry. | Light/Dark `3px`; High Contrast Light/Dark `4px`; Color Deficiency Light/Dark `3px`. | density-independent | Light / Dark / High Contrast / Color Deficiency | CONFIRMED | DesignSystem CSS; `color-system.md` | Rendering policy remains in Accessibility Foundation. |
| `--focus-ring-alpha-soft` | Focus | Semantic | Softer focus indicator strength. | Light `0.10`; Dark `0.18`; High Contrast Light `0.34`, Dark `0.42`; Color Deficiency Light `0.20`, Dark `0.28`. | density-independent | Light / Dark / High Contrast / Color Deficiency | CONFIRMED | DesignSystem CSS | — |
| `--focus-ring-alpha-strong` | Focus | Semantic | Stronger focus indicator strength. | Light `0.15`; Dark `0.26`; High Contrast Light `0.46`, Dark `0.56`; Color Deficiency Light `0.30`, Dark `0.40`. | density-independent | Light / Dark / High Contrast / Color Deficiency | CONFIRMED | DesignSystem CSS | — |

## 14. Shadows

All documented Shadow tokens are density-independent.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--shadow-card` | Shadow | Semantic | Base card elevation. | Light `0 1px 3px rgba(16, 40, 46, 0.04)`; Dark `0 1px 3px rgba(0, 0, 0, 0.3)`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS; `design-system-inventory.md` | — |
| `--shadow-hover` | Shadow | Semantic | Elevated hover state. | Light `0 16px 32px -14px rgba(16, 40, 46, 0.28)`; Dark `0 16px 32px -14px rgba(0, 0, 0, 0.5)`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | — |
| `--shadow-pop` | Shadow | Semantic | Popover/elevated overlay surface. | Light `0 16px 34px -12px rgba(16, 40, 46, 0.28)`; Dark `0 16px 34px -12px rgba(0, 0, 0, 0.55)`. | density-independent | Light / Dark | CONFIRMED | DesignSystem CSS | — |
| `--shadow-btn` | Shadow | Component-specific | Elevation assigned to documented Primary buttons. | `0 4px 12px -4px rgba(var(--accent-rgb), 0.45)`; Dark uses same mapping. | density-independent | Accent-dependent | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen” | Source assignment only; it does not define a Button API. |
| `--shadow-btn-hover` | Shadow | Component-specific | Hover elevation assigned to documented Primary and Outline buttons. | `0 8px 20px -6px rgba(var(--accent-rgb), 0.6)`; Dark uses same mapping. | density-independent | Accent-dependent | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen” | Source assignment only; it does not define a Button API. |

## 15. Z-Layers

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--z-sticky` | Z-Layer | Semantic | Sticky content layer. | `100` | density-independent | not applicable | CONFIRMED | DesignSystem CSS; `design-system-inventory.md` | — |
| `--z-popover` | Z-Layer | Semantic | Popover and dropdown layer. | `500` | density-independent | not applicable | CONFIRMED | DesignSystem CSS | — |
| `--z-drawer` | Z-Layer | Semantic | Drawer layer. | `700` | density-independent | not applicable | CONFIRMED | DesignSystem CSS | — |
| `--z-dialog` | Z-Layer | Semantic | Dialog layer. | `800` | density-independent | not applicable | CONFIRMED | DesignSystem CSS | — |
| `--z-toast` | Z-Layer | Semantic | Toast layer. | `900` | density-independent | not applicable | CONFIRMED | DesignSystem CSS | — |
| `--z-tooltip` | Z-Layer | Semantic | Tooltip layer. | `1000` | density-independent | not applicable | CONFIRMED | DesignSystem CSS | No separate backdrop token is confirmed. |

## 16. Icon and Avatar Geometry

The direct values are confirmed. Local size variants and global Density remain separate; no S/M/L-to-local-size mapping is inferred.

| Token | Category | Level | Semantic responsibility | Value / mapping | Density | Variants / modes | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|---|
| `--icon` | Icon Geometry | Primitive | Standard documented icon geometry. | `calc(16 * var(--u))` | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; ICON-001–003 | Local icon-variant contract remains DESIGN REVIEW. |
| `--icon-lg` | Icon Geometry | Primitive | Larger documented icon geometry. | `calc(19 * var(--u))` | density-dependent | S / M / L | PARTIAL | DesignSystem CSS | Does not create a general icon-size API. |
| `--avatar` | Avatar Geometry | Component-specific | Documented default avatar geometry. | `calc(42 * var(--u))` | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; DENSITY-005–006 | Relation to local Avatar variants is not confirmed. |
| `--avatar-sm` | Avatar Geometry | Component-specific | Documented smaller avatar geometry. | `calc(34 * var(--u))` | density-dependent | S / M / L | PARTIAL | DesignSystem CSS; DENSITY-005–006 | Relation to local Avatar variants is not confirmed. |

## 17. Motion

The currently delivered DesignSystem HTML directly exposes the following Motion source data: Micro `120–160 ms` for hover/color changes, icon swap and row highlighting; Kurz `200–240 ms` for Dialog, Popover and Menu; Mittel `260–300 ms` for Drawer, Toast and Scrim; Lang `550–600 ms` for initial page reveal. It also exposes Eintritt `cubic-bezier(.22, .61, .36, 1)`, Austritt `cubic-bezier(.4, 0, .7, .2)` and Konstant `linear` for Spinner/Skeleton.

Those labels and values are authoritative DesignSystem property evidence, but no canonical CSS custom-property identities or chayns-UI public Motion-token contract are exposed. The Button CSS uses several transition declarations rather than one documented semantic Button mapping; some source properties are outside the confirmed chayns-UI Motion property guardrail. Therefore no Button Motion token or Button Motion rule is introduced here. The confirmed rules `transform`, `opacity` and the limited `grid-template-rows` exception remain in [motion.md](motion.md); public Duration/Easing token identities and component mapping remain TECH REVIEW.

## 18. Other DesignSystem Source Tokens

The current CSS also declares `--toggle-bg` and `--hover` with Light/Dark values. They are direct DesignSystem source data, but no specialized chayns-UI Foundation currently confirms their public semantic contract. They are therefore **DesignSystem source data – not chayns UI public token contract** (TECH REVIEW), not entries that Components may freely consume.

Other CSS variables are likewise source-only unless a later Foundation confirms them: `--hero-grad-a`, `--hero-grad-b`, `--hero-grad-c`, `--accent-rail-fg`, `--accent-rail-active-bg`, `--accent-rail-active-fg`, `--ai-tint`, `--tint` and `--hover-shift`.

## 19. Legacy / Source-only Tokens

The external `k` scale is source data and not a parallel public chayns-UI Spacing API:

```text
--k2, --k3, --k4, --k5, --k6, --k7, --k8, --k9, --k10,
--k10_5, --k11, --k11_5, --k12, --k12_5, --k13, --k13_5,
--k14, --k14_5, --k15, --k16, --k17, --k18, --k20, --k22,
--k24, --k26, --k28, --k30, --k32, --k34, --k36, --k38, --k40,
--k42, --k44, --k48, --k52, --k56, --k64, --k120
```

Each is directly mapped in DesignSystem CSS as `calc(<documented number> * var(--u))`. They are **DesignSystem source data – not chayns UI public token contract**. General chayns-UI spacing remains `--sp-*`.

## 20. Token Completeness Matrix

| Category | Names complete | Values complete | Density mapping complete | Mode mapping complete | Ready for component specs |
|---|---|---|---|---|---|
| Spacing | yes | yes | partial | not applicable | yes |
| Radius | no | partial | yes | not applicable | no |
| Typography | yes | partial | partial | not applicable | partial |
| Surface/Text Colors | yes | yes | yes | partial | yes |
| Accent | yes | yes | yes | partial | partial |
| Status Colors | yes | yes | yes | partial | partial |
| Borders | partial | partial | yes | partial | partial |
| Disabled | yes | yes | yes | partial | partial |
| Focus | yes | yes | yes | yes | partial |
| Shadows | yes | yes | yes | yes | yes |
| Z-Layers | yes | yes | yes | not applicable | yes |
| Motion | no | no | yes | partial | no |
| Control Geometry | yes | yes | partial | not applicable | partial |
| Icon Geometry | yes | yes | partial | not applicable | partial |
| Avatar Geometry | yes | yes | partial | not applicable | partial |

`Ready for component specs` only means that a Specification can refer to the category without inventing a value. It does not make a Component implementation-ready.

## Button-relevant token readiness

| Foundation dependency | Readiness | Reason |
|---|---|---|
| spacing / padding | sufficient | `--btn-py` and `--btn-px` have confirmed direct Button assignments and S/M/L mappings. |
| control geometry | sufficient | `--ctrl-h` has a confirmed Icon Button assignment and S/M/L mapping. |
| typography | partial | Button-specific source properties are evidenced, but the chayns-UI Typography role/component-token mapping remains incomplete. |
| radius | sufficient | Direct Button property evidence confirms density-independent Pill/MD/SM values without creating public Radius tokens. |
| border | sufficient | Direct Button property evidence confirms Outline/disabled Outline width and colors; no public Width token is created. |
| colors | sufficient | Accent, surface, danger and text roles with Light/Dark values are catalogued. |
| hover | sufficient | Accent hover and documented button shadow-hover roles are catalogued; complete state Specification remains separate. |
| active | sufficient | Accent active role is catalogued. |
| disabled | sufficient | Documented Button states directly assign the confirmed Disabled roles. |
| focus | partial | Focus values are confirmed; the chayns-UI Button rendering mapping remains TECH REVIEW. |
| shadow | sufficient | `--shadow-btn` and `--shadow-btn-hover` have confirmed direct Button assignments. |
| icon geometry | sufficient | A basic Button does not require a local Icon variant; its normal geometry has a confirmed S/M/L mapping. |
| motion | partial | Density is not a concern; public Motion-token and Button-state mapping remain TECH REVIEW. |
| density | sufficient | All Button-relevant density-dependent values now have direct S/M/L mappings or are confirmed density-independent. |

### Milestone 1 Button transfer resolution — 2026-08-21

For the Milestone 1 Button and IconButton only, the remaining technical transfer is resolved as follows:

* Typography uses the directly evidenced `--fs-body`, `font-weight: 500` and unitless `line-height: 1.1`. No Button letter-spacing is introduced.
* Standard Button radius is the directly evidenced Pill value `999px`. MD and SM do not become public Button props in Milestone 1.
* Internal content gap uses public `--sp-2`, which has the same confirmed `calc(8 * var(--u))` mapping as source-only `--k8`. Ghost inline padding uses public `--sp-4`, which has the same confirmed `calc(16 * var(--u))` mapping as source-only `--k16`.
* Focus uses `--focus-ring-size` and the full resolved `--focus-ring-rgb` color as a `:focus-visible` ring. The soft/strong alpha values remain available foundation evidence but are not used for Button because the partially transparent reference ring does not meet the required non-text contrast in every supported reference combination.
* State changes are immediate. Active uses directly evidenced `transform` property values (`scale(.97)` for Button and `scale(.9)` for IconButton) without a transition. No duration, easing or Motion token is introduced.
* The shipped resolved reference theme calibrates Danger foreground to the already evidenced High Contrast values (`#a31919` light, `#ffb3ae` dark) because the literal standard source pair is below 4.5:1 for 14px Button text. Color-Deficiency hover receives the evidenced resolver result `#f2d7e7` in light mode and retains the non-hover alpha in dark mode so text contrast remains at least 4.5:1. This is a resolved-reference accessibility correction under COLOR-004–005, not a general Theme Resolver.

The resulting Button-relevant foundation status is **sufficient for the Milestone 1 Button specification**. This does not close the remaining general Typography, Motion, Radius, Theme Resolver or non-Button token work.

## Remaining Token Catalogue Gaps

| Area | Missing information | Classification | Source needed | Blocks which later work? |
|---|---|---|---|---|
| Radius | Canonical token names, complete values and component mapping beyond the directly evidenced Button properties. | TECH REVIEW | Authoritative DesignSystem token export or approved chayns mapping. | Radius-dependent Component Specifications outside the confirmed Button evidence. |
| Typography | Canonical Weight, Line Height and Letter Spacing for every role and the chayns component-token mapping. | TECH REVIEW | Authoritative DesignSystem role data and approved chayns mapping. | Full Typography use in Component Specifications. |
| Motion | Public token identities and semantic component mappings; DesignSystem stage values are now directly evidenced. | TECH REVIEW | Approved chayns Motion-token mapping. | Motion-dependent Component Specifications. |
| Borders | Canonical Border-Width tokens and semantic allocation beyond directly evidenced Button properties. | TECH REVIEW | DesignSystem token data and approved chayns mapping. | Precise Component Specifications outside the confirmed Button evidence. |
| Accessibility color modes | Complete Contrast/Color-Deficiency mappings beyond Focus. | TECH REVIEW | Theme/token source or approved resolver specification. | Full multi-mode Color verification. |
| Component-specific allocation | Approved catalog and use of non-Button geometry/shadow tokens by Components. Button assignments for `--btn-py`, `--btn-px`, `--ctrl-h`, `--shadow-btn` and `--shadow-btn-hover` are confirmed. | TECH REVIEW | Component Specifications and Token Catalogue follow-up. | Component implementation readiness outside the confirmed Button subset. |
| Local icon/avatar variants | Explicit local variant contract and its relation to Density. | DESIGN REVIEW | DesignSystem and Component decisions. | Icon/Avatar Specifications. |
| Density Matrix | Complete S/M/L output mapping per density-dependent token. | TECH REVIEW | Next Density Matrix document. | Density-complete Component Specifications. |
| Token source and build | Machine-readable source, generation and validation. | OPEN | OPEN-006. | Runtime token implementation, not this catalogue. |

## Handoff to Density Matrix

### Confirmed density-dependent

`--sp-1` through `--sp-6`; `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-bodyl`, `--fs-body`, `--fs-meta`, `--fs-caption`, `--fs-micro`; `--btn-py`, `--btn-px`, `--input-py`, `--input-px`, `--row-py`, `--row-px`, `--ctrl-h`; `--icon`, `--icon-lg`; `--avatar`, `--avatar-sm`.

### Confirmed density-independent

All catalogued Color, Border, Disabled, Focus, Shadow and Z-Layer tokens; Radius principles; Motion rules and values when later catalogued.

### Density relation pending

The complete effective S/M/L value matrix and any final Component-specific allocation. `--sf` and the direct `calc(... * var(--u))` mappings are confirmed source data, but no additional values are calculated here.

## 21. Decision Register Follow-ups

* TOKEN-001 and TOKEN-002 can reference this catalogue for confirmed names and values.
* TOKEN-006 remains TECH REVIEW: this catalogue is a documented inventory, not the final technical token source.
* DENSITY-001–006 can reference the Density Matrix handoff; complete component mappings remain TECH REVIEW.
* COLOR-001–005, TYPE-004, MOTION-001–007 and A11Y-001–006 can reference the catalogued Foundation data where applicable.
* OPEN-006 remains the technical token-source/build decision. No new Decision-Register follow-up is required from this inventory alone.

## 22. Relationship to Future Technical Token Source

`token-catalogue.md` is not automatically the future technical token source format. Source-file format, generation, validation, CSS creation and possible TypeScript or metadata artifacts remain separately decided work. Until then, this document is the traceable factual inventory.

## 23. AI Rules

Agents may reference CONFIRMED Catalogue entries and, once implementation is authorized, use their directly documented values. Agents must not treat PARTIAL as complete, replace `not yet confirmed`, interpolate scales, expose Legacy/source-only variables as public chayns-UI API, invent related token names, derive Density outputs merely from `--sf`, or create a missing Component-specific token for implementation convenience.

When a required Foundation information is not confirmed, the Component Implementation Readiness Gate applies.
