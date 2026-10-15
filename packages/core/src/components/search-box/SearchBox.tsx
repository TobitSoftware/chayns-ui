import { forwardRef, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { ChangeEvent, ForwardedRef, KeyboardEvent, MouseEvent, ReactElement } from 'react';

import { useOverlayPosition } from '../../hooks/useOverlayPosition.js';
import { composeNativeRefs } from '../../utils/native-ref.js';
import type { SearchBoxItem, SearchBoxProps } from './SearchBox.types.js';

const POPUP_TRANSITION_DURATION = 180;

function ensureUniqueItems<T>(items: SearchBoxItem<T>[], name: string) {
  const ids = new Set<string>();

  for (const { id } of items) {
    if (!id || ids.has(id)) {
      throw new Error(`SearchBox ${name} must contain unique, non-empty IDs.`);
    }

    ids.add(id);
  }
}

function SearchBoxInner<T>(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className,
    disabled = false,
    getItemLabel,
    getRemoveItemLabel,
    id,
    inputValue,
    onBlur,
    onChange,
    onFocus,
    onInputValueChange,
    onKeyDown,
    onRemove,
    onSelect,
    placeholder,
    readOnly = false,
    renderSelectedItem,
    renderSuggestion,
    selectedItems,
    suggestions,
    suggestionsLabel,
    ...inputProps
  }: SearchBoxProps<T>,
  ref: ForwardedRef<HTMLInputElement>,
) {
  ensureUniqueItems(selectedItems, 'selectedItems');
  ensureUniqueItems(suggestions, 'suggestions');

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;
  const suggestionsLabelId = `${listboxId}-label`;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<number | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [activeId, setActiveId] = useState<string>();
  const selectedIds = useMemo(
    () => new Set(selectedItems.map(({ id: itemId }) => itemId)),
    [selectedItems],
  );
  const availableSuggestions = useMemo(
    () => suggestions.filter(({ id: itemId }) => !selectedIds.has(itemId)),
    [selectedIds, suggestions],
  );
  const activeSuggestion = availableSuggestions.find(({ id: itemId }) => itemId === activeId);

  useOverlayPosition(popupRef, rootRef.current, open || closing, 'bottom', 4, true);

  if (ariaLabel === undefined && ariaLabelledBy === undefined) {
    throw new Error('SearchBox requires aria-label or aria-labelledby.');
  }

  useEffect(() => {
    return () => window.clearTimeout(closeTimeoutRef.current);
  }, []);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target) &&
        !popupRef.current?.contains(event.target)
      ) {
        closePopup();
      }
    };

    document.addEventListener('pointerdown', closeOnOutsidePress);
    return () => document.removeEventListener('pointerdown', closeOnOutsidePress);
  });

  function closePopup() {
    if (!open) {
      return;
    }

    setOpen(false);
    setActiveId(undefined);
    setClosing(true);
    closeTimeoutRef.current = window.setTimeout(() => setClosing(false), POPUP_TRANSITION_DURATION);
  }

  function openPopup() {
    if (disabled || readOnly || suggestions.length === 0) {
      return;
    }

    window.clearTimeout(closeTimeoutRef.current);
    setOpen(true);
    setClosing(false);
    setActiveId((current) =>
      availableSuggestions.some(({ id: itemId }) => itemId === current)
        ? current
        : availableSuggestions[0]?.id,
    );
  }

  function moveActive(direction: 1 | -1) {
    if (availableSuggestions.length === 0) {
      return;
    }

    const currentIndex =
      activeId === undefined
        ? -1
        : availableSuggestions.findIndex(({ id: itemId }) => itemId === activeId);
    const nextIndex =
      currentIndex === -1
        ? direction === 1
          ? 0
          : availableSuggestions.length - 1
        : (currentIndex + direction + availableSuggestions.length) % availableSuggestions.length;
    setActiveId(availableSuggestions[nextIndex]?.id);
  }

  function selectSuggestion(suggestion: SearchBoxItem<T>) {
    if (selectedIds.has(suggestion.id) || disabled || readOnly) {
      return;
    }

    onSelect(suggestion);
    closePopup();
    queueMicrotask(() => inputRef.current?.focus());
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange?.(event);
    if (event.defaultPrevented) {
      return;
    }

    onInputValueChange(event.target.value);
    openPopup();
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    onFocus?.(event);
    if (!event.defaultPrevented) {
      openPopup();
    }
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    onKeyDown?.(event);
    if (event.defaultPrevented) {
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!open) {
        openPopup();
      } else {
        moveActive(1);
      }
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!open) {
        openPopup();
      } else {
        moveActive(-1);
      }
    } else if (event.key === 'Enter' && open && activeSuggestion !== undefined) {
      event.preventDefault();
      selectSuggestion(activeSuggestion);
    } else if (event.key === 'Escape' && open) {
      event.preventDefault();
      closePopup();
    } else if (event.key === 'Tab' && open) {
      closePopup();
    } else if (event.key === 'Backspace' && inputValue.length === 0 && selectedItems.length > 0) {
      onRemove(selectedItems.at(-1)!);
    }
  }

  const setInputRef = useMemo(() => composeNativeRefs(inputRef, ref), [ref]);

  return (
    <div
      className={[
        'chayns-search-box',
        open ? 'chayns-search-box--open' : '',
        disabled ? 'chayns-search-box--disabled' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      ref={rootRef}
    >
      <span className="chayns-search-box__placeholder">{placeholder}</span>
      {selectedItems.map((entry) => (
        <span className="chayns-search-box__item" key={entry.id}>
          <span className="chayns-search-box__item-content">{renderSelectedItem(entry.item)}</span>
          <button
            aria-label={getRemoveItemLabel(entry.item)}
            className="chayns-search-box__remove"
            disabled={disabled || readOnly}
            onClick={() => onRemove(entry)}
            type="button"
          >
            <i aria-hidden="true" className="far fa-xmark" />
          </button>
        </span>
      ))}
      <input
        {...inputProps}
        aria-activedescendant={
          activeSuggestion === undefined
            ? undefined
            : `${listboxId}-${encodeURIComponent(activeSuggestion.id)}`
        }
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={['chayns-search-box__input', className].filter(Boolean).join(' ')}
        disabled={disabled}
        id={inputId}
        onBlur={onBlur}
        onChange={handleChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        readOnly={readOnly}
        ref={setInputRef}
        role="combobox"
        value={inputValue}
      />
      {open || closing
        ? typeof document !== 'undefined'
          ? createPortal(
              <div
                aria-hidden={closing || undefined}
                aria-labelledby={suggestionsLabel === undefined ? undefined : suggestionsLabelId}
                className="chayns-search-box__popup"
                data-state={closing ? 'closed' : 'open'}
                id={listboxId}
                inert={closing || undefined}
                ref={popupRef}
                role="listbox"
              >
                {suggestionsLabel === undefined ? null : (
                  <div className="chayns-search-box__suggestions-label" id={suggestionsLabelId}>
                    {suggestionsLabel}
                  </div>
                )}
                {suggestions.map((entry) => {
                  const selected = selectedIds.has(entry.id);
                  const active = entry.id === activeId;

                  return (
                    <div
                      aria-disabled={selected || undefined}
                      aria-label={getItemLabel(entry.item)}
                      aria-selected={selected}
                      className={[
                        'chayns-search-box__option',
                        active ? 'chayns-search-box__option--active' : '',
                        selected ? 'chayns-search-box__option--selected' : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      id={`${listboxId}-${encodeURIComponent(entry.id)}`}
                      key={entry.id}
                      onClick={() => selectSuggestion(entry)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          selectSuggestion(entry);
                        }
                      }}
                      onMouseDown={(event: MouseEvent<HTMLDivElement>) => event.preventDefault()}
                      role="option"
                      tabIndex={-1}
                    >
                      <span className="chayns-search-box__option-content">
                        {renderSuggestion(entry.item)}
                      </span>
                      {selected ? <i aria-hidden="true" className="far fa-check" /> : null}
                    </div>
                  );
                })}
              </div>,
              document.body,
            )
          : null
        : null}
    </div>
  );
}

SearchBoxInner.displayName = 'SearchBoxInner';

interface SearchBoxComponent {
  <T>(props: SearchBoxProps<T> & { ref?: ForwardedRef<HTMLInputElement> }): ReactElement;
  displayName: string;
}

const SearchBox = forwardRef(SearchBoxInner) as SearchBoxComponent;

SearchBox.displayName = 'SearchBox';

export default SearchBox;
