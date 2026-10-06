import {
  cloneElement,
  forwardRef,
  Fragment,
  isValidElement,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Ref } from 'react';
import { createPortal } from 'react-dom';
import { useOverlayPosition } from '../../hooks/useOverlayPosition.js';
import { composeNativeRefs } from '../../utils/native-ref.js';
import { useTooltipInteraction } from './hooks/useTooltipInteraction.js';
import { tooltipTriggerProps } from './tooltip-trigger-props.js';
import type { TooltipProps, TooltipTriggerProps } from './Tooltip.types.js';

// Fixed anchor gap in the verified Bodywork .tipbox reference.
const ANCHOR_GAP = 9;

const Tooltip = forwardRef<HTMLElement, TooltipProps>(function Tooltip(
  { children, content, ...nativeProps },
  ref,
) {
  const id = useId();
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const surface = useRef<HTMLSpanElement>(null);
  const interaction = useTooltipInteraction(trigger, surface);
  useOverlayPosition(surface, trigger, interaction.open, 'top', ANCHOR_GAP);

  const child = isValidElement<TooltipTriggerProps>(children) ? children : undefined;
  const descriptorRef = child
    ? (Object.getOwnPropertyDescriptor(child, 'ref')?.value as Ref<HTMLElement> | undefined)
    : undefined;
  const childRef = child?.props.ref ?? descriptorRef;
  const mergedRef = useMemo(() => composeNativeRefs(childRef, setTrigger, ref), [childRef, ref]);
  if (!child || child.type === Fragment || child.props.disabled)
    throw new Error('Tooltip requires one enabled ref-/native-prop-capable trigger element.');

  const props = tooltipTriggerProps(child.props, nativeProps);
  const description = [
    ...new Set(
      [child.props['aria-describedby'], nativeProps['aria-describedby'], id]
        .filter(Boolean)
        .flatMap((value) => value?.split(/\s+/) ?? []),
    ),
  ].join(' ');
  const triggerProps: TooltipTriggerProps = {
    ...props,
    ref: mergedRef,
    'aria-describedby': description,
    onPointerEnter: (event) => {
      props.onPointerEnter?.(event);
      if (!event.defaultPrevented) interaction.enter();
    },
    onPointerLeave: (event) => {
      props.onPointerLeave?.(event);
      if (!event.defaultPrevented) interaction.leave(event.relatedTarget);
    },
    onFocus: (event) => {
      props.onFocus?.(event);
      if (!event.defaultPrevented) interaction.focus();
    },
    onBlur: (event) => {
      props.onBlur?.(event);
      if (!event.defaultPrevented) interaction.blur();
    },
    onClick: (event) => {
      props.onClick?.(event);
      if (!event.defaultPrevented) interaction.enter();
    },
    onKeyDown: (event) => {
      props.onKeyDown?.(event);
      if (!event.defaultPrevented && interaction.open && event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        interaction.dismiss();
      }
    },
  };
  const triggerElement = cloneElement(child, triggerProps);
  return (
    <>
      {triggerElement}
      {trigger && typeof document !== 'undefined'
        ? createPortal(
            <span
              aria-hidden={!interaction.open}
              className={`chayns-tooltip${interaction.open ? ' chayns-tooltip--open' : ''}`}
              id={id}
              onPointerLeave={(event) => interaction.leave(event.relatedTarget)}
              ref={surface}
              role="tooltip"
            >
              {content}
            </span>,
            document.body,
          )
        : null}
    </>
  );
});
Tooltip.displayName = 'Tooltip';
export default Tooltip;
