import { TextNode, $applyNodeReplacement } from 'lexical';
import type { EditorConfig, NodeKey, SerializedTextNode, Spread } from 'lexical';

type SerializedMention = Spread<{ identity: string; label: string }, SerializedTextNode>;

/** Internal token node. Public documents never expose this engine representation. */
export class MentionNode extends TextNode {
  __identity: string;
  __label: string;

  static override getType() {
    return 'chayns-mention';
  }
  static override clone(node: MentionNode) {
    return new MentionNode(node.__identity, node.__label, node.__key);
  }
  static override importJSON(node: SerializedMention) {
    return $createMention(node.identity, node.label);
  }

  constructor(identity = '', label = '', key?: NodeKey) {
    super(`@${label}`, key);
    this.__identity = identity;
    this.__label = label;
    this.__mode = 1;
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const element = super.createDOM(config);
    element.classList.add('chayns-rich-text-editor__mention');
    element.contentEditable = 'false';
    element.dataset.mentionId = this.__identity;
    return element;
  }

  override exportJSON(): SerializedMention {
    return {
      ...super.exportJSON(),
      type: MentionNode.getType(),
      identity: this.__identity,
      label: this.__label,
    };
  }

  override canInsertTextBefore() {
    return false;
  }
  override canInsertTextAfter() {
    return false;
  }
}

export function $createMention(identity: string, label: string): MentionNode {
  return $applyNodeReplacement(new MentionNode(identity, label));
}
