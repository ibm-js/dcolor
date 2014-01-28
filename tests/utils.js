define([
	"intern!object",
	"intern/chai!assert",
	"../Color", "../utils"
], function (registerSuite, assert, Color, utils) {
	var verifyColor = function (source, expected) {
		var color = new Color(source);
		assert.deepEqual(color.toRgbaArray(), expected);
		color.toRgbaArray().forEach(function (n) {
			assert.typeOf(n, "number");
		});
	};
	registerSuite({
		name: "utils",
		blend: function () {
			verifyColor(utils.blendColors(new Color("black"), new Color("white"), 0.5), [128, 128, 128, 1]);
		}
	});
});
