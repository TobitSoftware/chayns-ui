import {
  $createLineBreakNode,
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $isElementNode,
  $isLineBreakNode,
  $isTextNode,
} from 'lexical';
import type { LexicalNode } from 'lexical';
import type { RichTextDocument, RichTextNode } from '../RichTextEditor.types.js';
import { MentionNode, $createMention } from './MentionNode.js';
import { normalizeDocument } from './document.js';

export function $readDocument(): RichTextDocument {
  const content: RichTextNode[] = [];
  function visit(node: LexicalNode) {
    if (node instanceof MentionNode)
      content.push({ type: 'mention', id: node.__identity, label: node.__label });
    else if ($isTextNode(node)) content.push({ type: 'text', text: node.getTextContent() });
    else if ($isLineBreakNode(node)) content.push({ type: 'lineBreak' });
    else if ($isElementNode(node)) node.getChildren().forEach(visit);
  }
  $getRoot()
    .getChildren()
    .forEach((node, index) => {
      if (index) content.push({ type: 'lineBreak' });
      visit(node);
    });
  return normalizeDocument({ version: 1, content });
}

export function $writeDocument(document: RichTextDocument) {
  const paragraph = $createParagraphNode();
  for (const node of document.content) {
    if (node.type === 'text') paragraph.append($createTextNode(node.text));
    else if (node.type === 'lineBreak') paragraph.append($createLineBreakNode());
    else paragraph.append($createMention(node.id, node.label));
  }
  $getRoot().clear().append(paragraph);
}
