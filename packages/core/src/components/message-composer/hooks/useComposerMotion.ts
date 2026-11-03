import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';

/** Only intrinsic geometry changes require measuring; action swaps use CSS slots. */
export function useComposerMotion(root: RefObject<HTMLDivElement | null>, isCapturing: boolean) {
  const refresh = useRef<((capturing: boolean) => void) | null>(null);

  useLayoutEffect(() => {
    const element = root.current;
    const surface = element?.querySelector<HTMLElement>('.chayns-message-composer__surface');
    const row = element?.querySelector<HTMLElement>('.chayns-message-composer__row');
    if (!element || !surface || !row || typeof surface.animate !== 'function') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let capturing = false;
    let animations: Animation[] = [];
    let heightAnimation: Animation | undefined;
    let frame: number | undefined;

    function snapshot() {
      const parts = Array.from(row!.children).filter((part) =>
        part.matches(
          '.chayns-message-composer__add, .chayns-rich-text-editor, .chayns-message-composer__controls',
        ),
      );
      const box = surface!.getBoundingClientRect();
      return {
        box,
        row: row!.getBoundingClientRect(),
        expanded: element!.classList.contains('chayns-message-composer--expanded'),
        parts: new Map(
          parts.map((part) => {
            const rect = part.getBoundingClientRect();
            return [part, { left: rect.left - box.left, top: rect.top - box.top }];
          }),
        ),
      };
    }
    let previous = snapshot();

    function cancelAnimations() {
      animations.forEach((animation) => animation.cancel());
      animations = [];
      heightAnimation = undefined;
      surface!.style.overflow = '';
    }

    function updateSelectorShift() {
      const selector = row!.querySelector<HTMLElement>('.chayns-message-composer__selector');
      const controls = row!.querySelector<HTMLElement>(
        '.chayns-message-composer__controls--paired',
      );
      if (!selector || !controls) {
        row!.removeAttribute('data-selector-shift');
        return;
      }
      const selected = selector.getBoundingClientRect();
      const actions = controls.getBoundingClientRect();
      const transform = getComputedStyle(selector).transform;
      const matrix = new DOMMatrixReadOnly(transform === 'none' ? undefined : transform);
      const shift = controls.clientWidth - controls.querySelector('button')!.offsetWidth;
      const sameLine =
        Math.abs(selected.top + selected.height / 2 - actions.top - actions.height / 2) < 0.5;
      const fits = selected.right - matrix.m41 + shift <= row!.getBoundingClientRect().right + 0.5;
      row!.toggleAttribute('data-selector-shift', sameLine && fits);
    }

    function measure() {
      updateSelectorShift();
      const intrinsic = row!.getBoundingClientRect();
      const width = surface!.getBoundingClientRect().width;
      const sameRow =
        intrinsic.width === previous.row.width && intrinsic.height === previous.row.height;
      const sameExpansion =
        element!.classList.contains('chayns-message-composer--expanded') === previous.expanded;
      if (
        !reduced.matches &&
        !capturing &&
        sameRow &&
        sameExpansion &&
        width === previous.box.width
      ) {
        if (heightAnimation?.playState === 'running') return;
        if (surface!.getBoundingClientRect().height === previous.box.height) return;
      }
      // React has already applied the next layout. Rebase ongoing transforms on
      // their previous target, rather than sampling that newly moved DOM as the start.
      const first = { ...previous };
      if (animations.some((animation) => animation.playState === 'running')) {
        first.box = surface!.getBoundingClientRect();
        first.parts = new Map(
          Array.from(previous.parts, ([part, rect]) => {
            const transform = getComputedStyle(part).transform;
            const matrix = new DOMMatrixReadOnly(transform === 'none' ? undefined : transform);
            return [part, { left: rect.left + matrix.m41, top: rect.top + matrix.m42 }];
          }),
        );
      }
      cancelAnimations();
      const last = snapshot();
      previous = last;
      if (capturing || reduced.matches) return;
      const grow = last.box.height >= first.box.height;
      const timing = {
        duration: grow ? 220 : 140,
        easing: grow ? 'cubic-bezier(.22,.61,.36,1)' : 'cubic-bezier(.4,0,.7,.2)',
      };
      if (Math.abs(last.box.height - first.box.height) > 0.5) {
        surface!.style.overflow = 'hidden';
        heightAnimation = surface!.animate(
          [{ height: `${first.box.height}px` }, { height: `${last.box.height}px` }],
          timing,
        );
        const current = heightAnimation;
        current.onfinish = current.oncancel = () => {
          if (heightAnimation === current) {
            heightAnimation = undefined;
            surface!.style.overflow = '';
          }
        };
        animations.push(current);
      }
      if (first.expanded === last.expanded) return;
      last.parts.forEach((end, part) => {
        const start = first.parts.get(part);
        if (!start) return;
        const dx = start.left - end.left;
        const dy = start.top - end.top;
        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) return;
        animations.push(
          part.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0,0)' }],
            timing,
          ),
        );
      });
    }

    function schedule() {
      if (frame !== undefined) return;
      frame = requestAnimationFrame(() => {
        frame = undefined;
        measure();
      });
    }

    refresh.current = (nextCapturing) => {
      capturing = nextCapturing;
      measure();
    };
    const mutations = new MutationObserver(schedule);
    mutations.observe(element, { attributes: true, attributeFilter: ['class'] });
    const resize = new ResizeObserver(schedule);
    resize.observe(surface);
    resize.observe(row);
    reduced.addEventListener('change', schedule);
    return () => {
      refresh.current = null;
      mutations.disconnect();
      resize.disconnect();
      if (frame !== undefined) cancelAnimationFrame(frame);
      cancelAnimations();
      reduced.removeEventListener('change', schedule);
    };
  }, [root]);

  useLayoutEffect(() => refresh.current?.(isCapturing));
}
