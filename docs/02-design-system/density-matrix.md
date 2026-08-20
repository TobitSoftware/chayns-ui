# chayns UI – Density Matrix

## Purpose

Die Density Matrix ist die konkrete Zuordnungsschicht zwischen dem normativen Density-Modell und dem Token Catalogue. Sie beantwortet nicht: „Wie könnten wir Density technisch implementieren?“, sondern: „Welche bestätigten Designwerte beziehungsweise Token-Mappings gelten bei S, M und L?“

Sie ist Foundation-Spezifikation und Input für spätere Component Specifications. Sie implementiert weder ein Density-System noch eine Runtime-Regel.

## 2. Density Baseline

| Density | Confirmed factor | Default |
|---|---|---|
| S | `--sf = 0.9` | no |
| M | `--sf = 1` | yes |
| L | `--sf = 1.125` | no |

`--sf` ist ein bestätigter DesignSystem-Density-Faktor. Seine Existenz bedeutet nicht, dass chayns UI beliebige Tokenwerte durch Multiplikation selbst erzeugen darf. Konkrete S/M/L-Werte gelten nur dann als bestätigt, wenn ihre tatsächliche CSS-Verwendung oder Berechnung in einer autoritativen Quelle direkt belegt ist.

### Direct CSS mapping notation

Die Matrix verwendet für direkt belegte density-dependent CSS-Mappings die folgende Quellnotation; sie ist kein neuer Token und keine selbst berechnete Pixelzahl:

* `S[n]` = `calc(n * var(--u))` unter `.size-s`, wobei die Quelle `--sf: 0.9` definiert.
* `M[n]` = `calc(n * var(--u))` unter `.size-m`, wobei die Quelle `--sf: 1` definiert.
* `L[n]` = `calc(n * var(--u))` unter `.size-l`, wobei die Quelle `--sf: 1.125` definiert.

Die DesignSystem-CSS definiert zugleich `--u: calc(1px * var(--sf))`. Die Notation hält diese direkt ausgelieferte Beziehung fest; sie leitet keine darüber hinausgehenden Werte ab.

## 3. Terminology

### Global density

Die systemweite Dichte S, M oder L.

### Local size variant

Eine komponentenspezifische Größenwahl innerhalb derselben globalen Density. Global Density und Local Size Variant sind orthogonale Dimensionen.

### Density-dependent

Ein Token oder Designwert verändert sich bestätigt aufgrund globaler Density.

### Density-independent

Ein Token oder Designwert bleibt bestätigt über S/M/L gleich.

### Density relation pending

Es ist nicht ausreichend bestätigt, ob oder wie sich der Wert über S/M/L verändert.

Ein Agent nimmt niemals `Density S = lokale Small-Variante`, `Density M = lokale Default-Variante` oder `Density L = lokale Large-Variante` an.

## 4. Matrix Status Model

### CONFIRMED

Density-Verhalten ist eindeutig bestätigt; für Tokens trägt der Catalogue-Status den Eintrag, für tokenlose Werte liegt direkte, dokumentierte Property-Evidence vor.

### PARTIAL

Grundbeziehung ist bekannt, aber mindestens ein für die spätere Component-Nutzung relevantes Mapping oder eine Zuordnung fehlt.

### TECH REVIEW

Die Designabsicht ist klar, aber Extraktion oder technische Zuordnung aus der Quelle ist nicht abgeschlossen.

### DESIGN REVIEW

Eine tatsächliche Designentscheidung fehlt.

## 5. Main Density Matrix

This table summarizes the detailed matrices below. `same across S/M/L; catalogue value` means the concrete value remains in [token-catalogue.md](token-catalogue.md) and is not duplicated here.

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--sf` | Density | `0.9` | `1` | `1.125` | density-dependent | CONFIRMED | DesignSystem CSS; DENSITY-001–003 | Density factor itself. |
| `--sp-1` … `--sp-6` | Spacing | direct CSS mappings | direct CSS mappings | direct CSS mappings | density-dependent | CONFIRMED | DesignSystem CSS; TOKEN-003 | Detailed per-token mapping in Spacing Matrix. |
| `--btn-py`, `--btn-px`, `--ctrl-h` | Button Geometry / Component-specific | direct CSS mappings | direct CSS mappings | direct CSS mappings | density-dependent | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen”; token catalogue | Confirmed Button assignments; no Button API or local size variant follows. |
| `--input-py`, `--input-px`, `--row-py`, `--row-px` | Control Geometry / Component-specific | direct CSS mappings | direct CSS mappings | direct CSS mappings | density-dependent | PARTIAL | DesignSystem CSS; token catalogue | Non-Button Component allocation remains partial. |
| `--fs-display` … `--fs-micro` Font Size | Typography | direct CSS mappings | direct CSS mappings | direct CSS mappings | density-dependent | PARTIAL | DesignSystem CSS; `typography.md` | Only Font Size mapping is confirmed. |
| Typography Weight, Line Height, Letter Spacing | Typography | not yet confirmed | not yet confirmed | not yet confirmed | density relation pending | TECH REVIEW | `typography.md`; DesignSystem bound data | No canonical role metadata mapping. |
| Radius scale | Radius | same across S/M/L; value pending | same across S/M/L; value pending | same across S/M/L; value pending | density-independent | TECH REVIEW | `design-foundations.md`; `token-catalogue.md` | Principles confirmed; token identities/values pending. |
| Button Radius property evidence | Radius | Pill `999px`, MD `10px`, SM `6px` | Pill `999px`, MD `10px`, SM `6px` | Pill `999px`, MD `10px`, SM `6px` | density-independent | CONFIRMED | DesignSystem HTML “Buttons & Aktionen” | Direct property evidence; not a new public Radius token or Button API. |
| `--border`, `--border-soft`, `--input-border` | Border Color | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; `color-system.md` | Color modes are separate. |
| Border widths | Border Width | same across S/M/L; value pending | same across S/M/L; value pending | same across S/M/L; value pending | density-independent | TECH REVIEW | `design-foundations.md`; `token-catalogue.md` | CSS evidence exists, no canonical token identity. |
| Button Border property evidence | Border Width | `none` for Primary/Destructive; `1.5px` for Outline | `none` for Primary/Destructive; `1.5px` for Outline | `none` for Primary/Destructive; `1.5px` for Outline | density-independent | CONFIRMED | DesignSystem HTML “Buttons & Aktionen” | Disabled Outline uses the same `1.5px` with `--disabled-border`; no public Width token is introduced. |
| Surface/Text, Accent, Status, Disabled and Focus Color tokens | Color | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | `color-system.md`; DesignSystem CSS | Light/Dark/Accessibility modes are separate axes. |
| `--focus-ring-size`, `--focus-ring-alpha-soft`, `--focus-ring-alpha-strong` | Focus Geometry | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; `accessibility.md` | High Contrast is not Density. |
| `--shadow-card`, `--shadow-hover`, `--shadow-pop` | Shadow | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; `token-catalogue.md` | Light/Dark is not Density. |
| `--shadow-btn`, `--shadow-btn-hover` | Shadow | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen”; token catalogue | Confirmed Primary/Outline Button assignments. |
| `--z-sticky` … `--z-tooltip` | Z-Layer | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS | No Density-specific layer values. |
| Motion Duration / Easing | Motion | same source stages across S/M/L; public mapping pending | same source stages across S/M/L; public mapping pending | same source stages across S/M/L; public mapping pending | density-independent | TECH REVIEW | `density.md`; `motion.md`; DesignSystem HTML “Motion & Animation” | Stages/curves are directly evidenced; public token identities and Button-state mapping are not. |
| `--icon`, `--icon-lg` | Icon Geometry | direct CSS mappings | direct CSS mappings | direct CSS mappings | density-dependent | PARTIAL | DesignSystem CSS; DENSITY-005–006 | Local Icon variants remain separate. |
| `--avatar`, `--avatar-sm` | Avatar Geometry | direct CSS mappings | direct CSS mappings | direct CSS mappings | density-dependent | PARTIAL | DesignSystem CSS; DENSITY-005–006 | Local Avatar variants remain separate. |

## 6. Spacing Matrix

The `k` scale is DesignSystem source-only data. This matrix only records the confirmed public chayns-UI general Spacing tokens.

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--sp-1` | Spacing | `S[4]` | `M[4]` | `L[4]` | density-dependent | CONFIRMED | DesignSystem CSS; TOKEN-003 | Direct CSS mapping, not calculated here. |
| `--sp-2` | Spacing | `S[8]` | `M[8]` | `L[8]` | density-dependent | CONFIRMED | DesignSystem CSS; TOKEN-003 | Direct CSS mapping, not calculated here. |
| `--sp-3` | Spacing | `S[12]` | `M[12]` | `L[12]` | density-dependent | CONFIRMED | DesignSystem CSS; TOKEN-003 | Direct CSS mapping, not calculated here. |
| `--sp-4` | Spacing | `S[16]` | `M[16]` | `L[16]` | density-dependent | CONFIRMED | DesignSystem CSS; TOKEN-003 | Direct CSS mapping, not calculated here. |
| `--sp-5` | Spacing | `S[20]` | `M[20]` | `L[20]` | density-dependent | CONFIRMED | DesignSystem CSS; TOKEN-003 | Direct CSS mapping, not calculated here. |
| `--sp-6` | Spacing | `S[24]` | `M[24]` | `L[24]` | density-dependent | CONFIRMED | DesignSystem CSS; TOKEN-003 | Direct CSS mapping, not calculated here. |

## 7. Control Geometry Matrix

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--ctrl-h` | Control Geometry | `S[42]` | `M[42]` | `L[42]` | density-dependent | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen” | Assigned to documented Icon Buttons; no general Button size API follows. |
| `--btn-py` | Component-specific Padding | `S[11]` | `M[11]` | `L[11]` | density-dependent | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen”; TOKEN-004 | Assigned to documented Primary, Outline and Destructive Buttons. |
| `--btn-px` | Component-specific Padding | `S[22]` | `M[22]` | `L[22]` | density-dependent | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen” | Assigned to documented Primary, Outline and Destructive Buttons. |
| `--input-py` | Component-specific Padding | `S[13]` | `M[13]` | `L[13]` | density-dependent | PARTIAL | DesignSystem CSS | Form-control composition remains review work. |
| `--input-px` | Component-specific Padding | `S[16]` | `M[16]` | `L[16]` | density-dependent | PARTIAL | DesignSystem CSS | Form-control composition remains review work. |
| `--row-py` | Component-specific Padding | `S[12]` | `M[12]` | `L[12]` | density-dependent | PARTIAL | DesignSystem CSS | No general row contract yet. |
| `--row-px` | Component-specific Padding | `S[15]` | `M[15]` | `L[15]` | density-dependent | PARTIAL | DesignSystem CSS | No general row contract yet. |

## 8. Typography Density Matrix

### Font Size

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--fs-display` | Typography / Font Size | `S[40]` | `M[40]` | `L[40]` | density-dependent | PARTIAL | DesignSystem CSS; `typography.md` | Full role metadata pending. |
| `--fs-h1` | Typography / Font Size | `S[30]` | `M[30]` | `L[30]` | density-dependent | PARTIAL | DesignSystem CSS; `typography.md` | Full role metadata pending. |
| `--fs-h2` | Typography / Font Size | `S[22]` | `M[22]` | `L[22]` | density-dependent | PARTIAL | DesignSystem CSS; `typography.md` | Full role metadata pending. |
| `--fs-bodyl` | Typography / Font Size | `S[16]` | `M[16]` | `L[16]` | density-dependent | PARTIAL | DesignSystem CSS; `typography.md` | Full role metadata pending. |
| `--fs-body` | Typography / Font Size | `S[14]` | `M[14]` | `L[14]` | density-dependent | PARTIAL | DesignSystem CSS; `typography.md` | Full role metadata pending. |
| `--fs-meta` | Typography / Font Size | `S[13]` | `M[13]` | `L[13]` | density-dependent | PARTIAL | DesignSystem CSS; `typography.md` | Full role metadata pending. |
| `--fs-caption` | Typography / Font Size | `S[12]` | `M[12]` | `L[12]` | density-dependent | PARTIAL | DesignSystem CSS; `typography.md` | Full role metadata pending. |
| `--fs-micro` | Typography / Font Size | `S[11]` | `M[11]` | `L[11]` | density-dependent | PARTIAL | DesignSystem CSS; `typography.md` | Full role metadata pending. |

### Other role properties

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| Typography Font Weight | Typography | not yet confirmed | not yet confirmed | not yet confirmed | density relation pending | TECH REVIEW | `typography.md` | Role-level canonical mapping not extractable with confidence. |
| Typography Line Height | Typography | not yet confirmed | not yet confirmed | not yet confirmed | density relation pending | TECH REVIEW | `typography.md` | Role-level canonical mapping not extractable with confidence. |
| Typography Letter Spacing | Typography | not yet confirmed | not yet confirmed | not yet confirmed | density relation pending | TECH REVIEW | `typography.md` | Role-level canonical mapping not extractable with confidence. |

### Button-specific typography property evidence

| Token / property | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| Button font-size via `--fs-body` | Typography / Font Size | `S[14]` | `M[14]` | `L[14]` | density-dependent | PARTIAL | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen” | Direct Button assignment; complete chayns role mapping remains PARTIAL. |
| Button `font-weight: 500` | Typography / Weight | `500` | `500` | `500` | density-independent | CONFIRMED | DesignSystem CSS | Direct Button property evidence, not a new Typography token. |
| Button `line-height: 1.1` | Typography / Line Height | `1.1` | `1.1` | `1.1` | density-independent | CONFIRMED | DesignSystem CSS | Direct Button property evidence, not a new Typography token. |
| Button Letter Spacing | Typography / Letter Spacing | not yet confirmed | not yet confirmed | not yet confirmed | density relation pending | TECH REVIEW | DesignSystem CSS; `typography.md` | Button CSS does not declare Letter Spacing; no component mapping is inferred. |

## 9. Radius

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| Global Radius scale | Radius | same across S/M/L; value pending | same across S/M/L; value pending | same across S/M/L; value pending | density-independent | TECH REVIEW | `design-foundations.md`; `token-catalogue.md` | Pill, MD and SM are DesignSystem evidence; chayns token identities remain unconfirmed. |

## 10. Borders

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--border` | Border Color | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; `color-system.md` | Color Mode is separate. |
| `--border-soft` | Border Color | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; `color-system.md` | Color Mode is separate. |
| `--input-border` | Border Color | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; `color-system.md` | Color Mode is separate. |
| Canonical Border Width tokens | Border Width | same across S/M/L; value pending | same across S/M/L; value pending | same across S/M/L; value pending | density-independent | TECH REVIEW | `token-catalogue.md`; `design-foundations.md` | No token names are created from raw CSS widths. |

## 11. Colors

All catalogued Color roles are density-independent: Surface/Text (`--page`, `--surface`, `--surface-2`, `--surface-alt`, `--text`, `--text-2`, `--text-3`, `--muted`); Accent semantic and primitive roles; Status roles; Disabled roles; and `--focus-ring-rgb`.

Their Light/Dark values and any Contrast/Color-Deficiency values are separate mode axes. Density-independent never means mode-independent. The complete color values remain in [token-catalogue.md](token-catalogue.md) and are not duplicated here.

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| Surface / Text Colors | Color | same across S/M/L; catalogue values | same across S/M/L; catalogue values | same across S/M/L; catalogue values | density-independent | CONFIRMED | `color-system.md`; token catalogue | Light/Dark is separate. |
| Accent semantic and primitive Colors | Color | same across S/M/L; catalogue values | same across S/M/L; catalogue values | same across S/M/L; catalogue values | density-independent | CONFIRMED | COLOR-001–005; token catalogue | Resolver calibration is separate. |
| Status Colors | Color | same across S/M/L; catalogue values | same across S/M/L; catalogue values | same across S/M/L; catalogue values | density-independent | CONFIRMED | `color-system.md`; token catalogue | Non-color status signal still required. |
| Disabled Colors | Color | same across S/M/L; catalogue values | same across S/M/L; catalogue values | same across S/M/L; catalogue values | density-independent | CONFIRMED | `color-system.md`; token catalogue | Component allocation remains separate. |
| Focus Color | Color | same across S/M/L; catalogue values | same across S/M/L; catalogue values | same across S/M/L; catalogue values | density-independent | CONFIRMED | `color-system.md`; token catalogue | Accessibility modes are separate. |

## 12. Focus Geometry

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--focus-ring-size` | Focus Geometry | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; `accessibility.md` | High Contrast value differs; that is not Density. |
| `--focus-ring-alpha-soft` | Focus Strength | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; `accessibility.md` | High Contrast/Color Deficiency are not Density. |
| `--focus-ring-alpha-strong` | Focus Strength | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; `accessibility.md` | High Contrast/Color Deficiency are not Density. |

## 13. Shadows

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--shadow-card` | Shadow | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; token catalogue | Light/Dark is separate. |
| `--shadow-hover` | Shadow | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; token catalogue | Light/Dark is separate. |
| `--shadow-pop` | Shadow | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; token catalogue | Light/Dark is separate. |
| `--shadow-btn` | Shadow | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen”; token catalogue | Assigned to documented Primary Buttons. |
| `--shadow-btn-hover` | Shadow | same across S/M/L; catalogue value | same across S/M/L; catalogue value | same across S/M/L; catalogue value | density-independent | CONFIRMED | DesignSystem CSS; DesignSystem HTML “Buttons & Aktionen”; token catalogue | Assigned to documented Primary and Outline hover states. |

## 14. Z-Layers

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--z-sticky` | Z-Layer | `100` | `100` | `100` | density-independent | CONFIRMED | DesignSystem CSS | — |
| `--z-popover` | Z-Layer | `500` | `500` | `500` | density-independent | CONFIRMED | DesignSystem CSS | — |
| `--z-drawer` | Z-Layer | `700` | `700` | `700` | density-independent | CONFIRMED | DesignSystem CSS | — |
| `--z-dialog` | Z-Layer | `800` | `800` | `800` | density-independent | CONFIRMED | DesignSystem CSS | — |
| `--z-toast` | Z-Layer | `900` | `900` | `900` | density-independent | CONFIRMED | DesignSystem CSS | — |
| `--z-tooltip` | Z-Layer | `1000` | `1000` | `1000` | density-independent | CONFIRMED | DesignSystem CSS | — |

## 15. Motion

Motion Duration and Easing do not scale with Density. Reduced Motion is an Accessibility axis, not a Density stage. The current catalogue has no reliable Duration/Easing token identities or values.

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| Motion Duration | Motion | same across S/M/L; value pending | same across S/M/L; value pending | same across S/M/L; value pending | density-independent | TECH REVIEW | `density.md`; `motion.md` | No confirmed token identity/value. |
| Motion Easing | Motion | same across S/M/L; value pending | same across S/M/L; value pending | same across S/M/L; value pending | density-independent | TECH REVIEW | `density.md`; `motion.md` | No confirmed token identity/value. |

## 16. Icon Geometry

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--icon` | Icon Geometry | `S[16]` | `M[16]` | `L[16]` | density-dependent | PARTIAL | DesignSystem CSS; token catalogue | No local-size-variant mapping is inferred. |
| `--icon-lg` | Icon Geometry | `S[19]` | `M[19]` | `L[19]` | density-dependent | PARTIAL | DesignSystem CSS; token catalogue | Not automatically a Density L token. |

## 17. Avatar Geometry

| Token / group | Category | S | M | L | Density relation | Status | Source | Notes |
|---|---|---|---|---|---|---|---|---|
| `--avatar` | Avatar Geometry | `S[42]` | `M[42]` | `L[42]` | density-dependent | PARTIAL | DesignSystem CSS; token catalogue | Relationship to local Avatar variants is pending. |
| `--avatar-sm` | Avatar Geometry | `S[34]` | `M[34]` | `L[34]` | density-dependent | PARTIAL | DesignSystem CSS; token catalogue | Not automatically a Density S token. |

## 18. Density-independent Foundation Summary

| Foundation group | Density relationship | Notes |
|---|---|---|
| Radius | density-independent | Concrete token identities and values remain TECH REVIEW. |
| Colors | density-independent | Light/Dark/Contrast/Color-Deficiency are separate axes. |
| Border Color and Width | density-independent | Canonical Width tokens remain TECH REVIEW. |
| Focus Color and Geometry | density-independent | Accessibility modes may alter Focus; Density does not. |
| Shadows | density-independent | Light/Dark differences are separate. |
| Z-Layers | density-independent | Confirmed numeric values are invariant. |
| Motion Duration and Easing | density-independent | Token identities/values remain TECH REVIEW. |

## 19. Density-dependent Foundation Summary

| Foundation group | Density relationship | Notes |
|---|---|---|
| General Spacing | density-dependent | `--sp-1` through `--sp-6` have direct CSS mappings. |
| Control Geometry | density-dependent | Button allocation of `--ctrl-h` is confirmed; non-Button allocation remains PARTIAL. |
| Component-specific Padding | density-dependent | Button padding allocation is confirmed; Input and Row allocation remain PARTIAL. |
| Typography Font Size | density-dependent | Eight documented size roles have direct CSS mappings. |
| Icon Geometry | density-dependent | Does not define a local Icon variant API. |
| Avatar Geometry | density-dependent | Does not define a local Avatar variant API. |

## 20. Density Relations Requiring Review

| Area | Token / property | What is known | What is missing | Classification | Blocks |
|---|---|---|---|---|---|
| Typography | Font Weight, Line Height, Letter Spacing | Button Weight and Line Height are direct property evidence; global role mapping remains incomplete. | Canonical role metadata, Button Letter Spacing and chayns component-token mapping. | TECH REVIEW | Full Button and other Typography Specifications. |
| Radius | Global Radius scale | Density-independent principle and direct Button radius properties are confirmed. | Public token names, complete scale and mapping beyond Button property evidence. | TECH REVIEW | Radius-dependent Component Specifications outside the confirmed Button subset. |
| Borders | Canonical Border Widths | Density-independent principle and direct Button Border properties are confirmed. | Token identity and semantic allocation beyond Button property evidence. | TECH REVIEW | Precise Component Specifications outside the confirmed Button subset. |
| Motion | Duration and Easing | Density-independent principle and source stages/curves are directly evidenced. | Public token identities and Button-state mapping within the chayns Motion guardrail. | TECH REVIEW | Motion-dependent Button and other Component Specifications. |
| Component allocation | Geometry and Shadow tokens | Button assignments for `--btn-py`, `--btn-px`, `--ctrl-h`, `--shadow-btn` and `--shadow-btn-hover` are confirmed. | Approved non-Button Component allocation and API allocation. | TECH REVIEW | Component implementation readiness outside the confirmed Button subset. |
| Icon / Avatar | Local Size Variants | Geometry tokens are Density-dependent. | Explicit local-variant contract independent of Density. | DESIGN REVIEW | Icon/Avatar Specifications. |
| Nested Density Contexts | Local density scopes | Global Density is confirmed. | Whether nested/local Density contexts are a supported feature. | OPEN (existing `density.md`) | Any Component proposing local Density override. |

## 21. Global Density vs. Local Size Variants

Eine Component Specification definiert lokale Größenvarianten unabhängig von globaler Density. `Button size` und globale Density wären zwei getrennte Inputs, falls eine Button-Size-Variant später ausdrücklich bestätigt würde. Das bedeutet nicht, dass ein Button eine öffentliche `size`-Prop erhalten muss.

Folgende Ableitungen sind verboten:

* `sm` → Density S,
* `md` → Density M,
* `lg` → Density L,
* `--icon-lg` → nur in Density L,
* `--avatar-sm` → nur in Density S.

Ein Agent leitet aus dieser Foundation-Regel keine lokale Component API ab.

## 22. Component Specification Consumption Rules

Eine spätere Component Specification muss:

1. alle verwendeten density-dependent Tokens identifizieren,
2. angeben, ob deren konkrete S/M/L-Mappings bestätigt sind,
3. lokale Size Variants getrennt dokumentieren,
4. keine eigenen Density-Multiplikatoren erfinden,
5. keine lokalen Ersatzwerte einführen, wenn Foundation-Werte fehlen.

Ist ein erforderlicher Density-Wert `not yet confirmed` oder nur PARTIAL, ist das nicht automatisch ausreichend. Das Component Implementation Readiness Gate wird angewandt.

## 23. Button Density Readiness

| Foundation dependency | Density readiness | Full component-spec relevance | Blocker classification | Reason |
|---|---|---|---|---|
| horizontal padding | sufficient | sufficient for documented Primary, Outline and Destructive evidence | none | `--btn-px` has direct S/M/L mappings and confirmed Button assignment. Ghost is not inferred from this assignment. |
| vertical padding | sufficient | sufficient for documented Primary, Outline and Destructive evidence | none | `--btn-py` has direct S/M/L mappings and confirmed Button assignment. |
| control height | sufficient | sufficient for the documented Icon Button evidence | none | `--ctrl-h` has direct S/M/L mappings and a confirmed Icon Button assignment. |
| typography | sufficient | partial | TECH REVIEW — non-density component-spec dependency | `--fs-body` maps across S/M/L; Button Weight and Line Height are directly evidenced. Letter Spacing and the chayns component-token mapping remain unresolved. |
| radius | sufficient | sufficient for documented Button property evidence | none | Pill `999px` is the documented default; MD `10px` and SM `6px` are density-independent documented properties. No public Radius token or Button API is created. |
| border width | sufficient | sufficient for documented Primary, Outline and Destructive evidence | none | Primary/Destructive have no Border; Outline and disabled Outline use direct `1.5px` property evidence, invariant across S/M/L. |
| colors | sufficient | partial | TECH REVIEW — non-density component-spec dependency | Color roles are density-independent. Complete Contrast/Color-Deficiency mapping for Button states remains separate Foundation work. |
| focus geometry | sufficient | partial | TECH REVIEW — non-density component-spec dependency | Confirmed Focus geometry and Color are density-independent. The Button-specific semantic Focus rendering mapping is not yet confirmed. |
| shadow | sufficient | sufficient for documented Primary/Outline evidence | none | `--shadow-btn` and `--shadow-btn-hover` are confirmed density-independent Button assignments. |
| motion | sufficient | partial | TECH REVIEW — non-density component-spec dependency | Motion is density-independent. Direct source stages/curves exist, but no public chayns Motion-token or Button-state mapping is confirmed. |
| icon geometry | sufficient | sufficient for a basic Button | conditional DESIGN REVIEW only if a local Icon variant is required | `--icon` has a direct S/M/L mapping. A basic Button does not require `--icon-lg` or a local Icon variant. |
| avatar geometry | not applicable | not applicable | none | Avatar Geometry is not a Button Foundation dependency. Its general DESIGN REVIEW remains unchanged. |

### Button blocker classification

There is no remaining **Density blocker** for the Button subset documented above. The following are non-density Component-Spec dependencies and keep Button Component-Spec Readiness partial:

* Typography: TECH REVIEW for Letter Spacing and the chayns component-token mapping.
* Colors: TECH REVIEW for complete Contrast-/Color-Deficiency state mapping.
* Focus: TECH REVIEW for the Button-specific semantic Focus rendering mapping.
* Motion: TECH REVIEW for public Motion-token identities and the Button state-to-Motion mapping.
* Ghost padding: TECH REVIEW only if a later Button Specification includes Ghost. Its documented horizontal value currently uses source-only `--k16`; this pass does not promote it to the public contract.

The local Icon/Avatar variant DESIGN REVIEW is not a Button blocker unless a later Button Specification explicitly requires such a local Icon variant. No local Size Variant is defined here.

**Foundation density readiness:** the Button-relevant subset is sufficient.

**Button Density Readiness:** **sufficient**.

**Button Component-Spec Readiness:** **partial**.

This assessment is not an implementation release, a Button Specification, an API decision or a local-variant decision.

## 24. Density Readiness Gate

Eine Component ist aus Density-Sicht erst spezifikationsbereit, wenn für alle benötigten Foundation-Werte entweder ein bestätigtes S/M/L-Mapping existiert oder bestätigt ist, dass der Wert density-independent ist.

`density relation pending` ist für einen benötigten Wert nicht ausreichend. PARTIAL ist nicht automatisch ausreichend. Die Component darf den fehlenden Wert nicht lokal kompensieren oder berechnen.

Der Button-Subset dieses Closure Pass erfüllt das Gate nur aus Density-Sicht: Jede benötigte Beziehung ist entweder direkt über S/M/L belegt oder als density-independent bestätigt. Die getrennten non-density Component-Spec Dependencies aus dem vorherigen Abschnitt bleiben bestehen.

## 25. Catalogue Cross-check

The Matrix matches the Catalogue after the confirmed Button assignments for `--btn-py`, `--btn-px`, `--ctrl-h`, `--shadow-btn` and `--shadow-btn-hover`. Remaining PARTIAL entries stay PARTIAL, source-only `--k*` values remain outside the public contract and no token names are added. Direct S/M/L entries only restate delivered source mappings.

## Catalogue Follow-up Findings

No catalogue contradictions identified.

## 26. Decision Register Cross-check

* DENSITY-001–005 are confirmed by the global S/M/L model and the separation from local Size Variants.
* DENSITY-006 remains CONFIRMED for Icon/Avatar as examples of explicit local sizes; the complete local-variant contract remains DESIGN REVIEW.
* TOKEN-001, TOKEN-002 and TOKEN-006 remain applicable; this Matrix is not a technical token source.
* TYPE-004, COLOR-001–005, MOTION-001–007 and A11Y-001–006 are consistent with the Matrix.
* The Button-specific parts of Control Geometry, Component Padding and Button Shadows are now confirmed. The global TECH REVIEWs for remaining Component allocation, Typography, Radius, Borders and Motion are not closed here.
* No new Decision-Register follow-up is required.

## 27. AI Rules

Agents may reference confirmed S/M/L mappings and treat confirmed density-independent values equally at S, M and L. They must not calculate values independently from `--sf`, interpolate missing values, map local Size Variants to Density, treat PARTIAL as complete, expose source-only variables as public contract, locally compensate missing Component Geometry or conflate Density with Accessibility modes or Responsive breakpoints.

## 28. Explicit Non-Goals

This document defines neither React Context, Theme Provider, CSS Architecture, Runtime Resolver, Density Hook, Component Props, Responsive Breakpoints, touch-versus-mouse detection, automatic device Density, user-preference persistence nor a Token Build Pipeline.

## 29. Final Readiness Summary

| Area | Density relationship known | S/M/L values complete | Component-spec ready |
|---|---|---|---|
| Spacing | yes | yes | yes |
| Control Geometry | yes | yes | partial |
| Typography | partial | partial | partial |
| Radius | yes | no | no |
| Borders | yes | partial | partial |
| Colors | yes | partial | partial |
| Focus | yes | yes | partial |
| Shadows | yes | yes | yes |
| Z-Layers | yes | yes | yes |
| Motion | yes | no | no |
| Icon Geometry | yes | yes | partial |
| Avatar Geometry | yes | yes | partial |
| Button Foundation subset | yes | yes | partial |
