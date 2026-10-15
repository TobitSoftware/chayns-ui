# SearchBox — Component Implementation Readiness Gate

- Specification: `search-box-specification.md`
- Gate Result: READY
- Checked: 2026-10-15
- Category: Core
- Relevant decisions: SEARCH-001–008, CORE-004–005, CORE-009–010, CORE-012–014, CORE-016–018
- Foundation dependencies: semantic tokens, global density, overlay position hook, React portal
- Related components: TextField, ComboBox, Avatar

The complete controlled data contract, slot and item identity contract, native input/ref mapping, editable combobox semantics, focus behavior, keyboard behavior, Backspace removal, localization inputs, Bodywork visual mapping, reduced motion treatment, and test/story acceptance criteria are specified. The checked Bodywork reference is `Textfelder & Suche` and `Auswahl & Formular-Kontrollen`, including `.ff-field`, person-selection chips, and `tobit-ds.css`, checked 2026-10-15.

No unresolved design-review, API, accessibility, localization, token, density, or architecture decision blocks SearchBox. Async filtering and any business data retrieval deliberately remain application responsibility and are not component requirements.
