## Einsatz

Eine Identität durch Bild oder Initialen repräsentieren.

## Nicht geeignet

Allgemeine Statusanzeigen oder das Beschaffen von Identitätsdaten.

## Alternativen

[Badge](?path=/docs/core-badge--docs) für Status oder Anzahl.

## Gut kombinierbar

[AvatarGroup](?path=/docs/core-avatargroup--docs) und List.

## Verwendung

```tsx
<Avatar name="Ada Lovelace" src={imageUrl} size={AvatarSizes.Default} />;
```

## Besonderheiten

Fehlt das Bild oder lädt es nicht, erscheinen Initialen. name bzw. alt bestimmt den zugänglichen Namen. badge ist dekorativ; dessen Bedeutung muss zusätzlich zugänglich sein. size ist eine lokale Designvariante.
