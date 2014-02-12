define([
	"intern!object",
	"intern/chai!assert",
	"../Color",
	"../MeanColorModel"
], function (registerSuite, assert, Color, MeanColorModel) {
	registerSuite({
		name: "ColorModel",
		"twoParametersCtor" : function () {
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

			cm.initialize([20, 20], function (item) {
				return item;
			});
			assert.deepEqual(cm.getColor(5).toRgbaArray(), [0, 0, 0, 1]);
			assert.deepEqual(cm.getColor(0).toRgbaArray(), [0, 0, 0, 1]);

			cm.initialize([0, 5, 20, 50], function (item) {
				return item;
			});
			assert.deepEqual(cm.getColor(5).toRgbaArray(), [32, 32, 32, 1]);
			assert.deepEqual(cm.getColor(0).toRgbaArray(), [0, 0, 0, 1]);
			assert.deepEqual(cm.getColor(50).toRgbaArray(), [100, 100, 100, 1]);
		},
		"singleParameterCtor" : function () {
			var cm = new MeanColorModel(new Color([50, 50, 50]));

			cm.initialize([0, 10, 20], function (item) {
				return item;
			});
			assert.deepEqual(cm.getColor(10).toRgbaArray(), [255, 0, 0, 1]);
			assert.deepEqual(cm.getColor(0).toRgbaArray(), [255, 179, 179, 1]);
			assert.deepEqual(cm.getColor(20).toRgbaArray(), [77, 0, 0, 1]);
		}
	});
});
