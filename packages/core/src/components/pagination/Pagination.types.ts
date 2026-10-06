import type { ComponentPropsWithRef } from 'react';

export interface PaginationLabels {
  previous: string;
  next: string;
  /** Localized accessible name, for example "Seite 3". */
  pageLabel: (page: number) => string;
}

/** Page-loaded collections; use explicit load-more for feeds and Breadcrumb for hierarchy. */
export interface PaginationProps extends Omit<ComponentPropsWithRef<'nav'>, 'children'> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  labels: PaginationLabels;
}
