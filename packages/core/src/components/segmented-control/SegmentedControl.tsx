import { forwardRef, useId, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import { SegmentedControlContext, useSegmentedControlContext } from './SegmentedControlContext.js';
import type { SegmentedControlProps, SegmentProps } from './SegmentedControl.types.js';

function getOrderedSegments(segments: Map<string, HTMLButtonElement>) {
  return [...segments.entries()]
    .filter(([, element]) => !element.disabled)
    .sort(([, first], [, second]) => {
      const position = first.compareDocumentPosition(second);
      return position & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
}

const Segment = forwardRef<HTMLButtonElement, SegmentProps>(function Segment(
  { children, className, disabled, icon, onClick, onKeyDown, value, ...buttonProps },
  ref,
) {
  const control = useSegmentedControlContext();
  const localRef = useRef<HTMLButtonElement>(null);
  const isSelected = control.value === value;
  const resolvedClassName = [
    'chayns-segmented-control__segment',
    isSelected ? 'chayns-segmented-control__segment--selected' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  useLayoutEffect(() => {
    if (localRef.current === null) {
      return undefined;
    }

    return control.registerSegment(value, localRef.current);
  }, [control, value]);

  function setRef(element: HTMLButtonElement | null) {
    localRef.current = element;

    if (typeof ref === 'function') {
      ref(element);
    } else if (ref !== null) {
      ref.current = element;
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) {
      return;
    }

    const keys = ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      control.moveFocus(value, event.key);
    }
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (!event.defaultPrevented) {
      control.selectValue(value);
    }
  }

  return (
    <button
      {...buttonProps}
      aria-checked={isSelected}
      className={resolvedClassName}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      ref={setRef}
      role="radio"
      tabIndex={isSelected ? 0 : -1}
      type="button"
    >
      {icon ? <ButtonIcon icon={icon} /> : null}
      {children}
    </button>
  );
});

const SegmentedControlRoot = forwardRef<HTMLDivElement, SegmentedControlProps>(
  function SegmentedControlRoot(
    { children, className, defaultValue, label, onValueChange, value, ...rootProps },
    ref,
  ) {
    const labelId = useId();
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const segments = useRef(new Map<string, HTMLButtonElement>());
    const segmentsElement = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ offset: 0, width: 0 });
    const selectedValue = value ?? uncontrolledValue ?? '';
    const resolvedClassName = ['chayns-segmented-control', className].filter(Boolean).join(' ');

    function selectValue(nextValue: string) {
      if (value === undefined) {
        setUncontrolledValue(nextValue);
      }

      onValueChange?.(nextValue);
    }

    function registerSegment(segmentValue: string, element: HTMLButtonElement) {
      segments.current.set(segmentValue, element);

      return () => {
        segments.current.delete(segmentValue);
      };
    }

    function moveFocus(currentValue: string, key: string) {
      const enabledSegments = getOrderedSegments(segments.current);
      const currentIndex = enabledSegments.findIndex(
        ([segmentValue]) => segmentValue === currentValue,
      );

      if (currentIndex === -1 || enabledSegments.length === 0) {
        return;
      }

      let targetIndex = currentIndex;

      if (key === 'Home') {
        targetIndex = 0;
      } else if (key === 'End') {
        targetIndex = enabledSegments.length - 1;
      } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
        targetIndex = (currentIndex - 1 + enabledSegments.length) % enabledSegments.length;
      } else if (key === 'ArrowRight' || key === 'ArrowDown') {
        targetIndex = (currentIndex + 1) % enabledSegments.length;
      }

      const nextSegment = enabledSegments[targetIndex];

      if (nextSegment === undefined) {
        return;
      }

      const [nextValue, nextElement] = nextSegment;
      selectValue(nextValue);
      nextElement.focus();
    }

    useLayoutEffect(() => {
      const container = segmentsElement.current;
      const selectedSegment = segments.current.get(selectedValue);

      if (container === null || selectedSegment === undefined) {
        return undefined;
      }

      const observedContainer = container;
      const observedSegment = selectedSegment;

      function updateIndicator() {
        const paddingInlineStart = Number.parseFloat(
          window.getComputedStyle(observedContainer).paddingInlineStart,
        );

        setIndicator({
          offset:
            observedSegment.offsetLeft -
            (Number.isNaN(paddingInlineStart) ? 0 : paddingInlineStart),
          width: observedSegment.offsetWidth,
        });
      }

      updateIndicator();

      if (typeof ResizeObserver === 'undefined') {
        return undefined;
      }

      const observer = new ResizeObserver(updateIndicator);
      observer.observe(observedContainer);

      return () => observer.disconnect();
    }, [selectedValue]);

    return (
      <SegmentedControlContext.Provider
        value={{ moveFocus, registerSegment, selectValue, value: selectedValue }}
      >
        <div
          {...rootProps}
          aria-labelledby={labelId}
          className={resolvedClassName}
          ref={ref}
          role="radiogroup"
        >
          <span className="chayns-segmented-control__label" id={labelId}>
            {label}
          </span>
          <div className="chayns-segmented-control__segments" ref={segmentsElement}>
            <span
              aria-hidden="true"
              className="chayns-segmented-control__indicator"
              style={{ transform: `translateX(${indicator.offset}px)`, width: indicator.width }}
            />
            {children}
          </div>
        </div>
      </SegmentedControlContext.Provider>
    );
  },
);

const SegmentedControl = Object.assign(SegmentedControlRoot, { Segment });

export default SegmentedControl;
