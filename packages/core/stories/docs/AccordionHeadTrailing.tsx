import type { ComponentProps, FC } from 'react';
import { Accordion } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const AccordionHeadTrailing: FC<ComponentProps<typeof Accordion.Head.Trailing>> = Accordion.Head.Trailing;
