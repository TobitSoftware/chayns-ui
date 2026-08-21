# chayns UI – Motion

## 1. Purpose

Dieses Dokument ist die normative Foundation-Spezifikation für Bewegung und zeitliche Zustandsübergänge in `chayns UI`. Es liegt zwischen Design Foundations, Token Catalogue, Accessibility und späteren Component Specifications. Es definiert Bedeutung, Grenzen und Verwendung von Motion; der spätere Token Catalogue beziehungsweise die Runtime bildet diese Regeln technisch ab.

Es ist keine CSS-Implementierung, keine Animationsbibliothek, kein vollständiger Motion-Token-Dump und keine Component Specification. Fehlende Timing-Werte werden nicht visuell geschätzt.

## 2. Core Principles

### Motion communicates change

Motion macht Zustandsänderungen, räumliche oder visuelle Beziehungen, Ein-/Ausblendungen und Expand/Collapse nachvollziehbar und unterstützt Interaktionsfeedback. Sie ist kein Selbstzweck.

### Semantic Motion

Core Components wählen Motion nicht aufgrund lokaler visueller Vorlieben. Wiederkehrendes Motion-Verhalten wird auf bestätigte semantische Motion-Regeln oder Tokens zurückgeführt.

### State before animation

Der semantische Component State ist die Quelle der Wahrheit. Animation stellt den Übergang zwischen Zuständen dar und erzeugt keinen zusätzlichen fachlichen Zustand.

### Accessibility before continuity

Reduced-Motion-Anforderungen haben Vorrang vor visueller Kontinuität. Eine Komponente darf für Verständlichkeit oder Bedienbarkeit nicht davon abhängen, dass eine Animation vollständig abgespielt wird.

### No decorative default

Core Components erhalten nicht automatisch dekorative Bewegung. Motion benötigt einen funktionalen oder klar spezifizierten visuellen Zweck.

## 3. Motion Architecture

### 3.1 Motion Primitives

Motion Primitives sind zentral kontrollierte technische Grundwerte, soweit bestätigt, insbesondere Duration und Easing. Konkrete Werte gehören erst nach eindeutiger Übertragung in den Token Catalogue.

### 3.2 Semantic Motion Rules

Semantic Motion Rules beschreiben die Bedeutung eines Übergangs, nicht nur dessen Millisekundenwert.

### 3.3 Component-specific Motion

Component-specific Motion ist nur zulässig, wenn ein stabiles Component-Verhalten durch globale Motion-Regeln nicht ausreichend beschrieben wird.

### 3.4 Reduced Motion Resolution

Reduced Motion beschreibt die zentrale, konsistente Anpassung von Motion bei `prefers-reduced-motion`.

```text
Motion Primitives
        ↓
Semantic Motion Rules
        ↓
Accessibility / Reduced-Motion Resolution
        ↓
optional bestätigte component-specific Motion
        ↓
Component Rendering
```

Das Diagramm beschreibt Verantwortung und Datenfluss, keine Runtime- oder CSS-Architektur.

## 4. Motion Categories

Die folgenden Kategorien sind als konzeptionelle Einordnung durch bestehende Regeln und DesignSystem-Beispiele gedeckt. Sie sind noch kein kanonischer Token-Katalog.

| Category | Meaning | Current evidence |
|---|---|---|
| State transition | Visuelle Reaktion auf eine Zustandsänderung innerhalb bestehender UI-Struktur. | Motion erklärt Zustandsänderungen und Interaktionen; Hover/Press sind dokumentiert. |
| Enter / Exit | Ein Element wird sichtbar oder verlässt die Darstellung. | Das DesignSystem unterscheidet Enter und schnelleren Exit. |
| Expand / Collapse | Ein Bereich verändert seine sichtbare räumliche Ausdehnung. | Bestätigtes Accordion-Pattern mit `grid-template-rows`. |
| Feedback | Kurzes visuelles Feedback auf Interaktion oder Statusänderung. | Motion unterstützt Interaktion; dekorative Bewegung ist ausgeschlossen. |

Die endgültige Token-Zuordnung und eine vollständige Abgrenzung der Kategorien sind TECH REVIEW. Es werden keine weiteren Kategorien aus anderen Designsystemen abgeleitet.

## 5. Duration

Duration ist eine zentral kontrollierte Motion-Eigenschaft. Core Components führen keine beliebigen Millisekundenwerte ein. Das aktuelle DesignSystem belegt Duration-Stufen und die Regel, dass Exit schneller als Enter ist; die vollständigen konkreten Tabellenwerte sind aus den gebundenen Datenlisten nicht mit ausreichender Confidence extrahierbar.

Es werden deshalb keine Werte geschätzt, vermessen oder aus anderen Systemen übernommen. Die vollständige Duration-Matrix und ihre Zuordnung zu Kategorien bleiben TECH REVIEW.

## 6. Easing

Easing ist Bestandteil des Motion-Vertrags. Core Components verwenden keine beliebigen `ease`-, `ease-in`-, `ease-out`-, `linear`- oder Cubic-Bezier-Werte, sofern diese nicht durch eine bestätigte Foundation-Regel vorgesehen sind.

Das DesignSystem belegt Easing-Stufen, ihre vollständigen Werte und Zuordnungen sind aber nicht mit ausreichender Confidence aus den gebundenen Datenlisten übertragbar. Die Easing-Übertragung ist TECH REVIEW; Kurven werden nicht visuell rekonstruiert.

## 7. Property Selection

Für CSS-Animationen sind verbindlich `transform` und `opacity` vorgesehen. `grid-template-rows` ist die ausdrücklich bestätigte, begrenzte Ausnahme für dynamische Höhenübergänge. Andere animierte Layout-Eigenschaften sind ausgeschlossen; die spezialisierten Foundations nennen insbesondere `height`, `width`, `top`, `left`, `margin` und `padding`.

Diese enge Auswahl dient verständlichen, performanten und vorhersehbaren Übergängen. Sie erlaubt keine allgemeine Ableitung weiterer Properties oder Layout-Animationen.

## 8. Confirmed grid-template-rows Exception

`grid-template-rows` ist ausschließlich als gezielte Ausnahme für dynamische Höhenübergänge, insbesondere Accordions, CONFIRMED. Eine bestätigte Eigenschaft für ein bestätigtes Pattern wird nicht zu einer allgemeinen Motion-Policy hochgestuft.

Die Ausnahme bedeutet nicht, dass beliebige Layout Properties animiert werden dürfen, dass jede Expand/Collapse-Komponente dieselbe Umsetzung erhält oder dass Component Authors daraus eigene Layout-Animationen ableiten dürfen. APIs für Accordion, Disclosure, Collapse, Select oder Navigation werden hier nicht vorweggenommen.

## 9. Layout Motion

Layout-verändernde Motion benötigt besondere Begründung, weil sie umliegenden Content beeinflussen, Reflow erzeugen und in komplexen Oberflächen schwerer vorhersehbar sein kann. Sie ist nur zulässig, wenn das Pattern oder die Component Specification sie ausdrücklich vorsieht und Reduced Motion berücksichtigt.

Nicht bestätigte Layout Motion ist kein zulässiger Default.

## 10. State Model

Component State und Motion State sind nicht dasselbe. `open`, `closed`, `checked`, `unchecked`, `selected`, `unselected`, `loading` und `disabled` sind semantische Component States.

Zeitliche Darstellungsphasen wie `entering` oder `exiting` werden nur dann Teil eines öffentlichen State-Modells, wenn eine spätere Component Specification dies ausdrücklich verlangt. Dieses Dokument definiert keine generische öffentliche Motion-State-API.

## 11. Interaction States

Motion kann Zustandsänderungen begleiten, ersetzt aber keine visuell oder semantisch notwendige State-Darstellung. Hover, Focus, Error, Selection und Loading dürfen nicht nur durch Bewegung erkennbar sein. Loading benötigt bei erforderlichem semantischem Kontext zusätzliche, spezifizierte Information.

Die bestehenden Color- und State-Regeln bleiben unverändert; Motion definiert keine neuen davon.

## 12. Enter and Exit

Enter-/Exit-Motion darf semantische Sichtbarkeit oder Interaktivität nicht unklar machen. Die spätere Component Specification klärt, wann ein Element semantisch vorhanden, interaktiv und visuell sichtbar ist sowie wie Fokus während eines Übergangs behandelt wird.

Motion bestimmt diese Zuständigkeiten nicht implizit. Eine generische Mount-/Unmount-Strategie wird nicht festgelegt.

## 13. Expand and Collapse

Expand/Collapse verbindet semantischen Open/Closed-State, sichtbaren Content, Layout, Accessibility und Motion. Das bestätigte `grid-template-rows`-Pattern darf für den vorgesehenen dynamischen Höhenübergang verwendet werden.

Diese Foundation legt keine konkreten APIs oder Komponentenverhalten für Accordion, Disclosure, Collapse, Select oder Navigation fest. Diese Regeln folgen gegebenenfalls in Component Specifications.

## 14. Loading Motion

Loading kann Motion enthalten, sofern das Pattern dies vorsieht. Motion allein ist aber nicht die einzige Grundlage eines semantischen Loading-State. Das DesignSystem zeigt Spinner und Skeleton als notwendige Endlosanimationen; die bestätigte chayns-UI-Regel erlaubt notwendige Animationen wie Loading-Spinner bei Reduced Motion.

Eine gemeinsame detaillierte Regel für Spinner, Progress und Skeleton ist nicht bestätigt. Pattern-spezifische Motion bleibt TECH REVIEW, bis der jeweils erforderliche Umfang spezifiziert ist.

## 15. Reduced Motion

`prefers-reduced-motion` ist eine verbindliche globale Accessibility-Anforderung. Nicht notwendige Animationen, darunter Ein-/Ausblendungen, räumliche Übergänge und dekorative Feedback-Bewegungen, entfallen. Funktional notwendige Animationen wie ein Loading Spinner dürfen bestehen bleiben.

Reduced Motion bedeutet nicht pauschal, dass jede zeitliche Veränderung auf `0ms` gesetzt wird. Das System muss keine funktionale Abhängigkeit von Bewegung, keine unnötige räumliche Bewegung, verständliche Zustandsänderungen, robuste Endzustände und keine verlorene Information sicherstellen. Die exakte technische Resolution-Strategie bleibt TECH REVIEW.

## 16. Reduced Motion and Component Logic

Reduced Motion verändert die Darstellung eines Übergangs, nicht dessen fachliches Ergebnis. Ein geöffneter Bereich endet unabhängig von der Motion-Präferenz im Zustand `open`.

Component Logic darf nicht davon abhängen, dass ein `transitionend`-Event zwingend stattfindet, eine Animation eine Mindestdauer besitzt oder ein Nutzer die Bewegung wahrgenommen hat. Falls Event-Koordination später nötig ist, muss sie entfallende oder reduzierte Motion robust behandeln; dieses Dokument gibt keine Implementierung vor.

## 17. Focus and Motion

Fokusmanagement ist Accessibility- und Component-Verantwortung. Motion darf Fokus nicht verschlucken, unerwartet verschieben oder auf unsichtbaren beziehungsweise nicht interaktiven Content lenken. Enter-/Exit-Animationen dürfen visuelle und semantische Fokuszustände nicht auseinanderlaufen lassen.

Detaillierte Regeln folgen in `accessibility.md` und in Component Specifications.

## 18. Motion and Density

Motion und Density sind orthogonale Foundation-Dimensionen. Globale Density verändert nicht automatisch Motion Duration, Easing oder Motion Category. Es gibt keine Regel, nach der S schneller oder L langsamer animiert wird.

Eine density-abhängige Motion-Regel ist im aktuellen DesignSystem nicht eindeutig belegt und wird nicht abgeleitet.

## 19. Motion and Color

Motion und Color sind getrennte Foundation-Dimensionen. Ein State kann gleichzeitig eine Color-Änderung, Motion und strukturelle Änderung besitzen; keine Dimension ersetzt die andere. Bedeutung darf insbesondere nicht nur durch animierte Farbänderung kommuniziert werden. Siehe [color-system.md](color-system.md).

## 20. Motion and Typography

Motion verändert Typography Roles nicht semantisch. Text wird nicht als allgemeine Regel beim Enter kleiner oder größer, Weight wird nicht für Active animiert und Letter Spacing wird nicht als State Feedback verändert, sofern ein Pattern dies nicht ausdrücklich bestätigt. Siehe [typography.md](typography.md).

## 21. Motion and Visibility

Sichtbar, semantisch vorhanden, interaktiv und animierend sind getrennte Zustände. Sie dürfen nicht ungeprüft gleichgesetzt werden. Ein visuell ausblendendes Element darf beispielsweise nicht automatisch bis zum Ende der Animation interaktiv bleiben.

Die genaue Lifecycle-Regel gehört in die jeweilige Component Specification; dieses Dokument erzeugt keine globale Implementierungsstrategie.

## 22. Motion and Pointer Interaction

Motion blockiert Pointer-Interaktion nicht unnötig. Eine Component setzt nicht voraus, dass Nutzer nach jeder Interaktion eine dekorative Animation abwarten. Begrenzen fachliche Gründe Interaktion temporär, muss dies in der Component Specification begründet sein; eine allgemeine Debounce- oder Lock-Dauer wird nicht festgelegt.

## 23. Interruptibility

Interaktive Motion muss schnelle aufeinanderfolgende State-Änderungen robust behandeln. Komponenten dürfen nicht in inkonsistenten Zwischenzuständen verbleiben, wenn Nutzer erneut interagieren, der Zielzustand während eines Übergangs wechselt oder Reduced Motion berücksichtigt werden muss.

Eine allgemeine Interruptibility-Policy über diese Invariante hinaus ist TECH REVIEW. Dieses Dokument spezifiziert keine Animation State Machine.

## 24. Initial Render

Initiales Rendering wird nicht automatisch als Enter-Animation behandelt. Core Components animieren beim Mount nicht ohne spezifizierten Grund. Benötigt ein Pattern bewusst initiale Motion, muss dies ausdrücklich bestätigt sein. Eine globale `animateOnMount`-API wird nicht definiert.

## 25. Repeated Motion

Unendlich wiederholte oder dauerhaft laufende Animationen benötigen eine klare funktionale Begründung. Für Loading, Progress und Statusindikatoren gelten Accessibility und Reduced Motion. Dekorative Endlosschleifen sind kein Core-Component-Default.

Wiederholungszahlen und Timing-Werte werden nicht erfunden.

## 26. Consumer Rules

Consumer dürfen dokumentierte Component APIs verwenden, die vorgesehene Reduced-Motion-Umgebung des Browsers respektieren und bestätigte öffentliche Theme-/Foundation-Mechanismen nutzen.

Consumer dürfen standardmäßig nicht:

* interne Motion Durations überschreiben,
* interne Easings ersetzen,
* Core Components mit globalen Transition-Hacks verändern,
* Reduced-Motion-Verhalten deaktivieren,
* interne Animationen als fachliche Events interpretieren, sofern dies nicht Teil der öffentlichen API ist.

Eine bestätigte Motion-Override-API existiert nicht. Dieses Dokument führt keine neue ein.

## 27. Component Authoring Rules

Core Components verwenden keine frei erfundenen Durations, Easings, Delays, Keyframes oder Transition-Properties, wenn eine Foundation- oder Pattern-Regel zuständig ist. Sie enthalten keine dekorative Motion als Default, keine Abhängigkeit von Motion für semantische Verständlichkeit, keine lokalen Reduced-Motion-Ausnahmen ohne Spezifikation und keine Ableitung allgemeiner Layout Motion aus der `grid-template-rows`-Ausnahme.

Component Authors führen Motion auf bestätigte Foundation-Regeln, Pattern-Regeln oder component-specific Motion Tokens zurück.

## 28. Component-specific Motion Tokens

Component-specific Motion Tokens sind nur zulässig, wenn ein wiederverwendbares Component-Verhalten eine stabile Motion-Anforderung besitzt, globale Motion-Regeln nicht ausreichend spezifisch sind und die Abweichung fachlich oder durch das Pattern begründet ist.

Sie verstecken keine beliebigen Werte, umgehen Reduced Motion nicht und erzeugen keine parallele allgemeine Motion-Sprache. Konkrete Token-Namen werden nicht erfunden.

## 29. Relationship to Tokens

`motion.md` definiert Motion-Semantik, Kategorien, State-Beziehung, Property-Guardrails, Reduced-Motion-Invarianten und Authoring-Regeln. `tokens.md` definiert später kanonische technische Token-Namen, konkrete Duration-/Easing-Werte, primitive/semantic/component-specific Zuordnung und gegebenenfalls die tokenbasierte Reduced-Motion-Auflösung.

Beide Dokumente dürfen keine widersprüchliche Doppeldefinition erzeugen.

## 30. Relationship to Accessibility

`motion.md` enthält die Motion-spezifischen Accessibility-Invarianten. Das spätere `accessibility.md` definiert systemweite Anforderungen und Prüfregeln. Motion interpretiert Accessibility nicht lokal neu.

Spätere Tests berücksichtigen mindestens Reduced Motion, Fokus, semantische State-Erkennbarkeit und Bedienbarkeit während sowie nach Übergängen. Dieses Dokument erstellt keine vollständige Accessibility-Testmatrix.

## 31. Relationship to Components

Eine spätere Component Specification beschreibt für relevante Motion explizit:

* den wechselnden semantischen State,
* ob Motion vorgesehen ist,
* die Motion Rule oder den Token,
* die bestätigte Property oder das Pattern, soweit erforderlich,
* Reduced Motion,
* Interaktion und Fokus während des Übergangs.

Dieses Dokument erstellt keine Component Specification.

## 32. Open Technical Work

| Work item | Status | Required outcome |
|---|---|---|
| Duration-Werte und Staffelung | TECH REVIEW | Vollständige, eindeutig belegte Werte und Zuordnung zu Motion-Kategorien. |
| Easing-Werte und Kurven | TECH REVIEW | Vollständige, eindeutig belegte Kurven und Zuordnung. |
| Semantic-to-Token Mapping | TECH REVIEW | Kanonische technische Zuordnung von Motion Rules zu Tokens. |
| Reduced-Motion Resolution | TECH REVIEW | Konsistente technische Umsetzung der bestätigten Invarianten. |
| Bestätigte Motion Properties | TECH REVIEW | Übertragung der begrenzten Property-Policy in den technischen Token-/CSS-Vertrag. |
| Reichweite von `grid-template-rows` | TECH REVIEW | Patterngebundene Dokumentation, insbesondere für Accordion, ohne allgemeine Layout-Motion-Erlaubnis. |
| Component-specific Motion Token Catalogue | TECH REVIEW | Zulässige Kategorien und Herleitung aus Foundation Rules. |
| Interruptibility-Vertrag | TECH REVIEW | Über die Robustheitsinvariante hinausgehende, nötige allgemeine Regeln. |
| Loading-/Progress-/Skeleton-Motion | TECH REVIEW | Pattern-spezifische Regeln für notwendige Motion und semantischen Kontext. |
| Teststrategie für Reduced Motion | TECH REVIEW | Prüfkriterien und spätere Tooling-Anbindung. |

Es besteht kein zusätzlicher DESIGN REVIEW oder OPEN innerhalb des Motion-Modells: Die Designrichtung ist für diese Punkte vorhanden, die technische Übertragung oder Ausgestaltung fehlt.

## 33. Decision Register Impact

Dieses Dokument kann später als Referenz für folgende bestehende Entscheidungen dienen:

* MOTION-001–007 werden bestätigt und in ihrer Foundation-Bedeutung präzisiert, einschließlich des schnelleren Exit, `prefers-reduced-motion`, notwendiger Loading-Motion und der `grid-template-rows`-Ausnahme.
* A11Y-001–005 können auf Reduced Motion, Fokus und State-Erkennbarkeit verweisen.
* TOKEN-001, TOKEN-002 und TOKEN-006 können auf die ausstehende Motion-Token-Übertragung verweisen.
* DENSITY-001–005 und die Density-Foundation können auf die Orthogonalität von Density und Motion verweisen.

Kein Eintrag wird als erledigt markiert. Das Decision Register wird in diesem Schritt nicht geändert.

## 34. AI Rules

Ein KI-Agent darf bestätigte Motion Rules, Motion Tokens und component-specific Motion verwenden sowie die bestätigte `grid-template-rows`-Regel ausschließlich in ihrem dokumentierten Scope verwenden.

Ein KI-Agent darf nicht:

* Duration-Werte, Easing-Kurven, Delays oder Keyframes erfinden,
* Animationen aus dem gerenderten DesignSystem zeitlich vermessen,
* Werte aus anderen Designsystemen übernehmen,
* dekorative Animationen ergänzen, weil sie moderner wirken,
* Reduced Motion ignorieren,
* Component Logic von einer abgespielten Animation abhängig machen,
* aus einer bestätigten Layout-Animation eine allgemeine Erlaubnis für Layout Motion ableiten.

Fehlt eine benötigte Motion-Regel, wird nicht improvisiert. Der Agent meldet einen Foundation Gap.

## Milestone 1 Button mapping

Button and IconButton add no CSS transition or animation. Hover, focus, disabled and color changes are immediate. The directly evidenced active feedback uses only the allowed `transform` property and no duration or easing. Because there is no timed or continuous component Motion, no special `prefers-reduced-motion` branch is needed. This decision is limited to Milestone 1 Button and does not resolve the general Motion-token work.
