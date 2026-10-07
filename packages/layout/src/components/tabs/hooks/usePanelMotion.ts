import { useLayoutEffect, useRef } from 'react';
import type { RefObject } from 'react';

/** Animate only opacity; cancel obsolete exits and immediately honor Reduced Motion. */
export default function usePanelMotion(
  element: RefObject<HTMLDivElement | null>,
  active: boolean,
  finishExit: () => void,
  animateInitial: boolean,
) {
  const firstView = useRef(!animateInitial);
  const interruptedOpacity = useRef<string | undefined>(undefined);

  useLayoutEffect(() => {
    const node = element.current;
    if (!node) {
      interruptedOpacity.current = undefined;
      return;
    }
    if (firstView.current && active) return;
    firstView.current = false;

    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (preference?.matches || typeof node.animate !== 'function') {
      if (!active) finishExit();
      return;
    }

    const opacity = getComputedStyle(node).opacity;
    const animation = node.animate(
      [
        { opacity: interruptedOpacity.current ?? (active ? '0' : opacity) },
        { opacity: active ? opacity : '0' },
      ],
      {
        duration: active ? 220 : 200,
        easing: active ? 'cubic-bezier(.22,.61,.36,1)' : 'cubic-bezier(.4,0,.7,.2)',
      },
    );
    interruptedOpacity.current = undefined;
    let current = true;
    void animation.finished.then(
      () => {
        if (current && !active) finishExit();
      },
      () => undefined,
    );

    function stopMotion() {
      if (!preference?.matches) return;
      animation.cancel();
      if (!active) finishExit();
    }
    preference?.addEventListener('change', stopMotion);
    return () => {
      current = false;
      interruptedOpacity.current =
        animation.playState === 'running' ? getComputedStyle(node).opacity : undefined;
      animation.cancel();
      preference?.removeEventListener('change', stopMotion);
    };
  }, [active, element, finishExit]);
}
