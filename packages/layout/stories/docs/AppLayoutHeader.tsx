import type { ComponentProps, FC } from 'react';
import { AppLayout } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const AppLayoutHeader: FC<ComponentProps<typeof AppLayout.Header>> = AppLayout.Header;
