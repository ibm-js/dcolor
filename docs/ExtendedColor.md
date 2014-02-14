---
layout: default
title: dcolor/ExtendedColor
---

# dcolor/ExtendedColor

The `dcolor/ExtendedColor` module provides a unified way to store color components and convert back and forth between
color string representations and the `ExtendedColor` object. It holds the components in rgba form. It extends
the `dcolor/Color` object with support for more "named" colors. It behaves entirely as the object it extends.

Before proceeding checkout [setup page](setup) on how to setup a project using dcolor. This will be required to leverage the samples from this page.

##### Table of Contents
[Instantiation](#instantiation)

<a name="instantiation"></a>
## Instantiation

You can create a `ExtendedColor` object from a variety of inputs, including CSS string representations of the color as well
 as `[r, b, g]` or `[r, g, b, a]` arrays.

```js
require(["dcolor/Color"], function (Color) {
  // from a CSS string
  var color1 = new Color("azure");
  var color3 = new Color("beige");
});
```

The recognized "named" colors (like "azure") is the 16 colors list from [CSS3 Basic color keywords list](http://www.w3.org/TR/css3-color/#html4)
as well as the [CSS3 Extended color keywords list](http://www.w3.org/TR/css3-color/#svg-color] also known as SVG color plus the "transparent" keyword.

Checkout [`dcolor/Color`](Color) documentation for more details on using `ExtendedColor` object.


