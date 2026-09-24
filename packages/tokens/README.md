# @chayns-ui/tokens

Resolved chayns UI Baseline and Patch CSS plus a framework-independent global theme API.

```ts
import { applyTheme } from '@chayns-ui/tokens';
import '@chayns-ui/tokens/baseline.css';
import '@chayns-ui/tokens/patch.css';

applyTheme({
  accentColor: '#0f6d7e',
  colorMode: 'dark',
  density: 'm',
  accessibilityMode: 'high-contrast',
});
```

`applyTheme` adds the selected global classes to `document.documentElement`. Calls are partial:
omitted options retain their current setting. Supported values are:

* `colorMode`: `light` or `dark`
* `density`: `s`, `m`, or `l`
* `accessibilityMode`: `standard`, `high-contrast`, or `color-deficiency`
* `accentColor`: a `#RRGGBB` primary/accent color

When supplied, `accentColor` adds a deterministic `chayns-accent--rrggbb` class and a managed CSS
rule containing the derived Accent tokens. The configured color remains the semantic `--accent`;
the scale is mixed towards white in the same RGB mixing direction as `chayns-colors`. Hover and
active values adjust HSL lightness by the selected color mode. `--on-accent` is selected between
black and white for the higher contrast ratio; the Accent input itself is not modified.
