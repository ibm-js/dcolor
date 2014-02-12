define([
	"intern!object",
	"intern/chai!assert",
	"../Color"
], function (registerSuite, assert, Color) {
	var white  = Color.fromString("white").toRgbaArray();
	var maroon = Color.fromString("maroon").toRgbaArray();
	var verifyColor = function (source, expected) {
		var color = new Color(source);
		assert.deepEqual(color.toRgbaArray(), expected);
		color.toRgbaArray().forEach(function (n) {
			assert.typeOf(n, "number");
		});
	};
	registerSuite({
		name: "Color",
		"maroon string": function () {
			verifyColor("maroon", maroon);
		},
		"white string": function () {
			verifyColor("white", white);
		},
		"white hex short": function () {
			verifyColor("#fff", white);
		},
		"white hex": function () {
			verifyColor("#ffffff", white);
		},
		"white rgb": function () {
			verifyColor("rgb(255,255,255)", white);
		},
		"maroon hex": function () {
			verifyColor("#800000", maroon);
		},
		"maroon rgb": function () {
			verifyColor("rgb(128, 0, 0)", maroon);
		},
		"aliceblue rgba": function () {
			verifyColor("rgba(128, 0, 0, 0.5)", [128, 0, 0, 0.5]);
		},
		"maroon rgba == rgba": function () {
			verifyColor(maroon, maroon);
		},
		"rgb alpha": function () {
			verifyColor([1, 2, 3], [1, 2, 3, 1]);
		},
		"array": function () {
			verifyColor([1, 2, 3, 0.5], [1, 2, 3, 0.5]);
		},
		"from hsl": function () {
			verifyColor("hsl(0, 0, 50)", [128, 128, 128, 1]);
			verifyColor("hsl(0, 100, 50)", [255, 0, 0, 1]);
			verifyColor("hsl(120, 100, 50)", [0, 255, 0, 1]);
			verifyColor("hsl(240, 100, 50)", [0, 0, 255, 1]);
			verifyColor("hsl(60, 100, 50)", [255, 255, 0, 1]);
		},
		"to hsl": function () {
			var grey = new Color({ r: 128, g: 128, b: 128 });
			var red = new Color({ r: 255, g: 0, b: 0 });
			var green = new Color({ r: 0, g: 255, b: 0 });
			var blue = new Color({ r: 0, g: 0, b: 255 });
			var yellow = new Color({ r: 255, g: 255, b: 0 });
			verifyColor(grey.toHslaString(),  [128, 128, 128, 1]);
			verifyColor(red.toHslaString(), [255, 0, 0, 1]);
			verifyColor(green.toHslaString(), [0, 255, 0, 1]);
			verifyColor(blue.toHslaString(), [0, 0, 255, 1]);
			verifyColor(yellow.toHslaString(), [255, 255, 0, 1]);
			assert.deepEqual(grey.toHslaArray(),  [0, 0, 50, 1]);
			assert.deepEqual(red.toHslaArray(), [0, 100, 50, 1]);
			assert.deepEqual(green.toHslaArray(), [120, 100, 50, 1]);
			assert.deepEqual(blue.toHslaArray(), [240, 100, 50, 1]);
			assert.deepEqual(yellow.toHslaArray(), [60, 100, 50, 1]);
		}
	});
});