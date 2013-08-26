define(["doh", "dcolor/utils", "dojo/_base/Color"], function(doh, utils, Color){
	/************************************************************
	 *	Note that some color translations are not exact,
	 *	due to the need to round calculations in translation.
	 *
	 *	These tests work with grey, the primary colors and
	 *	one secondary color to ensure that extreme calculation
	 *	is correct.
	 ************************************************************/

	doh.register("utils.tests._base", [
		function testStaticMethods(t){
			//	fromCmy
			t.assertEqual(utils.fromCmy({ c:50, m:50, y:50}), new Color({ r:128, g:128, b:128 }));
			t.assertEqual(utils.fromCmy({ c:0, m:100, y:100}), new Color({ r:255, g:0, b:0 }));
			t.assertEqual(utils.fromCmy({ c:100, m:0, y:100}), new Color({ r:0, g:255, b:0 }));
			t.assertEqual(utils.fromCmy({ c:100, m:100, y:0}), new Color({ r:0, g:0, b:255 }));
			t.assertEqual(utils.fromCmy({ c:0, m:0, y:100}), new Color({ r:255, g:255, b:0 }));

			//	fromCmyk
			t.assertEqual(utils.fromCmyk({ c:0, m:0, y:0, b:50}), new Color({ r:128, g:128, b:128 }));
			t.assertEqual(utils.fromCmyk({ c:0, m:100, y:100, b:0}), new Color({ r:255, g:0, b:0 }));
			t.assertEqual(utils.fromCmyk({ c:100, m:0, y:100, b:0}), new Color({ r:0, g:255, b:0 }));
			t.assertEqual(utils.fromCmyk({ c:100, m:100, y:0, b:0}), new Color({ r:0, g:0, b:255 }));
			t.assertEqual(utils.fromCmyk({ c:0, m:0, y:100, b:0}), new Color({ r:255, g:255, b:0 }));

			//	fromHsl
			t.assertEqual(utils.fromHsl({ h:0, s:0, l:50}), new Color({ r:128, g:128, b:128 }));
			t.assertEqual(utils.fromHsl({ h:0, s:100, l:50}), new Color({ r:255, g:0, b:0 }));
			t.assertEqual(utils.fromHsl({ h:120, s:100, l:50}), new Color({ r:0, g:255, b:0 }));
			t.assertEqual(utils.fromHsl({ h:240, s:100, l:50}), new Color({ r:0, g:0, b:255 }));
			t.assertEqual(utils.fromHsl({ h:60, s:100, l:50}), new Color({ r:255, g:255, b:0 }));

			//	fromHsv
			t.assertEqual(utils.fromHsv({ h:0, s:0, v:50}), new Color({ r:128, g:128, b:128 }));
			t.assertEqual(utils.fromHsv({ h:0, s:100, v:100}), new Color({ r:255, g:0, b:0 }));
			t.assertEqual(utils.fromHsv({ h:120, s:100, v:100}), new Color({ r:0, g:255, b:0 }));
			t.assertEqual(utils.fromHsv({ h:240, s:100, v:100}), new Color({ r:0, g:0, b:255 }));
			t.assertEqual(utils.fromHsv({ h:60, s:100, v:100}), new Color({ r:255, g:255, b:0 }));
		},
		function testColorExtensions(t){
			var grey = new Color({ r:128, g:128, b:128 });
			var red = new Color({ r:255, g:0, b:0 });
			var green = new Color({ r:0, g:255, b:0 });
			var blue = new Color({ r:0, g:0, b:255 });
			var yellow = new Color({ r:255, g:255, b:0 });

			//	toCmy
			t.assertEqual(utils.toCmy(grey), { c:50, m:50, y:50 });
			t.assertEqual(utils.toCmy(red), { c:0, m:100, y:100 });
			t.assertEqual(utils.toCmy(green), { c:100, m:0, y:100 });
			t.assertEqual(utils.toCmy(blue), { c:100, m:100, y:0 });
			t.assertEqual(utils.toCmy(yellow), { c:0, m:0, y:100 });

			//	toCmyk
			t.assertEqual(utils.toCmyk(grey), { c:0, m:0, y:0, b:50 });
			t.assertEqual(utils.toCmyk(red), { c:0, m:100, y:100, b:0 });
			t.assertEqual(utils.toCmyk(green), { c:100, m:0, y:100, b:0 });
			t.assertEqual(utils.toCmyk(blue), { c:100, m:100, y:0, b:0 });
			t.assertEqual(utils.toCmyk(yellow), { c:0, m:0, y:100, b:0 });

			//	toHsl
			t.assertEqual(utils.toHsl(grey), { h:0, s:0, l:50 });
			t.assertEqual(utils.toHsl(red), { h:0, s:100, l:50 });
			t.assertEqual(utils.toHsl(green), { h:120, s:100, l:50 });
			t.assertEqual(utils.toHsl(blue), { h:240, s:100, l:50 });
			t.assertEqual(utils.toHsl(yellow), { h:60, s:100, l:50 });

			//	toHsv
			t.assertEqual(utils.toHsv(grey), { h:0, s:0, v:50 });
			t.assertEqual(utils.toHsv(red), { h:0, s:100, v:100 });
			t.assertEqual(utils.toHsv(green), { h:120, s:100, v:100 });
			t.assertEqual(utils.toHsv(blue), { h:240, s:100, v:100 });
			t.assertEqual(utils.toHsv(yellow), { h:60, s:100, v:100 });
		}
	]);
});
