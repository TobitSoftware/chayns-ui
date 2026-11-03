import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { registerPlainText } from '@lexical/plain-text';
import {
  $getRoot,
  $getSelection,
  $isRangeSelection,
  $isTextNode,
  $setSelection,
  BEFORE_INPUT_COMMAND,
  CLEAR_HISTORY_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  HISTORY_PUSH_TAG,
  HISTORIC_TAG,
  KEY_DOWN_COMMAND,
  SKIP_SELECTION_FOCUS_TAG,
  createEditor,
} from 'lexical';
import type { RangeSelection } from 'lexical';
import type { MentionItem, MentionQuery, RichTextEditorProps } from '../RichTextEditor.types.js';
import { MentionNode, $createMention } from '../utils/MentionNode.js';
import { $readDocument, $writeDocument } from '../utils/adapter.js';
import { normalizeDocument } from '../utils/document.js';
import { useBeforeInput } from './useBeforeInput.js';
import { EditorCaptureContext } from './EditorCaptureContext.js';

const HISTORY_DELAY = 300;
interface ActiveQuery extends MentionQuery {
  key: string;
  start: number;
  end: number;
}

export function useRichTextEngine(props: RichTextEditorProps) {
  const capture = useContext(EditorCaptureContext);
  const latest = useRef(props);
  useLayoutEffect(() => {
    latest.current = props;
  });
  const elementRef = useRef<HTMLDivElement>(null);
  useBeforeInput(elementRef, props);
  const savedSelection = useRef<RangeSelection | null>(null);
  const lastValue = useRef(JSON.stringify(normalizeDocument(props.value)));
  const activeQuery = useRef<ActiveQuery | null>(null);
  const queryCounter = useRef(0);
  const composing = useRef(false);
  const suppressQuery = useRef<string | null>(null);
  const [query, setQuery] = useState<MentionQuery | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [editor] = useState(() =>
    createEditor({
      namespace: 'chayns-rich-text-editor',
      nodes: [MentionNode],
      onError(error) {
        throw error;
      },
    }),
  );
  const historyRef = useRef(createEmptyHistoryState());
  const replaying = useRef(false);
  const captureStarted = useRef(false);

  function closeQuery() {
    if (!activeQuery.current) return;
    suppressQuery.current = `${activeQuery.current.key}:${activeQuery.current.start}:${activeQuery.current.end}`;
    activeQuery.current = null;
    setQuery(null);
    setActiveIndex(-1);
    latest.current.onMentionQueryChange?.(null);
  }

  function insertMention(item: MentionItem) {
    const current = activeQuery.current;
    if (!current || composing.current || latest.current.readOnly || latest.current.disabled) return;
    editor.update(
      () => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection)) return;
        const node = selection.anchor.getNode();
        if (!$isTextNode(node) || node.getKey() !== current.key) return;
        selection.setTextNodeRange(node, current.start, node, current.end);
        const following = node.getTextContent().slice(current.end);
        selection.insertNodes([$createMention(item.id, item.label)]);
        if (!/^\s/.test(following)) selection.insertText(' ');
      },
      { tag: HISTORY_PUSH_TAG, discrete: true },
    );
    closeQuery();
    elementRef.current?.focus();
  }

  function insertText(text: string) {
    if (latest.current.readOnly || latest.current.disabled || composing.current) return;
    editor.update(
      () => {
        const saved = savedSelection.current;
        if (saved?.getNodes().every((node) => node.isAttached())) $setSelection(saved.clone());
        else $getRoot().selectEnd();
        const selection = $getSelection();
        if ($isRangeSelection(selection)) selection.insertText(text.replace(/\r\n?/g, '\n'));
      },
      { tag: HISTORY_PUSH_TAG, discrete: true },
    );
    elementRef.current?.focus();
  }

  useEffect(() => {
    editor.setRootElement(elementRef.current);
    const unregisterPlain = registerPlainText(editor);
    const unregisterHistory = registerHistory(editor, historyRef.current, HISTORY_DELAY);
    const unregisterKey = editor.registerCommand(
      KEY_DOWN_COMMAND,
      () => !replaying.current,
      COMMAND_PRIORITY_CRITICAL,
    );
    const unregisterBeforeInput = editor.registerCommand(
      BEFORE_INPUT_COMMAND,
      (event) => event.defaultPrevented,
      COMMAND_PRIORITY_CRITICAL,
    );
    editor.update(() => $writeDocument(normalizeDocument(latest.current.value)), {
      tag: HISTORIC_TAG,
      discrete: true,
    });
    historyRef.current.current = { editor, editorState: editor.getEditorState() };
    const unregisterUpdate = editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) savedSelection.current = selection.clone();
        if (composing.current || editor.isComposing()) return;
        {
          const value = $readDocument();
          const serialized = JSON.stringify(value);
          if (serialized !== lastValue.current) {
            lastValue.current = serialized;
            latest.current.onValueChange(value);
          }
        }
        if (
          latest.current.disabled ||
          latest.current.readOnly ||
          !latest.current.onMentionQueryChange ||
          !$isRangeSelection(selection) ||
          !selection.isCollapsed()
        ) {
          closeQuery();
          return;
        }
        const node = selection.anchor.getNode();
        if (!$isTextNode(node) || node instanceof MentionNode) {
          closeQuery();
          return;
        }
        const before = node.getTextContent().slice(0, selection.anchor.offset);
        const match = /(?:^|\s)@([^\s@]*)$/.exec(before);
        if (!match) {
          suppressQuery.current = null;
          closeQuery();
          return;
        }
        const start = before.length - match[1]!.length - 1;
        const signature = `${node.getKey()}:${start}:${before.length}`;
        if (signature === suppressQuery.current) return;
        const previous = activeQuery.current;
        if (
          previous?.key === node.getKey() &&
          previous.start === start &&
          previous.end === before.length &&
          previous.text === match[1]
        )
          return;
        const next = {
          id: `query-${++queryCounter.current}`,
          text: match[1]!,
          key: node.getKey(),
          start,
          end: before.length,
        };
        activeQuery.current = next;
        setQuery(next);
        setActiveIndex(-1);
        latest.current.onMentionQueryChange(next);
      });
    });
    return () => {
      unregisterUpdate();
      unregisterBeforeInput();
      unregisterKey();
      unregisterHistory();
      unregisterPlain();
      editor.setRootElement(null);
    };
    // The engine and its listeners have one lifecycle; callbacks use current props.
  }, [editor]);

  useEffect(() => {
    const value = normalizeDocument(props.value);
    const serialized = JSON.stringify(value);
    if (serialized === lastValue.current) return;
    const isCapture = capture?.current === serialized;
    lastValue.current = serialized;
    closeQuery();
    editor.update(
      () => {
        const hadSelection = $getSelection() !== null;
        $writeDocument(value);
        if (hadSelection) $getRoot().selectEnd();
        else $setSelection(null);
      },
      {
        tag: [
          isCapture ? (captureStarted.current ? 'history-merge' : HISTORY_PUSH_TAG) : HISTORIC_TAG,
          SKIP_SELECTION_FOCUS_TAG,
        ],
        discrete: true,
      },
    );
    if (isCapture) captureStarted.current = true;
    else {
      editor.dispatchCommand(CLEAR_HISTORY_COMMAND, undefined);
      historyRef.current.current = { editor, editorState: editor.getEditorState() };
    }
  }, [editor, props.value, capture]);

  useEffect(() => {
    editor.setEditable(!props.disabled && !props.readOnly);
    if (!props.readOnly) captureStarted.current = false;
    if (props.disabled || props.readOnly) closeQuery();
  }, [editor, props.disabled, props.readOnly]);

  function handleKey(event: React.KeyboardEvent<HTMLDivElement>) {
    latest.current.onKeyDown?.(event);
    if (
      event.defaultPrevented ||
      composing.current ||
      event.nativeEvent.isComposing ||
      event.keyCode === 229
    )
      return;
    const results = latest.current.mentionResults;
    const items =
      results && results.queryId === query?.id && !results.isLoading && !results.error
        ? results.items
        : [];
    if (query && (event.key === 'ArrowDown' || event.key === 'ArrowUp') && items.length) {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex((index) =>
        index < 0
          ? direction === 1
            ? 0
            : items.length - 1
          : (index + direction + items.length) % items.length,
      );
      return;
    }
    if (query && (event.key === 'Escape' || event.key === 'Tab')) {
      if (event.key === 'Escape') event.preventDefault();
      closeQuery();
      return;
    }
    if (latest.current.readOnly || latest.current.disabled) return;
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!event.shiftKey && items[activeIndex]) insertMention(items[activeIndex]);
      else if (!event.shiftKey && latest.current.onSubmit) latest.current.onSubmit();
      else
        editor.update(
          () => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) selection.insertLineBreak();
          },
          { discrete: true },
        );
      return;
    }
    replaying.current = true;
    try {
      editor.dispatchCommand(KEY_DOWN_COMMAND, event.nativeEvent);
    } finally {
      replaying.current = false;
    }
  }

  return {
    editor,
    elementRef,
    query,
    activeIndex,
    composing,
    insertText,
    insertMention,
    closeQuery,
    handleKey,
  };
}
