import type {
  ButtonIcon,
  ComposerAction,
  MessageComposerProps,
  RichTextDocument,
} from '@chayns-ui/core';

export enum SideKickSelectionKinds {
  Automatic = 'automatic',
  Agent = 'agent',
  Model = 'model',
}
export type SideKickSelection =
  { readonly kind: 'automatic' } | { readonly kind: 'agent' | 'model'; readonly id: string };
export interface SideKickIdentity {
  readonly id: string;
  readonly label: string;
  readonly shortLabel: string;
  readonly description?: string;
  readonly avatarSrc?: string;
  readonly icon?: ButtonIcon;
  readonly disabled?: boolean;
}
export interface SideKickDraft {
  readonly document: RichTextDocument;
  readonly attachmentIds: readonly string[];
  readonly selection: SideKickSelection;
}
export interface SideKickAgentSelector {
  readonly value: SideKickSelection;
  readonly selectedIdentity?: SideKickIdentity;
  readonly automatic: Omit<SideKickIdentity, 'id'>;
  readonly recentAgents: readonly SideKickIdentity[];
  readonly recentModels: readonly SideKickIdentity[];
  readonly recentAgentsLabel: string;
  readonly recentModelsLabel: string;
  readonly onValueChange: (value: SideKickSelection) => void;
  readonly allAction?: ComposerAction;
  readonly onAllAction?: () => void;
}
export interface SideKickInputProps extends Omit<MessageComposerProps, 'selector' | 'onSubmit'> {
  agentSelector?: SideKickAgentSelector;
  onSend: (draft: SideKickDraft) => void;
}
