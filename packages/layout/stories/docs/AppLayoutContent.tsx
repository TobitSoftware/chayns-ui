import type { ComponentProps, FC } from 'react';
import { AppLayout } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const AppLayoutContent: FC<ComponentProps<typeof AppLayout.Content>> = AppLayout.Content;
