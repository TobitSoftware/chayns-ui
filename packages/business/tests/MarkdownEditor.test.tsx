import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import MarkdownEditor from '../src/components/markdown-editor/MarkdownEditor.js';
import type { MarkdownEditorRef } from '../src/components/markdown-editor/MarkdownEditor.types.js';

describe('MarkdownEditor', () => {
  it('keeps the markdown value controlled', async () => {
    const onValueChange = vi.fn();
    render(<MarkdownEditor aria-label="Editor" value="" onValueChange={onValueChange} />);
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
        value="**Bold**"
        onValueChange={() => undefined}
      />,
    );
    expect(ref.current?.getHTML()).toContain('<strong>Bold</strong>');
    ref.current?.focus();
    expect(document.activeElement).toBe(screen.getByRole('textbox', { name: 'Editor' }));
  });

  it('supports custom toolbar items', () => {
    const onClick = vi.fn();
    render(
      <MarkdownEditor
        aria-label="Editor"
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
