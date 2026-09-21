import { createRef } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Avatar from '../src/components/avatar/Avatar.js';

describe('Avatar', () => {
  it('renders initials from the first and last name words', () => {
    render(<Avatar name="Peter Schmidt" />);

    expect(screen.getByRole('img', { name: 'Peter Schmidt' })).toHaveTextContent('PS');
  });

  it('uses the first initial for a single-word name', () => {
    render(<Avatar name="Madonna" />);

    expect(screen.getByRole('img', { name: 'Madonna' })).toHaveTextContent('M');
  });

  it('supports the small avatar geometry', () => {
    render(<Avatar name="Peter Schmidt" size="small" />);

    expect(screen.getByRole('img', { name: 'Peter Schmidt' })).toHaveClass('chayns-avatar--small');
  });

  it('supports the Bodywork large geometry and native span ownership', () => {
    const ref = createRef<HTMLSpanElement>();

    render(<Avatar data-purpose="profile" name="Peter Schmidt" ref={ref} size="large" />);

    expect(ref.current).toHaveClass('chayns-avatar--large');
    expect(ref.current).toHaveAttribute('data-purpose', 'profile');
  });

  it('renders an image and falls back to initials when it fails', () => {
    render(<Avatar name="Peter Schmidt" src="/missing.jpg" />);

    const image = screen.getByRole('img', { name: 'Peter Schmidt' }).querySelector('img');
    expect(image).toHaveAttribute('src', '/missing.jpg');

    fireEvent.error(image!);

    expect(screen.getByRole('img', { name: 'Peter Schmidt' })).toHaveTextContent('PS');
    expect(screen.queryByRole('img', { name: '' })).not.toBeInTheDocument();
  });

  it('renders a decorative badge', () => {
    render(<Avatar badge={<span data-testid="badge">✉</span>} name="Peter Schmidt" />);

    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByTestId('badge').parentElement).toHaveAttribute('aria-hidden', 'true');
  });
});
