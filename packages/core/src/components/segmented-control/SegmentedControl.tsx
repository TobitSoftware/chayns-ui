import { forwardRef, useCallback, useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';

import { composeNativeRefs } from '../../utils/native-ref.js';
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

  const registerSegment = control.registerSegment;
  const notify = control.notify;
  useLayoutEffect(() => notify(), [disabled, notify]);

  useLayoutEffect(() => {
    if (localRef.current === null) {
      return undefined;
    }

    return registerSegment(value, localRef.current);
  }, [registerSegment, value]);

  const setRef = useMemo(() => composeNativeRefs(localRef, ref), [ref]);

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
      tabIndex={control.entryValue === value ? 0 : -1}
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
    const [registryVersion, setRegistryVersion] = useState(0);
    const [selection, setSelection] = useState({ valid: true, entry: value ?? defaultValue });
    const lastProposal = useRef<{ value: string; next: string } | undefined>(undefined);
    const selectedValue = value ?? uncontrolledValue ?? '';
    const resolvedClassName = ['chayns-segmented-control', className].filter(Boolean).join(' ');

    const selectValue = useCallback(
      (nextValue: string) => {
        if (value === undefined) {
          setUncontrolledValue(nextValue);
        }

        onValueChange?.(nextValue);
      },
      [onValueChange, value],
    );

    const notify = useCallback(() => setRegistryVersion((current) => current + 1), []);
    const registerSegment = useCallback(
      (segmentValue: string, element: HTMLButtonElement) => {
        segments.current.set(segmentValue, element);
        notify();

        return () => {
          segments.current.delete(segmentValue);
          notify();
        };
      },
      [notify],
    );

    useLayoutEffect(() => {
      const enabled = getOrderedSegments(segments.current);
      const valid = enabled.some(([segmentValue]) => segmentValue === selectedValue);
      const next = valid ? selectedValue : enabled[0]?.[0];
      setSelection((current) =>
        current.valid === valid && current.entry === next ? current : { valid, entry: next },
      );
      if (valid || next === undefined) {
        lastProposal.current = undefined;
        return;
      }
      if (lastProposal.current?.value === selectedValue && lastProposal.current?.next === next)
        return;
      lastProposal.current = { value: selectedValue, next };
      selectValue(next);
    }, [children, registryVersion, selectedValue, selectValue]);

    const moveFocus = useCallback(
      (currentValue: string, key: string) => {
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
      },
      [selectValue],
    );

    useLayoutEffect(() => {
      const container = segmentsElement.current;
      const selectedSegment = segments.current.get(selectedValue);

      if (container === null || selectedSegment === undefined || !selection.valid) {
        setIndicator((current) => (current.width === 0 ? current : { offset: 0, width: 0 }));
        return undefined;
      }

      const observedContainer = container;
      const observedSegment = selectedSegment;

      function updateIndicator() {
        const paddingInlineStart = Number.parseFloat(
          window.getComputedStyle(observedContainer).paddingInlineStart,
        );

        const nextIndicator = {
          offset:
            observedSegment.offsetLeft -
            (Number.isNaN(paddingInlineStart) ? 0 : paddingInlineStart),
          width: observedSegment.offsetWidth,
        };
        setIndicator((current) =>
          current.offset === nextIndicator.offset && current.width === nextIndicator.width
            ? current
            : nextIndicator,
        );
      }

      updateIndicator();

      if (typeof ResizeObserver === 'undefined') {
        return undefined;
      }

      const observer = new ResizeObserver(updateIndicator);
      observer.observe(observedContainer);
      observer.observe(observedSegment);

      return () => observer.disconnect();
    }, [selectedValue, selection.valid]);

    const contextValue = useMemo(
      () => ({
        moveFocus,
        registerSegment,
        selectValue,
        notify,
        entryValue: selection.entry,
        value: selection.valid ? selectedValue : '',
      }),
      [moveFocus, notify, registerSegment, selectValue, selectedValue, selection],
    );

    return (
      <SegmentedControlContext.Provider value={contextValue}>
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

Segment.displayName = 'SegmentedControl.Segment';
SegmentedControlRoot.displayName = 'SegmentedControl';

export default SegmentedControl;
