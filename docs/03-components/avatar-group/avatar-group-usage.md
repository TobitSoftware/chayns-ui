## Einsatz

Mehrere Identitäten als kompakte, überlappende Avatar-Gruppe zeigen.

## Nicht geeignet

Eine lesbare Personenliste ersetzen oder reine Statuswerte darstellen.

## Alternativen

[List](?path=/docs/core-list--docs) für einzelne lesbare Einträge; [Avatar](?path=/docs/core-avatar--docs) für eine Identität.

## Gut kombinierbar

[Avatar](?path=/docs/core-avatar--docs) als Kinder; [Card](?path=/docs/core-card--docs) für den gemeinsamen Kontext.

## Verwendung

```tsx
<AvatarGroup max={3}>
  <Avatar name="Ada" />
  <Avatar name="Grace" />
</AvatarGroup>;
```

## Besonderheiten

max zählt den Überlaufplatz mit. Ohne max erscheinen alle Avatare. size vereinheitlicht die Größe der Kinder. Namen und weitere Identitätsdetails bei Bedarf zusätzlich sichtbar anbieten.
