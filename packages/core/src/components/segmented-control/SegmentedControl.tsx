import { forwardRef, useId, useLayoutEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

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
  { children, className, disabled, value, ...buttonProps },
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
    const keys = ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home'];

    if (keys.includes(event.key)) {
      event.preventDefault();
      control.moveFocus(value, event.key);
    }
  }

  return (
    <button
      {...buttonProps}
      aria-checked={isSelected}
      className={resolvedClassName}
      disabled={disabled}
      onClick={() => control.selectValue(value)}
      onKeyDown={handleKeyDown}
      ref={setRef}
      role="radio"
      tabIndex={isSelected ? 0 : -1}
      type="button"
    >
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
          <div className="chayns-segmented-control__segments">{children}</div>
        </div>
      </SegmentedControlContext.Provider>
    );
  },
);

const SegmentedControl = Object.assign(SegmentedControlRoot, { Segment });

export default SegmentedControl;
