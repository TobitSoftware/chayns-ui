import {
  Children,
  forwardRef,
  Fragment,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties, KeyboardEvent, MouseEvent, ReactElement, ReactNode } from 'react';

import ButtonIcon from '../button/button-icon/ButtonIcon.js';
import { ComboBoxContext, getOptionLabel, useComboBoxContext } from './ComboBoxContext.js';
import type { ComboBoxOptionProps, ComboBoxProps } from './ComboBox.types.js';

function getOptionElements(children: ComboBoxProps['children']) {
  const options: ReactElement<ComboBoxOptionProps>[] = [];

  Children.forEach(children, (child) => {
    if (!isValidElement(child)) {
      return;
    }

    const element = child as ReactElement<{ children?: ReactNode; value?: string }>;

    if (element.type === Fragment) {
      options.push(...getOptionElements(element.props.children));
    } else if (typeof element.props.value === 'string') {
      options.push(element as ReactElement<ComboBoxOptionProps>);
    }
  });

  return options;
}

const Option = forwardRef<HTMLDivElement, ComboBoxOptionProps>(function Option(
  { children, className, disabled = false, value, ...optionProps },
  ref,
) {
  const comboBox = useComboBoxContext();
  const isSelected = comboBox.isSelected(value);
  const isActive = comboBox.activeValue === value;
  const resolvedClassName = [
    'chayns-combo-box__option',
    isSelected ? 'chayns-combo-box__option--selected' : '',
    isActive ? 'chayns-combo-box__option--active' : '',
    disabled ? 'chayns-combo-box__option--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      {...optionProps}
      aria-disabled={disabled || undefined}
      aria-selected={isSelected}
      className={resolvedClassName}
      id={comboBox.optionId(value)}
      onClick={(event) => {
        optionProps.onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          comboBox.select(value);
        }
      }}
      onKeyDown={(event) => {
        optionProps.onKeyDown?.(event);
        if (!event.defaultPrevented && !disabled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          comboBox.select(value);
        }
      }}
      ref={ref}
      role="option"
      tabIndex={isActive && !disabled ? 0 : -1}
    >
      {comboBox.multiple ? (
        <span
          aria-hidden="true"
          className="chayns-combo-box__checkbox"
          data-checked={isSelected || undefined}
        />
      ) : null}
      {children}
      {!comboBox.multiple && isSelected ? (
        <span aria-hidden="true" className="chayns-combo-box__checkmark">
          <i className="fas fa-check" />
        </span>
      ) : null}
    </div>
  );
});

const ComboBoxRoot = forwardRef<HTMLButtonElement, ComboBoxProps>(
  function ComboBoxRoot(props, ref) {
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      children,
      className,
      defaultValue,
      disabled,
      id,
      multiple = false,
      onClick,
      onKeyDown,
      onValueChange,
      placeholder,
      value,
      ...buttonProps
    } = props;
    const generatedId = useId();
    const triggerId = id ?? generatedId;
    const listboxId = `${triggerId}-listbox`;
    const labelId = `${triggerId}-label`;
    const rootRef = useRef<HTMLDivElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [popupStyle, setPopupStyle] = useState<CSSProperties>();
    const optionElements = useMemo(() => getOptionElements(children), [children]);
    const optionMap = useMemo(
      () => new Map(optionElements.map((option) => [option.props.value, option])),
      [optionElements],
    );
    const focusableValues = optionElements
      .filter((option) => !option.props.disabled)
      .map((option) => option.props.value);
    const defaultValues = multiple
      ? ((defaultValue as ReactElement<ComboBoxOptionProps>[] | undefined)?.map(
          (option) => option.props.value,
        ) ?? [])
      : [];
    const controlledValues = multiple
      ? ((value as ReactElement<ComboBoxOptionProps>[] | undefined)?.map(
          (option) => option.props.value,
        ) ?? [])
      : [];
    const [uncontrolledValue, setUncontrolledValue] = useState(
      multiple ? '' : ((defaultValue as string | undefined) ?? ''),
    );
    const [uncontrolledValues, setUncontrolledValues] = useState(defaultValues);
    const [open, setOpen] = useState(false);
    const [popupMounted, setPopupMounted] = useState(false);
    const [popupClosing, setPopupClosing] = useState(false);
    const [activeValue, setActiveValue] = useState<string>();
    const isControlled = value !== undefined;
    const selectedValue = multiple ? '' : isControlled ? (value as string) : uncontrolledValue;
    const selectedValues = multiple ? (isControlled ? controlledValues : uncontrolledValues) : [];
    const selectedOptions = selectedValues
      .map((selected) => optionMap.get(selected))
      .filter((option): option is ReactElement<ComboBoxOptionProps> => option !== undefined);
    const selectedOption = optionMap.get(selectedValue);
    const displayValue = multiple
      ? selectedOptions.map((option) => getOptionLabel(option.props.children)).join(', ')
      : selectedOption === undefined
        ? ''
        : getOptionLabel(selectedOption.props.children);
    const resolvedClassName = ['chayns-combo-box', open ? 'chayns-combo-box--open' : '']
      .filter(Boolean)
      .join(' ');
    const triggerClassName = ['chayns-combo-box__trigger', className].filter(Boolean).join(' ');
    const accessibleName =
      ariaLabelledBy ??
      (ariaLabel === undefined && placeholder !== undefined ? labelId : undefined);

    if (ariaLabel === undefined && ariaLabelledBy === undefined && placeholder === undefined) {
      throw new Error('ComboBox requires placeholder, aria-label or aria-labelledby.');
    }

    useEffect(() => {
      if (open) {
        if (!popupMounted) {
          setPopupMounted(true);
          setPopupClosing(true);
          return undefined;
        }

        if (popupClosing) {
          const frame = requestAnimationFrame(() => setPopupClosing(false));
          return () => cancelAnimationFrame(frame);
        }
      } else if (popupMounted) {
        setPopupClosing(true);
      }

      return undefined;
    }, [open, popupClosing, popupMounted]);

    useEffect(() => {
      if (!open || activeValue === undefined) {
        return;
      }

      document
        .getElementById(`${listboxId}-${activeValue.replace(/[^a-zA-Z0-9_-]/g, '-')}`)
        ?.focus();
    }, [activeValue, listboxId, open, popupMounted]);

    useEffect(() => {
      if (!open) {
        return undefined;
      }

      function updatePopupPosition() {
        const trigger = triggerRef.current;
        if (!trigger) {
          return;
        }

        const { bottom, left, width } = trigger.getBoundingClientRect();
        setPopupStyle({
          insetBlockStart: `calc(${bottom}px + var(--k4))`,
          insetInlineStart: left,
          inlineSize: width,
        });
      }

      function closeOnOutsidePress(event: PointerEvent) {
        if (
          event.target instanceof Node &&
          !rootRef.current?.contains(event.target) &&
          !popupRef.current?.contains(event.target)
        ) {
          setOpen(false);
          setActiveValue(undefined);
        }
      }

      updatePopupPosition();
      window.addEventListener('resize', updatePopupPosition);
      window.addEventListener('scroll', updatePopupPosition, true);
      document.addEventListener('pointerdown', closeOnOutsidePress);
      return () => {
        window.removeEventListener('resize', updatePopupPosition);
        window.removeEventListener('scroll', updatePopupPosition, true);
        document.removeEventListener('pointerdown', closeOnOutsidePress);
      };
    }, [open]);

    function setTriggerElement(element: HTMLButtonElement | null) {
      triggerRef.current = element;

      if (typeof ref === 'function') {
        ref(element);
      } else if (ref !== null) {
        ref.current = element;
      }
    }

    function emitValue(nextValue: string) {
      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      (onValueChange as ((next: string) => void) | undefined)?.(nextValue);
    }

    function emitValues(nextValues: string[]) {
      if (!isControlled) {
        setUncontrolledValues(nextValues);
      }

      const nextOptions = nextValues
        .map((nextValue) => optionMap.get(nextValue))
        .filter((option): option is ReactElement<ComboBoxOptionProps> => option !== undefined);
      (onValueChange as ((next: ReactElement<ComboBoxOptionProps>[]) => void) | undefined)?.(
        nextOptions,
      );
    }

    function closeAndFocusTrigger() {
      setOpen(false);
      setActiveValue(undefined);
      triggerRef.current?.focus();
    }

    function select(nextValue: string) {
      if (multiple) {
        const nextValues = selectedValues.includes(nextValue)
          ? selectedValues.filter((selected) => selected !== nextValue)
          : [...selectedValues, nextValue];
        emitValues(nextValues);
      } else {
        emitValue(nextValue);
      }

      closeAndFocusTrigger();
    }

    function openPopup() {
      if (disabled || focusableValues.length === 0) {
        return;
      }

      const selectedFocusableValue = focusableValues.find((optionValue) =>
        multiple ? selectedValues.includes(optionValue) : selectedValue === optionValue,
      );
      setActiveValue(selectedFocusableValue ?? focusableValues[0]);
      setOpen(true);
    }

    function moveActive(direction: 1 | -1) {
      if (focusableValues.length === 0) {
        return;
      }

      const currentIndex = activeValue === undefined ? -1 : focusableValues.indexOf(activeValue);
      const nextIndex =
        currentIndex === -1
          ? direction === 1
            ? 0
            : focusableValues.length - 1
          : (currentIndex + direction + focusableValues.length) % focusableValues.length;
      setActiveValue(focusableValues[nextIndex]);
    }

    function handleTriggerClick(event: MouseEvent<HTMLButtonElement>) {
      onClick?.(event);
      if (!event.defaultPrevented) {
        if (open) {
          closeAndFocusTrigger();
        } else {
          openPopup();
        }
      }
    }

    function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
      onKeyDown?.(event);
      if (event.defaultPrevented) {
        return;
      }

      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        (event.key === 'ArrowDown' && event.altKey)
      ) {
        event.preventDefault();
        openPopup();
      }
    }

    function handleListboxKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveActive(1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        moveActive(-1);
      } else if (event.key === 'Home') {
        event.preventDefault();
        setActiveValue(focusableValues[0]);
      } else if (event.key === 'End') {
        event.preventDefault();
        setActiveValue(focusableValues.at(-1));
      } else if (event.key === 'Escape') {
        event.preventDefault();
        closeAndFocusTrigger();
      } else if (event.key === 'Tab') {
        setOpen(false);
        setActiveValue(undefined);
      }
    }

    return (
      <ComboBoxContext.Provider
        value={{
          activeValue,
          isSelected: (optionValue) =>
            multiple ? selectedValues.includes(optionValue) : selectedValue === optionValue,
          multiple,
          optionId: (optionValue) => `${listboxId}-${optionValue.replace(/[^a-zA-Z0-9_-]/g, '-')}`,
          select,
        }}
      >
        <div className={resolvedClassName} ref={rootRef}>
          <button
            {...buttonProps}
            aria-controls={listboxId}
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-label={ariaLabel}
            aria-labelledby={accessibleName}
            className={triggerClassName}
            disabled={disabled}
            id={triggerId}
            onClick={handleTriggerClick}
            onKeyDown={handleTriggerKeyDown}
            ref={setTriggerElement}
            type="button"
          >
            <span className="chayns-combo-box__value">{displayValue || placeholder}</span>
            <span aria-hidden="true" className="chayns-combo-box__chevron">
              <ButtonIcon icon="fa-chevron-down" />
            </span>
          </button>
          {placeholder !== undefined ? (
            <span className="chayns-combo-box__label" id={labelId}>
              {placeholder}
            </span>
          ) : null}
          {popupMounted && typeof document !== 'undefined'
            ? createPortal(
                <div
                  aria-hidden={!open && popupClosing ? true : undefined}
                  aria-multiselectable={multiple || undefined}
                  className="chayns-combo-box__popup"
                  data-state={popupClosing ? 'closed' : 'open'}
                  id={listboxId}
                  inert={!open && popupClosing}
                  onKeyDown={handleListboxKeyDown}
                  onTransitionEnd={(event) => {
                    if (popupClosing && event.propertyName === 'opacity') {
                      setPopupMounted(false);
                      setPopupClosing(false);
                    }
                  }}
                  ref={popupRef}
                  role="listbox"
                  style={popupStyle}
                  tabIndex={-1}
                >
                  {children}
                </div>,
                document.body,
              )
            : null}
        </div>
      </ComboBoxContext.Provider>
    );
  },
);

const ComboBox = Object.assign(ComboBoxRoot, { Option });

export default ComboBox;
