---
'@chayns-ui/core': minor
'@chayns-ui/layout': minor
'@chayns-ui/tokens': patch
---

Add Breadcrumb, Pagination, Slider, Tooltip and decimal-capable Stepper with Bodywork-based selection guidance, native semantics and localized content contracts. Stepper precision defaults to integer operation.

Expose enums for finite configuration values while retaining existing literal props and runtime lists. Add attached/underline Tabs appearances, automatic enabled-entry selection for Tabs and SegmentedControl, and independent exclusive state for nested Accordion groups.

Correct native prop/ref forwarding, popup interactions and positioning, picker accessibility and formatting work, option identities, AvatarGroup truncation, status foregrounds and action focus shadows. Validate component documentation and configuration exports, and check every built Storybook story in Chromium and WebKit before publication.

Present concise linked usage guides in Storybook while retaining full implementation specifications. Demonstrate fixed underline tabs and consumer-owned optional addition/removal without introducing new configuration props.

Keep exactly one Stepper icon weight visible when Font Awesome replaces icons with SVGs, including hover, active and disabled states.

Apply the shared Regular/Solid icon rules consistently to owned controls, retain Regular informational glyphs outside the explicitly confirmed Card hover feedback and support individually imported component stylesheets. Reproduce the checked Bodywork 4px Card lift, exact easing/timing and Solid header icon with accent surface colors and scaling, without a press effect. Match Button and IconButton hover/press transforms and timings, share Button state styles across SplitButton halves, and add the 2px Badge lift with reference saturation and shadow. Disable decorative transforms and transitions under reduced motion while retaining immediate state feedback. Prevent decorative SVG icons from intercepting pointer hits so native press feedback works in WebKit.
