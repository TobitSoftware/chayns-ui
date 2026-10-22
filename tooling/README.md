# Tooling

Repository-weites Tooling wird hier gehalten und nicht mit den Paketen veröffentlicht.

* `verify-tokens.mjs` erzeugt Baseline/Patch zweimal und vergleicht den Byte-Hash sowie Pflichtselektoren.
* `verify-package.mjs` prüft Tarball-Inhalte, Exports, `publint`, ESM-Typauflösung und Peer-/Dependency-Grenzen.
* `verify-tree-shaking.mjs` installiert echte Tarballs in einer temporären Consumer-Kopie und vergleicht codehaltige Root-/Subpath-Builds.
* `verify-consumer.mjs` typecheckt, baut und rendert dieselben Tarballs in einer isolierten React-/Vite-Anwendung serverseitig.

Alle temporären Verzeichnisse entstehen außerhalb des Repositorys. Der Einstiegspunkt `corepack pnpm verify` verbindet Formatting, Linting, Typen, Unit-/Browser-/Accessibility-Tests, Builds, Storybook und die Paketprüfungen.

## Specification-first documentation checks

`node tooling/verify-component-docs.mjs` checks the workspace. An optional positional
root directory supports isolated regression fixtures. `node --test
tooling/tests/verify-component-docs.test.mjs` runs those fixtures without a new
framework or modifying workspace documents.

An explicitly confirmed `preImplementation` decision permits planned examples to
be syntax/import checked before a component exists, with a referenced nonempty
acceptance/story plan. Implemented/exported components still require real stories,
usage imports and public-example typechecks.
