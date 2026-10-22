# Per-node showCheckbox

With global showCheckbox enabled, set a node's showCheckbox to false to hide its checkbox. The format callback may also return this field. Omitting it preserves the global setting; a node cannot enable checkboxes when the global option is false.

Hidden checkboxes create no control or alignment placeholder, have no input or focus target, and do not toggle through checkOnClickNode. Node clicks, expansion, context menus and dragging retain their existing behavior. The field does not change checked data or programmatic checking/parent propagation. Radio controls are unchanged.

```js
format: data => ({
  id: data.id,
  name: data.name,
  showCheckbox: data.type !== 'road'
})
```
