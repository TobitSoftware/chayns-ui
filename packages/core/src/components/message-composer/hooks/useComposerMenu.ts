import { useState } from 'react';

export function useComposerMenu(isLocked: boolean) {
  const [menu, setMenu] = useState<{
    kind: 'add' | 'selector';
    trigger: HTMLButtonElement;
    last: boolean;
  } | null>(null);
  const [previouslyLocked, setPreviouslyLocked] = useState(isLocked);
  if (previouslyLocked !== isLocked) {
    setPreviouslyLocked(isLocked);
    if (isLocked) setMenu(null);
  }
  function openMenu(kind: 'add' | 'selector', trigger: HTMLButtonElement, last = false) {
    if (isLocked) return;
    setMenu((current) => (current?.kind === kind ? null : { kind, trigger, last }));
  }
  function menuKeys(kind: 'add' | 'selector', event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      openMenu(kind, event.currentTarget, event.key === 'ArrowUp');
    }
  }

  return { menu, setMenu, openMenu, menuKeys };
}
