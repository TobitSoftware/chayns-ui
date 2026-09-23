# @chayns-ui/tokens

Resolved chayns UI Baseline and Patch CSS plus a framework-independent global theme API.

```ts
import { applyTheme } from '@chayns-ui/tokens';
import '@chayns-ui/tokens/baseline.css';
import '@chayns-ui/tokens/patch.css';

applyTheme({
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

A freely configurable primary/accent color is intentionally not part of this API until its required
token derivation and contrast-calibration rules are specified.
