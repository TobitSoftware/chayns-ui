import { TABS_APPEARANCES, TabsAppearances } from '../src/index.js';
import type { TabsAppearance, TabsProps } from '../src/index.js';

export const enumValue: TabsAppearance = TabsAppearances.Underline;
export const literalValue: TabsAppearance = 'underline';
export const enumProps: TabsProps = { appearance: TabsAppearances.Underline, children: null };
export const literalProps: TabsProps = { appearance: 'attached', children: null };
export const literalIteration = TABS_APPEARANCES.includes('attached');
// @ts-expect-error arbitrary appearance strings remain unsupported
export const invalidProps: TabsProps = { appearance: 'pills', children: null };
