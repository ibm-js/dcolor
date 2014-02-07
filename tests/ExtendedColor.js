define([
	"intern!object",
	"intern/chai!assert",
	"../Color",
	"../ExtendedColor"
], function (registerSuite, assert, Color) {
	var verifyColor = function (source, expected) {
		var color = new Color(source);
		assert.deepEqual(color.toRgbaArray(), expected);
		color.toRgbaArray().forEach(function (n) {
			assert.typeOf(n, "number");
		});
	};
	registerSuite({
		name: "ExtendedColor",
		"extended aliceblue": function () {
			verifyColor("aliceblue", [240, 248, 255, 1]);
		},
		"extended orange": function () {
			verifyColor("orange", [255, 165, 0, 1]);
		},
		"extended yellowgreen": function () {
			verifyColor("yellowgreen", [154, 205, 50, 1]);
		}
	});
});
