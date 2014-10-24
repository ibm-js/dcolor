# dcolor [![Build Status](https://travis-ci.org/ibm-js/dcolor.png?branch=master)](https://travis-ci.org/ibm-js/dcolor)

This project provides color APIs.

## Status

No official release yet.

## Migration

This is a subset of the former dojox/color project (the ColorModel part) with the addition of the dojo/_base/Color &
dojo/colors modules.

Migration steps from dojox/color to dcolor:

* replace any use of "dojo/_base/Color.blendColors" by "dcolor/utils.blendColors"
* replace any use of "dojo/_base/Color.toString" by "dcolor/Color.toRgbaString(true)"
* replace any other use of "dojo/_base/Color" AMD module by "dcolor/Color"
* replace any use of "dojo/colors" AMD module by "dcolor/ExtendedColor"
* "dojox/color" APIs outside of ColorModel have not been ported and you will need to either port them or find replacements.

## Licensing

This project is distributed by the Dojo Foundation and licensed under the ["New" BSD License](./LICENSE).
All contributions require a [Dojo Foundation CLA](http://dojofoundation.org/about/claForm).

## Dependencies

This project requires the following other projects to run:
 * dcl

## Installation

_Bower_ release installation:

    $ bower install dcolor

_Manual_ master installation: go to the root installation directory and clone dcolor from github:

    $ git clone git://github.com/ibm-js/dcolor.git

Then install dependencies with bower (or manually from github if you prefer to):

	$ cd dcolor
	$ bower install

## Documentation

Documentation is available [here](http://ibm-js.github.io/dcolor/docs/master/index.html)

