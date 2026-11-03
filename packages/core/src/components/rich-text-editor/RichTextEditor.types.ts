import type * as React from 'react';

export enum RichTextNodeTypes {
  Text = 'text',
  LineBreak = 'lineBreak',
  Mention = 'mention',
}
export type RichTextNode =
  | { readonly type: 'text'; readonly text: string }
  | { readonly type: 'lineBreak' }
  | { readonly type: 'mention'; readonly id: string; readonly label: string };
export interface RichTextDocument {
  readonly version: 1;
  readonly content: readonly RichTextNode[];
}
export interface MentionItem {
  readonly id: string;
  readonly label: string;
}
export interface MentionQuery {
  readonly id: string;
  readonly text: string;
}
export interface MentionResults {
  readonly queryId: string;
  readonly items: readonly MentionItem[];
  readonly isLoading?: boolean;
  readonly error?: string;
}
export interface RichTextEditorCommands {
  focus(): void;
  insertText(text: string): void;
  clearHistory(): void;
}

export interface RichTextEditorProps extends Omit<
  React.ComponentPropsWithRef<'div'>,
  | 'children'
  | 'dangerouslySetInnerHTML'
  | 'contentEditable'
  | 'defaultValue'
  | 'onChange'
  | 'onSubmit'
  | 'role'
  | 'aria-multiline'
  | 'aria-readonly'
  | 'aria-disabled'
  | 'aria-autocomplete'
  | 'aria-controls'
  | 'aria-activedescendant'
> {
  value: RichTextDocument;
  onValueChange: (value: RichTextDocument) => void;
  onSubmit?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  commandsRef?: React.Ref<RichTextEditorCommands>;
  onMentionQueryChange?: (query: MentionQuery | null) => void;
  mentionResults?: MentionResults;
  mentionStatusText?: string;
}
