import { EditorContent, useEditor } from '@tiptap/react';
import './markdown-editor.css';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import {
  Fragment,
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
    icon: 'fa-bold',
    shortcut: { key: 'b', ctrlKey: true, metaKey: true },
    onClick: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive('bold'),
  },
  {
    type: 'button',
    id: 'italic',
    label: 'Kursiv',
    icon: 'fa-italic',
    shortcut: { key: 'i', ctrlKey: true, metaKey: true },
    onClick: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive('italic'),
  },
  {
    type: 'button',
    id: 'underline',
    label: 'Unterstrichen',
    icon: 'fa-underline',
    onClick: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive('underline'),
  },
  {
    type: 'button',
    id: 'strike',
    label: 'Durchgestrichen',
    icon: 'fa-strikethrough',
    onClick: (editor) => editor.chain().focus().toggleStrike().run(),
    isActive: (editor) => editor.isActive('strike'),
  },
  {
    type: 'button',
    id: 'ordered-list',
    label: 'Nummerierte Liste',
    icon: 'fa-list-ol',
    onClick: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  {
    type: 'button',
    id: 'bullet-list',
    label: 'Aufzählung',
    icon: 'fa-list-ul',
    onClick: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  { type: 'button', id: 'link', label: 'Link', icon: 'fa-link', onClick: () => undefined },
];

interface ToolbarIconProps {
  icon: NonNullable<MarkdownEditorToolbarItem['icon']>;
  solid: boolean;
}

function ToolbarIcon({ icon, solid }: ToolbarIconProps) {
  const isBrandIcon = icon.startsWith('fab ') || icon.startsWith('fa-brands ');
  const isTokenIcon = icon.startsWith('ts-');
  const iconClassName = isTokenIcon
    ? icon
    : isBrandIcon
      ? `fab ${icon.replace(/^(fab |fa-brands )/, '')}`
      : icon.replace(/^(fas |far )/, '');

  return (
    <span aria-hidden="true" className="chayns-markdown-editor__icon">
      <i className={`${solid ? 'fas' : 'far'} ${iconClassName.replace(/^(far |fas )/, '')}`} />
    </span>
  );
}

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
  const [hoveredToolbarItem, setHoveredToolbarItem] = useState<string | null>(null);
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
        {editorItems.map((item, index) => {
          const isActive = item.isActive?.(editor) ?? false;

          return (
            <Fragment key={item.id}>
              {editorItems === markdownEditorDefaultItems && (index === 4 || index === 6) ? (
                <span aria-hidden="true" className="chayns-markdown-editor__separator" />
              ) : null}
              <button
                aria-label={item.label}
                aria-pressed={isActive}
                data-selected={isActive ? 'true' : undefined}
                onMouseEnter={() => setHoveredToolbarItem(item.id)}
                onMouseLeave={() => setHoveredToolbarItem(null)}
                className={[
                  'chayns-markdown-editor__toolbar-button',
                  item.icon
                    ? 'chayns-markdown-editor__toolbar-button--icon'
                    : 'chayns-markdown-editor__toolbar-button--text',
                  isActive ? 'chayns-markdown-editor__toolbar-button--active' : '',
                  hoveredToolbarItem === item.id
                    ? 'chayns-markdown-editor__toolbar-button--hovered'
                    : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                disabled={disabled || readOnly || item.isDisabled?.(editor) === true}
                onClick={() => void handleItemClick(item)}
                title={item.label}
                type="button"
              >
                {item.icon ? (
                  <ToolbarIcon
                    icon={item.icon}
                    solid={isActive || hoveredToolbarItem === item.id}
                  />
                ) : (
                  item.label
                )}
              </button>
            </Fragment>
          );
        })}
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
