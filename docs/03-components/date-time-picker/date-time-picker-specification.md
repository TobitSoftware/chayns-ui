# DateTimePicker — Component Specification

## Metadata

- Component Name: DateTimePicker
- Component Category: Core
- Specification Status: IMPLEMENTED
- Owner / Responsible Area: chayns UI Core
- Design Reference: Pre-implementation DateTimePicker POC, confirmed by user on 2026-09-23; no Bodywork reference exists yet.
- Relevant Decision IDs: CORE-001–007, CORE-009, CORE-010, CORE-012, CORE-014, CORE-016, PICKER-001–010
- Foundation Dependencies: `@chayns-ui/tokens`, global density and theme classes
- Related Components: ComboBox (dropdown placement only), TextField (floating-label reference)
- Last Reviewed: 2026-09-23

## Purpose and Boundaries

DateTimePicker is a controlled Core form control for selecting either a local date or a local time from cyclic, pointer-draggable wheels. It owns presentation, temporary open state, wheel interaction, date normalization and accessibility relationships. It does not submit native form data, manage validation, translate consumer text, choose a locale or time zone, or combine date and time into a separate mode.

Use it for a constrained date or time selection where the wheel interaction is appropriate. Do not use it for an arbitrary date-time range, a calendar grid, a text entry field, a duration, time-zone selection or native form submission.

## Public API

```ts
type DateTimePickerMode = 'date' | 'time';
type DateTimePickerMinuteStep = 1 | 5 | 15 | 30;

interface DateTimePickerWheelLabels {
  day: string;
  dayPeriod: string;
  hour: string;
  minute: string;
  month: string;
  year: string;
}

interface DateTimePickerProps
  extends Omit<
    React.ComponentPropsWithRef<'button'>,
    | 'aria-controls'
    | 'aria-expanded'
    | 'aria-haspopup'
    | 'aria-label'
    | 'aria-labelledby'
    | 'children'
    | 'onChange'
    | 'type'
    | 'value'
  > {
  label: string;
  locale: string;
  minDate?: Date;
  maxDate?: Date;
  minuteStep?: DateTimePickerMinuteStep;
  mode?: DateTimePickerMode;
  onChange: (value: Date) => void;
  placeholder: string;
  value: Date | null;
  wheelLabels: DateTimePickerWheelLabels;
}
```

`mode` defaults to `time`; `minuteStep` defaults to `1` and accepts only `1`, `5`, `15` or `30`. `label`, `placeholder` and all `wheelLabels` are consumer-resolved localizable text. Compatible native button props are forwarded to the trigger except the documented collisions. The trigger type is always `button`; it has no `name` prop or hidden form input. The forwarded ref targets the native trigger button.

The consumer owns `value`. Selecting a wheel value immediately calls `onChange` with a new local `Date` while retaining the dropdown. A `null` value displays `placeholder`; the first selection uses the current local date and time as its basis.

## Anatomy and DOM

- Root: positioning-only `div`.
- Trigger: one labelled native `button`.
- Label: associated visible floating `label`.
- Popup: non-portalled `role="dialog"` below the trigger.
- Wheels: one focusable `role="listbox"` per selected unit with button-backed `role="option"` entries.
- Selection: one decorative central overlay per popup using 10% accent opacity.

The component has no public compound parts, Context, local S/M/L prop, loading state, error state or motion prop.

## Modes, Locale and Value Rules

`time` renders hour and minute wheels. The minute wheel contains values from 00 to 59 at the configured `minuteStep`. A controlled minute that is not aligned with the step is display-normalized down to the preceding valid step without calling `onChange`. The resolved locale decides whether it renders 24-hour values or adds a localized day-period wheel for a 12-hour cycle. A German trigger appends `Uhr` to the locale-formatted time.

`date` renders day, localized month and year wheels in the ordering produced by `Intl.DateTimeFormat(...).formatToParts()`. It uses the local browser time zone. Years span the current year plus/minus 100 unless `minDate` and/or `maxDate` reduce the interval. Changing a month or year clamps the day to the last valid day.

`minDate` and `maxDate` apply only to `date`. An externally provided out-of-range date is display-normalized to the nearest boundary without calling `onChange`. Supplying `minDate > maxDate` throws `DateTimePicker requires minDate to be earlier than or equal to maxDate.`

## Interaction, Keyboard and Focus

The trigger calls consumer `onClick` first. If that handler calls `preventDefault()`, the internal toggle does not run. Trigger click toggles the popup. Escape closes the popup from either the trigger or a wheel, then restores focus to the trigger. A pointer press outside closes it and restores focus.

Each wheel supports pointer dragging, mouse-wheel scrolling, click selection, Arrow Up/Down for adjacent values and Home/End for first/last values. Tab follows native order between wheels. The wheel list is repeated and resets away from its physical edges to create a visually unbounded cycle. The central option remains large and opaque; adjacent values are progressively transformed away in perspective.

## Visual Contract

The popup follows the confirmed POC: surface background, border, popover shadow, a central `rgb(var(--accent-rgb), 0.1)` selection band and a five-row viewport. Each wheel has a 3D perspective and uses only `transform` and `opacity` for its wheel presentation. Trigger geometry follows the existing floating-label control treatment. The picker uses its intrinsic content width and never expands to 100% width by default; the time mode has a 100px minimum inline size. The container owns external placement and optional sizing.

## Accessibility

The associated visible `label` is the trigger's accessible name. `wheelLabels` name every wheel. The popup is exposed as a dialog, the wheels as listboxes and current wheel entries with `aria-selected`. Native `disabled` disables the trigger and prevents opening. Focus-visible styling uses the established focus-ring tokens. No positive `tabindex`, focus trap or programmatic focus other than close restoration is used.

## Validation and Evidence

Unit tests cover opening/closing, Escape restoration, immediate wheel changes, consumer click cancellation and out-of-range normalization. Storybook supplies controlled time and date stories. Package CSS is exported as `@chayns-ui/core/date-time-picker.css` and through `@chayns-ui/core/styles.css`.
