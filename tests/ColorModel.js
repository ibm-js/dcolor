define(["doh", "dojo/_base/declare", "../MeanColorModel", "dojo/_base/Color"],
	function (doh, declare, MeanColorModel, Color) {
		doh.register("tests.MeanColorModel", [
			function testValues(t) {
				var cm = new MeanColorModel(new Color([0, 0, 0]), new Color([100, 100, 100]));
				cm.initialize([0, 10, 20], function (item) {
					return item;
				});
				t.is([50, 50, 50], cm.getColor(10).toRgb());
				t.is([0, 0, 0], cm.getColor(0).toRgb());
				t.is([99, 99, 99], cm.getColor(20).toRgb());

				cm.initialize([0, 5, 20], function (item) {
					return item;
				});
				t.is([50, 50, 50], cm.getColor(5).toRgb());
				t.is([0, 0, 0], cm.getColor(0).toRgb());
				t.is([99, 99, 99], cm.getColor(20).toRgb());

			}
		]);
	});
