# Switch — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System Switch, retrieved 2026-09-17
- Relevant Decisions: CORE-010–012, INPUT-007, A11Y-001–007, DENSITY-001–005

## Purpose and boundary

Switch is a labelled native checkbox styled for one immediate, binary setting. Use it only where a change takes effect immediately. It is not a deferred form choice (use Checkbox), multi-selection or a tri-state control.

## Public API and native-prop ownership

```ts
interface SwitchProps extends Omit<React.ComponentPropsWithRef<'input'>, 'children' | 'type'> {
  children: Exclude<React.ReactNode, boolean | null | undefined>;
}
```

| Public surface | Rendered element / ref | Ownership |
| --- | --- | --- |
| Native checkbox props including `name`, `value`, `checked`, `defaultChecked`, `onChange`, `required`, `disabled`, `data-*` and compatible `aria-*` | `<input type="checkbox">` / `HTMLInputElement` | forwarded unchanged |
| `children` | visible text in associated `<label>` | required visible label |
| `type` | input | omitted and fixed to `checkbox` |

The ref targets the input. Event handlers remain native and unwrapped. `role="switch"` is not imposed: the native checkbox preserves form semantics while the component’s documented selection boundary expresses the immediate-setting use case.

## DOM, state and visual contract

One native `<label class="chayns-switch">` contains visible label content, the native input and one decorative track/knob. The input is the form, state and ref owner. There is no Context, subcomponent or React state.

Bodywork specifies a 42px by 24px pill track with `--k3` padding, `999px` radius, `--input-border` unchecked and `--accent` checked. The white `--k18` knob moves 18px by transform. The project motion rule permits this transform; track-color changes are immediate and reduced motion removes the transform transition. The label uses `--fs-body`, weight 500 and `--text`; switch rows use `--k14` gap and no component external margin.

## Accessibility, keyboard and verification

The native input gives checkbox semantics, checked state, form behaviour and Space activation. Its visible label gives the accessible name. Disabled uses native `disabled`; no custom keyboard, focus restoration, ARIA state or alert is added. Consumers provide localized label content. Tests cover forwarding/ref, controlled/uncontrolled state, disabled/required form behaviour, keyboard activation, SSR and type rejection of `type`/missing children. Stories and manual checks cover immediate toggle, disabled, long labels, zoom/reflow, forced colors and densities.

## AI usage contract

Use Switch only for an immediate binary setting. Put native checkbox props on Switch. Do not use it for deferred form consent, introduce a third state, local sizing or internal public parts.
