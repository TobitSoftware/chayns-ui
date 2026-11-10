import type { Editor } from '@tiptap/core';
import type * as React from 'react';

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
  readonly icon?: string;
  readonly shortcut?: MarkdownEditorShortcut;
  readonly onClick: (editor: Editor) => void;
  readonly isActive?: (editor: Editor) => boolean;
  readonly isDisabled?: (editor: Editor) => boolean;
}

export type MarkdownEditorToolbarItem = MarkdownEditorToolbarButtonItem;

export interface MarkdownEditorRef {
  getHTML(): string;
  focus(): void;
}

export interface MarkdownEditorLinkRequest {
  readonly href: string | null;
  readonly text: string;
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
  onRequestLink?: (request: MarkdownEditorLinkRequest) => string | null | Promise<string | null>;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
}
