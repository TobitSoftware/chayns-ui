import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import MarkdownEditor from '../src/components/markdown-editor/MarkdownEditor.js';
import type { MarkdownEditorRef } from '../src/components/markdown-editor/MarkdownEditor.types.js';

const linkLabels = {
  text: 'Text',
  url: 'URL',
  cancel: 'Abbrechen',
  save: 'Speichern',
  remove: 'Link entfernen',
  invalidUrl: 'Bitte eine gültige URL eingeben.',
};

describe('MarkdownEditor', () => {
  it('keeps the markdown value controlled', async () => {
    const onValueChange = vi.fn();
    render(
      <MarkdownEditor
        aria-label="Editor"
        linkLabels={linkLabels}
        value=""
        onValueChange={onValueChange}
      />,
    );
    const editor = screen.getByRole('textbox', { name: 'Editor' });
    fireEvent.input(editor, { inputType: 'insertText', data: 'Hello' });
    await waitFor(() => expect(onValueChange).toHaveBeenCalled());
  });

  it('exposes current HTML and focus through its ref', () => {
    const ref = createRef<MarkdownEditorRef>();
    render(
      <MarkdownEditor
        ref={ref}
        aria-label="Editor"
        linkLabels={linkLabels}
        value="**Bold**"
        onValueChange={() => undefined}
      />,
    );
    expect(ref.current?.getHTML()).toContain('<strong>Bold</strong>');
    ref.current?.focus();
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Editor' }));
  });

  it('renders the default toolbar as accessible icon buttons in the reference order', () => {
    render(
      <MarkdownEditor
        aria-label="Editor"
        linkLabels={linkLabels}
        value=""
        onValueChange={() => undefined}
      />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((button) => button.getAttribute('aria-label'))).toEqual([
      'Fett',
      'Kursiv',
      'Unterstrichen',
      'Durchgestrichen',
      'Nummerierte Liste',
      'Aufzählung',
      'Link',
    ]);
    expect(buttons.every((button) => button.querySelector('.chayns-markdown-editor__icon'))).toBe(
      true,
    );
    expect(
      buttons.every(
        (button) => button.querySelectorAll('.chayns-markdown-editor__icon i').length === 1,
      ),
    ).toBe(true);
    expect(buttons.every((button) => button.tagName.toLowerCase() === 'button')).toBe(true);
    expect(buttons.every((button) => button.classList.contains('chayns-icon-button'))).toBe(false);
    expect(
      screen.getByRole('toolbar').querySelectorAll('.chayns-markdown-editor__separator'),
    ).toHaveLength(2);
  });

  it('shows a hover fill on every button and keeps the active fill while hovered', () => {
    render(
      <MarkdownEditor
        aria-label="Editor"
        linkLabels={linkLabels}
        items={[
          {
            type: 'button',
            id: 'custom-active',
            label: 'Aktiv',
            icon: 'fa-bold',
            onClick: () => undefined,
            isActive: () => true,
          },
          { type: 'button', id: 'custom-idle', label: 'Inaktiv', onClick: () => undefined },
        ]}
        value=""
        onValueChange={() => undefined}
      />,
    );
    const activeButton = screen.getByRole('button', { name: 'Aktiv' });
    const inactiveButton = screen.getByRole('button', { name: 'Inaktiv' });

    expect(activeButton).toHaveAttribute('aria-pressed', 'true');
    fireEvent.mouseEnter(inactiveButton);
    expect(inactiveButton).toHaveClass('chayns-markdown-editor__toolbar-button--hovered');
    fireEvent.mouseLeave(inactiveButton);
    fireEvent.mouseEnter(activeButton);
    expect(activeButton).toHaveClass('chayns-markdown-editor__toolbar-button--active');
    expect(activeButton).toHaveClass('chayns-markdown-editor__toolbar-button--hovered');
    expect(activeButton.querySelector('.chayns-markdown-editor__icon i')).toHaveClass('fas');
  });

  it('creates links through the popup and falls back to the URL for empty text', async () => {
    const onValueChange = vi.fn();
    render(
      <MarkdownEditor
        aria-label="Editor"
        linkLabels={linkLabels}
        value=""
        onValueChange={onValueChange}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Link' }));
    const textField = screen.getByRole('textbox', { name: 'Text' });
    const urlField = screen.getByRole('textbox', { name: 'URL' });
    expect(urlField).toHaveFocus();
    expect(screen.getByRole('button', { name: 'Link' })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.change(urlField, { target: { value: 'mailto:hello@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: 'Speichern' }));

    await waitFor(() =>
      expect(onValueChange).toHaveBeenCalledWith(
        '[mailto:hello@example.com](mailto:hello@example.com)',
      ),
    );
    await waitFor(() => expect(textField).not.toBeInTheDocument());
  });

  it('does not allow empty or unsafe URLs to be saved', () => {
    render(
      <MarkdownEditor
        aria-label="Editor"
        linkLabels={linkLabels}
        value=""
        onValueChange={() => undefined}
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Link' }));
    expect(screen.getByRole('button', { name: 'Speichern' })).toBeDisabled();
    fireEvent.change(screen.getByRole('textbox', { name: 'URL' }), {
      target: { value: 'java\nscript:alert(1)' },
    });
    expect(screen.getByRole('button', { name: 'Speichern' })).toBeDisabled();
  });

  it('supports custom toolbar items', () => {
    const onClick = vi.fn();
    render(
      <MarkdownEditor
        aria-label="Editor"
        linkLabels={linkLabels}
        items={[{ type: 'button', id: 'custom', label: 'Custom', onClick }]}
        value=""
        onValueChange={() => undefined}
      />,
    );
    fireEvent.click(screen.getByRole('button', { name: 'Custom' }));
    expect(onClick).toHaveBeenCalledOnce();
    expect(screen.queryByRole('button', { name: 'Fett' })).not.toBeInTheDocument();
  });
});
