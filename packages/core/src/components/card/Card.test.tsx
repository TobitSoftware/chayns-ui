import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Card from './Card.js';

describe('Card', () => {
  it('renders one surface container with children', () => {
    const { container } = render(<Card>Inhalt</Card>);
    const card = container.firstElementChild;

    expect(container.children).toHaveLength(1);
    expect(card).toHaveClass('chayns-card');
    expect(card).not.toHaveClass('chayns-card--elevated');
    expect(card).toHaveTextContent('Inhalt');
  });

  it('adds the elevation hook only when requested', () => {
    const { container } = render(<Card elevated>Inhalt</Card>);

    expect(container.firstElementChild).toHaveClass('chayns-card', 'chayns-card--elevated');
  });

  it('forwards native props, className and ref', () => {
    const ref = createRef<HTMLDivElement>();

    render(
      <Card
        aria-label="Zusammenfassung"
        className="consumer-class"
        data-purpose="example"
        ref={ref}
      >
        Inhalt
      </Card>,
    );

    const card = screen.getByLabelText('Zusammenfassung');

    expect(card).toBe(ref.current);
    expect(card).toHaveClass('chayns-card', 'consumer-class');
    expect(card).toHaveAttribute('data-purpose', 'example');
  });

  it('renders safely on the server', () => {
    const markup = renderToString(<Card>Server surface</Card>);

    expect(markup).toContain('chayns-card');
    expect(markup).toContain('Server surface');
  });
});
