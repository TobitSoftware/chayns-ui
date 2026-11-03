import { createContext } from 'react';
import type { MutableRefObject } from 'react';

/** Private integration: distinguishes capture echoes from external draft replacements. */
export const EditorCaptureContext = createContext<MutableRefObject<string | null> | null>(null);
