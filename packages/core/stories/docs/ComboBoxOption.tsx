import type { ComponentProps, FC } from 'react';
import { ComboBox } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const ComboBoxOption: FC<ComponentProps<typeof ComboBox.Option>> = ComboBox.Option;
