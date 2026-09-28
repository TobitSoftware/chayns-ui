# @chayns-ui/tokens

Resolved chayns UI baseline, color and patch CSS plus an SSR-safe accent-color resolver. CSS
artifacts are compiled with Dart Sass during the package build.

```ts
import { cssVar, resolveThemeColors } from '@chayns-ui/tokens';
import '@chayns-ui/tokens/baseline.css';
import '@chayns-ui/tokens/color.css';
import '@chayns-ui/tokens/scale.css';
import '@chayns-ui/tokens/patch.css';

const themeColors = resolveThemeColors('#005eb8');
const buttonPadding = cssVar('--btn-py');
```

The application sets the returned CSS variables and one of `.theme-light`, `.theme-dark`, or
`.theme-auto` on `html`. `.theme-auto` uses `prefers-color-scheme` to select Light or Dark mode.
It can be combined with `.theme-high-contrast` and `.theme-color-deficiency` like the explicit
mode classes. `resolveThemeColors` calibrates accent colors in OKLCH against the mode surface and
returns the mode-specific accent, hover and active CSS variables. `scale.css` defaults to density M;
`.theme-density-s` and `.theme-density-l` override only `--sf`. `cssVar` accepts only exported,
known token names, providing autocomplete and type checking in TypeScript-aware IDEs.
