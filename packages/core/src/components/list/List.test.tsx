import { renderToString } from 'react-dom/server';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import List from './List.js';
import ListItem from './ListItem.js';

describe('List', () => {
  it('renders a semantic list with its items', () => {
    render(
      <List>
        <ListItem title="Erste Zeile" />
        <ListItem title="Zweite Zeile" />
      </List>,
    );

    expect(screen.getByRole('list')).toHaveClass('chayns-list');
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('forwards native list props and className', () => {
    render(
      <List aria-label="Nachrichten" className="consumer-class">
        <ListItem title="Zeile" />
      </List>,
    );

    const list = screen.getByRole('list', { name: 'Nachrichten' });

    expect(list).toHaveClass('chayns-list', 'consumer-class');
  });
});

describe('ListItem', () => {
  it('renders a static row without interactive semantics by default', () => {
    render(
      <List>
        <ListItem subtitle="Vorschau" title="Titel" />
      </List>,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByText('Titel')).toHaveClass('chayns-list-item__title');
    expect(screen.getByText('Vorschau')).toHaveClass('chayns-list-item__subtitle');
  });

  it('renders an action button and forwards clicks', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <List>
        <ListItem onClick={handleClick} title="Aktion" />
      </List>,
    );

    await user.click(screen.getByRole('button', { name: 'Aktion' }));

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('renders a navigation link when href is provided', () => {
    render(
      <List>
        <ListItem href="#ziel" title="Navigation" />
      </List>,
    );

    expect(screen.getByRole('link', { name: 'Navigation' })).toHaveAttribute('href', '#ziel');
  });

  it('does not activate a disabled action button', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <List>
        <ListItem disabled onClick={handleClick} title="Aktion" />
      </List>,
    );

    const button = screen.getByRole('button', { name: 'Aktion' });
    await user.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('exposes a localized accessible name for the unread indicator', () => {
    render(
      <List>
        <ListItem title="Titel" unread unreadLabel="Ungelesen" />
      </List>,
    );

    expect(screen.getByText('Ungelesen')).toHaveClass('chayns-visually-hidden');
  });

  it('renders an unread indicator without a label as decorative', () => {
    render(
      <List>
        <ListItem title="Titel" unread />
      </List>,
    );

    expect(screen.queryByText('Ungelesen')).not.toBeInTheDocument();
    const listItem = screen.getByRole('listitem');
    expect(listItem.querySelector('.chayns-list-item__unread')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
  });

  it('renders a leading slot when provided', () => {
    render(
      <List>
        <ListItem leading={<span data-testid="avatar">A</span>} title="Titel" />
      </List>,
    );

    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('keeps row actions outside the row link so nested controls stay valid', () => {
    render(
      <List>
        <ListItem href="#ziel" title="Navigation" trailing={<button type="button">Menü</button>} />
      </List>,
    );

    const listItem = screen.getByRole('listitem');
    const link = screen.getByRole('link', { name: 'Navigation' });
    const trailingButton = screen.getByRole('button', { name: 'Menü' });

    expect(link).not.toContainElement(trailingButton);
    expect(listItem).toContainElement(trailingButton);
  });

  it('renders safely on the server', () => {
    const markup = renderToString(
      <List>
        <ListItem title="Server row" />
      </List>,
    );

    expect(markup).toContain('chayns-list');
    expect(markup).toContain('Server row');
  });
});
