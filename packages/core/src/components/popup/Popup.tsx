import {
  cloneElement,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { composeNativeRefs } from '../../utils/native-ref.js';
import { useOverlayPosition } from '../../hooks/useOverlayPosition.js';
import type { ComponentPropsWithRef, Ref } from 'react';
import type { PopupContentProps, PopupProps, PopupTriggerProps } from './Popup.types.js';

interface PopupContextValue {
  contentId: string;
  open: boolean;
  setOpen: (open: boolean, restore?: boolean) => void;
  setTriggerElement: (element: HTMLButtonElement | null) => void;
  triggerElement: HTMLButtonElement | null;
}
const PopupContext = createContext<PopupContextValue | null>(null);
function usePopup(part: string) {
  const context = useContext(PopupContext);
  if (!context) throw new Error(`Popup.${part} must be rendered within Popup.`);
  return context;
}

const Trigger = forwardRef<HTMLButtonElement, PopupTriggerProps>(function Trigger(
  { asChild = false, children, onClick, ...props },
  ref,
) {
  const popup = usePopup('Trigger');
  const child =
    asChild && isValidElement<ComponentPropsWithRef<'button'>>(children) ? children : undefined;
  const descriptorRef = child
    ? (Object.getOwnPropertyDescriptor(child, 'ref')?.value as Ref<HTMLButtonElement> | undefined)
    : undefined;
  const childRef = child?.props.ref ?? descriptorRef;
  const setTriggerElement = popup.setTriggerElement;
  const setRef = useMemo(
    () => composeNativeRefs(childRef, setTriggerElement, ref),
    [childRef, setTriggerElement, ref],
  );
  const triggerProps = {
    ...props,
    'aria-controls': popup.contentId,
    'aria-expanded': popup.open,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      child?.props.onClick?.(event);
      if (!event.defaultPrevented) onClick?.(event);
      if (!event.defaultPrevented) popup.setOpen(!popup.open);
    },
    ref: setRef,
  };

  if (asChild && isValidElement(children)) {
    // eslint-disable-next-line react-hooks/refs
    return cloneElement(children, triggerProps);
  }

  return (
    <button {...triggerProps} ref={setRef} type="button">
      {children}
    </button>
  );
});
const Content = forwardRef<HTMLDivElement, PopupContentProps>(function Content(
  { children, ...props },
  ref,
) {
  const popup = usePopup('Content');
  const contentRef = useRef<HTMLDivElement>(null);

  useOverlayPosition(contentRef, popup.triggerElement, popup.open);

  const setRef = useMemo(() => composeNativeRefs(contentRef, ref), [ref]);

  if (!popup.open || typeof document === 'undefined') return null;
  return createPortal(
    <div
      {...props}
      className={['chayns-popup', props.className].filter(Boolean).join(' ')}
      id={popup.contentId}
      ref={setRef}
    >
      {children}
    </div>,
    document.body,
  );
});
const Root = ({
  children,
  closeOnEscape = true,
  closeOnOutsidePress = true,
  defaultOpen = false,
  onOpenChange,
  open,
}: PopupProps) => {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const [triggerElement, setTriggerElement] = useState<HTMLButtonElement | null>(null);
  const contentId = useId();
  const isOpen = open ?? uncontrolledOpen;
  const setOpen = useCallback(
    (next: boolean, restore = true) => {
      if (open === undefined) setUncontrolledOpen(next);
      onOpenChange?.(next);
      if (!next && restore) queueMicrotask(() => triggerElement?.focus());
    },
    [onOpenChange, open, triggerElement],
  );
  useEffect(() => {
    if (!isOpen) return;
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape && !event.defaultPrevented) {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key === 'Tab') setOpen(false, false);
    };
    const outside = (event: PointerEvent) => {
      const target = event.target;
      if (
        closeOnOutsidePress &&
        target instanceof Node &&
        !triggerElement?.contains(target) &&
        !document.getElementById(contentId)?.contains(target)
      )
        setOpen(false, false);
    };
    const menuAction = (event: MouseEvent) => {
      if (event.defaultPrevented || !(event.target instanceof Element)) return;
      const item = event.target.closest('[role="menuitem"]');
      if (item && document.getElementById(contentId)?.contains(item)) setOpen(false);
    };
    document.addEventListener('keydown', key);
    document.addEventListener('pointerdown', outside);
    document.addEventListener('click', menuAction);
    return () => {
      document.removeEventListener('keydown', key);
      document.removeEventListener('pointerdown', outside);
      document.removeEventListener('click', menuAction);
    };
  }, [isOpen, closeOnEscape, closeOnOutsidePress, contentId, setOpen, triggerElement]);
  return (
    <PopupContext.Provider
      value={{ contentId, open: isOpen, setOpen, setTriggerElement, triggerElement }}
    >
      {children}
    </PopupContext.Provider>
  );
};
Trigger.displayName = 'Popup.Trigger';
Content.displayName = 'Popup.Content';
Root.displayName = 'Popup';

export default Object.assign(Root, { Trigger, Content });
