---
'@chayns-ui/core': minor
'@chayns-ui/layout': minor
---

Finalize native-prop forwarding and compound component contracts. Core adds
TextField, TextArea, Checkbox, Switch, RadioGroup, SegmentedControl and
MessageBox; `ListItem` is replaced by `List.Item`, and Popup uses
Trigger/Content slots. Layout replaces the Tabs `tabs[]` API with value-based
parts and replaces AppLayout data props with named compound parts. These
intentional pre-1.0 breaking migrations require consumer updates.
