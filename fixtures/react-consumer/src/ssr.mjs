import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { SideKickInput } from '@chayns-ui/business';
import { Button, IconButton, RichTextEditor } from '@chayns-ui/core';

console.log(
  renderToString(
    createElement(
      'main',
      null,
      createElement(RichTextEditor, {
        'aria-label': 'Packed rich text',
        value: { version: 1, content: [] },
        onValueChange() {},
      }),
      createElement(SideKickInput, {
        'aria-label': 'Packed Sidekick',
        layout: 'twoLine',
        labels: { send: 'Send' },
        value: { version: 1, content: [] },
        onValueChange() {},
        onSend() {},
      }),
      createElement(Button, { variant: 'primary' }, 'Packed consumer'),
      createElement(IconButton, {
        'aria-label': 'Consumer icon action',
        icon: 'fa-star',
        variant: 'ghost',
      }),
    ),
  ),
);
