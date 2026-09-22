# RadioGroup — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `radio`, retrieved 2026-09-17
- Relevant Decisions: CORE-010–012, INPUT-008, RADIO-001–003, A11Y-001–007

## Purpose and boundary

RadioGroup expresses one selection from a related set of labelled options. It is not an independently selectable Checkbox, an immediate-setting Switch or a compact SegmentedControl. `RadioGroup.Radio` is only valid below `RadioGroup`.

## Public API and native-prop ownership

```ts
interface RadioGroupProps
  extends Omit<React.ComponentPropsWithRef<'fieldset'>, 'children' | 'name'> {
  label: Exclude<React.ReactNode, boolean | null | undefined>;
  name: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

interface RadioProps
  extends Omit<React.ComponentPropsWithRef<'input'>,
    'children' | 'type' | 'name' | 'checked' | 'defaultChecked' | 'onChange'> {
  value: string;
  children: Exclude<React.ReactNode, boolean | null | undefined>;
}
```

| Public surface | Rendered element / ref | Ownership |
| --- | --- | --- |
| Standard fieldset props including `disabled`, `className`, `data-*` and compatible `aria-*` | `<fieldset>` / `HTMLFieldSetElement` | forwarded unchanged |
| `label` | `<legend>` | required visible group label |
| `name`, `value`, `defaultValue`, `onValueChange` | RadioGroup Context | owns native radio relationship and controlled/uncontrolled selection |
| Standard radio props including `required`, `disabled`, `id`, `data-*` and compatible `aria-*` | `<input type="radio">` / `HTMLInputElement` | forwarded unchanged |
| Radio `value` | native input value | required option identity |
| Radio `children` | associated visible `<label>` text | required visible option label |
| Radio `type`, `name`, `checked`, `defaultChecked`, `onChange` | input | omitted; group owns their semantics |

`RadioGroup` forwards its ref to the fieldset and `RadioGroup.Radio` forwards its ref to its native input. Native radio props target the input, never the visual span or label. The Radio `onChange` collision is intentionally omitted, because it conflicts with group state; consumers observe selection through `onValueChange`.

## DOM, state and visual contract

`RadioGroup` emits one fieldset with an optional legend and Context Provider. Without a visible `label`, the consumer supplies a programmatic name through native `aria-label` or `aria-labelledby`. Each Radio emits one label that contains a native radio input, decorative circular control and visible label. The shared `name` is assigned by Context. A `value` prop makes the group controlled; otherwise `defaultValue` initializes internal state. Selection invokes `onValueChange` after the native input change. A Radio outside its parent throws a clear development error.

Bodywork defines a `--k20` control with a 2px `--input-border` ring and centred `--accent` dot, a `--k12` label gap and body weight 500. Selected state uses accent; disabled state uses semantic disabled tokens. The dot uses only opacity/transform motion and disables it for reduced motion. No external margin or local density prop exists.

## Accessibility, keyboard and verification

The native fieldset/legend establishes the labelled group. Native radio inputs provide role, checked state, form submission, required/disabled semantics and Space/Arrow keyboard behaviour. No custom ARIA role, focus move or keyboard handler is needed. A disabled fieldset disables descendants according to native HTML rules. Long localized labels wrap.

Runtime tests cover native prop forwarding, refs, controlled and uncontrolled selection, shared name, keyboard selection, required/disabled form behaviour and invalid outside placement. Type tests reject group-owned radio props. Stories and browser checks cover default, selected, disabled, long content, zoom, forced colors and density.

## AI usage contract

Place `RadioGroup.Radio` only within `RadioGroup`. Put fieldset attributes on RadioGroup and option-native attributes on Radio. Do not add arbitrary slots, custom menu semantics, local sizes or a nested visual-only component tree.
