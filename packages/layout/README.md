# @chayns-ui/layout

Accessible layout components for chayns UI.

## Installation

```sh
pnpm add @chayns-ui/layout @chayns-ui/core @chayns-ui/tokens react
```

Load the resolved token stylesheet, Core stylesheet required by the host
application, and the Layout stylesheet:

```tsx
import '@chayns-ui/tokens/baseline.css';
import '@chayns-ui/tokens/patch.css';
import '@chayns-ui/core/styles.css';
import '@chayns-ui/layout/styles.css';

import { AppLayout } from '@chayns-ui/layout';
```

`AppLayout` wird über `Header`, `Logo`, `Navigation`, rekursive
`Navigation.Item`, `Content` und `CollapseToggle` komponiert. Der frühere
`items[]`-Vertrag wurde vor 1.0 entfernt. Tabs verwendet `Tabs.List`,
`Tabs.Tab value` und `Tabs.Panel value` statt `tabs[]`.

Alternatively, the component stylesheet is available as
`@chayns-ui/layout/app-layout.css` or
`@chayns-ui/layout/tabs.css`.
