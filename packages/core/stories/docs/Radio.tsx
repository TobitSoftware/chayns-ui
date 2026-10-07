import type { ComponentProps, FC } from 'react';
import { RadioGroup } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const Radio: FC<ComponentProps<typeof RadioGroup.Radio>> = RadioGroup.Radio;
