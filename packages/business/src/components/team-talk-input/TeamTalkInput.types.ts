import type { ChangeEvent, ComponentPropsWithRef, KeyboardEvent } from 'react';
import type { ButtonProps, IconButtonProps } from '@chayns-ui/core';

/** A participant supplied and updated by the consuming application. */
export interface TeamTalkMember {
  readonly id: string;
  readonly name: string;
  readonly avatarSrc?: string;
}

export type TeamTalkSendPayload =
  | { readonly type: 'message'; readonly text: string }
  | { readonly type: 'agree'; readonly text: '' };

export interface TeamTalkPerson extends TeamTalkMember {
  /** Optional localized/display-ready secondary line; no email semantics are assumed. */
  readonly description?: string;
}

export interface TeamTalkInputLabels {
  /** Accessible name of the multiline composer. */
  readonly input: string;
  /** Visible placeholder shown in the empty composer. */
  readonly placeholder: string;
  /** Accessible name for the agree action. */
  readonly agree: string;
  /** Accessible name for the send action. */
  readonly send: string;
  /** Accessible name for the add-person popup trigger and popup. */
  readonly addPerson: string;
  /** Accessible name of the person search input. */
  readonly peopleSearch: string;
  /** Placeholder for the person search input. */
  readonly peopleSearchPlaceholder: string;
  /** Visible loading status while the consumer resolves search results. */
  readonly peopleLoading: string;
  /** Visible empty-results status. */
  readonly peopleNoResults: string;
  /** Localized count for the temporary selection in the footer. */
  readonly peopleSelectionCount: (count: number) => string;
  /** Visible apply action label. */
  readonly peopleApply: string;
  /** Accessible name for the leave action. */
  readonly leave: string;
  /** Accessible name for the participant group. */
  readonly participants: (names: readonly string[]) => string;
}

type NativeTextareaProps = Omit<
  ComponentPropsWithRef<'textarea'>,
  'aria-label' | 'aria-labelledby' | 'defaultValue' | 'disabled' | 'placeholder' | 'rows' | 'value'
> & {
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
};

type NativeIconButtonProps = Omit<
  IconButtonProps,
  'aria-label' | 'aria-labelledby' | 'children' | 'icon' | 'loading' | 'type' | 'variant'
>;

export interface TeamTalkInputProps extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  /** Controlled draft text for the multiline composer. */
  value: string;
  /** Reports every native textarea change. The consumer owns the updated value. */
  onValueChange: (value: string) => void;
  /** All visible/accessibility text is supplied already localized. */
  labels: TeamTalkInputLabels;
  /** Current participants, in the order that should be displayed. */
  members: readonly TeamTalkMember[];
  /** Reports a message or agree action. The component does not clear the draft. */
  onSend: (payload: TeamTalkSendPayload) => void;
  /** When true, an empty draft can be sent as an agree action. */
  allowAgree?: boolean;
  /** Called immediately when the optional leave action is activated. */
  onLeave?: () => void;
  /** Externally filtered people available for temporary selection in the Add popup. */
  peopleSuggestions: readonly TeamTalkPerson[];
  /** Controlled search query sent to the consumer, which owns filtering and retrieval. */
  peopleQuery: string;
  /** Reports changes to the externally controlled search query. */
  onPeopleQueryChange: (query: string) => void;
  /** Consumer-owned search loading state. */
  peopleLoading?: boolean;
  /** Reports only the people selected during this popup session when Apply is activated. */
  onAddPeople: (people: readonly TeamTalkPerson[]) => void;
  /** Shared disabled state for the composer and leave action; also disables Add. */
  disabled?: boolean;
  /** Native textarea props/ref target the composer. Enter submits; Shift+Enter inserts a line break. */
  textareaProps?: NativeTextareaProps;
  /** Compatible native button props for the Add popup trigger. */
  addButtonProps?: NativeIconButtonProps;
  /** Compatible native button props for Apply (e.g. id, title, className, ref). */
  applyButtonProps?: Omit<
    ButtonProps,
    'children' | 'disabled' | 'icon' | 'loading' | 'type' | 'variant'
  >;
  /** Compatible native button props for Leave; component owns name, icon, type, variant and disabled. */
  leaveButtonProps?: NativeIconButtonProps;
}
