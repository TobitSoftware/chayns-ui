# chayns UI – Component Development Standard

## 1. Purpose and Scope

Dieser Standard ist die verbindliche technische Arbeitsgrundlage für neue und wesentlich geänderte Komponenten von `chayns UI`. Er konsolidiert bestehende Architektur-, Foundation-, Accessibility- und Governance-Regeln in überprüfbare Komponentenanforderungen.

Er gilt für Core Components, Layout Components und Business Components. Er ergänzt, aber ersetzt nicht:

* die logischen Verantwortungs- und Dependency-Grenzen in der [Architecture](../00-project/architecture.md),
* verbindliche Entscheidungen im [UI Decision Register](../01-decisions/ui-decision-register.md),
* visuelle und interaktive Foundations in [Design Foundations](../02-design-system/design-foundations.md), [Tokens](../02-design-system/tokens.md), [Color System](../02-design-system/color-system.md), [Typography](../02-design-system/typography.md), [Motion](../02-design-system/motion.md), [Accessibility](../02-design-system/accessibility.md) und [Density](../02-design-system/density.md),
* die operative Governance in [AGENTS.md](../../AGENTS.md).

Bei einem Konflikt gelten die dokumentierte Source-of-Truth-Priorität und insbesondere bestätigte Decisions. Dieser Standard erzeugt keine Komponenten-API, keine technische Toolchain und keine neue Foundation.

Der aktuelle Repository-Stand enthält keine Produktionskomponenten, Komponenten-Tests, `package.json` oder Toolchain-Konfiguration. Deshalb werden keine beobachteten Implementierungsmuster als bereits etablierte Projektkonvention dargestellt. Dieser Standard ist technologie- und testframework-agnostisch, bis die bestehenden Open Decisions dafür geklärt sind.

## 2. Normative Language

Die folgenden Begriffe sind normativ zu verstehen:

* **MUST**: zwingende Anforderung. Eine Abweichung ist nur zulässig, wenn eine höher priorisierte, dokumentierte Entscheidung sie ausdrücklich erlaubt.
* **MUST NOT**: zwingend verboten.
* **SHOULD**: erwarteter Standard. Eine Abweichung benötigt einen dokumentierten, komponentenspezifischen Grund.
* **SHOULD NOT**: grundsätzlich zu vermeiden. Eine Abweichung benötigt einen dokumentierten, komponentenspezifischen Grund.
* **MAY**: zulässig, wenn sie zu allen bestätigten Foundations, Decisions und Component Specifications passt.

`OPEN DECISION` kennzeichnet ausschließlich eine bereits offene oder tatsächlich entscheidungsbedürftige Projektfrage. Sie darf nicht durch diesen Standard, Komponenten-Code oder einen plausiblen Best Guess geschlossen werden.

## 3. Component Categories

Die Projektkategorien und ihre erlaubten Abhängigkeiten folgen der [Architecture](../00-project/architecture.md#10-dependency-rules).

| Category | Responsibility | Allowed dependencies | MUST NOT | Reuse boundary |
|---|---|---|---|---|
| Core Component | Vollständige sichtbare, generische UI, lokale UI-Interaktion, Semantik und Accessibility. | Design Foundations; gegebenenfalls definierter Core-Context. | Business-/Produktlogik, chayns APIs, Datenbeschaffung, Application-Abhängigkeiten. | Produkt- und datenquellenunabhängig. |
| Layout Component | Wiederverwendbare räumliche Beziehungen und generische Layout-Interaktion. | Core, Design Foundations, definierter Layout-Context. | Business-/Produktlogik, Persistenztechnologie, Application-Abhängigkeiten. | Produktübergreifende Layoutprobleme. |
| Business Component | Wiederverwendbare chayns-spezifische Daten-, Auswahl- und Fachlogik auf sichtbarer Core-/Layout-UI. | Core, Layout, Design Foundations, chayns-spezifische Integration. | Eigene parallele sichtbare UI-Sprache oder Application-Abhängigkeiten. | Wiederkehrende fachliche Domäne. |
| Application | Produktseiten, Routing, Berechtigungen, persistente Produktzustände und konkrete Datenflüsse. | Core, Layout, Business. | Zentrale UI-Patterns lokal duplizieren, wenn eine passende chayns-UI-Lösung existiert. | Einzelnes Produkt. |

`Primitive Component` und `Composite Component` sind derzeit keine zusätzlichen Architektur-Layer:

* **Primitive** ist keine bestätigte Component Category. Eine generische sichtbare Basis gehört, wenn sie die Core-Kriterien erfüllt, zu Core UI.
* **Composite** beschreibt eine Form der Composition, nicht eine eigene Ownership-Grenze. Eine zusammengesetzte Komponente bleibt Core, Layout oder Business entsprechend ihrer Verantwortung und Abhängigkeiten.

Die Architecture nennt nur mögliche spätere Beispiele. Es gibt im aktuellen Repository keine implementierten Referenzkomponenten, aus denen weitere Kategorien oder Beispiele abgeleitet werden dürfen.

## 4. Public Component API

Eine öffentliche API MUST die fachliche und UI-semantische Verantwortung der jeweiligen Kategorie widerspiegeln. Sie MUST klein genug bleiben, dass sie ohne Kenntnis interner DOM- oder Styling-Details verwendbar ist.

### Props and types

* Jede öffentliche Prop MUST einen dokumentierten Zweck, Typ, Zuständigkeitsbereich und relevante States haben.
* Erforderliche Props MUST nur verwendet werden, wenn die Komponente ohne sie nicht sinnvoll oder zugänglich funktionieren kann. Optionale Props MUST einen klaren Default oder ein klar dokumentiertes Fehlen-Verhalten haben.
* Boolean Props SHOULD mit `is`, `has`, `can` oder `should` beginnen und MUST einen echten Zustand oder eine Fähigkeit ausdrücken. Mehrere Boolean Props dürfen keine unklare, gegenseitig widersprüchliche Variantenmatrix erzeugen.
* Varianten MUST als begrenzte, dokumentierte Union modelliert werden. Neue Varianten, lokale Größen oder State-Flags MUST NOT nur aus Implementierungsbequemlichkeit entstehen.
* Callback Props MUST mit `on` beginnen. Interne Handler SHOULD mit `handle` beginnen. Wenn ein natives Element die benötigte Semantik bereits anbietet, MUST die API dessen Plattformkonvention vorrangig bewahren statt eine parallele Abstraktion einzuführen.
* Öffentliche TypeScript-Verträge MUST präzise sein. Der konkrete Projektstil für `type` gegenüber `interface` ist noch nicht durch bestehenden Code festgelegt und wird hier nicht entschieden.

### Native attributes and prop forwarding

* Eine Komponente MUST native Attribute und Events der von ihr repräsentierten Semantik bevorzugen, sofern sie mit ihrem dokumentierten Verhalten vereinbar sind.
* Kompatible `data-*`- und `aria-*`-Attribute MUST an das semantisch passende Element weitergegeben werden, soweit sie nicht eine bereits definierte, zugängliche Component-Semantik verletzen.
* Rest Props MAY an das semantische Root-Element weitergegeben werden. Sie MUST NOT unkontrolliert an einen dekorativen Wrapper, ein falsches Kind oder mehrere Elemente verteilt werden.
* Eine Komponente MUST dokumentieren, wenn sie ein natives Attribut bewusst steuert, ersetzt oder nicht weiterreichen kann. Sie MUST NOT stillschweigend konkurrierende Zustandsquellen erzeugen.

## 5. DOM and Ref Contract

* Das Root-Element MUST die primäre semantische Verantwortung der Komponente tragen, wenn ein einzelnes passendes natives Element existiert.
* Zusätzliche Wrapper MUST einen konkreten Zweck für Semantik, Layout, Accessibility oder bestätigte Composition haben. Sie MUST NOT nur zur Erleichterung fragiler Styles oder Selektoren entstehen.
* Die semantische DOM-Reihenfolge MUST der logischen Lese-, Fokus- und Interaktionsreihenfolge entsprechen. Sie MUST NOT allein für eine optische Anordnung manipuliert werden.
* Der interne DOM-Aufbau ist nicht automatisch öffentliche API. Eine Component Specification MUST nur die DOM-Teile als Vertrag benennen, die Consumer, Accessibility oder dokumentierte Composition tatsächlich benötigen.
* Wenn eine Komponente eine Ref-Unterstützung anbietet, MUST sie Ziel, Semantik und Stabilität des Ref-Ziels dokumentieren. Ein Ref MUST auf das relevante interaktive oder semantische Element zeigen, nicht auf einen zufälligen Wrapper.
* Die konkrete Ref-Weitergabe richtet sich nach der später bestätigten React-Version und Toolchain. Dieser Standard schreibt keine versionsspezifische React-Konvention vor.

## 6. Composition

Composition ist die bevorzugte Form, Beziehungen zwischen UI-Teilen auszudrücken. Container verantworten Gruppierung, Kontext und Abstände zwischen ihren Kindern; einzelne Controls MUST NOT ihre externen Abstände zu Nachbarn selbst bestimmen.

* `children` SHOULD verwendet werden, wenn Consumer-Inhalt in einer klaren, semantischen Region gerendert wird.
* Benannte Slots, Subcomponents, Compound Components oder render props MAY nur verwendet werden, wenn sie eine stabile Beziehung ausdrücken, die mit einer kleineren Props-API nicht klar abbildbar ist.
* Composition MUST NOT benutzt werden, um eine sonst fehlende Komponentenverantwortung oder eine unklare API zu verstecken.
* Eine sehr große Props-API SHOULD zuerst auf sinnvollere Composition geprüft werden. Umgekehrt SHOULD eine einfache, eindeutige Konfiguration nicht künstlich in ein Compound Pattern überführt werden.
* Context MAY wiederkehrenden, ausdrücklich definierten UI-Kontext bereitstellen, etwa Gruppenverhalten oder einen Layout-Kontext. Er MUST NOT unbemerkt beliebige visuelle Varianten oder Domain-Zustand in Kinder injizieren.

Es existiert aktuell kein implementiertes Slot-, Compound- oder render-prop-Pattern als Projektkonvention. Eine spätere Component Specification muss ihre benötigte Composition ausdrücklich festlegen.

## 7. Controlled and Uncontrolled State

State Ownership MUST für jede stateful Component eindeutig sein.

* Eine **controlled** Component erhält ihren maßgeblichen Wert von außen und meldet Änderungswünsche über einen dokumentierten Callback. Sie MUST den externen Wert nicht in einen konkurrierenden dauerhaften lokalen Zustand kopieren.
* Eine **uncontrolled** Component verwaltet nur den für ihr UI nötigen lokalen Zustand. Ein möglicher Startwert MUST als Default-Wert klar von einem kontrollierten Wert getrennt sein.
* Wenn eine Component beide Formen unterstützt, MUST ihre Specification kontrollierte Props, Default-Props, Change-Callbacks, Priorität und Synchronisationsverhalten eindeutig beschreiben.
* Eine Component MUST NOT während ihres Lebenszyklus stillschweigend zwischen controlled und uncontrolled wechseln.
* Abgeleiteter State SHOULD berechnet statt redundant gespeichert werden.
* Core und Layout MAY den für generische UI-Interaktion notwendigen lokalen State halten. Fachlicher, persistenter oder datenabhängiger State gehört in Business oder Application.

Die konkrete Prop-Namens- und Callback-Signatur wird pro Component Specification aus nativer Semantik und bestätigtem Interaction Pattern abgeleitet; sie ist nicht global vorentschieden.

## 8. State, Variant and Semantic Separation

Eine Component Specification MUST die folgenden Ebenen getrennt betrachten:

| State type | Meaning | Ownership |
|---|---|---|
| Visual variant | Dokumentierte Darstellung mit eigener semantischer Verwendung. | Component Specification und Foundations. |
| Interaction state | Beispielsweise open/closed, pressed, focused oder hovered. | Core oder Layout, soweit für generische UI nötig. |
| Application/domain state | Fachliche Prozesse, Berechtigungen, Daten und Persistenz. | Business oder Application. |
| Accessibility state | Semantik, native Zustände, ARIA-Information, Focus und Bedienbarkeit. | Jede sichtbare Component innerhalb ihrer Verantwortung. |

Visual variants MUST NOT als Ersatz für Domain-State dienen. Domain-State MUST NOT als zufällige Styling-Prop in Core eindringen. Accessibility-Information MUST weder allein aus Farbe noch allein aus Motion abgeleitet werden.

## 9. Styling Contract

Komponenten implementieren bestätigte Designregeln; sie definieren keine parallelen Foundations.

* Komponenten MUST bestätigte Primitive-, Semantic- oder Component-specific Tokens gemäß [Tokens](../02-design-system/tokens.md) und [Token Catalogue](../02-design-system/token-catalogue.md) konsumieren.
* Farben MUST semantische Rollen aus dem [Color System](../02-design-system/color-system.md) konsumieren. Komponenten MUST NOT Accent-, Contrast-, Dark- oder Color-Deficiency-Werte lokal berechnen.
* Typography MUST bestätigte Rollen und Daten aus [Typography](../02-design-system/typography.md) verwenden. Komponenten MUST NOT Fonts laden oder selbst global setzen.
* Spacing zwischen Komponenten gehört dem Container. Interne Maße MUST definierte Foundation- oder Component-specific Tokens beziehungsweise ausdrücklich dokumentierte Property-Evidence verwenden.
* Radien, Borders, Shadows, Z-Layers, Control-Geometrie und Motion-Werte MUST aus bestätigten Foundations stammen. Fehlt eine notwendige Zuordnung, greift das Component Implementation Readiness Gate.
* Hardcoded Designwerte MUST NOT verwendet werden, wenn dafür ein bestätigter Token existiert. Ein lokaler Wert ist nur zulässig, wenn er als bestätigte Foundation-Property-Evidence dokumentiert ist und keine neue öffentliche Token- oder Component-API erzeugt.
* CSS-in-JS ist nicht vorgesehen. Styling erfolgt später mit Standard-CSS oder Build-Time-CSS mit normalem CSS-Output gemäß [AGENTS.md](../../AGENTS.md).
* Responsive Verhalten MUST aus einer Component Specification oder bestätigten Layout-/Foundation-Regeln folgen. Komponenten MUST NOT eigene Breakpoints oder Device-Heuristiken erfinden.
* Consumer MAY nur dokumentierte öffentliche APIs und später bestätigte Override-Mechanismen verwenden. Interne Tokens oder fragile DOM-Strukturen sind keine Consumer-Styling-API.

Class-Naming, Style-Dateistruktur und die technische CSS-Organisation sind noch nicht durch implementierten Projektcode oder eine bestätigte Toolchain festgelegt.

## 10. Accessibility Contract

Accessibility ist funktionale Korrektheit und MUST mindestens [WCAG 2.2 AA](../02-design-system/accessibility.md#2-baseline-and-scope) erfüllen.

* Native HTML-Semantik und native Controls MUST vor nachgebauten Controls und ARIA bevorzugt werden. ARIA ergänzt notwendige Semantik, ersetzt sie aber nicht.
* Jede interaktive Funktion MUST vollständig per Tastatur bedienbar sein, eine logische Fokusreihenfolge haben, sichtbaren Focus besitzen, keinen Keyboard Trap erzeugen und keine positiven `tabindex`-Werte verwenden.
* Interactive Controls MUST einen eindeutigen Accessible Name besitzen. Icon-only Controls MUST einen zugänglichen Namen erhalten; ein sichtbarer Tooltip oder `title` ersetzt ihn nicht.
* Labels, Fehler, Status- und dynamische Inhalte MUST sichtbar und/oder programmatisch passend zugeordnet sein. Relevante Bedeutung MUST NOT ausschließlich über Farbe oder Motion vermittelt werden.
* Disabled, loading, error, selected und vergleichbare Zustände MUST semantisch, visuell und für Assistive Technology konsistent sein, soweit sie für das Pattern relevant sind.
* Programmatic Focus, Focus-Begrenzung und Fokuswiederherstellung MUST einen funktionalen, spezifizierten Grund haben. Für komplexe Patterns darf kein Focus-Verhalten geraten werden.
* Zoom, Reflow, lokalisierte Textlängen, Pointer/Touch und `prefers-reduced-motion` MUST gemäß [Accessibility](../02-design-system/accessibility.md) und den betreffenden Foundations berücksichtigt werden.

Eine bekannte WCAG-2.2-AA-Verletzung in Core UI blockiert die Veröffentlichung. Das [Accessibility Implementation Gate](../../AGENTS.md#accessibility-implementation-gate) gilt für Core, Layout und Business.

## 11. Motion Contract

Motion beschreibt einen Zustandsübergang, erzeugt aber keinen zusätzlichen fachlichen Zustand. Der semantische Component State bleibt die Quelle der Wahrheit.

* Komponenten MUST die Regeln in [Motion](../02-design-system/motion.md) und [Design Foundations](../02-design-system/design-foundations.md#12-motion) verwenden.
* CSS-Motion MUST auf `transform` und `opacity` beschränkt bleiben. `grid-template-rows` ist ausschließlich die bestätigte, patterngebundene Ausnahme für dynamische Höhenübergänge.
* Komponenten MUST NOT eigene Durations, Easings, Delays, Keyframes oder Layout-Motion ableiten, wenn keine bestätigte Foundation- oder Pattern-Regel existiert.
* Motion MUST einen funktionalen oder klar spezifizierten visuellen Zweck haben. Dekorative Default-Animation ist unzulässig.
* `prefers-reduced-motion` MUST berücksichtigt werden. Eine reduzierte oder entfallende Motion darf den fachlichen Zielzustand, Fokus oder Bedienbarkeit nicht verändern.

Die technische Motion-Token- und Komponenten-Mapping-Arbeit ist weiterhin teilweise offen. Komponenten dürfen diese Lücke nicht mit lokalen CSS-Werten schließen.

## 12. Standard Component States

Eine Component MUST nur States anbieten und dokumentieren, die für ihre Verantwortung relevant sind. Sie MUST NOT künstlich jeden bekannten State implementieren.

| State | Requirement when relevant |
|---|---|
| default | Normale, nicht hervorgehobene Darstellung und Semantik. |
| hover | Nur als zusätzliche Pointer-Rückmeldung; niemals einziger Zugang zu einer Funktion oder Information. |
| focus / focus-visible | Sichtbar, tastaturgerecht und mit dokumentierter Foundation-Zuordnung. |
| active / pressed | Darstellung eines tatsächlichen Interaktionszustands, nicht Domain-State. |
| selected | Nur bei einer definierten Auswahlsemantik. |
| disabled | Nicht verfügbar und semantisch korrekt; nicht nur optisch gedimmt. |
| read-only | Von disabled getrennt, wenn weiterhin lesbar oder fokussierbar. |
| loading | Verständlicher fachlicher/UI-Zustand ohne alleinige Abhängigkeit von Animation. |
| error | Klare, nicht nur farbliche Fehlerkommunikation mit zugänglicher Zuordnung. |
| success | Nur bei tatsächlicher, dokumentierter Erfolgsbedeutung. |
| empty | Nur wenn die Component selbst einen leeren UI-Zustand verantwortet. |

## 13. Loading, Async and Error Behavior

* Core Components MUST NOT Daten laden, wiederholen oder fachliche Fehler interpretieren.
* Core Components MAY einen dokumentierten Loading-, Disabled-, Error- oder Empty-State darstellen, wenn der Consumer beziehungsweise die Business-/Application-Ebene den Zustand und Inhalt liefert.
* Business Components MAY Datenbeschaffung und fachliche Fehlerzustände kapseln, müssen ihre sichtbare UI aber aus Core und gegebenenfalls Layout aufbauen.
* Retry-Verhalten, Berechtigungen und fachliche Folgen einer Aktion gehören zu Business oder Application, sofern sie nicht Teil eines dokumentierten generischen Interaction Patterns sind.
* Eine Component MUST NOT eine asynchrone Aktion durch lokale Deaktivierung, Spinner oder Fehlermeldung nur vermuten. Auslöser, Ownership, parallele Interaktion und Recovery müssen spezifiziert sein.

## 14. Context and Dependencies

* Context MAY für dokumentierten, wiederverwendbaren UI-Kontext verwendet werden, wenn Props oder Composition dieselbe Beziehung nicht klar und wartbar ausdrücken.
* Props oder Composition SHOULD bevorzugt werden, wenn die Abhängigkeit lokal, explizit und leicht weiterzugeben ist.
* Context MUST NOT eine versteckte globale Abhängigkeit auf Business-Daten, Routing, Theme-Herkunft oder Application-State erzeugen.
* Jede Component MUST ihre Kategoriegrenzen und erlaubten Abhängigkeiten aus der [Architecture](../00-project/architecture.md#10-dependency-rules) einhalten.
* Core MUST NOT Business oder Application importieren. Layout MUST NOT Business oder Application importieren. Business MUST NOT Application importieren.

**OPEN DECISION: Technische Context-Mechanismen zwischen Containern und Children sind als OPEN-010 nicht entschieden.** Dieser Standard verlangt nur die fachliche Dokumentation von Context-Verhalten, nicht dessen technische Umsetzung.

## 15. Testing Requirements

Tests MUST vorrangig öffentlich beobachtbares Verhalten prüfen, nicht interne State-Struktur, DOM-Zwischenschritte oder private Hilfsfunktionen.

Für jede relevante Component Specification MUST die erforderliche Testabdeckung festgelegt werden:

* Rendering der dokumentierten API, Varianten und relevanten States,
* Nutzerinteraktionen einschließlich dokumentierter Tastaturbedienung,
* sichtbarer Focus und relevante Accessibility-Semantik,
* controlled/uncontrolled Verhalten, wenn die Component beide Formen anbietet,
* Loading-, Error-, Disabled- und Empty-Verhalten, sofern relevant,
* Regressionen für zuvor gefundene Fehler,
* Zoom/Reflow, Reduced Motion, Kontrast und Screenreader-/Semantik-Prüfung gemäß [Accessibility](../02-design-system/accessibility.md#12-testing-strategy), soweit automatisiert oder manuell erforderlich.

Snapshots MAY als ergänzende Regressionserkennung dienen, sind aber kein ausreichender Nachweis für Interaktion, Accessibility oder korrekte Semantik. Automatisierte Accessibility-Prüfungen allein sind ebenfalls nicht ausreichend; Keyboard-, Screenreader-/Semantik- und visuelle Prüfungen bleiben erforderlich.

**OPEN DECISION: Der Testing-Stack ist als OPEN-013 nicht entschieden.** Es gibt derzeit keine Testkonfiguration oder Testdateien im Repository. Dieser Standard schreibt deshalb kein Testframework, keine Test-API und keine Ausführungsanweisung vor.

## 16. Documentation Requirements

Eine neue oder wesentlich geänderte Component MUST vor der Implementierung eine ausreichend vollständige Specification besitzen. Soweit relevant, dokumentiert sie mindestens:

* Purpose, Verantwortung sowie Use When und Do Not Use When,
* Kategorie und Abgrenzung zu Core, Layout, Business und Application,
* Anatomy und Composition,
* öffentliche API inklusive Props, Defaults, controlled/uncontrolled Ownership und Callbacks,
* native Semantik, DOM-/Ref-Vertrag und relevante Attribute,
* Varianten, States, lokale Größenvarianten und Density-Verhalten,
* verwendete Foundations, Tokens und bestätigte Property-Evidence,
* Accessibility, Keyboard, Focus, Screenreader/ARIA und Statusdarstellung,
* Motion und Reduced Motion, soweit vorgesehen,
* responsive Verhalten, Text-/i18n-Robustheit sowie relevante Context-Einflüsse,
* Tests, Acceptance Criteria, bekannte Einschränkungen und Edge Cases.

**OPEN DECISION: Das maschinenlesbare Component-Specification-Format ist als OPEN-011 und AI-005 nicht entschieden.** Dieser Standard definiert den erforderlichen Inhalt, nicht Dateiformat, Ablageort oder Automatisierung der Specification.

## 17. Component Implementation Readiness Gate

Das [Component Implementation Readiness Gate](../../AGENTS.md#component-implementation-readiness-gate) ist verbindlich und wird hier nicht neu definiert:

* Eine Core-, Layout- oder Business-Komponente darf erst implementiert oder wesentlich erweitert werden, wenn alle für sie implementierungsrelevanten Anforderungen eindeutig bestimmt, dokumentiert und prüfbar sind.
* Eine implementation-relevant ambiguity ist ein Blocker. Mehrere plausible oder technisch gleichwertige Lösungen erlauben keinen Best Guess.
* Wird eine Lücke während der Arbeit sichtbar, MUST der betroffene Schritt stoppen, die Frage dokumentiert und durch die zuständige menschliche Rolle oder autorisierte Source of Truth geklärt werden.
* Nur komponentenrelevante OPEN-, DESIGN REVIEW- oder TECH REVIEW-Punkte blockieren; nicht jeder globale offene Punkt des Projekts.

Das Accessibility Implementation Gate und das Internationalization Implementation Gate aus [AGENTS.md](../../AGENTS.md) gelten zusätzlich, wenn ihre Abhängigkeiten für die konkrete Component relevant sind.

## 18. Definition of Done

Eine Component ist erst fertig, wenn alle zutreffenden Punkte erfüllt und überprüft sind:

* Zweck, Kategorie, API und State Ownership entsprechen der bestätigten Specification.
* Öffentliche TypeScript-Verträge sind vollständig und machen keine internen Details erforderlich.
* Native Semantik, DOM-/Ref-Vertrag und Prop Forwarding sind korrekt dokumentiert und umgesetzt.
* Styling verwendet nur bestätigte Foundations, Tokens oder dokumentierte Property-Evidence; keine neue freie Styling-API entsteht.
* Relevante Varianten und States einschließlich Loading, Error und Disabled sind vollständig spezifiziert und getestet.
* Accessibility-Anforderungen, Keyboard, Focus, Screenreader-/ARIA, Kontrast, Reflow und Reduced Motion sind erfüllt.
* Erforderliche automatisierte und manuelle Tests sind durchgeführt; Snapshots oder automatisierte A11Y-Checks allein genügen nicht.
* Dokumentation und Acceptance Criteria entsprechen dem Umfang der Änderung.
* Es wurden keine unnötigen neuen Abstraktionen, versteckten Dependencies oder parallelen Designregeln eingeführt.
* Alle für die Component relevanten Readiness Gates sind erfüllt. Diese Definition of Done ist keine Implementierungsfreigabe, solange ein relevanter Gate-Blocker besteht.

## 19. Anti-Patterns

Folgende Muster sind mit den bestehenden Projektregeln unvereinbar:

* semantisch unnötige Wrapper oder fragile Styles, die einen bestimmten internen DOM-Aufbau für Consumer voraussetzen,
* nachgebaute semantische Controls, wenn ein geeignetes natives Element existiert,
* unkontrolliertes Prop-Wachstum statt klarer Composition oder klarer Verantwortungsgrenze,
* Business-, Datenbeschaffungs- oder Application-Logik in Core oder Layout,
* frei erfundene Tokens, Varianten, lokale S/M/L-APIs, Breakpoints, Theme-Berechnungen oder Designwerte,
* externe Abstände, die einzelne Controls selbst statt ihr Container bestimmt,
* Accessibility als nachträglicher Patch, insbesondere fehlende Keyboard- oder Focus-Regeln,
* Motion als Dekoration oder als Quelle fachlicher Zustände,
* Tests gegen Implementierungsdetails statt sichtbares Verhalten,
* Best-Guess-Implementierung bei einer implementierungsrelevanten Lücke.

## 20. Existing Open Decisions Affecting Component Work

Die Milestone-1-ADRs schließen Testing-Stack und Component-Dateistruktur für den freigegebenen Scope. Weiterhin offen bleiben:

* **OPEN DECISION: OPEN-011 / AI-005 – maschinenlesbares Component-Specification-Format.** Bis zur Entscheidung gelten die in diesem Dokument beschriebenen Inhaltsanforderungen.
* **OPEN DECISION: OPEN-010 – technischer Context-Mechanismus.** Component Specifications dürfen fachlichen Context beschreiben, aber keinen technischen Mechanismus voraussetzen.

Für Milestone 1 liegen Component-Implementierung, Typen, CSS, Tests und Stories gemeinsam im domain-orientierten Component-Ordner. Implementierungen verwenden intern Default Exports; öffentliche Root- und Component-Subpath-Barrels stellen Named Exports und öffentliche Types bereit. Diese Konvention wird erst nach weiterer Erfahrung auf andere Paketarten erweitert.

Weitere Foundation- und Component-spezifische Lücken bleiben gemäß Decision Register, Foundation-Dokumenten und den Readiness Gates blockierend, sobald sie die konkrete Component betreffen.

## 21. Relationship to AI

KI-Agenten MUST diesen Standard gemeinsam mit den referenzierten Sources of Truth anwenden. Sie MAY bestätigte Regeln wiederverwenden, MUST NOT aber fehlende APIs, Tokens, States, Accessibility-/Motion-Verhalten, Context-Mechanismen oder Toolchain-Konventionen interpolieren.

Wenn dieser Standard und eine spätere Component Specification keine eindeutige Antwort liefern, gilt das Component Implementation Readiness Gate: nicht implementieren, konkrete Lücke benennen und dokumentierte Klärung einholen.
