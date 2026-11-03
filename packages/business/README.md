# @chayns-ui/business

SideKickInput composes Core MessageComposer with externally controlled agent/model selection and optimistic message dispatch. It has no service SDK, CSS or additional runtime dependency. Core and React are peers; React 18 and 19 are supported.

```tsx
import { useState } from 'react';
import { SideKickInput, type SideKickDraft } from '@chayns-ui/business';
import type { ComposerLabels, RichTextDocument } from '@chayns-ui/core';
import '@chayns-ui/tokens/baseline.css';
import '@chayns-ui/tokens/patch.css';
import '@chayns-ui/core/message-composer.css';

function ChatInput({ labels, name, retainAndSend }: {
  labels: ComposerLabels;
  name: string;
  retainAndSend: (draft: SideKickDraft) => void;
}) {
  const [value, setValue] = useState<RichTextDocument>({ version: 1, content: [] });
  return <SideKickInput aria-label={name} layout="twoLine" labels={labels}
    value={value} onValueChange={setValue} onSend={retainAndSend} />;
}
```

Resolve all visible/accessibility labels in the application. `onSend` receives a detached snapshot before the controlled clear; retain it synchronously before starting asynchronous work. Keep failed drafts and referenced attachment resources for explicit retry, and update the attachment list yourself. A pending send does not lock new typing.

Actions, attachments, prompt chips, insertion snippets, recents and agent/model identities are supplied by the consumer. Prompt actions are separate from draft submission. Dictation is enabled by default when supported. Use dictation.disabled to hide it; an optional language overrides inherited HTML lang / browser language. Voice is shown only when voice.onStream is provided; state and onEnd are optional. Voice capture emits a live MediaStream; the component owns microphone tracks/mute/end while the application owns connection and transport.

The implementation follows the accepted functional-first design scope. Real-device, screenreader and final design acceptance are still required before release.
