# chayns UI – Accessibility

## 1. Purpose

Dieses Dokument definiert die verbindliche Accessibility-Baseline für `chayns UI`. Es präzisiert die bestehenden WCAG-, Semantik-, Focus-, Color- und Motion-Entscheidungen für spätere Core-, Layout- und Business-Component Specifications.

Es ist keine Komponentenimplementierung, kein Ersatz für eine Component Specification und keine technische Auswahl von Testing-Tools. Fehlende Produkt- oder Interaction-Entscheidungen werden nicht durch etablierte Patterns oder plausible Annahmen ersetzt.

## 2. Baseline and Scope

WCAG 2.2 Level AA ist das verbindliche Mindestziel für produktive UI. Accessibility ist funktionale Korrektheit: Bekannte WCAG-2.2-AA-Verstöße in Core UI blockieren die Veröffentlichung.

Die Baseline gilt für Core, Layout und Business. Core und Layout sind für ihr eigenes zugängliches UI-Verhalten verantwortlich; Business stellt zusätzlich sicher, dass fachliche Composition keine Accessibility-Probleme erzeugt.

Die normative Referenz für WCAG-Kriterien ist [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Diese Foundation erzeugt keine über die bestätigte Projektentscheidung hinausgehende Produkt-UX.

## 3. Core Principles

### Native semantics before ARIA

Native HTML-Semantik ist der Standard. ARIA ergänzt native Semantik nur, wenn sie das erforderliche Verhalten nicht vollständig ausdrückt; sie ersetzt native Elemente nicht aus visuellen Gründen.

Rollen, States und Accessibility-Patterns werden nicht erfunden. Fehlt eine eindeutige, produktseitige Spezifikation für ein komplexes Pattern, greift das Component Implementation Readiness Gate.

### Multi-modal use

Relevante Anforderungen werden für Tastatur-, Screenreader- und visuelle Nutzung gemeinsam berücksichtigt. Eine korrekte Darstellung in nur einer Modalität genügt nicht.

### No color-only or motion-only meaning

Status, Fehler, Auswahl und andere relevante Zustände werden nicht ausschließlich durch Farbe oder Motion vermittelt.

## 4. Keyboard Accessibility

Interaktive Funktionen sind vollständig per Tastatur bedienbar. Fokusreihenfolge ist logisch, vorhersehbar und folgt der semantischen DOM-Reihenfolge. Es gibt keine Keyboard Traps und keine positiven `tabindex`-Werte zur manuellen Fokussortierung.

Escape, Enter und Space folgen ausschließlich nativer Semantik oder einem eindeutig definierten Interaction Pattern. Sie werden nicht aus einer visuellen Darstellung abgeleitet. DOM-Reihenfolge und semantische Struktur werden nicht allein für optische Anordnung manipuliert.

## 5. Focus Management

Jedes fokussierbare interaktive Element besitzt einen sichtbaren Focus Indicator. Autor-erzeugter Inhalt darf ein fokussiertes Element nicht vollständig verdecken.

Programmatic Focus erhält nur einen funktionalen, spezifizierten Grund. Bei temporären UI-Zuständen wie Overlay oder Dialog müssen Fokus-Eintritt, -Begrenzung, -Behandlung während des Zustands und -Wiederherstellung beim Schließen in der Component Specification eindeutig beschrieben sein. Bei dynamisch eingefügten oder entfernten Inhalten darf Fokus nicht verloren gehen oder auf nicht sichtbaren beziehungsweise nicht interaktiven Inhalt führen.

Für ein komplexes Pattern ohne ausreichende Produktspezifikation wird kein Focus-Verhalten erfunden. Die Implementierung ist blockiert, bis die Lücke geklärt und dokumentiert ist.

## 6. Semantics and Accessible Names

Komponenten verwenden passende native Elemente, eine sinnvolle Überschriftenhierarchie und, soweit der Dokument-/Anwendungskontext dies vorsieht, eine sinnvolle Landmark-Struktur. Visuelle Typography Roles ändern nicht die semantische Überschriftenhierarchie.

Form Controls haben sichtbare Labels, sofern das Produktdesign nicht ausdrücklich und zugänglich etwas anderes spezifiziert, sowie eine programmatische Label-Control-Zuordnung. Interaktive Controls benötigen einen eindeutigen Accessible Name. Icon-only Controls benötigen einen Accessible Name; ein visueller Tooltip ersetzt ihn nicht.

Informative Bilder und Icons erhalten eine zugängliche Textalternative oder gleichwertige Semantik. Dekorative Bilder und Icons werden für assistive Technologien nicht als Information ausgegeben. Status- und Fehlermeldungen benötigen passenden Text und erforderlichenfalls eine passende, spezifizierte ARIA-Rolle.

## 7. Forms and Error States

Fehlertexte sind verständlich, sichtbar und programmatisch dem betroffenen Control zugeordnet. Required- und Invalid-Zustände werden semantisch und visuell erkennbar gemacht. Fehlerkommunikation erfolgt nicht ausschließlich durch Farbe.

Die Frage, ob und wohin Fokus nach fehlgeschlagener Validierung verschoben wird, ist patternabhängig. Sie wird nur umgesetzt, wenn die konkrete Component Specification sie eindeutig festlegt. Dieses Dokument definiert keine generische Form-Component oder Validation-API.

## 8. Color, Contrast and States

Die Color Foundation liefert semantische Rollen; Komponenten erfinden keine lokalen Werte. Normaler Text benötigt mindestens 4,5:1 Kontrast, großer Text mindestens 3:1. Visuelle Informationen zur Identifikation von UI-Components und States benötigen mindestens 3:1 gegen angrenzende Farben, soweit WCAG dies verlangt.

Focus-, Hover-, Active-, Disabled-, Error- und Selected-States müssen, soweit das Pattern sie verwendet, für ihre beabsichtigte Nutzung unterscheidbar sein. Disabled ist keine Ausnahme für fehlende Semantik; die anwendbaren WCAG-Ausnahmen für inaktive Controls bleiben unberührt.

Die vorhandene Token-/Theme-Architektur ist auf zentrale semantische Rollen sowie Contrast- und Color-Deficiency-Modes ausgelegt. Sollte eine überprüfte Token-Kombination die Baseline nicht erfüllen, werden keine Werte eigenmächtig geändert: Der konkrete Konflikt wird als Foundation Gap dokumentiert und durch die zuständige Source of Truth geklärt.

## 9. Motion and Reduced Motion

`prefers-reduced-motion` ist verbindlich. Nicht essentielle Animation wird reduziert oder entfernt; funktional notwendige Zustandsänderungen bleiben verständlich. Die bestehende Motion-Foundation bestimmt, dass notwendige Motion wie ein Loading Spinner bestehen bleiben darf.

Reduced Motion verändert die Darstellung eines Übergangs, nicht dessen fachliches Ergebnis. Es wird keine alternative UX erfunden, wenn deren Verhalten nicht spezifiziert ist.

## 10. Zoom, Reflow and Text

Text ist ohne Verlust von Inhalt oder Funktion bis 200 Prozent vergrößerbar. Layouts unterstützen Reflow ohne unnötigen Informations- oder Funktionsverlust; horizontales Scrollen wird außerhalb von Inhalten vermieden, für die eine zweidimensionale Darstellung wesentlich ist.

Komponenten verlassen sich nicht auf unnötige feste Dimensionen, die Text abschneiden. Sie berücksichtigen Textvergrößerung, längere Labels und lokalisierte Inhalte. Die bestehenden Responsive- und Typography-Foundations liefern die Grenzen; dieses Dokument definiert keine Breakpoints oder neues Layoutverhalten.

Die WCAG-2.2-Text-Spacing-Anpassungen dürfen keinen Verlust von Inhalt oder Funktion verursachen. Konkrete Typography-Werte bleiben die Aufgabe der Typography Foundation.

## 11. Pointer and Touch Accessibility

Für Pointer-Targets gilt WCAG 2.2 AA Success Criterion 2.5.8: Ein Target ist grundsätzlich mindestens 24 × 24 CSS-Pixel groß oder erfüllt eine dort definierte Ausnahme, insbesondere die Spacing-, Equivalent-, Inline-, User-Agent-Control- oder Essential-Ausnahme. Eine Component Specification dokumentiert die anwendbare Ausnahme, statt sie stillschweigend anzunehmen.

Dragging darf keine ausschließliche Bedienmöglichkeit für nicht essentielle Funktion sein; eine Single-Pointer-Alternative ist erforderlich, sofern keine WCAG-Ausnahme gilt. Kritische Funktion wird nicht ausschließlich über Hover angeboten. Touch- und Pointer-Verhalten beeinträchtigen Keyboard- und Screenreader-Bedienung nicht.

## 12. Testing Strategy

Accessibility-Nachweise sind mehrstufig:

| Layer | Minimum check |
|---|---|
| A. Static / automatable | Semantik-, ARIA-, Kontrast- und Regelverstöße prüfen, soweit automatisierbar. |
| B. Component-near automated | Relevante Zustände, Accessible Names, Zustandssemantik und dokumentierte Keyboard-Fälle prüfen. |
| C. Manual keyboard | Fokusreihenfolge, alle vorgesehenen Tasten, keine Traps und Fokuswiederherstellung prüfen. |
| D. Manual screenreader / semantic | Struktur, Names, Roles, States, Fehler und dynamische Rückmeldungen prüfen. |
| E. Visual | Focus, Kontrast, Zoom/Reflow, längere Texte und Reduced Motion prüfen. |

Automatisierte Accessibility-Tests allein sind kein Nachweis vollständiger Accessibility. Für Milestone 1 sind Storybook addon-a11y mit Fehlerlevel, Vitest Browser Mode und Playwright Chromium bestätigt. Component-nahe Verhaltensprüfungen verwenden Vitest, Testing Library und user-event. Die konkrete Component Specification bestimmt weiterhin die relevanten automatischen und manuellen Fälle.

## 13. Accessibility Implementation Gate

Eine Core-, Layout- oder Business-Komponente darf nur implementiert oder als fertig betrachtet werden, wenn die relevanten Accessibility-Anforderungen eindeutig bestimmbar, spezifiziert und prüfbar sind. Dazu zählen mindestens native Semantik, Accessible Name, Keyboard-Verhalten, Focus, States, Screenreader-/ARIA-Verhalten, Kontrast, Reduced Motion sowie erforderliche Zoom-/Reflow- und Pointer-Anforderungen.

Bei komplexen Interaction Patterns wie Dialog, Menu, Combobox, Tabs, Tooltip, Disclosure oder Drag-and-drop gilt:

1. Native Semantik wird bevorzugt, wenn sie das benötigte Verhalten vollständig abbildet.
2. Bestehende dokumentierte Projektpatterns haben Vorrang.
3. Etablierte Accessibility-Patterns dürfen technische Referenz sein, ersetzen aber keine fehlende Produktentscheidung.
4. Sind Keyboard-Verhalten, Focus Management, States oder semantische Bedeutung produktseitig mehrdeutig, blockiert das Component Implementation Readiness Gate die Implementierung.
5. Kein Best Guess durch Agenten oder Code.

Nicht jeder globale OPEN-Punkt blockiert jede Komponente. Blockierend sind nur ihre relevanten Accessibility-Abhängigkeiten und Grundlagen.

## 14. Responsibilities

Core implementiert eigene semantische, Keyboard-, Focus- und Screenreader-Anforderungen. Layout implementiert dasselbe für wiederverwendbare Layout-Interaktionen. Business ergänzt keine fachliche Composition, die diese Eigenschaften verletzt. Anwendungen dürfen die zugängliche Default-Nutzung nicht durch unspezifizierte lokale Overrides unterlaufen.

## 15. Relationship to Other Foundations

Color liefert semantische, kontrastfähige Rollen sowie Accessibility-Modi; Typography liefert lesbare Rollen und Text-Scaling-Robustheit; Motion liefert Reduced-Motion-Regeln und verhindert funktionale Motion-Abhängigkeit; Density darf Accessibility nicht mindern.

Component Specifications referenzieren diese Foundations, duplizieren aber weder Werte noch Interaktionsentscheidungen. Siehe [color-system.md](color-system.md), [typography.md](typography.md), [motion.md](motion.md) und [density.md](density.md).

## 16. Open Technical Work

| Topic | Status | Required outcome |
|---|---|---|
| Accessibility test tooling and automation | CONFIRMED FOR M1 | Storybook axe, Vitest Browser Mode, Playwright Chromium und component-nahe Tests. |
| Accessibility quality-gate process | CONFIRMED FOR M1 | Automatische Fehler blockieren; manuelle Evidenz bleibt vor Veröffentlichung erforderlich. |
| Focus rendering and focus-visible mapping | CONFIRMED FOR BUTTON | Full-color Focus-Ring aus aufgelösten Focus-Tokens. |
| Complex interaction patterns | DESIGN REVIEW / TECH REVIEW | Produktsemantik und danach Keyboard-/Focus-/ARIA-Vertrag je Pattern spezifizieren. |
| Token contrast verification | CONFIRMED FOR BUTTON | Button-relevante Referenzmodi sind übertragen und kontrastgeprüft; weitere Komponenten bleiben separat zu prüfen. |

## 17. AI Rules

Ein KI-Agent verwendet bestätigte Semantik, Tokens und spezifizierte Interaction Patterns. Er darf keine ARIA-Rollen, Keyboard-Modelle, Focus-Strategien, Target-Size-Ausnahmen oder Screenreader-Verhalten erfinden. Bei implementierungsrelevanter Mehrdeutigkeit stoppt er, formuliert die konkrete Frage und meldet einen Foundation Gap.

## Milestone 1 Button focus and verification mapping

Button and IconButton use native `<button>` semantics and `:focus-visible`. Their focus indicator is a `box-shadow` ring with `--focus-ring-size` and the resolved accent at reduced opacity `rgba(var(--focus-ring-rgb), var(--focus-ring-alpha-strong))`, matching the DesignSystem reference so the ring stands off the button surface instead of reading as a thicker border. Primary composes the ring with its resting `--shadow-btn` elevation; forced-colors mode falls back to a solid `ButtonText` outline. This preserves the evidenced geometry and centrally resolved color while meeting the WCAG 2.2 focus visibility and contrast gate across supported reference modes.

Automated story-level axe checks run as errors. Release evidence additionally records keyboard activation and focus order, accessible names/roles/states, disabled focus exclusion, visible focus, forced colors, 200% zoom/reflow, text spacing, long/localized content, pointer target size and Reduced Motion. Automated results do not replace this manual matrix.
