# chayns UI – Component Readiness Checklist

## Purpose

Diese Checklist operationalisiert das [Component Implementation Readiness Gate](../../AGENTS.md#component-implementation-readiness-gate). Sie wird unmittelbar vor einer erstmaligen Component-Implementierung, einer wesentlichen konzeptionellen Neugestaltung oder einer Änderung verwendet, die den bestehenden Component Contract wesentlich verändert.

Sie beantwortet eine binäre operative Frage:

> May implementation begin?

Die Antwort ist ausschließlich `READY` oder `BLOCKED`. Die Checklist ist keine zweite Quelle für Component-Anforderungen. Sie prüft, ob die bereits maßgeblichen Decisions, Foundations, der [Component Development Standard](component-development-standard.md) und das [Component Specification Format](component-specification-format.md) für die konkrete Component ausreichend erfüllt sind.

## 1. Relationship to Specification Status

Specification Status und Component Implementation Readiness Gate sind verwandt, aber nicht identisch:

- Eine Specification mit `DRAFT` oder `BLOCKED` kann niemals Implementation `READY` sein.
- `READY FOR IMPLEMENTATION` ist für eine erstmalige Implementierung erforderlich, aber nicht allein ausreichend.
- Das Gate prüft zusätzlich Repository- und Architecture-Kontext, Foundation-Verfügbarkeit, Dependency-Richtung, relevante offene Decisions, Testbarkeit, Visual Verification, erforderliche bereits bestehende Review- oder Approval-Zustände sowie weitere Preconditions aus dem Component Development Standard.
- `IMPLEMENTED`, `DEPRECATED` und `SUPERSEDED` sind keine normalen Startzustände für eine erstmalige Implementierung.

Diese Checklist führt keine weitere Specification-Statussemantik ein.

## 2. Gate Result

### READY

Implementierung darf beginnen. Alle implementierungsrelevanten Gate Checks sind erfüllt.

### BLOCKED

Implementierung darf nicht beginnen. Mindestens ein implementierungsrelevanter Gate Check ist nicht erfüllt oder nicht eindeutig beantwortbar.

`UNKNOWN` ist kein dritter Gate-Status. Ein implementierungsrelevantes Unknown führt zu `BLOCKED`.

## 3. Gate Philosophy

### No guessing

MUSS ein Entwickler oder KI-Agent eine implementierungsrelevante Entscheidung selbst treffen, ist das Ergebnis `BLOCKED`.

### No “small component” exception

Auch scheinbar einfache Components durchlaufen das Gate. Für sie können weniger Checks relevant sein; der Qualitätsmaßstab ist nicht niedriger.

### Not applicable must be justified

`N/A` ist nur zulässig, wenn nachvollziehbar dokumentiert ist, warum ein Check für diese Component nicht gilt. `N/A` darf keine ungeklärte Anforderung verdecken.

### Existing code is not approval

Vorhandener Code, Legacy-Verhalten oder eine visuell plausible Implementierung ersetzen weder eine bestätigte Specification noch eine Decision.

### Gate before code

Das Gate wird vor Beginn der eigentlichen Component-Implementierung abgeschlossen. Eine Implementierung darf nicht beginnen, um Readiness anschließend zu rekonstruieren.

## 4. Checklist Result Vocabulary

Jeder einzelne Check verwendet ausschließlich einen der folgenden Werte:

### PASS

Die Anforderung ist für die konkrete Component relevant und ausreichend geklärt beziehungsweise erfüllt.

### BLOCK

Die Anforderung ist relevant, aber nicht ausreichend geklärt oder nicht erfüllt.

### N/A

Die Anforderung ist für die konkrete Component nachweislich nicht relevant. Die Begründung ist als Evidence festzuhalten.

Es gibt kein `partial pass`, `warning`, `probably`, `assumed` oder `TBD-but-okay`. Ein implementierungsrelevantes TBD ist `BLOCK`.

## 5. Required Gate Evidence

Jeder Gate-Durchlauf MUSS mindestens identifizieren:

- Component Name;
- Component Category;
- Component Specification;
- Specification Status;
- Relevant Decision IDs;
- Foundation Dependencies;
- Related Components;
- Reviewer / Review Context, soweit im bestehenden Projektprozess vorhanden;
- Gate Date;
- Gate Result.

Dieses Dokument definiert dafür weder YAML, JSON, Frontmatter noch eine neue organisatorische Rolle.

## 6. Gate Checks

Die folgenden 37 Checks sind der vollständige operative Gate-Umfang. Jeder Check ist mit `PASS`, `BLOCK` oder begründetem `N/A` zu bewerten.

### Check 01 – Specification Exists

**PASS, wenn:** Eine Component Specification existiert, das verbindliche [Component Specification Format](component-specification-format.md) verwendet und ihr geprüfter aktueller Stand eindeutig identifiziert ist.

**BLOCK, wenn:** Keine Specification besteht, nur Designbilder, Code oder ein Issue-Text vorliegen oder die Specification strukturell zu unvollständig ist, um das Gate reproduzierbar anzuwenden.

### Check 02 – Specification Status

**PASS, wenn:** Der Specification Status für eine erstmalige Implementierung `READY FOR IMPLEMENTATION` ist.

**BLOCK, wenn:** Für eine erstmalige Implementierung ein anderer Status vorliegt. Es gibt keine Ausnahme.

### Check 03 – Source Decisions

**PASS, wenn:** Alle relevanten Decision IDs identifiziert sind, bestätigte Decisions korrekt angewendet werden, keine implementierungsrelevante `OPEN`-, `TECH REVIEW`- oder `DESIGN REVIEW`-Frage ungelöst bleibt und kein Widerspruch zu einer bestätigten Decision besteht.

**BLOCK, wenn:** Eine relevante Decision fehlt, widersprüchlich ist oder erst im Gate-Durchlauf entschieden werden müsste.

### Check 04 – Component Category and Architecture Boundary

**PASS, wenn:** Die Kategorie Core, Layout oder Business bestätigt ist, ihre Verantwortung eindeutig bleibt und die Dependency Direction der [Architecture](../00-project/architecture.md) entspricht.

**BLOCK, wenn:** Business- oder Layout-Verantwortung unbeabsichtigt in Core gezogen wird, die Verantwortung eines anderen Layers übernommen werden soll oder die Layer-Zuordnung unklar ist.

### Check 05 – Purpose and Selection Boundary

**PASS, wenn:** Purpose, Use When, Do Not Use When und relevante Auswahlgrenzen zu ähnlichen Components eindeutig sind, sodass ein Agent die Component ohne semantisches Raten auswählen kann.

**BLOCK, wenn:** Die Selection zwischen relevanten Alternativen ungeklärt ist.

### Check 06 – Anatomy and Composition

**PASS, wenn:** Anatomy, required/optional/conditional Bestandteile, Composition, Children, Slots, Subcomponents und Parent/Child Contracts soweit relevant eindeutig sind.

**BLOCK, wenn:** Implementierungsrelevante Composition fehlt oder eine Subcomponent-Struktur aus visueller Plausibilität erfunden werden müsste.

### Check 07 – Semantic Contract

**PASS, wenn:** Native Semantik, Root- beziehungsweise Control-Semantik und notwendige semantische Beziehungen bestimmt sind; native HTML-Semantik wird bevorzugt und kein ARIA- oder Role-Verhalten muss geraten werden.

**BLOCK, wenn:** Das Semantic- oder Interaction Pattern eines komplexen Widgets nicht eindeutig bestätigt ist.

### Check 08 – Public API Contract

**PASS, wenn:** Props, Pflicht und Optionalität, Defaults, erlaubte Werte, Events/Callbacks, controlled/uncontrolled Verhalten, Children/Slots, Ref Contract soweit nötig, native Prop Forwarding und bestätigte Escape Hatches geklärt sind.

**BLOCK, wenn:** Während der Implementierung eine API-Entscheidung getroffen werden müsste. Betrifft ein projektweiter offener Ref- oder DOM-Vertrag wie [OPEN-015](../01-decisions/ui-decision-register.md) die konkrete Component implementierungsrelevant, ist der Check ebenfalls `BLOCK`.

Die Existenz von OPEN-015 blockiert nicht pauschal jede Component.

### Check 09 – DOM Contract

Für Core Components:

**PASS, wenn:** Native Root-Semantik, weitergereichte native Props, öffentlicher Ref Target soweit relevant, stabile DOM-Annahmen und notwendige zusätzliche Wrapper eindeutig sind.

**BLOCK, wenn:** Ein öffentlicher oder Accessibility-relevanter DOM-Vertrag ungeklärt bleibt oder ein Wrapper spontan erfunden werden müsste.

Für nicht anwendbare Kategorien ist `N/A` mit Begründung zulässig.

### Check 10 – Variants

**PASS, wenn:** Alle bestätigten Component Variants, ihr Purpose, erlaubte Kombinationen und – soweit relevant – verbotene Kombinationen dokumentiert sind. `No component variants.` ist ein gültiger positiver Befund.

**BLOCK, wenn:** Eine Variant während der Implementierung erfunden werden müsste.

Globale Density ist keine Component Variant.

### Check 11 – Local Size Variants vs Density

**PASS, wenn:** Lokale Size Variants bestätigt oder ausdrücklich nicht vorhanden sind, globale Density S/M/L getrennt bleibt und ihre Kombination nur bei bestätigter lokaler Variant eindeutig ist.

**BLOCK, wenn:** Eine lokale Size API oder ihre Kombination mit Density implementierungsrelevant ungeklärt ist.

Eine lokale S/M/L-API darf niemals allein aus globaler Density abgeleitet werden.

### Check 12 – State Model

**PASS, wenn:** Alle relevanten States sowie Trigger/Cause, sichtbares Verhalten, semantisches Verhalten, Interaction Impact und Accessibility Impact bestimmt sind. State und Variant bleiben getrennt.

**BLOCK, wenn:** Ein relevanter State erst während der Implementierung definiert werden müsste.

### Check 13 – State Combinations and Priority

**PASS, wenn:** Gleichzeitig mögliche States, ihre Kombinationen, widersprüchliche Fälle und erforderliche Prioritäten beziehungsweise sichtbare Ergebnisse geklärt sind.

**BLOCK, wenn:** Eine real mögliche State-Kombination mehrere plausible Verhaltensweisen zulässt.

Es gibt keine globale State-Priority, die eine konkrete Specification ersetzen könnte.

### Check 14 – State Ownership

**PASS, wenn:** Interner, kontrollierter und externer State, Änderungssignale und – soweit relevant – Persistenz-Verantwortung eindeutig sind. Business State bleibt außerhalb Core.

**BLOCK, wenn:** State Ownership implementierungsrelevant unklar ist.

### Check 15 – Context Dependencies

**PASS, wenn:** Semantische Context-Abhängigkeiten, Defaults, Overrides und Parent/Child-Context-Beziehungen bestimmt sind oder Context nachweislich nicht relevant ist.

**BLOCK, wenn:** Die offene technische Context-Strategie aus [OPEN-010](../01-decisions/ui-decision-register.md) die konkrete Implementierung tatsächlich blockiert oder semantischer Context selbst ungeklärt ist.

Das Gate wählt keine konkrete React-Context-Implementierung. OPEN-010 blockiert nicht pauschal alle Components mit Context-Bezug, wenn der semantische Contract unabhängig davon ausreichend umsetzbar ist.

### Check 16 – Token Availability

**PASS, wenn:** Für jeden benötigten visuellen Wert ein bestätigter Foundation- oder Component-specific Token beziehungsweise bestätigte Property-Evidence mit ausreichender Semantik vorliegt. Es muss weder ein Raw Value noch ein semantisch falscher Token eingesetzt werden.

Zu prüfen sind soweit relevant spacing, geometry, typography, radius, colors, borders, shadows, focus, motion, z-layer und component-specific Tokens.

**BLOCK, wenn:** Ein implementierungsrelevanter Token fehlt oder seine Semantik ungeklärt ist. Die Checklist definiert keine neuen Tokens.

### Check 17 – Density

**PASS, wenn:** Alle density-dependent Werte identifiziert sind, alle benötigten S/M/L-Mappings bestätigt sind, density-independent Werte korrekt behandelt werden und die Component keine eigene Density-Berechnung einführt.

**BLOCK, wenn:** Ein benötigtes Mapping fehlt oder lokale Size und globale Density nicht sauber getrennt sind.

Maßgeblich sind [Density](../02-design-system/density.md) und [Density Matrix](../02-design-system/density-matrix.md).

### Check 18 – Color and Theme

**PASS, wenn:** Benötigte semantische Color Roles und State Color Roles bestätigt sind und Light/Dark, Contrast Mode, Color-Deficiency Mode und Accent soweit relevant behandelt werden. Die Component konsumiert aufgelöste Tokens und erzeugt keinen lokalen Resolver.

**BLOCK, wenn:** Eine implementierungsrelevante Color Role fehlt oder Theme-Verhalten geraten werden müsste.

### Check 19 – Typography

Für texttragende Components:

**PASS, wenn:** Textrolle, benötigte Rollenmetadaten, Density-Beziehung und Long-Text-Verhalten bestätigt sind und keine lokale Font- oder Typography-Regel erfunden werden muss.

**BLOCK, wenn:** Eine dieser implementierungsrelevanten Angaben fehlt.

Für nicht texttragende Components ist `N/A` mit Begründung zulässig.

### Check 20 – Accessibility

**PASS, wenn:** Alle relevanten Anforderungen aus [Accessibility](../02-design-system/accessibility.md) und dem Accessibility Implementation Gate geprüft und eindeutig sind: native Semantik, Accessible Name, Description, Labels, Keyboard Accessibility, Focus Visibility, Focus Management, Screenreader-Semantik, Disabled-Semantik, Invalid/Error-Semantik, Dynamic Announcements, Touch/Pointer, Zoom/Reflow, Reduced Motion, Kontrast und relevante alternative oder forced modes.

**BLOCK, wenn:** Eine implementierungsrelevante Accessibility-Frage offen bleibt. Ein Accessibility-TODO ist kein `PASS`.

### Check 21 – Keyboard

Für interaktive Components:

**PASS, wenn:** Fokusierbarkeit, Tab-Verhalten, Enter, Space, Escape, Arrow Keys, Home/End und weitere pattern-relevante Tasten eindeutig bestimmt sind. Nur tatsächlich relevante Tasten müssen definiert sein. Native Controls behalten ihr natives Verhalten.

**BLOCK, wenn:** „Standard keyboard behavior“ ohne eindeutige native Semantik oder bestätigtes Pattern verwendet würde.

Für nicht interaktive Components ist `N/A` zulässig.

### Check 22 – Focus

**PASS, wenn:** focus-visible Verhalten und – soweit relevant – initial focus, programmatic focus, focus containment, focus restoration und das Verhalten beim Entfernen fokussierter Inhalte geklärt sind.

Für einfache native Controls ohne besonderes Fokusmanagement kann die bestätigte Foundation-Regel ausreichend sein.

**BLOCK, wenn:** Ein relevantes Focus-Verhalten geraten werden müsste.

### Check 23 – Motion

**PASS, wenn:** Component-specific Motion entweder bestätigt oder ausdrücklich ausgeschlossen ist. Falls Motion vorgesehen ist, sind Motion Role/Token, Enter/Exit, erlaubte Properties, Reduced Motion sowie notwendige gegenüber dekorativer Motion eindeutig.

`No component-specific motion.` ist ein gültiger positiver Befund. Das Gate erfindet keine Duration oder Easing.

**BLOCK, wenn:** Benötigte Motion-Regeln oder Reduced-Motion-Verhalten ungeklärt sind.

### Check 24 – Internationalization and Content

Für texttragende oder Text erzeugende Components:

**PASS, wenn:** Content Ownership, sichtbare Texte, Accessible Names, erforderliche Standardtexte, locale-sensitive Values und Long Translation Behavior geklärt sind. Core Components kennen keine fachlichen Textstring IDs.

**BLOCK, wenn:** Benötigte Standardtexte, Textstring-Fähigkeiten oder locale-sensitive Anforderungen implementierungsrelevant ungeklärt sind.

Maßgeblich ist [Internationalization](../02-design-system/internationalization.md). Nicht texttragende Components dürfen `N/A` mit Begründung verwenden.

### Check 25 – Responsive and Layout Behavior

**PASS, wenn:** Verhalten bei verfügbarer Breite, Wrapping, Overflow, Text Expansion, Container Constraints sowie – soweit vorhanden – responsive Strukturänderungen bestätigt sind.

**BLOCK, wenn:** Die Component eigene Breakpoints erfinden müsste oder relevantes Layoutverhalten ungeklärt ist.

Density ist nicht Responsive Behavior.

### Check 26 – Container Interaction

Wenn Container-Einfluss relevant ist:

**PASS, wenn:** Relevante Container sowie Gruppierungs-, Spacing-, Action-, Radius- und Layout-Beziehungen sowie zulässige Overrides eindeutig sind.

**BLOCK, wenn:** Die Component eine technische Context-Strategie oder eine Container-Beziehung selbst erfinden müsste.

Ist kein Container-Einfluss vorhanden, ist `N/A` zulässig.

### Check 27 – Loading and Async

Wenn Loading oder asynchrones Verhalten relevant ist:

**PASS, wenn:** Loading State Ownership, Übergabe, sichtbares Verhalten, Interaction Behavior, Busy/Disabled-Semantik, Accessible Name, State Combinations, Motion und Error Responsibility geklärt sind.

**BLOCK, wenn:** Die Component eine asynchrone Wirkung, lokale Deaktivierung oder fachlichen Error nur vermuten müsste.

Core lädt keine Business-Daten. Wenn Loading nicht relevant ist, wird `N/A` oder ein expliziter positiver Befund konsistent zur Specification begründet.

### Check 28 – Error / Invalid

Wenn Error oder Invalid relevant ist:

**PASS, wenn:** UI Invalid State und Business Error getrennt, sichtbare Darstellung, Accessibility, Text Responsibility und – soweit relevant – Focus-Verhalten geklärt sind.

**BLOCK, wenn:** Die Component fachliche Fehlertexte erfinden oder Error-Verhalten raten müsste.

Wenn nicht relevant, ist `N/A` zulässig.

### Check 29 – Dependencies

**PASS, wenn:** Foundation- und Component-Dependencies verfügbar, identifiziert und architektonisch zulässig sind; keine zyklische oder architekturwidrige Abhängigkeit und keine ungeklärte Dependency-Auswahl benötigt wird.

**BLOCK, wenn:** Eine externe Dependency oder andere Voraussetzung für die konkrete Component nötig, aber noch nicht entschieden ist. Das Gate wählt keine npm-Pakete.

### Check 30 – Escape Hatches and Overrides

**PASS, wenn:** Benötigte Overrides bestätigt sind, ihr Scope und ihre Grenzen klar sind und Accessibility- beziehungsweise Designregeln nicht umgangen werden können. Wenn keine Escape Hatches existieren, ist dies ein gültiger positiver Befund.

**BLOCK, wenn:** Eine generische Convenience-Escape-Hatch erfunden werden müsste.

### Check 31 – Test Contract

**PASS, wenn:** Die Specification ausreichend definiert, **was** später getestet werden muss, welche Acceptance Criteria gelten und welche bekannten komponentenrelevanten Limitations oder Edge Cases zu berücksichtigen sind: soweit relevant Semantik, API, Interaktionen, Keyboard, Focus, States und Kombinationen, controlled/uncontrolled, Accessibility, Density, Theme/Modes, Motion, Reduced Motion, Composition, lange beziehungsweise lokalisierte Texte und regressionssensitive visuelle Fälle.

**BLOCK, wenn:** Erwartete Tests nicht bestimmbar sind.

[OPEN-013](../01-decisions/ui-decision-register.md) bleibt offen. Dieser Check wählt keine Test Library.

### Check 32 – Visual Verification Contract

Für visuelle Components:

**PASS, wenn:** Relevante visuelle Prüfzustände definiert sind, soweit anwendbar Variants, States, S/M/L, Light/Dark, Contrast, Color-Deficiency Modes, lange Inhalte, Icon-/Text-Kombinationen, begrenzte Breite und Reduced Motion.

**BLOCK, wenn:** Nicht klar ist, welche visuellen Fälle später überprüft werden müssen.

[OPEN-012](../01-decisions/ui-decision-register.md) bleibt offen. Dieser Check verlangt keine Preview-Plattform.

### Check 33 – AI Usage Contract

**PASS, wenn:** Use When, Do Not Use When, Required Context, Forbidden Assumptions und Related Decisions maschinenverständlich dokumentiert sind.

**BLOCK, wenn:** Ein Agent die Component nur durch plausible Interpretation korrekt auswählen oder konfigurieren könnte.

### Check 34 – Open Decisions

**PASS, wenn:** Alle komponentenrelevanten `OPEN`-, `TECH REVIEW`- und `DESIGN REVIEW`-Punkte darauf geprüft sind, ob sie die konkrete Implementierung betreffen; ihre Blockwirkung und erforderlicher Owner beziehungsweise Review Context sind nachvollziehbar.

**BLOCK, wenn:** Eine implementierungsrelevante offene Entscheidung verbleibt.

Nicht implementierungsrelevante zukünftige Fragen können offen bleiben, wenn begründet ist, warum sie die aktuelle Baseline nicht beeinflussen. Das Gate schließt keine Decision.

### Check 35 – Repository Preconditions

**PASS, wenn:** Der Zielort der Component aus der Architecture ableitbar ist, relevante Contracts respektiert werden und keine ungeklärte Strukturentscheidung während der Implementierung getroffen werden müsste.

**BLOCK, wenn:** Der bestehende Projektstand eine für diese Component notwendige Strukturentscheidung ausdrücklich offen lässt.

Dieses Dokument definiert keine Component File Structure.

### Check 36 – Required Reviews / Approvals

**PASS, wenn:** Ausschließlich bereits durch Decisions oder Standards erforderliche Reviews beziehungsweise Freigaben abgeschlossen sind.

**BLOCK, wenn:** Eine notwendige `DESIGN REVIEW` oder `TECH REVIEW` für die konkrete Component noch aussteht.

Dieser Check schafft keine neue Rolle und keinen neuen Governance-Prozess.

### Check 37 – Implementation Plan Is Decision-Free

**PASS, wenn:** Ein Entwickler oder KI-Agent nun einen Implementierungsplan erstellen kann, der nur noch technische Ausführung innerhalb bestätigter Contracts enthält.

Er darf nicht mehr entscheiden müssen, was die Component semantisch ist, welche API oder States sie besitzt, wie States kombiniert werden, welche Tokens, Accessibility-, Keyboard-, Density- oder Motion-Regeln gelten, welche Texte verantwortlich sind oder welchem Layer die Verantwortung gehört.

**BLOCK, wenn:** Eine dieser Entscheidungen noch während der Implementierung getroffen werden müsste.

Technische Detailentscheidungen innerhalb bestätigter Contracts dürfen Teil der Implementierung bleiben, sofern sie nicht selbst eine offene Architecture-, API-, Design- oder Accessibility-Decision darstellen.

## 7. Final Gate Rule

Implementation Gate = `READY` nur wenn alle folgenden Bedingungen gleichzeitig gelten:

- Specification Status = `READY FOR IMPLEMENTATION`;
- jeder relevante Gate Check = `PASS`;
- jeder nicht relevante Gate Check = begründetes `N/A`;
- kein Gate Check = `BLOCK`;
- keine implementierungsrelevante offene Decision existiert;
- kein implementierungsrelevanter Interpretationsspielraum existiert.

Sobald ein `BLOCK` existiert, lautet das Gesamtergebnis `BLOCKED`.

Es gibt keine gewichtete Bewertung, keinen Prozent-Score und keine Ausnahme durch eine Mehrheitsentscheidung der Checks.

## 8. Component Implementation Readiness Gate Template

Der folgende Block ist kopierbar und bildet alle 37 Gate Checks in derselben Reihenfolge ab.

```md
# <Component Name> – Component Implementation Readiness Gate

## Gate Metadata

- Component Name: <name>
- Component Category: <Core | Layout | Business>
- Component Specification: <reference to current specification>
- Specification Status: <status>
- Relevant Decision IDs: <IDs or none>
- Foundation Dependencies: <references or none>
- Related Components: <components or none>
- Review Context: <existing review context or not applicable>
- Gate Date: <date>
- Gate Result: <READY | BLOCKED>

## Gate Checks

| # | Check | Result | Evidence / Reason |
|---|---|---|---|
| 01 | Specification Exists | <PASS | BLOCK | N/A> | <reference or reason> |
| 02 | Specification Status | <PASS | BLOCK | N/A> | <reference or reason> |
| 03 | Source Decisions | <PASS | BLOCK | N/A> | <reference or reason> |
| 04 | Component Category and Architecture Boundary | <PASS | BLOCK | N/A> | <reference or reason> |
| 05 | Purpose and Selection Boundary | <PASS | BLOCK | N/A> | <reference or reason> |
| 06 | Anatomy and Composition | <PASS | BLOCK | N/A> | <reference or reason> |
| 07 | Semantic Contract | <PASS | BLOCK | N/A> | <reference or reason> |
| 08 | Public API Contract | <PASS | BLOCK | N/A> | <reference or reason> |
| 09 | DOM Contract | <PASS | BLOCK | N/A> | <reference or reason> |
| 10 | Variants | <PASS | BLOCK | N/A> | <reference or reason> |
| 11 | Local Size Variants vs Density | <PASS | BLOCK | N/A> | <reference or reason> |
| 12 | State Model | <PASS | BLOCK | N/A> | <reference or reason> |
| 13 | State Combinations and Priority | <PASS | BLOCK | N/A> | <reference or reason> |
| 14 | State Ownership | <PASS | BLOCK | N/A> | <reference or reason> |
| 15 | Context Dependencies | <PASS | BLOCK | N/A> | <reference or reason> |
| 16 | Token Availability | <PASS | BLOCK | N/A> | <reference or reason> |
| 17 | Density | <PASS | BLOCK | N/A> | <reference or reason> |
| 18 | Color and Theme | <PASS | BLOCK | N/A> | <reference or reason> |
| 19 | Typography | <PASS | BLOCK | N/A> | <reference or reason> |
| 20 | Accessibility | <PASS | BLOCK | N/A> | <reference or reason> |
| 21 | Keyboard | <PASS | BLOCK | N/A> | <reference or reason> |
| 22 | Focus | <PASS | BLOCK | N/A> | <reference or reason> |
| 23 | Motion | <PASS | BLOCK | N/A> | <reference or reason> |
| 24 | Internationalization and Content | <PASS | BLOCK | N/A> | <reference or reason> |
| 25 | Responsive and Layout Behavior | <PASS | BLOCK | N/A> | <reference or reason> |
| 26 | Container Interaction | <PASS | BLOCK | N/A> | <reference or reason> |
| 27 | Loading and Async | <PASS | BLOCK | N/A> | <reference or reason> |
| 28 | Error / Invalid | <PASS | BLOCK | N/A> | <reference or reason> |
| 29 | Dependencies | <PASS | BLOCK | N/A> | <reference or reason> |
| 30 | Escape Hatches and Overrides | <PASS | BLOCK | N/A> | <reference or reason> |
| 31 | Test Contract | <PASS | BLOCK | N/A> | <reference or reason> |
| 32 | Visual Verification Contract | <PASS | BLOCK | N/A> | <reference or reason> |
| 33 | AI Usage Contract | <PASS | BLOCK | N/A> | <reference or reason> |
| 34 | Open Decisions | <PASS | BLOCK | N/A> | <reference or reason> |
| 35 | Repository Preconditions | <PASS | BLOCK | N/A> | <reference or reason> |
| 36 | Required Reviews / Approvals | <PASS | BLOCK | N/A> | <reference or reason> |
| 37 | Implementation Plan Is Decision-Free | <PASS | BLOCK | N/A> | <reference or reason> |

## Blocking Items

<list every BLOCK result with the required blocker format, or state "No blocking items.">

## N/A Justifications

<list every N/A result and its component-specific justification, or state "No N/A results.">

## Final Assessment

- Total PASS: <count>
- Total BLOCK: <count>
- Total N/A: <count>
- Open Implementation Blockers: <count>
- Gate Result: <READY | BLOCKED>
```

## 9. Blocking Item Format

Jeder Blocker MUSS mindestens enthalten:

- Gate Check;
- Description;
- Source / Related Decision;
- Required Clarification;
- Classification, falls Decision-relevant;
- Owner / Review Context, soweit bereits definiert.

Dies definiert keine neue Issue-Tracker-Struktur und keine Tooling-Konvention.

## 10. Re-Check after Clarification

Nach Klärung eines Blockers wird nicht nur der einzelne Check betrachtet. Die davon abhängigen Checks MÜSSEN nachvollziehbar erneut geprüft werden.

Eine Änderung am API Contract kann zum Beispiel State Model, Accessibility, Keyboard, Tests und AI Usage Contract erneut betreffen. Eine pauschale vollständige Neuprüfung ist nicht nötig, wenn die Nicht-Betroffenheit eindeutig belegt ist; alle betroffenen Abhängigkeiten müssen jedoch erneut bewertet werden.

## 11. Discovery During Implementation

Wird während der Implementierung entdeckt, dass eine Specification-Lücke besteht, eine neue API-Decision erforderlich ist, ein State ungeklärt ist, ein Token fehlt, ein Accessibility- oder Keyboard-Pattern geraten werden müsste, eine Foundation-Annahme falsch ist oder eine Architecture-Frage offen ist, gilt verbindlich:

1. Den betroffenen Implementierungsschritt stoppen.
2. Keine plausible Lösung stillschweigend wählen.
3. Die Lücke in Specification beziehungsweise Decision-Prozess zurückführen.
4. Betroffene normative Dokumente aktualisieren und freigeben lassen.
5. Die betroffenen Gate Checks erneut prüfen.
6. Erst nach erneutem `READY` fortsetzen.

Bereits geschriebener experimenteller Code darf eine Entscheidung nicht nachträglich rechtfertigen.

## 12. Relationship to Component Specification Format

Das [Component Specification Format](component-specification-format.md) definiert den inhaltlichen Vertrag einer einzelnen Component Specification. Diese Checklist erzeugt keine konkurrierenden Component-Regeln; sie prüft operativ, ob der dort definierte Contract für die konkrete Component ausreichend erfüllt ist.

Bei einem Widerspruch zwischen Checklist und Specification Format wird keine Implementation freigegeben. Der Dokumentationswiderspruch wird gemeldet und geklärt.

## 13. Relationship to Component Development Standard

Der [Component Development Standard](component-development-standard.md) bleibt die übergeordnete normative Entwicklungsregel. Diese Checklist operationalisiert dessen Component Implementation Readiness Gate, ersetzt oder schwächt den Standard jedoch nicht.

## 14. Relationship to OPEN Decisions

Das Gate kann eine offene Decision als Blocker erkennen, aber niemals selbst schließen. Insbesondere bleiben, soweit im Decision Register offen:

- [OPEN-010](../01-decisions/ui-decision-register.md);
- [OPEN-011](../01-decisions/ui-decision-register.md);
- [OPEN-012](../01-decisions/ui-decision-register.md);
- [OPEN-013](../01-decisions/ui-decision-register.md);
- [OPEN-015](../01-decisions/ui-decision-register.md);
- [AI-005](../01-decisions/ui-decision-register.md).

Keine projektweite offene Decision blockiert automatisch jede Component. Ausschlaggebend ist ausschließlich, ob sie für die konkrete Implementierung implementierungsrelevant ist.

## 15. Relationship to Machine-readable Automation

Diese Checklist ist zunächst ein menschen- und KI-lesbarer operativer Vertrag. Sie entscheidet weder Schema noch JSON/YAML, CI Automation, Linter, Validator, Generator, GitHub Check oder Build Gate.

Eine spätere Automatisierung kann darauf aufbauen. [OPEN-011](../01-decisions/ui-decision-register.md) und [AI-005](../01-decisions/ui-decision-register.md) werden dadurch nicht vorweggenommen.

## 16. Forbidden Gate Patterns

Folgende Muster sind unzulässig:

- „probably ready“;
- „simple enough“;
- „we can fix accessibility later“;
- „tests can define the behavior“;
- „copy the old implementation“;
- „use the closest token“;
- „add a prop if needed“;
- „use standard keyboard behavior“ ohne eindeutigen Contract;
- „density probably maps to size“;
- „we can decide the ref later“;
- „the design makes it obvious“;
- „AI can infer this“;
- `PASS` trotz implementierungsrelevantem TBD;
- `N/A` ohne Begründung;
- `READY` trotz `BLOCK`;
- Prozent- oder Score-basierte Freigabe;
- Schließen einer `OPEN` Decision im Gate-Durchlauf.

## 17. AI Gate Rule

> If an agent must guess, the gate is BLOCKED.

Ein KI-Agent darf bestätigte Regeln anwenden, explizite Contracts kombinieren und technische Ausführung innerhalb dieser Contracts planen.

Ein KI-Agent darf nicht fehlende Produktentscheidungen ergänzen, fehlende Designregeln erfinden, fehlende API-Regeln ableiten, Accessibility-Verhalten plausibilisieren, offene Decisions selbst schließen oder Legacy-Code als normative Quelle behandeln.

## 18. Non-Goals

Dieses Dokument entscheidet ausdrücklich nicht:

- konkrete Component APIs;
- konkrete Components;
- Button Specification oder Button Variants;
- Component File Structure;
- npm Dependencies;
- React-Context-Implementierung;
- maschinenlesbares Specification-Format;
- Testing Stack;
- Preview Platform;
- CI Gate, Linter, Validator oder Generator;
- Release Automation;
- organisatorische Rollen außerhalb bestehender Projektregeln.

## 19. Final Review Checklist for This Document

Bei späteren Änderungen an dieser Checklist wird mindestens geprüft:

- keine neue Component-Anforderung erfunden;
- Component Development Standard nicht überschrieben;
- Component Specification Format nicht dupliziert oder widersprochen;
- OPEN Decisions nicht geschlossen;
- `PASS` / `BLOCK` / `N/A` unverändert eindeutig;
- `READY` / `BLOCKED` unverändert binär;
- Density bleibt von lokaler Size getrennt;
- State bleibt von Variant getrennt;
- Core-, Layout- und Business-Grenzen bleiben erhalten;
- Accessibility bleibt Gate-relevant;
- Testing Stack nicht entschieden;
- Preview Platform nicht entschieden;
- maschinenlesbares Format nicht entschieden;
- Gate bleibt vor der Implementierung;
- Guessing führt weiterhin zu `BLOCKED`.
