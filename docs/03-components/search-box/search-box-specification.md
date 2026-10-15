---
{
  "name": "SearchBox",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "ready",
  "useWhen": [
    "Select externally supplied items while filtering externally supplied suggestions by typed text."
  ],
  "doNotUseWhen": [
    "Do not use for unrestricted free text, simple known-option selection, or a business-specific person finder that owns data retrieval."
  ],
  "alternatives": [
    "TextField",
    "ComboBox"
  ],
  "combinations": [
    "Avatar"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-15",
  "stories": [
    "Core/SearchBox:RecipientSelection"
  ]
}
---
# SearchBox — Component Specification

## Purpose

SearchBox is a generic controlled multi-selection input. Applications provide both selected items and filtered suggestions, own all data retrieval and filtering, and render item content through named render props. SearchBox owns the input, dropdown, keyboard interaction, option state, and removable selected-item presentation. It does not create items from free text, retrieve data, debounce requests, or provide business-specific item UI.

## Use When

Use SearchBox when users select one or more externally supplied items while typing a query that the application uses to update suggestions. The recipient-selection story is an example composition, not a person-specific component contract.

## Do Not Use When

Use TextField for free text. Use ComboBox for the existing non-editable known-option selection contract. A data-owning person finder remains a Business component built from SearchBox and other Core UI.

## Anatomy and composition

- **Field root:** required non-semantic layout wrapper that owns the border, selected-item flow, fixed placeholder, and input.
- **Placeholder:** required, already localized text that remains before all selected items; it is not an accessible name.
- **Selected item:** one consumer-rendered item within a SearchBox-owned chip and a SearchBox-owned remove button.
- **Input:** required primary native control and the ref target.
- **Suggestion popup:** conditional `listbox`, portalled to `document.body`.
- **Optional heading:** a consumer-provided, already localized `suggestionsLabel` rendered above the listbox options.
- **Suggestion option:** SearchBox-owned `role="option"` wrapper whose visual contents come from `renderSuggestion`.

SearchBox has no public compound children and no Context contract. `renderSuggestion` and `renderSelectedItem` are named slots, not public component parts.

## Semantic and accessibility contract

The input uses the editable ARIA combobox pattern: `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded`, `aria-controls`, and `aria-activedescendant` while a suggestion is active. The portalled surface has `role="listbox"` and every suggestion has `role="option"`. `getItemLabel` supplies each option's accessible name and `getRemoveItemLabel` supplies the native remove button's accessible name.

`aria-label` or `aria-labelledby` is required. SearchBox throws when neither is present. The placeholder and the optional visible suggestions heading do not supply the input name. Native input semantics remain primary; SearchBox does not use positive `tabIndex` or a live region. The consumer's rendered content must not contain independent interactive controls.

ArrowDown and ArrowUp open and cyclically move the active option. Enter selects a non-selected active option. Escape, Tab, and outside press close the popup; Tab and outside press retain normal focus behavior. Selecting calls `onSelect`, closes the popup immediately, clears the active option, and returns focus to the input. A selected suggestion stays visible with `aria-selected="true"` and is not activatable. Backspace with an empty input calls `onRemove` for the last selected item. Each remove button is independently keyboard reachable and calls `onRemove`.

## Public API contract

```ts
interface SearchBoxItem<T> {
  id: string;
  item: T;
}

interface SearchBoxProps<T>
  extends Omit<
    ComponentPropsWithRef<'input'>,
    | 'value'
    | 'defaultValue'
    | 'placeholder'
    | 'role'
    | 'aria-activedescendant'
    | 'aria-autocomplete'
    | 'aria-controls'
    | 'aria-expanded'
    | 'onChange'
  > {
  inputValue: string;
  onInputValueChange: (value: string) => void;
  selectedItems: SearchBoxItem<T>[];
  suggestions: SearchBoxItem<T>[];
  onSelect: (item: SearchBoxItem<T>) => void;
  onRemove: (item: SearchBoxItem<T>) => void;
  placeholder: string;
  renderSelectedItem: (item: T) => ReactNode;
  renderSuggestion: (item: T) => ReactNode;
  getItemLabel: (item: T) => string;
  getRemoveItemLabel: (item: T) => string;
  suggestionsLabel?: string;
}
```

| Public surface | Native target | Ref target | Forwarded props | Locally owned props | Omitted overrides | Event composition |
|---|---|---|---|---|---|---|
| SearchBox | `<input>` | `<input>` | compatible native input props, including `onChange` | controlled values, selection callbacks, slots, combobox ARIA | value/defaultValue, placeholder, combobox ARIA | consumer `onFocus`, `onBlur`, and `onKeyDown` run first; `preventDefault()` suppresses SearchBox behavior. `onInputValueChange` is called after consumer `onChange` unless it prevented default. |

The component is controlled only. `onSelect` and `onRemove` receive the complete `{ id, item }` entry; applications update `selectedItems`. Duplicate IDs are invalid and throw a clear runtime error. Direct native input props address the input and its ref. `disabled` disables typing, opening, selection, and removing.

## States, variants, and size

No component variants and no local size variants exist. Global density controls all geometry.

Supported states are empty, populated, focused, expanded, active suggestion, selected suggestion, disabled, and read-only. A read-only input retains its native behavior and cannot open or change selection. No error, loading, or async state is owned; applications replace `suggestions` as their filter process requires. Selected suggestions take precedence over the active state: they remain visibly selected but cannot be activated.

## Visual and motion contract

Bodywork `Textfelder & Suche` and `Auswahl & Formular-Kontrollen`, including `.ff-field`, person-selection chips, and `tobit-ds.css`, were checked on 2026-10-15. The field uses `--input-py`, `--input-px`, `--input-border`, 1.5px border, 10px radius, `--surface`, `--text`, and the existing focus-ring tokens. Chips use `--k6` gap, `--k5` block and inline-start padding, `--k8` inline-end padding, 999px radius, `--fs-meta`, `--surface-alt`, and `--accent`; their slot contents are vertically centered and separated by `--k4`. A rendered core Avatar is `--k24` inside a selected chip. Every chip keeps its avatar, contents, channel marker, and remove action on one line. The popup uses `--z-popover`, `--surface`, `--border`, 12px radius, `--shadow-pop`, `--k4` trigger gap, and compact `--k9`/`--k12` option padding.

The popup enters and exits through opacity and upward transform over 0.18s ease. Reduced motion removes the transition. Hover, active, focus-visible, disabled, selected, and long localized-content states use the named semantic tokens; text truncates rather than changing local typography.

## Responsive, localization, and acceptance contract

The portalled popup tracks the field during scroll and resize, is at least field-wide, flips above the field when necessary, and clamps to the viewport. The field wraps selected chips and supports long localized placeholder, item, and label strings. SearchBox receives already localized text and does not infer locale, direction, or channel semantics.

Tests cover controlled text and selection, typed filter callbacks, selected and unselected option behavior, keyboard navigation, Enter, Escape, Tab, outside close, remove buttons, Backspace, disabled behavior, ARIA relationships, consumer native events, ref forwarding, SSR, portal positioning, reduced motion, and long localized values. The Storybook recipient scenario provides visual and interaction evidence.
