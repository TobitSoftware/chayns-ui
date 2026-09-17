# MessageBox — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `message-box`, retrieved 2026-09-17
- Relevant Decisions: CORE-010–012, MESSAGE-002–003, TOKEN-008, A11Y-001–007

## Purpose and boundary

MessageBox is a static in-page note for important explanatory context. Use `neutral` for general information, `admin` for role-specific context and `warning` for consequences before a decision. It is not a dismissible Banner, Toast, field error, Dialog or dynamic alert.

## Public API and native-prop ownership

```ts
type MessageBoxTone = 'neutral' | 'admin' | 'warning';

interface MessageBoxProps extends Omit<React.ComponentPropsWithRef<'aside'>, 'children' | 'role'> {
  tone?: MessageBoxTone;
  children: React.ReactNode;
}
```

| Public surface | Rendered element / ref | Ownership |
| --- | --- | --- |
| Standard aside props including `id`, `className`, `data-*` and compatible `aria-*` | `<aside>` / `HTMLAsideElement` | forwarded unchanged |
| `children` | freely composed content inside the aside | consumer owns title, text, icon and follow action anatomy |
| `tone` | aside presentation | component owns one of `neutral`, `admin`, `warning`; defaults to `neutral` |
| `role` | aside | omitted and fixed to static `note` |

The ref targets the aside. No event is intercepted. The component neither supplies a title prop nor public parts, avoids generated text and is not closable.

## DOM, visual and accessibility contract

MessageBox emits exactly one `<aside role="note">` with the root class and a tone modifier. Bodywork provides flex alignment, `--k12` gap, `--k16` padding, `1px` border and `12px` radius. Neutral uses `--surface-2` and `--input-border`; admin uses `--tint` and `--accent-300`; warning uses `--warning-bg` and `--warning`. It has no external margin, motion, state, Context or local size variant.

Consumers provide localized children and must make any interactive child accessible. A supplied `aria-label` or `aria-labelledby` names the aside when its composed content does not do so. Static notes do not claim dynamic alert behaviour, move focus or announce themselves. Long text wraps, and the surface reflows at zoom and narrow widths.

## Verification and AI usage

Runtime tests cover aside role/tone default, native aside props/ref, explicit tone and SSR. Type tests accept standard aside props and reject custom role. Stories cover all tones and freely composed action content; browser Axe checks run for each. Use MessageBox for static context only. Do not add title props, close state, alerts, icons or subcomponents beyond the documented free child composition.
