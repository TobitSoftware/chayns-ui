import type { ComponentProps, FC } from 'react';
import { AccordionGroup } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const AccordionGroupRoot: FC<ComponentProps<typeof AccordionGroup>> = AccordionGroup;
