# iconSrc

Use an image URL without pre-creating an image element for each node:

```js
{ id: 'road:1', name: 'Road', iconSrc: '/icons/road.svg' }
// format may also return { iconSrc: '...' }.
```

A non-empty iconSrc takes priority over icon. Empty or non-string values fall back to the existing icon behavior (CSS class or HTMLElement).
The image is assigned as a contained CSS background when the node's icon is rendered. The node still uses the existing virtual list. No eager Image object is created for iconSrc.
