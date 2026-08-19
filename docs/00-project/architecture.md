# chayns UI – Architecture

## Purpose

Dieses Dokument definiert die logische Architektur von `chayns UI`.

Die Architektur trennt bewusst:

* visuelle UI,
* wiederverwendbare Layout-Systeme,
* Business- und Datenlogik,
* Design Foundations und CSS,
* Dokumentation und maschinenlesbare Spezifikationen.

Ziel ist, dass jede Ebene eine klare Verantwortung besitzt und Änderungen möglichst lokal innerhalb der zuständigen Ebene vorgenommen werden können.

Die logische Architektur ist zunächst unabhängig davon, wie viele technische npm-Pakete später daraus entstehen.

---

# 1. Architectural Overview

`chayns UI` besteht logisch aus folgenden Ebenen:

```text
Tobit.Software DesignSystem
            │
            ▼
Design Foundations / Tokens
            │
            ▼
        Core UI
         │   │
         │   └──────────────► Layout Components
         │                         │
         ▼                         │
Business Components ◄──────────────┘
         │
         ▼
     Applications
```

Parallel dazu existiert eine Dokumentations- und Spezifikationsebene:

```text
Design rules
Architecture decisions
Component specifications
AI specifications
Decision Register
```

Diese beschreibt und kontrolliert die Regeln der ausführbaren Ebenen.

---

# 2. DesignSystem

Das Tobit.Software DesignSystem ist die visuelle und konzeptionelle Designgrundlage.

Es definiert beispielsweise:

* visuelle Sprache,
* UX-Regeln,
* Komponentenverhalten,
* Einsatzempfehlungen,
* Farben,
* Abstände,
* Typografie,
* Radien,
* Motion,
* Produkt- und Layout-Patterns.

Referenz:

https://tappqa.tobit.com/Bodywork/DesignSystem/

Das DesignSystem selbst ist keine Runtime-Abhängigkeit von `chayns UI`.

Seine bestätigten Regeln werden durch:

* Design Tokens,
* Dokumentation,
* Komponenten,
* Tests,
* maschinenlesbare Spezifikationen

technisch reproduzierbar gemacht.

Wenn eine Designregel für die technische Umsetzung präzisiert werden muss, wird diese Präzisierung im Repository dokumentiert.

---

# 3. Design Foundations and CSS

## Responsibility

Die Design-Foundation-Ebene definiert die zentralen visuellen Parameter des Systems.

Dazu gehören unter anderem:

* Farben,
* semantische Farbrollen,
* Spacing,
* Radien,
* Font Sizes,
* Line Heights,
* Borders,
* Shadows,
* Z-Layer,
* Density,
* Motion-Dauern,
* Motion-Easings,
* Komponenten-spezifische Maß-Tokens, wenn diese durch das DesignSystem definiert sind.

Komponenten verwenden ausschließlich die vorgesehenen Tokens und CSS Custom Properties.

Sie definieren keine eigenen frei gewählten Designwerte.

## Runtime inputs

Ein Theme-/Environment-Layer erhält später nur die notwendigen globalen Eingaben aus Anwendung und Nutzerkontext.

Dazu können gehören:

* Primary / Accent Color,
* Color Mode,
* Density S/M/L,
* Contrast Mode,
* Color-Deficiency Mode,
* Reduced Motion.

Diese Eingaben werden in die für Komponenten relevanten semantischen Werte übersetzt.

Core-Komponenten sollen die fachliche Herkunft dieser Einstellungen nicht kennen.

## Color calculation

Die vom Nutzer oder System gelieferte Primärfarbe ist eine Eingabe.

Aus ihr dürfen weitere Farben und semantische Tokens abgeleitet werden.

Wenn Accessibility- oder Kontrastanforderungen dies notwendig machen, darf auch die effektiv verwendete Accent-Farbe gegenüber dem Eingabewert kalibriert werden.

Nutzbarkeit und WCAG-Anforderungen haben Vorrang vor exakter Farbübereinstimmung.

## Font responsibility

`chayns UI` lädt keine Schriftarten.

Die globale chayns-Umgebung stellt die verwendeten Font Families bereit.

Die aktuelle Designgrundlage verwendet:

* Roboto,
* Roboto Mono für entsprechende technische Inhalte.

Core-Komponenten dürfen Typografieparameter wie:

* Font Size,
* Font Weight,
* Line Height,
* Letter Spacing

über Design Tokens verwenden.

Die Font Family selbst bleibt außerhalb der Komponentenverantwortung.

---

# 4. Baseline and Patch CSS

Die visuelle Auslieferung soll von der JavaScript-/React-Version möglichst weit entkoppelt werden.

Dafür existieren logisch zwei CSS-Ebenen.

## Baseline CSS

Eine Baseline repräsentiert einen stabilen Designstand.

Beispiel: `2026 Baseline`

Sie enthält die vollständigen Standardwerte der zu diesem Designstand gehörenden Tokens und CSS-Regeln.

## Patch CSS

Zusätzlich zur Baseline existiert ein Patch.

Der Patch enthält ausschließlich Änderungen gegenüber der Baseline.

Beispiele:

* angepasste Abstände,
* geänderte Input-Darstellung,
* neue Farbwerte,
* Kontrastkorrekturen,
* Designanpassungen.

## Annual rollover

Einmal pro Designzyklus, grundsätzlich etwa jährlich, wird der bestehende Patch in eine neue Baseline übernommen.

Konzeptionell:

```text
2026 Baseline
+ 2026 Patch
      │
      ▼
2027 Baseline
+ neuer leerer Patch
```

Dadurch bleibt die Zahl dauerhaft übereinanderliegender CSS-Patches begrenzt.

## Distribution

Baseline und Patch werden unabhängig von den React-Komponenten als zentrale Assets veröffentlicht.

Anwendungen laden diese zentral bereitgestellten Styles.

Die konkrete Hosting-, Cache-, Preload- und Versionierungsstrategie wird später separat definiert.

## Compatibility principle

Zentrale CSS-Änderungen dürfen nicht stillschweigend neue DOM-Strukturen oder React-Komponenten-APIs voraussetzen.

Ein CSS-Patch muss mit den dafür vorgesehenen unterstützten Komponentenständen kompatibel bleiben.

Breaking Structural Changes benötigen eine koordinierte Komponentenänderung und können nicht ausschließlich durch einen globalen CSS-Patch eingeführt werden.

---

# 5. Core UI

## Responsibility

Core UI besitzt die vollständige sichtbare wiederverwendbare UI-Sprache von `chayns UI`.

Core UI ist verantwortlich für:

* visuelle Darstellung,
* UI-Zustände,
* UI-Interaktion,
* Accessibility,
* Keyboard-Verhalten,
* Fokusmanagement,
* Composition,
* notwendige lokale UI-Zustände,
* Darstellung auf Basis von Tokens.

Beispiele können später sein:

* Button,
* Input,
* Textarea,
* Checkbox,
* Radio,
* Switch,
* Select,
* Accordion,
* Card,
* Tooltip,
* Popover,
* Dialog,
* List,
* Table,
* Avatar,
* Icon.

Diese Liste ist ausdrücklich keine finale Komponentenliste.

## Core UI may know

Core UI darf Informationen kennen, die für Darstellung und UI-Interaktion notwendig sind.

Beispiele:

* selected,
* expanded,
* disabled,
* readOnly,
* loading,
* invalid,
* value,
* active.

## Core UI must not know

Core UI kennt keine:

* chayns APIs,
* Datenendpunkte,
* Personen-APIs,
* Produktkonfiguration,
* Businessprozesse,
* fachliche Berechtigungslogik,
* produktspezifische Datenbeschaffung.

Core UI muss grundsätzlich auch außerhalb einer chayns-Datenquelle technisch verwendbar bleiben.

## Native semantics

Core-Komponenten bauen wann immer möglich auf nativen HTML-Elementen und Web-Semantiken auf.

Native Props und Standardevents sollen grundsätzlich erhalten bleiben, sofern dies mit der Komponenten-API vereinbar ist.

---

# 6. UI interaction is not Business Logic

Nicht jede Logik innerhalb einer Komponente ist Business-Logik.

Core UI darf und muss Logik besitzen, die notwendig ist, um ein korrektes UI-Verhalten bereitzustellen.

Beispiele:

* Accordion öffnen und schließen,
* Fokus innerhalb eines Dialogs verwalten,
* Tastaturnavigation in einem Menü,
* Popover öffnen und positionieren,
* Auswahlzustände darstellen,
* Drag-and-Drop-Verhalten eines generischen UI-Elements,
* animierte Zustandsübergänge.

Business-Logik beginnt dort, wo eine Entscheidung von fachlichen Daten, chayns-spezifischen Funktionen oder Produktregeln abhängt.

Diese Abgrenzung verhindert, dass Core UI zu rein passiven Darstellungskomponenten reduziert wird.

---

# 7. Layout Components

## Responsibility

Layout Components stellen wiederverwendbare komplexere Layout-Strukturen bereit.

Sie besitzen keine fachliche Business-Verantwortung.

Beispiele können später sein:

* App Layout,
* Grid Layout,
* Workspace Layout,
* mehrspaltige Content-Flächen,
* verschiebbare Panels,
* einklappbare Panels,
* resizable Bereiche.

## Difference to Core UI

Core UI löst primär einzelne UI- und Interaktionsprobleme.

Layout Components koordinieren größere räumliche Beziehungen zwischen mehreren UI-Bereichen.

Eine Layout-Komponente darf intern Core-Komponenten verwenden.

## State

Layout Components dürfen UI-bezogenen Zustand verwalten.

Beispiele:

* Panel geöffnet/geschlossen,
* Bereichsgröße,
* Reihenfolge von Panels,
* aktive Layout-Variante,
* Drag-/Resize-Zustand.

## Persistence

Die tatsächliche dauerhafte Speicherung solcher Zustände ist grundsätzlich nicht Aufgabe der Layout-Komponente.

Die Komponente kann kontrollierte Werte und Änderungssignale bereitstellen.

Eine Anwendung oder Business-Ebene kann beispielsweise:

* Panel-Reihenfolge,
* Größen,
* Sichtbarkeit

in einem Benutzerprofil speichern.

Damit bleibt die Layout-Komponente unabhängig von der konkreten Persistenztechnologie.

---

# 8. Business Components

## Responsibility

Business Components stellen wiederverwendbare Kombinationen aus:

* Datenlogik,
* fachlichem Zustand,
* chayns-spezifischer Integration,
* Core UI

bereit.

Beispiele können später sein:

* PersonFinder,
* ItemFinder,
* chayns-spezifische Such- und Auswahlkomponenten.

## Visual rule

Für sichtbare UI verwenden Business Components ausschließlich Core- und gegebenenfalls Layout-Komponenten.

Business Components sollen keine eigene parallele Styling- oder Komponentenwelt aufbauen.

Wenn eine Business-Komponente ein sichtbares UI-Muster benötigt, das Core noch nicht unterstützt, muss geprüft werden:

1. Ist das Muster allgemein wiederverwendbar?
2. Gehört das notwendige UI-Primitiv in Core?
3. Handelt es sich tatsächlich nur um eine produktspezifische Darstellung?

Die Business-Komponente darf nicht aus Bequemlichkeit eine Core-Lücke dauerhaft durch eigenes alternatives UI umgehen.

## Example abstraction

Ein PersonFinder kann konzeptionell aus einer generischen Finder-/Selection-UI bestehen.

Die Business-Schicht ergänzt beispielsweise:

* Laden von Personen,
* Suchlogik,
* Mapping von Personendaten,
* chayns-Konfiguration,
* fachliche Auswahlregeln.

Die Darstellung erfolgt über Core UI.

---

# 9. Applications

Anwendungen sind Konsumenten des Systems.

Sie kombinieren:

* Core UI,
* Layout Components,
* Business Components

mit ihrer eigenen Produktlogik.

Anwendungen sind verantwortlich für:

* produktbezogene Datenflüsse,
* Routing,
* fachliche Prozesse,
* Seitenstruktur,
* Berechtigungen,
* persistente Produktzustände.

Anwendungen sollen zentrale UI-Patterns nicht lokal duplizieren, wenn dafür eine passende `chayns UI`-Lösung existiert.

---

# 10. Dependency Rules

Die logischen Abhängigkeiten folgen grundsätzlich dieser Richtung:

```text
Design Foundations
       ↓
     Core UI
      ↓   ↓
 Layout   Business
      ↓     ↓
     Applications
```

Zusätzlich darf Business auf Layout aufbauen, wenn dies für eine wiederverwendbare Business-Komponente notwendig ist.

Erlaubt:

```text
Core → Design Foundations

Layout → Core
Layout → Design Foundations

Business → Core
Business → Layout
Business → Design Foundations

Application → Core
Application → Layout
Application → Business
```

Nicht erlaubt:

```text
Core → Business
Core → Application

Layout → Business
Layout → Application

Business → Application

Design Foundations → Core
Design Foundations → Business
Design Foundations → Application
```

Die konkrete technische Durchsetzung dieser Abhängigkeitsgrenzen wird später definiert.

---

# 11. Component Context and Container Responsibility

Container dürfen für ihre Kindkomponenten UI-Kontext bereitstellen.

Beispiele:

* eine AccordionGroup definiert das Gruppenverhalten,
* ein Dialog kann den Action-Kontext seiner Buttons definieren,
* eine Toolbar kann eine kompaktere visuelle Umgebung definieren,
* ein Layout kann Panel-Verhalten koordinieren.

Dies soll vermeiden, dass Entwickler wiederkehrende Kontextinformationen an jedem einzelnen Kind manuell konfigurieren müssen.

Eine explizite Überschreibung kann dort erlaubt werden, wo das DesignSystem dies vorsieht.

Ein Container darf jedoch nicht beliebig das Design einer Kindkomponente verändern.

Nur ausdrücklich definierte Kontextregeln dürfen weitergegeben werden.

---

# 12. Density

Die globale Density ist eine Benutzerpräferenz.

Es existieren:

* S,
* M,
* L.

M ist der Standard.

Density kann unter anderem beeinflussen:

* Font Sizes,
* Spacing,
* Control Heights,
* Field Padding,
* weitere ausdrücklich dafür definierte Größenwerte.

Eine normale Core-Komponente besitzt keine lokale S/M/L-Density-Property.

Wenn das DesignSystem für eine bestimmte Komponente ausdrücklich mehrere funktionale Größenvarianten definiert, darf diese Komponente entsprechende Varianten anbieten.

Diese sind keine Density.

---

# 13. Accessibility Boundary

Accessibility wird nicht als separate nachgelagerte Ebene behandelt.

Sie durchzieht:

* Design Foundations,
* Core UI,
* Layout Components,
* Business Components.

Core und Layout müssen ihr eigenes UI-Verhalten vollständig zugänglich implementieren.

Business Components sind zusätzlich dafür verantwortlich, dass ihre fachliche Composition keine Accessibility-Probleme erzeugt.

Bekannte WCAG-2.2-AA-Verstöße in Core-Komponenten blockieren deren Veröffentlichung.

---

# 14. Motion Boundary

Motion-Regeln sind systemweite Designregeln.

Core und Layout implementieren diese Regeln.

Für CSS-Animationen sind vorgesehen:

* `transform`,
* `opacity`,
* `grid-template-rows` ausschließlich für definierte dynamische Höhenübergänge.

Andere animierte Layout-Eigenschaften werden nicht eingeführt.

Bei `prefers-reduced-motion` werden nicht notwendige Animationen deaktiviert.

Die genaue Motion-Matrix wird in einem eigenen Design-Foundation-Dokument beschrieben.

---

# 15. Documentation and AI Specification Layer

Dokumentation ist eine eigenständige Ebene des Systems.

Sie beschreibt unter anderem:

* Architektur,
* Entscheidungen,
* Designregeln,
* Komponenten,
* Einsatzregeln,
* Nicht-Einsatzregeln,
* Accessibility,
* Composition,
* Varianten,
* KI-Regeln.

Diese Ebene soll später sowohl:

* menschenlesbare Dokumentation,
* als auch strukturierte beziehungsweise maschinenlesbare Informationen

bereitstellen.

Die genaue technische Form dieser maschinenlesbaren Spezifikationen ist noch nicht festgelegt.

Ein KI-Agent soll fehlende Informationen niemals aus vorhandener Implementierung erraten müssen.

---

# 16. Decision Register

Konkrete Design-, Architektur- und Verhaltensentscheidungen werden in einem zentralen UI Decision Register erfasst.

Das Register unterscheidet mindestens:

* bestätigte Entscheidungen,
* offene Entscheidungen,
* Design-Klärungen,
* technische Klärungen,
* bewusst verworfene Alternativen.

Das Register wird in einem folgenden Planungsschritt spezifiziert.

---

# 17. Planned Distribution Model

Die logische Architektur sieht mehrere unabhängig veränderbare Artefakttypen vor:

```text
React / TypeScript
Design Tokens
Baseline CSS
Patch CSS
Documentation
Machine-readable specifications
```

Nicht alle Artefakte müssen zwingend gemeinsam versioniert oder ausgeliefert werden.

Insbesondere das zentrale CSS soll unabhängig von einem flächendeckenden Update der React-Abhängigkeiten aktualisierbar sein.

Die konkrete technische Versionierungs- und Distributionsstrategie wird später separat definiert.

---

# 18. Architectural Non-Goals

Diese Architektur soll nicht:

* jede denkbare spätere Paketgrenze bereits festlegen,
* die endgültige Repository-Struktur vorwegnehmen,
* Produkte daran hindern, eigene Businesslogik zu implementieren,
* Core zu einem rein visuellen, logikfreien Komponentenlayer machen,
* sämtliche komplexen Komponenten automatisch zu Business Components erklären,
* Designentscheidungen durch technische Abstraktionen ersetzen.

---

# 19. Architectural Decision Test

Bei zukünftigen Architekturfragen soll geprüft werden:

1. Welche Ebene besitzt die fachliche Verantwortung?
2. Ist die Funktion sichtbar wiederverwendbare UI?
3. Ist sie generische UI-Interaktion oder Business-Logik?
4. Ist sie ein wiederverwendbares Layoutproblem?
5. Kennt die Lösung unnötig chayns-spezifische Daten?
6. Wird sichtbare UI außerhalb von Core dupliziert?
7. Kann ein Designwechsel zentral erfolgen?
8. Sind Accessibility-Regeln an der richtigen Stelle verankert?
9. Bleibt die Abhängigkeitsrichtung eingehalten?
10. Ist eine neue Ebene tatsächlich notwendig oder lässt sich das Problem mit den bestehenden Ebenen lösen?

Wenn die Verantwortung nicht eindeutig bestimmt werden kann, muss die Frage vor einer Implementierung geklärt werden.

---

# Open Technical Decisions

Die folgenden technischen Entscheidungen sind **OPEN** und werden in diesem Schritt nicht entschieden:

* **OPEN:** konkrete npm-Paketgrenzen,
* **OPEN:** konkrete Package-Namen,
* **OPEN:** Package Manager,
* **OPEN:** Workspace-/Monorepo-Tooling,
* **OPEN:** Bundler,
* **OPEN:** konkrete CSS-Build-Pipeline,
* **OPEN:** konkrete Token-Quelldatei und Token-Build-Technologie,
* **OPEN:** konkrete Art des CSS-Ladens durch Komponenten,
* **OPEN:** Hosting-/CDN-/AWS-Struktur,
* **OPEN:** konkrete Theme-Resolver-Implementierung,
* **OPEN:** technische Context-Mechanismen,
* **OPEN:** konkrete maschinenlesbare Specification-Formate,
* **OPEN:** Storybook-/Dokumentationsplattform,
* **OPEN:** Testing-Stack,
* **OPEN:** Release-Automatisierung.
