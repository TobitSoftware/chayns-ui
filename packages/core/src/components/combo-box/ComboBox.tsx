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
import type { ChangeEvent, FocusEvent, KeyboardEvent, ReactElement, ReactNode } from 'react';

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
  { children, className, value, ...optionProps },
  ref,
) {
  const comboBox = useComboBoxContext();
  const isVisible = comboBox.visibleValues.includes(value);
  const isSelected = comboBox.isSelected(value);
  const resolvedClassName = [
    'chayns-combo-box__option',
    isSelected ? 'chayns-combo-box__option--selected' : '',
    comboBox.activeValue === value ? 'chayns-combo-box__option--active' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (!isVisible) {
    return null;
  }

  return (
    <div
      {...optionProps}
      aria-selected={isSelected}
      className={resolvedClassName}
      id={comboBox.optionId(value)}
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => comboBox.select(value)}
      ref={ref}
      role="option"
    >
      {children}
    </div>
  );
});

const ComboBoxRoot = forwardRef<HTMLInputElement, ComboBoxProps>(function ComboBoxRoot(props, ref) {
  const {
    'aria-label': ariaLabel,
    children,
    className,
    defaultValue,
    disabled,
    id,
    multiple = false,
    onValueChange,
    openOnFocus = true,
    placeholder,
    value,
    ...inputProps
  } = props;
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const optionElements = useMemo(() => getOptionElements(children), [children]);
  const optionMap = useMemo(
    () => new Map(optionElements.map((option) => [option.props.value, option])),
    [optionElements],
  );
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
  const [inputText, setInputText] = useState(
    multiple ? '' : ((defaultValue as string | undefined) ?? ''),
  );
  const [open, setOpen] = useState(false);
  const [activeValue, setActiveValue] = useState<string>();
  const isControlled = value !== undefined;
  const selectedValue = multiple ? '' : isControlled ? (value as string) : uncontrolledValue;
  const selectedValues = multiple ? (isControlled ? controlledValues : uncontrolledValues) : [];
  const normalizedFilter = inputText.trim().toLocaleLowerCase();
  const visibleValues = optionElements
    .filter((option) => {
      const label = getOptionLabel(option.props.children).toLocaleLowerCase();
      return normalizedFilter === '' || label.includes(normalizedFilter);
    })
    .map((option) => option.props.value);

  useEffect(() => {
    if (open && activeValue === undefined) {
      setActiveValue(visibleValues[0]);
    }
  }, [activeValue, open, visibleValues]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function closeOnOutsidePress(event: PointerEvent) {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        commitInput();
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  });

  function setInputElement(element: HTMLInputElement | null) {
    inputRef.current = element;

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

  function commitInput() {
    if (!multiple && inputText !== selectedValue) {
      emitValue(inputText);
    }
  }

  function select(nextValue: string) {
    if (multiple) {
      const nextValues = selectedValues.includes(nextValue)
        ? selectedValues.filter((selected) => selected !== nextValue)
        : [...selectedValues, nextValue];
      emitValues(nextValues);
      setInputText('');
      setActiveValue(undefined);
      setOpen(true);
      return;
    }

    const option = optionMap.get(nextValue);
    emitValue(nextValue);
    setInputText(option === undefined ? nextValue : getOptionLabel(option.props.children));
    setActiveValue(undefined);
    setOpen(false);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setInputText(event.target.value);
    setActiveValue(undefined);
    setOpen(true);
    props.onChange?.(event);
  }

  function handleBlur(event: FocusEvent<HTMLInputElement>) {
    props.onBlur?.(event);
    if (!rootRef.current?.contains(event.relatedTarget)) {
      commitInput();
      setOpen(false);
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    const currentIndex = activeValue === undefined ? -1 : visibleValues.indexOf(activeValue);
    let nextIndex = currentIndex;

    if (event.key === 'ArrowDown') nextIndex = Math.min(currentIndex + 1, visibleValues.length - 1);
    if (event.key === 'ArrowUp') nextIndex = Math.max(currentIndex - 1, 0);
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = visibleValues.length - 1;

    if (nextIndex !== currentIndex && visibleValues[nextIndex] !== undefined) {
      event.preventDefault();
      setActiveValue(visibleValues[nextIndex]);
      setOpen(true);
    } else if (event.key === 'Enter' && activeValue !== undefined) {
      event.preventDefault();
      select(activeValue);
    } else if (event.key === 'Escape') {
      event.preventDefault();
      setInputText(multiple ? '' : selectedValue);
      setActiveValue(undefined);
      setOpen(false);
    }

    props.onKeyDown?.(event);
  }

  const resolvedClassName = ['chayns-combo-box', open ? 'chayns-combo-box--open' : '']
    .filter(Boolean)
    .join(' ');
  const describedLabel = placeholder === undefined ? undefined : `${inputId}-label`;
  const selectedOptions = selectedValues
    .map((selected) => optionMap.get(selected))
    .filter((option): option is ReactElement<ComboBoxOptionProps> => option !== undefined);
  const inputClassName = ['chayns-combo-box__input', className].filter(Boolean).join(' ');

  return (
    <ComboBoxContext.Provider
      value={{
        activeValue,
        close: () => setOpen(false),
        inputText,
        isSelected: (optionValue) =>
          multiple ? selectedValues.includes(optionValue) : selectedValue === optionValue,
        multiple,
        optionId: (optionValue) => `${listboxId}-${optionValue.replace(/[^a-zA-Z0-9_-]/g, '-')}`,
        select,
        visibleValues,
      }}
    >
      <div className={resolvedClassName} ref={rootRef}>
        {multiple ? (
          <div className="chayns-combo-box__chips" aria-hidden="true">
            {selectedOptions.map((option) => (
              <span className="chayns-combo-box__chip" key={option.props.value}>
                {option.props.children}
              </span>
            ))}
          </div>
        ) : null}
        <input
          {...inputProps}
          aria-activedescendant={
            open && activeValue
              ? `${listboxId}-${activeValue.replace(/[^a-zA-Z0-9_-]/g, '-')}`
              : undefined
          }
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-expanded={open}
          aria-label={ariaLabel}
          className={inputClassName}
          disabled={disabled}
          id={inputId}
          onBlur={handleBlur}
          onChange={handleChange}
          onFocus={() => openOnFocus && setOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder === undefined ? undefined : ' '}
          ref={setInputElement}
          role="combobox"
          value={inputText}
        />
        {placeholder !== undefined ? (
          <label className="chayns-combo-box__label" htmlFor={inputId} id={describedLabel}>
            {placeholder}
          </label>
        ) : null}
        {open ? (
          <div
            aria-multiselectable={multiple || undefined}
            className="chayns-combo-box__popup"
            id={listboxId}
            role="listbox"
          >
            {children}
          </div>
        ) : null}
      </div>
    </ComboBoxContext.Provider>
  );
});

const ComboBox = Object.assign(ComboBoxRoot, { Option });

export default ComboBox;
