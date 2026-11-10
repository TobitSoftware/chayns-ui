---
id: markdown-editor-component
type: module-design
status: active
title: MarkdownEditor Component Specification
tags: [component, business, markdown, tiptap]
---

# MarkdownEditor – Component Specification

## Metadata

- Component Name: MarkdownEditor
- Component Category: Business
- Specification Status: READY FOR IMPLEMENTATION
- Owner / Responsible Area: chayns UI Business
- Design Reference: Consumer wrapper owns visual surface; editor owns only structure and interaction
- Relevant Decision IDs: none
- Foundation Dependencies: React, Tiptap, existing Core accessibility rules
- Related Components: Core RichTextEditor, MessageComposer
- Last Reviewed: 2026-10-06

## Purpose

Controlled Markdown editing with a small, replaceable button toolbar. The component converts between Markdown input/output and Tiptap's internal document. It does not own business persistence, dialogs, link URL selection, theme surface colors, borders, or background.

## Use When

Use for a business-layer Markdown input where the application owns the Markdown value and may provide custom toolbar commands.

## Do Not Use When

Do not use for the existing structured `RichTextDocument` contract or for a full message composer with attachments, mentions, or submission behavior.

## Anatomy

The component contains a toolbar of native buttons and a Tiptap contenteditable control. The toolbar is optional in behavior but renders the configured item list. No public compound children are provided.

## Semantic Contract

The editor exposes a contenteditable text control with an accessible name from `aria-label` or `aria-labelledby`. Toolbar actions are native `button` elements. The toolbar uses normal browser Tab order; no roving tabindex is used.

## Variants

No component variants.

## Local Size Variants

No local size variant. Global density is inherited from the surrounding system.

## States

- default: editable content control and enabled toolbar buttons.
- read-only: content remains readable; editing and toolbar actions are disabled.
- disabled: editing and toolbar actions are disabled.
- active toolbar item: `aria-pressed="true"` when its `isActive` callback reports active.
- empty: optional placeholder text is shown by the content area.

## State Priority and Combination Matrix

Disabled takes precedence over editable interaction. Read-only also prevents editor and toolbar interaction. Active state is informational and does not override disabled/read-only.

## Public API Contract

- `value`: controlled Markdown string.
- `onValueChange`: receives the current Markdown string after editor updates.
- `items`: optional button item list; when provided it replaces the exported defaults.
- `onRequestLink`: optional sync/async callback receiving selected text and current href, returning a URL or `null`.
- `placeholder`, `readOnly`, `disabled`: content behavior.
- Native div props are forwarded to the component root except `children`, `onChange`, and `role`.
- `ref`: `MarkdownEditorRef` with `getHTML()` and `focus()`.

| Öffentliche Oberfläche | Natives Element / Ziel | Ref Target | Weitergereichte Props | Lokal besessene Props | Ausdrücklich ausgelassene oder verbotene Overrides | Event-Komposition |
|---|---|---|---|---|---|---|
| MarkdownEditor | root div / nested contenteditable | imperative handle, HTML from Tiptap control | compatible root div props | value, toolbar, editor state | children, onChange, role | consumer `onKeyDown` runs before shortcut handling; defaultPrevented cancels shortcut |
| toolbar item | button | none | button semantics | label, icon, command, active/disabled callbacks | consumer children | click invokes item command |

### Toolbar item

```ts
interface MarkdownEditorToolbarButtonItem {
  type: 'button';
  id: string;
  label: string;
  icon?: string;
  shortcut?: { key: string; ctrlKey?: boolean; metaKey?: boolean; shiftKey?: boolean; altKey?: boolean };
  onClick: (editor: Editor) => void;
  isActive?: (editor: Editor) => boolean;
  isDisabled?: (editor: Editor) => boolean;
}
```

## Composition

Composition is through props only. Custom toolbar items are supplied through `items`; no public child parts or compound relationship exists.

## Context Dependencies

No semantic React context is required. The surrounding wrapper supplies layout and visual theme.

## State Ownership

The Markdown value is fully controlled by the consumer. Tiptap owns only its transient editing selection/history; the component emits Markdown changes and never persists business state.

## Design Tokens

The component does not set background, border, or surface color. Toolbar layout uses the existing spacing custom property fallback only for inter-button gap. No raw color or border values are introduced.

## Density Contract

No local density calculation or size prop. Content and toolbar wrap according to available container width.

## Color and Theme Contract

Colors, backgrounds, borders, and focus surface treatment are inherited from the wrapper or global environment. The component does not resolve themes.

## Typography Contract

Typography is inherited. Labels and placeholder are consumer-provided and must remain localizable.

## Accessibility Contract

`aria-label` or `aria-labelledby` is required for the editor control. Toolbar controls are native buttons with accessible labels. Focus is visible through inherited/global styles. No color-only state communication is used. Normal Tab order is retained.

## Keyboard Contract

The contenteditable retains Tiptap/native editing behavior. Configured shortcuts match `key`, `ctrlKey`, `metaKey`, `shiftKey`, and `altKey`; matching shortcuts prevent the browser default and invoke the item command. Toolbar buttons use native Enter/Space behavior.

## Focus Contract

`ref.current.focus()` focuses the Tiptap editor. Toolbar clicks focus the editor through commands supplied by default items. No focus trap or restoration is implemented.

## Motion Contract

No component-specific motion.

## Internationalization and Content Contract

The component owns no user-facing domain copy. Labels, placeholder, and accessible names are supplied by the consumer. The default item labels are exportable and can be replaced by localized custom items.

## Responsive and Layout Behavior

The root fills its available width through normal wrapper layout. The toolbar wraps. The content control expands with its content and does not impose a background, border, or fixed width.

## Container Interaction

The wrapper owns spacing, surface, border, background, and placement. The editor must remain usable inside differently styled wrappers.

## Loading and Async Contract

No loading state. Link requests may be asynchronous; while awaiting a link result, no additional request coordination is owned by the component.

## Error Contract

No business error UI is owned. A rejected link callback promise propagates to the consumer's async handler.

## Performance Characteristics

Tiptap extensions are imported directly and the package build preserves module boundaries for tree-shaking.

## Dependencies

Business depends on React, Tiptap packages, and existing Core conventions. It does not add a Core dependency for the editor implementation.

## Non-Goals

No link dialog, no Markdown preview, no upload handling, no business persistence, no theme surface, and no structured RichTextDocument conversion.

## Escape Hatches and Overrides

Custom `items` replaces the defaults. Custom commands may use the Tiptap editor instance. No arbitrary style or semantic override is exposed.

## Examples

```tsx
<MarkdownEditor
  aria-label="Markdown bearbeiten"
  value={markdown}
  onValueChange={setMarkdown}
/>
```

## Do / Don't

- Do pass a controlled Markdown value.
- Do localize custom item labels.
- Do use `onRequestLink` for application-owned URL selection.
- Don't style the editor by relying on internal surface colors or borders.
- Don't use it where the Core structured document contract is required.

## Test Contract

Verify controlled updates, Markdown parsing, HTML ref output, focus ref behavior, default and replacement toolbar items, shortcut matching including modifiers, disabled/read-only behavior, accessible naming, link callback handling, and long content wrapping.

## Visual Verification Contract

Verify inherited wrapper surface styling, toolbar wrapping at narrow widths, visible focus, disabled/read-only affordances, and long localized labels. Bodywork-specific visual geometry is not defined for this component.

## AI Usage Contract

### Use when

A controlled business Markdown field with optional formatting buttons is needed.

### Do not use when

Structured mentions, attachments, submit flows, or Core rich-text document values are required.

### Required context

A controlled Markdown state, accessible name, wrapper styling, and optional localized toolbar items.

### Forbidden assumptions

Do not infer a surface color, border, link dialog, Markdown underline syntax, or uncontrolled value behavior.

### Related decisions

None.

## Open Decisions

No component-relevant open decisions for the confirmed first implementation scope.

## Readiness Assessment

- Design Rules Complete: yes
- Foundation Dependencies Complete: yes
- API Contract Complete: yes
- Semantic Contract Complete: yes
- Accessibility Contract Complete: yes
- Keyboard Contract Complete: yes
- State Matrix Complete: yes
- Density Contract Complete: yes
- Motion Contract Complete: not applicable
- Internationalization Contract Complete: yes
- Test Contract Complete: yes
- Visual Verification Contract Complete: yes
- Open Implementation Blockers: 0
- Specification Status: READY FOR IMPLEMENTATION

## Specification Change Rules

Changes to value format, toolbar item shape, shortcut matching, ref methods, semantics, Markdown serialization, or wrapper styling require specification and readiness review updates before implementation.
