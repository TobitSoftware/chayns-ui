import type { ComponentProps, FC } from 'react';
import { Card } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const CardHeader: FC<ComponentProps<typeof Card.Header>> = Card.Header;
