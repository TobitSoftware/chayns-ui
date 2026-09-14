import {
  cloneElement,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type Ref,
  type ReactElement,
} from 'react';
import { createPortal } from 'react-dom';

import type { PopupProps } from './Popup.types.js';

interface PopupTriggerProps {
  'aria-controls'?: string;
  'aria-expanded'?: boolean;
  'aria-haspopup'?: string;
  onClick?: (event: MouseEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

type PopupTriggerElement = ReactElement<PopupTriggerProps & { ref?: Ref<HTMLElement> }>;
const Popup = ({ children, className, trigger }: PopupProps) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const triggerRef = useRef<HTMLElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const popupId = useId();

  const updatePosition = () => {
    const anchor = triggerRef.current;
    if (!anchor) return;

    const rect = anchor.getBoundingClientRect();
    const popup = popupRef.current;
    const popupWidth = popup?.offsetWidth ?? 0;
    const popupHeight = popup?.offsetHeight ?? 0;
    const gap = 8;
    const margin = 8;
    const left = Math.min(
      Math.max(margin, rect.left),
      Math.max(margin, window.innerWidth - popupWidth - margin),
    );
    const below = rect.bottom + gap;
    const top =
      below + popupHeight <= window.innerHeight - margin
        ? below
        : Math.max(margin, rect.top - popupHeight - gap);

    setPosition({ left, top });
  };

  const close = (restoreFocus: boolean) => {
    setOpen(false);
    if (restoreFocus) {
      queueMicrotask(() => triggerRef.current?.focus());
    }
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const firstItem = popupRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
    firstItem?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !triggerRef.current?.contains(target) &&
        !popupRef.current?.contains(target)
      ) {
        close(false);
      }
    };
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close(true);
      }
      if (event.key === 'Tab') close(false);
    };
    const handleViewportChange = () => updatePosition();

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('scroll', handleViewportChange, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleViewportChange);
      window.removeEventListener('scroll', handleViewportChange, true);
    };
  }, [open]);

  const triggerElement = trigger as PopupTriggerElement;
  const enhancedTrigger = cloneElement(triggerElement, {
      'aria-controls': popupId,
      'aria-expanded': open,
      'aria-haspopup': 'menu',
      onClick: (event: React.MouseEvent) => {
        triggerElement.props.onClick?.(event);
        if (!event.defaultPrevented) setOpen((value) => !value);
      },
      onKeyDown: (event: KeyboardEvent) => {
        triggerElement.props.onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          setOpen(true);
        }
      },
      ref: triggerRef,
  });

  return (
    <>
      {enhancedTrigger}
      {open
        ? createPortal(
            <div
              className={['chayns-popup', className].filter(Boolean).join(' ')}
              id={popupId}
              onClick={(event) => {
                if ((event.target as HTMLElement).closest('[role="menuitem"]')) {
                  close(true);
                }
              }}
              ref={popupRef}
              style={{ left: position.left, top: position.top }}
            >
              {children}
            </div>,
            document.body,
          )
        : null}
    </>
  );
};

export default Popup;
