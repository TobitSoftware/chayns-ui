export function paginationPages(page: number, pageCount: number): (number | 'ellipsis')[] {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  if (page <= 4) return [1, 2, 3, 4, 5, 'ellipsis', pageCount];
  if (page >= pageCount - 3)
    return [1, 'ellipsis', pageCount - 4, pageCount - 3, pageCount - 2, pageCount - 1, pageCount];
  return [1, 'ellipsis', page - 1, page, page + 1, 'ellipsis', pageCount];
}
