# chayns UI – Philosophy

## Purpose of this document

Dieses Dokument definiert die grundlegenden Prinzipien von chayns UI.

Die Prinzipien stehen über einzelnen Implementierungsdetails.

Technologien, Tools und interne Strukturen dürfen sich langfristig verändern. Die hier beschriebenen Ziele und Entscheidungsgrundsätze sollen dagegen möglichst stabil bleiben.

Eine technische Lösung ist nicht allein deshalb geeignet, weil sie funktioniert.

Sie muss zusätzlich:

* zum DesignSystem passen,
* verständlich sein,
* zugänglich sein,
* wiederverwendbar sein,
* wartbar bleiben,
* für Menschen und KI-Systeme eindeutig nachvollziehbar sein.

---

## 1. Design decisions are system decisions

Designentscheidungen werden nicht individuell innerhalb einzelner Anwendungen oder Komponenten getroffen, wenn sie systemweit gelten können.

Wiederkehrende Regeln für beispielsweise:

* Farben,
* Abstände,
* Radien,
* Typografie,
* Interaktion,
* Motion,
* Accessibility,
* Komponentenverhalten

werden zentral beschrieben.

Produkte konsumieren diese Entscheidungen, statt sie erneut zu definieren.

---

## 2. Components implement rules, they do not invent them

Eine Komponente setzt definierte Design- und Verhaltensregeln um.

Sie darf keine neuen Designentscheidungen eigenständig einführen.

Wenn beispielsweise:

* ein Abstand,
* eine Farbe,
* eine Größenvariante,
* ein Interaktionsverhalten,
* eine Animation,
* eine neue Variante

nicht spezifiziert ist, darf sie nicht aus Bequemlichkeit innerhalb einer Komponente erfunden werden.

Fehlende Entscheidungen werden als offen dokumentiert.

---

## 3. Composition before configuration

chayns UI bevorzugt Komposition gegenüber immer umfangreicheren Komponenten-APIs.

Komplexe UI-Strukturen sollen aus klar abgegrenzten Bausteinen zusammengesetzt werden.

Beispielsweise können Komponenten logisch aus Bereichen wie:

* Header,
* Body,
* Footer,
* Item,
* Group,
* Trigger,
* Content

bestehen.

Eine große Anzahl von Props soll nicht verwendet werden, um beliebige interne Strukturen einer Komponente zu konfigurieren, wenn dieselbe Aufgabe durch verständliche Composition gelöst werden kann.

Composition soll dabei nicht zu unnötiger technischer Komplexität führen.

Die öffentliche API muss auch für einen normalen Anwendungsentwickler verständlich bleiben.

---

## 4. Containers own relationships

Ein einzelnes UI-Element kennt grundsätzlich nicht seine Position oder seinen Abstand zu benachbarten Elementen.

Die Beziehung zwischen mehreren Komponenten wird durch einen gemeinsamen Container beschrieben.

Beispiele:

* eine Input-Gruppe definiert den Abstand zwischen Form Controls,
* eine Accordion-Gruppe definiert die Beziehung zwischen Accordion-Items,
* eine Toolbar definiert die Anordnung ihrer Actions,
* ein Layout-Container definiert die Position seiner Bereiche.

Dadurch bleiben einzelne Komponenten unabhängig und wiederverwendbar.

---

## 5. Native web semantics first

Wann immer möglich, basiert chayns UI auf nativen Web-Semantiken.

Beispiele:

* Aktion → button
* Navigation → a
* Texteingabe → input
* mehrzeilige Texteingabe → textarea

Native Semantik darf nicht aus rein visuellen Gründen durch generische Elemente ersetzt werden.

ARIA ergänzt native Semantik, ersetzt sie aber nicht unnötig.

Das Ziel ist:

* bessere Accessibility,
* vorhersehbares Browser-Verhalten,
* bessere Keyboard-Unterstützung,
* geringere technische Komplexität.

---

## 6. Accessibility is part of correctness

Eine visuell korrekte Komponente ist nicht automatisch eine korrekte Komponente.

Accessibility ist Teil der funktionalen Definition.

Jede Core-Komponente muss insbesondere:

* vollständig per Tastatur bedienbar sein,
* sinnvolle Fokuszustände besitzen,
* mit Screenreadern funktionieren,
* geeignete native Semantik oder notwendige ARIA-Informationen verwenden,
* Informationen nicht ausschließlich über Farbe vermitteln.

WCAG 2.2 AA ist ein verbindliches Mindestniveau.

Eine bekannte Verletzung dieser Anforderungen ist ein funktionaler Fehler und kein optionales Verbesserungsthema.

---

## 7. The default path must be the correct path

Die einfachste Verwendung einer Komponente soll gleichzeitig der vorgesehene und zugängliche Standard sein.

Entwickler sollen nicht zusätzliche Properties oder Spezialwissen benötigen, um ein korrektes Standardverhalten zu erhalten.

Beispielsweise sollen:

* Fokusverhalten,
* Tastaturinteraktion,
* Standardanimationen,
* semantische Rollen,
* Density,
* Farben,
* Kontrastregeln

möglichst automatisch aus dem System folgen.

Escape Hatches dürfen existieren, sollen aber bewusst und selten benötigt werden.

---

## 8. Restrict variability intentionally

chayns UI ist keine freie Styling-Bibliothek.

Die Anzahl erlaubter Varianten soll bewusst begrenzt sein.

Wenn das DesignSystem beispielsweise bestimmte:

* Radien,
* Farben,
* Größen,
* Varianten,
* Zustände

definiert, bietet die Komponentenbibliothek genau diesen Lösungsraum an.

Beliebige Werte wie individuelle Pixel-Radien oder frei gewählte visuelle Varianten widersprechen diesem Prinzip.

Konsistenz ist wichtiger als maximale Konfigurierbarkeit.

---

## 9. Global user preferences are not component variants

Globale Nutzereinstellungen und lokale Komponentenvarianten müssen klar voneinander getrennt bleiben.

Die globale Density:

* S,
* M,
* L

ist eine Benutzerpräferenz und gilt für die Oberfläche.

Eine Komponente besitzt deshalb nicht automatisch eine entsprechende lokale size-Property.

Lokale Größenvarianten existieren ausschließlich dann, wenn sie im DesignSystem ausdrücklich als eigene fachliche Variante der Komponente definiert sind.

Beispiele können Avatar- oder Icon-Größen sein.

---

## 10. Design tokens are the styling contract

Komponenten verwenden keine frei erfundenen Designwerte.

Design Tokens und CSS Custom Properties bilden den Vertrag zwischen Design und Implementierung.

Wenn das DesignSystem eine allgemeine Skala definiert, wird diese verwendet.

Wenn für eine Komponente ein ausdrücklich definierter komponentenspezifischer Token existiert, wird dieser verwendet.

Der konkrete Wert eines Tokens darf sich verändern, ohne dass Komponenten dafür neu strukturiert werden müssen.

---

## 11. Central design evolution over local duplication

Designänderungen sollen möglichst zentral vorgenommen werden können.

Anwendungen sollen nicht dieselben Änderungen einzeln nachimplementieren müssen.

Dies gilt insbesondere für:

* Farben,
* Dichte,
* Spacing,
* Radien,
* Kontrast,
* Motion,
* visuelle Zustände.

Die Architektur soll deshalb vermeiden, dass Designentscheidungen unnötig in Anwendungscode kopiert werden.

---

## 12. Core UI owns visible UI

Die sichtbare Darstellung wiederverwendbarer Komponenten gehört grundsätzlich in Core UI.

Business Components sollen keine eigene parallele UI-Sprache entwickeln.

Sie komponieren Core-Komponenten und ergänzen:

* Daten,
* fachliche Zustände,
* Auswahl,
* Filterung,
* chayns-spezifische Integration.

Damit bleibt die visuelle Sprache zentral kontrollierbar.

---

## 13. Business logic stays outside Core UI

Core UI kennt keine:

* chayns API,
* fachlichen Datenquellen,
* Produktlogik,
* Businessprozesse.

Eine Core-Komponente erhält lediglich die Daten und Zustände, die für ihre Darstellung und UI-Interaktion notwendig sind.

Dadurch bleibt Core UI:

* testbar,
* wiederverwendbar,
* unabhängig,
* langfristig wartbar.

---

## 14. Layout is a reusable system concern

Wiederkehrende komplexe Layout-Strukturen sind keine produktspezifischen Einzelfälle, wenn mehrere Anwendungen dieselben Muster benötigen.

Dazu können beispielsweise gehören:

* Grid-Flächen,
* verschiebbare Bereiche,
* ein- und ausklappbare Panels,
* mehrspaltige Workspace-Strukturen,
* App-Layouts.

Solche Layout-Komponenten sollen zentral definiert werden, wenn ihre Regeln produktübergreifend gelten.

Sie dürfen dabei nicht unnötig Business-Logik enthalten.

---

## 15. Motion communicates change

Animation dient der Verständlichkeit von Zustandsänderungen und Interaktionen.

Sie ist kein Selbstzweck.

Animationen sollen:

* kurz,
* konsistent,
* performant,
* vorhersehbar

sein.

Für CSS-Animationen gelten bewusst enge technische Grenzen:

* transform,
* opacity,
* zusätzlich grid-template-rows für definierte dynamische Höhenübergänge.

Weitere animierte Layout-Eigenschaften werden nicht eingeführt.

Bei prefers-reduced-motion werden Animationen entfernt, wenn sie nicht notwendig sind, um einen Zustand zu verstehen.

---

## 16. Performance is part of UX

Eine theoretisch schöne Interaktion ist nicht sinnvoll, wenn sie sichtbar ruckelt oder unnötige Laufzeitkosten erzeugt.

Komponenten müssen deshalb auf:

* effiziente Browsermechanismen,
* geringe unnötige Re-Renders,
* performante Animationen,
* kontrollierte Abhängigkeiten

ausgerichtet sein.

Performance-Optimierung darf jedoch nicht zu unverständlichem oder übermäßig cleverem Code führen.

---

## 17. APIs are designed for humans first

Öffentliche APIs müssen für Entwickler verständlich und vorhersehbar sein.

Eine API soll:

* klare Namen,
* wenige Überraschungen,
* konsistente Patterns,
* native HTML-Konzepte

verwenden.

KI-Fähigkeit wird nicht dadurch erreicht, dass APIs für Maschinen optimiert und für Menschen schlechter lesbar werden.

Stattdessen sollen dieselben klaren Strukturen sowohl Menschen als auch KI-Systemen helfen.

---

## 18. AI consumes specifications, not assumptions

KI-Systeme sind ein geplanter Teil des Entwicklungsprozesses.

Sie dürfen fehlende Regeln jedoch nicht ersetzen.

Ein KI-Agent soll aus den Spezifikationen eindeutig ableiten können:

* welche Komponente geeignet ist,
* welche API verwendet wird,
* welche Kombination zulässig ist,
* welche Regeln gelten.

Kann dies nicht eindeutig festgestellt werden, soll die KI:

1. die fehlende Entscheidung erkennen,
2. sie als offen markieren,
3. keine eigene Produkt- oder Designentscheidung erfinden.

---

## 19. AI-generated code must remain human code

KI-generierter Code muss denselben Anforderungen entsprechen wie von Menschen geschriebener Code.

Er darf keine:

* unnötigen Abstraktionen,
* undokumentierten Sonderfälle,
* schwer nachvollziehbaren generischen Konstruktionen,
* ungewöhnlichen Patterns

einführen, nur weil sie automatisch erzeugt wurden.

Ein menschlicher Entwickler muss eine Komponente später lesen, verstehen, debuggen und ändern können.

Verständlichkeit hat Vorrang vor technischer Cleverness.

---

## 20. Reuse before new abstraction

Bevor eine neue Komponente, Variante oder Abstraktion eingeführt wird, muss geprüft werden, ob das Problem bereits mit bestehenden Bausteinen gelöst werden kann.

Neue zentrale Abstraktionen sind sinnvoll, wenn:

* das Muster mehrfach benötigt wird,
* die Regeln klar definiert sind,
* eine zentrale Umsetzung echte Konsistenz schafft.

Nicht jede Wiederholung rechtfertigt sofort eine neue globale Komponente.

---

## 21. Generic before product-specific

Core- und Layout-Komponenten sollen allgemeine UI-Probleme lösen.

Eine konkrete Produktanforderung darf nicht ohne Prüfung zur allgemeinen API werden.

Wenn beispielsweise eine produktspezifische Funktion aus einem allgemeineren Muster besteht, soll zunächst das allgemeine Muster identifiziert werden.

Produktbezogene Logik kann darauf aufbauen.

---

## 22. One responsibility per layer

Jede Ebene des Systems besitzt eine klare Verantwortung.

* DesignSystem definiert Design und UX-Regeln.
* Design Foundations und Tokens übersetzen wiederverwendbare Designentscheidungen.
* Core UI implementiert sichtbare UI und Interaktion.
* Layout Components implementieren wiederverwendbare Layout-Strukturen.
* Business Components ergänzen fachliche und chayns-spezifische Logik.
* Anwendungen kombinieren diese Bausteine zu Produkten.

Eine Ebene soll nicht unnötig Verantwortung einer anderen Ebene übernehmen.

---

## 23. Explicit decisions beat conventions hidden in code

Wichtige Regeln sollen nicht nur dadurch existieren, dass mehrere Komponenten zufällig gleich implementiert wurden.

Entscheidungen werden dokumentiert.

Das gilt insbesondere für:

* Komponentenverhalten,
* Accessibility,
* Varianten,
* Tokens,
* Motion,
* Composition,
* API-Regeln.

Code ist die Umsetzung einer Entscheidung, nicht deren einzige Dokumentation.

---

## 24. Documentation is part of the product

Eine Komponente gilt nicht allein deshalb als fertig, weil ihr Code existiert.

Zu einem vollständigen UI-System gehören auch:

* Einsatzregeln,
* Nicht-Einsatzregeln,
* API-Dokumentation,
* Accessibility-Informationen,
* Beispiele,
* Zustände,
* Varianten,
* bekannte Einschränkungen,
* maschinenlesbare Informationen.

Diese Dokumentation wird gemeinsam mit der Implementierung gepflegt.

---

## 25. Predictability over cleverness

Wenn zwei Lösungen fachlich gleich geeignet sind, wird die gewählt, die:

* einfacher,
* erwartbarer,
* verständlicher,
* konsistenter mit bestehenden Patterns

ist.

Ein Design-System profitiert stärker von Vorhersehbarkeit als von individuellen technischen Tricks.

---

## Decision Test

Wenn eine zukünftige Entscheidung unklar ist, soll sie gegen folgende Fragen geprüft werden:

1. Ist die Lösung mit dem DesignSystem vereinbar?
2. Verwendet sie bestehende Regeln und Tokens?
3. Ist die Verantwortung in der richtigen Systemebene?
4. Ist die Lösung standardmäßig zugänglich?
5. Ist die öffentliche API verständlich?
6. Kann das Problem durch Composition statt zusätzliche Konfiguration gelöst werden?
7. Vermeidet die Lösung unnötige Sonderfälle?
8. Ist sie für mehrere Anwendungen sinnvoll wiederverwendbar?
9. Bleibt sie für menschliche Entwickler verständlich und wartbar?
10. Kann ein KI-Agent die Entscheidung anhand dokumentierter Regeln nachvollziehen?
11. Ist das Verhalten vorhersehbar?
12. Wird eine neue Designentscheidung eingeführt, die eigentlich zuerst spezifiziert werden müsste?

Wenn eine Lösung mehrere dieser Fragen nicht überzeugend beantworten kann, soll sie nicht ohne weitere Klärung in das System aufgenommen werden.

## Relationship to other documentation

Dieses Dokument beschreibt den langfristigen Entscheidungsrahmen.

Andere Dokumente ergänzen ihn:

* `vision.md` beschreibt Ziel und Zweck des Projekts.
* das zukünftige Architecture-Dokument beschreibt technische Systemgrenzen.
* das UI Decision Register enthält konkrete bestätigte Entscheidungen.
* Design-Foundation-Dokumente definieren konkrete Designregeln.
* der Component Development Standard definiert konkrete Entwicklungsregeln.
* AI-Dokumentation definiert konkrete Regeln für Coding-Agenten.

Bei Widersprüchen zwischen einer konkreten bestätigten Entscheidung und einem allgemeinen Prinzip soll der Widerspruch sichtbar dokumentiert und bewusst geklärt werden.

Ein Prinzip darf nicht stillschweigend ignoriert werden.
