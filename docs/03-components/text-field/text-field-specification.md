# TextField — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `.ff`, `.input-anim` and `.ff-help`, retrieved 2026-09-17
- Relevant Decisions: CORE-012, INPUT-006, INPUT-009–012, A11Y-001–007, DENSITY-001–005

## Purpose and boundary

TextField is a labelled, single-line native text input with optional help, error and counter content. Use it for one editable value. It is not a select, combobox, date picker or a substitute for TextArea.

## Public API and native-prop ownership

```ts
interface TextFieldProps extends Omit<
  React.ComponentPropsWithRef<'input'>,
  'aria-describedby' | 'aria-invalid' | 'children'
> {
  helpText?: React.ReactNode;
  error?: React.ReactNode;
  counter?: React.ReactNode;
}
```

| Public surface | Rendered element / ref | Ownership |
| --- | --- | --- |
| Standard input props including `type`, `max`, `maxLength`, `inputMode`, `required`, `value`, `defaultValue`, `onChange`, `data-*` and compatible `aria-*` | native `<input>` / `HTMLInputElement` | forwarded unchanged |
| `placeholder` | associated native `<label>` and internal input placeholder | component owns Bodywork floating placement; the input receives a single space solely for `:placeholder-shown` |
| `helpText`, `error`, `counter` | help row below the input | component owns generated IDs and placement |
| `aria-describedby` | input | omitted; component owns its generated description IDs |
| `aria-invalid` | input | omitted; `true` exactly when `error` is present |
| `children` | n/a | forbidden; a native input has no children |

The ref targets the input. A consumer `id` is preserved; otherwise React generates a stable ID. `placeholder` is the visible, associated Bodywork floating label rather than a literal input placeholder; it is the explicit native-prop collision. Generated `aria-describedby` contains help and error IDs in that order. Counter is intentionally visible but not described. No event handler is wrapped: consumer handlers retain React/native order and cancellation.

## DOM, composition and state

The non-semantic root `<div class="chayns-text-field">` is not a public prop target. It contains the input, the associated floating label when `placeholder` is present, and optional help row. There is no separate component `label` prop, children, public part or Context. The input retains its normal controlled/uncontrolled contract; the component stores no value state. Empty, filled, focus, hover, disabled and readonly states come from the native input and Bodywork CSS.

## Visual, density and motion contract

Bodywork defines `--input-py`, `--input-px`, a `1.5px` border, `10px` radius, `--input-border`, `--surface`, `--text`, `--muted`, `--accent`, `--danger`, `--disabled-*`, `--surface-2` and focus-ring tokens. Its label is positioned at `top: 0`, `left: 10px`, moves with Bodywork’s exact transform on native `:placeholder-shown` and `:focus`, and uses the documented transform/color transitions. The help row uses `--fs-caption`, `--k10` gap and documented `6px` top margin. The field fills its container and has no external margin. Reduced motion disables the decorative label transition.

## Accessibility, content and verification

The native input supplies editing, form and keyboard semantics. When present, the associated floating label supplies its accessible name; compatible `aria-label` or `aria-labelledby` remain available for the documented native control. Help and error remain visible together and are linked; error sets `aria-invalid="true"`. No live region is added. Native Tab, editing, selection, clipboard and input-mode behaviour apply without custom handlers.

Runtime tests cover label/description wiring, error ownership, native props/ref, controlled/uncontrolled values, disabled/readonly behaviour and SSR. Type tests accept native, data and ARIA props and reject `children`, `aria-describedby` and `aria-invalid`. Stories and manual checks cover placeholder, help/error/counter, input modes, long localized content, keyboard editing, zoom/reflow, forced colors, S/M/L density and light/dark modes.

## AI usage contract

Use TextField only for a labelled one-line native input. Put native input attributes on TextField and supply its visible floating label through `placeholder`. Do not import internal markup, add children, add a separate label prop, or invent slots and variants.
