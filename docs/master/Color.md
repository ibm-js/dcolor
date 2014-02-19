---
layout: default
title: dcolor/Color
---

# dcolor/Color

The `dcolor/Color` module provides a unified way to store color components and convert back and forth between
color string representations and the `Color` object. It holds the components in rgba form. `dcolor/Color`
objects can often be used directly as a value to the various color properties of the consuming projects.

Before proceeding checkout [setup page](setup.html) on how to setup a project using dcolor. This will be required to leverage the samples from this page.

##### Table of Contents
[Instantiation](#instantiation)  
[Conversion](#conversion)  

<a name="instantiation"></a>
## Instantiation

You can create a `Color` object from a variety of inputs, including CSS string representations of the color as well
 as `[r, b, g]` or `[r, g, b, a]` arrays.

```js
require(["dcolor/Color"], function (Color) {
  // from a CSS string
  var color1 = new Color("rgb(100, 0, 0)");
  var color2 = new Color("#99EE00");
  var color3 = new Color("red");
  var color4 = new Color("hsla(100, 0, 0, 0.5)");
  // from an RGBA Array
  var color5 = new Color([100, 0, 0, 0.5]);
  // from another color or a r,g, b hash
  var color6 = new Color(color3);
  var color7 = new Color({ r: 100, g: 0, b: 0});
});
```

The recognized "named" colors (like "red") is the 16 colors list from [CSS3 Basic color keywords list](http://www.w3.org/TR/css3-color/#html4)
plus the "transparent" keyword. For more keyword support see [`dcolor/ExtendedColor`](ExtendedColor.html) for details.

Instead of using the function constructor you can specifically build or update an existing `Color` object using "from" functions:

 ```js
 require(["dcolor/Color"], function (Color) {
   // create a new object
   var color = Color.fromHex("#99EE00");
   // update an existing color with new components
   Color.fromRgbaString("rgba(100, 0, 0)", color);
 });
 ```

<a name="conversion"></a>
## Conversion

Once you have a `Color` object you can converted it back to a particular string representation as follows:

```js
require(["dcolor/Color"], function (Color) {
  var color = new Color("green");
  var hex = color.toHex();
  var rgb = color.toRgbString();
  var hsla = color.toHslaString(true);
});
```

Or to an array of components:

```js
require(["dcolor/Color"], function (Color) {
  var color = new Color("green");
  var rbga = color.toRgbaArray(); // [r, g, b, a]
  var hsla = color.toHslaArray(); // [h, s, l, a]
});
```



