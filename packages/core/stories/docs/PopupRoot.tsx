import type { ComponentProps, FC } from 'react';
import { Popup } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const PopupRoot: FC<ComponentProps<typeof Popup>> = Popup;
