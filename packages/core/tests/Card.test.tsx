import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Card from '../src/components/card/Card.js';

describe('Card', () => {
  it('renders one surface container with children', () => {
    const { container } = render(<Card>Inhalt</Card>);
    const card = container.firstElementChild;

    expect(container.children).toHaveLength(1);
    expect(card).toHaveClass('chayns-card');
    expect(card).toHaveTextContent('Inhalt');
  });

  it('renders the optional semantic header and leading icon', () => {
    render(
      <Card>
        <Card.Header icon="fa-chart-line">Q3-Budget</Card.Header>
        <p>Freigegeben</p>
      </Card>,
    );

    expect(screen.getByText('Q3-Budget')).toHaveClass('chayns-card__header-content');
    expect(document.querySelector('.chayns-card__header-icon')).toBeInTheDocument();
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
