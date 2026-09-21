# List — Component Specification

## Metadata

- Component Category: Core
- Specification Status: READY FOR IMPLEMENTATION
- Design Reference: Bodywork list-row treatment, retrieved 2026-09-17
- Relevant Decisions: CORE-010–012, LIST-006–009, A11Y-001–007, DIST-015

## Purpose and boundary

List presents a vertical collection of related rows. `List.Item` is only valid below List. Its parts encode row anatomy and keep a primary interaction separate from trailing controls: `Action`, `Leading`, `Body`, `Title`, `Description`, `Trailing` and `Status`. List is not a table, selection model or disclosure control.

## Public API and native-prop ownership

| Part | Rendered element / ref | Ownership |
| --- | --- | --- |
| `List` | `<ul>` / `HTMLUListElement` | all compatible ul props, including `id`, `className`, `data-*`, `aria-*` |
| `List.Item` | `<li>` / `HTMLLIElement` | all compatible li props; row structural owner |
| `List.Item.Action` | `<a>` when `href`, otherwise `<button type="button">` / matching native ref | compatible anchor/button props; sole row interaction owner |
| `Leading`, `Body`, `Title`, `Description`, `Trailing` | semantic `<div>` or text element / no public ref | documented placement and consumer children |
| `Status` | decorative dot plus visually hidden label / no public ref | required semantic `label`; neutral, non-chat-specific status indicator |

`Action` fixes `type="button"` for buttons. Anchor `href` selects anchor rendering; an action has no generic root-props bag. `List.Item` owns the `li`, so `Action` and `Trailing` remain siblings. Native Action events are forwarded unchanged. Every non-root part rejects use outside its documented parent with a clear development error.

## DOM, interaction and visual contract

List emits `<ul>`, Item emits `<li>`. Item Context validates parts and records no mutable state. An Action emits one native anchor or button. Leading and Body are inside Action when Action is used; without Action consumers may compose static parts directly. Trailing is always a sibling of Action. Status is placed in Leading or Trailing by consumer composition and pairs its visible dot with a visually hidden localised label.

Bodywork supplies surface, border, `--k12`/`--k16` spacing, `--fs-body` title and `--fs-meta` description treatment. Interactive Action gets native hover, focus and disabled states. It never contains a trailing interactive element. No local density prop, external margin, Context state or artificial visual subparts exist.

## Accessibility and keyboard

Native list, list-item, anchor and button semantics remain authoritative. Tab traverses Action and any separate Trailing control; Enter activates links/buttons and Space activates buttons. Disabled Action buttons are natively inactive. Status is not colour-only because `label` is required. The standard row preview follows Bodywork: title and description remain one line and use ellipsis when the available width is insufficient. The full localized value remains available through the surrounding accessible name or the consumer's detail view. Tests cover DOM nesting, all native-prop targets and refs, Action link/button semantics, event forwarding, Status labelling and invalid compound placement.

## Migration

`ListItem` is removed in the pre-stable minor release. Replace data-style props with explicit composition:

```tsx
// Before
<ListItem href="/messages" title="Eva" subtitle="Neue Nachricht" unread unreadLabel="Ungelesen" />

// After
<List.Item>
  <List.Item.Action href="/messages">
    <List.Item.Body>
      <List.Item.Title>Eva</List.Item.Title>
      <List.Item.Description>Neue Nachricht</List.Item.Description>
    </List.Item.Body>
  </List.Item.Action>
  <List.Item.Trailing><List.Item.Status label="Ungelesen" /></List.Item.Trailing>
</List.Item>
```

## AI usage contract

Use public parts only below their documented parent. Place native list props on List, li props on Item and native interactive props on Action. Do not import removed `ListItem`, nest controls in Action, or create arbitrary internal-part trees.
