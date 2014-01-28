define(["./Color"], function (Color) {
	return {
		// summary:
		//		Somme color utilities.

		blendColors: function (/*dcolor/Color*/ start, /*dcolor/Color*/ end, /*Number*/ weight, /*dcolor/Color?*/ obj) {
			// summary:
			//		Blend colors end and start with weight from 0 to 1, 0.5 being a 50/50 blend,
			//		can reuse a previously allocated dcolor/Color object for the result
			var t = obj || new Color();
			["r", "g", "b", "a"].forEach(function (x) {
				t[x] = start[x] + (end[x] - start[x]) * weight;
				if (x !== "a") {
					t[x] = Math.round(t[x]);
				}
			});
			return t.sanitize();	// dojo.Color
		}
	};
});