import { useCallback, useImperativeHandle, useRef } from 'react';
import type { Ref } from 'react';

/** Use only in a mounted native part; React owns forwarded ref assignment and cleanup. */
export default function useElementRef<Element extends HTMLElement>(forwardedRef: Ref<Element>) {
  const element = useRef<Element | null>(null);
  useImperativeHandle(forwardedRef, () => element.current!, []);
  const setElement = useCallback((node: Element | null) => {
    element.current = node;
  }, []);
  return [element, setElement] as const;
}
