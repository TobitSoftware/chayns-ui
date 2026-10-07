import { useState } from 'react';
import { Pagination } from '@chayns-ui/core';
import type { PaginationProps } from '@chayns-ui/core';

export default function ControlledPagination({
  page: initialPage = 1,
  ...props
}: Partial<PaginationProps> = {}) {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination
      aria-label="Seiten"
      pageCount={20}
      labels={{ previous: 'Zurück', next: 'Weiter', pageLabel: (page) => `Seite ${page}` }}
      {...props}
      page={page}
      onPageChange={setPage}
    />
  );
}
ControlledPagination.displayName = 'ControlledPagination';
