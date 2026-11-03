import type { MessageComposerProps } from './MessageComposer.types.js';

function unique(items: readonly { readonly id: string }[], name: string) {
  const ids = new Set<string>();
  for (const item of items) {
    if (typeof item.id !== 'string' || !item.id || ids.has(item.id))
      throw new Error(`${name} requires unique nonempty IDs.`);
    ids.add(item.id);
  }
}

export function validateComposer(props: MessageComposerProps) {
  const { actions = [], prompts = [], attachments = [], snippets = [], selector } = props;
  unique(actions, 'Composer actions');
  unique(prompts, 'Composer prompts');
  unique(attachments, 'Composer attachments');
  unique(snippets, 'Composer snippets');
  if (
    (actions.length && !props.onAction) ||
    (prompts.length && !props.onPrompt) ||
    (attachments.length && !props.onAttachmentRemove)
  )
    throw new Error('Composer interactive collections require callbacks.');
  if (selector) {
    unique(selector.groups, 'Composer groups');
    unique(
      selector.groups.flatMap((group) => group.items),
      'Composer selection',
    );
    if (selector.action && !selector.onAction)
      throw new Error('Composer selector action requires onAction.');
  }
  if (props.dictation?.language !== undefined && !props.dictation.language.trim())
    throw new Error('An explicit dictation language must not be empty.');
}
