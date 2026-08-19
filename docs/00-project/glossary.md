# chayns UI – Glossary

## Purpose

Dieses Glossary definiert die verbindliche Terminologie von `chayns UI`. Die Begriffe werden in Architektur, Design-Dokumentation, Component Specifications, Decision Register, AI Specifications, Code Reviews und zukünftiger Entwicklerdokumentation einheitlich verwendet. Wenn ein Begriff in anderen Dokumenten verwendet wird, gilt grundsätzlich die hier dokumentierte Bedeutung. Ausführlichere Regeln können spezialisierte Dokumente ergänzen.

---

# System and Architecture

## chayns UI

Das gesamte geplante UI-System: Core UI, Layout Components, Business Components, Design Foundations, Design Tokens, CSS, Accessibility- und Motion-Regeln, Dokumentation sowie maschinenlesbare Spezifikationen.

## Tobit.Software DesignSystem

Die visuelle und konzeptionelle Designgrundlage. `chayns UI` übersetzt bestätigte Design- und UX-Regeln in technische Spezifikationen und wiederverwendbare Implementierungen. Referenz: [tappqa.tobit.com](https://tappqa.tobit.com/Bodywork/DesignSystem/).

## Core UI

Die Ebene für allgemein wiederverwendbare sichtbare UI und generische UI-Interaktion, einschließlich lokaler UI-Zustände, Fokusmanagement, Keyboard-Verhalten, Accessibility, generischer Selection-, Overlay- und Drag-and-Drop-Logik. Core UI kennt keine chayns-spezifische Business- oder Datenlogik.

## Core Component

Eine einzelne wiederverwendbare Komponente innerhalb von Core UI, beispielsweise Button, Input, Accordion, Dialog oder Tooltip. Die endgültige Komponentenliste ist noch nicht definiert.

## Layout Component

Eine wiederverwendbare Komponente für größere räumliche Beziehungen und Layout-Strukturen, etwa App-, Grid- oder Workspace-Layouts, resizable Panels und verschiebbare Bereiche. Sie enthält keine fachliche Business-Logik.

## Business Component

Eine wiederverwendbare Komponente, die fachliche oder chayns-spezifische Logik mit Core- und gegebenenfalls Layout-UI kombiniert. Sie entwickelt für sichtbare UI keine parallele UI-Sprache. Beispiel: `PersonFinder`.

## Application

Eine konsumierende Anwendung oder ein Produkt. Applications kombinieren `chayns UI` mit Produktlogik, Routing, Datenflüssen, Berechtigungen, Persistenz und Businessprozessen.

---

# Design Foundations

## Design Foundation

Eine systemweite Designregel oder ein wiederverwendbarer Designbaustein, etwa Farben, Spacing, Radien, Typografie, Density, Motion, Shadows oder Z-Layer.

## Design Token

Ein benannter Designwert, der eine definierte Designentscheidung repräsentiert. Komponenten verwenden Tokens statt frei erfundener Werte.

## Primitive Token

Ein grundlegender Token einer globalen Skala, beispielsweise für Spacing, Radien oder grundlegende Farben. Er beschreibt einen Wert, nicht zwingend dessen fachliche Verwendung.

## Semantic Token

Ein Token mit funktionaler oder visueller Bedeutung, beispielsweise Accent-, Text-, Surface- oder Error-Color. Der vollständige Katalog ist noch nicht spezifiziert.

## Component-specific Token

Ein ausdrücklich für eine Komponentengeometrie oder -regel definierter Token, beispielsweise `--btn-py`. Er darf nur bei DesignSystem- oder bestätigter chayns-UI-Grundlage eingeführt werden.

## CSS Custom Property

Die CSS-technische Form, über die viele Tokens später zur Laufzeit bereitgestellt werden, beispielsweise `--sp-2`. Nicht jede konzeptionelle Designentscheidung entspricht zwingend genau einer Custom Property.

---

# Density and Size

## Density

Eine globale Nutzerpräferenz für die Dichte der Oberfläche: S, M oder L; M ist Standard. Sie kann Font Sizes, Spacing, Control Heights und Field Padding beeinflussen. Density ist keine lokale Komponentenvariante.

## Component Size Variant

Eine ausdrücklich für eine einzelne Komponente definierte Größenvariante, unabhängig von globaler Density und nur bei expliziter DesignSystem-Vorgabe. Avatar und Icon sind aktuelle Beispiele.

## Variant

Eine ausdrücklich definierte alternative Ausprägung einer Komponente, etwa für visuelle Bedeutung, Interaktionsart, Form oder fachlich definierte Größe. Varianten werden nicht spontan implementiert.

## State

Ein aktueller UI-Zustand, beispielsweise `disabled`, `loading`, `expanded`, `selected`, `invalid` oder `active`. Ein State ist keine Variant.

---

# Composition and Structure

## Composition

Das Zusammensetzen komplexerer UI aus klar abgegrenzten Komponenten oder Subcomponents. Sie wird gegenüber vielen konfigurierenden Props bevorzugt, wenn sie die API verständlicher macht.

## Subcomponent

Ein definierter Bestandteil einer Komponentenfamilie, beispielsweise `Card.Header`, `Card.Body`, `Input.HelpText` oder `Accordion.Item`. Die konkrete API ist noch zu spezifizieren.

## Slot

Eine definierte Position innerhalb einer Komponente, deren Inhalt der Consumer bereitstellt. `chayns UI` bestimmt Position, Layout, zulässigen Kontext und gegebenenfalls Accessibility-Beziehungen.

## Container

Eine Komponente, die Beziehungen zwischen Kindkomponenten definiert, etwa Spacing, Gruppierung, Kontext, Layout oder gemeinsame Interaktionsregeln.

## Context

Eine definierte UI-Umgebung, die Verhalten oder vorgesehene Darstellung untergeordneter Komponenten beeinflussen kann. Context ist auf ausdrücklich definierte Systemregeln begrenzt; nicht jeder DOM-Container erzeugt ihn.

## Escape Hatch

Eine bewusst vorgesehene Ausnahme vom Standardverhalten. Sie ist nicht der normale Nutzungsweg und darf zentrale Design- oder Accessibility-Regeln nicht beliebig umgehen.

---

# Actions and Navigation

## Action

Eine Benutzerinteraktion für eine Funktion oder Zustandsänderung der Anwendung. Actions basieren grundsätzlich auf einem nativen `button`.

## Navigation

Eine Interaktion mit dem primären Zweck, zu URL, Route, Ressource oder Ansicht zu wechseln. Navigation basiert grundsätzlich auf einem nativen Link (`a`).

## Primary Action

Die wichtigste Action innerhalb eines abgeschlossenen Action Scope. Ein Scope hat höchstens eine Primary Action.

## Action Scope

Ein semantisch abgeschlossener UI-Kontext mit eigenem Benutzerziel oder eigener primärer Handlung, etwa Page, Card, Dialog, Drawer, Formular, Wizard Step oder abgeschlossener Accordion-Inhalt. Er wird nicht allein aus DOM-Struktur abgeleitet.

## Destructive Action

Eine Action, die Daten, Beziehungen, Konfigurationen oder relevante Zustände entfernt oder wesentlich zurücksetzt; sie kann technisch wiederherstellbar sein.

## Danger

Die visuelle beziehungsweise semantische Button-Ausprägung für Destructive Actions. Danger bedeutet nicht ausschließlich technisch unwiderruflich.

---

# Forms

## Form Control

Eine interaktive UI-Einheit für Daten-Eingabe oder -Auswahl, beispielsweise Input, Textarea, Select, Checkbox, Radio oder Switch.

## Floating Label

Ein zum Form Control gehörendes Label, das zustandsabhängig innerhalb oder oberhalb des Felds dargestellt wird. Beim Input ist es Teil der Komponente.

## Help Text

Zusätzliche erklärende Information zu einem Form Control; ein definierter Slot beziehungsweise Bestandteil des Controls.

## Error

Fehlermeldung oder Fehlerzustand eines Form Controls. Entwickler liefern Inhalte; `chayns UI` verantwortet Darstellung, Positionierung und Accessibility-Beziehung.

## Counter

Definierte Zusatzinformation zu Mengen-, Zeichenbegrenzung oder aktuellem Verbrauch. Die genaue API ist noch zu spezifizieren.

## Input Group

Ein Container für zusammengehörige Form Controls. Die Gruppe verantwortet Beziehungen und Abstände; ein einzelnes Input bestimmt diese nicht selbst.

---

# Overlays and Surfaces

## Overlay

Oberbegriff für Flächen über dem normalen Seiteninhalt, beispielsweise Dialog, Popover, Dropdown, Context Menu oder Tooltip. Die Muster haben unterschiedliche semantische Aufgaben.

## Dialog

Fokussiertes Overlay für kleine, abgeschlossene Interaktionen wie Confirm, Umbenennen, einfache Eingabe oder kleine Auswahl. Komplexe Bearbeitungen und Workflows gehören in Views oder Drawer.

## Drawer

Größere UI-Fläche für umfangreichere Inhalte oder Bearbeitungen als ein Dialog. Die vollständigen Regeln sind noch zu spezifizieren.

## Popover

Kontextbezogenes, direkt zu einem Trigger gehörendes Overlay für Schnellinformationen oder kontextbezogene Interaktion. Die Component Specification folgt später.

## Dropdown

Ein UI-Muster für mehrere Actions hinter einem Trigger gemäß DesignSystem. Es ist nicht der technische Oberbegriff für alle Overlays.

## Context Menu

Kontextbezogenes Menü für sekundäre Actions zu Objekt oder Auswahl.

## Select

Form Control zur Auswahl eines Wertes aus einer definierten Menge. Es ist semantisch von Dropdown und Context Menu verschieden.

## Tooltip

Kurze ergänzende Information zu einem UI-Element. Sichtbare Tooltips verwenden eine eigene zugängliche Komponente und enthalten keine notwendigen Interaktionen oder ausschließlich per Hover erreichbaren Informationen.

## Native title

Das HTML-Attribut `title`. Es ist ergänzend erlaubt, ersetzt aber keinen zugänglichen sichtbaren Tooltip für relevante Hinweise.

## Backdrop

Fläche hinter einem Overlay zur visuellen und gegebenenfalls interaktiven Abgrenzung. Bei Dialogen führt Backdrop-Click standardmäßig zu Cancel, sofern nicht deaktiviert.

---

# Accordion

## Accordion

Ein ein- und ausklappbarer UI-Bereich, standalone oder innerhalb einer Accordion Group.

## Accordion Group

Container für logisch zusammengehörige Accordions; die zugehörigen Accordions schließen sich gegenseitig.

## Standalone Accordion

Accordion, dessen Expanded-State keine anderen Accordions beeinflusst.

## Nested Accordion

Accordion innerhalb eines Inhaltsbereichs oder eines anderen Accordions. Verschachtelung bestimmt nicht automatisch grouped oder standalone.

## Wrapped Accordion

Bisheriger DesignSystem-Begriff. Er erzeugt in `chayns UI` keine eigene Verhaltensvariante; stattdessen werden Grouped und Standalone unterschieden. Die DesignSystem-Anpassung hat Status `DESIGN REVIEW`.

---

# Motion and Interaction

## Motion

Systemweite Regeln für animierte Zustandsänderungen. Motion macht Änderungen verständlich und ist nicht rein dekorativ.

## Transition

Der animierte Übergang zwischen zwei UI-Zuständen; er folgt den Motion-Regeln von `chayns UI`.

## Reduced Motion

Nutzerpräferenz zum Reduzieren oder Deaktivieren nicht notwendiger Bewegung. Für Zustandsverständnis zwingende Animationen dürfen bestehen bleiben.

## Layout Animation

Animation einer räumlichen Anordnung oder Größe. Zulässig sind `transform`, `opacity` und `grid-template-rows` als Ausnahme für dynamische Höhenübergänge; andere animierte Layout-Eigenschaften sind ausgeschlossen.

---

# Styling and Distribution

## Baseline CSS

Der vollständige stabile CSS-Designstand eines definierten Designzyklus, beispielsweise `2026 Baseline`.

## Patch CSS

Ein ergänzendes CSS-Artefakt, das ausschließlich Änderungen gegenüber der aktuellen Baseline enthält.

## Baseline Rollover

Der Prozess, bei dem Patch-Änderungen in eine neue Baseline übernommen werden und ein neuer leerer Patch beginnt.

## Theme

Die resultierende visuelle Konfiguration aus globalen Design- und Nutzereinstellungen, beispielsweise Accent Color, Color Mode, Contrast, Color-Deficiency Mode und Density.

## Theme Input

Ein durch Anwendung, Umgebung oder Nutzer bereitgestellter Eingangswert, etwa Primary Color, Density oder Color Mode. Er ist nicht zwingend der finale Tokenwert einer Komponente.

## Theme Resolver

Begriff für die noch zu spezifizierende technische Logik, die Theme Inputs in semantische Werte oder Tokens übersetzt. Die Implementierung ist `OPEN`.

## Accent Color

Zentrale Akzent- oder Primärfarbe des Themes. Die effektiv verwendete Farbe darf für Accessibility und ausreichenden Kontrast kalibriert werden.

---

# Accessibility

## Accessibility

Zuverlässige Nutzbarkeit der UI für Menschen mit unterschiedlichen Fähigkeiten und Bedienformen. Accessibility ist funktionale Korrektheit.

## WCAG 2.2 AA

Verbindliches Mindestniveau für Core UI. Bekannte Verstöße blockieren die Veröffentlichung einer Core Component.

## Keyboard Accessibility

Vollständige Nutzbarkeit ohne Zeigegerät.

## Screenreader Compatibility

Fähigkeit einer UI-Struktur, von assistiven Technologien semantisch sinnvoll verstanden und bedient zu werden.

## Focus Management

Kontrolliertes, vorhersehbares Setzen oder Wiederherstellen des Keyboard-Fokus bei Interaktionen und Zustandsänderungen.

## Focus Visible

Sichtbarer Fokuszustand für Keyboard- oder relevante Fokusinteraktion.

---

# AI and Documentation

## AI Agent

Ein KI-System, das Repository-Regeln analysieren, Komponenten auswählen, Spezifikationen erstellen und Implementierungen unterstützen kann.

## AI-ready

Eine Regel, Komponente oder Spezifikation ist AI-ready, wenn Zweck und erlaubte Verwendung aus expliziten Informationen ableitbar sind, ohne Anforderungen erraten zu müssen.

## Machine-readable Specification

Strukturierte maschinenlesbare Beschreibung einer Komponente oder Regel. Das konkrete Format ist `OPEN`.

## Component Specification

Verbindliche Beschreibung einer einzelnen Komponente, später unter anderem mit Zweck, Use When, Do Not Use When, Anatomy, Variants, States, Composition, API, Accessibility, Keyboard-Verhalten, Motion und Tokens. Das genaue Format ist noch offen.

## Decision Register

Kompakte zentrale Übersicht bestätigter und offener Entscheidungen sowie Design- und Technical Reviews. Das Register liegt unter `docs/01-decisions/ui-decision-register.md`.

## Architecture Decision Record / ADR

Dokument einer konkreten technischen Architekturentscheidung mit Kontext, Alternativen, Entscheidung, Begründung und Konsequenzen. ADRs liegen später unter `docs/01-decisions/architecture-decisions/`; nicht jede UI- oder Designentscheidung benötigt ein ADR.

## Design Review

Decision-Status für einen mit Design/UX abzustimmenden oder im DesignSystem zu präzisierenden Punkt.

## Tech Review

Decision-Status für geklärte fachliche Richtung mit noch zu spezifizierender technischer Ausgestaltung.

## Open Decision

Entscheidung ohne verbindliche Lösung. Sie darf nicht durch Implementierung stillschweigend geschlossen werden.

## Confirmed Decision

Verbindlich getroffene Entscheidung, die für weitere Planung und Umsetzung gilt.

## Superseded Decision

Frühere, durch eine neuere dokumentierte Entscheidung ersetzte Entscheidung. Sie bleibt nachvollziehbar erhalten.

---

# Terminology Rules

## Prefer defined terms

Definierte Begriffe werden in der Projektdokumentation einheitlich verwendet. Mehrdeutige Synonyme werden vermieden.

## Do not overload terms

Ein Begriff besitzt nicht mehrere technische oder fachliche Bedeutungen. Beispielsweise ist `Dropdown` ein semantisches UI-Muster, nicht der Oberbegriff aller Overlays.

## Design terms vs implementation terms

Bei technisch missverständlichen DesignSystem-Begriffen darf `chayns UI` einen präziseren technischen Begriff definieren; die Beziehung wird dokumentiert. Beispiel: `Wrapped Accordion` ist keine eigene technische Variante, sondern Grouped oder Standalone.

## No speculative terminology

KI-Agenten und Entwickler führen keine neuen Systembegriffe für lokale Lösungen ein. Neue wiederverwendbare Terminologie wird dokumentiert und bei Bedarf im Decision Register ergänzt.

---

# Open Terminology

Aktuell keine zusätzlichen offenen Terminologiefragen.
