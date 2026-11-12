---
{"id": "markdown-editor-component", "type": "module-design", "title": "MarkdownEditor Component Specification", "name": "MarkdownEditor", "package": "@chayns-ui/business", "category": "Business", "status": "active", "useWhen": ["A controlled Markdown input with an extensible formatting toolbar is needed."], "doNotUseWhen": ["Use TextArea for plain text or RichTextEditor for structured mention documents."], "alternatives": ["TextArea", "RichTextEditor", "MessageComposer"], "combinations": [], "sourceReferences": ["https://tappqa.tobit.com/Bodywork/DesignSystem/", "./markdown-editor-usage.md"], "checkedOn": "2026-10-28", "stories": ["Business/MarkdownEditor:Default", "Business/MarkdownEditor:ReplyDraft", "Business/MarkdownEditor:CustomToolbar", "Business/MarkdownEditor:ReadOnly", "Business/MarkdownEditor:Disabled"], references: [markdown-editor-usage]}
---

# MarkdownEditor – Component Specification

## Metadata

- Component Name: MarkdownEditor
- Component Category: Business
- Specification Status: IMPLEMENTED
- Owner / Responsible Area: chayns UI Business
- Design Reference: Consumer wrapper owns visual surface; compact toolbar follows the supplied reference image
- Relevant Decision IDs: none
- Foundation Dependencies: React, Tiptap, FontAwesome icon CSS, accessibility foundations
- Related Components: RichTextEditor, MessageComposer
- Last Reviewed: 2026-10-28
- Consumer Guide: [markdown-editor-usage.md](./markdown-editor-usage.md)

## Purpose

Controlled Markdown editing with a replaceable button toolbar. The component converts Markdown to and from Tiptap's document model. It does not own business persistence, link dialogs, theme surface colors, borders, or background.

## Use When

Use when the application owns a Markdown string and needs inline formatting controls.

## Do Not Use When

Use TextArea for plain text, RichTextEditor for the structured `RichTextDocument` contract, or MessageComposer for a full message workflow with attachments and submit behavior.

## Related Components and Selection Boundaries

MarkdownEditor returns Markdown strings. RichTextEditor returns a structured document with atomic mentions. MessageComposer composes messaging UI and behavior and is not a general Markdown field.

## Anatomy

A toolbar of native buttons precedes the Tiptap contenteditable control. There are no public compound children. Default order is Bold, Italic, Underline, Strike, divider, ordered list, bullet list, divider, Link. Toolbar controls are locally rendered native buttons with project icon-name rendering, by explicit user-confirmed exception to the usual Business→Core visual-component boundary. Each icon is rendered as one glyph; hover/active switches its regular/solid class. The toolbar spans the full editor width with a transparent background and a persistent bottom border separating it from the content. Toolbar buttons have slight corner rounding and no shadow or border. All buttons receive a subtle hover fill; selected buttons retain their selected fill during hover. Group dividers remain visible. Keyboard focus remains visibly indicated. The public icon-name contract is compatible with Core `ButtonIcon`.

## Semantic Contract

The editor exposes a contenteditable textbox named through `aria-label` or `aria-labelledby`. Toolbar controls are native buttons within a toolbar. Normal Tab order is preserved; no roving tabindex is used.

## Variants

No component variants.

## Local Size Variants

No local size variants. Density remains global.

## States

- Default: editing and toolbar actions enabled.
- Read-only: content remains readable; editing and toolbar actions disabled.
- Disabled: editing and toolbar actions disabled.
- Active formatting: item state is reflected through `aria-pressed`.
- Empty: optional placeholder is rendered.

## State Priority and Combination Matrix

Disabled and read-only each block editing/actions. Active formatting does not override these states.

## Public API Contract

- `value: string` is the controlled Markdown value.
- `onValueChange(value)` reports updates.
- `items` replaces exported `markdownEditorDefaultItems` when supplied.
- `onRequestLink({ href, text })` may return a URL or `null`, synchronously or asynchronously.
- `placeholder`, `readOnly`, `disabled` configure content behavior.
- Compatible native div props are forwarded to the root; `children`, `onChange`, and `role` are excluded. Accessible name is applied to the contenteditable control.
- Ref exposes `getHTML()` and `focus()`.

| Public surface | Native target | Ref target | Forwarded props | Owned props | Excluded | Event composition |
|---|---|---|---|---|---|---|
| MarkdownEditor | root div and nested contenteditable | imperative MarkdownEditorRef | compatible root div props | value, editor and toolbar state | children, onChange, role | consumer onKeyDown runs first; defaultPrevented cancels shortcut handling |
| toolbar item | button | none | native button semantics | label, icon, command, active/disabled callbacks | consumer children | onClick invokes item command |

Toolbar items use `type: 'button'`, unique `id`, localized `label`, optional Core `ButtonIcon`, optional shortcut `{ key, ctrlKey?, metaKey?, shiftKey?, altKey? }`, and `onClick(editor)`. Optional `isActive(editor)` and `isDisabled(editor)` provide state. Iconless items display their label.

## Composition

Composition is prop-based through `items`; no public compound parts or children are provided.

## Context Dependencies

No semantic React context. The consumer wrapper provides placement and theme.

## State Ownership

The consumer owns the controlled Markdown value. Tiptap owns transient selection/history only. Toolbar hover state is local UI state and selects whether a single icon glyph uses its regular or solid Font Awesome class.

## Design Tokens

The editor surface owns no background, border, or color. Toolbar button and icon interaction styling is local to MarkdownEditor; foreground colors inherit from the surrounding environment. This is the user-confirmed, toolbar-only exception to the usual Business→Core composition boundary.

## Density Contract

No local density prop or calculation.

## Color and Theme Contract

Surface, background, border, and text color are inherited from wrapper/environment; the editor does not resolve themes.

## Typography Contract

Typography is inherited. Placeholder and custom item labels are consumer-localizable.

## Accessibility Contract

Accessible editor name is required. Icon-only buttons carry localized accessible labels. Native buttons, visible focus, normal Tab sequence, and `aria-pressed` state communication are required.

## Keyboard Contract

Native contenteditable behavior remains. Configured shortcuts match exact key and modifier booleans (`ctrlKey`, `metaKey`, `shiftKey`, `altKey`); matches prevent default and invoke the item. Native buttons activate by Enter/Space.

## Focus Contract

`ref.current.focus()` focuses the editor. No focus trap or restoration is provided.

## Motion Contract

No MarkdownEditor-specific motion. Toolbar buttons use native button behavior and do not add transitions.

## Internationalization and Content Contract

Accessible name, placeholder, and custom item labels come from the consumer. No domain-specific text is introduced.

## Responsive and Layout Behavior

Toolbar wraps within available width. Content uses wrapper width without forcing surface treatment or fixed height.

## Container Interaction

Wrapper owns spacing, border, background, colors, and placement.

## Loading and Async Contract

No loading state. Link URL selection may be asynchronous; consumers own dialog and pending UX.

## Error Contract

No business error display. The consumer owns rejected async link callback errors.

## Performance Characteristics

Tiptap dependencies are imported directly and module boundaries are preserved for tree-shaking.

## Dependencies

Business uses React and Tiptap. MarkdownEditor toolbar controls and icon rendering are local rather than Core UI components; this is the user's explicit exception to the usual Business→Core composition boundary. Icon names remain compatible with the Core `ButtonIcon` string format. Existing Core RichTextEditor is not replaced.

## Non-Goals

No Markdown preview, link dialog, upload support, persistence, message submit flow, or structured mention conversion.

## Escape Hatches and Overrides

Custom `items` replaces defaults. Commands receive Tiptap's editor instance. No arbitrary visual surface override is provided.

## Examples

See controlled value, ref, and toolbar examples in [the Usage Guide](./markdown-editor-usage.md).

## Do / Don't

- Do control and persist Markdown in the application.
- Do provide localized accessible names.
- Do delegate link selection through `onRequestLink`.
- Do not rely on editor-owned background, border, or text color.
- Do not use this component for structured RichTextEditor documents.

## Test Contract

Test controlled Markdown updates/parsing, imperative HTML/focus ref, default/custom toolbar behavior, shortcut modifiers, disabled/read-only, accessible naming, link callback, and long-content wrapping.

## Visual Verification Contract

The supplied toolbar reference is the target: compact B/I/U/S controls, divider before list actions, divider before Link. Link remains the final action; emoji insertion is not introduced. The rounded reply container and removal of the text-control focus outline apply only to the ReplyDraft Story and do not alter component styling. Verify wrapper-owned surface, focus, states, and narrow widths.

## AI Usage Contract

### Use when

A controlled Markdown input with a configurable formatting toolbar is needed.

### Do not use when

Plain text, atomic mentions, attachments, or full message submission are required.

### Required context

Controlled Markdown state, accessible name, wrapper styling, and consumer-owned link UI when needed.

### Forbidden assumptions

Do not invent surface styling, link dialog UI, Markdown underline syntax, or uncontrolled behavior.

### Related decisions

None.

## Open Decisions

No implementation blockers for the confirmed API scope.

## Readiness Assessment

- Design Rules Complete: yes
- Foundation Dependencies Complete: yes
- API Contract Complete: yes
- Semantic Contract Complete: yes
- Accessibility Contract Complete: yes
- Keyboard Contract Complete: yes
- State Matrix Complete: yes
- Density Contract Complete: yes
- Motion Contract Complete: yes
- Internationalization Contract Complete: yes
- Test Contract Complete: yes
- Visual Verification Contract Complete: yes
- Open Implementation Blockers: 0
- Specification Status: IMPLEMENTED

## Specification Change Rules

Changes to value format, toolbar API/order, shortcut behavior, ref, accessibility, Markdown serialization, or wrapper visual ownership require a specification/readiness update.
