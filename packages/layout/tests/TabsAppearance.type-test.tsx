import { TABS_APPEARANCES, TabsAppearances } from '../src/index.js';
import type { TabsAppearance, TabsProps, TabsTabProps } from '../src/index.js';

export const enumValue: TabsAppearance = TabsAppearances.Underline;
export const literalValue: TabsAppearance = 'underline';
export const enumProps: TabsProps = { appearance: TabsAppearances.Underline, children: null };
export const literalProps: TabsProps = { appearance: 'attached', children: null };
export const literalIteration = TABS_APPEARANCES.includes('attached');
// @ts-expect-error arbitrary appearance strings remain unsupported
export const invalidProps: TabsProps = { appearance: 'pills', children: null };

export const classicIcon: TabsTabProps = { value: 'inbox', icon: 'fa-inbox', children: 'Inbox' };
export const brandIcon: TabsTabProps = {
  value: 'github',
  icon: 'fab fa-github',
  children: 'GitHub',
};
export const customIcon: TabsTabProps = { value: 'tobit', icon: 'ts-tobit', children: 'Tobit' };
// @ts-expect-error Tabs uses the same supported glyph names as Button
export const invalidIcon: TabsTabProps = { value: 'inbox', icon: 'inbox', children: 'Inbox' };
