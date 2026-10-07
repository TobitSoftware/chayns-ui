import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';

import type { TabsContextValue } from '../TabsContext.js';

/** Batch layout corrections; animate only the indicator transform, never React state. */
export default function useUnderlineIndicator(
  listRef: RefObject<HTMLDivElement | null>,
  indicatorRef: RefObject<HTMLSpanElement | null>,
  { appearance, value, tabs }: TabsContextValue,
) {
  const previousValue = useRef(value);
  const geometry = useRef<{ x: number; width: number } | undefined>(undefined);
  const interruptedTransform = useRef<string | undefined>(undefined);

  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator || appearance !== 'underline') {
      geometry.current = undefined;
      interruptedTransform.current = undefined;
      list?.classList.remove('chayns-tabs__list--indicator-ready');
      return;
    }
    const selected = value === undefined ? undefined : tabs.get(value);
    const changed = previousValue.current !== value;
    previousValue.current = value;
    let frame: number | undefined;
    let animation: Animation | undefined;
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');

    function measure(animate = false) {
      if (!list || !indicator) return;
      if (!selected || !list.contains(selected)) {
        list.classList.remove('chayns-tabs__list--indicator-ready');
        indicator.style.visibility = 'hidden';
        geometry.current = undefined;
        return;
      }
      const bounds = selected.getBoundingClientRect();
      const listBounds = list.getBoundingClientRect();
      const extension = Math.abs(
        parseFloat(getComputedStyle(selected, '::after').insetInlineStart),
      );
      const x = bounds.left - listBounds.left + list.scrollLeft - list.clientLeft - extension;
      const width = bounds.width + 2 * extension;
      if (!list.classList.contains('chayns-tabs__list--indicator-ready'))
        list.classList.add('chayns-tabs__list--indicator-ready');
      if (
        geometry.current?.x === x &&
        geometry.current.width === width &&
        indicator.style.transform
      )
        return;
      const from = interruptedTransform.current ?? getComputedStyle(indicator).transform;
      interruptedTransform.current = undefined;
      animation?.cancel();
      const transform = `translateX(${x}px) scaleX(${width})`;
      indicator.style.transform = transform;
      indicator.style.visibility = 'visible';
      list.classList.add('chayns-tabs__list--indicator-ready');
      if (
        animate &&
        geometry.current &&
        !preference?.matches &&
        typeof indicator.animate === 'function'
      ) {
        animation = indicator.animate([{ transform: from }, { transform }], {
          duration: 220,
          easing: 'cubic-bezier(.22,.61,.36,1)',
        });
      }
      geometry.current = { x, width };
    }
    function schedule() {
      if (frame !== undefined) return;
      frame = requestAnimationFrame(() => {
        frame = undefined;
        measure();
      });
    }
    function stopMotion() {
      if (preference?.matches) animation?.cancel();
    }

    measure(changed);
    const resize = typeof ResizeObserver === 'function' ? new ResizeObserver(schedule) : undefined;
    resize?.observe(list);
    // Earlier tabs can change width without changing the selected tab or list width.
    for (const tab of tabs.values()) if (list.contains(tab)) resize?.observe(tab);
    const mutations = new MutationObserver((records) => {
      if (records.some((record) => record.target !== indicator)) {
        for (const tab of tabs.values()) if (list.contains(tab)) resize?.observe(tab);
        schedule();
      }
    });
    mutations.observe(list, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    });
    list.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference?.addEventListener('change', stopMotion);
    return () => {
      interruptedTransform.current =
        animation?.playState === 'running' ? getComputedStyle(indicator).transform : undefined;
      animation?.cancel();
      if (frame !== undefined) cancelAnimationFrame(frame);
      resize?.disconnect();
      mutations.disconnect();
      list.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference?.removeEventListener('change', stopMotion);
    };
  }, [appearance, indicatorRef, listRef, tabs, value]);
}
