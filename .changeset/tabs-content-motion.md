---
'@chayns-ui/core': minor
'@chayns-ui/layout': minor
---

Enclose the wider 2px Tabs underline in keyboard focus and use the semantic near-white active foreground in dark and auto-dark mode. Crossfade panels with 200ms exit and 220ms entry while keeping only the new view accessible. Bound rapid switches to one outgoing panel and move the shared underline through transform without per-frame React updates. Honor live Reduced Motion changes and retain native part/ref ownership.

Require explicit Accordion.Content for ordinary content in default and list appearances. Nested Accordions, AccordionGroups and Lists omit the additional wrapper; mixed padded content and nested siblings share one labelled panel without dropping siblings. Existing direct ordinary children need Content to retain their previous padding. Public props and static List.Item APIs stay unchanged.
