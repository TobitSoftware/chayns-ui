import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '@chayns-ui/core';
import { IconButton } from '@chayns-ui/core/button';
import '@chayns-ui/tokens/baseline.css';
import '@chayns-ui/tokens/patch.css';
import '@chayns-ui/core/button.css';

const root = document.querySelector('#root');
if (!root) throw new Error('Missing consumer root');

createRoot(root).render(
  <StrictMode>
    <Button variant="primary">Packed consumer</Button>
    <IconButton aria-label="Consumer icon action" icon={<span>☆</span>} variant="ghost" />
  </StrictMode>,
);
