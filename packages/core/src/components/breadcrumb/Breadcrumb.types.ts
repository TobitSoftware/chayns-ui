import type { ComponentPropsWithRef, ReactNode } from 'react';
import type { ButtonIcon } from '../button/Button.types.js';

export interface BreadcrumbItem {
  label: Exclude<ReactNode, boolean | null | undefined>;
  /** Ancestors navigate; the last item omits href and represents the current page. */
  href?: string;
  icon?: ButtonIcon;
}

/** Hierarchies of three or more levels; use Tabs for peer content views. */
export interface BreadcrumbProps extends Omit<ComponentPropsWithRef<'nav'>, 'children'> {
  items: readonly BreadcrumbItem[];
}
