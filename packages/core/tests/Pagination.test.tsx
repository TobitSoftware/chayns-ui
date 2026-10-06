import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import Pagination from '../src/components/pagination/Pagination.js';

const labels = { previous: 'Zurück', next: 'Weiter', pageLabel: (page: number) => `Seite ${page}` };

describe('Pagination', () => {
  it.each([
    [1, [1, 2, 3, 4, 5, 20]],
    [10, [1, 9, 10, 11, 20]],
    [20, [1, 16, 17, 18, 19, 20]],
  ])('keeps boundary/current pages for page %s', (page, expected) => {
    render(<Pagination labels={labels} onPageChange={vi.fn()} page={page} pageCount={20} />);
    expect(
      screen
        .getAllByRole('button')
        .filter((button) => button.textContent !== '')
        .map((button) => Number(button.textContent)),
    ).toEqual(expected);
    expect(screen.getByRole('button', { name: `Seite ${String(page)}` })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });
  it('preserves controlled selection, native ref and bounds', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    const ref = createRef<HTMLElement>();
    render(
      <Pagination
        aria-label="Seiten"
        labels={labels}
        onPageChange={onPageChange}
        page={1}
        pageCount={3}
        ref={ref}
      />,
    );
    expect(ref.current).toBe(screen.getByRole('navigation', { name: 'Seiten' }));
    expect(screen.getByRole('button', { name: 'Zurück' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: 'Seite 1' }));
    expect(onPageChange).not.toHaveBeenCalled();
    await user.click(screen.getByRole('button', { name: 'Weiter' }));
    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(screen.getByRole('button', { name: 'Seite 1' })).toHaveAttribute('aria-current', 'page');
  });
  it('lets the consumer cancel a page change', async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();
    render(
      <Pagination
        labels={labels}
        onClick={(event) => event.preventDefault()}
        onPageChange={onPageChange}
        page={1}
        pageCount={3}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Seite 2' }));
    expect(onPageChange).not.toHaveBeenCalled();
  });
  it.each([
    [0, 3],
    [4, 3],
    [1, 0],
    [1.5, 3],
  ])('rejects invalid page/count %s/%s', (page, pageCount) => {
    expect(() =>
      render(
        <Pagination labels={labels} onPageChange={vi.fn()} page={page} pageCount={pageCount} />,
      ),
    ).toThrow('Pagination requires');
  });
});
