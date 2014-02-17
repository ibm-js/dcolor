---
layout: default
title: dcolor/utils
---

# dcolor/utils

`dcolor/utils` provides utilities to deal with `dcolor/Color` instances.

Before proceeding checkout [setup page](setup.md) on how to setup a project using dcolor. This will be required to leverage the samples from this page.

##### Table of Contents
[Blend Colors](#blend)

<a name="blend"></a>
## Blend Colors

`dcolor/utils.blendColors` allows to blend two colors together to form a third color. A weight can be applied. A `0.5`
weight means 50/50 blend.

```js
require(["dcolor/utils", "dcolor/Color"], function (utils, Color) {
    var color = utils.blendColors(new Color("green"), new Color("red"), 30);
});
```

