import { forwardRef, useMemo, useRef, useLayoutEffect } from 'react';
import { MessageComposer } from '@chayns-ui/core';
import type {
  ComposerSelectionItem,
  ComposerSelector,
  RichTextEditorCommands,
} from '@chayns-ui/core';
import type {
  SideKickInputProps,
  SideKickSelection,
  SideKickAgentSelector,
} from './SideKickInput.types.js';

function selectorData(selector: SideKickAgentSelector): ComposerSelector {
  const encode = (kind: string, id = '') => JSON.stringify([kind, id]);
  const automatic: ComposerSelectionItem = { ...selector.automatic, id: encode('automatic') };
  if (selector.value.kind !== 'automatic' && selector.selectedIdentity?.id !== selector.value.id)
    throw new Error('SideKickInput requires the selected identity for a nonautomatic selection.');
  const selectedItem =
    selector.value.kind === 'automatic'
      ? automatic
      : { ...selector.selectedIdentity!, id: encode(selector.value.kind, selector.value.id) };
  const groups = [
    { id: 'automatic', items: [automatic] },
    {
      id: 'agents',
      label: selector.recentAgentsLabel,
      items: selector.recentAgents.map((item) => ({ ...item, id: encode('agent', item.id) })),
    },
    {
      id: 'models',
      label: selector.recentModelsLabel,
      items: selector.recentModels.map((item) => ({ ...item, id: encode('model', item.id) })),
    },
  ];
  return {
    selectedItem,
    groups,
    onSelect(id) {
      const [kind, identity] = JSON.parse(id) as [SideKickSelection['kind'], string];
      selector.onValueChange(kind === 'automatic' ? { kind } : { kind, id: identity });
    },
    ...(selector.allAction
      ? { action: selector.allAction, onAction: () => selector.onAllAction?.() }
      : {}),
  };
}

const SideKickInput = forwardRef<HTMLDivElement, SideKickInputProps>(function SideKickInput(
  { agentSelector, onSend, commandsRef, ...props },
  ref,
) {
  const commands = useRef<RichTextEditorCommands | null>(null);
  const latched = useRef<string | null>(null);
  const submittedValue = useRef(props.value);
  const revision = JSON.stringify(props.value);
  const mapped = useMemo(
    () => (agentSelector ? selectorData(agentSelector) : undefined),
    [agentSelector],
  );
  useLayoutEffect(() => {
    const isEmpty = props.value.content.length === 0;
    if (latched.current !== revision || (isEmpty && submittedValue.current !== props.value))
      latched.current = null;
  }, [revision, props.value]);
  if (agentSelector?.allAction && !agentSelector.onAllAction)
    throw new Error('SideKickInput allAction requires onAllAction.');

  function handleSubmit() {
    if (props.disabled || props.readOnly || props.pending || latched.current === revision) return;
    latched.current = revision;
    submittedValue.current = props.value;
    const active = typeof document === 'undefined' ? null : document.activeElement;
    const snapshot = {
      document: { version: 1 as const, content: props.value.content.map((node) => ({ ...node })) },
      attachmentIds: (props.attachments ?? []).map((item) => item.id),
      selection: { ...(agentSelector?.value ?? { kind: 'automatic' as const }) },
    };
    try {
      onSend(snapshot);
    } catch (error) {
      latched.current = null;
      throw error;
    }
    props.onValueChange({ version: 1, content: [] });
    commands.current?.clearHistory();
    if (active && document.activeElement === active && active.closest('.chayns-message-composer'))
      commands.current?.focus();
  }

  return (
    <MessageComposer
      {...props}
      {...(mapped ? { selector: mapped } : {})}
      commandsRef={(handle) => {
        commands.current = handle;
        if (typeof commandsRef === 'function') return commandsRef(handle);
        if (commandsRef) commandsRef.current = handle;
      }}
      onSubmit={handleSubmit}
      ref={ref}
    />
  );
});
SideKickInput.displayName = 'SideKickInput';
export default SideKickInput;
