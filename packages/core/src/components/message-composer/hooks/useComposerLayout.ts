import { useLayoutEffect, useState } from 'react';
import type { RefObject } from 'react';

/** Measures the inline arrangement even while the editor occupies its expanded row. */
export function useComposerLayout(
  root: RefObject<HTMLDivElement | null>,
  editor: RefObject<HTMLDivElement | null>,
  oneLine: boolean,
) {
  const [expanded, setExpanded] = useState(false);

  useLayoutEffect(() => {
    const element = root.current;
    const field = editor.current;
    const row = field?.closest<HTMLElement>('.chayns-message-composer__row');
    if (!element || !field || !row || !oneLine) return;
    const probe = field.cloneNode(false) as HTMLDivElement;
    probe.removeAttribute('id');
    probe.removeAttribute('role');
    probe.removeAttribute('aria-labelledby');
    probe.setAttribute('aria-hidden', 'true');
    probe.inert = true;
    probe.contentEditable = 'false';
    probe.tabIndex = -1;
    Object.assign(probe.style, {
      position: 'fixed',
      visibility: 'hidden',
      pointerEvents: 'none',
      maxHeight: 'none',
      boxSizing: 'border-box',
    });
    document.body.append(probe);
    let frame: number | undefined;
    let contentDirty = true;
    let previousWidth = -1;
    let previousFont = '';

    function measure() {
      frame = undefined;
      if (!row || !field) return;
      const style = getComputedStyle(field);
      const rowStyle = getComputedStyle(row);
      const siblings = Array.from(row.children).filter(
        (child) => !child.contains(field) && getComputedStyle(child).display !== 'none',
      );
      const actionsWidth = siblings.reduce((width, child) => width + child.clientWidth, 0);
      const available =
        row.clientWidth - actionsWidth - siblings.length * parseFloat(rowStyle.columnGap || '0');
      const font = `${style.font}|${style.lineHeight}|${style.padding}`;
      if (!contentDirty && available === previousWidth && font === previousFont) return;
      previousWidth = available;
      previousFont = font;
      if (contentDirty) {
        probe.replaceChildren(...Array.from(field.childNodes, (child) => child.cloneNode(true)));
        // A measuring copy must never introduce duplicate document IDs or focus targets.
        probe.querySelectorAll('[id]').forEach((child) => child.removeAttribute('id'));
        contentDirty = false;
      }
      Object.assign(probe.style, {
        width: `${Math.max(0, available)}px`,
        font: style.font,
        lineHeight: style.lineHeight,
        padding: style.padding,
      });
      const lineHeight = parseFloat(style.lineHeight);
      const padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      setExpanded(available <= lineHeight || probe.scrollHeight > lineHeight + padding + 1);
    }
    function schedule() {
      frame ??= requestAnimationFrame(measure);
    }

    measure();
    const resize = new ResizeObserver(schedule);
    resize.observe(row);
    resize.observe(field);
    const mutation = new MutationObserver(() => {
      contentDirty = true;
      schedule();
    });
    mutation.observe(field, { childList: true, subtree: true, characterData: true });
    document.fonts.addEventListener('loadingdone', schedule);
    return () => {
      resize.disconnect();
      mutation.disconnect();
      document.fonts.removeEventListener('loadingdone', schedule);
      if (frame !== undefined) cancelAnimationFrame(frame);
      probe.remove();
    };
  }, [root, editor, oneLine]);

  return oneLine && expanded;
}
