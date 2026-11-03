import { useLayoutEffect, useRef } from 'react';
import type { InputEvent as ReactInputEvent, RefObject } from 'react';
import type { RichTextEditorProps } from '../RichTextEditor.types.js';

/** React's beforeinput plugin uses textInput fallbacks; native beforeinput must veto the engine before it edits. */
function inputEvent(event: InputEvent, element: HTMLDivElement): ReactInputEvent<HTMLDivElement> {
  return {
    data: event.data ?? '',
    nativeEvent: event,
    currentTarget: element,
    target: event.target ?? element,
    bubbles: event.bubbles,
    cancelable: event.cancelable,
    defaultPrevented: event.defaultPrevented,
    eventPhase: event.eventPhase,
    isTrusted: event.isTrusted,
    timeStamp: event.timeStamp,
    type: event.type,
    preventDefault: () => event.preventDefault(),
    stopPropagation: () => event.stopPropagation(),
    isDefaultPrevented: () => event.defaultPrevented,
    isPropagationStopped: () => event.cancelBubble,
    persist: () => undefined,
  };
}

export function useBeforeInput(
  elementRef: RefObject<HTMLDivElement | null>,
  props: RichTextEditorProps,
) {
  const latest = useRef(props);
  useLayoutEffect(() => {
    latest.current = props;
  });
  useLayoutEffect(() => {
    const element = elementRef.current;
    if (!element) return;
    const capture = (event: Event) =>
      latest.current.onBeforeInputCapture?.(inputEvent(event as InputEvent, element));
    const bubble = (event: Event) =>
      latest.current.onBeforeInput?.(inputEvent(event as InputEvent, element));
    element.addEventListener('beforeinput', capture, true);
    element.addEventListener('beforeinput', bubble);
    return () => {
      element.removeEventListener('beforeinput', capture, true);
      element.removeEventListener('beforeinput', bubble);
    };
  }, [elementRef]);
}
