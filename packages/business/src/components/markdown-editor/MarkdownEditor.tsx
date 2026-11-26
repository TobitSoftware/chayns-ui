import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Markdown } from '@tiptap/markdown';
import { Button, Popup, TextField } from '@chayns-ui/core';
import {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from 'react';
import type { Editor } from '@tiptap/core';
import type {
  MarkdownEditorLinkLabels,
  MarkdownEditorProps,
  MarkdownEditorRef,
  MarkdownEditorShortcut,
  MarkdownEditorToolbarItem,
} from './MarkdownEditor.types.js';

const defaultLinkLabels: MarkdownEditorLinkLabels = {
  text: 'Text',
  url: 'URL',
  cancel: 'Abbrechen',
  save: 'Speichern',
  remove: 'Link entfernen',
  invalidUrl: 'Bitte eine gültige URL eingeben.',
};

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

function findLinkRange(editor: Editor, from: number, to: number, href: string) {
  const ranges: Array<{ from: number; to: number }> = [];
  editor.state.doc.descendants((node, position) => {
    if (
      !node.isText ||
      !node.marks.some((mark) => mark.type.name === 'link' && mark.attrs.href === href)
    ) {
      return;
    }
    ranges.push({ from: position, to: position + node.nodeSize });
  });

  const match = ranges.find((range) =>
    from === to ? from >= range.from && from <= range.to : from < range.to && to > range.from,
  );
  if (!match) return { from, to };

  let start = match.from;
  let end = match.to;
  let expanded = true;
  while (expanded) {
    expanded = false;
    for (const range of ranges) {
      if (range.to === start) {
        start = range.from;
        expanded = true;
      }
      if (range.from === end) {
        end = range.to;
        expanded = true;
      }
    }
  }
  return { from: start, to: end };
}

function isUnsafeHref(href: string) {
  const normalizedScheme = href.replace(/[\u0000-\u0020\u007f]/g, '');
  return /^(?:javascript|data):/i.test(normalizedScheme);
}

interface LinkDraft {
  from: number;
  to: number;
  href: string;
  isExistingLink: boolean;
}

interface LinkToolbarActionProps {
  editor: Editor;
  item: MarkdownEditorToolbarItem;
  active: boolean;
  disabled: boolean;
  hovered: boolean;
  linkLabels: MarkdownEditorLinkLabels;
  onHoverChange: (hovered: boolean) => void;
  onChange: () => void;
}

function LinkToolbarAction({
  editor,
  item,
  active,
  disabled,
  hovered,
  linkLabels,
  onHoverChange,
  onChange,
}: LinkToolbarActionProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [draft, setDraft] = useState<LinkDraft | null>(null);
  const [text, setText] = useState('');
  const [href, setHref] = useState('');
  const urlRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hasError = href.trim().length === 0 || isUnsafeHref(href);

  useEffect(() => {
    if (popupOpen) urlRef.current?.focus();
  }, [popupOpen]);

  function prepareDraft() {
    const { from, to } = editor.state.selection;
    const attributes = editor.getAttributes('link') as { href?: string };
    const currentHref = attributes.href ?? '';
    const range = currentHref ? findLinkRange(editor, from, to, currentHref) : { from, to };
    const selectedText = editor.state.doc.textBetween(range.from, range.to, ' ');
    const nextDraft: LinkDraft = {
      from: range.from,
      to: range.to,
      href: currentHref,
      isExistingLink: !!currentHref,
    };
    setDraft(nextDraft);
    setText(selectedText || currentHref);
    setHref(currentHref);
  }

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || hasError) return;
    const linkText = text || href;
    editor
      .chain()
      .insertContentAt({ from: draft.from, to: draft.to }, [{ type: 'text', text: linkText }])
      .setTextSelection({ from: draft.from, to: draft.from + linkText.length })
      .setLink({ href })
      .run();
    onChange();
    setPopupOpen(false);
    triggerRef.current?.focus();
  }

  function removeLink() {
    if (!draft) return;
    editor.chain().focus().setTextSelection({ from: draft.from, to: draft.to }).unsetLink().run();
    onChange();
    setPopupOpen(false);
    triggerRef.current?.focus();
  }

  function cancel() {
    setPopupOpen(false);
    triggerRef.current?.focus();
  }

  const buttonClassName = [
    'chayns-markdown-editor__toolbar-button',
    item.icon
      ? 'chayns-markdown-editor__toolbar-button--icon'
      : 'chayns-markdown-editor__toolbar-button--text',
    active ? 'chayns-markdown-editor__toolbar-button--active' : '',
    hovered ? 'chayns-markdown-editor__toolbar-button--hovered' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Popup
      open={popupOpen}
      onOpenChange={(nextOpen) => {
        if (nextOpen && !popupOpen) prepareDraft();
        setPopupOpen(nextOpen);
      }}
    >
      <Popup.Trigger
        ref={triggerRef}
        aria-label={item.label}
        aria-pressed={active}
        className={buttonClassName}
        disabled={disabled}
        onClick={() => {
          if (!popupOpen) prepareDraft();
        }}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        title={item.label}
      >
        {item.icon ? <ToolbarIcon icon={item.icon} solid={active || hovered} /> : item.label}
      </Popup.Trigger>
      <Popup.Content className="chayns-markdown-editor__link-popup">
        <form className="chayns-markdown-editor__link-form" onSubmit={save}>
          <TextField
            onChange={(event) => setText(event.currentTarget.value)}
            aria-label={linkLabels.text}
            placeholder={linkLabels.text}
            value={text}
          />
          <TextField
            ref={urlRef}
            error={hasError ? linkLabels.invalidUrl : undefined}
            onChange={(event) => setHref(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            aria-label={linkLabels.url}
            placeholder={linkLabels.url}
            value={href}
          />
          <div className="chayns-markdown-editor__link-actions">
            {draft?.isExistingLink ? (
              <Button onClick={removeLink} variant="danger">
                {linkLabels.remove}
              </Button>
            ) : null}
            <Button onClick={cancel} variant="ghost">
              {linkLabels.cancel}
            </Button>
            <Button disabled={hasError} type="submit" variant="primary">
              {linkLabels.save}
            </Button>
          </div>
        </form>
      </Popup.Content>
    </Popup>
  );
}

const MarkdownEditor = forwardRef<MarkdownEditorRef, MarkdownEditorProps>(function MarkdownEditor(
  {
    value,
    onValueChange,
    items = markdownEditorDefaultItems,
    linkLabels = defaultLinkLabels,
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

  function handleItemClick(item: MarkdownEditorToolbarItem) {
    item.onClick(editor);
    setRevision((current) => current + 1);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const item = editorItems.find(({ shortcut }) => shortcut && matchesShortcut(event, shortcut));
    if (!item || disabled || readOnly) return;
    event.preventDefault();
    handleItemClick(item);
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
          const isActive =
            item.isActive?.(editor) ?? (item.id === 'link' && editor.isActive('link'));
          const itemDisabled = disabled || readOnly || item.isDisabled?.(editor) === true;

          return (
            <Fragment key={item.id}>
              {editorItems === markdownEditorDefaultItems && (index === 4 || index === 6) ? (
                <span aria-hidden="true" className="chayns-markdown-editor__separator" />
              ) : null}
              {item.id === 'link' ? (
                <LinkToolbarAction
                  active={isActive}
                  disabled={itemDisabled}
                  editor={editor}
                  hovered={hoveredToolbarItem === item.id}
                  item={item}
                  linkLabels={linkLabels}
                  onChange={() => setRevision((current) => current + 1)}
                  onHoverChange={(hovered) => setHoveredToolbarItem(hovered ? item.id : null)}
                />
              ) : (
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
                  disabled={itemDisabled}
                  onClick={() => handleItemClick(item)}
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
              )}
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
