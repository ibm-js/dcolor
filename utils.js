/** @module dcolor/utils */
define(["./Color"], function (Color) {
	return {
		/**
		 * Some color utilities.
		 * @class module:dcolor/SimpleColorModel
		 */

		/**
		 * Blends colors end and start with weight from 0 to 1, 0.5 being a 50/50 blend,
		 * can reuse a previously allocated dcolor/Color object for the result
		 * @param {dcolor/Color} start 
		 * @param {dcolor/Color} end
		 * @param {number} weight blend weight.
		 * @param {dcolor/Color} [obj] optional color instance to re-use and return.
		 * @returns {dcolor/Color}
		 */
		blendColors: function (start, end, weight, obj) {
			// summary:
			//		
			var t = obj || new Color();
			["r", "g", "b", "a"].forEach(function (x) {
				t[x] = start[x] + (end[x] - start[x]) * weight;
				if (x !== "a") {
					t[x] = Math.round(t[x]);
				}
			});
			return t.sanitize();	// dcolor/Color
		}
	};
});