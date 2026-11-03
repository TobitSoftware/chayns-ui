import { SideKickInput, SideKickSelectionKinds } from '../../index.js';
import type { SideKickInputProps, SideKickSelection } from '../../index.js';
const selection: SideKickSelection = { kind: SideKickSelectionKinds.Agent, id: 'support' };
declare const props: SideKickInputProps;
<SideKickInput
  {...props}
  onSend={(draft) => {
    const id: string | undefined = draft.attachmentIds[0];
    const version: 1 = draft.document.version;
    void id;
    void version;
  }}
/>;
// @ts-expect-error Business selection is configured through agentSelector.
<SideKickInput {...props} selector={{}} />;
// @ts-expect-error Submit is owned by the optimistic dispatch contract.
<SideKickInput {...props} onSubmit={() => undefined} />;
// @ts-expect-error Agent selections require an identity.
const missingIdentity: SideKickSelection = { kind: SideKickSelectionKinds.Agent };
void selection;
void missingIdentity;
