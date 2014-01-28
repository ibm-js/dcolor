define(["dcl/dcl", "./Color"],
	function (dcl, Color) {
	
	return dcl(null, {
		// summary:
		//		Base class for color models that return a color from a data value
		//		using an interpolation between two extremum colors.
		
		_startColor: null,
		_endColor: null,
	
		constructor: function (startColor, endColor) {
			// summary:
			//		Construct a color model interpolating between start and end color.
			//		If only start color is provided use it to compute reasonable start and end
			//		colors from it.
			// startColor: dojo/_base/Color
			//		The start color. 
			// endColor: dojo/_base/Color?
			//		The end color.
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
	
		getNormalizedValue: function (/*value*/) {
			// summary:
			//		Return the normalized (between 0 and 1) value for a given data value.
			//		This function must be implemented by implementations.
			// value: Number
			//		The data value.
		},
	
		getColor: function (value) {
			// summary:
			//		return the color for a given data value.
			// value: Number
			//		The data value.
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
