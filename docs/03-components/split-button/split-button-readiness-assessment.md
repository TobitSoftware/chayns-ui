# Split Button – Component Implementation Readiness Gate

## Gate Metadata

- Component Name: Split Button
- Component Category: Core
- Component Specification: `split-button-specification.md`
- Specification Status: BLOCKED
- Relevant Decision IDs: BUTTON-001–006, POPUP-001–005, SPLIT-001–004, A11Y-001–007
- Gate Result: BLOCKED

## Blocking Items

1. Popup semantics and its keyboard/focus contract are unresolved.
2. Split Button public API and variant scope are unresolved.
3. Native DOM/ref structure and trigger ARIA relationship are unresolved.
4. Joined geometry, tokens, density, states and visual verification are unresolved.
5. Disabled and async action behavior are unresolved.

## Final Assessment

This gate authorizes no implementation. The component requires a complete
Popup contract and a separate READY review after all Split Button decisions
are confirmed.
