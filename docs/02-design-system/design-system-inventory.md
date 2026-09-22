# chayns UI – DesignSystem Inventory

## Purpose

Dieses Dokument erfasst den aktuell relevanten Stand des [Tobit.Software DesignSystems](https://tappqa.tobit.com/Bodywork/DesignSystem/) (abgerufen am 22.09.2026) und gleicht ihn mit den bestätigten Regeln von `chayns UI` ab.

Es ist:

* kein Ersatz für das DesignSystem,
* kein vollständiger Token-Katalog,
* keine Component Specification,
* keine Implementierung.

Es dient als Arbeitsgrundlage für die folgenden detaillierten Foundation-Spezifikationen. Die Priorität der Quellen bleibt: bestätigte chayns-UI-Entscheidungen, spezialisierte chayns-UI-Dokumentation, Architecture/Philosophy, danach das externe DesignSystem. Angaben aus dem DesignSystem beziehen sich auf dessen ausgelieferte Dokumentation und CSS; nicht eindeutig extrahierbare Werte werden nicht geschätzt.

# 1. Classification Model

Für jeden untersuchten Bereich werden ausschließlich diese Klassifikationen verwendet:

## ALIGNED

DesignSystem und bestätigte chayns-UI-Regeln stimmen inhaltlich überein.

## CHAYNS UI CLARIFICATION

Die grundsätzliche DesignSystem-Regel wird übernommen, wurde in `chayns UI` aber technisch oder semantisch präzisiert.

## INTENTIONAL DEVIATION

Es existiert eine bestätigte chayns-UI-Entscheidung, die bewusst vom aktuellen Wortlaut oder Modell des DesignSystems abweicht.

## DESIGN REVIEW

Der Punkt muss mit Design/UX noch abgestimmt beziehungsweise im DesignSystem angepasst werden.

## TECH REVIEW

Die Designrichtung ist ausreichend klar, aber die technische Spezifikation oder Übertragung in Tokens/API ist noch nicht abgeschlossen.

## OPEN

Die notwendige Regel ist weder durch das DesignSystem noch durch bestehende bestätigte Entscheidungen ausreichend definiert.

# 2. Foundation Inventory

| Area | Classification | Inventory and reconciliation | Source |
|---|---|---|---|
| Density | ALIGNED | Das DesignSystem definiert S, M und L; M ist Standard. Density ist systemweit eine Nutzereinstellung, nicht eine Ansicht- oder Komponentenwahl. Es skalieren Schrift, Abstände und Bedienhöhen; Radien, Rahmen, Schatten und Farben bleiben konstant. Bestätigte chayns-UI-Regeln bestätigen genau dieses globale Modell und untersagen eine Standard-S/M/L-Prop je Core-Komponente. Lokale Größen bleiben ausschließlich ausdrücklich definierte Varianten, etwa bei Avatar oder Icon. | DesignSystem: „Dichte & Skala“ und `--sf`; DENSITY-001–006; `density.md` |
| Spacing | INTENTIONAL DEVIATION | Das DesignSystem verwendet eine density-abhängige `k`-Skala (`--k2` bis `--k120`, bevorzugt 4er-Schritte) und zusätzlich `--sp-1` bis `--sp-6`. Es fordert die Skala für Maße und die globale Density. chayns UI übernimmt die zentrale, density-abhängige Skalierung und die Container-Verantwortung, hat für allgemeine Spacing-Tokens aber verbindlich `--sp-*` festgelegt. Das ist eine bewusste technische Abweichung in der Benennung, keine neue visuelle Skala. Explizit belegte komponentenspezifische Maße wie `--btn-py`, `--btn-px`, `--input-py`, `--input-px`, `--row-py` und `--row-px` dürfen später nur nach vollständiger Übertragung verwendet werden. | DesignSystem: „Spacing, Radien & Schatten“ und CSS; TOKEN-003–004; CORE-002–003; `design-foundations.md` |
| Radius | ALIGNED | Das DesignSystem beschreibt eine Stufenskala, die Regel „innen eine Stufe kleiner“ sowie die Faustregel Innenradius = Außenradius minus Innenabstand. Pills sind vollständig gerundet; Buttons dürfen Pill, MD oder SM nutzen. Density verändert Radien nicht. chayns UI bestätigt eine globale primitive Radius-Skala ohne freie komponentenlokale Zwischenwerte. Die späteren Token-Namen und die erlaubte Zuordnung je Komponente sind noch Katalogarbeit. | DesignSystem: „Spacing, Radien & Schatten“, Buttons; TOKEN-005; `tokens.md` |
| Typography | CHAYNS UI CLARIFICATION | Das DesignSystem definiert Roboto als Hausschrift, Roboto Mono ausschließlich für Code und technische Werte, die Rollen `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-bodyl`, `--fs-body`, `--fs-meta`, `--fs-caption`, `--fs-micro` sowie density-abhängige Größen. Schnitte, Laufweite und Zeilenhöhe gehören zur Rolle und sollen nicht frei kombiniert werden. chayns UI übernimmt diese Richtung, präzisiert jedoch: Font Families werden außerhalb der Komponenten bereitgestellt; Komponenten laden oder setzen sie nicht global. | DesignSystem: „Typografie“ und CSS; TYPE-001–004; `design-foundations.md` |
| Colors | CHAYNS UI CLARIFICATION | Das DesignSystem trennt Skalen und semantische Rollen. Belegt sind Light/Dark-Werte für `--page`, `--surface`, `--surface-2`, `--surface-alt`, Textrollen, Border-Rollen, Accent inklusive `--accent-hover`, `--accent-active`, `--on-accent`, Statusrollen und Focus-Ring-Tokens. Accent/Primary dient Markenfarbe, Aktionen und aktiven Zuständen. High Contrast und Color Deficiency ändern semantische Tokens, insbesondere Status-, Border- und Focus-Werte. chayns UI übernimmt Theme Inputs und semantischen Konsum und präzisiert, dass eine bereitgestellte Accent-/Primary-Farbe für Accessibility kalibriert werden darf. | DesignSystem: „Farben & Tokens“, „Theme-Varianten“ und CSS; COLOR-001–005; `design-foundations.md` |
| Borders | ALIGNED | Das DesignSystem nutzt semantische Rollen `--border`, `--border-soft`, `--input-border` und belegt unter anderem 1px, 1.5px und 2px für unterschiedliche Muster. UI-Grenzen und Zustandslinien benötigen mindestens 3:1 Kontrast. Border-Stärken bleiben bei Density konstant. chayns UI bestätigt ausschließlich definierte Border-Werte und -Tokens; keine freien Werte. Eine kanonische Zuordnung je Komponente fehlt noch. | DesignSystem: CSS und „Barrierefreiheit“; `design-foundations.md` |
| Shadows | TECH REVIEW | Belegt sind `--shadow-card`, `--shadow-hover`, `--shadow-pop`, `--shadow-btn` und `--shadow-btn-hover`, jeweils mit Light-/Dark-Werten. Das DesignSystem ordnet sie Karten, Hover, Popovers und Buttonzuständen zu und hält Shadows density-unabhängig. chayns UI bestätigt das Token-Prinzip, jedoch noch keinen übertragenen, abschließenden Shadow-Katalog. | DesignSystem: CSS und „Spacing, Radien & Schatten“; TOKEN-006; `tokens.md` |
| Z-Layers | TECH REVIEW | Das DesignSystem liefert eine geordnete Skala: `--z-sticky` 100, `--z-popover` 500, `--z-drawer` 700, `--z-dialog` 800, `--z-toast` 900, `--z-tooltip` 1000. Beispiele legen Backdrops jeweils direkt unter die zugehörige Overlay-Ebene. chayns UI bestätigt den Verzicht auf freie `z-index`-Werte; die Übernahme als chayns-UI-Tokenkatalog und Regeln für alle Overlay-Fälle ist noch nicht spezifiziert. | DesignSystem: CSS und Overlay-Hinweise; `design-foundations.md` |
| Motion | CHAYNS UI CLARIFICATION | Das DesignSystem erlaubt nur `transform` und `opacity`, verlangt schnelleren Exit als Enter, definiert belegte Dauer- und Easing-Stufen sowie Reduced Motion. chayns UI übernimmt dies und präzisiert verbindlich die zusätzliche Ausnahme `grid-template-rows` für dynamische Höhenübergänge, insbesondere Accordions; weitere Layout-Properties bleiben ausgeschlossen. Die belegten Werte werden über semantische Motion-Tokens geführt; fehlende Foundation-Kategorien bleiben als explizite Kataloglücken markiert. | DesignSystem: „Motion & Animation“ und CSS; MOTION-001–010; `design-foundations.md` |
| Accessibility | ALIGNED | Das DesignSystem nennt WCAG 2.2 AA, 4,5:1 für Fließtext, 3:1 für große Texte sowie UI-Grenzen/Zustandslinien, sichtbaren Fokus, logische Tab-Reihenfolge, Escape für Overlays, Tastaturprüfung, Screenreader-Prüfung und passende ARIA-Rollen für Live-Rückmeldungen. Status darf nicht nur Farbe verwenden. Es behandelt Reduced Motion, Contrast Mode und Color-Deficiency Mode als Systemvarianten. chayns UI bestätigt das Mindestniveau und blockiert die Veröffentlichung einer Core-Komponente bei bekannten Verstößen. | DesignSystem: „Barrierefreiheit“, „Theme-Varianten“; A11Y-001–006 |
| Icons | CHAYNS UI CLARIFICATION | Das DesignSystem verwendet ausschließlich FontAwesome. Interaktive Icons sind in Ruhe Regular (`far`) und bei Hover/Active Solid (`fas`); Icon-only nur bei eindeutigem Sinn an vertrauten Stellen wie Toolbar oder Listenzeile, ansonsten mit Label. Es zeigt `--icon` und `--icon-lg`. chayns UI übernimmt dies und präzisiert informative Icons als Regular sowie die konsistente Nutzung der verfügbaren Variante, wenn kein Regular/Solid-Paar existiert. | DesignSystem: „Ikonografie: FontAwesome“ und CSS; ICON-001–003 |

## Confirmed observations requiring later transfer

* Theme Inputs sind im DesignSystem sichtbar als Accent-Auswahl, Light/Dark, High Contrast/Standard/Color Deficiency und S/M/L; die chayns-UI-Theme-Inputs sind bereits weiter gefasst und CONFIRMED.
* Primitive Farbskalen und semantische Rollen sind getrennt; Komponenten sollen semantische Rollen konsumieren.
* Focus ist über `--focus-ring-rgb`, `--focus-ring-size`, `--focus-ring-alpha-soft` und `--focus-ring-alpha-strong` angelegt; High Contrast erhöht Breite und Deckkraft.
* Die im gerenderten Dokument als Datenlisten gebundenen vollständigen Radius-, Shadow-, Motion- und Typography-Metadaten sind nicht aus der statischen Seite mit confidence extrahierbar. Sie werden erst nach eindeutigem Export oder einer verlässlichen, maschinenlesbaren Quelle in den chayns-UI-Katalog übertragen.

# 3. Component-Relevant Inventory

| Area | Classification | Inventory and reconciliation | Source |
|---|---|---|---|
| Buttons and Actions | CHAYNS UI CLARIFICATION | Das DesignSystem zeigt Primary, Secondary/Outline, Ghost, Destructive, Icon Button, Split Button und Segmented Control. Es dokumentiert Standard, Hover, Active/Press, Disabled und Focus; Buttongröße folgt S/M/L, nicht einer lokalen Standardgröße. Pill ist Standard; MD/SM sind kompaktere zulässige Radien. Die Regel „höchstens eine Primary pro Ansicht“ wird durch chayns UI präzisiert: höchstens eine Primary je abgeschlossenem semantischem Action Scope (z. B. Page, Card, Dialog, Drawer, Formular, Wizard Step, abgeschlossener Accordion-Inhalt). Das DesignSystem beschreibt Destructive für „unwiderrufliche“ Aktionen; chayns UI verwendet Danger für alle destruktiven Aktionen. | DesignSystem: „Buttons & Aktionen“; BUTTON-001–005 |
| Inputs and Form Controls | CHAYNS UI CLARIFICATION | Das DesignSystem zeigt Floating Labels, Suchfelder, Help Text, Fehlermeldung, Counter, Prefix/Suffix sowie States für Focus, Filled, Error und Disabled. Die genaue Form-Control-Composition ist nicht als öffentliche chayns-UI-API ableitbar. chayns UI bestätigt: Floating Label gehört zum Input; Help Text, Error und Counter sind definierte Slots; Consumer liefern den Inhalt, chayns UI Position, Layout und Accessibility. | DesignSystem: „Textfelder & Suche“, „Auswahl“; INPUT-001–004 |
| ComboBox and Multi-Select | CONFIRMED CHAYNS UI CLARIFICATION | Bodywork beschreibt den Multi-Select ab vier Optionen als `.ff-field` mit Floating Label, ausgewählten Chips, Checkbox-Liste, `--z-popover`, 10px Feldradius, `--input-py`/`--input-px` und kompakten Option Rows. chayns UI ergänzt den erforderlichen Single-Select-Modus unter derselben Compound API. | DesignSystem: „Auswahl“, `#picker`, `tobit-ds.css`; COMBO-001–005 |
| Badges and Chips | CONFIRMED CHAYNS UI CLARIFICATION | Bodywork trennt Status-Badge, Count-Badge, Reaktions-Chip, Tag und Verify-Badge. Status-Badges sitzen auf einem Element und sind keine Buttons; Tags und Chips tragen bei entfernbaren Inhalten eine eigene Remove-Aktion. chayns UI hält `Badge` statisch; entfernbaren Tags und Chips ist ein eigener interaktiver Vertrag vorbehalten. | DesignSystem: „Status & Meldungen“ → „Badges & Chips“, `#status`, `tobit-ds.css`; BADGE-001–002 |
| Banner | CONFIRMED CHAYNS UI CLARIFICATION | Bodywork zeigt Banner als vollbreite Statusfläche mit Icon, flexiblem Inhalt und Close-Affordance. chayns UI führt dafür ein eigenständiges `Banner`. | DesignSystem: „Status & Meldungen“ → „Banner“, `#status`; MESSAGE-004 |
| Accordions | CONFIRMED CHAYNS UI CLARIFICATION | chayns UI verwendet drei Darstellungen: Standalone, Grouped und automatisch erkanntes Wrapped. Grouping und Wrapped bleiben unabhängig; die konkrete Geometrie und State-Ownership sind in ACC-007–011 festgelegt. | DesignSystem: „Accordions“; ACC-007–011 |
| Dialogs | CONFIRMED CHAYNS UI CLARIFICATION | Dialoge unterstützen kleine abgeschlossene Tasks einschließlich kurzer Formulare, Umbenennen und kleiner Auswahlen. Komplexe Workflows gehören in Drawer oder Views; Escape entspricht Cancel und Backdrop-Dismiss ist standardmäßig aktiv sowie deaktivierbar. | DesignSystem: „Dialoge, Menüs & Toasts“, „Drawer, Popover & Tooltip“; DIALOG-001–007 |
| Overlays | CONFIRMED CHAYNS UI CLARIFICATION | Das DesignSystem unterscheidet Dialog, Drawer, Popover, Dropdown, Tooltip und Select/Multi-Select anhand ihres Zwecks. chayns UI verwendet eine gemeinsame interne technische Overlay-Primitivschicht; öffentliche Components behalten ihre eigene Semantik. | DesignSystem: Overlay- und Auswahlabschnitte; OVERLAY-001–005 |
| Tooltips | CHAYNS UI CLARIFICATION | Das DesignSystem reserviert Tooltips für kurze Erklärungen und untersagt darin wichtige Informationen oder Aktionen, da sie auf Touch nicht erreichbar sind. chayns UI übernimmt dies und präzisiert die technische Mindestanforderung: sichtbare Tooltips benötigen eine eigene zugängliche Tooltip-Komponente; natives `title` darf ergänzen, ersetzt sie aber nicht. | DesignSystem: „Drawer, Popover & Tooltip“; TOOLTIP-001–003 |
| Layout Patterns | CONFIRMED CHAYNS UI CLARIFICATION | AppLayout ist eine generische, produktunabhängige Shell mit Navigation, Disclosure, Collapse und Content. Routing, Business-Logik und Persistenz bleiben außerhalb. | DesignSystem: Produkt-Pattern „App-Layout“; LAYOUT-005–008; `architecture.md` |

# 4. Explicit Divergence Register

| Area | DesignSystem | chayns UI | Classification | Source |
|---|---|---|---|---|
| Spacing naming | Allgemeine Maße sind primär über die `k`-Skala dokumentiert; `--sp-1` bis `--sp-6` existieren zusätzlich. | Allgemeine Spacing-Tokens folgen verbindlich `--sp-*`. | INTENTIONAL DEVIATION | DesignSystem CSS; TOKEN-003 |
| Primary Action | Höchstens eine Primary pro Ansicht. | Höchstens eine Primary je semantischem Action Scope. | CHAYNS UI CLARIFICATION | DesignSystem Buttons; BUTTON-001–003 |
| Danger | Destructive für Löschen und andere unwiderrufliche Aktionen. | Danger für destruktive Aktionen, auch wenn technisch wiederherstellbar. | CHAYNS UI CLARIFICATION | DesignSystem Buttons; BUTTON-004 |
| Accordion behavior | Das DesignSystem zeigt Standalone, Grouped und Wrapped als Darstellungen. | Grouped und die automatische Wrapped-Erkennung sind unabhängige, bestätigte chayns-UI-Verträge. | INTENTIONAL DEVIATION | Bodywork Accordions; ACC-007–011 |
| Dialog scope | Confirm/Entscheidung ist eindeutig dokumentiert; erweiterte kleine Interaktionen sind nicht eindeutig abgedeckt. | Kleine abgeschlossene Eingaben und Auswahlen sind zulässig; Escape/Backdrop-Verhalten ist definiert. | DESIGN REVIEW | DesignSystem Overlays; DIALOG-001–006 |
| Motion properties | Nur `transform` und `opacity`. | Zusätzlich nur `grid-template-rows` für definierte Höhenübergänge. | CHAYNS UI CLARIFICATION | DesignSystem Motion; MOTION-002–004 |
| Visible Tooltip | Kurz erklären; wichtige Inhalte und Aktionen sind ausgeschlossen. | Eigene zugängliche Tooltip-Komponente; `title` nur ergänzend. | CHAYNS UI CLARIFICATION | DesignSystem Tooltips; TOOLTIP-001–003 |
| Layout patterns | Globales App-Layout ist unvollständig; exemplarische Tobit.One-Ansicht ist produktspezifisch. | `AppLayout` bleibt als generische, produktunabhängige Shell bestehen; nur übertragbare Geometrie und Zustände werden übernommen. | INTENTIONAL DEVIATION | User decision, 2026-09-21; LAYOUT-005–008 |

# 5. Confirmed Foundation Data

Die folgenden Daten sind entweder im aktuellen ausgelieferten DesignSystem eindeutig belegt oder als CONFIRMED im Repository dokumentiert. Sie sind noch kein endgültiger chayns-UI-Token-Katalog.

| Foundation | Confirmed data |
|---|---|
| Density | S = `--sf: 0.9`; M = `--sf: 1`; L = `--sf: 1.125`; M ist Standard. Skalieren: Schrift, Abstände, Bedienhöhen. Konstant: Radien, Rahmen, Schatten, Farben. |
| Typography | Rollen: `--fs-display`, `--fs-h1`, `--fs-h2`, `--fs-bodyl`, `--fs-body`, `--fs-meta`, `--fs-caption`, `--fs-micro`. Roboto; Roboto Mono nur Code/technische Werte. |
| Spacing and measures | Belegt: `--sp-1` bis `--sp-6`; `--k2` bis `--k120`; `--btn-py`, `--btn-px`, `--input-py`, `--input-px`, `--row-py`, `--row-px`, `--ctrl-h`, `--k36`, `--k44`, `--k52`, `--icon`, `--icon-lg`; Avatar verwendet diese drei Bodywork-Größen. Für chayns UI ist ausschließlich das allgemeine Namensschema `--sp-*` bestätigt. |
| Color roles | Belegt: `--page`, `--surface`, `--surface-2`, `--surface-alt`, `--toggle-bg`, `--text`, `--text-2`, `--text-3`, `--muted`, `--accent`, `--accent-hover`, `--accent-active`, `--on-accent`, `--border`, `--border-soft`, `--input-border`, `--success`, `--success-bg`, `--warning`, `--warning-bg`, `--danger`, `--danger-bg`, `--danger-bg-hover`, Disabled- und Focus-Ring-Tokens. Light und Dark sind vorhanden. |
| Accent scale | Belegt: `--accent-100` bis `--accent-800`, `--accent-rgb`, `--on-accent-rgb`. Der Pickerwert kann kontrastgerecht kalibriert werden. |
| Focus | Belegt: `--focus-ring-rgb`, `--focus-ring-size`, `--focus-ring-alpha-soft`, `--focus-ring-alpha-strong`; High Contrast erhöht Größe/Deckkraft. |
| Shadows | Belegt: `--shadow-card`, `--shadow-hover`, `--shadow-pop`, `--shadow-btn`, `--shadow-btn-hover`. |
| Z-Layers | `--z-sticky: 100`, `--z-popover: 500`, `--z-drawer: 700`, `--z-dialog: 800`, `--z-toast: 900`, `--z-tooltip: 1000`. |
| Accessibility | WCAG 2.2 AA; Text 4,5:1, großer Text 3:1, UI-Grenzen/Zustandslinien 3:1; sichtbarer Fokus, Tastatur, Screenreader und nicht allein farbliche Statusdarstellung. |
| Motion | Erlaubt: `transform`, `opacity`; chayns UI zusätzlich `grid-template-rows`. Exit schneller als Enter; Reduced Motion berücksichtigt; Spinner/Skeleton als notwendige Endlosanimationen belegt. Konkrete Dauer-/Easing-Tabellenwerte: not extractable with confidence aus den gebundenen Tabellen des gerenderten Dokuments. |
| Radius | Stufenskala, Nesting-Regel und Pill-Prinzip sind belegt. Konkrete vollständige Radiusstufen: not extractable with confidence aus den gebundenen Daten. |
| Badge geometry | Status `.badge`: `--k5` gap, `--k4`/`--k12` padding, 999px radius, `--fs-caption`; `.badge-chip`: `--k6` gap, `--k5`/`--k12` padding, 999px radius, `--fs-meta`; Count: 20px minimum/height. | `#status`, `tobit-ds.css`, checked 2026-09-21 |
| Picker geometry | `.ff-field`: `--input-py`/`--input-px`, 1.5px border, 10px radius, `--z-popover`; option rows use `--k9`/`--k12`, popup uses 12px radius and `--shadow-pop`. | `#picker`, `tobit-ds.css`, checked 2026-09-21 |

# 6. Remaining Foundation Gaps

| Area | Missing information | Status | Needed for |
|---|---|---|---|
| Color System | Kanonische chayns-UI-Namen, Primitive-zu-Semantic-Mapping, Kontrast- und Deficiency-Resolver-Regeln. | TECH REVIEW | `color-system.md`, Theme Resolver, Token Catalogue |
| Typography | Vollständige Rollenmetadaten (Weight, Line Height, Letter Spacing) aus einer eindeutig exportierbaren Quelle und chayns-UI-Token-Mapping. | TECH REVIEW | `typography.md`, Token Catalogue |
| Motion | Vollständige Dauer- und Easing-Werte plus Zuordnung zu Enter/Exit/Hover/Press; chayns-UI-Katalog muss die `grid-template-rows`-Ausnahme enthalten. | TECH REVIEW | `motion.md`, Token Catalogue |
| Accessibility | Prüfkatalog, Kriterien pro Pattern und Nachweisformat für WCAG-2.2-AA-Gates. | TECH REVIEW | `accessibility.md`, Quality Gates |
| Concrete Token Catalogue | Vollständige, versionierte chayns-UI-Tokennamen und die Übernahme belegter DesignSystem-Daten. | TECH REVIEW | Erweiterung von `tokens.md` |
| Density Matrix | Vollständige Zuordnung aller skalierenden Token für S/M/L sowie explizit konstante Werte. | TECH REVIEW | Erweiterung von `density.md` |
| Component-specific Tokens | Zulässige Komponentenmaße und ihre jeweilige Designregel; keine Ableitung aus Bequemlichkeit. | TECH REVIEW | Token Catalogue, spätere Component Specifications |
| Button States | Abschließende State-Matrix, Focus-Token-Verwendung und Split-/Segmented-Interaktion für chayns UI. | TECH REVIEW | spätere Button Component Specification |
| Focus State | Einheitliche CSS-/Semantik-Regel, Focus-visible-Strategie und Mapping von Focus-Ring-Tokens. | TECH REVIEW | `accessibility.md`, Token Catalogue |
| Testability | Testing-Stack und verbindliche Tooling-/Automationsentscheidung. | OPEN | Quality Gates; Decision Register OPEN-013 |
| Accordion terminology | Bodywork-Zustände und die chayns-UI-Terminologie sind für die implementierte Accordion-Baseline ausreichend belegt. | CONFIRMED | Accordion Specification; ACC-007–011 |
| Dialog scope | Erweiterter zulässiger Dialog-Einsatz und Escape-/Backdrop-Modell müssen im DesignSystem nachvollziehbar werden. | DESIGN REVIEW | Dialog Specification |
| Layout patterns | Produktübergreifende Regeln für Grid, Panels, Collapse, Drag, Resize und App Layout fehlen. | DESIGN REVIEW | Layout Foundations, Layout Component Specifications |

# 7. Recommended Documentation Sequence

Die bevorzugte Reihenfolge bleibt fachlich passend; Color und Typography liefern die meisten Voraussetzungen für komponentenübergreifende Tokens, Motion und Accessibility schließen systemweite Interaktion und Qualitätsregeln an.

1. `color-system.md`
2. `typography.md`
3. `motion.md`
4. `accessibility.md`
5. konkrete Erweiterung/Ergänzung des Token-Katalogs
6. konkrete Density Matrix

Die verbleibenden DESIGN REVIEWs betreffen globale Foundations sowie noch nicht implementierte Dialog-/Layout-Erweiterungen; sie blockieren die geprüften Komponenten nur, wenn sie deren konkrete Umsetzung berühren.

# 8. Decision Register Follow-ups

* TOKEN-006: Die bestätigte Katalogstrategie anwenden: belegte Foundation-Daten übernehmen und unbelegte Einzelwerte als OPEN-Lücken führen.
* DENSITY-006: Die lokale Größenvariantenliste ist weiterhin DESIGN REVIEW; das DesignSystem bestätigt globale Dichte, aber keine vollständige chayns-UI-Liste fachlicher lokaler Varianten.
* ACC-006, DIALOG-007 und LAYOUT-004: durch die bestätigten chayns-UI-Klarstellungen und die Nachfolgeentscheidungen ACC-007/008, DIALOG-001/002 und LAYOUT-005/006 ersetzt.
* OVERLAY-003 und INPUT-004: durch die bestätigte interne Overlay-Primitivschicht beziehungsweise die bestätigte Form-Control-Compound-API ersetzt; technische Part-Contracts bleiben komponentenspezifische Dokumentationsarbeit.
* Kein bestehendes OPEN kann allein aufgrund des aktuellen DesignSystem-Stands auf CONFIRMED gesetzt werden.

# 9. Designer Follow-ups

| Topic | Status | Current evidence |
|---|---|---|
| Accordion | DESIGN REVIEW | Wrapped ist weiterhin vorhanden; Grouped/Standalone fehlt als eindeutiges Modell. |
| Action Scope | DESIGN REVIEW | Die DesignSystem-Regel lautet weiterhin „eine Primary pro Ansicht“; semantische Scope-Grenzen sind nicht dokumentiert. |
| Danger | DESIGN REVIEW | Das DesignSystem beschreibt weiterhin unwiderrufliche Aktionen; chayns UI umfasst alle destruktiven Aktionen. |
| Dialogs | DESIGN REVIEW | Confirm ist eindeutig, der bestätigte chayns-UI-Einsatz für kleine Eingaben/Auswahlen nicht. |
| lokale Größenvarianten | DESIGN REVIEW | Globale S/M/L-Density ist eindeutig; eine vollständige Liste legitimer lokaler Varianten fehlt. |
| Layout Patterns | DESIGN REVIEW | Die dargestellte Tobit.One-Referenz ist produktspezifisch; das App-Layout ist als unvollständig markiert. |

Keiner der bekannten Designer-Follow-ups ist im aktuellen DesignSystem eindeutig als `RESOLVED IN DESIGNSYSTEM` belegbar.

# 10. Relationship to Later Component Specifications

Dieses Inventory ist kein Ersatz für Component Specifications. Eine spätere Component Specification darf nur bestätigte Foundation-Regeln und bestätigte, ausdrücklich zugeordnete Tokens verwenden. Sie muss offene Design- oder Technikpunkte sichtbar lassen, statt sie durch API- oder Styling-Entscheidungen zu schließen.

Dieses Dokument erstellt keine Button-Spezifikation und keine Button-Komponente.

# 11. Relationship to AI

Ein KI-Agent darf dieses Inventory verwenden, um:

* bestehende Regeln zu finden,
* bestätigte Abweichungen zu erkennen,
* DesignSystem-Daten korrekt einzuordnen.

Er darf es nicht verwenden, um:

* fehlende Werte zu interpolieren,
* offene Regeln zu erfinden,
* visuelle Werte zu schätzen,
* DESIGN REVIEWs eigenständig zu schließen.

## 12. Component review inventory

Every implemented Core and Layout component has a review record containing the Bodywork prototype reference, review date, relevant default and interaction states, token mapping, Storybook evidence, open `DESIGN REVIEW` points, and documented chayns-UI deviations. A component remains blocked from final READY while a relevant item is missing or unresolved. This inventory records evidence; it does not create new tokens or component APIs.
