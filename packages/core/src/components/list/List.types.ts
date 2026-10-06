import type { ComponentPropsWithRef, ReactNode } from 'react';

export type ListProps = ComponentPropsWithRef<'ul'>;
export type ListItemProps = ComponentPropsWithRef<'li'>;

export type ListItemActionProps =
  | (Omit<ComponentPropsWithRef<'a'>, 'children'> & { children: ReactNode; href: string })
  | (Omit<ComponentPropsWithRef<'button'>, 'children' | 'type'> & {
      children: ReactNode;
      href?: never;
      type?: never;
    });

export interface ListItemPartProps extends ComponentPropsWithRef<'span'> {
  children: ReactNode;
  className?: string;
}

export interface ListItemStatusProps extends Omit<ComponentPropsWithRef<'span'>, 'children'> {
  /** Localized description of the otherwise colour-only status dot. */
  label: Exclude<ReactNode, boolean | null | undefined>;
}
