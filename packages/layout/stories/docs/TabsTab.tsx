import type { ComponentProps, FC } from 'react';
import { Tabs } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const TabsTab: FC<ComponentProps<typeof Tabs.Tab>> = Tabs.Tab;
