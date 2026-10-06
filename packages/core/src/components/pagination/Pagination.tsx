import { forwardRef, type MouseEvent } from 'react';
import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import { paginationPages } from './pagination-pages.js';
import type { PaginationProps } from './Pagination.types.js';

const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  { className, labels, onClick, onPageChange, page, pageCount, ...navProps },
  ref,
) {
  if (
    !Number.isSafeInteger(pageCount) ||
    pageCount < 1 ||
    !Number.isSafeInteger(page) ||
    page < 1 ||
    page > pageCount
  ) {
    throw new Error('Pagination requires pageCount >= 1 and page within 1..pageCount.');
  }

  function handleClick(event: MouseEvent<HTMLElement>) {
    onClick?.(event);
    if (event.defaultPrevented || !(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>('button[data-page]');
    if (!button || !event.currentTarget.contains(button) || button.disabled) return;
    const next = Number(button.dataset.page);
    if (next !== page) onPageChange(next);
  }

  return (
    // Native child buttons emit clicks for pointer and keyboard; the nav delegates both.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <nav
      {...navProps}
      className={['chayns-pagination', className].filter(Boolean).join(' ')}
      onClick={handleClick}
      ref={ref}
    >
      <button
        aria-label={labels.previous}
        className="chayns-pagination__arrow"
        data-page={page - 1}
        disabled={page === 1}
        type="button"
      >
        <ButtonIcon icon="fa-chevron-left" />
      </button>
      {paginationPages(page, pageCount).map((item, index) =>
        item === 'ellipsis' ? (
          <span
            aria-hidden="true"
            className="chayns-pagination__ellipsis"
            key={`ellipsis-${index}`}
          >
            …
          </span>
        ) : (
          <button
            aria-current={item === page ? 'page' : undefined}
            aria-label={labels.pageLabel(item)}
            className="chayns-pagination__page"
            data-page={item}
            key={item}
            type="button"
          >
            {item}
          </button>
        ),
      )}
      <button
        aria-label={labels.next}
        className="chayns-pagination__arrow"
        data-page={page + 1}
        disabled={page === pageCount}
        type="button"
      >
        <ButtonIcon icon="fa-chevron-right" />
      </button>
    </nav>
  );
});
Pagination.displayName = 'Pagination';
export default Pagination;
