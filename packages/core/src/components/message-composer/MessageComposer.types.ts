import type * as React from 'react';
import type { ButtonIcon } from '../button/Button.types.js';
import type { RichTextEditorProps } from '../rich-text-editor/RichTextEditor.types.js';

export enum MessageComposerLayouts {
  OneLine = 'oneLine',
  TwoLine = 'twoLine',
}
export type MessageComposerLayout = 'oneLine' | 'twoLine';
export interface ComposerAction {
  readonly id: string;
  readonly label: string;
  readonly icon?: ButtonIcon;
  readonly disabled?: boolean;
}
export interface ComposerSnippet {
  readonly id: string;
  readonly label: string;
  readonly text: string;
  readonly disabled?: boolean;
}
export interface ComposerAttachment {
  readonly id: string;
  readonly content: React.ReactNode;
  readonly removeLabel: string;
  readonly disabled?: boolean;
}
export interface ComposerSelectionItem {
  readonly id: string;
  readonly label: string;
  readonly shortLabel: string;
  readonly description?: string;
  readonly avatarSrc?: string;
  readonly icon?: ButtonIcon;
  readonly disabled?: boolean;
}
export interface ComposerSelectionGroup {
  readonly id: string;
  readonly label?: string;
  readonly items: readonly ComposerSelectionItem[];
}
export interface ComposerSelector {
  readonly selectedItem: ComposerSelectionItem;
  readonly groups: readonly ComposerSelectionGroup[];
  readonly onSelect: (id: string) => void;
  readonly action?: ComposerAction;
  readonly onAction?: (id: string) => void;
}
export interface MessageComposerProps extends RichTextEditorProps {
  layout: MessageComposerLayout;
  labels: ComposerLabels;
  rootProps?: Omit<React.ComponentPropsWithRef<'div'>, 'children' | 'dangerouslySetInnerHTML'>;
  attachments?: readonly ComposerAttachment[];
  onAttachmentRemove?: (id: string) => void;
  actions?: readonly ComposerAction[];
  onAction?: (id: string) => void;
  prompts?: readonly ComposerAction[];
  onPrompt?: (id: string) => void;
  snippets?: readonly ComposerSnippet[];
  selector?: ComposerSelector;
  pending?: boolean;
  allowAttachmentOnly?: boolean;
  error?: string;
  /** Native dictation is enabled when supported; disabled hides its start action. */
  dictation?: DictationOptions;
  /** Voice is offered only with onStream; connection/transport stay with the consumer. */
  voice?: VoiceOptions;
  onCaptureError?: (error: ComposerCaptureError) => void;
}

export enum ComposerVoiceStates {
  Idle = 'idle',
  Connecting = 'connecting',
  Connected = 'connected',
  Error = 'error',
}
export type ComposerVoiceState = 'idle' | 'connecting' | 'connected' | 'error';
export interface DictationOptions {
  /** Overrides inherited HTML lang / browser language for the next session. */
  readonly language?: string;
  readonly disabled?: boolean;
}
export interface VoiceOptions {
  readonly disabled?: boolean;
  readonly state?: ComposerVoiceState;
  readonly onStream: (stream: MediaStream) => void;
  readonly onEnd?: () => void;
  readonly error?: string;
}
export enum ComposerCaptureSources {
  Dictation = 'dictation',
  Voice = 'voice',
}
export interface ComposerCaptureError {
  readonly source: 'dictation' | 'voice';
  readonly code: string;
}

export interface ComposerLabels {
  readonly add: string;
  readonly selector: string;
  readonly send: string;
  readonly startDictation: string;
  readonly pauseDictation: string;
  readonly resumeDictation: string;
  readonly endDictation: string;
  readonly cancelDictation: string;
  readonly dictationStarting: string;
  readonly dictationListening: string;
  readonly dictationPausing: string;
  readonly dictationPaused: string;
  readonly dictationEnding: string;
  readonly startVoice: string;
  readonly endVoice: string;
  readonly muteVoice: string;
  readonly unmuteVoice: string;
  readonly voiceRequesting: string;
  readonly voiceConnecting: string;
  readonly voiceConnected: string;
  readonly captureError: (error: ComposerCaptureError) => string;
}
