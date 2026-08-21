# chayns UI – Agent Instructions

## Project Purpose

`chayns UI` wird als neue modulare React-/TypeScript-UI-Bibliothek für chayns aufgebaut.

Das Ziel ist nicht nur eine Komponentenbibliothek, sondern ein konsistentes, dokumentiertes und KI-fähiges UI-System.

## Current Phase

**The project remains generally in PLANNING AND SPECIFICATION PHASE, with a gate-scoped Milestone 1 implementation exception for Button and IconButton.**

Außerhalb einer dokumentierten READY-Bewertung darf ein Agent:

* keine produktiven React-Komponenten implementieren,
* keine technische Architektur eigenmächtig festlegen,
* keine fehlenden Designentscheidungen erfinden,
* keine Dependencies hinzufügen,
* keine Build-Infrastruktur einführen.

Die auf den 21.08.2026 datierte READY-Bewertung unter `docs/03-components/button/` erlaubt ausschließlich die dort spezifizierte Implementierung von Button und IconButton auf der in ADR 0001–0003 bestätigten Milestone-1-Infrastruktur. Sie ist keine allgemeine Freigabe für weitere Komponenten, APIs, Varianten, Tokens oder Architekturentscheidungen.

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

Für implementierte UI gilt zusätzlich:

* Native HTML-Semantik hat vor ARIA Vorrang; ARIA ergänzt sie nur bei tatsächlichem Bedarf.
* Interaktive Funktionen sind vollständig per Tastatur bedienbar, haben logische Fokusreihenfolge, keinen Keyboard Trap und keinen positiven `tabindex`.
* Focus ist sichtbar; programmatischer Fokus und Fokuswiederherstellung benötigen einen funktionalen, spezifizierten Grund.
* Zustände, Fehler und Statusinformationen werden nicht ausschließlich durch Farbe oder Motion vermittelt.
* `prefers-reduced-motion`, Zoom, Reflow, längere beziehungsweise lokalisierte Texte sowie WCAG-2.2-AA-Target-Size-Anforderungen werden berücksichtigt.
* Automatisierte Prüfungen allein sind kein vollständiger Accessibility-Nachweis; Keyboard-, Screenreader-/Semantik- sowie visuelle Prüfungen sind zusätzlich erforderlich.

### Accessibility Implementation Gate

Eine Core-, Layout- oder Business-Komponente darf nur implementiert oder als fertig betrachtet werden, wenn ihre relevanten Accessibility-Anforderungen eindeutig bestimmt, spezifiziert und prüfbar sind. Das umfasst mindestens Semantik, Accessible Name, Keyboard-Verhalten, Focus, States, Screenreader-/ARIA-Verhalten, Kontrast, Reduced Motion sowie erforderliche Zoom-/Reflow- und Pointer-Anforderungen.

Bei komplexen Interaction Patterns wie Dialog, Menu, Combobox, Tabs, Tooltip, Disclosure oder Drag-and-drop gilt: Native Semantik und bestehende Projektpatterns haben Vorrang. Etablierte Accessibility-Patterns dürfen technische Referenz sein, ersetzen aber keine fehlende Produktentscheidung.

Ist Keyboard-Verhalten, Fokusmanagement, State oder semantische Bedeutung mehrdeutig, greift das Component Implementation Readiness Gate: nicht implementieren beziehungsweise den betroffenen Schritt stoppen, konkrete Klärung einholen und dokumentieren. Kein Agent darf dafür einen Best Guess treffen.

### Internationalization and Localization

Für allgemeine übersetzbare chayns-Anwendungs-/Produkttexte nutzt das Ökosystem das bestehende zentrale Textstring-System. chayns UI führt dafür keine parallele Translation Infrastructure und keine zusätzliche generische Translation Library ein, solange das Textstring-System den Anwendungsfall abdeckt.

Core Components konsumieren grundsätzlich bereits aufgelöste sprachliche Inhalte über ihre bestätigte API oder Composition und kennen keine fachlichen Textstring IDs. Application beziehungsweise zuständige Product-/Business-Schicht wählen und lösen die passenden Textstrings auf. Sichtbare Texte, Accessible Names, Fehlermeldungen, Statusmeldungen, Tooltips und dynamische natürliche Sprache bleiben lokalisierbar.

Textstring-Übersetzung und locale-aware Formatting sind getrennt. Locale, Sprache, Region, Währung und Zeitzone werden nicht voneinander abgeleitet. Komponenten nehmen keine unterstützten Locales, Locale-Quelle, Währung, Zeitzone oder RTL-Unterstützung an. Übersetzbare Sätze werden nicht aus sprachabhängigen Fragmenten zusammengesetzt.

Längere beziehungsweise lokalisierte Texte dürfen nicht durch lokale Schriftverkleinerung oder unspezifizierte feste Textcontainer abgefangen werden. Accessible Names und Screenreader-Texte sind genauso lokalisierbar wie sichtbare Texte.

### Internationalization Implementation Gate

Eine Core-, Layout- oder Business-Komponente ist nicht implementation-ready, wenn ihre korrekte Umsetzung von einer ungeklärten i18n/l10n-Produktentscheidung abhängt, etwa Locale-Quelle, selbst verantwortetem Systemtext, Textstring-Fähigkeit für erforderliche Grammatik, Währung, Zeitzone oder bei geforderter RTL-Unterstützung das richtungsabhängige Verhalten. Das Gate greift nur für tatsächlich relevante Abhängigkeiten.

Kein Agent darf dafür eine Locale, Textstring-Fallback-Policy, Translation Library, Textstring-ID-Konvention, Währung, Zeitzone oder RTL-Anforderung erfinden. Die konkrete Lücke wird gemäß Component Implementation Readiness Gate geklärt und dokumentiert.

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

## Component Implementation Readiness Gate

### No implementation with unresolved interpretation

Vor der Implementierung jeder Core Component, Layout Component oder Business Component müssen sämtliche für die konkrete Umsetzung relevanten Anforderungen eindeutig feststehen. Eine Komponente darf nicht implementiert werden, solange bei einem implementierungsrelevanten Punkt mehrere plausible Interpretationen bestehen.

### Interpretation gaps include

Je Komponente wird geprüft, soweit relevant:

* Zweck und Verantwortung der Komponente,
* Abgrenzung zu anderen Komponenten,
* Use When und Do Not Use When,
* Anatomy und Composition,
* öffentliche API und Props,
* native HTML-Semantik,
* States, Variants und lokale Size Variants,
* Density-Verhalten,
* Tokens, Farben und State-Farben,
* Typography,
* Spacing, Geometrie, Radius, Borders und Shadows,
* Icons,
* Motion,
* Keyboard-, Focus- sowie Screenreader-/ARIA-Verhalten,
* Responsive-/Layout-Verhalten,
* Controlled-/Uncontrolled- und Context-Verhalten,
* Error-, Loading- und Disabled-Verhalten,
* Tests und Acceptance Criteria,
* Abhängigkeiten zu Core, Layout und Business,
* bekannte Edge Cases.

Nicht jeder Punkt ist für jede Komponente relevant. Nicht relevante Punkte dürfen als `not applicable` dokumentiert werden. Kein für die Implementierung relevanter Punkt darf stillschweigend undefiniert bleiben.

### Ambiguity is a blocker

**Ambiguity is an implementation blocker.** Eine implementation-relevant ambiguity liegt beispielsweise vor, wenn:

* zwei oder mehr regelkonforme APIs denkbar sind,
* mehrere visuelle Interpretationen möglich sind,
* mehrere Accessibility-Verhalten plausibel sind,
* unklar ist, welcher Token verwendet werden soll,
* ein fehlender Token neu erfunden werden müsste,
* der richtige State nicht eindeutig bestimmt ist,
* unklar ist, ob Verhalten in Core, Layout, Business oder Application gehört,
* eine Component Specification keine eindeutige Antwort liefert,
* DesignSystem und Repository widersprüchlich sind,
* bestehende Dokumente denselben Fall unterschiedlich beschreiben.

Auch mehrere technisch gleichwertig sinnvolle Lösungen sind eine blockierende Mehrdeutigkeit, solange keine autorisierte Source of Truth eine davon festlegt.

### Required response to ambiguity

Wenn eine solche Mehrdeutigkeit erkannt wird:

1. Implementierung nicht beginnen beziehungsweise den betroffenen Implementierungsschritt stoppen.
2. Keine Annahme treffen.
3. Bestehende Dokumentation und das Decision Register prüfen.
4. Falls dadurch nicht lösbar: die konkrete Frage formulieren.
5. Die Frage der zuständigen menschlichen Rolle oder einer bereits autorisierten Source of Truth zur Klärung vorlegen.
6. Das Ergebnis in den geeigneten Repository-Dokumenten dokumentieren.
7. Erst nach dokumentierter Klärung weiterarbeiten.

### No “best guess” implementation

Ein technisch plausibler Best Guess ist bei implementierungsrelevanten Systementscheidungen nicht zulässig. Dies gilt für KI-Agenten, menschliche Entwickler und Prototypen, die später produktiv übernommen werden sollen.

Ein experimenteller technischer Spike kann später separat erlaubt werden, wenn ausdrücklich dokumentiert ist, dass daraus keine öffentliche API oder Designentscheidung abgeleitet wird. Dieses Dokument legt keine Spike-Regeln fest.

### Definition of Ready for Component Implementation

Eine Core-, Layout- oder Business-Komponente ist erst implementierungsbereit, wenn mindestens gilt:

* ihre Component Specification ist vollständig genug für die Umsetzung,
* alle implementierungsrelevanten Decisions sind CONFIRMED oder technisch innerhalb eines ausdrücklich freigegebenen Rahmens entschieden,
* kein blockierender OPEN-, DESIGN REVIEW- oder TECH REVIEW-Punkt besteht,
* Foundation-Abhängigkeiten eindeutig sind,
* Accessibility-Anforderungen eindeutig sind,
* Test- und Acceptance-Anforderungen definiert sind.

Nicht jeder globale OPEN-Punkt des Projekts muss geschlossen sein. Blockierend sind nur Punkte, die die konkrete Komponente oder ihre notwendigen Grundlagen betreffen.

### Implementation discovered ambiguity

Wird während einer bereits freigegebenen Implementierung ein bislang unbekannter Interpretationsspielraum sichtbar, wird nicht lokal entschieden. Der betroffene Implementierungsschritt wird gestoppt, die Lücke dokumentiert, geklärt und in Specification beziehungsweise Decision Register aktualisiert. Erst danach wird fortgesetzt.

Der bereits begonnene Implementierungsstand ist keine Erlaubnis, eine Entscheidung im Code zu treffen.

Component Development Standard, Component Specification Format, AI Development Rules, Quality Gates und Design-to-Code Process konkretisieren dieses Gate später, dürfen es jedoch nicht abschwächen.

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
