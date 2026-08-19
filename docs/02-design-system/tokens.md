# chayns UI – Design Tokens

## Purpose

Design Tokens bilden den Styling-Vertrag zwischen Tobit.Software DesignSystem, Design Foundations, Theme-System, Core, Layout, Business, zentralem CSS, Dokumentation und KI-Agenten. Ein Token repräsentiert eine dokumentierte Designentscheidung. Komponenten konsumieren Tokens und definieren keine parallelen Designwerte. Das System ermöglicht zentrale Änderungen ohne strukturelle Änderung aller Konsumenten.

---

# 1. Token Principles

## Tokens represent decisions

Ein Token steht für eine bewusst definierte wiederverwendbare Regel, nicht nur für einen mehrfach vorkommenden Wert.

## No arbitrary values

Fehlt ein benötigter Wert, wird kein lokaler Ersatz erfunden: Bestehende Foundations werden geprüft, andernfalls wird die Entscheidung sichtbar offen markiert.

## Central ownership

Systemweite Werte werden zentral definiert. Eine Komponente erzeugt weder globale Skalen noch eine parallele Token-Welt.

## Semantic consumption

Wo eine semantische Bedeutung besteht, konsumieren Komponenten den Semantic Token statt direkt dessen Primitive Token zu wählen.

## Restricted variability

Tokens sind keine Escape Hatch für beliebige Styling-Konfiguration. CSS Custom Properties erlauben nicht beliebige Consumer-Werte.

---

# 2. Token Layers

```text
Primitive Tokens → Semantic Tokens → Component-specific Tokens → Components
```

Dies beschreibt die konzeptionelle Abhängigkeit. Nicht jede Regel durchläuft alle Ebenen; etwa kann eine Komponente direkt einen semantischen Farbtoken verwenden.

# 3. Primitive Tokens

Primitive Tokens bilden globale Grundskalen oder Grundwerte ab, beispielsweise Spacing, Radius, grundlegende Typografie- oder Motion-Werte und gegebenenfalls Farbgrundwerte. Bestätigt sind die zentrale Spacing-Skala `--sp-*` und eine globale primitive Radius-Skala. Primitive Tokens beschreiben noch keine fachliche Verwendung; konkrete Stufen und Werte bleiben offen.

# 4. Semantic Tokens

Semantic Tokens beschreiben UI-Bedeutung und entkoppeln Komponenten vom konkreten Wert. Konzeptionelle Beispiele sind Text, Secondary Text, Surface, Accent, Border, Error und Success Color; dies sind keine endgültigen technischen Namen. Sie können von Color Mode, Contrast Mode, Color-Deficiency Mode, Primary/Accent Color und weiteren bestätigten Theme Inputs abhängen. Komponenten berechnen daraus keine Farben selbst.

# 5. Component-specific Tokens

Sie repräsentieren ausdrücklich für eine Komponente definierte Regeln. Bestätigtes Beispiel: `--btn-py`. Sie sind nur zulässig, wenn DesignSystem-Regel, Wiederverwendbarkeit und Systematik belegt sind. Implementation convenience reicht nicht aus. Fehlt ein spezifischer Wert, wird Primitive, Semantic oder die fehlende Designregel geprüft.

# 6. Token Naming

Namen sind eindeutig, stabil, verständlich, systematisch und semantisch nachvollziehbar; sie hängen nicht von zufälligen Implementierungsdetails ab. Bestätigt sind nur `--sp-*` und das Beispiel `--btn-py`. Ein vollständiges Naming-Schema wird nicht aus ihnen abgeleitet und bleibt **TECH REVIEW**.

# 7. CSS Custom Properties

CSS Custom Properties sind die vorgesehene Runtime-Schnittstelle vieler Tokens:

```css
.component { property: var(--defined-token); }
```

Das Beispiel definiert keinen Token. Custom Properties ermöglichen zentrale Werte, Vererbung, Theme- und Density-Anpassung sowie Runtime-Konfiguration ohne Komponentenstrukturänderung. Token-Source und Build-Pipeline bleiben offen.

# 8. Token Source of Truth

```text
DesignSystem / Confirmed Decision → Token Source Definition → Generated Artifacts → CSS / Code / Metadata
```

Designentscheidung, Token-Definition und ausgeliefertes Artefakt sind getrennt. Dateiformat, Speicherort, Generierung, Code-Repräsentation und Validierung sind **OPEN** und werden hier nicht entschieden.

# 9. Theme Inputs vs. Tokens

Theme Inputs sind externe globale Eingaben: Primary/Accent Color, Color Mode, Density, Contrast Mode, Color-Deficiency Mode und Reduced Motion. Sie werden über einen Theme Resolver in Resolved Tokens überführt; Komponenten konsumieren nicht automatisch den ursprünglichen Input. Die Theme-Resolver-Implementierung bleibt **OPEN**.

# 10. Density and Tokens

Density ist globale Nutzerpräferenz mit S, M und L; M ist Standard. Sie kann Font Sizes, Spacing, Control Heights, Field Padding und weitere ausdrücklich definierte Maße beeinflussen. Farben, Radien, Shadows, Border-Breiten und Z-Layer skalieren nicht automatisch. Die S/M/L-Matrix folgt in `density.md` und wird hier nicht vorweggenommen.

# 11. Density Is Not Component Size

Lokale Component Size Variants sind keine Density Tokens. Standardkomponenten erhalten nicht automatisch S/M/L-Varianten. Sie existieren nur bei ausdrücklicher DesignSystem-Definition; Avatar und Icon sind Beispiele. Die vollständige Liste ist **DESIGN REVIEW**.

# 12. Spacing Tokens

Allgemeine Abstände nutzen `--sp-*`. Spacing zwischen Komponenten verantwortet der gemeinsame Container, etwa Input Group, Accordion Group, Toolbar oder Layout Container; ein Control bestimmt seinen Außenabstand nicht selbst. Interne Maße dürfen nur als ausdrücklich definierte Component-specific Tokens existieren.

# 13. Radius Tokens

Radien kommen aus der globalen primitiven Skala. Komponenten nutzen definierte Stufen oder erhalten eine vorgesehene Stufe aus Container-Kontext, erfinden aber keine Werte, Zwischenstufen oder freie Styling-API. Namen und Stufen sind noch Teil des Token-Katalogs.

# 14. Typography Tokens

`chayns UI` lädt keine Font Families; diese werden global bereitgestellt. Grundlage sind Roboto und Roboto Mono für technische Inhalte. Tokens können Font Size, Font Weight, Line Height, Letter Spacing und Textrollen abbilden, ohne dass hier eine Skala definiert wird.

# 15. Color Tokens

Komponenten konsumieren semantische Farben. Sie interpretieren Primary Color nicht selbst, berechnen keine Shades oder Kontrastfarben und implementieren Accessibility-Korrekturen nicht lokal. Accent Color darf zentral für Kontrast kalibriert werden; WCAG und Nutzbarkeit gehen vor Farbtreue. Die Struktur folgt in `color-system.md`.

# 16. Border Tokens

Borders sind systemweite Regeln. Spätere Tokens können definierte Border-Eigenschaften repräsentieren; Komponenten führen keine individuellen Werte ein.

# 17. Shadow Tokens

Shadows werden zentral definiert. Unterschiedliche Elevation-Regeln benötigen zuerst eine dokumentierte Systemregel; die Skala bleibt Teil des Token-Katalogs.

# 18. Z-Layer Tokens

`z-index` wird nicht frei vergeben. Definierte Z-Layer oder Tokens steuern Overlays; lokale Konflikte lösen keine beliebig hohen Werte. Die Struktur ist noch nicht spezifiziert.

# 19. Motion Tokens

Motion-Dauern und Easings sind systemweite Werte; Komponenten erfinden keine durations, delays oder easings. Davon getrennt gelten als animierbare Eigenschaften `transform`, `opacity` und `grid-template-rows` als Ausnahme. Der Katalog folgt in `motion.md` ohne hier erfundene Werte.

# 20. Token Consumption by Components

Components konsumieren Tokens nahe ihrer dokumentierten Bedeutung, etwa semantische Farben, definierte Spacing-, Typografie- und Radius-Tokens sowie ausdrücklich definierte komponentenspezifische Tokens. Specifications dokumentieren Kategorien, konkrete Referenzen, State-, Density- und erlaubte Context-Einflüsse, nicht Tokenwerte.

# 21. Token Consumption by Business Components

Business Components schaffen keine eigene Token-Ebene für über Core oder Layout sichtbare UI. Benötigt eine Business-Komponente eine allgemeine sichtbare Regel, wird deren Zugehörigkeit zu Core, Layout oder Foundations geprüft.

# 22. Token Overrides

System-controlled Overrides durch Theme, Density, Color Mode, Contrast Mode, Color-Deficiency Mode, dokumentierten Container Context und Baseline/Patch sind zulässig. Die öffentliche Policy für Consumer Overrides ist **OPEN**; daraus folgt keine freie Styling-API. Erlaubte Overrides benötigen Scope, Einschränkungen und Accessibility-Regeln. Ein neuer OPEN-Eintrag wird nicht erzeugt, wenn vorhandene Registerpunkte den Sachverhalt abdecken.

# 23. Baseline and Patch Tokens

Tokenwerte können Teil von Baseline CSS oder Patch CSS sein. Eine Wertänderung ist patch-fähig, wenn Bedeutung, DOM-Struktur und Komponenten-API gleich bleiben und unterstützte Stände kompatibel sind. Eine CSS Custom Property macht eine Änderung nicht automatisch zu einer reinen Tokenänderung.

# 24. Token Change Classification

**Value Change** ändert den Wert bei gleicher Bedeutung. **New Token** steht für neue dokumentierte Regel. **Semantic Change** ändert die Bedeutung und ist kritischer. **Deprecated Token** wird künftig nicht verwendet; **Removed Token** wird entfernt. Versionierung und Deprecation folgen späteren Distribution-Regeln. Namen erhalten nicht stillschweigend neue Bedeutungen.

# 25. Token Change Review

Zu prüfen sind Designregel, global oder komponentenspezifisch, semantische Korrektheit, Bedarf für neuen Token, Density, Color/Contrast/Deficiency-Auswirkungen, Accessibility, Baseline/Patch-Kompatibilität, Specification- und Register-Updates sowie neue Variabilität. Implementierungsbequemlichkeit reicht nicht.

# 26. Token Validation

Das spätere System soll unbekannte oder undefinierte Referenzen, ungültige Abhängigkeiten, Naming, Density-Abdeckung und veraltete Tokens validieren können. Technologie und Tooling sind **OPEN**.

# 27. Relationship to Component Specifications

Specifications referenzieren Tokens, definieren aber keine Werte. Beispiel: nicht „Button vertical padding = konkreter Wert“, sondern `--btn-py`, sofern der bestätigte Katalog ihn vorsieht. So bleiben Designregel, Verwendung und Wert getrennt.

# 28. Relationship to AI

KI-Agenten erfinden keine Namen, Skalenlücken, visuellen Schätzwerte, Component-specific Tokens oder Semantic Tokens. Sie prüfen zuerst vorhandene Tokens, dann Dokumentationslücken und schließlich fehlende Entscheidungen. Im Zweifel implementieren sie keine neue Designregel.

# 29. Planned Token Catalogue

Der Katalog prüft oder erfasst systematisch Spacing, Radius, Typography, Color, Borders, Shadows, Z-Layers, Motion, Component-specific Tokens und Density-Abhängigkeiten. Kategorien benötigen nicht zwingend dieselbe technische Struktur. Der Katalog wird am DesignSystem bestätigt und bleibt **TECH REVIEW**.

---

# Open Token Decisions

Diese Punkte verweisen auf bestehende Einträge im [UI Decision Register](../01-decisions/ui-decision-register.md):

## Complete token catalogue

Vollständige systematische Übernahme und technische Prüfung aus dem DesignSystem. Status: **TECH REVIEW**.

## Token source format

Technische Source of Truth der Token-Definitionen. Status: **OPEN**.

## Token build technology

Technologie für CSS-, Code- und Metadaten-Artefakte. Status: **OPEN**.

## Token naming catalogue

Vollständiges Naming-Schema aller Kategorien. Status: **TECH REVIEW**.

## Density mapping

Vollständige S/M/L-Zuordnung in `density.md`, ohne unbestätigte Werte. Status: **TECH REVIEW**.

## Consumer token overrides

Öffentliche Policy für direkte Consumer-Overrides. Status: **OPEN**, sofern der Registereintrag nicht konkreter wird.

## Component-specific token catalogue

Vollständige Liste ausdrücklich definierter Component-specific Tokens. Status: **TECH REVIEW**.

Für diese bestehenden Themen werden keine neuen Decision-IDs angelegt. Falls ein nicht abgedeckter Punkt entsteht, ist ein `Decision Register follow-up required`; das Register wird in diesem Schritt nicht geändert.

# Non-Goals

Dieses Dokument entscheidet weder Token-Dateiformat noch Build-Library, Package Manager, Bundler, CSS-Pipeline, Package-Grenzen, vollständigen Katalog, konkrete Werte, Theme-Resolver, Color-Palette, Density-Matrix oder Consumer-Override-API.
