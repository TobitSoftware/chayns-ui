# Checkbox — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `checkbox-box`, retrieved 2026-09-17
- Relevant Decisions: CORE-010–012, INPUT-007, A11Y-001–007, DENSITY-001–005

## Purpose and boundary

Checkbox is a labelled native checkbox for a value that can be selected independently of nearby values. It is not a single immediate setting (use Switch), a one-of-many selection (use RadioGroup), or an indeterminate bulk-selection control.

## Public API and native-prop ownership

```ts
interface CheckboxProps extends Omit<React.ComponentPropsWithRef<'input'>, 'children' | 'type'> {
  children: Exclude<React.ReactNode, boolean | null | undefined>;
}
```

| Public surface | Rendered element / ref | Ownership |
| --- | --- | --- |
| Native checkbox props including `name`, `value`, `checked`, `defaultChecked`, `onChange`, `required`, `disabled`, `data-*` and compatible `aria-*` | `<input type="checkbox">` / `HTMLInputElement` | forwarded unchanged |
| `children` | visible text in the associated `<label>` | required visible label |
| `type` | input | omitted and fixed to `checkbox` |

The ref targets the input. Consumer events are not wrapped. `indeterminate` is not a React input prop and is intentionally outside this initial contract; table bulk-selection requires a separate specification.

## DOM, state and visual contract

One native `<label class="chayns-checkbox">` wraps its checkbox input, decorative control span and visible label span. The input remains the semantic and form-control owner. No Context, subcomponents or component state exists. Native checked/unchecked, disabled and required state own behaviour; controlled/uncontrolled state is native React behaviour.

Bodywork supplies a `--k20` square, `2px` border, `6px` radius, `--input-border` unchecked treatment and `--accent`/`--on-accent` checked treatment, aligned with a `--k12` gap and `1px` top adjustment. The check glyph is the Regular FontAwesome `fa-check` at `--fs-micro`, centered with flex alignment, and starts at `scale(.4)`/`opacity:0`; checked state uses `scale(1)`/`opacity:1`. The glyph transition uses Bodywork's transform/opacity values and is disabled for reduced motion. The component has no external margin.

## Accessibility, keyboard and verification

The native input provides checkbox role, checked state, label association, form submission and Space-key activation. The decorative control is hidden from the accessibility tree. Disabled uses native `disabled`; no custom ARIA state, focus move or keyboard handler is added. Consumers supply localized visible children. Tests cover native props/ref/events, controlled/uncontrolled state, disabled/required form behaviour, keyboard activation, SSR and type rejection of `type`/missing children. Stories and manual checks cover checked, disabled, long content, 200% zoom, forced colors and density.

## AI usage contract

Use Checkbox for independently selectable values. Put native input props on Checkbox, never its internal spans. Do not add indeterminate state, a switch-like immediate-setting meaning, local size variants or public subcomponents.
