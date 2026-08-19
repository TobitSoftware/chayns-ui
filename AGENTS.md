# chayns UI – Agent Instructions

## Project Purpose

`chayns UI` wird als neue modulare React-/TypeScript-UI-Bibliothek für chayns aufgebaut.

Das Ziel ist nicht nur eine Komponentenbibliothek, sondern ein konsistentes, dokumentiertes und KI-fähiges UI-System.

## Current Phase

**The project is currently in PLANNING AND SPECIFICATION PHASE.**

Bis zu einer ausdrücklichen Änderung dieser Regel darf ein Agent:

* keine produktiven React-Komponenten implementieren,
* keine technische Architektur eigenmächtig festlegen,
* keine fehlenden Designentscheidungen erfinden,
* keine Dependencies hinzufügen,
* keine Build-Infrastruktur einführen.

Die aktuelle Aufgabe besteht darin:

* Regeln zu dokumentieren,
* Entscheidungen eindeutig zu erfassen,
* offene Fragen sichtbar zu machen,
* Komponenten später vollständig spezifizierbar zu machen.

## Source of Truth

Die Priorität ist:

1. explizit dokumentierte und bestätigte Entscheidungen im Repository,
2. das aktuelle chayns UI Decision Register,
3. weitere Projektdokumentation unter `docs/`,
4. die externe Design-System-Dokumentation als Designreferenz.

Wenn sich externe Design-Dokumentation und eine explizit dokumentierte chayns-UI-Entscheidung widersprechen, gilt die dokumentierte chayns-UI-Entscheidung.

Fehlende Informationen dürfen niemals durch Vermutungen ersetzt werden. Stattdessen:

* als `OPEN` markieren,
* später dem Decision Register hinzufügen,
* menschliche Klärung anfordern.

## Confirmed Architectural Principles

### Separation of concerns

Es gibt logisch drei Arten wiederverwendbarer Komponenten.

**Core UI**

* enthält die vollständige sichtbare UI,
* Darstellung,
* Layout,
* UI-Interaktion,
* keine Business-Logik,
* keine direkte chayns-API-Abhängigkeit.

**Business Components**

* bauen ausschließlich auf Core-UI-Komponenten auf,
* kapseln Datenbeschaffung,
* chayns-spezifische Integration,
* Auswahl-, Filter- und Business-Logik,
* erzeugen für sichtbare UI keine eigenen alternativen UI-Strukturen außerhalb von Core.

**Layout Components**

* bilden komplexere wiederverwendbare Layout-Strukturen ab,
* z. B. Grid-/App-Layouts,
* verschiebbare oder einklappbare Bereiche,
* werden nicht von jeder Anwendung benötigt,
* bilden aber eine gemeinsame Basis für mehrere Produkte.

### Composition first

Komponenten sollen grundsätzlich durch Komposition aufgebaut werden.

Container sind für Beziehungen, Gruppierungen und Abstände zwischen Elementen verantwortlich. Einzelne Controls sollen ihre Position zu benachbarten Komponenten nicht eigenständig bestimmen.

### Native web semantics

Native HTML-Semantik soll bevorzugt werden.

* Aktionen basieren grundsätzlich auf `<button>`.
* Navigation basiert grundsätzlich auf `<a>`.
* Native HTML-Props und Events sollen möglichst weitergereicht werden.

### Accessibility

Accessibility ist Bestandteil jeder Komponente und kein optionales Feature.

Verbindliche Anforderungen:

* vollständige Tastaturbedienbarkeit,
* Screenreader-Kompatibilität,
* sinnvoller Fokus,
* sichtbare Fokuszustände,
* native Semantik bevorzugen,
* WCAG 2.2 AA.

Eine Core-Komponente darf später nicht veröffentlicht werden, solange bekannte WCAG-2.2-AA-Verstöße bestehen.

### Density

Es existieren drei globale Nutzerdichten:

* S
* M
* L

Standard ist M.

Core-Komponenten besitzen grundsätzlich **keine lokale S/M/L-size-Prop**. Eine lokale Größenvariante darf nur existieren, wenn sie als eigenständige Designvariante für die jeweilige Komponente ausdrücklich vorgesehen ist, z. B. bei Avatar oder Icon.

### Styling

* kein CSS-in-JS,
* Standard-CSS oder Build-Time-CSS mit normalem CSS-Output,
* Komponenten verwenden Design Tokens und CSS Custom Properties,
* keine frei erfundenen Styling-Werte in Komponenten,
* Fonts werden nicht durch die Komponenten geladen oder global gesetzt.

### Theme inputs

Der spätere Theme-/Environment-Layer erhält nur globale Eingaben wie:

* Primary / Accent Color,
* Color Mode,
* Density,
* Contrast Mode,
* Color-Deficiency Mode,
* Reduced Motion.

Daraus werden semantische CSS-Tokens abgeleitet.

Accessibility hat Vorrang vor exakter Farbübereinstimmung. Eine Eingabefarbe darf angepasst werden, wenn dies für ausreichenden Kontrast notwendig ist.

### Spacing and radius

Allgemeine Abstände verwenden die definierte Spacing-Skala, z. B. `--sp-*`.

Wenn das Design-System ausdrücklich komponentenspezifische Maß-Tokens definiert, dürfen diese verwendet werden, z. B. `--btn-py`.

Radien basieren auf einer global definierten Radius-Skala. Komponenten dürfen keine eigenen Zwischenwerte erfinden.

### Motion

Für CSS-Animationen sind grundsätzlich nur folgende Eigenschaften vorgesehen:

* `transform`
* `opacity`

Zusätzlich ist `grid-template-rows` als gezielte Ausnahme für dynamische Höhenübergänge zulässig, insbesondere für Accordions.

Keine anderen animierten Layout-Eigenschaften erfinden.

Bei `prefers-reduced-motion` werden nicht notwendige Animationen deaktiviert. Animationen, die für das Verständnis eines Zustands notwendig sind, z. B. ein Loading-Spinner, dürfen bestehen bleiben.

### Icons

* interaktive Icons sind im Ruhezustand Regular,
* bei Hover/Active werden sie Solid,
* rein informative Icons bleiben Regular,
* wenn keine passende Regular-/Solid-Paarung existiert, wird die verfügbare Variante konsistent verwendet.

### Primary actions

Innerhalb eines abgeschlossenen Action Scope existiert höchstens eine Primary Action.

Ein Action Scope kann beispielsweise sein:

* Page,
* Card,
* Dialog,
* Drawer,
* Formular,
* Wizard Step,
* abgeschlossener Accordion-Inhalt.

Die genaue Scope-Grenze ist eine semantische UI-Entscheidung und darf nicht blind allein anhand eines DOM-Containers angenommen werden.

### Destructive actions

Danger wird für destruktive Aktionen verwendet, nicht nur für technisch unwiderrufliche Aktionen.

### Dialogs

Dialoge sind für kleine, abgeschlossene Interaktionen vorgesehen, z. B.:

* Confirm,
* Umbenennen,
* einfache Eingaben,
* kleine Auswahl.

Komplexe Bearbeitung und größere Workflows gehören in andere UI-Strukturen wie Drawer oder eigene Views.

Escape entspricht grundsätzlich Cancel.

Backdrop-Dismiss ist standardmäßig erlaubt, muss aber überschreibbar sein.

### Tooltips

Für sichtbare Tooltips wird später eine eigene zugängliche Tooltip-Komponente verwendet.

Das native `title`-Attribut darf ergänzend verwendet werden, ersetzt aber nicht die zugängliche Tooltip-Komponente für relevante sichtbare Hinweise.

### Accordions

Es wird nicht nach „Wrapped“ unterschieden.

Stattdessen gilt:

* Grouped Accordion: mehrere Items hängen logisch zusammen und schließen sich innerhalb der Gruppe gegenseitig.
* Standalone Accordion: unabhängig von anderen Accordions.

Verschachtelung verändert dieses Verhalten nicht automatisch.

### Input / Form Control

Das Floating Label ist Bestandteil der Input-Komponente.

Help Text, Error und Counter sollen als definierte UI-Bestandteile bzw. Slots des Controls behandelt werden.

Entwickler definieren den Inhalt; chayns UI definiert Position, Layout und Accessibility.

## Rules for AI-assisted Development

AI agents must never invent APIs, component variants, design tokens or interaction rules that have not been defined.

Wenn eine Entscheidung fehlt:

1. nicht implementieren,
2. als offen markieren,
3. auf Klärung warten.

Der Agent soll bestehende Regeln lieber wiederverwenden als neue Sonderfälle einzuführen.

## Documentation Strategy

Das Repository wird schrittweise folgende Dokumente erhalten:

* Vision
* Philosophy
* Architecture
* UI Decision Register
* Design Foundations
* Design Tokens
* Density
* Color System
* Motion
* Accessibility
* Component Development Standard
* AI Development Rules
* Component Selection Rules
* Specification Format
* Release Strategy
* Quality Gates
* Design-to-Code Process

Diese Dokumente noch nicht eigenständig vollständig erzeugen.

## External Design Reference

Die externe UI-Dokumentation unter [chayns Design System](https://tappqa.tobit.com/Bodywork/DesignSystem/) ist die zentrale Designreferenz. Bestätigte Entscheidungen innerhalb dieses Repositories können sie für die technische chayns-UI-Umsetzung präzisieren oder bewusst abweichend festlegen.
