# chayns UI – Component Specification Format

## Purpose

Eine Component Specification ist der verbindliche Vertrag einer einzelnen wiederverwendbaren Komponente. Sie steht zwischen Design- und Produktentscheidungen, den Design Foundations, dem [Component Development Standard](component-development-standard.md), Implementierung, Tests, Dokumentation und KI-Nutzung.

Sie MUSS ausreichend eindeutig sein, damit ein Entwickler oder KI-Agent die Komponente später implementieren kann, ohne implementierungsrelevante Produkt-, Design-, API- oder Interaktionsentscheidungen selbst zu treffen. Sie ist keine nachträgliche Beschreibung bereits geschriebenen Codes. Sie wird vor der ersten Implementierung beziehungsweise vor einer wesentlichen konzeptionellen Neugestaltung erstellt und freigegeben.

Dieses Dokument definiert den verbindlichen **inhaltlichen** Vertrag in Markdown. Es entscheidet weder ein maschinenlesbares Serialisierungsformat noch dessen Technologie. Ein späteres maschinenlesbares Format MUSS denselben Informationsgehalt reproduzierbar abbilden können.

## 1. Specification Principles

### Specification before implementation

Eine neue oder wesentlich veränderte Core-, Layout- oder Business-Komponente darf erst implementiert werden, wenn ihre implementierungsrelevante Specification vollständig genug ist. Das [Component Implementation Readiness Gate](../../AGENTS.md) und der [Component Development Standard](component-development-standard.md) bleiben maßgeblich.

### No invented decisions

Eine Specification MUSS keine Varianten, States, APIs, Tokens, Accessibility-Verhalten, Keyboard-Patterns, Motion-Regeln, lokalen Größenvarianten oder Context-Regeln erfinden, nur um vollständig zu wirken. Fehlende Informationen bleiben als offene Entscheidung sichtbar.

### Reference, do not duplicate

Globale Regeln werden referenziert, nicht lokal neu definiert. Eine Specification benennt beispielsweise den bestätigten Token, seine Verwendung und den relevanten State, verweist für Werte und Density-Mappings aber auf [Token Catalogue](../02-design-system/token-catalogue.md) und [Density Matrix](../02-design-system/density-matrix.md).

### Explicit absence is information

Wurde ein prüfpflichtiger Aspekt untersucht und ist er nicht vorhanden, MUSS dies ausdrücklich dokumentiert werden, etwa: keine lokale Size Variant, keine component-specific Motion, kein eigener State, kein Loading-State, kein Context oder keine Subcomponents. Ein ausgelassener Abschnitt bedeutet nicht automatisch `not applicable`.

### Human and AI readable

Specifications MÜSSEN für fachliche Reviews schnell überprüfbar und für KI-Agenten eindeutig interpretierbar sein. Sie verwenden die in diesem Dokument vorgegebene Struktur und benennen jede Abweichung, Einschränkung und offene Entscheidung explizit.

## 2. Normative Language

Die folgenden Begriffe sind normativ:

- **MUST**: zwingende Anforderung; Abweichungen sind nicht zulässig.
- **MUST NOT**: zwingendes Verbot.
- **SHOULD**: starke Empfehlung; eine Abweichung benötigt eine dokumentierte, komponentenspezifische Begründung.
- **SHOULD NOT**: starke Negativempfehlung; eine Abweichung benötigt eine dokumentierte, komponentenspezifische Begründung.
- **MAY**: zulässig, wenn es mit allen bestätigten Regeln, Abhängigkeiten und Gates vereinbar ist.

In diesem Dokument verwendete deutsche Modalverben wie „MUSS“ und „DARF NICHT“ entsprechen MUST beziehungsweise MUST NOT.

## 3. Specification Status

Jede Component Specification MUSS am Anfang genau einen der folgenden Status führen:

### DRAFT

Die Specification befindet sich in Bearbeitung. Implementierung ist nicht freigegeben.

### BLOCKED

Eine oder mehrere implementierungsrelevante Entscheidungen oder Foundation-Abhängigkeiten fehlen. Implementierung ist nicht freigegeben.

### READY FOR IMPLEMENTATION

Alle implementierungsrelevanten Entscheidungen der Specification und alle benötigten Foundation-Abhängigkeiten sind ausreichend geklärt. Dies ist notwendig, aber nicht allein hinreichend: Das übergeordnete Component Implementation Readiness Gate gilt zusätzlich.

### IMPLEMENTED

Eine freigegebene Implementierung existiert und wurde gegen diese Specification geprüft. Dieser Status darf erst verwendet werden, wenn die Implementierungsphase begonnen hat.

### DEPRECATED

Die Komponente soll für neue Verwendungen nicht mehr eingesetzt werden.

### SUPERSEDED

Diese Specification wurde durch eine andere Component Specification oder ein neues Component-Modell ersetzt.

Keine weiteren Specification-Status sind zulässig.

## 4. Required Metadata

Jede Specification beginnt mit einem standardisierten Metadatenblock. Die konkrete YAML-, JSON-, Frontmatter- oder andere maschinenlesbare Syntax wird hier nicht festgelegt. Inhaltlich MUSS der Block enthalten:

- **Component Name**
- **Component Category**
- **Specification Status**
- **Owner / Responsible Area**
- **Design Reference**
- **Relevant Decision IDs**
- **Foundation Dependencies**
- **Related Components**
- **Last Reviewed**

`Component Category` verwendet ausschließlich die bestätigten Kategorien **Core**, **Layout** oder **Business**. Die Kategorien entsprechen dem [Component Development Standard](component-development-standard.md) und der [Architecture](../00-project/architecture.md); sie dürfen nicht durch weitere Architektur-Layer ersetzt oder ergänzt werden.

## 5. Required Content Contract

### Purpose

Jede Specification MUSS einen Abschnitt `Purpose` enthalten. Er beschreibt knapp das allgemeine Problem, das die Komponente löst, ihre Verantwortung und ihre ausdrücklichen Nicht-Verantwortlichkeiten. Er darf keine bloße visuelle Beschreibung sein.

### Use When

Jede Specification MUSS einen Abschnitt `Use When` enthalten. Er beschreibt semantische Anwendungsfälle so konkret, dass Menschen und KI-Agenten entscheiden können, ob die Komponente für einen Fall vorgesehen ist.

### Do Not Use When

Jede Specification MUSS einen Abschnitt `Do Not Use When` enthalten. Er benennt ähnliche, aber falsche Einsatzfälle, häufige Verwechslungen und – soweit vorhanden – die dafür zuständige Alternative.

### Related Components and Selection Boundaries

Dieser Abschnitt ist erforderlich, wenn ähnliche oder angrenzende Komponenten existieren. Er erklärt die bestätigten Auswahlgrenzen und verweist auf deren Decisions oder Specifications. Er darf keine neue Auswahlregel erzeugen; spätere Regeln wie die Abgrenzung zweier konkreter Komponenten werden in deren bestätigten Specifications oder Entscheidungen festgelegt.

### Anatomy

Jede visuell strukturierte Komponente MUSS ihre konzeptionellen Bestandteile dokumentieren. Für jeden Bestandteil werden Responsibility, `required` / `optional` / `conditional`, semantische Relevanz und – soweit vorhanden – Accessibility-Relevanz festgehalten.

Anatomy-Bezeichnungen sind keine automatischen technischen Subcomponent-Namen. Die Anatomy einer Komponente folgt ihrer bestätigten Design- und API-Struktur; aus einer visuellen Darstellung darf keine DOM-Struktur abgeleitet werden.

### Semantic Contract

Jede interaktive oder semantisch relevante Core Component MUSS ihre vorgesehene native Semantik, das Root-Element beziehungsweise die semantische Rolle soweit entschieden, notwendige Beziehungen sowie unzulässige Semantik-Ersatzlösungen dokumentieren. Native HTML-Semantik hat Vorrang vor ARIA gemäß [Accessibility](../02-design-system/accessibility.md) und [AGENTS.md](../../AGENTS.md).

Ist die Semantik eines komplexen Patterns nicht eindeutig geklärt, ist die Specification `BLOCKED`.

### Variants

Jede Specification MUSS einen Abschnitt `Variants` enthalten, auch wenn keine Varianten bestehen. Für jede bestätigte Variant werden Name, Purpose, Use When, Do Not Use When, visuelle beziehungsweise semantische Abgrenzung sowie erlaubte und – soweit relevant – verbotene Kombinationen dokumentiert.

States sind keine Variants. Globale Density ist keine Component Variant. Fehlen Varianten, wird ausdrücklich `No component variants.` dokumentiert.

### Local Size Variants

Dieser Abschnitt ist erforderlich, wenn eine bestätigte lokale Größenvariante besteht oder die Größenfrage für die Komponente geprüft werden musste. Er MUSS globale Density und lokale Size Variant als getrennte Dimensionen behandeln. Eine lokale S/M/L-API darf niemals allein aus globaler Density abgeleitet werden.

Besteht keine lokale Size Variant, wird dies ausdrücklich dokumentiert.

### States

Jede interaktive Komponente MUSS ihre relevanten States prüfen: default, hover, active / pressed, focus-visible, disabled, selected, expanded / collapsed, read-only, loading, invalid / error, success und empty. Nicht jede Komponente benötigt jeden State.

Für jeden tatsächlich unterstützten State beschreibt die Specification Trigger beziehungsweise Ursache, beobachtbares UI-Verhalten, semantisches Verhalten, Interaktionsauswirkung, Accessibility-Auswirkung, Token- oder State-Mapping-Referenz und gegebenenfalls Motion-Referenz. Nicht relevante States werden nicht künstlich implementiert.

### State Priority and Combination Matrix

Sind mehrere States gleichzeitig möglich, MUSS die Specification deren tatsächliche Kombinationen und Prioritäten eindeutig klären. Dies umfasst etwa die Frage, ob ein State Interaktion unterbindet oder welche Darstellung bei konkurrierenden States gilt. Es gibt keine globale Prioritätsregel, die eine Component Specification ersetzen könnte.

Sind implementierungsrelevante State-Kombinationen ungeklärt, ist die Specification `BLOCKED`.

### Public API Contract

Jede programmatisch konsumierte Component Specification MUSS Props, native HTML-Props und Forwarding, Events beziehungsweise Callbacks, required versus optional, Defaults, erlaubte Werte, controlled/uncontrolled-Verhalten, Children, Slots oder Composition, Refs, imperative API sowie bestätigte Escape Hatches inhaltlich dokumentieren.

Die API MUSS dem [Component Development Standard](component-development-standard.md) folgen. Eine Lücke darf nicht aus Convenience geschlossen werden; insbesondere dürfen keine Props, Variants oder Callback-Semantiken allein aus verbreiteten Framework-Konventionen abgeleitet werden.

### Native Props and DOM Contract

Jede Core Component MUSS ihren nativen Elementvertrag dokumentieren: repräsentiertes natives Element, weitergereichte native Props, Empfänger des öffentlichen Ref, stabile zusätzliche Wrapper und DOM-Annahmen, die Consumer nicht treffen dürfen.

Ist ein konkreter Ref- oder DOM-Vertrag wegen [OPEN-015](../01-decisions/ui-decision-register.md) oder einer anderen relevanten Entscheidung nicht ausreichend bestimmbar, wird er nicht erfunden; die Specification bleibt gegebenenfalls `BLOCKED`.

### Composition

Jede Specification MUSS Children, Slots, Subcomponents, Compound-Relationships, Parent/Child-Verträge sowie zulässige und unzulässige Composition dokumentieren. Gibt es keine besondere Composition, wird dies ausdrücklich festgestellt.

Composition-first bleibt die Grundregel. Visuelle Anatomy-Bereiche sind keine Begründung, automatisch eine Subcomponent-API zu schaffen.

### Context Dependencies

Jede Specification MUSS dokumentieren, ob sie semantischen Context benötigt, welche Werte oder Regeln dieser Context beeinflussen darf, ob Overrides bestehen und welche Defaults gelten. Sie beschreibt einen fachlichen Context-Vertrag, nicht automatisch eine technische React-Context-Implementierung.

Das konkrete technische Context-Verfahren bleibt gemäß [OPEN-010](../01-decisions/ui-decision-register.md) offen. Aus einer semantischen Parent/Child-Beziehung folgt keine `React.createContext`-Architektur.

### State Ownership

Jede zustandsbehaftete Komponente MUSS dokumentieren, welcher State intern sein darf, welcher State kontrollierbar sein muss, welche Zustände außerhalb liegen, welche Änderungssignale existieren und welcher Layer eventuelle Persistenz verantwortet. Für Komponenten ohne eigenen State wird dies ausdrücklich als nicht vorhanden festgehalten.

Business State darf nicht versehentlich in Core gezogen werden. Layout-Persistenz liegt gemäß [Architecture](../00-project/architecture.md) außerhalb einer Layout Component, solange keine spezifischere bestätigte Regel besteht.

### Design Tokens

Jede visuelle Component Specification MUSS ausschließlich bestätigte Foundation- und Component-specific-Token-Referenzen dokumentieren. Soweit relevant trennt sie spacing, geometry, typography, radius, colors, borders, shadows, focus, motion, z-layer und component-specific Tokens. Für jeden benötigten Token werden Verwendung, State-Bezug, Density-Bezug und Mode-Bezug angegeben.

Werte werden nicht dupliziert, wenn sie in [Token Catalogue](../02-design-system/token-catalogue.md) oder [Density Matrix](../02-design-system/density-matrix.md) dokumentiert sind. Fehlt ein implementierungsrelevanter Token oder reicht ein `PARTIAL`-Eintrag nicht für die konkrete Verwendung, ist die Specification `BLOCKED`.

### Density Contract

Jede visuelle Component Specification MUSS verwendete density-dependent und density-independent Werte, bestätigte S/M/L-Mappings sowie lokale Size Variants dokumentieren. Sie MUSS bestätigen, dass lokale Size Variants und Density getrennt bleiben. Eigene Density-Berechnungen oder lokale Ersatzwerte sind unzulässig.

Fehlt ein benötigtes Density-Mapping, ist die Specification `BLOCKED`. Maßgeblich sind [Density](../02-design-system/density.md) und die [Density Matrix](../02-design-system/density-matrix.md).

### Color and Theme Contract

Jede visuelle Component Specification MUSS verwendete semantische Color Roles, state-abhängige Color Roles sowie die Relevanz von Light/Dark, Contrast Mode, Color-Deficiency Mode und Accent dokumentieren. Sie konsumiert aufgelöste Tokens und dupliziert weder Theme-Resolver- noch Kalibrierungsregeln aus dem [Color System](../02-design-system/color-system.md).

### Typography Contract

Texttragende Komponenten oder Komponenten mit eigener Typografieverantwortung MÜSSEN verwendete Textrollen, erforderliche Rollenmetadaten, Density-Beziehung, Verhalten bei langen Texten und relevante Internationalization-Anforderungen dokumentieren. Font Provision liegt außerhalb von Components; lokale Typografie darf nicht erfunden werden. Maßgeblich ist [Typography](../02-design-system/typography.md).

### Accessibility Contract

Jede Specification MUSS native Semantik, Accessible Name, Description, Labels, Keyboard Accessibility, Focus Visibility, Focus Management, Screenreader-Semantik, Disabled-Semantik, Error-/Invalid-Semantik, Dynamic Announcements, Touch/Pointer, Zoom/Reflow, Reduced Motion, Kontrast und relevante alternative Modi prüfen und deren Relevanz festhalten.

Nicht jeder Punkt ist anwendbar. Die Prüfung MUSS aber nachvollziehbar sein. Für komplexe Widgets muss das konkrete Interaction Pattern vor Implementierung eindeutig sein; ein Best Guess ist unzulässig. Maßgeblich sind [Accessibility](../02-design-system/accessibility.md) und das Accessibility Implementation Gate in [AGENTS.md](../../AGENTS.md).

### Keyboard Contract

Jede interaktive Komponente MUSS Fokusierbarkeit, Tab-Verhalten, Enter, Space, Escape, Arrow Keys, Home/End und weitere relevante Tasten explizit behandeln. Nur tatsächlich relevante Tasten werden aufgenommen. Native Controls behalten ihr natives Verhalten.

Benötigt ein komplexes Pattern spezielle Keyboard-Regeln, die noch nicht bestätigt sind, ist die Specification `BLOCKED`.

### Focus Contract

Komponenten mit besonderem Fokusverhalten MÜSSEN initial focus, focus-visible-Darstellung, programmatic focus, focus containment, focus restoration und das Verhalten beim Entfernen fokussierter Inhalte dokumentieren, soweit jeweils relevant. Einfache native Controls ohne zusätzliches Fokusmanagement dürfen auf den allgemeinen Accessibility Contract verweisen.

### Motion Contract

Jede Specification MUSS dokumentieren, welche Zustandsänderungen animiert sind, welche bestätigte Motion Role oder welches Token gilt, Enter/Exit-Verhalten, erlaubte animierte Properties, Reduced-Motion-Verhalten sowie funktionale oder dekorative Einordnung. Fehlt Motion, wird `No component-specific motion.` dokumentiert.

Die Specification erfindet keine Duration oder Easing. Sie folgt [Motion](../02-design-system/motion.md), einschließlich der begrenzten Ausnahme für `grid-template-rows`.

### Internationalization and Content Contract

Texttragende oder Text erzeugende Komponenten MÜSSEN festhalten, ob sichtbare Texte und Accessible Names vom Consumer stammen, ob eigene Standardtexte entstehen, ob Textstrings erforderlich sind, ob locale-sensitive Values vorkommen und wie lange Übersetzungen berücksichtigt werden.

Core Components konsumieren grundsätzlich aufgelöste Inhalte und kennen keine fachlichen Textstring IDs. Benötigt eine Komponente selbst verantwortete Standardtexte, deren Bereitstellung ungeklärt ist, bleibt sie `BLOCKED` oder referenziert die bestehende offene Entscheidung. Maßgeblich ist [Internationalization](../02-design-system/internationalization.md).

### Responsive and Layout Behavior

Jede visuelle Component Specification MUSS bestätigte Regeln zu verfügbarer Breite, Wrapping, Overflow, Text Expansion, Container Constraints und gegebenenfalls responsiver Strukturänderung dokumentieren. Density ist nicht Responsive Behavior. Breakpoints oder Layoutverhalten dürfen nicht erfunden werden.

### Container Interaction

Wenn Container die Komponente beeinflussen können, MUSS die Specification relevante Container, deren Verantwortlichkeiten, kontrollierte Beziehungen und zulässige Overrides dokumentieren. Dazu können ausschließlich bei bestätigter Relevanz Spacing, Grouping, Action Scope, Radius Context oder Layout Context gehören. Dies definiert keine technische Context-API.

### Loading and Async Contract

Jede Specification MUSS prüfen und ausdrücklich festhalten, ob Loading oder asynchrones Verhalten relevant ist. Ist es relevant, dokumentiert sie State Owner, Übergabe des States, sichtbares Verhalten, Interaktionsverhalten, Accessible Name, Disabled-/Busy-Semantik, mögliche State-Kombinationen, Motion und Error Responsibility.

Core Components laden keine Business-Daten. Ist Loading nicht relevant, wird dies ausdrücklich dokumentiert.

### Error Contract

Wenn Error oder Invalid relevant ist, MUSS die Specification UI-Invalid-State und Business Error, sichtbare Darstellung, Accessibility, Text Responsibility und bestätigtes Focus-Verhalten unterscheiden. Generische Core Components erfinden keine fachlichen Fehlertexte.

### Performance Characteristics

Für komplexe oder potenziell performancekritische Komponenten SOLL die Specification konkrete relevante Anforderungen dokumentieren, etwa bei großen Listen, Resize, Drag, Animation, häufigen State Updates oder Portals. Theoretische Micro-Optimierungen werden nicht vorgeplant; Performance darf Accessibility und Verständlichkeit nicht unterlaufen.

### Dependencies

Jede Specification MUSS ihre Foundation-, Core-, Layout- und Business-Dependencies konzeptionell dokumentieren. Die Dependency Rules der [Architecture](../00-project/architecture.md) gelten. Aus dieser Dokumentation werden keine npm-Paketnamen abgeleitet.

### Non-Goals

Jede Specification MUSS bewusst dokumentieren, welche Probleme sie nicht löst und welche angrenzenden Verantwortlichkeiten außerhalb liegen. Dies begrenzt Scope und unterstützt die Component Selection durch Menschen und KI-Agenten.

### Escape Hatches and Overrides

Jede Specification MUSS prüfen, ob bestätigte Escape Hatches oder Overrides existieren. Für jeden bestätigten Override werden Grund, Scope, Grenzen sowie nicht umgehbare Accessibility- und Designregeln dokumentiert. Bestehen keine, wird dies explizit festgehalten.

Eine generische freie Styling- oder Verhaltens-Override-API ist keine zulässige Default-Annahme.

### Examples

Jede Specification SOLL kanonische Nutzung, relevante Varianten und Composition sowie bei Bedarf ein Accessibility-relevantes Beispiel enthalten. Diese Beispiele sind Spezifikationsbeispiele, nicht die Wahl einer Preview- oder Dokumentationsplattform.

### Do / Don't

Jede Specification SOLL einen kompakten, fachlich relevanten `Do / Don't`-Abschnitt enthalten. Er eignet sich für häufige Fehlverwendung, Selection Boundaries, visuelle Sonderfälle und Accessibility. Er wiederholt nicht lediglich den gesamten Vertrag.

### Test Contract

Jede Specification MUSS definieren, **was** später geprüft wird, nicht mit welchem Framework. Der Test Contract enthält außerdem überprüfbare Acceptance Criteria sowie bekannte komponentenrelevante Limitations und Edge Cases. Soweit relevant umfasst er native Semantik, Public API, Interaktionen, Keyboard, Focus, States und Kombinationen, controlled/uncontrolled, Accessibility, Density, Theme/Modes, Motion, Reduced Motion, Composition, lange beziehungsweise lokalisierte Texte und regressionssensitive visuelle Fälle.

[OPEN-013](../01-decisions/ui-decision-register.md) zum konkreten Testing Stack bleibt offen; die Specification wählt keine Test-Library.

### Visual Verification Contract

Jede visuelle Specification MUSS die später überprüfbaren visuellen Fälle festlegen: relevante Variants und States, S/M/L, Light/Dark, High Contrast, relevante Color-Deficiency Modes, lange Inhalte, Icon-/Text-Kombinationen, begrenzte Breite und gegebenenfalls Reduced Motion.

Dies wählt keine Plattform. [OPEN-012](../01-decisions/ui-decision-register.md) zur Preview- und Dokumentationsplattform bleibt offen.

### AI Usage Contract

Jede Specification MUSS einen eigenen Abschnitt für KI-Agenten enthalten:

- **Use when:** kompakte maschinenfreundliche Auswahlregel.
- **Do not use when:** kompakte Ausschlussregel.
- **Required context:** Informationen, die vor Nutzung bekannt sein müssen.
- **Forbidden assumptions:** Informationen, die nicht aus Plausibilität abgeleitet werden dürfen.
- **Related decisions:** relevante Decision IDs.

Dies legt keine maschinenlesbare Serialisierung fest.

### Open Decisions

Jede Specification MUSS ausschließlich tatsächlich offene, komponentenrelevante Punkte listen. Jeder Punkt enthält Description, Classification, bestehende Decision ID soweit vorhanden, `Blocks implementation: yes/no` und Required owner/review.

Als Classification sind ausschließlich `OPEN`, `TECH REVIEW` und `DESIGN REVIEW` zulässig. Eine implementierungsrelevante offene Entscheidung führt grundsätzlich zu `BLOCKED`. Nicht implementierungsrelevante Erweiterungen dürfen dokumentiert werden, ohne die aktuelle Baseline zu blockieren; diese Einordnung MUSS begründet sein.

### Readiness Assessment

Jede Specification MUSS mit dem unter Abschnitt 10 definierten Readiness Assessment enden. `READY FOR IMPLEMENTATION` ist ausschließlich zulässig, wenn alle implementierungsrelevanten Kriterien erfüllt sind.

### Specification Change Rules

Jede Specification MUSS bei jeder Änderung prüfen, ob Beschreibung, Verhalten, Public API, Semantik, Accessibility, Token-Nutzung, Design, Composition oder Kompatibilität verändert werden und ob Tests beziehungsweise Examples oder das Decision Register betroffen sind.

Die Implementierung darf der Specification nicht stillschweigend vorauslaufen. Wird während der Implementierung eine Lücke erkannt, wird der betroffene Schritt gestoppt, die Entscheidung geklärt und die Specification aktualisiert; anschließend wird die Readiness erneut bewertet.

## 6. Foundation Dependency Rules

Eine Component Specification referenziert die jeweiligen Foundations als Source of Truth:

- [Design Foundations](../02-design-system/design-foundations.md) für übergreifende Foundation-Prinzipien.
- [Tokens](../02-design-system/tokens.md), [Token Catalogue](../02-design-system/token-catalogue.md) und [Density Matrix](../02-design-system/density-matrix.md) für Tokenmodell, bestätigte Identitäten und Density-Beziehungen.
- [Color System](../02-design-system/color-system.md) für semantische Farbrollen und Theme-Auflösung.
- [Typography](../02-design-system/typography.md) für Textrollen und Font-Provision.
- [Motion](../02-design-system/motion.md) für Motion-Semantik, zulässige Properties und Reduced Motion.
- [Accessibility](../02-design-system/accessibility.md) für die WCAG-2.2-AA-Baseline und Prüfanforderungen.
- [Internationalization](../02-design-system/internationalization.md) für Textstrings, locale-aware Formatting und Inhaltsverantwortung.

Eine Specification MUSS für jede benötigte Abhängigkeit angeben, ob sie vollständig bestätigt, nicht anwendbar oder blockierend offen ist. Sie darf weder Werte noch Mappings aus plausiblen Namensmustern, gerenderten Screenshots oder ähnlichen Komponenten ableiten.

## 7. Readiness and Open Decisions

### Implementation-relevant ambiguity

Eine Specification ist nicht vollständig, wenn sie für eine spätere Implementierung mehrere plausible Auslegungen zulässt. Beispiele sind uneindeutige API, State-Kombination, Token-Zuordnung, Semantik, Keyboard-Verhalten, Focus-Verhalten, Text-Verantwortung, Density-Mapping oder Component-Zuordnung.

Dann gilt das Component Implementation Readiness Gate: Specification `BLOCKED`, keine Implementierung, konkrete Klärungsfrage formulieren, autorisierte Entscheidung einholen und Ergebnis dokumentieren. Dass eine Lösung technisch plausibel wäre, reicht nicht aus.

### Readiness Assessment

Am Ende jeder Specification MUSS folgende Assessment-Struktur mit `yes`, `no` oder – nur soweit zugelassen – `not applicable` geführt werden:

- Design Rules Complete
- Foundation Dependencies Complete
- API Contract Complete
- Semantic Contract Complete
- Accessibility Contract Complete
- Keyboard Contract Complete
- State Matrix Complete
- Density Contract Complete
- Motion Contract Complete
- Internationalization Contract Complete
- Test Contract Complete
- Visual Verification Contract Complete
- Open Implementation Blockers: count
- Specification Status

`not applicable` ist nur für Keyboard Contract, Motion Contract, Internationalization Contract und Visual Verification Contract zulässig, wenn die Komponente den jeweiligen Bereich nachweislich nicht berührt. Für die übrigen Kriterien dokumentiert die Specification einen vollständigen positiven oder blockierenden negativen Befund.

### Specification Review Process

Vor dem Status `READY FOR IMPLEMENTATION` wird mindestens geprüft:

1. Source Decisions
2. Design Rules
3. API
4. States
5. Semantics
6. Accessibility
7. Keyboard
8. Tokens
9. Density
10. Motion
11. i18n/content
12. Tests
13. Visual Verification
14. Open Decisions
15. AI Usage Contract

Bleibt bei einem implementierungsrelevanten Punkt Interpretationsspielraum, wird die Specification nicht freigegeben. Dieser Prozess schafft keine neuen organisatorischen Rollen; Owner und erforderliche Reviews ergeben sich aus dem jeweiligen Metadaten- und Open-Decisions-Abschnitt.

## 8. Relationship to Other Documents

### Component Development Standard

Der [Component Development Standard](component-development-standard.md) definiert projektweit, **wie** Components entwickelt werden. Dieses Dokument definiert, **was** für eine einzelne Component vor und während ihres Lebenszyklus dokumentiert sein muss. Eine Specification darf den Standard nicht überschreiben. Eine Ausnahme benötigt eine bestätigte projektspezifische Entscheidung.

### Machine-readable specifications

Dieses Markdown-Format ist der normative inhaltliche Vertrag. Die konkrete maschinenlesbare Darstellung bleibt offen, insbesondere Serialisierung, Dateiformat, Schema-Technologie, Generierung, Validierung und Synchronisation zwischen menschen- und maschinenlesbarer Darstellung.

[OPEN-011](../01-decisions/ui-decision-register.md) und [AI-005](../01-decisions/ui-decision-register.md) werden durch dieses Dokument nicht geschlossen. Ein späteres Format MUSS den hier beschriebenen semantischen Informationsgehalt reproduzierbar abbilden können.

### Preview and documentation platform

Specifications definieren Examples und Visual Verification Cases, nicht das Werkzeug, das sie rendert. [OPEN-012](../01-decisions/ui-decision-register.md) bleibt offen; keine Storybook-, Ladle-, Website- oder andere Plattformentscheidung wird hier getroffen.

### Testing

Specifications definieren den Test Contract; die konkrete Testing-Technologie bleibt gemäß [OPEN-013](../01-decisions/ui-decision-register.md) offen. Dieses Dokument wählt keine Test-Library.

## 9. Forbidden Specification Patterns

Folgende Muster sind unzulässig:

- „implement as usual“;
- „behaves like common buttons“ oder eine vergleichbare Analogie ohne bestätigte Regel;
- „use sensible defaults“;
- „standard keyboard behavior“ ohne Bezug auf native Semantik oder ein bestätigtes Pattern;
- „use appropriate spacing“ ohne Token- oder Foundation-Referenz;
- visuelle Werte ohne Token- oder Foundation-Referenz;
- Props ohne Bedeutung und Grenzen;
- States ohne Prüfung relevanter Kombinationen;
- Accessibility als nachträgliche TODO;
- implementierungsrelevante OPENs bei `READY FOR IMPLEMENTATION`;
- Ableitung fehlender Informationen aus bestehendem Code oder visueller Plausibilität;
- implizite Produktentscheidungen;
- implizite lokale S/M/L-size API;
- ungeklärte Textstrings als hardcoded Copy.

## 10. Required / Conditional / Recommended Classification

| Section | Requirement | Applies to |
|---|---|---|
| Metadata | Required | all specifications |
| Purpose | Required | all specifications |
| Use When | Required | all specifications |
| Do Not Use When | Required | all specifications |
| Related Components and Selection Boundaries | Conditional | components with similar or adjacent alternatives |
| Anatomy | Conditional | visually structured components |
| Semantic Contract | Conditional | interactive or semantically relevant Core components |
| Variants | Required | all specifications |
| Local Size Variants | Conditional | components with a confirmed or reviewed local size question |
| States | Conditional | interactive components |
| State Priority and Combination Matrix | Conditional | components with simultaneous states |
| Public API Contract | Required | programmatically consumed components |
| Native Props and DOM Contract | Conditional | Core components |
| Composition | Required | all specifications |
| Context Dependencies | Required | all specifications |
| State Ownership | Required | all specifications |
| Design Tokens | Conditional | visual components |
| Density Contract | Conditional | visual components |
| Color and Theme Contract | Conditional | visual components |
| Typography Contract | Conditional | text-bearing components or components with typography responsibility |
| Accessibility Contract | Required | all specifications |
| Keyboard Contract | Conditional | interactive components |
| Focus Contract | Conditional | components with special focus behavior |
| Motion Contract | Required | all specifications |
| Internationalization and Content Contract | Conditional | text-bearing or text-generating components |
| Responsive and Layout Behavior | Conditional | visual components |
| Container Interaction | Conditional | components affected by container rules |
| Loading and Async Contract | Required | all specifications |
| Error Contract | Conditional | components with error or invalid behavior |
| Performance Characteristics | Conditional | complex or performance-sensitive components |
| Dependencies | Required | all specifications |
| Non-Goals | Required | all specifications |
| Escape Hatches and Overrides | Required | all specifications |
| Examples | Recommended | all specifications |
| Do / Don't | Recommended | all specifications |
| Test Contract | Required | all specifications |
| Visual Verification Contract | Conditional | visual components |
| AI Usage Contract | Required | all specifications |
| Open Decisions | Required | all specifications |
| Readiness Assessment | Required | all specifications |
| Specification Change Rules | Required | all specifications |

## 11. Component Specification Template

Der folgende Template-Inhalt ist kopierbar. `Required`, `Conditional` und `Recommended` entsprechen der vorstehenden Matrix. Conditional-Abschnitte werden nicht stillschweigend ausgelassen: Sie enthalten entweder die komponentenspezifische Information oder eine explizite Feststellung, warum sie nicht anwendbar sind.

```md
# <Component Name> – Component Specification

## Metadata — Required

- Component Name: <name>
- Component Category: <Core | Layout | Business>
- Specification Status: <DRAFT | BLOCKED | READY FOR IMPLEMENTATION | IMPLEMENTED | DEPRECATED | SUPERSEDED>
- Owner / Responsible Area: <responsible area>
- Design Reference: <confirmed reference or not yet confirmed>
- Relevant Decision IDs: <IDs or none>
- Foundation Dependencies: <documents, tokens, or none>
- Related Components: <components or none>
- Last Reviewed: <date or not yet reviewed>

## Purpose — Required

<describe the problem, responsibility, and explicit non-responsibilities>

## Use When — Required

<describe confirmed semantic use cases>

## Do Not Use When — Required

<describe excluded use cases and confirmed alternatives>

## Related Components and Selection Boundaries — Conditional

<describe confirmed boundaries, or state why not applicable>

## Anatomy — Conditional

<list confirmed conceptual parts with responsibility, requirement, semantic relevance, and accessibility relevance>

## Semantic Contract — Conditional

<describe confirmed native semantics, relationships, and prohibited substitutes>

## Variants — Required

<list confirmed variants and their rules, or state "No component variants.">

## Local Size Variants — Conditional

<describe confirmed local variants separately from global density, or state none/not applicable>

## States — Conditional

<describe each relevant state, trigger, behavior, semantics, interaction, accessibility, and token/motion reference>

## State Priority and Combination Matrix — Conditional

<describe relevant simultaneous states and their confirmed precedence, or state not applicable>

## Public API Contract — Required

<describe confirmed props, events, defaults, allowed values, state control, composition, refs, and escape hatches>

## Native Props and DOM Contract — Conditional

<describe confirmed native element, forwarding, ref target, wrappers, and non-contractual DOM assumptions>

## Composition — Required

<describe children, slots, subcomponents, parent/child contracts, and allowed/prohibited composition>

## Context Dependencies — Required

<describe semantic context requirements, allowed effects, overrides, defaults, or explicit absence>

## State Ownership — Required

<describe internal, controlled, external, and persisted state, or explicit absence>

## Design Tokens — Conditional

<reference confirmed foundation and component-specific tokens by use, state, density, and mode>

## Density Contract — Conditional

<describe density-dependent and density-independent values, confirmed mappings, and local-size separation>

## Color and Theme Contract — Conditional

<reference semantic color roles, state roles, and relevant modes>

## Typography Contract — Conditional

<reference confirmed roles, long-text behavior, density, and localization requirements>

## Accessibility Contract — Required

<record the relevance and confirmed behavior for semantics, names, labels, focus, ARIA, states, modes, pointer, zoom/reflow, and contrast>

## Keyboard Contract — Conditional

<list only relevant keys and their confirmed behavior>

## Focus Contract — Conditional

<describe special focus behavior, or reference the general contract when no special behavior exists>

## Motion Contract — Required

<reference confirmed motion behavior and reduced motion, or state "No component-specific motion.">

## Internationalization and Content Contract — Conditional

<describe text ownership, accessible-name ownership, textstrings, locale-sensitive values, and long-text behavior>

## Responsive and Layout Behavior — Conditional

<describe confirmed width, wrapping, overflow, expansion, constraints, and responsive behavior>

## Container Interaction — Conditional

<describe confirmed container responsibilities and allowed overrides>

## Loading and Async Contract — Required

<describe confirmed loading/async behavior, or state that it is not relevant>

## Error Contract — Conditional

<describe invalid versus business errors, presentation, accessibility, text, and focus behavior>

## Performance Characteristics — Conditional

<record concrete relevant performance requirements, or state why not applicable>

## Dependencies — Required

<list foundation, Core, Layout, and Business dependencies>

## Non-Goals — Required

<list explicit non-responsibilities>

## Escape Hatches and Overrides — Required

<describe confirmed overrides and limits, or state that none exist>

## Examples — Recommended

<provide canonical and relevant accessibility/composition examples without selecting tooling>

## Do / Don't — Recommended

<list concise, component-specific use and misuse guidance>

## Test Contract — Required

<list observable behavior, acceptance criteria, relevant verification cases, and known component-relevant limitations/edge cases>

## Visual Verification Contract — Conditional

<list confirmed visual cases for later preview or regression verification>

## AI Usage Contract — Required

### Use when

<machine-friendly selection rule>

### Do not use when

<machine-friendly exclusion rule>

### Required context

<context that must be known before use>

### Forbidden assumptions

<facts that must not be guessed>

### Related decisions

<relevant decision IDs>

## Open Decisions — Required

<for each item: description, classification, existing decision ID, blocks implementation, and required owner/review; state "No component-relevant open decisions." when applicable>

## Readiness Assessment — Required

- Design Rules Complete: <yes | no>
- Foundation Dependencies Complete: <yes | no>
- API Contract Complete: <yes | no>
- Semantic Contract Complete: <yes | no>
- Accessibility Contract Complete: <yes | no>
- Keyboard Contract Complete: <yes | no | not applicable>
- State Matrix Complete: <yes | no>
- Density Contract Complete: <yes | no>
- Motion Contract Complete: <yes | no | not applicable>
- Internationalization Contract Complete: <yes | no | not applicable>
- Test Contract Complete: <yes | no>
- Visual Verification Contract Complete: <yes | no | not applicable>
- Open Implementation Blockers: <count>
- Specification Status: <status>

## Specification Change Rules — Required

<record change impact on behavior, API, semantics, accessibility, tokens, design, composition, compatibility, tests, examples, and decisions>
```

## 12. Non-Goals of This Document

Dieses Dokument entscheidet ausdrücklich nicht:

- konkrete Component APIs;
- eine Button API oder konkrete Button Variants;
- konkrete Component File Structure;
- npm Packages;
- React-Context-Implementierung;
- maschinenlesbares Specification-Format;
- Testing Stack;
- Preview- oder Storybook-Plattform;
- Code Generator oder Schema Validator;
- Component Implementation;
- Release Automation.

Diese Themen bleiben in ihren bestehenden OPEN- oder Review-Zuständen.

## 13. AI Rule

> A component specification is not complete when an agent can make a reasonable guess. It is complete only when the agent does not need to guess.

Besteht ein implementierungsrelevanter Interpretationsspielraum, gilt für Core-, Layout- und Business-Komponenten:

- Specification = `BLOCKED`;
- keine Implementierung;
- menschliche Klärung erforderlich.

Diese Regel ergänzt das Component Implementation Readiness Gate, sie schwächt es nicht ab.
