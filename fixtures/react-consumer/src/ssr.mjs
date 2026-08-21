import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { Button, IconButton } from '@chayns-ui/core';

console.log(
  renderToString(
    createElement(
      'main',
      null,
      createElement(Button, { variant: 'primary' }, 'Packed consumer'),
      createElement(IconButton, {
        'aria-label': 'Consumer icon action',
        icon: createElement('span', null, '☆'),
        variant: 'ghost',
      }),
    ),
  ),
);
