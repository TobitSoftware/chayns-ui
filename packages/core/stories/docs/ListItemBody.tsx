import type { ComponentProps, FC } from 'react';
import { List } from '../../src/index.js';

// Preserve the original part; one export keeps native generic types isolated in docgen.
export const ListItemBody: FC<ComponentProps<typeof List.Item.Body>> = List.Item.Body;
