# chayns UI – Typography

## 1. Purpose

Dieses Dokument ist die normative Spezifikation des Typografie-Modells von `chayns UI`. Es liegt zwischen Design Foundations, Density, Token Catalogue und späteren Component Specifications. Es definiert Bedeutung, Zusammensetzung und Verwendung typografischer Rollen; der spätere Token Catalogue bildet diese Regeln technisch ab.

Es ist keine konkrete CSS-Implementierung, kein Font Loader, kein vollständiger Token-Value-Dump und keine Component Specification. Nicht eindeutig aus dem DesignSystem übertragbare Werte werden nicht geschätzt.

## 2. Core Principles

### Semantic Typography

Core Components verwenden semantische Typography Roles. Sie wählen Font Size, Font Weight, Line Height und Letter Spacing nicht unabhängig voneinander nach visueller Bequemlichkeit.

### Role Cohesion

Eine Typography Role ist eine zusammengehörige typografische Definition. Zu ihr gehören mindestens, soweit vorgesehen, Font Family beziehungsweise Family Category, Font Size, Font Weight, Line Height und Letter Spacing. Diese Eigenschaften werden nicht beliebig zwischen Rollen gemischt.

### Central Font Provision

Font Families werden außerhalb der Core Components bereitgestellt. Core Components laden keine Webfonts, importieren keine Font-Dateien, registrieren keine Fonts und setzen keine globale Font-Infrastruktur auf.

### Density-aware Typography

Typography gehört zu den durch globale Density skalierenden Foundation-Bereichen. Die Skalierung erfolgt zentral über bestätigte Foundation-/Token-Regeln. Komponenten implementieren keine eigenen S/M/L-Typografietabellen.

### Accessibility before visual compression

Lesbarkeit und Accessibility haben Vorrang vor lokaler visueller Verdichtung. Komponenten verkleinern Text nicht eigenmächtig, um Layoutprobleme zu kaschieren.

## 3. Typography Architecture

### 3.1 Font Provision

Der Host beziehungsweise die umgebende Anwendung stellt die verwendeten Font Families bereit. Diese Verantwortung liegt außerhalb von Core Components.

### 3.2 Typography Role Data

Typography Role Data beschreibt die zusammengehörigen Eigenschaften einer Rolle, insbesondere Family/Family Category, Size, Weight, Line Height und Letter Spacing.

### 3.3 Semantic Typography Tokens

Semantic Typography Tokens stellen aufgelöste Rollen für den Konsum durch Core Components bereit. Sie entkoppeln Komponenten von konkreten Größen- und Metrikwerten.

### 3.4 Component-specific Typography Tokens

Component-specific Typography Tokens sind nur zulässig, wenn eine wiederverwendbare Komponente eine stabile, fachlich begründete typografische Zuordnung benötigt, die durch eine globale Rolle nicht ausreichend beschrieben wird.

```text
Font Provision
        ↓
Typography Role Data
        ↓
density-aware resolution
        ↓
Semantic Typography Tokens
        ↓
optional bestätigte component-specific Tokens
        ↓
Component Rendering
```

Das Diagramm beschreibt Verantwortung und Datenfluss, keine technische Implementierungsarchitektur.

## 4. Font Families

### Primary UI Font

Roboto ist die im aktuellen DesignSystem dokumentierte Hausschrift. Entsprechend der bestätigten chayns-UI-Regel wird die Font Family außerhalb der Komponenten bereitgestellt. Komponenten stellen nicht selbst sicher, dass Roboto geladen ist.

### Monospace

Roboto Mono ist ausschließlich für Code und technische Werte vorgesehen. Technische Werte sind hier Inhalte, deren technische Darstellung ausdrücklich spezifiziert ist, etwa Code oder technische Identifier. Diese Regel bedeutet nicht, dass beliebige Zahlen, IDs, Tabellenwerte, Labels oder Metadaten automatisch Monospace verwenden.

### Fallbacks

Das aktuelle DesignSystem referenziert für die Dokumentationsseite `Roboto` und `Roboto Mono` mit generischen CSS-Kategorien, aber keine bestätigte chayns-UI-Fallback-Strategie. Ein kanonischer Fallback-Stack wird deshalb nicht festgelegt. Die Fallback-Strategie ist TECH REVIEW, sobald sie Teil des Token-/Runtime-Vertrags werden soll.

## 5. Semantic Role Catalogue

Die folgenden Namen und ihre density-aware Größenrollen sind im aktuellen DesignSystem eindeutig belegt. Die Namen bedeuten nicht, dass alle Rollenmetadaten bereits vollständig in den chayns-UI-Token-Katalog übertragen wurden.

| Role | Confirmed semantic responsibility | Typical use bounded by current evidence |
|---|---|---|
| `--fs-display` | Besonders hervorgehobene Display-Typografie. | Seltene, prominente Display-Inhalte, etwa eine Hero-Überschrift. |
| `--fs-h1` | Überschriftenrolle der höchsten dargestellten Inhaltsebene eines Scopes. | Seiten- oder primäre Abschnittsüberschriften. |
| `--fs-h2` | Überschriftenrolle unterhalb von H1. | Untergeordnete Inhaltsbereiche und hervorgehobene Inhaltstitel. |
| `--fs-bodyl` | Größere Fließtextrolle. | Hervorgehobener Fließtext, wenn die DesignSystem-Rolle vorgesehen ist. |
| `--fs-body` | Reguläre Fließ- und UI-Textrolle. | Standard-Fließtext und dokumentierte Control-/Listeninhalte. |
| `--fs-meta` | Sekundäre Metainformationsrolle. | Zeitstempel, Labels und andere unterstützende Metainformationen. |
| `--fs-caption` | Kurze ergänzende beziehungsweise beschreibende Informationsrolle. | Ergänzende Beschriftungen und kurze Hilfsinformationen. |
| `--fs-micro` | Sehr kleine, klar begrenzte Informationsrolle. | Kleinstangaben und eng begrenzte Kennzeichnungen. |

Die vollständige Einsatzabgrenzung pro Rolle ist noch nicht als chayns-UI-Component-Specification-Matrix bestätigt. Die Tabelle begrenzt sich daher auf die aus Namen und dokumentierten DesignSystem-Beispielen tragfähige Semantik.

## 6. Role Semantics

Display ist nicht die allgemeine Seitenüberschrift, wenn H1 semantisch passend ist. H1 und H2 bilden visuelle Überschriftenrollen für unterschiedliche Inhaltsebenen. Body Large ist eine größere Fließtextrolle, nicht eine pauschale Auszeichnung jeder wichtigen Information. Body ist die reguläre Fließ- und UI-Textrolle. Meta, Caption und Micro sind kontrollierte Rollen für unterstützende, ergänzende beziehungsweise stark begrenzte Informationen.

Die genaue Einsatzentscheidung hängt vom Inhalt und der späteren Component Specification ab, nicht allein von der relativen Größe. Wo eine spezifischere Abgrenzung erforderlich ist, bleibt sie TECH REVIEW statt aus dem Rollennamen abgeleitet zu werden.

## 7. Typography Role Composition

Eine Rolle besteht nicht nur aus Font Size. Zu einer vollständig übertragenen Rolle gehören, sofern vom DesignSystem vorgesehen:

* Family oder Family Category,
* Size,
* Weight,
* Line Height,
* Letter Spacing.

Das DesignSystem verlangt, Schriftgröße über Rollen zu verwenden und Schnitt sowie Laufweite als Teil der Rolle zu behandeln. Die vollständigen Werte für Weight, Line Height und Letter Spacing sind laut DesignSystem Inventory aus den gebundenen Datenlisten des gerenderten DesignSystems nicht mit ausreichender Confidence extrahierbar. Sie werden nicht geschätzt, visuell vermessen oder aus anderen Systemen übernommen. Die vollständige Rollenmetadaten-Übertragung ist TECH REVIEW.

## 8. Density Interaction

Es gelten die bestätigten globalen Density-Werte:

* S = `--sf: 0.9`,
* M = `--sf: 1`,
* L = `--sf: 1.125`,
* M ist Standard.

Typography skaliert mit Density. Die semantische Rolle bleibt bei einem Density-Wechsel identisch: Body bleibt Body. Nur ihre aufgelösten skalierenden Maße ändern sich gemäß der Foundation-Regel.

Komponenten dürfen bei S nicht von Body auf Caption, bei L nicht von Body auf Body Large wechseln und keine eigenen Typography Roles abhängig von Density austauschen, um visuell ähnliche Größen zu erzielen. Density verändert die Ausprägung einer Rolle, nicht ihre semantische Bedeutung.

Die vollständige Zuordnung von Size, Line Height und weiterer Rollenmetadaten zu S/M/L bleibt trotz der bestätigten `--sf`-Werte TECH REVIEW, bis sie im Density Matrix und Token Catalogue vollständig übertragen ist.

## 9. Local Size Variants

Globale Density und legitime lokale Größenvarianten sind getrennt. Eine allgemeine S/M/L-Prop pro Core Component ist nicht erlaubt. Lokale Größenvarianten sind nur zulässig, wenn sie fachlich notwendig, ausdrücklich spezifiziert und als Component API bestätigt sind.

Typography darf diese Regel nicht umgehen. Eine Component bietet nicht beliebig `small`, `compact`, `large` oder ähnliche Typography-Modi an, nur weil entsprechende Rollen existieren. Die vollständige Liste legitimer lokaler Größenvarianten bleibt gemäß DENSITY-006 DESIGN REVIEW.

## 10. Heading Semantics vs Visual Roles

Semantische Dokument-/HTML-Hierarchie und visuelle Typography Role sind getrennte Konzepte. Accessibility und Dokumentstruktur bestimmen die semantische HTML-Ebene; Typography Roles bestimmen die visuelle typografische Darstellung.

Eine notwendige Heading-Hierarchie darf nicht verletzt werden, nur weil eine andere visuelle Größe gewünscht ist. Die spätere Component Specification muss beide Verantwortlichkeiten korrekt abbilden. Dieses Dokument definiert keine React-API dafür.

## 11. Text Hierarchy

Textrollen bilden eine kontrollierte Informationshierarchie. Komponenten wählen eine Rolle nicht ausschließlich nach dem gewünschten Pixelmaß. „Caption ist kleiner, also verwende ich Caption, damit es passt“ ist kein zulässiges Auswahlkriterium.

Die Rolle wird aufgrund ihrer semantischen Verantwortung gewählt. Funktioniert das Layout mit der korrekten Rolle nicht, ist dies ein Layout- oder Component-Specification-Problem, kein Grund für eine semantisch falsche Typography Role.

## 12. Text Color Relationship

Typography Role und Text Color Role sind getrennte Dimensionen. Beispielsweise ist Body eine Typography Role; `--text-2` ist eine Color Role. Ihre Kombination folgt bestätigten semantischen Regeln und wird nicht allein aus Größe oder Farbe abgeleitet.

Eine kleinere Typography Role bedeutet nicht automatisch eine schwächere Textfarbe. Eine sekundäre Textfarbe bedeutet nicht automatisch kleinere Typografie. Eine vollständige erlaubte Kombinationsmatrix ist nicht bestätigt und bleibt TECH REVIEW, falls sie für Component Specifications erforderlich wird. Siehe [color-system.md](color-system.md).

## 13. Line Height

Line Height ist Bestandteil der Typography Role. Komponenten verändern sie nicht lokal, um vertikale Zentrierung zu erzwingen, Controls kompakter zu machen oder mehr Text in begrenzte Flächen zu drücken.

Control Height und Typography sind getrennte Foundation-Dimensionen. Benötigt eine Komponente besondere Textmetriken, muss dies über ihre spätere Component Specification und bestätigte Tokens geregelt werden. Konkrete Line-Height-Werte werden hier nicht definiert.

## 14. Font Weight

Font Weight ist Bestandteil einer Rolle. Weight wird nicht frei verwendet, um Bedeutung zu simulieren: `font-weight: bold` ist keine generische Ersatzlösung für eine fehlende semantische Rolle, Hover/Active wird nicht standardmäßig durch Weight-Wechsel erzeugt und Komponenten führen keine beliebigen Weight-Stufen ein.

Konkrete Weight-Werte werden erst bei eindeutiger Belegbarkeit in den Token Catalogue übernommen. Bis dahin ist ihre vollständige Rollen-Zuordnung TECH REVIEW.

## 15. Letter Spacing

Letter Spacing ist Teil der Rollenmetadaten, sofern das DesignSystem es für die Rolle vorgibt. Lokale Tracking-Anpassungen aus visueller Bequemlichkeit sind nicht zulässig. Konkrete Werte werden nicht geschätzt.

## 16. Wrapping, Truncation and Overflow

Normaler Text soll grundsätzlich mit dem verfügbaren Raum umgehen können. Truncation ist keine globale Typography-Eigenschaft und darf nur eingesetzt werden, wenn das jeweilige Pattern oder die Component Specification sie vorsieht.

Ellipsis wird nicht pauschal auf UI-Text angewendet. Wichtige Informationen dürfen nicht ohne zugängliche oder spezifizierte Möglichkeit verborgen werden. Textcontainer schneiden Inhalt nicht durch willkürliche feste Höhen ab. Benötigt ein Pattern bewusst eine begrenzte Zeilenanzahl, muss dies explizit spezifiziert werden; dieses Dokument erzeugt keine generische `line-clamp`-Regel.

## 17. User Zoom and Text Scaling

Typography muss robuste Vergrößerung unterstützen. Keine Component darf voraussetzen, dass Text immer in eine unveränderliche Pixelbox passt. WCAG 2.2 AA und die bestehende Accessibility-Richtung haben Vorrang vor einem starren Layout.

Konkrete Zoom- oder Reflow-Grenzwerte sind im Repository nicht bestätigt und werden nicht erfunden. Die detaillierten Prüfkriterien gehören in das spätere `accessibility.md`.

## 18. Internationalization

Komponenten berücksichtigen unterschiedliche Inhalte: Längere Übersetzungen werden nicht durch lokale Font-Verkleinerung kompensiert, Komponenten gehen nicht von festen Wortlängen aus und Text unterstützt grundsätzlich Unicode-Inhalte.

Langfristig muss die Font-Fallback-Strategie Zeichen außerhalb der primären Font-Abdeckung berücksichtigen. Konkrete Sprach-/Script-spezifische Regeln oder Fallback-Ketten fehlen; die technische Fallback-Übertragung ist TECH REVIEW. Ob zusätzliche, fachlich besondere Typografieregeln pro Script erforderlich sind, ist OPEN, weil weder Designrichtung noch Zielregel ausreichend dokumentiert sind.

## 19. Monospace Rules

Roboto Mono ist nur für bestätigte technische Inhalte zulässig. Es ist keine dekorative Alternative und kein generischer Weg für Zahlen, IDs, Tabellen, Labels oder Metadaten ohne semantische Begründung.

Welche konkreten technischen Datentypen Monospace verwenden, wird nicht vollständig katalogisiert. Die genaue Einsatzmatrix bleibt TECH REVIEW.

## 20. Component-specific Typography Tokens

Component-specific Typography Tokens sind nur zulässig, wenn eine stabile Component-Anforderung durch globale Typography Roles nicht ausreichend beschrieben wird. Sie basieren auf Foundation-Regeln, enthalten keine freien Font Sizes oder Weights, berechnen Density nicht selbst und umgehen die globale Font Provision nicht.

Dieses Dokument erfindet keine konkreten Namen. Der Katalog folgt später.

## 21. Consumer Rules

Consumer dürfen die vorgesehene Font Provision der Anwendung erfüllen, dokumentierte Component APIs verwenden und Theme-/Foundation-Inputs über bestätigte öffentliche Mechanismen bereitstellen.

Consumer dürfen standardmäßig nicht:

* interne Typography Tokens beliebig überschreiben,
* Core Components über freie Font Sizes stylen,
* lokale Density über Typography simulieren,
* interne Font Families austauschen, sofern dafür keine bestätigte Theme-/Foundation-API existiert.

Eine bestätigte Override-API besteht nicht. Dieses Dokument führt keine neue ein.

## 22. Component Authoring Rules

Core Components verwenden bestätigte Typography Roles oder bestätigte component-specific Tokens. Sie definieren keine frei erfundenen `font-size`, `font-weight`, `line-height`, `letter-spacing` oder `font-family`, wenn eine Foundation Role zuständig ist.

Sie enthalten keine Font-Imports, Font-Downloads, `@font-face`-Definitionen, lokalen S/M/L-Typografietabellen oder visuellen Größenkorrekturen durch semantisch falsche Rollen.

## 23. Relationship to Tokens

`typography.md` definiert Rollen, Semantik, Zusammensetzung, Density-Verhalten, Authoring-Regeln und Accessibility-Invarianten. `tokens.md` definiert später kanonische technische Token-Namen, konkrete Werte, Density-Auflösung sowie primitive/semantic/component-specific Zuordnung.

Beide Dokumente dürfen keine widersprüchliche Doppeldefinition erzeugen.

## 24. Relationship to Color

Typography und Color sind orthogonale Foundation-Dimensionen. Eine Typography Role bestimmt nicht automatisch ihre Farbe; eine Color Role bestimmt nicht automatisch Typography. Component Specifications ordnen beide Dimensionen ausdrücklich korrekt zu. Siehe [color-system.md](color-system.md).

## 25. Relationship to Components

Eine spätere Component Specification führt jede typografische Darstellung auf eine bestätigte Foundation Role oder einen bestätigten component-specific Token zurück. Sie darf nicht einfach 14px, 16px, bold oder eine konkrete Line Height spezifizieren, wenn diese Werte nicht aus dem Foundation-/Token-System stammen.

Dieses Dokument erstellt keine Component Specification und keine Implementierung.

## 26. Open Technical Work

| Work item | Status | Required outcome |
|---|---|---|
| Vollständige Rollenmetadaten (Size, Weight, Line Height, Letter Spacing) | TECH REVIEW | Eindeutig belegte Übertragung je Rolle ohne Schätzung. |
| Font-Fallback-Strategie | TECH REVIEW | Kanonischer, mit Host Provision vereinbarer Fallback-Vertrag. |
| Density-Auflösung der Typography Roles | TECH REVIEW | Vollständige S/M/L-Matrix für alle skalierenden Rollenmetadaten. |
| Semantic-to-Token Mapping | TECH REVIEW | Kanonische technische Zuordnung der Rollen zu Tokens. |
| Component-specific Typography Token Catalogue | TECH REVIEW | Zulässige Kategorien und Herleitung aus Foundation-Rollen. |
| Monospace-Einsatzmatrix | TECH REVIEW | Bestätigte technische Inhalte und ihre typografische Zuordnung. |
| Internationalization-/Script-Fallbacks | TECH REVIEW | Technische Übertragung der Fallback-Unterstützung ohne erfundene Font-Ketten. |
| Erforderliche Typography/Color-Kombinationsmatrix | TECH REVIEW | Nur falls Component Specifications eine verbindliche Matrix benötigen. |
| Zusätzliche Script-spezifische Typografieregeln | OPEN | Designrichtung und Zielregel, falls über robuste Font-Fallbacks hinaus erforderlich. |
| Lokale Größenvarianten | DESIGN REVIEW | Vollständige Liste legitimer Component Variants gemäß DENSITY-006; keine allgemeine Typography-Variante. |

## 27. Decision Register Impact

Dieses Dokument kann später als Referenz für folgende bestehende Entscheidungen dienen:

* TYPE-001–004 werden bestätigt und präzisiert: zentrale Font Provision, Roboto/Roboto Mono, Rollenmetadaten über Tokens.
* DENSITY-001–006 und die Density-TECH-REVIEWs können auf die globale, rollenerhaltende Typography-Skalierung verweisen.
* TOKEN-001, TOKEN-002 und TOKEN-006 können auf den semantischen Konsum und den noch ausstehenden Katalog verweisen.
* A11Y-001–005 können auf Lesbarkeit, Zoom-/Text-Scaling-Robustheit und semantische Heading-Hierarchie verweisen.

Kein Eintrag wird als erledigt markiert. Das Decision Register wird in diesem Schritt nicht geändert.

## 28. AI Rules

Ein KI-Agent darf bestätigte Typography Roles und bestätigte component-specific Typography Tokens verwenden sowie Density über die vorgesehene Foundation konsumieren.

Ein KI-Agent darf nicht:

* Font Sizes, Weights, Line Heights oder Letter Spacings erfinden,
* Fonts importieren,
* Text lokal verkleinern, damit ein Layout passt,
* Rollen anhand ihrer vermuteten Pixelgröße auswählen,
* fehlende Typografiewerte aus dem gerenderten DesignSystem visuell schätzen,
* typische Roboto-Metriken als Ersatz für fehlende Daten einsetzen.

Fehlt eine benötigte Rolle oder Zuordnung, wird nicht improvisiert. Der Agent meldet einen Foundation Gap.
