# TextField — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `.ff`, `.input-anim` and `.ff-help`, retrieved 2026-09-17
- Relevant Decisions: CORE-012, INPUT-005–010, A11Y-001–007, DENSITY-001–005

## Purpose and boundary

TextField is a labelled, single-line native text input with optional help, error and counter content. Use it for one editable value. It is not a select, combobox, date picker or a substitute for TextArea.

## Public API and native-prop ownership

```ts
interface TextFieldProps extends Omit<
  React.ComponentPropsWithRef<'input'>,
  'aria-describedby' | 'aria-invalid' | 'children'
> {
  label: React.ReactNode;
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  counter?: React.ReactNode;
}
```

| Public surface | Rendered element / ref | Ownership |
| --- | --- | --- |
| Standard input props including `type`, `placeholder`, `max`, `maxLength`, `inputMode`, `required`, `value`, `defaultValue`, `onChange`, `data-*` and compatible `aria-*` | native `<input>` / `HTMLInputElement` | forwarded unchanged |
| `label` | associated native `<label>` | component owns placement and relationship |
| `helpText`, `error`, `counter` | help row below the input | component owns generated IDs and placement |
| `aria-describedby` | input | omitted; component owns its generated description IDs |
| `aria-invalid` | input | omitted; `true` exactly when `error` is present |
| `children` | n/a | forbidden; a native input has no children |

The ref targets the input. A consumer `id` is preserved; otherwise React generates a stable ID. A supplied placeholder is forwarded. If absent, the component supplies one whitespace placeholder only to drive Bodywork’s native `:placeholder-shown` floating-label selector; it has no visible placeholder text or naming role. Generated `aria-describedby` contains help and error IDs in that order. Counter is intentionally visible but not described. No event handler is wrapped: consumer handlers retain React/native order and cancellation.

## DOM, composition and state

The non-semantic root `<div class="chayns-text-field">` is not a public prop target. It contains the input, associated label and optional help row. The visible label is required by INPUT-005. There are no children, public parts or Context. The input retains its normal controlled/uncontrolled contract; the component stores no value state. Empty, filled, focus, hover, disabled and readonly states come from the native input and CSS. Error overrides normal border/label color; disabled retains native behaviour.

## Visual, density and motion contract

Bodywork defines `--input-py`, `--input-px`, a `1.5px` border, `10px` radius, `--input-border`, `--surface`, `--text`, `--muted`, `--accent`, `--danger`, `--disabled-*`, `--surface-2` and focus-ring tokens. The label uses Bodywork’s transform with native `:placeholder-shown` and `:focus`. The help row uses `--fs-caption`, `--muted`, `--k10` gap and documented `6px` top margin. The field fills its container and has no external margin. Project motion rules allow only the label transform transition; color, border and focus changes are immediate and reduced motion removes that transition.

## Accessibility, content and verification

The native input supplies editing, form and keyboard semantics. Its visible label gives the accessible name. Help and error remain visible together and are linked; error sets `aria-invalid="true"`. No live region is added because Bodywork and decisions assign none. Native Tab, editing, selection, clipboard and input-mode behaviour apply without custom handlers. The component neither moves nor restores focus. Consumers provide localized content; long text wraps and the component neither calculates a counter nor infers locale. Native `disabled`, `readOnly`, `required`, `name` and submission behaviour remain available.

Runtime tests cover label/description wiring, error ownership, native props/ref, controlled/uncontrolled values, disabled/readonly behaviour and SSR. Type tests accept native, data and ARIA props and reject `children`, `aria-describedby` and `aria-invalid`. Stories and manual checks cover placeholder, help/error/counter, input modes, long localized content, keyboard editing, zoom/reflow, forced colors, S/M/L density and light/dark modes.

## AI usage contract

Use TextField only for a labelled one-line native input. Put native input attributes on TextField. Do not import internal markup, add children, replace the label with a placeholder, or invent slots and variants.
