/** @module dcolor/SimpleColorModel */
define(["dcl/dcl", "./Color"],
	function (dcl, Color) {

	/**
	 * Base class for color models that return a color from a data value
	 * using an interpolation between two extremum colors.
	 * @class module:dcolor/SimpleColorModel 
	 * @augments {module:dcolor/api/ColorModel}
	 */
	return dcl(null, /** @lends module:dcolor/SimpleColorModel# */ {
		
		_startColor: null,
		_endColor: null,

		/**
		 * Construct a color model interpolating between start and end color.
		 * If only start color is provided use it to compute reasonable start and end
		 * colors from it.
		 * @param {dcolor/Color} startColor The start color.
		 * @param {dcolor/Color} [endColor] The end color.
		 */
		constructor: function (startColor, endColor) {
			if (endColor !== undefined) {
				this._startColor = startColor;
				this._endColor = endColor;
			} else {
				// When only one color is provided
				// use only the hue, and compute
				// the start/end colors by playing
				// with the luminance...
				var hsl = startColor.toHslaArray();
				hsl[1] = 100;
				hsl[2] = 85;
				hsl[3] = startColor.a;
				this._startColor = Color.fromHslaArray(hsl);
				hsl[2] = 15;
				this._endColor = Color.fromHslaArray(hsl);
			}
		},
		
		_getInterpoledValue: function (from, to, value) {
			return (from + (to - from) * value);
		},

		/**
		 * Returns the normalized (between 0 and 1) value for a given data value.
		 * This function must be implemented by implementations.
		 * @param {number} value The data value.
		 * @returns {number} between 0 and 1.
		 */
		getNormalizedValue: function (/* jshint unused: vars */ value) {
		},
	
		getColor: function (value) {
			var completion = this.getNormalizedValue(value);
			var hslFrom = this._startColor.toHslaArray();
			var hslTo = this._endColor.toHslaArray();
			var h = this._getInterpoledValue(hslFrom[0], hslTo[0], completion);
			var s = this._getInterpoledValue(hslFrom[1], hslTo[1], completion);
			var l = this._getInterpoledValue(hslFrom[2], hslTo[2], completion);
			var a = this._getInterpoledValue(this._startColor.a, this._endColor.a, completion);
			return Color.fromHslaArray([h, s, l, a]);
		}
	});
});
