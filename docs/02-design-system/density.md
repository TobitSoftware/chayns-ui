# chayns UI – Density

## Purpose

Density beschreibt die globale räumliche und typografische Dichte der Benutzeroberfläche. Sie erlaubt dieselbe Komponentenstruktur in unterschiedlichen Dichteausprägungen, ohne parallele Komponenten-APIs zu erzeugen. Density ist Teil des globalen Theme-/Design-Systems und keine lokale Größenoption einer Standardkomponente.

Sie stellt zentrale, konsistente Regeln sicher, erhält Accessibility und wird weder mit Responsive Design noch mit lokalen Component Size Variants verwechselt.

# 1. Density Levels

Es existieren genau drei globale Stufen: `S`, `M` und `L`; `M` ist Standard. Diese Werte beschreiben globale UI Density, nicht drei Varianten jeder Komponente. Weitere Stufen sind unzulässig. Die konkrete S/M/L-Matrix wird zentral bestätigt und hat Status **TECH REVIEW**.

# 2. Density Is a Global Preference

```text
Application / User Preference → Density (S / M / L) → Resolved Tokens → Components
```

Komponenten konfigurieren Density nicht individuell. Unterschiedliche globale Density in Standardkomponentenbereichen ist nicht allgemein bestätigt; eine spätere Ausnahme benötigt dokumentierten Context und Designregel.

# 3. Default Density

Ohne explizite Wahl entspricht der Zustand semantisch `M`. Speicherung, Initialisierung, Persistenz und technische Runtime-Schnittstelle werden hier nicht entschieden.

# 4. Density and Design Tokens

Density wirkt über zentral aufgelöste Tokens. Komponenten berechnen weder Abstands-, Schrift- noch Control-Höhenänderungen selbst. Nicht jeder Token ist density-abhängig; jede Abhängigkeit muss ausdrücklich definiert sein.

# 5. Density-Aware Design Areas

Density kann Font Sizes, Spacing, Control Heights, Field Padding und weitere ausdrücklich definierte geometrische oder typografische Maße beeinflussen. Die Zuordnung jedes Tokens zu S/M/L wird am DesignSystem bestätigt. Eine mathematische Skalierung wie `S = M × Faktor` oder `L = M × Faktor` ist nicht bestätigt und wird nicht angenommen.

# 6. Non-Density Design Areas

Colors, Radius, Shadows, Border Widths, Z-Layers, Motion Durations, Motion Easings und andere nicht ausdrücklich density-abhängige Werte skalieren nicht automatisch.

> Density affects only design values that are explicitly defined as density-aware.

# 7. Density Is Not Component Size

Density ist global, systemweit, token-basiert und eine Nutzer-/Anwendungspräferenz. Component Size Variants sind lokale öffentliche API einer konkreten Komponente und nur bei ausdrücklicher DesignSystem-Vorgabe zulässig. Avatar und Icon sind dokumentierte Beispiele; die vollständige Liste ist **DESIGN REVIEW**.

# 8. No Automatic S/M/L Component APIs

Globale S/M/L-Stufen erzeugen nicht automatisch `size="S"`, `size="M"` oder `size="L"` für Standardkomponenten. Ein Button reagiert auf globale Density, ohne dadurch drei öffentliche Button-Größen zu erhalten.

# 9. Density and Responsive Design

Density ist nicht Responsive Design:

```text
Viewport / Container Size ≠ Density
```

Weder geringe Breite noch große Fläche bestimmt automatisch S oder L. Breakpoint-Kopplung ist nicht bestätigt und benötigt gegebenenfalls eigene Dokumentation.

# 10. Density and Typography

Density kann Font Sizes beeinflussen, zentral über Tokens. Textrollen bleiben erhalten und Komponenten wählen keine eigenen density-spezifischen Größen. Die Zuordnung von Font Sizes, Line Heights und weiteren Werten zu S/M/L ist **TECH REVIEW**.

# 11. Density and Spacing

Density kann die zentrale Spacing-Skala `--sp-*` beeinflussen, ohne hier Werte oder Stufen zu definieren. Zwischen-Komponenten-Spacing bleibt Container-Aufgabe; interne Geometrie und Beziehungs-Spacing bleiben getrennt.

# 12. Density and Control Geometry

Density kann ausdrücklich definierte Control Geometry wie Control Height, internes Padding, Field Padding und interne Abstände beeinflussen. Komponenten berechnen dies nicht lokal, sondern konsumieren Tokens, gegebenenfalls `--btn-py`. Daraus werden keine weiteren Button-Tokens oder Naming-Regeln abgeleitet.

# 13. Density and Icons

Globale Density ist nicht gleich lokalen Icon Size Variants. Eine allgemeine Zuordnung von S/M/L zu Icon-Größen ist nicht bestätigt. Beziehungen werden nur bei ausdrücklicher DesignSystem- oder Specification-Regel definiert.

# 14. Density and Avatar

Avatar kann lokale Größenvarianten besitzen, unabhängig von globaler Density. Eine Zuordnung zwischen beiden wird nur bei ausdrücklicher DesignSystem-Regel spezifiziert.

# 15. Density and Accessibility

Kompakte Density rechtfertigt keine unzureichenden Bedienflächen, unlesbare Typografie, unbrauchbare Abstände, schlechtere Keyboard-/Touch-Nutzung oder schwächere Zustände. WCAG und tatsächliche Nutzbarkeit gehen vor visueller Kompaktheit.

# 16. Pointer and Touch Considerations

```text
Density S ≠ Mouse Mode
Density L ≠ Touch Mode
```

Density ist keine Input-Modality. Eine automatische Kopplung an Pointer-Typ ist nicht definiert.

# 17. Density and Focus

Density beeinträchtigt Sichtbarkeit und Nutzbarkeit von Focus States nicht. Geometrische Focus-Aspekte dürfen sich nur bei ausdrücklich density-abhängiger Regel ändern; lokale Verkleinerung oder Entfernung ist unzulässig.

# 18. Density and Motion

Density verändert weder Motion Duration, Easing noch Animation Type. Reduced Motion ist eine separate Präferenz:

```text
Density → spatial / typographic density
Reduced Motion → motion behavior
```

# 19. Density and Color Modes

Density ist unabhängig von Color Mode, Contrast Mode, Color-Deficiency Mode und Primary/Accent Color. Diese Theme Inputs können gleichzeitig zum Resolved Design State beitragen; die Theme-Resolver-Implementierung bleibt **OPEN**.

# 20. Density Consumption by Core Components

Core Components konsumieren zentrale Tokens, definieren keine eigene Skala, spiegeln Density nicht als lokale API und wählen sie nicht per Breakpoint. Specifications dokumentieren density-abhängige und unveränderte Maße sowie ausdrücklich definierte Interaktionen mit Size Variants.

# 21. Density Consumption by Layout Components

Layout Components konsumieren zentral definierte density-abhängige Abstände und Geometrien, insbesondere als Container für Input Group, Accordion Group, Toolbar oder Layout Container. Sie schaffen keine alternative Density-Skala.

# 22. Density Consumption by Business Components

Business Components definieren keine Density-Sprache und erben sie über Core und Layout. Datenlogik rechtfertigt keine eigenen Density Levels, Spacing Scales, Control Heights oder Typografie-Skalen. Neue allgemeine Regeln werden auf Foundations, Tokens, Core oder Layout geprüft.

# 23. Nested Density Contexts

Verschachtelte oder lokal abweichende Density-Kontexte sind nicht als allgemeines Feature bestätigt. CSS Custom Properties oder Context-Vererbung sind keine freigegebene API. Scopes, Vererbung, Portals/Overlays, Layout, Business und Accessibility wären separat zu klären. Status: **OPEN**, sofern nicht durch bestehende Entscheidungen abgedeckt; kein Registereintrag wird hier erstellt.

# 24. Density Persistence

Dieses Dokument entscheidet nicht über Persistenz. Komponenten speichern keine globale Density-Präferenz. Ob Application, Plattform oder spätere Library-Integration zuständig ist, bleibt offen, sofern Architektur oder Register dies nicht später konkretisieren.

# 25. Initial Density Resolution

Bestätigt sind `M` als Default und explizit S, M oder L. Density wird nicht aus Viewport, Device, Pointer, Betriebssystem, Browser oder Breakpoint abgeleitet. Eine spätere Plattformpräferenz wäre nur nach architektonischer Bestätigung Input.

# 26. Density Changes at Runtime

Eine globale Density-Änderung soll konzeptionell über zentrale Token-Auflösung auf dieselbe Komponentenstruktur wirken. Dies definiert keine Runtime-Technologie.

# 27. Density and Component Structure

Density verändert Darstellung, nicht ohne explizite Regel semantische Struktur, Funktionen, Controls, Rollen, APIs oder Businesslogik. Flächenbedingte Strukturänderung ist primär Responsive-/Layout-Verhalten.

# 28. Density and Baseline/Patch CSS

Density-Tokens können Baseline oder Patch sein. Eine Änderung ist patch-fähig bei gleicher Bedeutung und Density-Semantik sowie ohne Struktur- oder API-Bruch. S/M/L sind verbindlich; Patches führen keine weitere Stufe ein.

# 29. Density Review for Components

Specifications prüfen density-abhängige Tokens, innere Abstände, Typografie, Control Geometry, unveränderte Werte, Size Variants, Focus, Touch/Pointer, lokale API, semantische Struktur und Container-Spacing. Nicht jede Komponente benötigt Density-Auswirkungen.

# 30. Density Validation

Das spätere System soll gültige Stufen, Definition density-abhängiger Tokens, Mappings, unerlaubte lokale Stufen, Vermischung mit Size Variants und Token-Referenzen validieren. Tooling und Technologie bleiben offen.

# 31. Relationship to AI

KI-Agenten schätzen keine S/M/L-Werte, erfinden keine Skalierungsfaktoren, interpolieren keine Stufen, leiten keine Size Variants ab und koppeln weder Breakpoints noch Pointer-Modi an Density. Fehlende Zuordnungen sind offene Designinformation.

> Do not infer density behavior from visual plausibility alone.

# 32. Planned Density Matrix

Der Abgleich mit dem DesignSystem prüft Typography, allgemeines und Container-Spacing, Control Heights, Field Padding, interne Component Spacing, Component-specific Tokens, Icon-Verwendung, Size Variants, Focus Geometry und Touch-/Pointer-Nutzbarkeit. Jede Regel wird S/M/L zugeordnet oder ausdrücklich density-independent markiert. Status: **TECH REVIEW**; konkrete Werte werden nicht definiert.

# Open Density Decisions

Die folgenden Punkte verweisen auf passende Einträge im [UI Decision Register](../01-decisions/ui-decision-register.md), ohne neue IDs:

## Complete density matrix

Zuordnung density-abhängiger Werte zu S/M/L. Status: **TECH REVIEW**.

## Density-aware token catalogue

Zu bestätigen, welche Tokens abhängig oder unabhängig sind. Status: **TECH REVIEW**.

## Typography density mapping

Typografische Zuordnung zu S/M/L. Status: **TECH REVIEW**.

## Control geometry density mapping

Regeln für Control Heights, Field Padding und interne Geometrien. Status: **TECH REVIEW**.

## Nested density contexts

Öffentliche Unterstützung lokaler abweichender Densities. Status: **OPEN**, sofern nicht bereits abgedeckt.

## Density persistence responsibility

Verantwortung für Persistenz, falls noch ungeklärt. Status: **OPEN**, nur falls tatsächlich ungeklärt.

## Density runtime mechanism

Technische Bereitstellung und Runtime-Auflösung. Status: **OPEN**, sofern nicht ausreichend festgelegt.

Nicht abgedeckte Punkte wären `Decision Register follow-up required`; das Register wird nicht geändert.

# Non-Goals

Dieses Dokument entscheidet keine S/M/L-Werte, Pixelwerte, Font Sizes, Control Heights, Padding-, Touch-Target- oder Icon-Größen, vollständige Size-Listen, Tokenformat, Build-Technologie, Theme Resolver, Persistence-Technologie, Responsive Breakpoints, Device-/Pointer-Auswahl oder Nested-Context-API.
