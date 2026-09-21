import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import List from '../src/components/list/List.js';

describe('List', () => {
  it('forwards native list and item props and refs', () => {
    const listRef = createRef<HTMLUListElement>();
    const itemRef = createRef<HTMLLIElement>();

    render(
      <List aria-label="Nachrichten" data-purpose="messages" ref={listRef}>
        <List.Item data-row="one" ref={itemRef}>
          <List.Item.Body>
            <List.Item.Title>Titel</List.Item.Title>
          </List.Item.Body>
        </List.Item>
      </List>,
    );

    expect(screen.getByRole('list', { name: 'Nachrichten' })).toBe(listRef.current);
    expect(screen.getByRole('listitem')).toBe(itemRef.current);
    expect(screen.getByRole('listitem')).toHaveAttribute('data-row', 'one');
  });

  it('renders native button and anchor actions without nested trailing controls', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <List>
        <List.Item>
          <List.Item.Action onClick={onClick}>
            <List.Item.Body>
              <List.Item.Title>Aktion</List.Item.Title>
            </List.Item.Body>
          </List.Item.Action>
          <List.Item.Trailing>
            <button type="button">Mehr</button>
          </List.Item.Trailing>
        </List.Item>
        <List.Item>
          <List.Item.Action href="#ziel">
            <List.Item.Body>
              <List.Item.Title>Navigation</List.Item.Title>
            </List.Item.Body>
          </List.Item.Action>
        </List.Item>
      </List>,
    );
    const button = screen.getByRole('button', { name: 'Aktion' });
    await user.click(button);
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.getByRole('link', { name: 'Navigation' })).toHaveAttribute('href', '#ziel');
    expect(button).not.toContainElement(screen.getByRole('button', { name: 'Mehr' }));
  });

  it('gives the neutral status indicator an accessible description', () => {
    render(
      <List>
        <List.Item>
          <List.Item.Trailing>
            <List.Item.Status label="Neu" />
          </List.Item.Trailing>
        </List.Item>
      </List>,
    );
    expect(screen.getByText('Neu')).toHaveClass('chayns-visually-hidden');
  });

  it('keeps long localized row content available for wrapping', () => {
    render(
      <List>
        <List.Item>
          <List.Item.Action>
            <List.Item.Body>
              <List.Item.Title>
                Änderungen für alle ausgewählten Empfängerinnen und Empfänger übernehmen
              </List.Item.Title>
              <List.Item.Description>
                Diese Beschreibung bleibt vollständig verfügbar und darf im verfügbaren Raum
                umbrechen.
              </List.Item.Description>
            </List.Item.Body>
          </List.Item.Action>
        </List.Item>
      </List>,
    );

    expect(screen.getByRole('button', { name: /Änderungen für alle/ })).toBeInTheDocument();
    expect(screen.getByText(/Diese Beschreibung bleibt vollständig/)).toBeInTheDocument();
  });

  it('rejects Item outside its documented parent', () => {
    expect(() => render(<List.Item />)).toThrow('List.Item must be rendered within List.');
  });
});
