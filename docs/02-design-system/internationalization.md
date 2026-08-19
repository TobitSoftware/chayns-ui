# chayns UI – Internationalization and Localization

## 1. Purpose

Dieses Dokument definiert die verbindliche i18n/l10n-Foundation für `chayns UI`. Es schafft Voraussetzungen für übersetzbare, locale-aware und layoutrobuste Komponenten, ohne Produkttexte zu übersetzen, Locales festzulegen oder eine parallele Translation Runtime einzuführen.

## 2. Terms and Boundaries

| Term | Meaning in chayns UI |
|---|---|
| Internationalization (i18n) | Technische Fähigkeit, unterschiedliche Sprachen, Locales und Formate korrekt zu unterstützen. |
| Localization (l10n) | Konkrete Anpassung von Inhalt und Darstellung an Sprache oder Locale. |
| Translation | Sprachliche Auflösung konkreter natürlicher Sprache. |

Die Foundation definiert technische Voraussetzungen und Governance. Unterstützte Sprachen/Locales, fachliche Terminologie, Übersetzungsqualität, Währungen und Zeitzonen bleiben Product-/Feature-Verantwortung.

## 3. Translation Infrastructure: Textstrings

Für übersetzbare allgemeine chayns-Anwendungs-/Produkttexte existiert das zentrale Textstring-System. Es enthält zentral gepflegte beziehungsweise vollständig übersetzte sprachabhängige Inhalte. chayns UI baut dafür kein zweites paralleles Übersetzungssystem auf.

Eine zusätzliche generische Translation Library wird nicht allein für chayns UI eingeführt, solange das bestehende Textstring-System den Anwendungsfall abdeckt. chayns UI übersetzt Textstrings nicht maschinell zur Laufzeit.

Textstring-Fallbacks und die Identitätsverwaltung sind Verantwortung der bestehenden Textstring-Infrastruktur. Das Repository dokumentiert deren konkrete Fallback-Mechanik nicht; chayns UI erfindet dafür keine parallele Policy.

## 4. Core UI Responsibility

Core Components benötigen grundsätzlich keine direkte Abhängigkeit von der chayns-spezifischen Textstring-Infrastruktur.

```text
Application / Business Layer
            ↓
   Textstring resolution
            ↓
     localized text
            ↓
     Core Component
```

Eine Core Component erhält Inhalte wie `children`, Label, Help Text, Error Text oder Accessible Name über ihre bestätigte öffentliche API beziehungsweise Composition. Sie muss nicht wissen, ob der Inhalt aus einem Textstring, Produktdaten, Nutzereingabe oder einer anderen Quelle stammt. Dieses Dokument definiert keine Component API.

Core Components setzen keine unübersetzbaren deutsch- oder englischsprachigen sichtbaren UI- oder Accessible-Name-Strings fest, wenn sie deren Inhalt selbst verantworten würden. Die Strategie für von chayns UI selbst verantwortete sichtbare Standardtexte wird vor der ersten betroffenen Component durch OPEN-022 geklärt.

## 5. Business and Application Responsibility

Eine Business Component kann wegen ihrer chayns-spezifischen Verantwortung bei Bedarf mit dem bestehenden Textstring-System integriert werden, wenn sie selbst wiederverwendbare Business-Texte verantwortet. Das ist keine Pflicht für jede Business Component; die technische Integration wird bei Bedarf spezifiziert.

Applications beziehungsweise die zuständige Product-/Business-Schicht wählen und lösen die passenden Textstrings für produktspezifische Texte. chayns UI entscheidet nicht, welcher fachliche Textstring für einen Produktfall richtig ist.

## 6. Translation Is Not Locale-aware Value Formatting

Textstrings lösen die Übersetzung natürlicher Sprache. Sie lösen nicht automatisch locale-sensitive Darstellung von Datum, Uhrzeit, Zeitzone, Zahlen, Dezimaltrennzeichen, Gruppierung, Prozentwerten, Währungen oder relativen Zeitangaben.

```text
Value + explicit locale / business context
            ↓
   locale-aware formatting
            ↓
       display value
            ↓
  chayns UI Component
```

Diese Diagramme sind konzeptionell und definieren keine Runtime-API. Native Web-/JavaScript-Plattformfähigkeiten wie `Intl` dürfen später verwendet werden, sind aber noch keine verbindliche Architekturentscheidung.

## 7. Translation Language and Locale

Die Translation Language ist die Sprache, in der ein Textstring aufgelöst wird. Locale ist der Kontext für locale-sensitive Darstellung, beispielsweise von Zahlen und Datumswerten. Beides kann zusammenhängen, ist aber nicht zwingend identisch.

Die Quelle und der Vertrag der aktiven Locale für locale-sensitive Formatierung sowie unterstützte Formatting-Locales bleiben OPEN-018. Aus dem Textstring-System wird keine vollständige Locale-Policy abgeleitet. Sprache, Locale, Region, Währung und Zeitzone bleiben getrennte Konzepte.

## 8. Messages, Variables and Grammar

Übersetzbare natürliche Sprache wird nicht aus sprachabhängigen Satzfragmenten zusammengesetzt. Texte mit Variablen, sprachabhängiger Pluralisierung oder grammatischen Varianten verwenden die bestehende Textstring-Lösung, sofern sie deren Anforderungen abdeckt.

Die konkreten Fähigkeiten, Syntax und Pluralregeln des Textstring-Systems sind im Repository nicht dokumentiert. Für einen konkreten Anwendungsfall mit unklaren Fähigkeiten greift das Component Implementation Readiness Gate. chayns UI führt keine zweite Message-Format-Lösung ein.

## 9. Dates, Times, Numbers and Currency

Benutzerseitig dargestellte Datums-/Zeitwerte, Zahlen und Prozentwerte müssen locale-aware formatierbar sein. Anzeigeformat und gespeicherter beziehungsweise transportierter Wert sind getrennte Konzepte. Wiederverwendbare Komponenten verdrahten keine manuellen Formate wie `DD.MM.YYYY` oder `MM/DD/YYYY` und nehmen keine Dezimal- oder Gruppierungszeichen an.

Timezone wird nicht aus Sprache, Locale oder Textstring abgeleitet; OPEN-019 bleibt für eine produktweite Timezone-Policy bestehen. Currency wird weder aus Sprache, Locale noch Textstring abgeleitet. Wenn sie fachlich relevant ist, stammt ihr Code oder Kontext aus einer expliziten Business-/Produktquelle. chayns UI definiert keine globale Währung.

## 10. Text Length and Layout Robustness

Die bestehenden Regeln bleiben unverändert: Komponenten optimieren nicht auf eine bestimmte Stringlänge, berücksichtigen längere Übersetzungen und mehrzeilige Labels, verkleinern Schrift nicht als Übersetzungsfix und schneiden kritische Inhalte nicht unnötig ab. Feste Höhen für texttragende Elemente benötigen einen eindeutigen Designvertrag.

Das Textstring-System beseitigt diese Layout- und Accessibility-Anforderungen nicht.

## 11. RTL and Writing Direction

RTL ist keine bestätigte Produktanforderung; OPEN-020 bleibt bestehen. Diese Foundation bestätigt keine RTL-Produkt-UX und baut keine Tokens oder Layoutsysteme um.

Unnötige LTR-only-Annahmen werden vermieden. Wo technisch und gestalterisch sinnvoll, werden semantische Start-/End-Richtungen gegenüber links/rechts bevorzugt. Richtungsabhängige Icons und Pattern werden erst bei tatsächlich geforderter RTL-Unterstützung ausdrücklich bewertet und spezifiziert.

## 12. Semantics and Accessibility

Dokument-/Content-Sprache muss für assistive Technologien bestimmbar sein. Accessible Names, Descriptions und Screenreader-Texte sind sprachliche Inhalte und genauso lokalisierbar wie sichtbare Texte. Erhält eine Core Component diese Inhalte vom Consumer, kann dieser dafür Textstrings verwenden.

Eine Core Component erzeugt keinen unübersetzbaren sprachlichen Accessible Name. Müsste sie einen eigenen sprachlichen Name erzeugen, ist die Textbereitstellung vor der Implementierung eindeutig zu spezifizieren. Kein Best Guess. Die Anforderungen aus A11Y-007 bleiben unverändert.

## 13. Textstring IDs

Textstring IDs und ihre Identitäten werden durch die bestehende Textstring-Infrastruktur verwaltet. chayns UI führt keine zweite Message-ID- oder Translation-Key-Konvention ein. Core Components setzen normalerweise keine fachlichen Textstring IDs als Bestandteil ihrer öffentlichen UI-API voraus.

## 14. i18n Implementation Gate

Eine Core-, Layout- oder Business-Komponente ist nicht implementation-ready, wenn ihre korrekte Umsetzung von einer ungeklärten i18n/l10n-Entscheidung abhängt. Relevante Beispiele sind unbekannte Locale-Quelle, erforderliche aber unklare Textstring-Fähigkeit für Grammatik, fachlich ungeklärte Währung oder Zeitzone, selbst verantworteter Standardtext oder bei geforderter RTL-Unterstützung richtungsabhängiges Verhalten.

Nicht jede Komponente benötigt eine eigene i18n-Spezifikation. Das Gate greift nur bei tatsächlich relevanten Abhängigkeiten. Dann wird die Implementierung nicht begonnen oder der betroffene Schritt gestoppt, die konkrete Frage geklärt und dokumentiert. Kein Best Guess.

## 15. Tooling and Dependencies

Es wird keine Translation Infrastructure implementiert und keine neue i18n-Dependency installiert. Das bestehende Textstring-System bleibt die Translation Infrastructure für die beschriebenen allgemeinen Texte. Eine zusätzliche Library ist nur nach einer späteren, expliziten Architekturentscheidung zulässig, wenn das Textstring-System den konkreten Anwendungsfall nicht abdeckt.

## 16. Decision Register Follow-ups

* CORE-009 bestätigt das Textstring-System als Translation Infrastructure und die Core-Entkopplung.
* OPEN-018 bleibt für Locale-sensitive Formatierung offen.
* OPEN-019 bleibt für Timezone-Policy offen.
* OPEN-020 bleibt für RTL als Produktanforderung offen.
* OPEN-022 bleibt für von chayns UI selbst verantwortete sichtbare Standardtexte offen.
* OPEN-021 ist durch CORE-009 superseded; chayns UI benötigt keine eigene Translation-Infrastruktur, Fallback-Policy oder Message-ID-Konvention.

## 17. AI Rules

KI-Agenten verwenden den bestehenden Textstring-Kontext, wenn er explizit bereitgestellt ist, und halten Core Components davon entkoppelt. Sie erfinden keine Textstring-API, IDs, Fallbacks, Translation Library, Locale, Währung, Zeitzone, RTL-Anforderung oder sprachabhängige Grammatikregel. Bei relevanter Mehrdeutigkeit stoppen sie und melden eine konkrete Klärungsfrage.
