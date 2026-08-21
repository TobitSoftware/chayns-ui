# Packages

## `@chayns-ui/core`

Enthält sichtbare, generische React-Core-UI ohne Business-Logik oder direkte chayns-API-Abhängigkeit. Das Paket ist ESM-only, hat React als einzigen Peer und exportiert JavaScript/Typen getrennt von explizit importierbarem CSS. Milestone 1 stellt Root- und `./button`-Exports sowie `./button.css` und `./styles.css` bereit.

## `@chayns-ui/tokens`

Enthält bestätigte, aufgelöste Foundation-Werte als generierte `./baseline.css` und `./patch.css`. Es besitzt keine JavaScript-Runtime und implementiert keinen Theme Resolver. Der Patch bleibt in Milestone 1 deklarationsfrei.

Neue Pakete oder Komponenten benötigen eine bestätigte Architekturentscheidung beziehungsweise eine READY-Bewertung; diese beiden Pakete sind keine pauschale Implementierungsfreigabe.
