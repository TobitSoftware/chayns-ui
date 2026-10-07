import type { ComponentProps, FC } from 'react';
import { Accordion } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const AccordionHeadLeading: FC<ComponentProps<typeof Accordion.Head.Leading>> = Accordion.Head.Leading;
