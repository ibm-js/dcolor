define([
	"intern!object",
	"intern/chai!assert",
	"../Color",
	"../MeanColorModel"
], function (registerSuite, assert, Color, MeanColorModel) {
	registerSuite({
		name: "ColorModel",
		"testMeanColorModel" : function () {
			var cm = new MeanColorModel(new Color([0, 0, 0]), new Color([100, 100, 100]));

			cm.initialize([0, 10, 20], function (item) {
				return item;
			});
			assert.deepEqual(cm.getColor(10).toRgbaArray(), [50, 50, 50, 1]);
			assert.deepEqual(cm.getColor(0).toRgbaArray(), [0, 0, 0, 1]);
			assert.deepEqual(cm.getColor(20).toRgbaArray(), [100, 100, 100, 1]);

			cm.initialize([0, 5, 20], function (item) {
				return item;
			});
			assert.deepEqual(cm.getColor(5).toRgbaArray(), [50, 50, 50, 1]);
			assert.deepEqual(cm.getColor(0).toRgbaArray(), [0, 0, 0, 1]);
			assert.deepEqual(cm.getColor(20).toRgbaArray(), [100, 100, 100, 1]);
		}
	});
});
