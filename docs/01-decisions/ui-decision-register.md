# chayns UI – UI Decision Register

Das UI Decision Register ist die zentrale, kompakte Übersicht konkreter Entscheidungen für `chayns UI`. Es wird während Planung und Entwicklung fortlaufend gepflegt und ergänzt die ausführlichen Dokumente.

## Status values

* **CONFIRMED** – verbindlich entschieden
* **OPEN** – Entscheidung fehlt noch
* **DESIGN REVIEW** – Abstimmung mit Design/UX erforderlich
* **TECH REVIEW** – technische Ausgestaltung offen
* **SUPERSEDED** – durch eine neuere Entscheidung ersetzt; aktuell nicht verwendet

## Architecture

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| ARCH-001 | ARCH | Core UI, Layout und Business sind logisch getrennt. | CONFIRMED | Architecture, Philosophy | |
| ARCH-002 | ARCH | Core enthält sichtbare UI und generische Interaktion, keine chayns-Daten-/Businesslogik. | CONFIRMED | Architecture, AGENTS.md | |
| ARCH-003 | ARCH | Business nutzt sichtbare UI nur aus Core und gegebenenfalls Layout. | CONFIRMED | Architecture, AGENTS.md | |
| ARCH-004 | ARCH | Layout löst wiederverwendbare Grid-, App-, Workspace-, Panel- und Resize-Probleme. | CONFIRMED | Architecture | |
| ARCH-005 | ARCH | Generische UI-Interaktion darf Teil von Core oder Layout sein. | CONFIRMED | Architecture | |
| ARCH-006 | ARCH | Layout-Zustand wird außerhalb der Layout-Komponente persistent gespeichert. | CONFIRMED | Architecture | |
| ARCH-007 | ARCH | Die logische Architektur ist unabhängig von späteren npm-Paketgrenzen. | CONFIRMED | Architecture | |

## Core UI

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| CORE-001 | CORE | Komponenten werden composition-first entwickelt. | CONFIRMED | Philosophy, AGENTS.md | |
| CORE-002 | CORE | Container verantworten Beziehungen und Abstände ihrer Kindkomponenten. | CONFIRMED | Philosophy, AGENTS.md | |
| CORE-003 | CORE | Einzelne Controls kennen keinen Abstand zu benachbarten Controls. | CONFIRMED | Philosophy, AGENTS.md | |
| CORE-004 | CORE | Native Web-Semantik hat Vorrang; ARIA ergänzt nur bei Bedarf. | CONFIRMED | Philosophy, AGENTS.md | |
| CORE-005 | CORE | Native HTML-Props und Standardevents werden soweit möglich durchgereicht. | CONFIRMED | Architecture, AGENTS.md | |
| CORE-006 | CORE | Core darf notwendige lokale UI-Zustände verwalten. | CONFIRMED | Architecture | |

## Business Components

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| BUS-001 | BUS | Business kapselt Datenbeschaffung, chayns-Integration und fachliche Zustände. | CONFIRMED | Architecture, AGENTS.md | |
| BUS-002 | BUS | Business entwickelt keine parallele eigene UI-Sprache. | CONFIRMED | Architecture, Philosophy | |
| BUS-003 | BUS | Fehlende sichtbare Primitive werden zuerst auf allgemeine Core-Eignung geprüft. | CONFIRMED | Architecture | |
| BUS-004 | BUS | PersonFinder ist konzeptionell Business und wird aus generischem Core aufgebaut. | CONFIRMED | Architecture, Vision | |

## Layout Components

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| LAYOUT-001 | LAYOUT | Layout darf generischen Panel-, Reihenfolge- und Drag-/Resize-Zustand verwalten. | CONFIRMED | Architecture | |
| LAYOUT-002 | LAYOUT | Layout darf Core-Komponenten verwenden. | CONFIRMED | Architecture | |
| LAYOUT-003 | LAYOUT | Produktübergreifende App-, Grid- und Workspace-Layouts werden zentral abgebildet. | CONFIRMED | Architecture, Vision | |
| LAYOUT-004 | LAYOUT | Komplexe Layout-Designregeln benötigen eine eindeutige DesignSystem-Beschreibung. | DESIGN REVIEW | Architecture | App-Layout/Product-Pattern mit Design abstimmen. |

## Design Tokens

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| TOKEN-001 | TOKEN | Komponenten verwenden nur definierte Tokens und CSS Custom Properties. | CONFIRMED | Architecture, AGENTS.md | |
| TOKEN-002 | TOKEN | Komponenten erfinden keine unspezifizierten Zwischenwerte. | CONFIRMED | Philosophy, AGENTS.md | |
| TOKEN-003 | TOKEN | Allgemeine Abstände nutzen die zentrale Skala `--sp-*`. | CONFIRMED | AGENTS.md | |
| TOKEN-004 | TOKEN | Explizit definierte komponentenspezifische Maß-Tokens sind erlaubt. | CONFIRMED | AGENTS.md | |
| TOKEN-005 | TOKEN | Radien stammen aus einer globalen primitiven Skala. | CONFIRMED | AGENTS.md | |
| TOKEN-006 | TOKEN | Der vollständige Token-Katalog wird später spezifiziert. | TECH REVIEW | Architecture | Design-Foundation-/Token-Dokument. |

## Density

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| DENSITY-001 | DENSITY | Globale Nutzerdichten sind S, M und L. | CONFIRMED | AGENTS.md, Architecture | |
| DENSITY-002 | DENSITY | M ist die Standarddichte. | CONFIRMED | AGENTS.md, Architecture | |
| DENSITY-003 | DENSITY | Density stammt aus Nutzer-/Environment-Kontext, nicht je Standardkomponente. | CONFIRMED | Architecture | |
| DENSITY-004 | DENSITY | Standard-Core besitzt keine lokale S/M/L-size-Property. | CONFIRMED | AGENTS.md | |
| DENSITY-005 | DENSITY | Lokale Größen sind nur als explizite Komponentenvarianten erlaubt. | CONFIRMED | AGENTS.md, Architecture | |
| DENSITY-006 | DENSITY | Avatar und Icon sind Beispiele möglicher expliziter lokaler Größen. | CONFIRMED | AGENTS.md | Vollständige Liste im DesignSystem prüfen. |

## Color and Theme

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| COLOR-001 | COLOR | Theme-Inputs umfassen Primary/Accent, Mode, Density, Kontrast, Deficiency und Reduced Motion. | CONFIRMED | AGENTS.md, Architecture | |
| COLOR-002 | COLOR | Core kennt nur resultierende Tokens und Zustände, nicht deren fachliche Herkunft. | CONFIRMED | Architecture | |
| COLOR-003 | COLOR | Die Primärfarbe ist Eingabe für semantische Farb-Tokens. | CONFIRMED | Architecture | |
| COLOR-004 | COLOR | Die verwendete Accent-Farbe darf für Accessibility/Kontrast kalibriert werden. | CONFIRMED | AGENTS.md, Architecture | |
| COLOR-005 | COLOR | Nutzbarkeit und WCAG gehen vor exakter Farbübereinstimmung. | CONFIRMED | AGENTS.md, Architecture | |
| COLOR-006 | COLOR | Die Theme-Resolver-Implementierung ist offen. | OPEN | Architecture | Technische Architekturphase. |

## Typography

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| TYPE-001 | TYPE | chayns UI lädt keine Schriftarten. | CONFIRMED | AGENTS.md, Architecture | |
| TYPE-002 | TYPE | Die Font Family wird global außerhalb der Komponenten bereitgestellt. | CONFIRMED | Architecture | |
| TYPE-003 | TYPE | Aktuelle Grundlage: Roboto; Roboto Mono für technische Inhalte. | CONFIRMED | Architecture | |
| TYPE-004 | TYPE | Typografieparameter dürfen über Tokens verwendet werden. | CONFIRMED | Architecture | |

## Accessibility

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| A11Y-001 | A11Y | Accessibility ist funktionale Korrektheit. | CONFIRMED | Philosophy, AGENTS.md | |
| A11Y-002 | A11Y | WCAG 2.2 AA ist das Mindestniveau. | CONFIRMED | AGENTS.md | |
| A11Y-003 | A11Y | Bekannte Core-WCAG-Verstöße blockieren die Veröffentlichung. | CONFIRMED | AGENTS.md, Vision | |
| A11Y-004 | A11Y | Core ist vollständig per Tastatur bedienbar. | CONFIRMED | AGENTS.md | |
| A11Y-005 | A11Y | Screenreader, sichtbarer Fokus und Fokusführung sind verpflichtend. | CONFIRMED | AGENTS.md | |
| A11Y-006 | A11Y | Informationen werden nicht ausschließlich über Farbe vermittelt. | CONFIRMED | Philosophy | |

## Motion

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| MOTION-001 | MOTION | Animation erklärt Zustandsänderungen und ist kein Selbstzweck. | CONFIRMED | Philosophy | |
| MOTION-002 | MOTION | CSS-Animationen nutzen nur `transform` und `opacity`. | CONFIRMED | AGENTS.md | |
| MOTION-003 | MOTION | `grid-template-rows` ist die Ausnahme für dynamische Höhenübergänge. | CONFIRMED | AGENTS.md, Architecture | |
| MOTION-004 | MOTION | Andere animierte Layout-Eigenschaften sind ausgeschlossen. | CONFIRMED | AGENTS.md | |
| MOTION-005 | MOTION | Listen-Einfügen, -Entfernen und Filter-Ausblendungen nutzen die kurze DesignSystem-Dauer. | CONFIRMED | Planning | |
| MOTION-006 | MOTION | Nicht notwendige Animationen entfallen bei `prefers-reduced-motion`. | CONFIRMED | AGENTS.md | |
| MOTION-007 | MOTION | Notwendige Animationen wie Loading-Spinner dürfen bestehen bleiben. | CONFIRMED | AGENTS.md | |

## Buttons and Actions

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| BUTTON-001 | BUTTON | Ein Action Scope enthält höchstens eine Primary Action. | CONFIRMED | AGENTS.md | |
| BUTTON-002 | BUTTON | Beispiele für Scopes: Page, Card, Dialog, Drawer, Formular, Wizard Step, Accordion-Inhalt. | CONFIRMED | AGENTS.md | |
| BUTTON-003 | BUTTON | Action Scopes sind semantisch, nicht rein aus dem DOM ableitbar. | CONFIRMED | AGENTS.md | |
| BUTTON-004 | BUTTON | Danger markiert destruktive, nicht nur unwiderrufliche Aktionen. | CONFIRMED | AGENTS.md | |
| BUTTON-005 | BUTTON | Aktionen sind Buttons, Navigation ist Links. | CONFIRMED | AGENTS.md | |

## Icons

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| ICON-001 | ICON | Interaktive Icons: Regular in Ruhe, Solid bei Hover/Active. | CONFIRMED | AGENTS.md | |
| ICON-002 | ICON | Informative Icons bleiben Regular. | CONFIRMED | AGENTS.md | |
| ICON-003 | ICON | Fehlende Paare verwenden die verfügbare Variante konsistent. | CONFIRMED | AGENTS.md | |

## Inputs / Form Controls

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| INPUT-001 | INPUT | Floating Labels sind Teil der Input-Komponente. | CONFIRMED | AGENTS.md | |
| INPUT-002 | INPUT | Help Text, Error und Counter sind definierte Control-Slots. | CONFIRMED | AGENTS.md | |
| INPUT-003 | INPUT | Entwickler liefern Inhalte; chayns UI verantwortet Position, Layout und Accessibility. | CONFIRMED | AGENTS.md | |
| INPUT-004 | INPUT | Die öffentliche Form-Control-Composition/API ist offen. | TECH REVIEW | AGENTS.md | Component Development Standard. |

## Accordion

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| ACC-001 | ACC | „Wrapped“ wird nicht als Komponentenlogik verwendet. | CONFIRMED | AGENTS.md | |
| ACC-002 | ACC | Grouped Accordions schließen innerhalb der Gruppe gegenseitig. | CONFIRMED | AGENTS.md | |
| ACC-003 | ACC | Standalone Accordions beeinflussen andere nicht. | CONFIRMED | AGENTS.md | |
| ACC-004 | ACC | Verschachtelung ändert Gruppenverhalten nicht automatisch. | CONFIRMED | AGENTS.md | |
| ACC-005 | ACC | Öffnen und Schließen verwendet die `grid-template-rows`-Motion. | CONFIRMED | AGENTS.md | |
| ACC-006 | ACC | Das DesignSystem beschreibt Grouped vs. Standalone eindeutig. | DESIGN REVIEW | AGENTS.md | Mit Design vorgesehen. |

## Dialogs

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| DIALOG-001 | DIALOG | Dialoge sind nicht nur für Confirm vorgesehen. | CONFIRMED | AGENTS.md | |
| DIALOG-002 | DIALOG | Kleine abgeschlossene Eingaben und Auswahlen sind zulässig. | CONFIRMED | AGENTS.md | |
| DIALOG-003 | DIALOG | Komplexe Workflows gehören in Views oder Drawer. | CONFIRMED | AGENTS.md | |
| DIALOG-004 | DIALOG | Escape entspricht grundsätzlich Cancel. | CONFIRMED | AGENTS.md | |
| DIALOG-005 | DIALOG | Backdrop-Dismiss ist standardmäßig aktiv. | CONFIRMED | AGENTS.md | |
| DIALOG-006 | DIALOG | Backdrop-Dismiss ist deaktivierbar. | CONFIRMED | AGENTS.md | |
| DIALOG-007 | DIALOG | Das DesignSystem bildet den erweiterten Dialog-Einsatz ab. | DESIGN REVIEW | AGENTS.md | Mit Design vorgesehen. |

## Overlays and Tooltips

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| OVERLAY-001 | OVERLAY | Dropdown, Popover, Context Menu und Select sind unterschiedliche UI-Muster. | CONFIRMED | Planning | |
| OVERLAY-002 | OVERLAY | Alte Meeting-Begriffe definieren keine zukünftige öffentliche API. | CONFIRMED | Planning | |
| OVERLAY-003 | OVERLAY | Gemeinsame Overlay-Primitives werden separat spezifiziert. | TECH REVIEW | Planning | |
| TOOLTIP-001 | TOOLTIP | Sichtbare Tooltips nutzen eine eigene zugängliche Komponente. | CONFIRMED | AGENTS.md | |
| TOOLTIP-002 | TOOLTIP | `title` darf ergänzend genutzt werden. | CONFIRMED | AGENTS.md | |
| TOOLTIP-003 | TOOLTIP | `title` ersetzt keinen zugänglichen sichtbaren Hinweis. | CONFIRMED | AGENTS.md | |

## AI

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| AI-001 | AI | KI erfindet keine fehlenden Varianten, APIs, Tokens oder Interaktionsregeln. | CONFIRMED | AGENTS.md, Philosophy | |
| AI-002 | AI | Fehlende Entscheidungen werden als offen erkannt und dokumentiert. | CONFIRMED | AGENTS.md, Philosophy | |
| AI-003 | AI | KI-Code bleibt menschlich verständlich und wartbar. | CONFIRMED | Philosophy, Vision | |
| AI-004 | AI | Dokumentation und maschinenlesbare Spezifikationen gehören zum Produkt. | CONFIRMED | Vision, Philosophy | |
| AI-005 | AI | Das maschinenlesbare Komponenten-Specification-Format ist offen. | OPEN | Architecture | AI Specification Design. |

## Distribution

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| DIST-001 | DIST | React-/TypeScript- und CSS-Artefakte sind unabhängig verteilbar. | CONFIRMED | Architecture | |
| DIST-002 | DIST | Es gibt konzeptionell Baseline CSS plus Patch CSS. | CONFIRMED | Architecture | |
| DIST-003 | DIST | Patch CSS enthält nur Änderungen gegenüber der Baseline. | CONFIRMED | Architecture | |
| DIST-004 | DIST | Patches werden grundsätzlich jährlich in eine neue Baseline überführt. | CONFIRMED | Architecture | |
| DIST-005 | DIST | CSS-Patches setzen keine neue nicht unterstützte DOM-Struktur oder API voraus. | CONFIRMED | Architecture | |
| DIST-006 | DIST | Breaking Structural Changes benötigen koordinierte Komponentenänderungen. | CONFIRMED | Architecture | |
| DIST-007 | DIST | ESM-only ist für die künftige JavaScript-Distribution vorgesehen. | CONFIRMED | Meeting | |
| DIST-008 | DIST | Breaking Changes werden in geplanten Major Releases gebündelt. | CONFIRMED | Meeting | |
| DIST-009 | DIST | Vor Majors kann es eine Preview-/Release-Candidate-Phase geben. | CONFIRMED | Meeting | |
| DIST-010 | DIST | Die vorherige Major erhält danach nur kritische Bugfixes. | CONFIRMED | Meeting | |
| DIST-011 | DIST | CSS-Hosting, Cache, Preload und Versionierung sind offen. | OPEN | Architecture | |

# Open Technical Decisions

Alle folgenden Punkte haben den Status **OPEN**. Sie werden nicht durch Implementierungsentscheidungen stillschweigend gelöst.

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| OPEN-001 | OPEN | Konkrete npm-Paketgrenzen und Package-Namen. | OPEN | Architecture | |
| OPEN-002 | OPEN | Package Manager. | OPEN | Architecture | |
| OPEN-003 | OPEN | Workspace-/Monorepo-Tooling. | OPEN | Architecture | |
| OPEN-004 | OPEN | Bundler. | OPEN | Architecture | |
| OPEN-005 | OPEN | CSS-Build-Pipeline. | OPEN | Architecture | |
| OPEN-006 | OPEN | Design-Token-Quelldatei und Token-Build-Technologie. | OPEN | Architecture | |
| OPEN-007 | OPEN | Mechanismus zum Laden benötigter CSS-Chunks. | OPEN | Architecture | |
| OPEN-008 | OPEN | Hosting-/CDN-/AWS-Struktur. | OPEN | Architecture | |
| OPEN-009 | OPEN | Theme-Resolver-Implementierung. | OPEN | Architecture | |
| OPEN-010 | OPEN | Technische Context-Mechanismen zwischen Containern und Children. | OPEN | Architecture | |
| OPEN-011 | OPEN | Maschinenlesbares Komponenten-Specification-Format. | OPEN | Architecture | |
| OPEN-012 | OPEN | Storybook-/Dokumentationsplattform und Integration. | OPEN | Architecture | |
| OPEN-013 | OPEN | Testing-Stack. | OPEN | Architecture | |
| OPEN-014 | OPEN | Release-Automatisierung. | OPEN | Architecture | |
| OPEN-015 | OPEN | Komponenten-Datei- und Ordnerstruktur. | OPEN | Planning | |
| OPEN-016 | OPEN | Öffentliche Form-Control-Composition/API. | OPEN | Planning | |
| OPEN-017 | OPEN | Technische Overlay-Primitives. | OPEN | Planning | |

# Design Follow-ups

Die folgenden Punkte sind bereits zur Abstimmung mit Design vorgesehen:

* Accordion: Grouped vs. Standalone statt „Wrapped“.
* Definition von Action Scopes und Primary Actions.
* Danger als destruktiv statt ausschließlich unwiderruflich.
* Erweiterter Einsatzbereich von Dialogen.
* Lokale Größenvarianten ausdrücklich pro Komponente dokumentieren.
* Komplexe Layout- und App-Layout-Regeln weiter spezifizieren.

# Maintenance Rules

## Adding a decision

Eine neue verbindliche Entscheidung erhält:

1. eine Kategorie,
2. die nächste freie ID dieser Kategorie,
3. einen eindeutigen Decision-Text,
4. Status,
5. Source,
6. gegebenenfalls Follow-up.

## Changing a decision

Bestätigte Entscheidungen werden nicht stillschweigend überschrieben. Bei einer Änderung wird die alte Entscheidung auf `SUPERSEDED` gesetzt, eine neue Entscheidung mit neuer ID angelegt und aufeinander verwiesen. Rein sprachliche Präzisierungen ohne Bedeutungsänderung dürfen dieselbe Decision aktualisieren.

## Open decisions

OPEN-Punkte werden nicht durch Implementierung stillschweigend geschlossen. Vor Umsetzung müssen sie besprochen, dokumentiert und auf `CONFIRMED`, `TECH REVIEW` oder einen anderen geeigneten Status aktualisiert werden.

## Source of Truth

Das Register ist die schnelle Entscheidungsübersicht; ausführlichere Dokumente liefern Kontext und Begründung. Widersprüche müssen geklärt werden, statt eine Quelle stillschweigend zu bevorzugen.
