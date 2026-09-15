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

`AppLayout` renders the application shell with a 64px header, recursive
navigation, controlled or uncontrolled sidebar collapse, and consumer content.

Alternatively, the component stylesheet is available as
`@chayns-ui/layout/app-layout.css` or
`@chayns-ui/layout/tabs.css`.
