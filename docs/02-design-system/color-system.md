# chayns UI – Color System

## 1. Purpose

Dieses Dokument ist die normative Spezifikation des Farbmodells von `chayns UI`. Es ordnet die aus dem Tobit.Software DesignSystem belegbaren Farbrollen den bestätigten chayns-UI-Regeln unter und definiert die Grenzen für ihre spätere technische Umsetzung.

Es liegt zwischen Design Foundations, Token Catalogue, Theme Resolver und späteren Component Specifications. Komponenten konsumieren ausschließlich aufgelöste semantische Farbrollen oder bestätigte component-specific Tokens. Dieses Dokument ist weder eine CSS-Implementierung noch ein vollständiger Token-Value-Dump, keine Component Specification und kein Theme-Resolver-Code.

## 2. Core Principles

### Semantic Consumption

Core Components konsumieren keine rohen Markenfarben und keine frei gewählten Hex-, RGB-, HSL- oder vergleichbaren Farbwerte. Sie konsumieren semantische Farbrollen.

### Theme Resolution

Theme Inputs werden zentral zu semantischen Tokens aufgelöst. Eine Komponente berechnet weder Light/Dark-Werte noch Accent-Kontrast, Contrast Mode oder Color-Deficiency-Anpassungen.

### Accessibility before literal color preservation

Eine vom Host bereitgestellte Accent-/Primary-Farbe darf kalibriert werden, wenn die unveränderte Farbe die bestätigten Accessibility-Anforderungen nicht erfüllt. Semantische Bedeutung und visuelle Nähe bleiben Ziel, WCAG-Anforderungen und Nutzbarkeit haben jedoch Vorrang vor exakter Farbübereinstimmung.

### No color-only meaning

Status, Fehler, Warnungen, Auswahl und andere relevante Zustände dürfen nicht ausschließlich über Farbe vermittelt werden. Nicht-farbliche Signale sind Teil der späteren Component Specification und Accessibility-Spezifikation.

### Density independence

Farben sind density-independent. S, M und L verändern keine Farbrolle und keinen Farbwert. Änderungen durch Accessibility-Varianten sind Theme-Auflösung, nicht Density.

## 3. Color Architecture

### 3.1 Theme Inputs

Theme Inputs sind globale, durch Host, Anwendung, Umgebung oder Nutzer bereitgestellte Eingaben. Bestätigt sind:

* Accent / Primary input,
* Color Mode (Light oder Dark),
* Contrast Mode,
* Color-Deficiency Mode,
* Density,
* Reduced Motion.

Density und Reduced Motion sind Theme-/Environment-Inputs, aber keine Farbinputs. Sie werden hier aufgeführt, damit die Trennung klar bleibt: Sie dürfen die Farbsemantik nicht verändern. Theme Inputs sind keine von Komponenten direkt konsumierten Tokens.

### 3.2 Primitive Color Data

Primitive Color Data ist die technische Farbgrundlage des Resolvers. Dazu gehören vorhandene Accent-Stufen, neutrale und Statusgrundwerte sowie erforderliche RGB-Kanalrepräsentationen. Sie dürfen innerhalb der Foundation-/Resolver-Ebene verwendet werden; Core Components konsumieren sie grundsätzlich nicht direkt.

Das aktuelle DesignSystem belegt als primitive Accent-Daten `--accent-100` bis `--accent-800`, `--accent-rgb` und `--on-accent-rgb`. Es belegt außerdem konkrete Light-/Dark-Werte für semantische Rollen und Statusrollen. Ein vollständiger chayns-UI-Katalog primitiver Skalen und deren öffentliche Namen ist noch nicht festgelegt.

### 3.3 Semantic Color Tokens

Semantic Tokens beschreiben Bedeutung statt Rohfarbe und sind die primäre Farb-API für Komponenten.

```text
Theme Inputs
        ↓
primitive / calibrated color data
        ↓
semantic color tokens
        ↓
component-specific tokens, falls bestätigt notwendig
        ↓
component rendering
```

Component-specific Tokens dürfen die semantische Ebene nicht umgehen. Sie werden aus bestätigten Foundation-Tokens abgeleitet und repräsentieren keine freien lokalen Farbwerte.

## 4. Semantic Role Catalogue

Die folgenden Rollen sind im aktuellen DesignSystem eindeutig belegt. Ihre Nennung bestätigt die semantische Verantwortung, nicht automatisch eine öffentliche Override-API oder einen vollständigen chayns-UI-Tokenkatalog.

### 4.1 Surfaces

| Role | Semantic responsibility |
|---|---|
| `--page` | Hintergrund der Seite beziehungsweise der übergeordneten Anwendungsfläche. |
| `--surface` | Primäre Inhalts- und Control-Fläche. |
| `--surface-2` | Sekundäre, vom primären Surface unterscheidbare Fläche. |
| `--surface-alt` | Alternative beziehungsweise hervorgehobene neutrale Fläche innerhalb des Surface-Kontexts. |

Die konkrete Auswahl einer Surface-Rolle folgt später aus bestätigten Component Specifications; Komponenten definieren dafür keine eigene lokale Light-/Dark-Palette.

### 4.2 Text

| Role | Semantic responsibility |
|---|---|
| `--text` | Primäre Textinformation mit höchster Informationspriorität. |
| `--text-2` | Sekundäre Textinformation. |
| `--text-3` | Tertiäre unterstützende Textinformation. |
| `--muted` | Zurückgenommene Textinformation mit der geringsten der belegten Textprioritäten. |

Textrollen sind keine beliebig austauschbaren Graustufen. Sie kodieren Informationshierarchie und müssen auf den jeweils vorgesehenen Surfaces die anwendbaren Kontrastanforderungen erfüllen.

### 4.3 Accent / Primary

| Role | Semantic responsibility |
|---|---|
| `--accent` | Aufgelöste Accent-/Primary-Rolle für Markenbezug, primäre Aktionen und aktive Zustände. |
| `--accent-hover` | Aufgelöste Accent-Rolle für Hover. |
| `--accent-active` | Aufgelöste Accent-Rolle für Active/Pressed. |
| `--on-accent` | Aufgelöste Vordergrundrolle für Inhalte auf einer Accent-Fläche. |
| `--accent-rgb` | RGB-Kanalrepräsentation der aufgelösten Accent-Rolle für definierte Foundation-Verwendungen. |
| `--on-accent-rgb` | RGB-Kanalrepräsentation der aufgelösten On-Accent-Rolle für definierte Foundation-Verwendungen. |

`--on-accent` ist keine Wahl, die Komponenten selbst zwischen Schwarz, Weiß oder anderen Vordergrundfarben treffen. Der Resolver löst sie für die vorgesehene Accent-Fläche auf.

Die Accent-Stufen `--accent-100` bis `--accent-800` sind als vorhandene primitive DesignSystem-Daten dokumentiert. Sie sind dadurch nicht automatisch öffentliche Component API.

### 4.4 Borders

| Role | Semantic responsibility |
|---|---|
| `--border` | Standardgrenze zwischen Flächen oder Bereichen. |
| `--border-soft` | Zurückgenommene Grenze innerhalb eines zusammenhängenden Surface-Kontexts. |
| `--input-border` | Grenze für Eingabe- und vergleichbare Control-Flächen. |

Border-Farbe und Border-Stärke sind getrennte Token-Dimensionen. Eine Komponente darf aus einer Border-Farbrolle keine freie Border-Stärke ableiten.

### 4.5 Status

| Role | Semantic responsibility |
|---|---|
| `--success` | Vordergrund- beziehungsweise Akzentrolle für Erfolg. |
| `--success-bg` | Hintergrundrolle für Erfolg. |
| `--warning` | Vordergrund- beziehungsweise Akzentrolle für Warnung. |
| `--warning-bg` | Hintergrundrolle für Warnung. |
| `--danger` | Vordergrund- beziehungsweise Akzentrolle für Gefahr beziehungsweise destruktive Bedeutung. |
| `--danger-bg` | Hintergrundrolle für Gefahr beziehungsweise destruktive Bedeutung. |
| `--danger-bg-hover` | Hover-Hintergrundrolle für die dokumentierte Danger-Verwendung. |

Statusfarben transportieren semantische Bedeutung. Die bestätigte chayns-UI-Regel bleibt unverändert: Danger gilt für destruktive Aktionen und nicht nur für technisch unwiderrufliche Aktionen.

### 4.6 Disabled

Das aktuelle DesignSystem belegt `--disabled-bg`, `--disabled-fg` und `--disabled-border`. Sie stellen die semantischen Rollen für deaktivierte Flächen, Vordergründe und Grenzen bereit.

Disabled wird nicht lediglich durch beliebige lokale Opacity-Werte einer Komponente erzeugt, sofern das bestätigte Farbsystem dafür semantische Rollen bereitstellt. Die vollständige Zuordnung der Disabled-Rollen zu allen Component States und eine gegebenenfalls benötigte weitere Benennung gehören in den Token Catalogue und bleiben TECH REVIEW.

### 4.7 Focus

Das DesignSystem belegt:

* `--focus-ring-rgb` als Farbinformation,
* `--focus-ring-size` als Geometrie,
* `--focus-ring-alpha-soft` und `--focus-ring-alpha-strong` als Stärke/Alpha.

Diese Dimensionen bleiben getrennt. Die endgültige Focus-Rendering-Regel, einschließlich der Wahl zwischen soft und strong für bestimmte Muster, wird zusätzlich in `accessibility.md` spezifiziert.

## 5. Light and Dark Mode

Light und Dark sind globale Theme Modes. Komponenten implementieren keine eigenen Light-/Dark-Farbpaletten und keine lokalen Verzweigungen dafür. Der Resolver liefert in beiden Modi dieselben semantischen Rollen mit jeweils passenden aufgelösten Werten.

Eine Component Specification referenziert beispielsweise `--surface`, nicht `--surface-light` oder `--surface-dark`, sofern keine bestätigte Ausnahme existiert.

Eindeutig für beide Modi belegt sind die Surface-Rollen, Textrollen, Border-Rollen, Accent-/On-Accent-Rollen, Accent-Stufen, Statusrollen, Disabled-Rollen, Focus-Ring-Daten und Shadow-Daten des DesignSystems. Dieses Dokument dupliziert ihre konkreten Werte nicht; der spätere Token Catalogue darf ausschließlich eindeutig belegte Werte übernehmen.

## 6. Accent / Primary Resolution

Der spätere Resolver folgt verbindlich diesem konzeptionellen Ablauf:

1. Host beziehungsweise Application liefert Accent-/Primary-Input.
2. Der Input wird validiert und normalisiert.
3. Accessibility-relevante Kalibrierung darf erfolgen.
4. Daraus wird eine nutzbare Accent-Skala beziehungsweise interne Farbbasis abgeleitet.
5. Die semantischen Rollen `--accent`, `--accent-hover`, `--accent-active` und `--on-accent` werden aufgelöst.
6. Die resultierenden Kombinationen erfüllen die Accessibility-Invarianten dieses Dokuments.

Der konkrete Validierungs-, Normalisierungs- und Kalibrierungsalgorithmus ist nicht bestätigt und bleibt TECH REVIEW. Jede spätere Umsetzung muss jedoch die beschriebenen Invarianten erfüllen; sie darf keine Komponente zur lokalen Accent-Berechnung verpflichten.

## 7. Contrast Mode

Contrast Mode ist eine systemweite Accessibility-Variante. Er darf Werte semantischer Tokens verändern, insbesondere für Textkontrast, Borders, Input Boundaries, Focus und Statusdarstellung. Komponenten bleiben strukturell gleich und konsumieren weiterhin dieselben Rollen.

Das DesignSystem belegt für High Contrast eine deutlichere Focus-Darstellung durch erhöhte Ringgröße und Alpha-Werte. Es beschreibt außerdem klarere Linien sowie die Anpassung semantischer Border-, Input-Border-, Status- und Focus-Ring-Tokens. Nicht belegte konkrete Werte oder weitere Kontraststufen werden nicht ergänzt.

Contrast Mode darf nicht durch komponentenlokale Sonder-CSS-Regeln umgesetzt werden, wenn dieselbe Wirkung über semantische Tokens lösbar ist.

## 8. Color-Deficiency Mode

Color-Deficiency Mode ist eine systemweite Accessibility-Variante. Er darf semantische Statusfarben und andere notwendige Rollen so verändern, dass Zustände besser unterscheidbar bleiben. Der Resolver beziehungsweise die Foundation-Ebene liefert die angepassten semantischen Rollen; Komponenten enthalten keinen eigenen Color-Deficiency-Code.

Das DesignSystem belegt eine Color-Deficiency-Variante, die Statuspaletten auf klarere Abstände verschiebt und Focus-Ring-Werte anpasst. Mehrere konkrete Deficiency-Varianten sind nicht eindeutig belegt und werden deshalb nicht erfunden.

Color-Deficiency Mode ersetzt nie die Regel, dass Status nicht ausschließlich über Farbe kommuniziert werden darf.

## 9. Accessibility Invariants

Folgende Invarianten sind verbindlich:

* **Normal Text:** mindestens 4,5:1 Kontrast.
* **Large Text:** mindestens 3:1 gemäß WCAG-Definition.
* **UI Boundaries and State Indicators:** mindestens 3:1, soweit WCAG dies für das jeweilige UI-Element oder den Zustand verlangt.
* **Focus:** sichtbar und ausreichend kontrastierend; die genaue Geometrie wird in `accessibility.md` spezifiziert.
* **Accent Foreground:** `--on-accent` muss für den vorgesehenen Accent-Hintergrund passend aufgelöst sein. Keine Component wählt lokal einen vermeintlich passenden Vordergrundwert.
* **Status:** Statusinformationen benötigen zusätzlich zur Farbe eine geeignete nicht-farbliche Darstellung, wenn Bedeutung sonst verloren geht.
* **Known Violations:** Bekannte WCAG-2.2-AA-Verstöße in Core UI blockieren die Veröffentlichung.

## 10. State Color Model

Das allgemeine Modell kennt, soweit für eine Komponente semantisch relevant, die Zustände default, hover, active/pressed, focus-visible, disabled, selected, error, success, warning und danger.

Nicht jede Komponente benötigt jeden State. Eine Component Specification darf nur die für sie relevanten States verwenden und muss jede visuelle Farbentscheidung auf eine bestätigte semantische oder component-specific Rolle zurückführen.

Hover- und Active-Farben werden nicht durch freie lokale Farbmanipulationen wie `darken(...)`, `lighten(...)`, beliebige Opacity oder freie `color-mix`-Werte erzeugt. Solche Mechanismen wären nur zulässig, wenn sie später ausdrücklich als Foundation-Mechanismus bestätigt werden.

## 11. Component-specific Color Tokens

Component-specific Tokens sind zulässig, wenn eine wiederverwendbare Komponente eine stabile semantische Zuordnung benötigt, die durch globale Semantic Tokens allein nicht klar genug ausdrückbar ist. Konzeptionelle Kategorien können etwa ein Primary-Button-Hintergrund, dessen Hover-Hintergrund oder ein Danger-Button-Vordergrund sein.

Diese Kategorien sind keine Aufforderung, jetzt neue CSS-Token-Namen einzuführen. Der konkrete Katalog folgt später. Jeder component-specific Color Token muss:

* aus bestätigten Foundation-Tokens abgeleitet sein,
* keine freien Farbwerte enthalten,
* Theme Modes nicht selbst berechnen,
* Accessibility-Regeln nicht umgehen.

## 12. Consumer Rules

Consumer dürfen Theme Inputs über die dafür vorgesehene öffentliche Foundation/API bereitstellen und dokumentierte Component APIs verwenden.

Consumer dürfen standardmäßig nicht:

* interne Semantic Tokens beliebig überschreiben,
* component-specific Tokens frei neu belegen,
* lokale Farben injizieren, um Varianten nachzubauen,
* Accessibility-Kalibrierung umgehen.

Für eine abweichende Override-API existiert keine bestätigte Regel. Dieses Dokument führt keine neue ein.

## 13. Component Authoring Rules

Autoren von Core Components verwenden ausschließlich bestätigte semantische oder component-specific Tokens. Sie verwenden keine:

* Hex-, RGB- oder HSL-Literale,
* Named Colors,
* frei erfundenen CSS Custom Properties,
* lokalen Light-/Dark-Verzweigungen,
* lokalen Accent-Berechnungen,
* lokalen Contrast-Mode-Berechnungen,
* lokalen Color-Deficiency-Berechnungen.

Ausnahmen benötigen eine ausdrückliche, dokumentierte und bestätigte Grundlage.

## 14. Relationship to Tokens

`color-system.md` definiert Bedeutung, Rollen, Resolver-Invarianten und Accessibility-Regeln. `tokens.md` definiert später die kanonischen Token-Namen, Token-Ebenen, konkreten Zuordnungen und eindeutig belegten Werte.

Beide Dokumente dürfen keine widersprüchlichen Doppeldefinitionen erzeugen. Dieser aktuelle Rollenbestand ist die normative Grundlage für die spätere Ergänzung des Token Catalogue, nicht dessen Ersatz.

## 15. Relationship to Density

Farben sind density-independent. Density darf Geometrie, Spacing, Typography und Control Height verändern, aber nicht die semantische Farbbedeutung oder einen Farbwert allein wegen S/M/L. Verändert ein Accessibility-Modus Werte, ist dies Theme-/Accessibility-Auflösung und keine Density.

## 16. Relationship to Components

Eine spätere Component Specification verweist für jede relevante visuelle Farbentscheidung auf eine bestätigte semantische oder component-specific Rolle. Ein Button darf beispielsweise nicht „blau“ spezifizieren, sondern muss eine bestätigte Rolle referenzieren.

Dieses Dokument erstellt keine Button Component Specification und keine Komponentenimplementierung.

## 17. Open Technical Work

| Work item | Status | Required outcome |
|---|---|---|
| Accent-Kalibrierungsalgorithmus | TECH REVIEW | Nachweisbare, die Invarianten erfüllende Regel ohne lokale Komponentenberechnung. |
| Primitive Color Catalogue | TECH REVIEW | Vollständige, eindeutig belegte primitive Farbskalen und interne Verwendungsgrenzen. |
| Semantic-to-Primitive Mapping | TECH REVIEW | Kanonisches Mapping je Theme Mode und Accessibility-Variante. |
| Contrast-Mode-Mapping | TECH REVIEW | Vollständige Zuordnung der veränderbaren semantischen Rollen. |
| Color-Deficiency-Mapping | TECH REVIEW | Vollständige Zuordnung der angepassten Rollen ohne erfundene Deficiency-Varianten. |
| Disabled Token Naming and mapping | TECH REVIEW | Kanonische Zuordnung der belegten Disabled-Rollen zu Component States. |
| Component-specific Color Token Catalogue | TECH REVIEW | Zugelassene Kategorien, Namen und Herleitung aus Foundation-Tokens. |
| Theme Resolver Architecture | OPEN | Technische Architektur und Implementierung des Resolvers; COLOR-006 bleibt OPEN. |

## 18. Decision Register Impact

Dieses Dokument kann später als Referenz für folgende bestehende Einträge dienen:

* COLOR-001–005 werden in ihrer bereits bestätigten Bedeutung präzisiert: globale Theme Inputs, resultierende Tokens, Accent als Eingabe sowie Accessibility vor exakter Farbübereinstimmung.
* COLOR-006 bleibt OPEN; das Farbmodell spezifiziert keine Resolver-Architektur oder Implementierung.
* TOKEN-001–002 und TOKEN-006 können bei der späteren Token-Katalogarbeit auf die Trennung zwischen Primitive, Semantic und component-specific Colors verweisen.
* A11Y-001–006 können bei der Accessibility-Spezifikation auf die Farb-Invarianten und das Verbot rein farblicher Bedeutung verweisen.

Es wird kein Decision-Register-Eintrag durch dieses Dokument als erledigt markiert und das Register wird in diesem Schritt nicht geändert.

## 19. AI Rules

Ein KI-Agent darf:

* semantische Farbrollen verwenden,
* bestätigte component-specific Tokens verwenden,
* Theme Inputs über vorgesehene APIs nutzen.

Ein KI-Agent darf nicht:

* neue Farbrollen erfinden,
* Rohfarben einsetzen,
* Accent lokal verändern,
* Kontrast durch visuelles Raten bestimmen,
* Dark-Mode-Farben selbst ableiten,
* fehlende Tokenwerte interpolieren,
* Accessibility zugunsten exakter Markenfarbe umgehen.

Fehlt eine benötigte Rolle, wird nicht improvisiert. Der Agent meldet sie als Foundation Gap.
