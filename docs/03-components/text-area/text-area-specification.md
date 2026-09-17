# TextArea — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `.ff`, `.ff-area` and `.ff-help`, retrieved 2026-09-17
- Relevant Decisions: CORE-012, INPUT-005–010, A11Y-001–007, DENSITY-001–005

## Purpose and boundary

TextArea is a labelled, multi-line native textarea with optional help, error and counter content. Use it for editable multi-line text; it is not a rich-text editor, code editor, autosizing field or TextField substitute.

## Public API and native-prop ownership

```ts
interface TextAreaProps extends Omit<
  React.ComponentPropsWithRef<'textarea'>,
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
| Standard textarea props including `placeholder`, `maxLength`, `required`, `rows`, `value`, `defaultValue`, `onChange`, `data-*` and compatible `aria-*` | native `<textarea>` / `HTMLTextAreaElement` | forwarded unchanged |
| `label` | associated native `<label>` | component owns placement and relationship |
| `helpText`, `error`, `counter` | help row below textarea | component owns generated IDs and placement |
| `aria-describedby`, `aria-invalid`, `children` | textarea | respectively owned, derived and forbidden |

A consumer `id` is preserved; otherwise React generates one. Help and error IDs are linked in that order; counter remains visible but undescribed. `error` determines `aria-invalid`. Placeholder is forwarded unchanged with native HTML behaviour. Native events remain unwrapped, preserving normal React/native event order and cancellation.

## DOM, visual and state contract

The non-semantic `<div class="chayns-text-area">` contains one textarea, its associated label and optional help row. It accepts no root props, children, public parts or Context. The ref targets the textarea. Value ownership, editing, selection and browser resizing remain native.

TextArea uses TextField’s Bodywork field geometry plus documented `min-height: 84px` and `resize: vertical`. `rows` has no component default. It fills available inline size without external margin. The `1.5px` border, `10px` radius, resolved color/focus tokens, floating label and error/disabled/readonly priority apply. Labels and help/counter content use `--text-3`, because Bodywork `--muted` fails the required WCAG 2.2 AA contrast threshold on `--surface`; errors use `--danger`. Only the label transform transitions; reduced motion removes it.

## Accessibility, content and verification

Consumers provide an accessible name with compatible `aria-label` or `aria-labelledby` when needed. Help and error remain visible and linked; error sets `aria-invalid="true"`. There is no generated counter, live announcement, focus management or custom keyboard model. Native textarea behaviour handles Tab, editing, selection, clipboard, form semantics, disabled and readonly states.

Runtime tests cover DOM/label/description wiring, error/ref ownership, native props/events, controlled/uncontrolled values, resize styling and SSR. Type tests reject owned collisions. Stories and manual checks cover error, help/counter, long text, zoom/reflow, forced colors and density.

## AI usage contract

Use TextArea only for a labelled multiline native value. Put textarea attributes on TextArea. Do not use it for rich text, add children or parts, or replace its required label with a placeholder.
