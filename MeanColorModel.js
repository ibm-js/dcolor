/** @module dcolor/MeanColorModel */
define(["dcl/dcl", "./NeutralColorModel"],
	function (dcl, NeutralColorModel) {

	/**
	 * A color model that returns a color from a data value
	 * using an interpolation between two extremum colors around the mean value.
	 * @class module:dcolor/MeanColorModel
	 * @augments {module:dcolor/NeutralColorModel}
	 */
	return dcl(NeutralColorModel, /** @lends module:dcolor/MeanColorModel# */ {

		/*
		 * @borrows module:dcolor/SimpleColorModel.constructor as constructor
		 */
		
		/**
		 * Returns the neutral value in this case the mean value of the data values.
		 * @param {number} min The minimal value.
		 * @param {number} max The maximum value.
		 * @param {number} sum The sum of all values.
		 * @param {number[]} values The sorted array of values used to compute colors.
		 * @returns {number} the mean value.
		 */
		computeNeutral: function (min, max, sum, values) {
			var median = min;
			if (values.length !== 0) {
				if (values.length < 3) {
					median = sum / values.length;
				} else if ((values.length & 1) === 0) {
					median = (values[values.length / 2 - 1] + values[values.length / 2]) / 2;
				} else {
					median = values[Math.floor(values.length / 2)];
				}
			}
			return median;
		}
	});
});
