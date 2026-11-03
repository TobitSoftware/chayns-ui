import { forwardRef, useId, useImperativeHandle, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CLEAR_HISTORY_COMMAND } from 'lexical';
import { useEditorClipboard } from './hooks/useEditorClipboard.js';
import { composeNativeRefs } from '../../utils/native-ref.js';
import { useComposerOverlayPosition } from '../../hooks/useComposerOverlayPosition.js';
import type { RichTextEditorProps } from './RichTextEditor.types.js';
import { useRichTextEngine } from './hooks/useRichTextEngine.js';
import { documentText, normalizeDocument } from './utils/document.js';

const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  function RichTextEditor(props, ref) {
    const {
      value,
      onValueChange,
      commandsRef,
      onSubmit,
      onMentionQueryChange,
      mentionResults,
      mentionStatusText,
      readOnly,
      disabled,
      placeholder,
      className,
      onKeyDown,
      onBeforeInput,
      onBeforeInputCapture,
      onBlur,
      onCompositionStart,
      onCompositionEnd,
      onCopy,
      onCut,
      onPaste,
      onDrop,
      'aria-describedby': describedBy,
      ...nativeProps
    } = props;
    const engine = useRichTextEngine({
      ...props,
      onValueChange,
      ...(onSubmit ? { onSubmit } : {}),
      ...(onMentionQueryChange ? { onMentionQueryChange } : {}),
      onKeyDown,
      onBeforeInput,
      onBeforeInputCapture,
    });
    const generatedId = useId();
    const popupRef = useRef<HTMLDivElement>(null);
    const listId = `${generatedId}-mentions`;
    const statusId = `${generatedId}-status`;
    const currentResults =
      engine.query && mentionResults?.queryId === engine.query.id ? mentionResults : undefined;
    const items =
      currentResults && !currentResults.isLoading && !currentResults.error
        ? currentResults.items
        : [];
    const isOpen = !!engine.query && items.length > 0;
    const text = documentText(normalizeDocument(value));
    const status = currentResults?.error ?? mentionStatusText;
    const setRef = useMemo(
      () => composeNativeRefs(engine.elementRef, ref),
      [engine.elementRef, ref],
    );
    useComposerOverlayPosition(popupRef, engine.elementRef.current, isOpen);
    useImperativeHandle(commandsRef, () => ({
      focus: () => engine.elementRef.current?.focus(),
      insertText: engine.insertText,
      clearHistory: () => {
        engine.editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
      },
    }));

    const clipboard = useEditorClipboard(engine.editor, engine.insertText, {
      ...props,
      onCopy,
      onCut,
      onPaste,
      onDrop,
    });

    if (!props['aria-label'] && !props['aria-labelledby'])
      throw new Error('RichTextEditor requires aria-label or aria-labelledby.');
    if (
      new Set(items.map((item) => item.id)).size !== items.length ||
      items.some((item) => !item.id || !item.label)
    )
      throw new Error('Mention results require unique nonempty IDs and labels.');

    return (
      <div className="chayns-rich-text-editor">
        <div
          {...nativeProps}
          aria-activedescendant={
            isOpen && items[engine.activeIndex] ? `${listId}-${engine.activeIndex}` : undefined
          }
          aria-autocomplete={engine.query ? 'list' : undefined}
          aria-controls={isOpen ? listId : undefined}
          aria-describedby={
            [describedBy, status ? statusId : undefined].filter(Boolean).join(' ') || undefined
          }
          aria-disabled={disabled}
          aria-multiline="true"
          aria-readonly={readOnly}
          className={['chayns-rich-text-editor__control', className].filter(Boolean).join(' ')}
          contentEditable={!disabled && !readOnly}
          suppressContentEditableWarning
          ref={setRef}
          role="textbox"
          tabIndex={disabled ? -1 : (nativeProps.tabIndex ?? 0)}
          onKeyDown={engine.handleKey}
          onBlur={(event) => {
            onBlur?.(event);
            engine.closeQuery();
          }}
          onCompositionStart={(event) => {
            engine.composing.current = true;
            onCompositionStart?.(event);
          }}
          onCompositionEnd={(event) => {
            onCompositionEnd?.(event);
            queueMicrotask(() => {
              engine.composing.current = false;
              engine.editor.update(() => undefined);
            });
          }}
          {...clipboard}
        />
        {!text && placeholder ? (
          <span aria-hidden="true" className="chayns-rich-text-editor__placeholder">
            {placeholder}
          </span>
        ) : null}
        {status ? (
          <div
            id={statusId}
            className="chayns-rich-text-editor__status"
            role="status"
            aria-atomic="true"
          >
            {status}
          </div>
        ) : null}
        {isOpen
          ? createPortal(
              <div
                aria-label={props['aria-label']}
                aria-labelledby={props['aria-labelledby']}
                className="chayns-rich-text-editor__suggestions"
                id={listId}
                ref={popupRef}
                role="listbox"
              >
                {items.map((item, index) => (
                  <div
                    aria-selected={index === engine.activeIndex}
                    className="chayns-rich-text-editor__option"
                    id={`${listId}-${index}`}
                    key={item.id}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => engine.insertMention(item)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') engine.insertMention(item);
                    }}
                    role="option"
                    tabIndex={-1}
                  >
                    {item.label}
                  </div>
                ))}
              </div>,
              document.body,
            )
          : null}
      </div>
    );
  },
);
RichTextEditor.displayName = 'RichTextEditor';
export default RichTextEditor;
