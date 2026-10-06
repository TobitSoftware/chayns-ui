import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

/** Tracks focus/hover independently, including Escape suppression and outside dismissal. */
export function useTooltipInteraction(
  trigger: HTMLElement | null,
  surface: RefObject<HTMLSpanElement | null>,
) {
  const [open, setOpen] = useState(false);
  const focused = useRef(false);

  function enter() {
    setOpen(true);
  }
  function leave(relatedTarget: EventTarget | null) {
    if (
      relatedTarget instanceof Node &&
      (surface.current?.contains(relatedTarget) || trigger?.contains(relatedTarget))
    )
      return;
    if (!focused.current) setOpen(false);
  }
  function dismiss() {
    setOpen(false);
  }
  function focus() {
    focused.current = true;
    enter();
  }
  function blur() {
    focused.current = false;
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return undefined;
    function keyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape' || event.defaultPrevented) return;
      setOpen(false);
    }
    function pointerDown(event: PointerEvent) {
      if (event.defaultPrevented || !(event.target instanceof Node)) return;
      if (trigger?.contains(event.target) || surface.current?.contains(event.target)) return;
      setOpen(false);
    }
    document.addEventListener('keydown', keyDown);
    document.addEventListener('pointerdown', pointerDown);
    return () => {
      document.removeEventListener('keydown', keyDown);
      document.removeEventListener('pointerdown', pointerDown);
    };
  }, [open, surface, trigger]);
  return { open, enter, leave, focus, blur, dismiss };
}
