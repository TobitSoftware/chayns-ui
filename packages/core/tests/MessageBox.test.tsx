import { createRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import MessageBox from '../src/components/message-box/MessageBox.js';

describe('MessageBox', () => {
  it('renders a static note with the neutral tone by default', () => {
    render(<MessageBox>Aufbewahrungshinweis</MessageBox>);
    const note = screen.getByRole('note');

    expect(note).toHaveClass('chayns-message-box', 'chayns-message-box--neutral');
    expect(note).toHaveTextContent('Aufbewahrungshinweis');
  });

  it.each(['admin', 'warning'] as const)('renders the documented %s tone', (tone) => {
    render(<MessageBox tone={tone}>Hinweis</MessageBox>);
    expect(screen.getByRole('note')).toHaveClass(`chayns-message-box--${tone}`);
  });

  it('forwards native aside props and ref', () => {
    const ref = createRef<HTMLElement>();
    render(
      <MessageBox
        aria-label="Administrationshinweis"
        className="consumer-class"
        data-purpose="admin"
        ref={ref}
        tone="admin"
      >
        Inhalt
      </MessageBox>,
    );

    const note = screen.getByRole('note', { name: 'Administrationshinweis' });
    expect(note).toBe(ref.current);
    expect(note).toHaveClass('consumer-class');
    expect(note).toHaveAttribute('data-purpose', 'admin');
  });

  it('renders safely on the server', () => {
    const markup = renderToString(<MessageBox tone="warning">Server warning</MessageBox>);
    expect(markup).toContain('role="note"');
    expect(markup).toContain('Server warning');
  });
});
