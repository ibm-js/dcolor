/** @module dcolor/NeutralColorModel */
define(["dcl/dcl", "./SimpleColorModel"], function (dcl, SimpleColorModel) {
	function defaultColorFunc(item) {
		return item;
	}

	/**
	 * Base class for color models that return a color from a data value
	 * using an interpolation between two extremum colors around a neutral value.
	 * @class module:dcolor/NeutralColorModel
	 * @augments {module:dcolor/SimpleColorModel}
	 */
	return dcl(SimpleColorModel, /** @lends module:dcolor/NeutralColorModel# */ {
		
		_min: 0,
		_max: 0,
		_e: 0,

		/*
		 * Construct a color model interpolating between start and end color.
		 * If only start color is provided use it to compute reasonable start and end
		 * colors from it.
		 * @param {dcolor/Color} startColor The start color.
		 * @param {dcolor/Color} [endColor] The end color.
		 * @constructor module:dcolor/SimpleColorModel
		 */
		constructor: function (/* jshint unused: vars*/startColor, endColor) {},

		/**
		 * Initializes the color model from a list of data items and using a function
		 * that returns the value used to compute the color for a given item.
		 * @param {object[]} items The data items.
		 * @param {function} [colorFunc] If the data item is not a Number, a function that returns the value used to 
		 * compute the color for particular data item.
		 */
		initialize: function (items, colorFunc) {
			var values = [];
			var sum = 0;
			var min = 100000000;
			var max = -min;
			if (!colorFunc) {
				colorFunc = defaultColorFunc;
			}
			items.forEach(function (item) {
				var value = colorFunc(item);
				min = Math.min(min, value);
				max = Math.max(max, value);
				sum += value;
				values.push(value);
			});
			values.sort(function (a, b) {return a - b; });
			var neutral = this.computeNeutral(min, max, sum, values);
			this._min = min;
			this._max = max;
			if (this._min === this._max || neutral === this._min) {
				this._e = -1;
			} else {
				this._e = Math.log(0.5) / Math.log((neutral - this._min) / (this._max - this._min));
			}
		},

		/**
		 * Returns the neutral value. This can be for example the mean or average value.
		 * This function must be implemented by implementations.
		 * @param {number} min The minimal value.
		 * @param {number} max The maximum value.
		 * @param {number} sum The sum of all values.
		 * @param {number[]} values The sorted array of values used to compute colors.
 		 * @returns {number} the neutral value.
		 */
		computeNeutral: function (/*jshint unused: vars*/min, max, sum, values) {
		},

		/**
		 * Returns the normalized (between 0 and 1) value for a given data value.
		 * This implementation uses an power function to map neutral value to 0.5
		 * and distribute other values around it.
		 * @param {number} value The data value
		 * @returns {number} The normalized value between 0 and 1.
		 */
		getNormalizedValue: function (value) {
			if (this._e < 0) {
				return 0;
			}
			value = (value - this._min) / (this._max - this._min);
			return Math.pow(value, this._e);
		}
	});

});
