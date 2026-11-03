import { useState } from 'react';
import { SideKickInput } from '@chayns-ui/business';
import { RichTextEditor, MessageComposerLayouts } from '@chayns-ui/core';
import type { RichTextDocument } from '@chayns-ui/core';
import { composerLabels } from './ComposerLabels.js';
import '@chayns-ui/core/message-composer.css';
import '@chayns-ui/core/rich-text-editor.css';

export default function SideKickExample() {
  const [value, setValue] = useState<RichTextDocument>({ version: 1, content: [] });
  return (
    <>
      <RichTextEditor aria-label="Packed rich text" value={value} onValueChange={setValue} />
      <SideKickInput
        aria-label="Packed Sidekick"
        layout={MessageComposerLayouts.TwoLine}
        labels={composerLabels}
        value={value}
        onValueChange={setValue}
        onSend={(draft) => {
          sessionStorage.setItem('draft', JSON.stringify(draft));
        }}
      />
    </>
  );
}
