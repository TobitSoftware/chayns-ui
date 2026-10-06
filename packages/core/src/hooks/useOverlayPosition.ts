import { useEffect } from 'react';
import type { RefObject } from 'react';

/** Positions a non-modal surface at its trigger and keeps it inside the viewport. */
export function useOverlayPosition(
  surfaceRef: RefObject<HTMLElement | null>,
  trigger: HTMLElement | null,
  open: boolean,
  placement: 'bottom' | 'top' = 'bottom',
  gap = 0,
) {
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!open || surface === null || trigger === null) return undefined;

    let frame: number | undefined;
    function update() {
      if (surface === null || trigger === null) return;
      const anchor = trigger.getBoundingClientRect();
      surface.style.maxWidth = `${window.innerWidth}px`;
      surface.style.maxHeight = `${window.innerHeight}px`;
      const size = surface.getBoundingClientRect();
      const above = anchor.top - gap - size.height;
      const below = anchor.bottom + gap;
      const fitsAbove = above >= 0;
      const fitsBelow = below + size.height <= window.innerHeight;
      let top = below;
      if (placement === 'top') {
        if (fitsAbove || !fitsBelow) top = above;
      } else if (!fitsBelow && fitsAbove) {
        top = above;
      }
      const left =
        placement === 'top' ? anchor.left + (anchor.width - size.width) / 2 : anchor.left;
      surface.style.top = `${Math.max(0, Math.min(top, window.innerHeight - size.height))}px`;
      const resolvedLeft = Math.max(0, Math.min(left, window.innerWidth - size.width));
      surface.style.left = `${resolvedLeft}px`;
      surface.style.setProperty(
        '--chayns-overlay-anchor-x',
        `${anchor.left + anchor.width / 2 - resolvedLeft}px`,
      );
      surface.dataset.placement = top === above ? 'top' : 'bottom';
    }

    function scheduleUpdate() {
      if (frame !== undefined) return;
      frame = window.requestAnimationFrame(() => {
        frame = undefined;
        update();
      });
    }

    update();
    const observer =
      typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(scheduleUpdate);
    observer?.observe(surface);
    observer?.observe(trigger);
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('scroll', scheduleUpdate, true);
    return () => {
      if (frame !== undefined) window.cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('scroll', scheduleUpdate, true);
    };
  }, [gap, open, placement, surfaceRef, trigger]);
}
