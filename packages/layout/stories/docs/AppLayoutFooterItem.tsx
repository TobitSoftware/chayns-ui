import type { ComponentProps, FC } from 'react';
import { AppLayout } from '../../src/index.js';

export const AppLayoutFooterItem: FC<ComponentProps<typeof AppLayout.Footer.Item>> =
  AppLayout.Footer.Item;
