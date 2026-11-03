import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function useRemovedActionFocus(
  root: RefObject<HTMLDivElement | null>,
  focusEditor: () => void,
) {
  const frame = useRef<number | undefined>(undefined);
  const observer = useRef<MutationObserver | null>(null);
  useEffect(
    () => () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
      observer.current?.disconnect();
    },
    [],
  );
  return (target: HTMLButtonElement, action: () => void) => {
    const list = Array.from(
      target
        .closest('.chayns-message-composer__attachments, .chayns-message-composer__prompts')
        ?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') ?? [],
    );
    const index = list.indexOf(target);
    const neighbors = [...list.slice(index + 1), ...list.slice(0, index).reverse()];
    const ownedFocus = document.activeElement === target;
    observer.current?.disconnect();
    const restore = () => {
      if (!ownedFocus || target.isConnected || document.activeElement !== document.body) return;
      const next = neighbors.find(
        (element) => element.isConnected && !element.disabled && root.current?.contains(element),
      );
      observer.current?.disconnect();
      if (next) next.focus();
      else focusEditor();
    };
    observer.current = new MutationObserver(restore);
    if (root.current) observer.current.observe(root.current, { childList: true, subtree: true });
    action();
    frame.current = requestAnimationFrame(restore);
  };
}
