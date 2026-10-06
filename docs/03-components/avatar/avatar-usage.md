## Einsatz

Eine Person oder andere benannte Identität visuell wiedererkennbar machen, etwa in Nachrichten, Mitgliederlisten oder einem Profil. Ein vorhandenes Bild wird verwendet; andernfalls helfen Initialen bei der Zuordnung.

## Nicht geeignet

Avatar beschafft keine Identitätsdaten und ersetzt weder einen allgemeinen Statusindikator noch eine ausführliche Personenbeschreibung. Aus einem Avatar allein entsteht keine zugängliche Aktion.

## Alternativen

Wenn eine Identitätsgrafik keinen zusätzlichen Nutzen bietet, genügt der sichtbare Name als Text. Für die einzelne Identitätsgrafik gibt es keinen gleichwertigen anderen Library-Baustein.

## Gut kombinierbar

[List](?path=/docs/core-list--docs) verbindet Avatar mit lesbarem Namen und Kontext. [AvatarGroup](?path=/docs/core-avatargroup--docs) fasst mehrere Avatare kompakt zusammen; sie verwendet Avatar als Kind.

## Verwendung

Den vollständigen `name` angeben und, falls vorhanden, `src` übergeben. Ohne Bild zeigt die Komponente ihre Initialen-Fallback-Darstellung. Lokale Größen über das exportierte Enum wählen.

```tsx
import { Avatar, AvatarSizes } from '@chayns-ui/core';

<Avatar name="Ada Lovelace" src="/avatars/ada.webp" size={AvatarSizes.Default} />;
```

## Besonderheiten

Ein fehlgeschlagenes Bild verwendet ebenfalls den Fallback. `alt` kann den zugänglichen Namen überschreiben. Der optionale `badge`-Inhalt ist dekorativ: Seine Bedeutung muss zusätzlich als Text verfügbar sein. `size` ist eine bestätigte Designvariante und unabhängig von der globalen Nutzerdichte.
