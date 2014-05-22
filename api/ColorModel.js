/** @module dcolor/api/ColorModel */
define(["dcl/dcl"], function (dcl) {
	/**
	 * @summary
	 * API for classes that implement a color model that returns a color from a data value.
	 * @class module:dcolor/api/ColorModel
	 */
	return dcl(null, /** @lends module:dcolor/api/ColorModel# */ {
		/**
		 * Optionally initialize the color model from a list of data items and using a function
		 * that returns the value used to compute the color for a given item.
		 * @param {object[]} items The data items.
		 * @param {Function} colorFunc The function that returns the value used to compute the color for particular 
		 * data item.
		 */
		initialize: function (/*jshint unused: vars*/items, colorFunc) {
		},
		/**
		 * Returns the color for a given data value.
		 * @param {number} value The data value.
		 * @returns {dcolor/Color} The corresponding color.
		 */
		getColor: function (/*jshint unused: vars*/value) {
		}
	});
});
