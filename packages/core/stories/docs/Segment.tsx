import type { ComponentProps, FC } from 'react';
import { SegmentedControl } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const Segment: FC<ComponentProps<typeof SegmentedControl.Segment>> = SegmentedControl.Segment;
