# SegmentedControl — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork Design System `sticky-seg`, retrieved 2026-09-17
- Relevant Decisions: CORE-010–012, SEGMENT-001–003, A11Y-001–007

## Purpose and boundary

SegmentedControl is a compact, immediate single selection among two to four closely related views or settings. It is not navigation Tabs, a form RadioGroup or a menu. `SegmentedControl.Segment` is only valid below `SegmentedControl` and may combine one leading icon with its visible label.

## Public API and native-prop ownership

```ts
type ControlledSelection = { value: string; onValueChange: (value: string) => void; defaultValue?: never };
type UncontrolledSelection = { defaultValue: string; value?: never; onValueChange?: (value: string) => void };

type SegmentedControlProps = Omit<React.ComponentPropsWithRef<'div'>, 'children' | 'role'> &
  (ControlledSelection | UncontrolledSelection) & {
    label: Exclude<React.ReactNode, boolean | null | undefined>;
    children: React.ReactNode;
  };

interface SegmentProps extends Omit<React.ComponentPropsWithRef<'button'>,
  'children' | 'type' | 'role' | 'aria-checked' | 'tabIndex' | 'onClick' | 'onKeyDown'> {
  value: string;
  children: Exclude<React.ReactNode, boolean | null | undefined>;
}
```

| Public surface | Rendered element / ref | Ownership |
| --- | --- | --- |
| Standard div props including `id`, `className`, `data-*` and compatible `aria-*` | `<div role="radiogroup">` / `HTMLDivElement` | forwarded unchanged except role |
| `label` | labelled group text | required visible label and group accessible name |
| `value`/`defaultValue`/`onValueChange` | Context | required selected-value relationship |
| Standard button props including `disabled`, `id`, `data-*` and compatible `aria-*` | `<button>` / `HTMLButtonElement` | forwarded unchanged except semantic/interaction collisions |
| Segment `value`, `children` | Context identity and visible button label | required |
| `type`, `role`, `aria-checked`, `tabIndex`, `onClick`, `onKeyDown` | button | omitted; component owns radio semantics, roving focus and selection events |

The root ref targets the radiogroup div; each Segment ref targets its native button. Segment click and keyboard collisions are intentionally omitted to keep a single selection/focus owner; `onValueChange` observes completed selection.

## DOM, state and interaction contract

The root renders a visible label and a `role="radiogroup"` div labelled by it. Segments render `type="button" role="radio" aria-checked`, with exactly the selected segment at `tabIndex=0`; other enabled segments are `-1`. The Context records mounted segments in DOM order, provides selection and moves focus. Controlled mode uses `value`; uncontrolled mode requires `defaultValue`. A child outside its parent throws a clear development error.

Arrow Left/Up selects and focuses the previous enabled segment; Arrow Right/Down the next; both wrap. Home selects/focuses the first, End the last. Space and Enter activate the focused native button. Disabled segments are skipped. Selection updates immediately and calls `onValueChange`; a controlled parent then supplies the value. Bodywork supplies `--toggle-bg`, `--k4` interior gap/padding, 12px group radius, 8px selected surface radius and `--shadow-card`. The selection surface is its own decorative element: it has the active button’s measured width and glides to it with Bodywork’s `transform 0.2s ease`; the button labels stay in an equal-column inline grid above it. There is no local size prop or external margin.

## Accessibility and verification

The documented radiogroup/radio semantics express the custom button-based control. The visible label supplies the accessible group name. Focus remains on buttons; no focus is trapped or programmatically restored. Motion is limited to the selected surface transform/opacity and disabled under reduced motion. Runtime tests cover controlled/uncontrolled selection, all roving keys, disabled skipping, refs, native attributes and outside placement. Type tests reject component-owned semantic props. Browser stories cover selected state, long labels, zoom, forced colors and density.

## AI usage contract

Use Segment only below SegmentedControl. Put group-native attributes on the root and button-native attributes on Segment. Use Tabs when a selection changes panels, and RadioGroup for form choices. Do not create public indicator/label subcomponents or bypass Context.
