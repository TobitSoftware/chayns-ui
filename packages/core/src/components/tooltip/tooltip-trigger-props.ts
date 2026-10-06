import type { HTMLAttributes, SyntheticEvent } from 'react';

type Handler = (event: SyntheticEvent<HTMLElement>) => void;

/** Preserve child listeners before outer listeners for every shared native event. */
export function tooltipTriggerProps(
  child: HTMLAttributes<HTMLElement>,
  outer: HTMLAttributes<HTMLElement>,
) {
  const merged: Record<string, unknown> = { ...child, ...outer };
  for (const [name, listener] of Object.entries(outer)) {
    const previous = (child as Record<string, unknown>)[name];
    if (/^on[A-Z]/.test(name) && typeof previous === 'function' && typeof listener === 'function') {
      merged[name] = (event: SyntheticEvent<HTMLElement>) => {
        (previous as Handler)(event);
        if (!event.defaultPrevented) (listener as Handler)(event);
      };
    }
  }
  merged.className = [child.className, outer.className].filter(Boolean).join(' ') || undefined;
  merged.style = { ...child.style, ...outer.style };
  return merged as HTMLAttributes<HTMLElement>;
}
