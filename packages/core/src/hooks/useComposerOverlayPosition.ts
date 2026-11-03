import { useEffect } from 'react';
import type { RefObject } from 'react';

const VIEWPORT_INSET = 16;

/** Composer-only upward-first placement; existing Popup placement stays unchanged. */
export function useComposerOverlayPosition(
  surfaceRef: RefObject<HTMLElement | null>,
  trigger: HTMLElement | null,
  open: boolean,
  alignEnd = false,
) {
  useEffect(() => {
    const surface = surfaceRef.current;
    if (!open || !surface || !trigger) return;
    let frame: number | undefined;

    function update() {
      if (!surface || !trigger) return;
      const viewport = window.visualViewport;
      const width = viewport?.width ?? window.innerWidth;
      const height = viewport?.height ?? window.innerHeight;
      const x = viewport?.offsetLeft ?? 0;
      const y = viewport?.offsetTop ?? 0;
      const insetX = Math.min(VIEWPORT_INSET, width / 2);
      const insetY = Math.min(VIEWPORT_INSET, height / 2);
      const anchor = trigger.getBoundingClientRect();
      surface.style.maxWidth = `${Math.max(0, width - insetX * 2)}px`;
      const above = Math.max(0, anchor.top - y - insetY);
      const below = Math.max(0, height + y - insetY - anchor.bottom);
      surface.style.maxHeight = `max(0px, calc(${Math.max(above, below)}px - var(--k8)))`;
      const size = surface.getBoundingClientRect();
      const isAbove = size.height <= above || above >= below;
      surface.style.maxHeight = `max(0px, calc(${isAbove ? above : below}px - var(--k8)))`;
      const top = isAbove
        ? `calc(${anchor.top - size.height}px - var(--k8))`
        : `calc(${anchor.bottom}px + var(--k8))`;
      const isRtl = getComputedStyle(trigger).direction === 'rtl';
      const left = alignEnd !== isRtl ? anchor.right - size.width : anchor.left;
      surface.style.left = `${Math.max(x + insetX, Math.min(left, x + width - insetX - size.width))}px`;
      surface.style.top = `clamp(${y + insetY}px, ${top}, ${y + height - insetY - size.height}px)`;
    }
    function schedule() {
      if (frame !== undefined) return;
      frame = requestAnimationFrame(() => {
        frame = undefined;
        update();
      });
    }

    update();
    const observer =
      typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(schedule);
    observer?.observe(surface);
    observer?.observe(trigger);
    window.addEventListener('scroll', schedule, true);
    window.addEventListener('resize', schedule);
    window.visualViewport?.addEventListener('resize', schedule);
    window.visualViewport?.addEventListener('scroll', schedule);
    return () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      observer?.disconnect();
      window.removeEventListener('scroll', schedule, true);
      window.removeEventListener('resize', schedule);
      window.visualViewport?.removeEventListener('resize', schedule);
      window.visualViewport?.removeEventListener('scroll', schedule);
    };
  }, [surfaceRef, trigger, open, alignEnd]);
}
