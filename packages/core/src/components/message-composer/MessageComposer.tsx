import { forwardRef, useId, useMemo, useRef } from 'react';
import { composeNativeRefs } from '../../utils/native-ref.js';
import RichTextEditor from '../rich-text-editor/RichTextEditor.js';
import type { RichTextEditorCommands } from '../rich-text-editor/RichTextEditor.types.js';
import { EditorCaptureContext } from '../rich-text-editor/hooks/EditorCaptureContext.js';
import { documentText } from '../rich-text-editor/utils/document.js';
import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import type { MessageComposerProps } from './MessageComposer.types.js';
import { useComposerMenu } from './hooks/useComposerMenu.js';
import { useComposerCapture } from './hooks/useComposerCapture.js';
import { useComposerLayout } from './hooks/useComposerLayout.js';
import { useComposerMotion } from './hooks/useComposerMotion.js';
import { useRemovedActionFocus } from './hooks/useRemovedActionFocus.js';
import {
  ComposerSnippets,
  ComposerAttachments,
  ComposerPrompts,
} from './components/ComposerItems.js';
import ComposerSelector from './components/ComposerSelector.js';
import ComposerControls from './components/ComposerControls.js';
import ComposerMenu from './components/ComposerMenu.js';
import { captureStatus } from './components/CaptureActions.js';
import { validateComposer } from './utils.js';

const MessageComposer = forwardRef<HTMLDivElement, MessageComposerProps>(
  function MessageComposer(props, ref) {
    const {
      layout,
      labels,
      rootProps,
      attachments = [],
      onAttachmentRemove,
      actions = [],
      onAction,
      prompts = [],
      onPrompt,
      snippets = [],
      selector,
      pending = false,
      allowAttachmentOnly = false,
      error,
      dictation,
      voice,
      onCaptureError,
      commandsRef,
      onSubmit,
      readOnly,
      disabled,
      value,
      className,
      'aria-describedby': describedBy,
      ...editorProps
    } = props;
    const root = useRef<HTMLDivElement>(null);
    const editor = useRef<HTMLDivElement>(null);
    const commands = useRef<RichTextEditorCommands>(null);
    const voiceStart = useRef<HTMLButtonElement>(null);
    const generatedId = useId();
    const focusEditor = () => commands.current?.focus();
    const capture = useComposerCapture(
      { ...props, ...(onCaptureError ? { onCaptureError } : {}) },
      focusEditor,
      () => (voiceStart.current ? voiceStart.current.focus() : focusEditor()),
      editor,
    );
    const expanded = useComposerLayout(root, editor, layout === 'oneLine');
    useComposerMotion(root, capture.isActive);
    const preserveRemovedFocus = useRemovedActionFocus(root, focusEditor);
    const isLocked = !!disabled || !!readOnly || capture.isActive;
    const { menu, setMenu, openMenu, menuKeys } = useComposerMenu(isLocked);
    const hasText = !!documentText(value).trim();
    const canSend = hasText || (allowAttachmentOnly && attachments.length > 0);
    const canSubmit = canSend && !isLocked && !pending;
    const status = captureStatus(capture, labels, voice);
    const captureError = capture.error ? labels.captureError(capture.error) : undefined;
    const visibleError = error ?? voice?.error ?? captureError;
    const statusId = `${generatedId}-status`;
    const errorId = `${generatedId}-error`;
    const editorRef = useMemo(() => composeNativeRefs(editor, ref), [ref]);
    const commandRef = useMemo(() => composeNativeRefs(commands, commandsRef), [commandsRef]);
    const rootRef = useMemo(() => composeNativeRefs(root, rootProps?.ref), [rootProps?.ref]);
    const selectorEmpty =
      !selector?.groups.some((group) => group.items.some((item) => !item.disabled)) &&
      !selector?.action;

    validateComposer(props);

    function submit() {
      if (canSubmit) onSubmit?.();
    }
    const editorElement = (
      <RichTextEditor
        {...editorProps}
        aria-describedby={
          [describedBy, status ? statusId : undefined, visibleError ? errorId : undefined]
            .filter(Boolean)
            .join(' ') || undefined
        }
        className={className}
        commandsRef={commandRef}
        disabled={!!disabled}
        key="editor"
        onSubmit={submit}
        readOnly={!!readOnly || capture.isActive}
        ref={editorRef}
        value={value}
      />
    );
    const isDictating = capture.dictationState !== 'idle';
    const addElement =
      actions.length || isDictating ? (
        <button
          aria-expanded={isDictating ? undefined : menu?.kind === 'add'}
          aria-haspopup={isDictating ? undefined : 'menu'}
          aria-label={isDictating ? labels.cancelDictation : labels.add}
          className={[
            'chayns-message-composer__add',
            isDictating ? 'chayns-message-composer__add--cancel' : '',
          ]
            .filter(Boolean)
            .join(' ')}
          disabled={isLocked && !isDictating}
          key="add"
          onClick={(event) => {
            if (isDictating) capture.cancelDictation();
            else openMenu('add', event.currentTarget);
          }}
          onKeyDown={isDictating ? undefined : (event) => menuKeys('add', event)}
          type="button"
        >
          <ButtonIcon icon="fa-plus" />
        </button>
      ) : null;

    return (
      <EditorCaptureContext.Provider value={capture.expectedValue}>
        <div
          {...rootProps}
          className={[
            'chayns-message-composer',
            `chayns-message-composer--${layout === 'oneLine' ? 'one-line' : 'two-line'}`,
            expanded ? 'chayns-message-composer--expanded' : '',
            rootProps?.className,
          ]
            .filter(Boolean)
            .join(' ')}
          ref={rootRef}
        >
          <ComposerSnippets
            items={snippets}
            isLocked={isLocked}
            insertText={(text) => commands.current?.insertText(text)}
          />
          <div className="chayns-message-composer__surface">
            <ComposerAttachments
              items={attachments}
              isLocked={isLocked}
              onRemove={onAttachmentRemove}
              preserveRemovedFocus={preserveRemovedFocus}
            />
            <div
              className="chayns-message-composer__row"
              data-can-send={canSend && !capture.isActive ? true : undefined}
            >
              {layout === 'oneLine' && !expanded
                ? [addElement, editorElement]
                : [editorElement, addElement]}
              <ComposerPrompts
                prompts={prompts}
                isLocked={isLocked}
                pending={pending}
                onPrompt={onPrompt}
                preserveRemovedFocus={preserveRemovedFocus}
              />
              <ComposerSelector
                selector={selector}
                labels={labels}
                isOpen={menu?.kind === 'selector'}
                isLocked={isLocked}
                isEmpty={selectorEmpty}
                onOpen={(trigger) => openMenu('selector', trigger)}
                onKeyDown={(event) => menuKeys('selector', event)}
              />
              <ComposerControls
                capture={capture}
                labels={labels}
                voice={voice}
                dictation={dictation}
                canSend={canSend}
                canSubmit={canSubmit}
                isLocked={isLocked}
                pending={pending}
                submit={submit}
                voiceStart={voiceStart}
              />
            </div>
            <div
              aria-atomic="true"
              className={isDictating ? 'chayns-message-composer__dictation-status' : undefined}
              id={statusId}
              role="status"
            >
              {status}
            </div>
            <div
              aria-atomic="true"
              className="chayns-message-composer__error"
              id={errorId}
              role="status"
            >
              {visibleError}
            </div>
          </div>
          {menu && !isLocked ? (
            <ComposerMenu
              actions={menu.kind === 'add' ? actions : selector?.action ? [selector.action] : []}
              alignEnd={menu.kind === 'selector'}
              groups={menu.kind === 'selector' ? selector?.groups : undefined}
              initialLast={menu.last}
              label={menu.kind === 'add' ? labels.add : labels.selector}
              onAction={(id) => {
                if (menu.kind === 'add') onAction?.(id);
                else selector?.onAction?.(id);
              }}
              onClose={() => setMenu(null)}
              onSelect={(id) => selector?.onSelect(id)}
              selectedId={selector?.selectedItem.id}
              trigger={menu.trigger}
            />
          ) : null}
        </div>
      </EditorCaptureContext.Provider>
    );
  },
);
MessageComposer.displayName = 'MessageComposer';
export default MessageComposer;
