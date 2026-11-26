import type { Editor } from '@tiptap/core';
import type * as React from 'react';
type ButtonIcon = `fa-${string}` | `fab fa-${string}` | `ts-${string}`;

export interface MarkdownEditorShortcut {
  readonly key: string;
  readonly ctrlKey?: boolean;
  readonly metaKey?: boolean;
  readonly shiftKey?: boolean;
  readonly altKey?: boolean;
}

export interface MarkdownEditorToolbarButtonItem {
  readonly type: 'button';
  readonly id: string;
  readonly label: string;
  readonly icon?: ButtonIcon;
  readonly shortcut?: MarkdownEditorShortcut;
  readonly onClick: (editor: Editor) => void;
  readonly isActive?: (editor: Editor) => boolean;
  readonly isDisabled?: (editor: Editor) => boolean;
}

export type MarkdownEditorToolbarItem = MarkdownEditorToolbarButtonItem;

export interface MarkdownEditorLinkLabels {
  readonly text: string;
  readonly url: string;
  readonly cancel: string;
  readonly save: string;
  readonly remove: string;
  readonly invalidUrl: string;
}

export interface MarkdownEditorRef {
  getHTML(): string;
  focus(): void;
}

export interface MarkdownEditorProps extends Omit<
  React.ComponentPropsWithoutRef<'div'>,
  'children' | 'onChange' | 'role' | 'aria-label' | 'aria-labelledby'
> {
  'aria-label'?: string;
  'aria-labelledby'?: string;
  value: string;
  onValueChange: (value: string) => void;
  items?: readonly MarkdownEditorToolbarItem[];
  linkLabels?: MarkdownEditorLinkLabels;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
}
