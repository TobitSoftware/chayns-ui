import { createRef } from 'react';
import {
  RichTextEditor,
  MessageComposer,
  MessageComposerLayouts,
  RichTextNodeTypes,
} from '../../index.js';
import type {
  ComposerLabels,
  RichTextDocument,
  RichTextEditorCommands,
  RichTextEditorProps,
} from '../../index.js';

const value: RichTextDocument = {
  version: 1,
  content: [{ type: RichTextNodeTypes.Mention, id: 'agent', label: 'Support' }],
};
const props: RichTextEditorProps = {
  value,
  onValueChange: (next) => {
    const version: 1 = next.version;
    void version;
  },
};
const commands = createRef<RichTextEditorCommands>();
const nativeRef = createRef<HTMLDivElement>();
declare const labels: ComposerLabels;
<RichTextEditor
  {...props}
  aria-label="Draft"
  ref={nativeRef}
  commandsRef={commands}
  onBeforeInput={(event) => event.preventDefault()}
  onKeyDown={(event) => event.currentTarget.focus()}
/>;
<MessageComposer
  {...props}
  labels={labels}
  layout={MessageComposerLayouts.TwoLine}
  rootProps={{ ref: nativeRef, onClick: (event) => event.currentTarget.focus() }}
/>;
// @ts-expect-error HTML cannot be supplied to the editor.
<RichTextEditor {...props} dangerouslySetInnerHTML={{ __html: '<b>text</b>' }} />;
// @ts-expect-error Content is controlled through value.
const unmanagedChildren: RichTextEditorProps = { ...props, children: 'Unmanaged text' };
void unmanagedChildren;
// @ts-expect-error The library owns contentEditable.
<RichTextEditor {...props} contentEditable />;
// @ts-expect-error Local density is not a public option.
<MessageComposer {...props} labels={labels} layout="twoLine" size="s" />;
// @ts-expect-error Engine JSON is not a public document.
const engineDocument: RichTextDocument = { root: {} };
void engineDocument;
