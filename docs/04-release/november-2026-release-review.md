# November 2026 coordinated package release review

This preparation covers the changes since the last Changesets version commit (`9cfe0ab`). One Changeset coordinates the changed publishable packages:

| Package | Current | Prepared | Reason |
| --- | ---: | ---: | --- |
| `@chayns-ui/business` | 0.0.0 | 0.1.0 | Initial public release of Business components and aggregate stylesheet entry point |
| `@chayns-ui/core` | 0.14.0 | 0.15.0 | New RichTextEditor and MessageComposer APIs |
| `@chayns-ui/layout` | 0.10.0 | 0.10.1 | AppLayout sidebar rendering correction |
| `@chayns-ui/tokens` | 0.8.1 | 0.9.0 | New SideKick-related and tint CSS variables |

The versions shown are the expected Changesets result, not applied package.json versions. The normal version PR will apply versions and changelogs; this preparation does not publish packages or change package versions directly.

## Scope

- Business exposes MarkdownEditor, TeamTalkInput and SideKickInput, with consumer-owned localized text and product data. `@chayns-ui/business/styles.css` aggregates the Business component styles.
- Core adds RichTextEditor and MessageComposer, including capture/dictation functionality and the required Lexical runtime dependencies.
- Tokens add CSS variables used by the SideKick experience.
- Layout avoids mutating render bookkeeping while determining the AppLayout sidebar.

## Release checks

Changesets reports the expected bumps listed above. The first package verification attempt exposed two stale packaging assumptions: the Business dependency allow-list rejected the four Tiptap runtime dependencies already required by MarkdownEditor, and its generated declaration retained a CSS side-effect import even though styles are explicitly loaded from the aggregate stylesheet. The verifier now allows exactly the approved Tiptap versions, and the declaration no longer carries that CSS import.

Package verification passes, including builds, package contents, `publint`, and ESM type resolution. The MarkdownEditor unit suite passes (7 tests). Full workspace checks and manual accessibility, visual/theme/density, zoom/reflow, browser/device and consumer acceptance remain release checks; an automated package check is not a substitute for them.
