# chayns UI – Vision

## Purpose

`chayns UI` soll die gemeinsame Grundlage für Benutzeroberflächen innerhalb des chayns-Ökosystems bilden.

Das Projekt stellt ein konsistentes, zugängliches und langfristig wartbares UI-System bereit, das auf dem Tobit.Software DesignSystem basiert und dessen Regeln technisch reproduzierbar macht.

Das Ziel ist ausdrücklich **mehr als eine Sammlung von React-Komponenten**.

`chayns UI` verbindet:

* Designregeln,
* Design Tokens,
* wiederverwendbare UI-Komponenten,
* Layout-Komponenten,
* Business-Kompositionen,
* Accessibility-Regeln,
* Interaktions- und Motion-Regeln,
* Dokumentation,
* maschinenlesbare Spezifikationen für KI-Systeme.

Dadurch soll eine gemeinsame verbindliche Grundlage für Design, Entwicklung und KI-gestützte Softwareentwicklung entstehen.

## Problem Statement

Heute entstehen Benutzeroberflächen in unterschiedlichen Anwendungen teilweise unabhängig voneinander.

Dadurch können unter anderem folgende Probleme entstehen:

* gleiche UI-Muster werden mehrfach implementiert,
* Komponenten verhalten sich zwischen Anwendungen unterschiedlich,
* Designwerte werden lokal oder individuell definiert,
* Designänderungen müssen in mehreren Projekten separat umgesetzt werden,
* Accessibility wird nicht überall gleich berücksichtigt,
* komplexere Layout- und Interaktionsmuster werden mehrfach entwickelt,
* fachliche Logik und Darstellung sind teilweise unnötig miteinander gekoppelt,
* Entwickler müssen selbst entscheiden, welche UI-Komponente für einen Anwendungsfall vorgesehen ist,
* KI-Coding-Systemen fehlt eine eindeutige Grundlage für die Auswahl und Implementierung von Komponenten.

`chayns UI` soll diese Unterschiede durch verbindliche Regeln, zentrale Komponenten und nachvollziehbare Entscheidungen reduzieren.

## Vision

Die Entwicklung einer neuen chayns-Oberfläche soll langfristig möglichst wenig individuelle UI-Entscheidungen erfordern.

Ein Entwickler oder KI-Agent soll für einen fachlichen Anwendungsfall eindeutig feststellen können:

* welche vorhandene Komponente verwendet werden soll,
* wann eine Komponente verwendet werden darf,
* wann eine andere Komponente geeigneter ist,
* welche Varianten erlaubt sind,
* wie Komponenten miteinander kombiniert werden,
* welches Verhalten erwartet wird,
* welche Accessibility-Anforderungen gelten,
* welche Design Tokens und Layout-Regeln maßgeblich sind.

Produkte sollen ihre fachlichen Anforderungen umsetzen können, ohne grundlegende UI-Muster erneut zu entwickeln.

Das Design soll zentral weiterentwickelt werden können, ohne dass jede Anwendung dieselben Designentscheidungen erneut implementieren muss.

Die Benutzeroberfläche soll dadurch über Anwendungen hinweg konsistent wirken und sich konsistent verhalten.

## Target Audience

`chayns UI` richtet sich an mehrere Zielgruppen.

### Application Developers

Entwickler sollen stabile, verständliche und gut dokumentierte Komponenten verwenden können, ohne grundlegende UI-, Accessibility- oder Designentscheidungen selbst neu treffen zu müssen.

### Business Component Developers

Entwickler komplexerer fachlicher Komponenten sollen auf bestehenden Core-Komponenten aufbauen können und sich auf Datenfluss, fachliche Zustände und chayns-spezifische Funktionen konzentrieren.

### Designers and UX

Design und Entwicklung sollen auf derselben gemeinsamen Terminologie, denselben Komponentenmodellen und denselben Designregeln aufbauen.

Änderungen im DesignSystem sollen eindeutig auf die technische Umsetzung abbildbar sein.

### AI Coding Agents

KI-Systeme sind ausdrücklich eine Zielgruppe des Projekts.

Sie sollen anhand der Projektdokumentation und maschinenlesbarer Spezifikationen zuverlässig verstehen können:

* welche Komponenten existieren,
* welchen Zweck sie erfüllen,
* wann sie eingesetzt werden,
* welche Kombinationen zulässig sind,
* welche Regeln bei Änderungen oder neuen Komponenten gelten.

KI-Systeme dürfen dabei nicht auf Vermutungen oder rein visuelle Interpretation angewiesen sein.

### End Users

Die letztendlichen Nutzer der Anwendungen sollen von:

* konsistentem Verhalten,
* guter Accessibility,
* vorhersehbaren Interaktionen,
* anpassbarer Dichte,
* passenden Farb- und Kontrastmodi,
* performanten und verständlichen Animationen

profitieren.

## Scope

`chayns UI` umfasst grundsätzlich mehrere logisch getrennte Bereiche.

### Core UI

Core UI stellt die vollständigen grundlegenden sichtbaren UI-Bausteine bereit.

Dazu gehören beispielsweise:

* Controls,
* Form Controls,
* Overlays,
* Navigationselemente,
* Feedback-Komponenten,
* Content-Container,
* Interaktionsmuster.

Core UI enthält keine fachliche chayns-Businesslogik.

### Layout Components

Layout Components stellen komplexere wiederverwendbare Oberflächenstrukturen bereit.

Dazu können beispielsweise gehören:

* App-Layouts,
* Grid-Layouts,
* mehrspaltige Content-Flächen,
* verschiebbare Bereiche,
* einklappbare Bereiche,
* wiederverwendbare Workspace-Strukturen.

Sie bilden eine gemeinsame Grundlage für mehrere Anwendungen, auch wenn sie nicht von jeder Anwendung benötigt werden.

### Business Components

Business Components kombinieren bestehende Core-Komponenten mit wiederverwendbarer fachlicher Logik.

Beispiele können später sein:

* PersonFinder,
* ItemFinder,
* weitere chayns-spezifische Auswahl- oder Suchfunktionen.

Die sichtbare UI dieser Komponenten basiert vollständig auf Core UI.

### Design Foundations

Zum Projekt gehören die technischen Regeln und Spezifikationen für:

* Design Tokens,
* Farben,
* Dichte,
* Spacing,
* Radien,
* Motion,
* Accessibility,
* UI-Zustände.

### Documentation and Specifications

Dokumentation ist ein produktiver Bestandteil des Systems und kein nachträgliches Zusatzprodukt.

Für Komponenten und Regeln sollen Informationen so bereitgestellt werden, dass sie sowohl für Menschen als auch für KI-Systeme verständlich sind.

## Non-Goals

`chayns UI` soll ausdrücklich nicht:

### Keine vollständige Business-Plattform sein

Das System bildet keine beliebige fachliche Produktlogik ab.

Business Components werden nur dann zentral bereitgestellt, wenn eine fachliche Lösung in mehreren Anwendungen wiederverwendbar ist.

### Keine produktspezifischen Sonderlösungen erzwingen

Eine einzelne Anwendung soll nicht dazu führen, dass produktspezifische Anforderungen automatisch in Core UI übernommen werden.

Wiederverwendbarkeit und allgemeine Gültigkeit müssen gegeben sein.

### Kein Ersatz für das DesignSystem sein

Das Tobit.Software DesignSystem bleibt die visuelle und konzeptionelle Designgrundlage.

`chayns UI` übersetzt dessen Regeln in eindeutig dokumentierte und technisch nutzbare Strukturen.

Explizit bestätigte technische Entscheidungen innerhalb von `chayns UI` können die Design-Dokumentation präzisieren.

### Keine freie Styling-Bibliothek sein

Das Ziel ist nicht, beliebige visuelle Varianten zu ermöglichen.

Komponenten sollen bewusst einen begrenzten und durch das DesignSystem definierten Lösungsraum anbieten.

### Keine Sammlung unabhängiger Komponenten sein

Komponenten sollen als zusammenhängendes System entwickelt werden.

Gemeinsame Regeln für:

* Accessibility,
* Interaktion,
* Motion,
* Design Tokens,
* Composition,
* API-Design

haben Vorrang vor individuellen Sonderlösungen einzelner Komponenten.

### KI darf nicht zum Ersatz für Spezifikation werden

Das Projekt soll nicht darauf angewiesen sein, dass KI fehlende Anforderungen interpretiert.

KI-Unterstützung funktioniert auf Basis expliziter Regeln und Spezifikationen.

## Success Criteria

`chayns UI` ist langfristig erfolgreich, wenn die folgenden Ziele erreicht werden.

### Consistency

Gleiche fachliche UI-Anforderungen führen in unterschiedlichen Anwendungen zu denselben oder kompatiblen UI-Lösungen.

### Reuse

Bestehende Komponenten und Layout-Strukturen werden wiederverwendet, statt projektweise neu entwickelt zu werden.

### Central Design Evolution

Änderungen an Design Tokens und zentralen Designregeln können möglichst zentral umgesetzt und verteilt werden.

### Accessibility by Default

Anwendungen erhalten durch die Verwendung von `chayns UI` zugängliche Grundkomponenten, ohne Accessibility für jedes Projekt neu implementieren zu müssen.

Bekannte WCAG-2.2-AA-Verstöße in Core-Komponenten verhindern deren Veröffentlichung.

### Clear Developer Experience

Entwickler können schnell feststellen:

* welche Komponente sie benötigen,
* wie sie verwendet wird,
* welche Regeln gelten,
* welche Alternativen existieren.

### AI Readiness

Ein KI-Agent mit Zugriff auf das Repository kann anhand der vorhandenen Dokumentation zuverlässig:

* Komponenten auswählen,
* deren vorgesehene Verwendung erklären,
* bestehende Regeln einhalten,
* fehlende Entscheidungen erkennen,
* offene Punkte markieren, statt sie selbst zu erfinden.

### Maintainability

Komponenten und Regeln bleiben auch für menschliche Entwickler nachvollziehbar und wartbar.

KI-generierter Code darf keine besondere oder schwer verständliche Sonderstruktur erzeugen.

### Predictable Evolution

Breaking Changes, neue Komponenten und Designänderungen folgen nachvollziehbaren Prozessen und verändern das System nicht unkontrolliert.

## Relationship to the DesignSystem

Die visuelle und konzeptionelle Grundlage ist das Tobit.Software DesignSystem:

https://tappqa.tobit.com/Bodywork/DesignSystem/

Das DesignSystem beschreibt die gewünschte Nutzererfahrung und die visuellen Regeln.

`chayns UI` ergänzt diese Grundlage durch:

* technische Spezifikationen,
* verbindliche Architekturregeln,
* Komponentenverträge,
* Accessibility-Anforderungen,
* maschinenlesbare Entscheidungsgrundlagen,
* wiederverwendbare Implementierungen.

Die im Repository dokumentierten und bestätigten Entscheidungen bilden für die technische Umsetzung die verbindliche Source of Truth.
