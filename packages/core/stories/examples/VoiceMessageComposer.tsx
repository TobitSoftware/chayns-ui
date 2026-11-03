import { useState } from 'react';
import { MessageComposer } from '@chayns-ui/core';
import type { ComposerVoiceState, RichTextDocument } from '@chayns-ui/core';
import { composerLabels } from './ComposerLabels.js';

function VoiceMessageComposer() {
  const [value, setValue] = useState<RichTextDocument>({ version: 1, content: [] });
  const [state, setState] = useState<ComposerVoiceState>('idle');
  return (
    <MessageComposer
      aria-label="Nachrichtenentwurf"
      layout="twoLine"
      labels={composerLabels}
      value={value}
      onValueChange={setValue}
      voice={{ state, onStream: () => setState('connected'), onEnd: () => setState('idle') }}
    />
  );
}
VoiceMessageComposer.displayName = 'VoiceMessageComposer';
export default VoiceMessageComposer;
