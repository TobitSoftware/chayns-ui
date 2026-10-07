import type { ComponentProps, FC } from 'react';
import { AppLayout } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const AppLayoutCollapseToggle: FC<ComponentProps<typeof AppLayout.CollapseToggle>> = AppLayout.CollapseToggle;
