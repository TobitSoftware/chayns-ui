import type { Ref, RefCallback } from 'react';

/** Composes native refs, including React 19 cleanup callbacks, without requiring React 19. */
export function composeNativeRefs<T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> {
  const cleanups = new Map<Ref<T>, () => void>();
  return (element) => {
    for (const ref of refs) {
      if (!ref) continue;
      if (typeof ref === 'function') {
        const cleanup = cleanups.get(ref);
        if (element === null && cleanup) {
          cleanup();
          cleanups.delete(ref);
        } else {
          const nextCleanup = ref(element);
          if (typeof nextCleanup === 'function') cleanups.set(ref, nextCleanup);
        }
      } else {
        ref.current = element;
      }
    }
  };
}
