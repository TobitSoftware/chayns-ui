---
{
  "name": "Stepper",
  "package": "@chayns-ui/core",
  "category": "Core",
  "status": "implemented",
  "useWhen": [
    "Adjust exact numeric quantities in small increments."
  ],
  "doNotUseWhen": [
    "Do not use for approximate bounded settings or free text."
  ],
  "alternatives": [
    "Slider",
    "TextField"
  ],
  "sourceReferences": [
    "https://tappqa.tobit.com/Bodywork/DesignSystem/"
  ],
  "checkedOn": "2026-10-06",
  "stories": [
    "Core/Stepper:Default",
    "Core/Stepper:Decimal"
  ],
  "combinations": [
    "Card",
    "List",
    "Button"
  ]
}
---
# Stepper — Component Specification

## Selection guide

Use when: Adjust exact numeric quantities in small increments.

Do not use when: Do not use for approximate bounded settings or free text.

Alternatives: Slider, TextField.

## Public contract — confirmed 2026-10-06

Controlled value/min/max/step/onValueChange, visible label, decreaseLabel,
increaseLabel and formatValue are required. precision is optional (0–6), default 0;
StepperPrecisions exports named numeric values. Existing native div props/ref go to
the root named group; children, role and accessible-name attributes are owned.
Root onClick runs before delegated button activation and preventDefault cancels
onValueChange. Two native type=button controls expose localized accessible names;
buttons are disabled at their corresponding boundary. The visible formatted value
is in an atomic aria-live=polite status region. The component never moves focus programmatically; native disabled-button behavior
applies at boundaries.
No text editing, spinbutton role, form field submission, hold-to-repeat, locale inference
or keyboard shortcuts beyond native button activation are included.

Precision uses scaled safe integers; value/min/max/step must be exactly representable
at the chosen precision, step positive, min <= max, and max/value aligned to the
min-based step grid. The scaled range must also be a safe integer. Invalid runtime
configuration throws a descriptive Error; no silent rounding or clamping.

Bodywork #picker checked 2026-10-06: 1.5px input-border frame/dividers, radius10,
k40 buttons, k52 value minimum width, fs-bodyl icons, text-2 decrement and accent
increment, surface background, fs-body/text weight600 value. The user confirmed
the existing Slider label pattern (fs-body, weight500, k10 gap above). No external
margins or local density prop. The 52px reference is mapped to the existing k52
token. Native focus treatment and disabled state use existing semantic tokens;
minimum target size is retained across densities. The Bodywork .tr background/color/border-color/box-shadow/filter .2s ease and
transform .15s ease transitions are retained; reduced motion disables them. Longer
labels/values reflow; fonts are consumer-owned. No RTL requirement is inferred.

Acceptance: decimal 0.1 steps have no accumulated artifacts; bounds and disabled
controls work; controlled refusal leaves display unchanged; invalid precision/raster/
unsafe arithmetic fail; root cancellation/ref/native props and localized accessible
names/status work. Storybook: Core/Stepper:Default and Decimal with interaction/a11y
checks. Manual theme/density, screenreader and zoom/reflow checks remain release evidence.

Icon weights use decorative wrapper spans: Regular is visible at rest and when
disabled; Solid replaces it during enabled hover/active. Visibility belongs to the
wrapper so Font Awesome's unlayered SVG display rules cannot expose both weights
after replacing the inner icon. This follows the existing Button icon pattern and
does not alter the public API, geometry or tokens.

Regression evidence checked 2026-10-06: simulated Font Awesome SVG replacement with
unlayered inline-block display reproduced two visible glyphs per button before the
fix. Chromium and WebKit now show exactly one in rest, hover, active and disabled
states. The Default story checks visible weights and the disabled upper boundary;
full verification passes with 185 unit tests and 89 Storybook tests.

## Global icon rule follow-up — 2026-10-06

Owned action glyphs follow ICON-001–003: Regular at rest/disabled and Solid on
enabled hover/active; informational markers stay Regular. The existing internal
renderers use wrappers to remain stable under Font Awesome SVG replacement. Public
props, token geometry, native events and focus ownership remain unchanged. The
[icon rule review](../icon-rule-review-2026-10-06.md) records owner-specific findings
and consumer-content boundaries.
