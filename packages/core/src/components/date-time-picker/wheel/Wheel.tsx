import { useLayoutEffect, useId, useRef } from 'react';
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';

const WHEEL_LOOP_CYCLES = 11;
const WHEEL_CENTER_CYCLE = Math.floor(WHEEL_LOOP_CYCLES / 2);

interface WheelOption {
  label: string;
  value: number;
}

interface WheelProps {
  ariaLabel: string;
  onEscape: () => void;
  onSelect: (value: number) => void;
  options: readonly WheelOption[];
  selected: number;
}

function Wheel({ ariaLabel, onEscape, onSelect, options, selected }: WheelProps) {
  const wheelId = useId();
  const wheelRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const dragRef = useRef<{ pointerId: number; scrollTop: number; startY: number } | undefined>(
    undefined,
  );
  const ignoreClickRef = useRef(false);

  useLayoutEffect(() => {
    const wheel = wheelRef.current;
    const itemHeight = selectedRef.current?.offsetHeight;
    const selectedIndex = options.findIndex((option) => option.value === selected);
    if (!wheel || !itemHeight || selectedIndex < 0) return;

    wheel.scrollTop = (WHEEL_CENTER_CYCLE * options.length + selectedIndex) * itemHeight;
    applyPerspective();
  }, [options, selected]);

  function applyPerspective() {
    const wheel = wheelRef.current;
    const itemHeight = selectedRef.current?.offsetHeight;
    if (!wheel || !itemHeight) return;

    const position = wheel.scrollTop / itemHeight;
    for (const option of wheel.querySelectorAll<HTMLButtonElement>(
      '.chayns-date-time-picker__wheel-option',
    )) {
      const index = Number(option.dataset.wheelIndex);
      const distance = Math.max(-2.5, Math.min(2.5, index - position));
      const progress = Math.min(1, Math.abs(distance) / 2.5);

      option.style.color = progress < 0.2 ? 'var(--text)' : 'var(--text-3)';
      option.style.fontWeight = progress < 0.2 ? '600' : '400';
      option.style.opacity = String(1 - progress * 0.7);
      option.style.transform = `rotateX(${distance * 22}deg) scale(${1 - progress * 0.24})`;
    }
  }

  function selectCenteredValue() {
    const wheel = wheelRef.current;
    const itemHeight = selectedRef.current?.offsetHeight;
    if (!wheel || !itemHeight) return;

    const index = Math.round(wheel.scrollTop / itemHeight);
    const option = options[((index % options.length) + options.length) % options.length];
    if (option !== undefined && option.value !== selected) onSelect(option.value);
  }

  function handleScroll() {
    const wheel = wheelRef.current;
    const itemHeight = selectedRef.current?.offsetHeight;
    if (!wheel || !itemHeight) return;

    const index = Math.round(wheel.scrollTop / itemHeight);
    const normalizedIndex = ((index % options.length) + options.length) % options.length;
    if (index < options.length * 2 || index >= options.length * (WHEEL_LOOP_CYCLES - 2)) {
      wheel.scrollTop = (WHEEL_CENTER_CYCLE * options.length + normalizedIndex) * itemHeight;
    }

    applyPerspective();
    selectCenteredValue();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      onEscape();
      return;
    }

    const index = options.findIndex((option) => option.value === selected);
    let nextIndex = index;
    if (event.key === 'ArrowDown') nextIndex = Math.min(index + 1, options.length - 1);
    if (event.key === 'ArrowUp') nextIndex = Math.max(index - 1, 0);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = options.length - 1;
    const nextOption = options[nextIndex];
    if (nextIndex !== index && nextOption !== undefined) {
      event.preventDefault();
      onSelect(nextOption.value);
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    event.preventDefault();
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    dragRef.current = {
      pointerId: event.pointerId,
      scrollTop: event.currentTarget.scrollTop,
      startY: event.clientY,
    };
    ignoreClickRef.current = false;
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;
    const distance = event.clientY - drag.startY;
    if (Math.abs(distance) > 3) {
      ignoreClickRef.current = true;
      event.currentTarget.scrollTop = drag.scrollTop - distance;
    }
  }

  function handlePointerUp(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = undefined;
    if (typeof event.currentTarget.releasePointerCapture === 'function') {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    selectCenteredValue();
  }

  return (
    <div
      aria-activedescendant={`${wheelId}-${selected}`}
      aria-label={ariaLabel}
      className="chayns-date-time-picker__wheel"
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerCancel={handlePointerUp}
      onPointerUp={handlePointerUp}
      onScroll={handleScroll}
      ref={wheelRef}
      role="listbox"
      tabIndex={0}
    >
      <span aria-hidden="true" className="chayns-date-time-picker__wheel-sizer">
        {options.map((option) => (
          <span className="chayns-date-time-picker__wheel-sizer-option" key={option.value}>
            {option.label}
          </span>
        ))}
      </span>
      {Array.from({ length: WHEEL_LOOP_CYCLES }, (_, cycle) =>
        options.map((option, optionIndex) => (
          <button
            aria-hidden={cycle !== WHEEL_CENTER_CYCLE || undefined}
            aria-selected={option.value === selected}
            id={cycle === WHEEL_CENTER_CYCLE ? `${wheelId}-${option.value}` : undefined}
            className="chayns-date-time-picker__wheel-option"
            data-wheel-index={cycle * options.length + optionIndex}
            key={`${cycle}-${option.value}`}
            onClick={(event) => {
              if (ignoreClickRef.current) {
                event.preventDefault();
                event.stopPropagation();
                ignoreClickRef.current = false;
                return;
              }
              onSelect(option.value);
            }}
            ref={
              cycle === WHEEL_CENTER_CYCLE && option.value === selected ? selectedRef : undefined
            }
            role="option"
            tabIndex={-1}
            type="button"
          >
            {option.label}
          </button>
        )),
      )}
    </div>
  );
}

Object.assign(Wheel, { displayName: 'DateTimePicker.Wheel' });
export default Wheel;
