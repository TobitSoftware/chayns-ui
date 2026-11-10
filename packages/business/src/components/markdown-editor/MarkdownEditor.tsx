import { EditorContent, useEditor } from '@tiptap/react';
import './markdown-editor.css';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react';
import type {
  MarkdownEditorProps,
  MarkdownEditorRef,
  MarkdownEditorShortcut,
  MarkdownEditorToolbarItem,
} from './MarkdownEditor.types.js';

export const markdownEditorDefaultItems: readonly MarkdownEditorToolbarItem[] = [
  {
    type: 'button',
    id: 'bold',
    label: 'Fett',
    shortcut: { key: 'b', ctrlKey: true, metaKey: true },
    onClick: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive('bold'),
  },
  {
    type: 'button',
    id: 'italic',
    label: 'Kursiv',
    shortcut: { key: 'i', ctrlKey: true, metaKey: true },
    onClick: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
  },
  {
    type: 'button',
    id: 'strike',
    label: 'Durchgestrichen',
    onClick: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
  },
  {
    type: 'button',
    id: 'underline',
    label: 'Unterstrichen',
    onClick: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive('underline'),
  },
  {
    type: 'button',
    id: 'bullet-list',
    label: 'Aufzählung',
    onClick: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  {
    type: 'button',
    id: 'ordered-list',
    label: 'Nummerierte Liste',
    onClick: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  { type: 'button', id: 'link', label: 'Link', onClick: () => undefined },
];

function matchesShortcut(event: KeyboardEvent, shortcut: MarkdownEditorShortcut) {
  return (
    event.key.toLowerCase() === shortcut.key.toLowerCase() &&
    !!shortcut.ctrlKey === event.ctrlKey &&
    !!shortcut.metaKey === event.metaKey &&
    !!shortcut.shiftKey === event.shiftKey &&
    !!shortcut.altKey === event.altKey
  );
}

const MarkdownEditor = forwardRef<MarkdownEditorRef, MarkdownEditorProps>(function MarkdownEditor(
  {
    value,
    onValueChange,
    items = markdownEditorDefaultItems,
    onRequestLink,
    placeholder,
    readOnly = false,
    disabled = false,
    className,
    onKeyDown: consumerOnKeyDown,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...nativeProps
  },
  ref,
) {
  const valueRef = useRef(value);
  const [revision, setRevision] = useState(0);
  const editor = useEditor({
    extensions: [StarterKit, Markdown],
    content: value,
    contentType: 'markdown',
    editorProps: {
      attributes: {
        ...(ariaLabel ? { 'aria-label': ariaLabel } : {}),
        ...(ariaLabelledBy ? { 'aria-labelledby': ariaLabelledBy } : {}),
        'data-placeholder': placeholder ?? '',
      },
    },
    editable: !readOnly && !disabled,
    onUpdate: ({ editor: currentEditor }) => {
      const markdown = currentEditor.getMarkdown();
      valueRef.current = markdown;
      onValueChange(markdown);
      setRevision((current) => current + 1);
    },
  });

  useEffect(() => {
    if (!editor || value === valueRef.current) return;
    valueRef.current = value;
    editor.commands.setContent(value, { emitUpdate: false, contentType: 'markdown' });
    setRevision((current) => current + 1);
  }, [editor, value]);

  useEffect(() => {
    editor?.setEditable(!readOnly && !disabled);
  }, [editor, readOnly, disabled]);

  useImperativeHandle(
    ref,
    () => ({
      getHTML: () => editor?.getHTML() ?? '',
      focus: () => {
        editor?.commands.focus();
        editor?.view.dom.focus();
      },
    }),
    [editor],
  );

  if (!editor) return null;
  if (!ariaLabel && !ariaLabelledBy) {
    throw new Error('MarkdownEditor requires aria-label or aria-labelledby.');
  }
  const editorItems = items;
  void revision;

  async function handleItemClick(item: MarkdownEditorToolbarItem) {
    if (item.id === 'link' && onRequestLink) {
      const { from, to } = editor.state.selection;
      const linkAttributes = editor.getAttributes('link') as { href?: string };
      const href = linkAttributes.href ?? null;
      const text = String(editor.state.doc.textBetween(from, to, ' '));
      const nextHref = await onRequestLink({ href, text });
      if (nextHref === null) editor.chain().focus().unsetLink().run();
      else if (nextHref) editor.chain().focus().setLink({ href: nextHref }).run();
      return;
    }
    item.onClick(editor);
    setRevision((current) => current + 1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const item = editorItems.find(({ shortcut }) => shortcut && matchesShortcut(event, shortcut));
    if (!item || disabled || readOnly) return;
    event.preventDefault();
    void handleItemClick(item);
  }

  return (
    <div
      {...nativeProps}
      className={['chayns-markdown-editor', className].filter(Boolean).join(' ')}
      data-disabled={disabled || undefined}
      data-readonly={readOnly || undefined}
    >
      <div aria-label="Formatierung" className="chayns-markdown-editor__toolbar" role="toolbar">
        {editorItems.map((item) => (
          <button
            aria-label={item.label}
            aria-pressed={item.isActive?.(editor) ?? false}
            disabled={disabled || readOnly || item.isDisabled?.(editor) === true}
            key={item.id}
            onClick={() => void handleItemClick(item)}
            title={item.label}
            type="button"
          >
            {item.icon ?? item.label}
          </button>
        ))}
      </div>
      <div className="chayns-markdown-editor__content">
        <EditorContent
          editor={editor}
          onKeyDown={(event) => {
            consumerOnKeyDown?.(event);
            if (!event.defaultPrevented) handleKeyDown(event);
          }}
        />
      </div>
    </div>
  );
});
MarkdownEditor.displayName = 'MarkdownEditor';
export default MarkdownEditor;
