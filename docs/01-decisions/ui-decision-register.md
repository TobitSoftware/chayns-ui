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
| CORE-007 | CORE | Eine Core-, Layout- oder Business-Komponente darf nicht implementiert werden, solange implementierungsrelevante Interpretationsspielräume oder ungeklärte Anforderungen bestehen. Diese müssen vor der Implementierung explizit geklärt und dokumentiert werden. | CONFIRMED | Planning | Component Development Standard, AI Development Rules, Quality Gates |
| CORE-008 | CORE | Wiederverwendbare Komponenten ermöglichen locale-aware Inhalte und Formate, ohne Locale, Sprache, Region, Währung, Zeitzone, RTL-Verhalten oder Translation-Infrastruktur selbst anzunehmen. Implementierungsrelevante ungeklärte i18n/l10n-Entscheidungen blockieren die Komponente bis zur dokumentierten Klärung. | SUPERSEDED | Planning | Superseded by CORE-009. |
| CORE-009 | CORE | Für allgemeine chayns-Anwendungs-/Produkttexte ist das bestehende zentrale Textstring-System die vorgesehene Translation Infrastructure; chayns UI baut kein paralleles Übersetzungssystem. Core Components bleiben grundsätzlich von Textstring-Details entkoppelt und konsumieren aufgelöste Inhalte. Translation und locale-aware Formatting sind getrennte Verantwortlichkeiten. | CONFIRMED | Planning | Internationalization/Localization Foundation, Component Development Standard, AI Development Rules, Quality Gates |
| CORE-010 | CORE | Jede öffentliche Component und jeder öffentliche Compound Part reicht kompatible Standard-Props des repräsentierten nativen Elements weiter. Eigene Props nehmen ausschließlich präzise dokumentierte Kollisionen für Semantik, State, Beziehungen oder DOM-Placement aus; Native Props dürfen weder stillschweigend verloren gehen noch unbeabsichtigt überschrieben werden. | CONFIRMED | Bodywork component finalization plan | Component Specifications führen eine Prop-Ownership-Map. |
| CORE-011 | CORE | Compound Components werden nur für bestätigte semantische Parent/Child-Beziehungen eingesetzt, die gemeinsame Zustände, Beziehungen oder DOM-Verantwortung benötigen. Visuelle Anatomy allein rechtfertigt keine öffentliche Subcomponent. | CONFIRMED | Bodywork component finalization plan | Parent-/Child-, Context-, DOM-/Ref- und Accessibility-Vertrag je Part dokumentieren. |
| CORE-012 | CORE | Für die Komponentenfinalisierung ist Bodywork die visuelle und konzeptionelle Referenz. Interaktionen, die Bodywork nicht festlegt, folgen der Semantik und dem Standardverhalten des dargestellten nativen HTML-Elements. | CONFIRMED | User decision, 2026-09-17 | Component Specifications dokumentieren jede Bodywork-Abweichung ausdrücklich. |
| CORE-013 | CORE | Die Canonical API verwendet die kleinste eindeutige Composition-Form. `children`, deklarative Props und benannte Slots haben Vorrang; Compound Parts benötigen eine bestätigte semantische Parent/Child-Beziehung mit dokumentiertem DOM-/Ref-/Accessibility-Vertrag. | CONFIRMED | Composition/Compound API rework plan | Jede Component Specification dokumentiert Canonical und Advanced Composition. |
| CORE-014 | CORE | Endliche öffentliche Varianten werden als String-Union-Type und passendes `as const`-Runtime-Array oder -Objekt veröffentlicht. TypeScript-Enums sind kein Standard; offene Native-Werte erhalten keine künstlich unvollständige Runtime-Liste. | CONFIRMED | Composition/Compound API rework plan | Storybook Controls verwenden denselben bestätigten Wertebestand. |
| CORE-015 | CORE | Semantisch bestätigte Parent-/Child-Beziehungen werden als öffentliche Compound APIs beschrieben. Der technische Context-Mechanismus bleibt davon getrennt und muss über OPEN-010 geklärt werden. | CONFIRMED | User decision, 2026-09-21 | Compound Parts, Parent-/Child- und Accessibility-Verträge je Component Specification abschließen. |
| CORE-016 | CORE | Application/Product liefert Locale und Zeitzone. Core Components erhalten aufgelöste Inhalte, verantworten keine eigenen fachlichen Standardtexte und leiten RTL nicht automatisch aus Locale oder Sprache ab. RTL wird erst bei einer expliziten Produktanforderung umgesetzt. | CONFIRMED | User decision, 2026-09-21 | Ersetzt die offenen Produktannahmen OPEN-018, OPEN-019, OPEN-020 und OPEN-022. |
| CORE-017 | CORE | Der technische Context-Mechanismus für bestätigte Compound APIs ist React Context. Er wird auf dokumentierte semantische Parent-/Child-Beziehungen und deren gemeinsamen State begrenzt. | CONFIRMED | User decision, 2026-09-21 | Supersedes OPEN-010. Jede Specification beschreibt die Context-Werte und Grenzen. |
| CORE-018 | CORE | Form Controls verwenden öffentliche Compound Parts für Label, Description, Help, Error und Counter, sofern der jeweilige Part für die Komponente relevant ist. Der Parent besitzt Position, Accessibility-Verknüpfung und gemeinsamen State. | CONFIRMED | User decision, 2026-09-21 | Component Specifications müssen Part-, DOM-/Ref- und Accessibility-Verträge konkretisieren. |

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
| LAYOUT-004 | LAYOUT | Komplexe Layout-Designregeln benötigen eine eindeutige DesignSystem-Beschreibung. | SUPERSEDED | User decision, 2026-09-21 | Superseded by LAYOUT-005/006: AppLayout is a generic product-independent shell contract. |
| LAYOUT-005 | LAYOUT | AppLayout ist eine wiederverwendbare Layout-Komponente für 64px-Header, linke Navigation und Content-Fläche; sie enthält keine Routing-, Business- oder Persistenzlogik. | CONFIRMED | AppLayout specification, User input | |
| LAYOUT-006 | LAYOUT | AppLayout erhält Logo-URL, rekursive Items, `onClick(id)`, optionales `activeItemId` und Consumer-`children`; Header-Aktionen sind zunächst nicht Teil der API. | CONFIRMED | AppLayout specification, User input | |
| LAYOUT-007 | LAYOUT | Parent- und Child-Navigationseinträge sind jeweils klickbar; Items sind rekursiv. | CONFIRMED | User input | Disclosure- und Dual-Action-Semantik separat klären. |
| LAYOUT-008 | LAYOUT | Sidebar-Collapse unterstützt interne Standardsteuerung und optional kontrollierte Steuerung; der Toggle sitzt unten links. | CONFIRMED | User input | |
| LAYOUT-009 | LAYOUT | Logo wird als Bild- oder SVG-URL übergeben; `items[].icon` ist ein Font-Awesome-String. | CONFIRMED | User input | Exaktes Stringformat und Rendergrenze offen. |
| LAYOUT-010 | LAYOUT | Aktiver Navigationseintrag wird über `activeItemId` von außen geliefert. | CONFIRMED | User input | Verhalten aktiver Ancestors und Disclosure offen. |
| LAYOUT-011 | LAYOUT | Die AppLayout-Implementierung bleibt blockiert, bis Semantik, Tokens, Responsive-Verhalten und Accessibility eindeutig bestätigt sind. | CONFIRMED | Component Implementation Readiness Gate | |
| LAYOUT-012 | LAYOUT | AppLayout verwendet denselben Font-Awesome-Vertrag wie IconButton: `fa-*`-Name; Regular ist der Ruhezustand, Solid wird bei Interaktion verwendet. | CONFIRMED | IconButton contract, User input | |
| LAYOUT-013 | LAYOUT | Parent-Items verwenden einen separaten nativen Action-Button und Disclosure-Button; Action löst `onClick(id)` aus, Disclosure ändert nur den offenen Zustand. | CONFIRMED | User input, AppLayout specification | |
| LAYOUT-014 | LAYOUT | Die Sidebar bleibt auf kleinen Viewports eine feste linke Spalte; eine automatische Overlay-/Drawer-Variante ist nicht Teil der Implementierung. | CONFIRMED | User input | |
| LAYOUT-015 | LAYOUT | Eingeklappte Items bleiben tastaturerreichbar und behalten ihren Accessible Name; nur sichtbare Labels werden ausgeblendet. | CONFIRMED | User input | |
| LAYOUT-016 | LAYOUT | Das Logo ist dekorativ und wird mit leerem `alt` gerendert. | CONFIRMED | User input | |
| LAYOUT-017 | LAYOUT | Collapse- und Expand-Labels werden als lokalisierbare Pflicht-Props übergeben. | CONFIRMED | User input, Internationalization | |
| LAYOUT-018 | LAYOUT | AppLayout wird als `@chayns-ui/layout` mit React- und `@chayns-ui/core`-Peer-Dependencies veröffentlicht. | CONFIRMED | User input | |
| LAYOUT-019 | LAYOUT | AppLayout animiert den Wechsel zwischen expandierter und eingeklappter Sidebar über `grid-template-columns`; die Content-Fläche verschiebt sich synchron. | CONFIRMED | User input | AppLayout-spezifische Motion-Ausnahme. |
| LAYOUT-020 | LAYOUT | Tabs ist als Layout-Komponente mit einem `tabs`-Array vorgesehen; jeder Eintrag liefert `icon`, `name`, `isActive`, `onClick` und `content`. | CONFIRMED | User input, Tabs specification | Specification remains blocked until interaction details are confirmed. |
| LAYOUT-021 | LAYOUT | Der aktive Tab inklusive optionalem Remove-Control verwendet als durchgehende Fläche `--surface` mit gemeinsamer oberer Rundung und `--accent` als Text-/Icon-Farbe; inaktive Tabs und Remove-Controls verwenden eine 10%-`--surface`-Überlagerung und den kontrastberechneten `--on-accent`-Text-/Icon-Token. Das Remove-Icon ist kleiner. Tab-Leiste und Add-Button bleiben transparent. | CONFIRMED | User input, token catalogue | No additional active indicator is used; geometry follows the implemented token contract. |
| LAYOUT-022 | LAYOUT | Tabs rendert ausschließlich den Inhalt des aktiven Eintrags. | CONFIRMED | User input, Tabs specification | Behavior for zero or multiple active entries remains open. |
| LAYOUT-023 | LAYOUT | Tabs verwendet das ARIA-Tabs-Pattern mit Pfeiltasten-Navigation, Roving Tabindex, native Buttons als Aktivierungselemente und automatischer Aktivierung; Pfeilnavigation ist zyklisch und Home/End springen an den Anfang beziehungsweise das Ende. | CONFIRMED | User input, Accessibility specification | Invalid active-state handling remains open. |
| LAYOUT-024 | LAYOUT | Die Tabs-Implementierung bleibt blockiert, bis State-Synchronisation, Accessibility, Responsive-Verhalten, Tokens und DOM-Vertrag eindeutig bestätigt sind. | SUPERSEDED | Component Implementation Readiness Gate | Superseded by LAYOUT-027 after Tabs contract confirmation. |
| LAYOUT-025 | LAYOUT | Bei Tabs wird bei keinem aktiven Eintrag der erste Eintrag, bei mehreren aktiven Einträgen der erste aktive Eintrag als Auswahl behandelt. | CONFIRMED | User input, Tabs specification | Verhalten bei nachträglich inkonsistentem Consumer-State bleibt zu prüfen. |
| LAYOUT-026 | LAYOUT | Bei zu wenig verfügbarer Breite blendet Tabs die sichtbaren Namen aus und zeigt nur die Icons; die Namen bleiben als Accessible Names erhalten. | CONFIRMED | User input, Tabs specification | The responsive trigger is a CSS container query. |
| LAYOUT-027 | LAYOUT | Tabs verwendet den bestätigten DOM-, Panel-, Fokus-, State-, Responsive- und Motion-Vertrag aus der Tabs-Spezifikation und ist implementierungsbereit. | CONFIRMED | User input, Tabs specification, Tabs readiness assessment | |
| LAYOUT-028 | LAYOUT | Ein Tab kann optional `onRemove` liefern; dann wird rechts ein `fa-xmark`-Affordance innerhalb desselben nativen Tab-Buttons gerendert. Klick auf das Icon sowie Delete/Backspace bei Fokus lösen `onRemove` aus. | CONFIRMED | User input, Tabs specification | |
| LAYOUT-029 | LAYOUT | Tabs kann optional über `onAdd` und `addLabel` einen separaten `fa-plus`-Button zum Hinzufügen rendern. | CONFIRMED | User input, Tabs specification | |
| LAYOUT-030 | LAYOUT | Der Hover-/Fokus-/Active-Overlay für AppLayout-Navigationseinträge und den Collapse-Button (`color-mix(in srgb, var(--on-accent) …%, transparent)` über `--accent`) wird mit 12% statt 16% `--on-accent`-Anteil gerendert. Bei 16% unterschreitet der resultierende Kontrast zwischen `--on-accent`-Text und der aufgehellten `--accent`-Fläche im Light-Mode 4,5:1 (gemessen 4,3:1, automatisiert per Storybook-a11y-Test erkannt); 12% ergibt rechnerisch 4,66:1 (Light) bzw. 6,85:1 (Dark) und behält damit denselben Overlay-Mechanismus bei. | CONFIRMED | Accessibility Implementation Gate (WCAG 2.2 AA color-contrast), gemessen bei `feature/app-layout`-Merge-Verifikation | Betrifft nur den Mix-Anteil, nicht Token-Werte selbst (`--accent`, `--on-accent` unverändert). |
| LAYOUT-031 | LAYOUT | Tabs verwendet die Compound API `Tabs`, `Tabs.List`, `Tabs.Tab value`, `Tabs.Panel value` und optional `Tabs.Add`; `value`, `defaultValue` und `onValueChange` bilden den kontrollierten beziehungsweise unkontrollierten Auswahlvertrag. | CONFIRMED | Bodywork component finalization plan | Ersetzt die `tabs[]`-API bei der nächsten Spec- und Gate-Revision. |
| LAYOUT-032 | LAYOUT | AppLayout verwendet die Compound API `AppLayout.Header`, `AppLayout.Logo`, `AppLayout.Navigation`, rekursives `AppLayout.Navigation.Item`, `AppLayout.Content` und `AppLayout.CollapseToggle`; die bisherigen `logo`, `headerContent` und `items[]`-Props entfallen. | CONFIRMED | Bodywork component finalization plan | Bestehende AppLayout-Specification und Gate müssen vor Code-Migration aktualisiert werden. |
| LAYOUT-033 | LAYOUT | Bei einer Tab-Entfernung meldet `Tabs.Tab` den Wert über `onRemove(value)`; der Consumer entfernt den Tab und setzt bei kontrollierter Nutzung selbst den nächsten `value`. Tabs wählt keinen Ersatzwert implizit. | CONFIRMED | User decision, 2026-09-17 | Uncontrolled Entfernen und Focus-Verhalten spezifizieren. |
| LAYOUT-034 | LAYOUT | `AppLayout.Navigation.Item` rendert bei `href` einen nativen Link und ohne `href` einen nativen Button. Parent-Items erhalten unabhängig davon einen separaten Disclosure-Button; beide Modi besitzen denselben rekursiven Children-Vertrag. | CONFIRMED | User decision, 2026-09-17 | Active-, Disclosure-, Native-Prop- und Focus-Vertrag spezifizieren. |
| LAYOUT-035 | LAYOUT | `AppLayout.Navigation.Item` markiert den aktiven Eintrag über ein eigenes `isActive`-Boolean; bei einem Link ergänzt AppLayout `aria-current="page"`. | CONFIRMED | User decision, 2026-09-17 | Visual- und Disclosure-Vertrag spezifizieren. |
| LAYOUT-036 | LAYOUT | Die stabilen Werte von Tabs sind ausschließlich Strings. | CONFIRMED | User decision, 2026-09-17 | |

## Design Tokens

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| TOKEN-001 | TOKEN | Komponenten verwenden nur definierte Tokens und CSS Custom Properties. | CONFIRMED | Architecture, AGENTS.md | |
| TOKEN-002 | TOKEN | Komponenten erfinden keine unspezifizierten Zwischenwerte. | CONFIRMED | Philosophy, AGENTS.md | |
| TOKEN-003 | TOKEN | Allgemeine Abstände nutzen die zentrale Skala `--sp-*`. | CONFIRMED | AGENTS.md | |
| TOKEN-004 | TOKEN | Explizit definierte komponentenspezifische Maß-Tokens sind erlaubt. | CONFIRMED | AGENTS.md | |
| TOKEN-005 | TOKEN | Radien stammen aus einer globalen primitiven Skala. | CONFIRMED | AGENTS.md | |
| TOKEN-006 | TOKEN | Der vollständige Token-Katalog deckt alle Foundation-Kategorien ab und führt unbelegte Einzelwerte ausdrücklich als OPEN-Lücken. Eine Lücke blockiert nur Components, die diesen Wert benötigen; Werte werden nicht geschätzt. | CONFIRMED | User decision, 2026-09-21 | Katalogisierung und Evidence-Transfer fortführen; komponentenrelevante Lücken bleiben Gate-relevant. |
| TOKEN-007 | TOKEN | Globale Motion-Durations- und Easing-Werte werden als Foundation-Primitives definiert und nicht komponentenweise frei erfunden. | CONFIRMED | User decision, 2026-09-21 | Konkrete Werte und DesignSystem-Evidence bleiben Gegenstand von OPEN-023/MOTION-009. |
| TOKEN-008 | TOKEN | Form Controls und MessageBox erhalten einen separaten Foundation-Transfer mit belegten Werten und einem dokumentierten Component-Mapping. Bodywork- und Repository-Evidence bestimmen die Übernahme; fehlende Werte werden nicht geschätzt. | CONFIRMED | User decision, 2026-09-17 | Input-Padding sowie Success-/Warning-Rollen übertragen; weitere Bodywork-Rollen prüfen. |
| TOKEN-009 | TOKEN | Der vollständige Token-Katalog deckt alle Foundation-Kategorien ab: Spacing, Radius, Typography, Color, Border, Shadow, Z-Layer, Motion und Density. Jede konkrete Zuordnung benötigt DesignSystem- oder Repository-Evidence. | CONFIRMED | User decision, 2026-09-21 | TOKEN-006 bleibt für die technische Katalogisierung und Evidence-Übertragung relevant. |
| TOKEN-010 | TOKEN | Belegte Motion-Werte werden als semantische Tokens `--motion-duration-micro`, `--motion-duration-short`, `--motion-duration-medium`, `--motion-duration-long`, `--motion-ease-enter`, `--motion-ease-exit` und `--motion-ease-constant` geführt. | CONFIRMED | User decision, 2026-09-21; DesignSystem token catalogue | Components mappen bestätigte Motion-Patterns auf diese Tokens. |

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
| COLOR-006 | COLOR | Die Theme-Resolver-Implementierung liegt im Tokens-Package. Der Resolver verarbeitet nur bestätigte globale Theme-/Environment-Eingaben und erzeugt semantische CSS-Tokens; Core Components berechnen keine Theme-Werte selbst. | CONFIRMED | User decision, 2026-09-21 | Resolver-Schnittstelle und bestätigte Eingabematrix dokumentieren. |

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
| A11Y-007 | A11Y | Eine Core-, Layout- oder Business-Komponente darf nur implementiert oder als fertig betrachtet werden, wenn ihre relevanten Accessibility-Anforderungen eindeutig spezifiziert und prüfbar sind. Mehrdeutige Interaction Patterns blockieren die Implementierung bis zur dokumentierten Klärung. | CONFIRMED | Planning | Accessibility, Component Development Standard, Quality Gates |

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
| MOTION-008 | MOTION | Motion-Umsetzung priorisiert Rendering-Performance. Animationen laufen ausschließlich über compositor-fähige Properties (`transform`, `opacity`); layout-triggernde Properties sind nur als explizit dokumentierte, seltene Einzel-Element-Ausnahme zulässig (aktuell `grid-template-rows` für Accordion gemäß MOTION-003 sowie `grid-template-columns` für den AppLayout-Sidebar-Collapse gemäß LAYOUT-019). JS-Bibliotheken oder -Muster, die Layout aus mehreren Elementen pro Frame lesen/schreiben (u. a. FLIP, Motion/Framer-Motion `layout`-Prop), sind nicht zulässig. Notwendige Animationen werden dadurch nicht weggelassen, sondern performant gelöst; eine Performance-Schwachstelle in chayns UI reproduziert sich sonst in jedem Consumer-Projekt. Jede weitere layout-triggernde Komponenten-Ausnahme über die zwei genannten hinaus benötigt eine eigene dokumentierte Performance-Prüfung nach diesem Muster, keine stillschweigende Erweiterung. | CONFIRMED | User decision (Performance-Mandat), baut auf MOTION-002/003/004 auf | |
| MOTION-009 | MOTION | Motion-Duration und Easing werden als globale Foundation-Primitives definiert; Component Specifications wählen daraus und erfinden keine lokalen Werte. | CONFIRMED | User decision, 2026-09-21 | Konkrete Werte sind in TOKEN-010 und dem Token Catalogue belegt. |
| MOTION-010 | MOTION | Reduced Motion wird über `prefers-reduced-motion` im CSS umgesetzt. Nicht notwendige Motion entfällt; notwendige Motion bleibt nur bei bestätigter pattern-spezifischer Begründung bestehen. | CONFIRMED | User decision, 2026-09-21 | Components dokumentieren relevante Reduced-Motion-Zustände. |

## Buttons and Actions

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| BUTTON-001 | BUTTON | Ein Action Scope enthält höchstens eine Primary Action. | CONFIRMED | AGENTS.md | |
| BUTTON-002 | BUTTON | Beispiele für Scopes: Page, Card, Dialog, Drawer, Formular, Wizard Step, Accordion-Inhalt. | CONFIRMED | AGENTS.md | |
| BUTTON-003 | BUTTON | Action Scopes sind semantisch, nicht rein aus dem DOM ableitbar. | CONFIRMED | AGENTS.md | |
| BUTTON-004 | BUTTON | Danger markiert destruktive, nicht nur unwiderrufliche Aktionen. | CONFIRMED | AGENTS.md | |
| BUTTON-005 | BUTTON | Aktionen sind Buttons, Navigation ist Links. | CONFIRMED | AGENTS.md | |
| BUTTON-016 | BUTTON | Button, IconButton und SplitButton verwenden den gemeinsamen exportierten Variantensatz `primary`, `outline`, `ghost`, `danger`; die Runtime-Repräsentation ist `BUTTON_VARIANTS`. | CONFIRMED | Composition/Compound API rework plan, BUTTON-006 | Icon-Namen bleiben der offenen `fa-${string}`-Konvention unterworfen. |

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
| INPUT-004 | INPUT | Die öffentliche Form-Control-Composition/API ist offen. | SUPERSEDED | AGENTS.md | Superseded by INPUT-005 and INPUT-006. |
| INPUT-005 | INPUT | TextField und TextArea benötigen immer ein sichtbares `label`; eine ausschließlich programmatiche Benennung ist für diese initialen Komponenten nicht vorgesehen. | SUPERSEDED | User decision, 2026-09-17 | Superseded by INPUT-011. |
| INPUT-006 | INPUT | TextField und TextArea erhalten Help Text, Error und Counter als direkte öffentliche Props. Die Komponenten verantworten ihre Position, lokale ID-Beziehungen und die korrekte Verknüpfung mit dem nativen Control. | CONFIRMED | User decision, 2026-09-17 | Exakte Prop-Typen, Priorität und Counter-Semantik in den Component Specifications festlegen. |
| INPUT-007 | INPUT | Checkbox und Switch benötigen immer ein sichtbares `children`-Label; eine ausschließlich programmatiche Benennung ist für diese initialen Komponenten nicht vorgesehen. | CONFIRMED | User decision, 2026-09-17 | |
| INPUT-008 | INPUT | RadioGroup benötigt für native Form-Übermittlung ein Pflicht-`name`; die Gruppe gibt ihn an ihre Radios weiter. | CONFIRMED | User decision, 2026-09-17 | |
| INPUT-009 | INPUT | `counter` ist ein bereits aufgelöster `ReactNode`; TextField und TextArea berechnen im initialen Vertrag keinen Zeichen-Zähler aus `value` oder `maxLength`. | CONFIRMED | User decision, 2026-09-17 | |
| INPUT-010 | INPUT | Help Text und Error bleiben bei gleichzeitigem Vorkommen sichtbar und sind beide mit dem nativen Control verknüpft; bei Error setzt die Komponente zusätzlich `aria-invalid`. | CONFIRMED | User decision, 2026-09-17 | Verknüpfungsreihenfolge und Live-Region in der Specification festlegen. |
| INPUT-011 | INPUT | TextField und TextArea besitzen keinen eigenen `label`-Prop und kein Floating-Label. Sie leiten den nativen `placeholder` direkt weiter. Für eine zugängliche Benennung verwenden Consumer kompatible `aria-label`- oder `aria-labelledby`-Props. | SUPERSEDED | User decision, 2026-09-17 | Superseded by INPUT-012. |
| INPUT-012 | INPUT | TextField und TextArea besitzen keinen eigenen `label`-Prop. Ihr öffentlicher `placeholder` ist die Bodywork-Floating-Beschriftung: leer im Control, bei Fokus oder Inhalt verkleinert auf der oberen Border. Die Komponente verknüpft sie als natives `label` mit dem Control; der intern verwendete Leerzeichen-Placeholder dient ausschließlich `:placeholder-shown`. | CONFIRMED | User decision, 2026-09-17 | Die Bodywork-Beispiele „Suche (Pill)“ gehören nicht zu diesen Komponenten. |
| INPUT-013 | INPUT | TextField unterstützt Passwortfelder über den nativen `type="password"`-Wert und passende native Passwort-Attribute wie `autoComplete`. Es gibt dafür keine eigene Toggle- oder Sichtbarkeits-API. | CONFIRMED | Composition/Compound API rework plan, 2026-09-21 | Eine Passwortsichtbarkeit darf erst mit eigener bestätigter API eingeführt werden. |
| COMBO-001 | COMBO | ComboBox ist ein editierbares ARIA-Combobox-Control mit nativer Input-Semantik und Popup-Optionen. | CONFIRMED | User decision, 2026-09-21 | Bodywork `#picker` geprüft 2026-09-21. |
| COMBO-002 | COMBO | ComboBox verwendet `ComboBox.Option` als Compound Child mit React Context; Option besitzt einen eindeutigen string `value` und sichtbare `children`. | CONFIRMED | User decision, 2026-09-21 | Parent, Context, DOM-/Ref-Owner und Accessibility-Vertrag sind in der Specification festzuhalten. |
| COMBO-003 | COMBO | ComboBox filtert Optionen, erlaubt freien Text, stellt bei Escape den letzten bestätigten Text wieder her und committed den aktuellen Text bei Blur. | CONFIRMED | User decision, 2026-09-21 | Keyboard-Details und Event-Reihenfolge in der Specification festhalten. |
| COMBO-004 | COMBO | ComboBox verwendet ohne `multiple` string-basierte `value`-/`defaultValue`-Props und `onValueChange(value: string)`; mit `multiple` arbeitet sie mit ausgewählten `ComboBox.Option`-Elementen. | SUPERSEDED | User decision, 2026-09-21 | Superseded by COMBO-005. |
| COMBO-005 | COMBO | ComboBox unterstützt Single-Select und Multi-Select über `multiple?: boolean`; im Multi-Select liefern `value`/`defaultValue` und `onValueChange` die ausgewählten `ComboBox.Option`-Elemente. | CONFIRMED | User decision, 2026-09-21 | Bodywork `#picker` und `tobit-ds.css` geprüft 2026-09-21. |
| BADGE-001 | BADGE | Badge ist ein Status-Element mit dekorativer Standardsemantik; `aria-label` setzt `role="status"`. Die bestätigten Tones sind `neutral`, `accent`, `success`, `warning`, `danger`; Größen sind `sm` und `md`. | CONFIRMED | User decision, 2026-09-21 | Bodywork `#status` und `tobit-ds.css` geprüft 2026-09-21. |
| BADGE-002 | BADGE | Badge bleibt statisch und besitzt keine Remove-Aktion. Interaktive oder entfernbare Tags und Chips benötigen einen eigenen, separat spezifizierten Vertrag. | SUPERSEDED | User decision, 2026-09-21 | Ersetzt die frühere BADGE-002-Entscheidung, nachdem Bodywork die Status-Badge ausdrücklich von interaktiven Chips trennt. |
| DESIGN-011 | DESIGN | Für vorhandene Bodywork-Komponenten sind alle dargestellten Geometrien, Tokens, Zustände, responsiven Darstellungen und Übergänge verbindlich und exakt zu prüfen. Browser-Default-Verhalten gilt nur, soweit Bodywork keine Darstellung oder Interaktion definiert. | CONFIRMED | User decision, 2026-09-17 | Abweichungen benötigen eine dokumentierte chayns-UI-Decision. |

## Selection Controls

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| RADIO-001 | RADIO | RadioGroup verwendet `value`, `defaultValue` und `onValueChange`; `RadioGroup.Radio` besitzt den eigenen `value`, während RadioGroup den gemeinsamen nativen `name` verantwortet. | CONFIRMED | User decision, 2026-09-17 | Native-Prop-, Label-, Disabled- und Group-Accessibility-Vertrag spezifizieren. |
| RADIO-002 | RADIO | RadioGroup.Radio benötigt immer ein sichtbares `children`-Label. | CONFIRMED | User decision, 2026-09-17 | |
| RADIO-003 | RADIO | RadioGroup benötigt ein sichtbares `label`; es wird als native `legend` gerendert. | CONFIRMED | User decision, 2026-09-17 | |
| SEGMENT-001 | SEGMENT | SegmentedControl ist eine Single-Selection-`radiogroup`. `SegmentedControl.Segment` rendert einen nativen Button mit `role="radio"` und verwendet Roving Focus. | CONFIRMED | User decision, 2026-09-17 | Keyboard-, State-, Native-Prop- und Label-Vertrag spezifizieren. |
| SEGMENT-002 | SEGMENT | SegmentedControl.Segment benötigt immer ein sichtbares `children`-Label. | CONFIRMED | User decision, 2026-09-17 | |
| SEGMENT-003 | SEGMENT | SegmentedControl benötigt ein sichtbares `label`; eine Auswahl wird über `value` (controlled) oder `defaultValue` (uncontrolled) verpflichtend festgelegt. | CONFIRMED | User decision, 2026-09-17 | |

## MessageBox

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| MESSAGE-001 | MESSAGE | MessageBox unterstützt `info`, `success`, `warning` und `danger`, rendert statisch mit `role="note"` und ist im initialen Vertrag nicht schließbar. | SUPERSEDED | User decision, 2026-09-17 | Superseded by MESSAGE-003 after Bodywork review. |
| MESSAGE-002 | MESSAGE | MessageBox besitzt ausschließlich `children` als frei komponierten Inhalt und keinen eigenen Titel-Prop. | CONFIRMED | User decision, 2026-09-17 | |
| MESSAGE-003 | MESSAGE | MessageBox unterstützt die Bodywork-Varianten `neutral`, `admin` und `warning`. Sie ist statisch, nicht schließbar und verwendet `role="note"`; Icon und Folgeaktion bleiben frei komponierte Children-Inhalte. | CONFIRMED | Bodywork DesignSystem, User decision, 2026-09-17 | Admin-Tint und Border-Token in den Foundation-Transfer aufnehmen. |
| MESSAGE-004 | MESSAGE | Banner ist ein eigenständiges, schließbares Bereichs-Muster. Es rendert ein natives `aside`, unterstützt `neutral`, `success`, `warning` und `danger`, optionale dekorative Icons sowie controlled/uncontrolled Sichtbarkeit. Eine Close-Aktion benötigt ein lokalisiertes `closeLabel`. | CONFIRMED | Bodywork `#status`, user rework plan, 2026-09-22 | MessageBox bleibt das statische Kontext-Muster. |

## Accordion

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| ACC-001 | ACC | „Wrapped“ wird nicht als Komponentenlogik verwendet. | SUPERSEDED | AGENTS.md | Superseded by ACC-007 (DesignSystem korrigierte Wrapped). |
| ACC-002 | ACC | Grouped Accordions schließen innerhalb der Gruppe gegenseitig. | CONFIRMED | AGENTS.md | |
| ACC-003 | ACC | Standalone Accordions beeinflussen andere nicht. | CONFIRMED | AGENTS.md | |
| ACC-004 | ACC | Verschachtelung ändert Gruppenverhalten nicht automatisch. | SUPERSEDED | AGENTS.md | Superseded by ACC-008 (Wrapped wird automatisch aus Verschachtelung erkannt). |
| ACC-005 | ACC | Öffnen und Schließen verwendet die `grid-template-rows`-Motion. | CONFIRMED | AGENTS.md | |
| ACC-006 | ACC | Das DesignSystem beschreibt Grouped vs. Standalone eindeutig. | SUPERSEDED | User decision, 2026-09-21 | Superseded by ACC-007/008: three independent Standalone, Grouped and Wrapped representations. |
| ACC-007 | ACC | Es existieren drei Darstellungen: Standalone (Radius 12), Grouped (gemeinsame Fläche Radius 12, Trennlinien, exklusiv) und Wrapped (Radius 10, kompakter, eingerückt). Quelle ist die korrigierte DesignSystem-Fassung. | CONFIRMED | DesignSystem (korrigiert), User decision | |
| ACC-008 | ACC | Wrapped ist keine eigene Komponente und keine explizite Prop; ein Accordion erkennt per React-Context automatisch, dass es innerhalb eines anderen Accordion liegt, und stellt sich dann als Wrapped dar. Gruppierung (Exklusivität) und Wrapped (Verschachtelung) sind unabhängige Mechanismen. | CONFIRMED | User decision | |
| ACC-009 | ACC | Der Header ist ein nativer `<button aria-expanded aria-controls>`; das Panel ist eine `role="region"` mit `aria-labelledby`; eingeklappter Inhalt wird aus Fokusreihenfolge und A11y-Baum entfernt; Disabled nutzt natives `disabled`. | CONFIRMED | Accordion Specification, Accessibility | |
| ACC-010 | ACC | AccordionGroup besitzt den exklusiven Open-Zustand (controlled `openId` / uncontrolled `defaultOpenId`); ein Standalone-/verschachteltes Accordion besitzt seinen Zustand selbst (controlled `open` / uncontrolled `defaultOpen`). | CONFIRMED | Accordion Specification | |
| ACC-011 | ACC | Der initiale Renderzustand eines Accordion muss ohne sichtbaren Zwischenzustand exakt dem tatsächlichen Open/Closed-State entsprechen; es darf beim ersten Rendering keine kurze visuelle Öffnung mit anschließend animierter Schließung auftreten (kein Motion-FOUC). ACC-010 bleibt unverändert; betroffen ist ausschließlich die technische Erstdarstellung/Transition-Aktivierung. | CONFIRMED | Motion Foundation ("State before animation"), Designer feedback (clarified) | Konkrete technische Umsetzung (z. B. Transition erst nach Mount aktivieren) ist Teil der Implementierung, sobald Accordion im Implementation-Gate freigegeben ist. |

## Dialogs

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| DIALOG-001 | DIALOG | Dialoge sind nicht nur für Confirm vorgesehen. | CONFIRMED | AGENTS.md | |
| DIALOG-002 | DIALOG | Kleine abgeschlossene Eingaben und Auswahlen sind zulässig. | CONFIRMED | AGENTS.md | |
| DIALOG-003 | DIALOG | Komplexe Workflows gehören in Views oder Drawer. | CONFIRMED | AGENTS.md | |
| DIALOG-004 | DIALOG | Escape entspricht grundsätzlich Cancel. | CONFIRMED | AGENTS.md | |
| DIALOG-005 | DIALOG | Backdrop-Dismiss ist standardmäßig aktiv. | CONFIRMED | AGENTS.md | |
| DIALOG-006 | DIALOG | Backdrop-Dismiss ist deaktivierbar. | CONFIRMED | AGENTS.md | |
| DIALOG-007 | DIALOG | Das DesignSystem bildet den erweiterten Dialog-Einsatz ab. | SUPERSEDED | User decision, 2026-09-21 | Superseded by DIALOG-001/002: dialogs support small closed tasks and short forms. |

## Overlays and Tooltips

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| OVERLAY-001 | OVERLAY | Dropdown, Popover, Context Menu und Select sind unterschiedliche UI-Muster. | CONFIRMED | Planning | |
| OVERLAY-002 | OVERLAY | Alte Meeting-Begriffe definieren keine zukünftige öffentliche API. | CONFIRMED | Planning | |
| OVERLAY-003 | OVERLAY | Gemeinsame Overlay-Primitives werden separat spezifiziert. | SUPERSEDED | User decision, 2026-09-21 | Superseded by OVERLAY-004: shared technical Core primitive. |
| OVERLAY-004 | OVERLAY | Popup, Dialog, Tooltip und spätere Overlays verwenden eine gemeinsame technische Core-Primitivschicht für Portal, Layer, Outside-Press und Focus-Grundmechanik; ihre öffentliche Semantik bleibt komponentenspezifisch. | CONFIRMED | User decision, 2026-09-21 | Primitive API und Ownership-Matrix spezifizieren. |
| OVERLAY-005 | OVERLAY | Die gemeinsame Overlay-Primitivschicht bleibt intern. Popup, Dialog und Tooltip veröffentlichen nur ihre jeweils bestätigten semantischen APIs. | CONFIRMED | User decision, 2026-09-21 | Interne Ownership und Testgrenzen in den Component Specifications dokumentieren. |
| POPUP-001 | POPUP | `Popup` wird als eigenständige Core-Basis spezifiziert; konkrete Varianten werden separat beschrieben. | CONFIRMED | User decision, 2026-09-14 | |
| POPUP-002 | POPUP | Eine Popup-Listenvariante verwendet pro Eintrag verpflichtend Icon, sichtbaren Text und `onClick`. | CONFIRMED | User decision, 2026-09-14 | |
| POPUP-003 | POPUP | Der Popup-Open-State wird in der initialen Variante unkontrolliert intern verwaltet. | CONFIRMED | User decision, 2026-09-14 | |
| POPUP-004 | POPUP | Nach `onClick`, Escape und Outside-Click schließt die initiale Popup-Variante. | CONFIRMED | User decision, 2026-09-14 | |
| POPUP-005 | POPUP | Die initiale Popup-Listenvariante verwendet Menu-Semantik, Fokus auf den ersten Eintrag, zyklische Pfeiltasten, Tab zum Schließen mit normalem Fokusfluss, Portal-Rendering, bevorzugt Positionierung unterhalb an der Startkante, Flip und Viewport-Clamping sowie `--z-popover: 1000`. | CONFIRMED | User decisions, 2026-09-14 | Weitere Popup-Varianten benötigen eigene Prüfung. |
| POPUP-006 | POPUP | Popup verwendet `Popup.Trigger` als Owner der Trigger-Native-Props und `Popup.Content` als Owner der Overlay-Surface-Native-Props. `PopupList` bleibt die Menu-spezifische Compound-Variante und setzt allein die Menu-ARIA. | CONFIRMED | Bodywork component finalization plan | Popup- und SplitButton-Specifications sowie Gates vor Implementierung aktualisieren. |
| POPUP-007 | POPUP | `Popup.Content` besitzt ohne `PopupList` keine implizite ARIA-Rolle und verschiebt den Fokus nicht. Nur `PopupList` setzt Menu-ARIA und dessen Menu-Fokusmodell. | CONFIRMED | User decision, 2026-09-17 | Dismissal, positioning und generische Content-Verträge spezifizieren. |
| POPUP-008 | POPUP | Popup unterstützt `open`, `defaultOpen` und `onOpenChange`. Escape und Outside-Press schließen standardmäßig und sind jeweils deaktivierbar. | CONFIRMED | User decision, 2026-09-17 | Event- und Focus-Restoration-Vertrag spezifizieren. |
| TOOLTIP-001 | TOOLTIP | Sichtbare Tooltips nutzen eine eigene zugängliche Komponente. | CONFIRMED | AGENTS.md | |
| TOOLTIP-002 | TOOLTIP | `title` darf ergänzend genutzt werden. | CONFIRMED | AGENTS.md | |
| TOOLTIP-003 | TOOLTIP | `title` ersetzt keinen zugänglichen sichtbaren Hinweis. | CONFIRMED | AGENTS.md | |

## Split Button

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| SPLIT-001 | SPLIT_BUTTON | Split Button besteht aus einer linken primären Aktion und einer rechten Aktion zum Öffnen eines Popups. | CONFIRMED | User input, 2026-09-14 | |
| SPLIT-002 | SPLIT_BUTTON | Split Button zählt als eine Primary Action im abgeschlossenen Action Scope; gleichrangige Alternativen gehören in das Popup. | CONFIRMED | AGENTS.md, user input, 2026-09-14 | |
| SPLIT-003 | SPLIT_BUTTON | Der rechte Trigger verwendet die eigenständige Popup-Komponente und verwaltet deren Öffnung initial unkontrolliert. | CONFIRMED | User input, 2026-09-14 | |
| SPLIT-004 | SPLIT_BUTTON | Die linke und rechte Fläche sind getrennte native Buttons; der Trigger erhält `aria-expanded`/`aria-controls`, verwendet den Popup-Menu-Vertrag und leitet seinen Accessible Name über die sichtbare Primärbeschriftung ab. Varianten und Icons verwenden den bestätigten Button-Vertrag. | CONFIRMED | User decisions, 2026-09-14 | |

## AI

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| AI-001 | AI | KI erfindet keine fehlenden Varianten, APIs, Tokens oder Interaktionsregeln. | CONFIRMED | AGENTS.md, Philosophy | |
| AI-002 | AI | Fehlende Entscheidungen werden als offen erkannt und dokumentiert. | CONFIRMED | AGENTS.md, Philosophy | |
| AI-003 | AI | KI-Code bleibt menschlich verständlich und wartbar. | CONFIRMED | Philosophy, Vision | |
| AI-004 | AI | Dokumentation und maschinenlesbare Spezifikationen gehören zum Produkt. | CONFIRMED | Vision, Philosophy | |
| AI-005 | AI | Das maschinenlesbare Komponenten-Specification-Format ist offen. | SUPERSEDED | User decision, 2026-09-21 | Superseded by AI-006: Markdown with schema-validated frontmatter. |
| AI-006 | AI | Markdown bleibt die normative Component Specification. Standardisierte Frontmatter-Felder werden durch ein JSON Schema validiert. | CONFIRMED | User decision, 2026-09-21 | Frontmatter-Felder, Schema-Ablage und Validator im Specification Format festlegen. |
| AI-006 | AI | Ein KI-Agent muss bei implementierungsrelevanter Mehrdeutigkeit stoppen und eine konkrete Klärungsfrage formulieren; eine plausible Annahme oder Best-Guess-Implementierung ist nicht zulässig. | CONFIRMED | Planning | AI Development Rules |

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
| DIST-011 | DIST | CSS-Hosting, Cache, Preload und Versionierung liegen beim Consumer beziehungsweise dessen Plattform. Packages liefern versionierte Artefakte und dokumentieren deren Cache-Vertrag. | CONFIRMED | User decision, 2026-09-21 | Consumer-/Package-Artefaktvertrag dokumentieren. |
| DIST-012 | DIST | Milestone 1 liefert die ESM-only Pakete `@chayns-ui/core` und `@chayns-ui/tokens` mit expliziten JavaScript-, Typ- und CSS-Subpath-Exports. | SUPERSEDED | ADR 0002 | Superseded by DIST-015 (JavaScript-Subpath-Exports entfallen; ein Root-Export bleibt, CSS-Subpath-Exports bleiben unverändert bestehen). |
| DIST-013 | DIST | Core-JavaScript ist side-effect-frei; CSS wird ausschließlich über dokumentierte CSS-Exports explizit importiert. | SUPERSEDED | User decision, 2026-09-21 | Superseded by DIST-014/DIST-016 for bundler consumers; explicit CSS artifacts remain available for Node SSR. |
| DIST-014 | DIST | Ziel ist, dass Consumer beim Import einer Komponente nicht zusätzlich manuell deren CSS importieren müssen. Der bestätigte Mechanismus sind bedingte Package-Exports: Bundler erhalten automatisches CSS, während der reine Node-SSR-Pfad CSS-frei und deterministisch bleibt. | CONFIRMED | User decision, 2026-09-21; verified Node `.css`-import constraint | Konkrete Exportbedingungen, Artefaktpfade und Consumer-/SSR-Tests in ADR 0002 und Package-Contracts dokumentieren. |
| DIST-015 | DIST | Automatisches CSS-Loading wird über bedingte Package-Exports angeboten. Ein reiner Node-SSR-Consumer darf weiterhin keine CSS-Datei importieren; dafür bleibt ein expliziter CSS-Artefaktpfad verfügbar. | CONFIRMED | User decision, 2026-09-21 | Supersedes the unconditional explicit-import default in OPEN-007; exact package export conditions remain implementation work. |
| DIST-016 | DIST | Bundler erhalten über die `browser`-/`import`-Bedingungen automatisch CSS; der Node-/SSR-Pfad bleibt CSS-frei und verweist auf JS- und Type-Artefakte. | CONFIRMED | User decision, 2026-09-21 | Package-Exports, Artefaktpfade und Consumer-Tests aktualisieren. |
| DIST-015 | DIST | `@chayns-ui/core` und `@chayns-ui/layout` liefern nur noch einen Root-JavaScript-Export (`.`) statt zusätzlicher JavaScript-Subpath-Exports je Komponente (z. B. vormals `./button`); Typ-Exports laufen über denselben Root-Export. CSS-Subpath-Exports (`./button.css`, `./card.css`, …) bleiben unverändert bestehen und sind von dieser Änderung nicht betroffen; DIST-013 gilt unverändert weiter. Baumschütteln (Tree-Shaking) wird stattdessen ausschließlich über side-effect-freies JavaScript und `preserveModules` sichergestellt statt über zusätzliche Subpath-Entry-Points; `tooling/verify-tree-shaking.mjs` prüft entsprechend nur noch den Root-Import. Zugleich wird die Datei-/Ordnerkonvention vereinheitlicht: jede Komponente (auch interne Unterkomponenten wie `ButtonIcon`, `ListItemBody`, `AccordionGroup`, `AvatarGroup`, `NavigationItems`, `TabsIcon`, `AppLayoutIcon`) erhält einen eigenen Ordner unter `src/components/`, während Stories und Tests je Package zentral unter `stories/` beziehungsweise `tests/` statt neben der jeweiligen Komponente liegen. | CONFIRMED | Merge von `feature/app-layout` (Commit „Consolidate component exports and standardize file structure“) nach `main`, User-Anweisung 2026-09-14 („Merge den aktuellsten Stand des Feature-Branch“) | Ersetzt DIST-012. Löst damit auch die zuvor offene Frage nach der verbindlichen Ordnerkonvention (co-lokiert vs. zentralisiert) zugunsten der zentralisierten `stories/`/`tests/`-Struktur. |

## Milestone 1 Platform and Button

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| PLATFORM-001 | PLATFORM | Node 24.19.0, pnpm 11.22.0, TypeScript 6.0.3, React 19.2 und Vite 8 bilden die moderne Milestone-1-Baseline. | CONFIRMED | ADR 0001 | TypeScript 7 nach Toolchain-Support erneut prüfen. |
| PLATFORM-002 | PLATFORM | Der Browservertrag entspricht Vite 8 Baseline Widely Available: Chrome/Edge 111, Firefox 114 und Safari 16.4 oder neuer; keine Legacy-Polyfills. | CONFIRMED | ADR 0001 | |
| PLATFORM-003 | PLATFORM | Library-Module sind import-time SSR-safe und erzeugen deterministisches Markup; eventtragende Nutzung liegt in der Client Boundary des Consumers. | CONFIRMED | ADR 0001 | |
| PLATFORM-004 | PLATFORM | Die Milestone-1-Toolchain-Baseline (PLATFORM-001: Node 24.19.0, React 19.2 zum Entwickeln/Testen) ist von der minimalen Consumer-Anforderung zu unterscheiden. `peerDependencies.react` wird auf `>=18 <20` gelockert, damit Consumer-Projekte mit React 18 oder 19 kompatibel bleiben; `engines.node` wird auf `>=18` gelockert (Node 18 LTS deckt ESM vollständig ab). Da `ref`-as-prop erst ab React 19 existiert, behalten Komponenten, die einen `ref` weiterreichen (aktuell AppLayout, Tabs), `forwardRef`, solange die Range React 18 einschließt; Button/IconButton reichen aktuell keinen `ref` durch und sind davon nicht betroffen. | CONFIRMED | Developer feedback, User decision 2026-09-14 ("ab 18") | Node-Mindestversion `>=18` ist eine plausible Annahme (LTS, ESM-Support) und war nicht explizit vom User bestätigt; bei Bedarf korrigieren. Package.json-Werte (`packages/core`, `packages/layout`, root `engines`) und ADR 0001 sind entsprechend zu aktualisieren. |
| BUTTON-006 | BUTTON | Milestone 1 unterstützt genau `primary`, `outline`, `ghost` und `danger`; `variant` ist erforderlich. | CONFIRMED | Approved M1 plan | |
| BUTTON-007 | BUTTON | `IconButton` ist ein separater Export mit zugänglichem Namen und Consumer-geliefertem Regular-/optionalem Active-Icon. | SUPERSEDED | Approved M1 plan | Superseded by BUTTON-012. |
| BUTTON-008 | BUTTON | Button und IconButton sind native Buttons, verwenden standardmäßig `type="button"`, reichen kompatible native Props/Events und den Ref zum Button durch und verwenden natives `disabled`. | CONFIRMED | Approved M1 plan | |
| BUTTON-009 | BUTTON | Loading, lokale S/M/L-Prop, Polymorphie, Navigation, Toggle und Selected State sind in Milestone 1 nicht Teil der API. | SUPERSEDED | Approved M1 plan | Superseded by BUTTON-016 for the loading state. |
| BUTTON-010 | BUTTON | Button und IconButton verwenden den vollständigen aufgelösten Focus-Ring-Farbwert mit bestätigter Ringgröße; teiltransparente Referenzringe werden nicht als alleiniger Focus Indicator verwendet. | SUPERSEDED | Button foundation transfer, Accessibility | Superseded by BUTTON-014 (DesignSystem-konformer abgesetzter box-shadow-Ring). |
| BUTTON-011 | BUTTON | Milestone 1 verwendet keine zeitgesteuerte Button-Motion; Active-Transform ist unmittelbar und die Disabled-Zuordnung je Variante ist in der Button Specification festgelegt. | SUPERSEDED | Button foundation transfer, Button Specification | Superseded by BUTTON-015 nach Übernahme der `tobit-ds.css`-Duration-/Easing-Werte; die Disabled-Zuordnung je Variante bleibt unverändert gültig. |
| BUTTON-012 | BUTTON | `IconButton` erhält genau einen FontAwesome-Classic-Icon-Namen wie `fa-paperclip` und erzeugt Regular für Ruhe sowie Solid für Hover/Active selbst. Milestone 1 setzt dafür ein vorhandenes Regular-/Solid-Paar voraus. | CONFIRMED | User decision, DesignSystem prototype “Buttons & Aktionen” | Single-Weight-, Brand- und Custom-Icons sind nicht Teil des Milestone-1-Vertrags. |
| BUTTON-013 | BUTTON | Button erhält sichtbaren Label-Inhalt über `children` und optional genau ein führendes FontAwesome-Classic-Icon über `icon`; Regular-/Solid-Gewichte werden wie beim IconButton intern gesetzt. | CONFIRMED | User decision, DesignSystem prototype “Buttons & Aktionen” | |
| BUTTON-014 | BUTTON | Der Fokus-Indikator ist ein abgesetzter `box-shadow`-Ring mit abgeschwächter Akzentfarbe (`--focus-ring-size`, `rgba(var(--focus-ring-rgb), var(--focus-ring-alpha-strong))`) statt eines vollflächigen `outline`; Primary kombiniert Ring und `--shadow-btn`, Forced Colors nutzt einen `ButtonText`-Outline-Fallback. Der Ring liegt außerhalb der Buttonfläche und hebt sich sichtbar ab. Entspricht der DesignSystem-Referenz. | CONFIRMED | User decision (Q1), DesignSystem | Ersetzt BUTTON-010. |
| BUTTON-015 | BUTTON | Button und IconButton erhalten eine kurze, ausschließlich `transform`-basierte Hover-/Active-Transition (150 ms, `ease`), übernommen aus der kanonischen `.tr`-Klasse in `tobit-ds.css` (`transition: ... transform .15s ease ...`); Farbe, Schatten und Border bleiben instant, da nur `transform` MOTION-002/MOTION-008-konform animierbar ist. Ersetzt die bisherige Annahme einer vollständig zeitlosen Button-Motion (BUTTON-011). Die dritte, in der DesignSystem-Prosa erwähnte Easing-Kurve für Mikrointeraktionen war in den geprüften statischen Assets nicht mit einem konkreten Bezier-Wert auffindbar (nur generisches `ease`); dies ist keine Blockade, aber als Wissenslücke vermerkt (siehe OPEN-023). | CONFIRMED | DesignSystem `tobit-ds.css` (`.tr`, `.btn-anim`), Designer feedback, MOTION-008 | Ersetzt BUTTON-011. |
| BUTTON-016 | BUTTON | Button und IconButton unterstützen `loading`. Während `loading=true` bleiben sichtbare Beschriftung beziehungsweise Accessible Name stabil, ein Regular-Spinner wird angezeigt, `aria-busy="true"` gesetzt und native `disabled` angewendet. Reduced Motion deaktiviert nur die Spinnerrotation. | CONFIRMED | User decision, Bodywork Buttons state matrix and loading examples, 2026-09-22 | Specification, Storybook and behavior tests cover the state. |

## Card

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| CARD-001 | CARD | Card ist eine rein präsentationale Fläche: nativer `<div>` mit `--surface`, 1px `--border` und Radius 16, ohne intrinsisches Padding und ohne Interaktions-/Business-Logik. | CONFIRMED | DesignSystem `.card`, User decision | |
| CARD-002 | CARD | Der einzige optionale visuelle Modifier ist `elevated` (fügt `--shadow-card` hinzu); es gibt keine Farb-/Emphasis-Varianten. | SUPERSEDED | Card Specification | Superseded by CARD-004: hover elevation is automatic and no public elevation prop exists. |
| CARD-003 | CARD | Interaktive Card-Muster werden vom Consumer über ein natives interaktives Kind komponiert; Card selbst besitzt keine Klick-/Keyboard-Semantik. | CONFIRMED | Card Specification, Accessibility | |
| CARD-004 | CARD | Card besitzt standardmäßiges internes Padding und hebt sich auf hover-fähigen Geräten automatisch mit `--shadow-hover` an. Es gibt keine öffentliche `elevated`-Prop. Der optionale semantische `Card.Header`-Part besitzt eigene Header-/Ref-Verantwortung und kann ein führendes Icon in einer kleinen Fläche anzeigen. | CONFIRMED | User rework clarification, Bodywork Card reference, 2026-09-22 | |

## List

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| LIST-001 | LIST | List ist ein nativer `<ul>`, ListItem ein `<li>`; die Zeilenaktion ist genau ein natives Element (`<a>` bei `href`, `<button>` bei `onClick`, sonst `<div>`). `href` hat Vorrang vor `onClick`. | CONFIRMED | DesignSystem row treatment, List Specification | |
| LIST-002 | LIST | Sekundäre Zeilen-Controls liegen im `trailing`-Slot als Geschwister der Zeilenaktion, niemals verschachtelt in ihr (gültige interaktive Semantik). | CONFIRMED | List Specification, Accessibility | |
| LIST-003 | LIST | Der Unread-Indikator wird nicht nur über Farbe vermittelt; bei Bedeutung liefert `unreadLabel` einen lokalisierten visually-hidden Namen. Titel und Subtitle sind einzeilig und kürzen per Ellipsis statt Schrift zu verkleinern. | CONFIRMED | List Specification, Accessibility | |
| LIST-004 | LIST | Milestone 1 hat kein Selection-, Virtualisierungs-, Mehrspalten-, Drag-and-drop- oder Swipe-Modell. | CONFIRMED | List Specification | |
| LIST-005 | LIST | Der bestehende `trailing`-Slot ist die öffentliche API für Metadaten oder sekundäre Controls auf der rechten Seite und bleibt Geschwister der Zeilenaktion. | CONFIRMED | User input 2026-09-14, List specification | |
| LIST-006 | LIST | Der `unread`/`unreadLabel`-Vertrag aus LIST-003 wird durch ein generisches Konzept ersetzt: `trailing` bleibt ein frei komponierbarer `ReactNode`, zusätzlich stellt chayns UI optionale, vorgefertigte „Standard-Content“-Unterkomponenten für wiederkehrende rechte Slot-Inhalte bereit (z. B. ein generischer Status-/Akzent-Indicator ohne chat-spezifische „unread“-Semantik), die Consumer wahlweise in `trailing` komponieren. Der bisherige boolesche `unread`/`unreadLabel`-Vertrag entfällt zugunsten dieses Kompositionsmodells. | CONFIRMED | Developer feedback, User decision 2026-09-14 | Exakter Komponenten-/Prop-Name ist Teil der List-Specification-Revision, kein Registerdetail. |
| LIST-007 | LIST | `ListItem` wird im vorgesehenen pre-stable Minor entfernt und durch `List.Item` ersetzt. `List` bleibt Owner des nativen `<ul>`, `List.Item` Owner des `<li>` und `List.Item.Action` der einzige interaktive Owner. Vergleichbare Breaking Changes benötigen nach 1.0 ein Major Release. | CONFIRMED | Bodywork component finalization plan | Die Specification definiert die semantischen Parts und die genaue Migration. |
| LIST-008 | LIST | Der neutrale Statusindikator ist `List.Item.Status`. Hat er Bedeutung, benötigt er einen Accessible Name; eine ausdrücklich dekorative Verwendung wird aus dem Accessibility Tree ausgeblendet. | CONFIRMED | User decision, 2026-09-17 | Visuelle Darstellung, API und Platzierung spezifizieren. |
| LIST-009 | LIST | List.Item.Status rendert als festen kleinen Statuspunkt; ein bedeutungstragender Punkt benötigt `label`. | CONFIRMED | User decision, 2026-09-17 | Farbe und Geometry benötigen bestätigtes Component-Mapping. |

## Avatar

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| AVATAR-001 | AVATAR | Avatar bildet aus dem ersten und letzten Namenswort maximal zwei großgeschriebene Initialen; bei einem Namenswort wird nur dessen erster Buchstabe verwendet. | CONFIRMED | User input 2026-09-14 | |
| AVATAR-002 | AVATAR | Avatar unterstützt optional `src`; ohne verwendbares Bild werden die Initialen angezeigt. | CONFIRMED | User input 2026-09-14 | Bildfehler- und Accessible-Name-Verhalten spezifizieren. |
| AVATAR-003 | AVATAR | Avatar unterstützt einen frei komponierbaren optionalen Badge-/Bottom-Slot. | CONFIRMED | User input 2026-09-14 | Dekorative versus interaktive Badge-Semantik spezifizieren. |
| AVATAR-004 | AVATAR | Der Initialen-Fallback verwendet eine deterministisch aus dem Namen abgeleitete Farbe aus `--accent`, `--accent-hover` oder `--accent-active` mit `--on-accent` als Vordergrund. | CONFIRMED | User input 2026-09-14, Avatar specification | |
| AVATAR-005 | AVATAR | Avatar unterstützt die Bodywork-Größen `small`, `default` und `large`, gemappt auf 36, 44 und 52 px; dies ist keine globale S/M/L-API. | SUPERSEDED | User decision, 2026-09-21, Bodywork `#medien` | Ersetzt die frühere AVATAR-005-Entscheidung. |
| AVATAR-006 | AVATAR | `AvatarGroup` komponiert Avatar-Children überlappend, begrenzt mit `max` die sichtbaren Tiles auf `max - 1` Avatare plus eine dekorative `+N`-Restkachel und wendet `size` auf alle Children an. | CONFIRMED | User input 2026-09-14, Avatar specification | |

## Milestone 1 Token Transfer

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| TOKEN-007 | TOKEN | Zusätzlich zur Button-Grundlage wurden für Card/List/Accordion benötigte Foundation-Tokens 1:1 aus der kanonischen `tobit-ds.css` übernommen (u. a. k-Skala, `--surface`, `--border`, `--text-3`, `--muted`, `--hover`, `--accent`, `--shadow-card`, `--fs-body`/`--fs-caption`/`--fs-meta`, `--icon`), inklusive Light-/Dark-Werten. Kalibrierte Bestandsfarben (z. B. `--danger`) wurden nicht überschrieben. | CONFIRMED | DesignSystem `tobit-ds.css`, Token catalogue | |

# Open Technical Decisions

Diese Tabelle bewahrt die ursprünglichen OPEN-IDs. Geschlossene Punkte zeigen ihre bestätigte Auflösung; verbleibende OPENs werden nicht durch Implementierung stillschweigend gelöst.

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| OPEN-001 | OPEN | Konkrete npm-Paketgrenzen und Package-Namen. | CONFIRMED | ADR 0002 | `@chayns-ui/core`, `@chayns-ui/tokens`. |
| OPEN-002 | OPEN | Package Manager. | CONFIRMED | ADR 0001 | pnpm. |
| OPEN-003 | OPEN | Workspace-/Monorepo-Tooling. | CONFIRMED | ADR 0001 | pnpm Workspaces ohne Orchestrator. |
| OPEN-004 | OPEN | Bundler. | CONFIRMED | ADR 0001, ADR 0002 | Vite Library Mode, ES-only. |
| OPEN-005 | OPEN | CSS-Build-Pipeline. | CONFIRMED | ADR 0002 | Standard-CSS; explizite Artefakte/Exports. |
| OPEN-006 | OPEN | Design-Token-Quelldatei und Token-Build-Technologie. | CONFIRMED | ADR 0002 | DTCG-shaped JSON und Style-Dictionary-kompatible Generierung. |
| OPEN-007 | OPEN | Mechanismus zum Laden benötigter CSS-Chunks. | SUPERSEDED | User decision, 2026-09-21 | Superseded by DIST-014/DIST-015: conditional exports for bundlers, explicit artifact path for Node SSR. |
| OPEN-008 | OPEN | Hosting-/CDN-/AWS-Struktur. | SUPERSEDED | User decision, 2026-09-21 | Superseded by DIST-011: hosting, CDN, cache and preload are Consumer/platform responsibility. |
| OPEN-009 | OPEN | Theme-Resolver-Implementierung. | SUPERSEDED | User decision, 2026-09-21 | Superseded by COLOR-006: resolver belongs to the Tokens package. |
| OPEN-010 | OPEN | Technische Context-Mechanismen zwischen Containern und Children. | SUPERSEDED | User decision, 2026-09-21 | Superseded by CORE-017: React Context for confirmed semantic Compound APIs. |
| OPEN-011 | OPEN | Maschinenlesbares Komponenten-Specification-Format. | SUPERSEDED | User decision, 2026-09-21 | Superseded by AI-006: Markdown with schema-validated frontmatter. |
| OPEN-012 | OPEN | Storybook-/Dokumentationsplattform und Integration. | CONFIRMED | ADR 0003 | Storybook 10.4 React-Vite. |
| OPEN-013 | OPEN | Testing-Stack. | CONFIRMED | ADR 0003 | Vitest, Testing Library, Storybook browser tests und manuelle A11Y-Evidenz. |
| OPEN-014 | OPEN | Release-Automatisierung. | CONFIRMED | ADR 0003 | Changesets für Intent/Changelog; kein Publish-Workflow in M1. |
| OPEN-015 | OPEN | Komponenten-Datei- und Ordnerstruktur. | CONFIRMED | ADR 0002, Component Development Standard | Colocated domain folder, public root/subpath barrels, CSS und Tests. |
| OPEN-016 | OPEN | Öffentliche Form-Control-Composition/API. | SUPERSEDED | User decision, 2026-09-21 | Superseded by CORE-018: Form Controls use documented Compound Parts. |
| OPEN-017 | OPEN | Technische Overlay-Primitives. | SUPERSEDED | User decision, 2026-09-21 | Superseded by OVERLAY-004: shared technical Core primitive. |
| OPEN-018 | OPEN | Quelle und Vertrag der aktiven Locale für locale-sensitive Formatierung sowie unterstützte Formatting-Locales. | SUPERSEDED | User decision, 2026-09-21 | Superseded by CORE-016: Application/Product supplies resolved locale context. |
| OPEN-019 | OPEN | Produktweite Timezone-Policy für benutzerseitig dargestellte Zeitwerte. | SUPERSEDED | User decision, 2026-09-21 | Superseded by CORE-016: Application/Product owns timezone policy. |
| OPEN-020 | OPEN | Ob RTL als Produktanforderung unterstützt wird und welche Produktpatterns dadurch betroffen sind. | SUPERSEDED | User decision, 2026-09-21 | Superseded by CORE-016: no RTL implementation before an explicit product requirement. |
| OPEN-022 | OPEN | Strategie für von chayns UI selbst verantwortete sichtbare Standardtexte, falls eine Core Component solche Texte benötigt. | SUPERSEDED | User decision, 2026-09-21 | Superseded by CORE-016: Core receives resolved content and owns no fachliche default text. |
| OPEN-023 | OPEN | Systemweite Motion-Duration-/Easing-Token-Werte (Motion Primitives) sind noch nicht vollständig aus dem DesignSystem in den Token Catalogue übertragen; insbesondere die dritte, in der DesignSystem-Prosa erwähnte Easing-Kurve für Mikrointeraktionen war in den geprüften statischen Assets nicht mit einem konkreten Bezier-Wert auffindbar. Blockiert jede über BUTTON-015 hinausgehende Motion-Erweiterung, die eigene Timing-Werte benötigen würde. | SUPERSEDED | User decision, 2026-09-21; DesignSystem token catalogue | Superseded by TOKEN-010, MOTION-009 and MOTION-010. Remaining token-catalogue gaps are tracked by TOKEN-006. |

# Superseded Decisions

| ID | Category | Decision | Status | Source | Follow-up |
|---|---|---|---|---|---|
| OPEN-021 | OPEN | Translation-Infrastruktur einschließlich Missing-Translation-Policy und stabiler Message-ID-/Key-Konvention. | SUPERSEDED | Planning | Superseded by CORE-009: Textstring-System ist die bestehende Translation Infrastructure; Fallbacks und IDs liegen dort. |

# Design Follow-ups

Die folgenden Punkte sind bereits zur Abstimmung mit Design vorgesehen:

* Accordion: Grouped vs. Standalone statt „Wrapped“.
* Definition von Action Scopes und Primary Actions.
* Danger als destruktiv statt ausschließlich unwiderruflich.
* Erweiterter Einsatzbereich von Dialogen.
* Lokale Größenvarianten ausdrücklich pro Komponente dokumentieren.
* Komplexe Layout- und App-Layout-Regeln weiter spezifizieren.
* Erweiterte Button-Motion über BUTTON-015 hinaus: blockiert an OPEN-023 (fehlende dritte Easing-Kurve für Mikrointeraktionen).
* AppLayout-Sidebar-Motion (`grid-template-columns`, LAYOUT-019): als einzige weitere layout-triggernde Ausnahme neben Accordion unter MOTION-008 bestätigt; keine zusätzlichen Layout-Property-Ausnahmen ohne gleichwertige Performance-Prüfung.

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
