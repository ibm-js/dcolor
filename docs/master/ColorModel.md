---
layout: default
title: dcolor/api/ColorModel
---

# Color Models

`dcolor` provides a set of color model modules that you can either use directly or extend to build your own models. The
purpose of a color model is to map values to colors allowing one to colorize data output based on the value of the data.

Before proceeding checkout [setup page](setup.html) on how to setup a project using dcolor. This will be required to leverage the samples from this page.

##### Table of Contents
[SimpleColorModel](#simple)
[NeutralColorModel](#neutral)
[MeanColorModel](#mean)

<a name="simple"></a>
## SimpleColorModel

`dcolor/SimpleColorModel` is the base class most color models will extend. It is built from two extremum color values
between which the various colors will be build linearly in the HSL color space.

One must call the `getColor()` method on the model passing the input value as argument in order to get the corresponding
`dcolor/Color` object for this value.

In order to use a `SimpleColorModel` you will need to extend it and implement the `getNormalizedValue()` method that must
return a value between 0 and 1 for the values that are passed to it.

```js
require(["dcl/dcl", "dcolor/SimpleColorModel", "dcolor/Color"], function (dcl, SimpleColorModel, Color) {
	var MyModel = dcl(SimpleColorModel, {
		getNormalizedValue: function (value) {
		    // we know our data are always between 0 and 500, do a simple linear interpolation to normalize them
		    // between 0 and 1:
		    return value / 500;
        }
	});
	var myModelInstance = new MyModel(new Color("red"), new Color("green"));
	var color1 = myModelInstance.getColor(50);
	var color2 = myModelInstance.getColor(480);
});
```

Optionally a single color value can be passed in at construction time in which case the two extremum color values will be
computed from it using it hue and varying the luminance.

<a name="neutral"></a>
## NeutralColorModel

`dcolor/NeutralColorModel` is a base class for models using an interpolation between two extremum colors around a
neutral value in a data set. Typically the mean or average of that data values.

In order to use a `NeutralColorModel` you will need to extend it and implement the `computeNeutral()` method that must
return a value from the data set that is the neutral value around witch colors will be "dispatched".

```js
require(["dcl/dcl", "dcolor/NeutralColorModel", "dcolor/Color"], function (dcl, NeutralColorModel, Color) {
	var AverageColorModel = dcl(NeutralColorModel, {
		computeNeutral: function (min, max, sum, values) {
			// summary:
			//		Return the neutral value in this case the average value of the data values.
			// min: Number
			//		The minimal value.
			// max: Number
			//		The maximum value.
			// sum: Number
			//		The sum of all values.
			// values: Number[]
			//		The sorted array of values used to compute colors.
			return (min + max) / 2;
		}
	});
	var myAvgModel = new AverageModel(new Color("red"), new Color("green"));
	myAvgModel.initialize([0, 250, 500]);
	var color1 = myAvgModel.getColor(50);
	var color2 = myAvgModel.getColor(480);
});
```

As you notice for the neutral value to be correctly computed you must, before actually using the model, call the
`initialize()` method of the model passing through the set of data values that will be used to compute the neutral value.

<a name="mean"></a>
## MeanColorModel

`dcolor/MeanColorModel` is a color model providing an interpolation between two extremum colors around the mean value
of a data set.

This color model does not require to be extended and can just be used after having been initialized using the
`initialize()` method. One must pass to it the set of data values to consider to compute the mean value as well as
an optional function to query the value from the data items.

```js
require(["dcl/dcl", "dcolor/MeanColorModel", "dcolor/Color"], function (dcl, MeanColorModel, Color) {
	var myModel = new MeanModel(new Color("red"), new Color("green"));
	myAvgModel.initialize([{ value: 100}, {value: 500}, {value: 700}], function (item) { return item.value });
	var color1 = myModel.getColor(150);
	var color2 = myModel.getColor(480);
});
```

