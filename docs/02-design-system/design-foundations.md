# chayns UI – Design Foundations

## Purpose

Die Design Foundations bilden die gemeinsame visuelle und interaktive Grundlage von `chayns UI`. Sie übersetzen Regeln des Tobit.Software DesignSystems in dokumentierte Systemregeln, die später von Core Components, Layout Components, Business Components, CSS, Theme-System, Dokumentation und KI-Agenten konsistent verwendet werden.

Sie definieren keine Business-Logik, sondern ausschließlich systemweite Design-, Interaktions- und Accessibility-Regeln.

Visuelle Referenz: [tappqa.tobit.com](https://tappqa.tobit.com/Bodywork/DesignSystem/).

---

# 1. Foundation Model

Die Design Foundations bestehen logisch mindestens aus:

* Design Tokens
* Density
* Color System
* Typography
* Spacing
* Radius
* Borders
* Shadows
* Z-Layers
* Motion
* Accessibility

Komponenten dürfen darauf aufbauen, aber keine parallelen oder frei erfundenen Grundlagen einführen.

---

# 2. Source of Truth

Für Design Foundations gilt folgende Priorität:

1. bestätigte Entscheidungen im `ui-decision-register.md`,
2. spezialisierte Foundation-Dokumente in `docs/02-design-system/`,
3. allgemeine Architektur- und Philosophy-Regeln,
4. Tobit.Software DesignSystem als visuelle und konzeptionelle Referenz.

Abweichungen zwischen externer DesignSystem-Dokumentation und bestätigter technischer chayns-UI-Entscheidung müssen im Repository ausdrücklich dokumentiert sein. Fehlende Designregeln werden weder durch Implementierung noch durch KI-Agenten ergänzt.

---

# 3. Design Tokens as Contract

Design Tokens bilden den Vertrag zwischen Design und Implementierung. Komponenten verwenden keine frei gewählten Werte für Farben, Spacing, Radien, Typografiegrößen, Control-Geometrien, Borders, Shadows, Z-Layer, Motion-Dauern oder Motion-Easings.

Tokens ermöglichen zentrale Designänderungen ohne Änderung der Komponentenstruktur. Der vollständige Token-Katalog wird separat spezifiziert.

---

# 4. Token Levels

## Primitive Tokens

Primitive Tokens repräsentieren globale Skalen oder Grundwerte, etwa Spacing- und Radius-Stufen sowie gegebenenfalls grundlegende Farbskalen. Beispielhafte Benennung: `--sp-*`. Sie werden nur verwendet, wenn dies für die jeweilige Foundation vorgesehen ist.

## Semantic Tokens

Semantic Tokens beschreiben funktionale Bedeutung, beispielsweise Text, Surface, Accent, Error oder Border. Insbesondere Farben verwenden semantische Tokens, damit Color Modes und Accessibility-Konfigurationen zentral abbildbar bleiben.

## Component-specific Tokens

Komponentenspezifische Tokens sind nur erlaubt, wenn das DesignSystem eine eigene wiederverwendbare Regel definiert, beispielsweise `--btn-py`. Sie erlauben nicht, beliebige Komponentenwerte in Tokens auszulagern; jeder solche Token benötigt eine dokumentierte Designregel.

---

# 5. Density

Es gibt drei globale Nutzerdichten: S, M und L. M ist Standard. Density ist globale Nutzerpräferenz und Theme Input, nicht die Wahl pro Standardkomponente.

Sie kann Font Sizes, Spacing, Control Heights, Field Padding und weitere ausdrücklich definierte Maße beeinflussen. Radien, Farben und andere nicht density-abhängige Werte skalieren nicht automatisch mit. Lokale Component Size Variants sind keine Density und existieren nur bei ausdrücklicher DesignSystem-Definition.

Das genaue Density-Modell wird separat spezifiziert.

---

# 6. Spacing

Abstände verwenden die globale Spacing-Skala `--sp-*`. Einzelne Komponenten führen keine freien Pixelabstände ein. Container verantworten Beziehungen und Abstände mehrerer Komponenten, beispielsweise Input Group, Accordion Group, Toolbar oder Layout Container.

Für ausdrücklich definierte Komponentenmaße darf zusätzlich ein komponentenspezifischer Token wie `--btn-py` verwendet werden. Skala und Density-Werte werden später im Token-/Density-Dokument festgehalten.

---

# 7. Radius

Radien stammen aus einer globalen primitiven Skala; Komponenten erzeugen keine Zwischenwerte. Der definierte UI-Kontext oder Container kann eine vorgesehene Radiusstufe vermitteln. Explizite Überschreibung ist nur erlaubt, wenn DesignSystem oder Component Specification sie vorsehen.

Die vollständige Skala wird im Token-Dokument dokumentiert.

---

# 8. Color System

Farben werden über semantische Tokens konsumiert. Der Theme-/Environment-Layer erhält globale Eingaben wie Primary/Accent Color, Color Mode, Contrast Mode und Color-Deficiency Mode und leitet daraus finale semantische Farbwerte ab. Core Components kennen die fachliche Herkunft der Farbe nicht.

Die vom Nutzer oder System gelieferte Primärfarbe darf für ausreichenden Kontrast und Accessibility kalibriert werden. WCAG und Nutzbarkeit gehen vor exakter Farbübereinstimmung. Das vollständige Color-System wird separat spezifiziert.

---

# 9. Typography

`chayns UI` lädt keine Font Families; sie werden global außerhalb der Komponenten bereitgestellt. Die aktuelle Designgrundlage verwendet Roboto sowie Roboto Mono für entsprechende technische Inhalte.

`chayns UI` definiert oder konsumiert Regeln für Font Size, Font Weight, Line Height, Letter Spacing und Textrollen. Komponenten erzeugen keine beliebigen Typografiegrößen. Falls Font Families später kundenabhängig variieren, müssen Komponenten ohne strukturelle Änderungen weiter funktionieren.

---

# 10. Borders and Shadows

Borders und Shadows sind systemweite Entscheidungen. Komponenten verwenden nur definierte Werte oder Tokens und führen keine individuellen Border-Breiten, -Farben oder Shadows ein. Der Katalog wird aus dem DesignSystem abgeleitet und später im Token-Dokument festgehalten.

---

# 11. Z-Layers

Z-Index-Werte werden nicht frei pro Komponente vergeben. Definierte Z-Layer oder Tokens steuern Overlays, Backdrops und andere schwebende Flächen. Lokale Konflikte werden nicht durch beliebige `z-index`-Werte gelöst. Der Layer-Katalog folgt später.

---

# 12. Motion

Motion ist eine systemweite Foundation und erklärt Zustandsänderungen. Für CSS-Animationen sind nur `transform` und `opacity` erlaubt; `grid-template-rows` ist die gezielte Ausnahme für dynamische Höhenübergänge, insbesondere Accordions.

Andere animierte Layout-Eigenschaften sind ausgeschlossen, insbesondere `height`, `width`, `top`, `left`, `margin` und `padding`. Dauern, Easings, Einsatzkategorien, Enter-/Exit- und Reduced-Motion-Regeln werden separat spezifiziert.

---

# 13. Reduced Motion

`prefers-reduced-motion` ist eine globale Nutzerpräferenz. Nicht notwendige Animationen, etwa Einblenden, Ausblenden, räumliche Übergänge oder dekorative Feedback-Bewegungen, werden deaktiviert. Für Zustandsverständnis funktional notwendige Animationen wie ein Loading Spinner dürfen bestehen bleiben.

Reduced Motion wird nicht individuell und uneinheitlich durch Anwendungen interpretiert.

---

# 14. Accessibility

Accessibility ist keine optionale, separate Foundation, sondern durchzieht alle Foundation-Bereiche. Das System muss mindestens WCAG 2.2 AA unterstützen, darunter ausreichende Kontraste, sichtbare Fokusse, verständliche States, keine ausschließlich farbliche Informationsvermittlung, nutzbare Größen und Abstände sowie Reduced Motion.

Eine bekannte WCAG-2.2-AA-Verletzung in einer Core Component blockiert deren Veröffentlichung. Das vollständige Regelwerk wird separat spezifiziert.

---

# 15. Theme and Environment Inputs

Design Foundations unterscheiden Theme Inputs, abgeleitete Design Tokens und finales Komponenten-Styling:

```text
User / Application / Environment
            │
            ▼
        Theme Inputs
            │
            ▼
        Theme Resolver
            │
            ▼
Semantic / Runtime Tokens
            │
            ▼
       Components
```

Theme Inputs umfassen mindestens Primary / Accent Color, Color Mode, Density, Contrast Mode, Color-Deficiency Mode und Reduced Motion. Die technische Theme-Resolver-Implementierung ist `OPEN`.

---

# 16. Baseline and Patch Relationship

Design Foundations werden später in zentral bereitgestelltem CSS abgebildet: Baseline CSS enthält den vollständigen Stand eines Designzyklus, Patch CSS nur Änderungen gegenüber dieser Baseline.

Ein CSS-Patch setzt keine neue DOM-Struktur oder Komponenten-API voraus. Foundation-Änderungen sind nur patch-geeignet, wenn sie mit unterstützten Komponentenständen kompatibel bleiben.

---

# 17. Component Responsibility

Eine Komponente entscheidet nicht über globale Farben, aktive Density, globale Radiuswerte, Motion-Dauern oder Accessibility-Modi. Sie entscheidet ausschließlich, welche definierte Foundation-Regel oder welcher Token für ihren UI-Zustand vorgesehen ist.

Komponenten implementieren Designregeln; sie definieren keine neuen Foundations.

---

# 18. Container Responsibility

Container dürfen ausdrücklich definierte Foundation-Regeln an untergeordnete Komponenten vermitteln, etwa Spacing zwischen Children, Gruppierungsverhalten, Action Context, Radiusstufe oder Layout-Kontext. Beliebige Style-Werte dürfen nicht ungeprüft über Context weitergegeben werden.

Nur dokumentierte Systemregeln können durch Container beeinflusst werden.

---

# 19. Foundation Change Rules

Foundation-Änderungen sind zentral nachvollziehbar. Eine systemweite Regel wird nicht ausschließlich lokal in einer Komponente geändert.

Bei Änderungen wird geprüft:

1. Ist es eine bestehende Token-Wertänderung?
2. Wird ein neuer Token benötigt?
3. Entsteht eine neue Variant?
4. Ändert sich semantische Bedeutung?
5. Ist die Änderung Baseline-/Patch-kompatibel?
6. Wirkt sie auf Accessibility oder S/M/L?
7. Müssen Component Specifications oder das Decision Register aktualisiert werden?

Neue Designentscheidungen werden vor Implementierung dokumentiert.

---

# 20. Planned Foundation Documents

Geplante spezialisierte Dateien sind:

* `tokens.md`
* `density.md`
* `color-system.md`
* `motion.md`
* `accessibility.md`

Typography, Spacing, Radius, Borders, Shadows und Z-Layers können zunächst im Token-Dokument behandelt werden, falls kein Bedarf für eigene Dokumente entsteht. Dies ist keine technische Package-Struktur.

---

# Open Foundation Decisions

Diese bereits bekannten Punkte werden im [UI Decision Register](../01-decisions/ui-decision-register.md) nachverfolgt:

## Token catalogue

Der vollständige Token-Katalog muss aus dem aktuellen DesignSystem systematisch übernommen und dokumentiert werden. Status: **TECH REVIEW**.

## Token source format

Die technische Source of Truth für Tokens ist noch nicht entschieden. Status: **OPEN**.

## Token build technology

Die Technologie zur Generierung späterer CSS-/Code-Artefakte ist noch nicht entschieden. Status: **OPEN**.

## Theme Resolver implementation

Die konkrete technische Theme-Resolver-Implementierung ist noch nicht entschieden. Status: **OPEN**.

## Component size variants

Die vollständige Liste lokaler Größenvarianten muss anhand des DesignSystems bestätigt werden. Status: **DESIGN REVIEW**.

## Layout design foundations

Die vollständigen Designregeln für komplexere App-, Grid- und Workspace-Layouts müssen im DesignSystem weiter konkretisiert werden. Status: **DESIGN REVIEW**.

---

# Relationship to Component Specifications

Component Specifications duplizieren keine Foundation-Werte. Sie beschreiben stattdessen verwendete Tokens, tokenabhängige States sowie Density- und Motion-Regeln.

Beispiel: Eine Button-Spec definiert nicht `padding-top = 8px`, sondern verweist auf den vorgesehenen Token `--btn-py`. Dadurch bleiben zentrale Änderungen möglich.

---

# Relationship to AI

KI-Agenten behandeln Design Foundations als verbindliche Eingabe. Sie erfinden keine Farben, Abstände, Radien, Animationszeiten, Größenvarianten, Shadows oder Z-Layer. Fehlt eine Regel, erkennt der Agent die Lücke, markiert sie als offen und implementiert keine eigene Designentscheidung.
