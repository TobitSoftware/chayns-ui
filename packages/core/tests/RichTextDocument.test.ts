import { describe, expect, it } from 'vitest';
import { createEditor } from 'lexical';
import { $readDocument, $writeDocument } from '../src/components/rich-text-editor/utils/adapter.js';
import {
  normalizeDocument,
  documentText,
  textDocument,
} from '../src/components/rich-text-editor/utils/document.js';
import { MentionNode } from '../src/components/rich-text-editor/utils/MentionNode.js';

describe('engine-independent rich-text documents', () => {
  it('normalizes line endings, merges text and preserves meaningful whitespace and opaque identities', () => {
    const value = normalizeDocument({
      version: 1,
      content: [
        { type: 'text', text: '  a\r\nb\rc\n' },
        { type: 'text', text: '' },
        { type: 'mention', id: '<id>', label: '<script>' },
        { type: 'text', text: ' ' },
        { type: 'text', text: 'end  ' },
      ],
    });
    expect(documentText(value)).toBe('  a\nb\nc\n@<script> end  ');
    expect(value.content.at(-1)).toEqual({ type: 'text', text: ' end  ' });
    expect(textDocument('')).toEqual({ version: 1, content: [] });
  });
  it.each([
    null,
    {},
    { version: 2, content: [] },
    { version: 1, content: null },
    { version: 1, content: [null] },
    { version: 1, content: [{ type: 'html', text: '<b>unsafe</b>' }] },
    { version: 1, content: [{ type: 'text', text: 3 }] },
    { version: 1, content: [{ type: 'mention', id: '', label: 'Label' }] },
    { version: 1, content: [{ type: 'mention', id: 'id', label: '' }] },
  ])('rejects invalid runtime input %j', (value) => {
    expect(() => normalizeDocument(value)).toThrow(TypeError);
  });
  it('round trips supported content through the actual engine without leaking engine state', () => {
    const editor = createEditor({
      namespace: 'adapter-test',
      nodes: [MentionNode],
      onError(error) {
        throw error;
      },
    });
    const document = normalizeDocument({
      version: 1,
      content: [
        { type: 'text', text: 'Hello\n' },
        { type: 'mention', id: 'agent', label: 'Support' },
        { type: 'mention', id: 'agent', label: 'Support' },
        { type: 'lineBreak' },
      ],
    });
    editor.update(() => $writeDocument(document), { discrete: true });
    expect(editor.getEditorState().read($readDocument)).toEqual(document);
    const serialized = editor.getEditorState().toJSON();
    editor.setEditorState(editor.parseEditorState(serialized));
    expect(editor.getEditorState().read($readDocument)).toEqual(document);
  });
});
