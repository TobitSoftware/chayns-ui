import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Breadcrumb from '../src/components/breadcrumb/Breadcrumb.js';

const items = [
  { label: 'Start', href: '/' },
  { label: 'Projekte', href: '/projects' },
  { label: 'Kampagne' },
];

describe('Breadcrumb', () => {
  it('exposes native ancestors and a non-interactive current page', () => {
    const ref = createRef<HTMLElement>();
    render(<Breadcrumb aria-label="Pfad" data-purpose="hierarchy" items={items} ref={ref} />);
    expect(screen.getByRole('navigation', { name: 'Pfad' })).toBe(ref.current);
    expect(ref.current).toHaveAttribute('data-purpose', 'hierarchy');
    expect(screen.getByRole('link', { name: 'Projekte' })).toHaveAttribute('href', '/projects');
    expect(screen.getByText('Kampagne')).toHaveAttribute('aria-current', 'page');
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
  it('rejects a current item before the last position', () => {
    expect(() =>
      render(<Breadcrumb items={[{ label: 'Start' }, { label: 'Kampagne' }]} />),
    ).toThrow('Breadcrumb ancestors require href');
  });
});
