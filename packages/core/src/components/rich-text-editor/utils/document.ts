import type { RichTextDocument, RichTextNode } from '../RichTextEditor.types.js';

/** Validates, detaches and normalizes the public engine-independent document. */
export function normalizeDocument(input: unknown): RichTextDocument {
  const value = input as { version?: unknown; content?: unknown } | null;
  if (value?.version !== 1 || !Array.isArray(value.content)) {
    throw new TypeError('RichTextEditor requires a version 1 document.');
  }

  const content: RichTextNode[] = [];
  function appendText(text: string) {
    if (!text) return;
    const previous = content.at(-1);
    if (previous?.type === 'text')
      content[content.length - 1] = { type: 'text', text: previous.text + text };
    else content.push({ type: 'text', text });
  }

  const nodes: readonly unknown[] = value.content;
  for (const item of nodes) {
    const node = item as { type?: unknown; text?: unknown; id?: unknown; label?: unknown } | null;
    if (!node || typeof node !== 'object') throw new TypeError('Invalid rich-text node.');
    if (node.type === 'text' && typeof node.text === 'string') {
      node.text
        .replace(/\r\n?/g, '\n')
        .split('\n')
        .forEach((text: string, index: number) => {
          if (index) content.push({ type: 'lineBreak' });
          appendText(text);
        });
    } else if (node.type === 'lineBreak') content.push({ type: 'lineBreak' });
    else if (
      node.type === 'mention' &&
      typeof node.id === 'string' &&
      node.id &&
      typeof node.label === 'string' &&
      node.label
    ) {
      content.push({ type: 'mention', id: node.id, label: node.label });
    } else throw new TypeError('Invalid rich-text node, mention identity or label.');
  }

  return { version: 1, content };
}

export function documentText(value: RichTextDocument): string {
  return value.content
    .map((node) => {
      if (node.type === 'lineBreak') return '\n';
      return node.type === 'mention' ? `@${node.label}` : node.text;
    })
    .join('');
}

export function textDocument(text: string): RichTextDocument {
  return normalizeDocument({ version: 1, content: [{ type: 'text', text }] });
}
