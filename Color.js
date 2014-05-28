/** @module dcolor/Color */
define(["dcl/dcl"], function (dcl) {
	function confine(c, low, high) {
		c = Number(c);
		return isNaN(c) ? high : c < low ? low : c > high ? high : c;	// Number
	}

	// this is a standard conversion prescribed by the CSS3 Color Module
	function hue2rgb(m1, m2, h) {
		if (h < 0) {
			++h;
		}
		if (h > 1) {
			--h;
		}
		var h6 = 6 * h;
		if (h6 < 1) {
			return m1 + (m2 - m1) * h6;
		}
		if (2 * h < 1) {
			return m2;
		}
		if (3 * h < 2) {
			return m1 + (m2 - m1) * (2 / 3 - h) * 6;
		}
		return m1;
	}

	function hsla2rgba(h, s, l, a) {
		h = ((h % 360) + 360) % 360 / 360;
		s = s / 100, l = l / 100;
		// calculate rgb according to the algorithm
		// recommended by the CSS3 Color Module
		var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s,
			m1 = 2 * l - m2;
		return [
			hue2rgb(m1, m2, h + 1 / 3) * 256,
			hue2rgb(m1, m2, h) * 256,
			hue2rgb(m1, m2, h - 1 / 3) * 256,
			a
		];
	}

	function rgba2hsla(r, g, b, a) {
		r = r / 255, g = g / 255, b = b / 255;
		var min = Math.min(r, b, g), max = Math.max(r, g, b);
		var delta = max - min;
		var h = 0, s = 0, l = (min + max) / 2;
		if (l > 0 && l < 1) {
			s = delta / ((l < 0.5) ? (2 * l) : (2 - 2 * l));
		}
		if (delta > 0) {
			if (max === r && max !== g) {
				h += (g - b) / delta;
			}
			if (max === g && max !== b) {
				h += (2 + (b - r) / delta);
			}
			if (max === b && max !== r) {
				h += (4 + (r - g) / delta);
			}
			h *= 60;
		}
		return [ h, Math.round(s * 100), Math.round(l * 100), a ];
	}

	/**
	 * Object that internally holds color components as r, g, b and a and provides method for converting to various
	 * color component schemes.
	 * Constructor takes a named string, hex string, array of rgb or rgba values,
	 * an object with r, g, b, and a properties, or another `dcolor/Color` object
	 * and creates a new Color instance to work from.
	 * @param {number[]|string|Object} color color components
	 * @constructor module:dcolor/Color
	 * @example
	 * var c = new Color([0, 0, 0]);
	 * var hex = c.toHex(); // #000000
	 */
	var Color = function (/*Array|String|Object*/ color) {
		if (color) {
			if (typeof color === "string") {
				Color.fromString(color, this);
			} else if (Array.isArray(color)) {
				Color.fromRgbaArray(color, this);
			} else {
				this._set(color.r, color.g, color.b, color.a);
				if (!(color instanceof Color)) {
					this.sanitize();
				}
			}
		}
	};

	/**
	 * Hash list of all CSS named colors, by name. Values are hex string representing r, g, and b values.
	 * @memberOf module:dcolor/Color
	 * @member named
	 */
	Color.named = {
		"black": "#000000",
		"silver": "#c0c0c0",
		"gray": "#808080",
		"white": "#ffffff",
		"maroon": "#800000",
		"red": "#ff0000",
		"purple": "#800080",
		"fuchsia": "#ff00ff",
		"green": "008000",
		"lime": "#00ff00",
		"olive": "#808000",
		"yellow": "#ffff00",
		"navy": "#000080",
		"blue": "#0000ff",
		"teal": "#008080",
		"aqua": "#00ffff",
		"transparent": "rgba(0,0,0,0)"
	};

	dcl.mix(Color.prototype, /** @lends module:dcolor/Color# */{
		r: 255,
		g: 255,
		b: 255,
		a: 1,
		_set: function (r, g, b, a) {
			var t = this;
			t.r = r;
			t.g = g;
			t.b = b;
			t.a = isNaN(a) ? 1 : a;
		},
		/**
		 * Ensures the object has correct attributes.
		 * @returns {dcolor/Color} itself
		 */
		sanitize: function () {
			var t = this;
			t.r = Math.round(confine(t.r, 0, 255));
			t.g = Math.round(confine(t.g, 0, 255));
			t.b = Math.round(confine(t.b, 0, 255));
			t.a = confine(t.a, 0, 1);
			return this;
		},
		/**
		 * Returns a 4 components array of rgba values from the color.
		 * represented by this object.
		 * @returns {number[]}
		 */
		toRgbaArray: function () {
			var t = this;
			return [t.r, t.g, t.b, t.a];
		},
		/**
		 * Returns a 4 components array of rgba values from the color.
		 * represented by this object.
		 * @returns {number[]}
		 */
		toHslaArray: function () {
			var t = this;
			return rgba2hsla(t.r, t.g, t.b, t.a);
		},
		/**
		 * Returns a CSS color string in hexadecimal representation.
		 * @example 
		 * console.log(new Color([0,0,0]).toHex()); // #000000
		 * @returns {string}
		 */
		toHex: function () {
			var arr = ["r", "g", "b"].map(function (x) {
				var s = this[x].toString(16);
				return s.length < 2 ? "0" + s : s;
			}, this);
			return "#" + arr.join("");
		},
		/**
		 * Returns a css color string in rgb(a) representation.
		 * @param {boolean} [includeAlpha] Whether to include alpha component or not.
		 * @returns {string}
		 * @example
		 * var c = new Color("#FFF").toCss();
		 * console.log(c); // rgb(255,255,255)
		 */
		toRgbaString: function (includeAlpha) {
			var t = this, rgb = t.r + ", " + t.g + ", " + t.b;
			return (includeAlpha ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")";
		},
		/**
		 * Returns a css color string in hsl(a) representation
		 * @param {boolean} [includeAlpha] Whether to include alpha component or not.
		 * @returns {string}
		 */
		toHslaString: function (/*Boolean?*/ includeAlpha) {
			var hsla = this.toHslaArray();
			var t = this, hsl = hsla[0] + ", " + hsla[1] + ", " + hsla[2];
			return (includeAlpha ? "hsla(" + hsl + ", " + t.a : "hsl(" + hsla) + ")";
		}
	});

	/**
	 * Returns a `dcolor/Color` instance from a string of the form
	 * "rgb(...)" or "rgba(...)". Optionally accepts a `dcolor/Color`
	 * object to update with the parsed value and return instead of
	 * creating a new object.
	 * @function fromRgbaString
	 * @memberOf module:dcolor/Color
	 * @param {string} color in the rgb(...) or rgba(...) form.
	 * @param {dcolor/Color} [obj]
	 * @returns {dcolor/Color} obj instance if passed
	 */
	Color.fromRgbaString = function (color, obj) {
		var m = color.toLowerCase().match(/^rgba?\(([\s\.,0-9]+)\)/);
		if (m) {
			var c = m[1].split(/\s*,\s*/);
			var r = c[0];
			if (r.charAt(r.length - 1) === "%") {
				// 3 rgb percentage values
				var a = c.map(function (x) {
					return parseFloat(x) * 2.56;
				});
				if (c.length === 4) {
					a[3] = c[3];
				}
				return Color.fromRgbaArray(a, obj);
			}
			return Color.fromRgbaArray(c, obj);
		} else {
			return null;
		}
	};

	/**
	 * Returns a `dcolor/Color` instance from a string of the form
	 * "rgb(...)" or "rgba(...)". Optionally accepts a `dcolor/Color`
	 * object to update with the parsed value and return instead of
	 * creating a new object.
	 * @function fromHslaString
	 * @memberOf module:dcolor/Color
	 * @param {string} color in the hsl(...) or hsla(...) form.
	 * @param {dcolor/Color} [obj]
	 * @returns {dcolor/Color} obj instance if passed
	 */
	Color.fromHslaString = function (color, obj) {
		var m = color.toLowerCase().match(/^hsla?\(([\s\.,0-9]+)\)/);
		if (m) {
			var c = m[1].split(/\s*,\s*/);
			return Color.fromRgbaArray(hsla2rgba(parseFloat(c[0]), parseFloat(c[1]), parseFloat(c[2]),
				c.length === 4 ? c[3] : 1), obj);
		} else {
			return null;
		}
	};

	/**
	 * Converts a hex string with a '#' prefix to a color object.
	 * Supports 12-bit #rgb shorthand. Optionally accepts a
	 * `dcolor/Color` object to update with the parsed value.
	 * @function fromHex
	 * @memberOf module:dcolor/Color
	 * @param {string} color in the #rrggbb or #rrggbbaa form.
	 * @param {dcolor/Color} [obj]
	 * @returns {dcolor/Color} obj instance if passed
	 * @example
	 * var thing = Color.ColorFromHex("#ededed"); // grey, longhand
	 */
	Color.fromHex = function (color, obj) {
		var t = obj || new Color(),
			bits = (color.length === 4) ? 4 : 8,
			mask = (1 << bits) - 1;
		color = Number("0x" + color.substr(1));
		if (isNaN(color)) {
			return null;
		}
		["b", "g", "r"].forEach(function (x) {
			var c = color & mask;
			color >>= bits;
			t[x] = bits === 4 ? 17 * c : c;
		});
		t.a = 1;
		return t;
	};

	/**
	 * Builds a `dcolor/Color` from a 3 or 4 element array, mapping each
	 * element in sequence to the rgb(a) values of the color.
	 * @function fromHex
	 * @memberOf module:dcolor/Color
	 * @param {int[]} a in the [r, g, b] or [r, g, b, a] form.
	 * @param {dcolor/Color} [obj]
	 * @returns {dcolor/Color} obj instance if passed
	 * @example
	 * var myColor = Color.fromRgbaArray([237,237,237,0.5]); // grey, 50% alpha
	 */
	Color.fromRgbaArray = function (a, obj) {
		var t = obj || new Color();
		t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
		if (isNaN(t.a)) {
			t.a = 1;
		}
		return t.sanitize();
	};

	/**
	 * Builds a `dcolor/Color` from a 3 or 4 element array, mapping each
	 * element in sequence to the rgb(a) values of the color.
	 * @function fromHex
	 * @memberOf module:dcolor/Color
	 * @param {int[]} a in the [h, s, l] or [h, s, l, a] form 
	 * @param {dcolor/Color} [obj]
	 * @returns {dcolor/Color} obj instance if passed
	 */
	Color.fromHslaArray = function (a, obj) {
		var t = obj || new Color();
		var c = hsla2rgba(Number(a[0]), Number(a[1]), Number(a[2]), isNaN(Number(a[3])) ? 1 : Number(a[3]));
		t._set(c[0], c[1], c[2], c[3]);
		return t.sanitize();
	};

	/**
	 * Parses `str` for a color value. Accepts hex, rgb, and rgba
	 * style color values.
	 * Acceptable input values for str may include arrays of any form
	 * accepted by dcolor/ColorfromRgbaArray, hex strings such as "#aaaaaa", or
	 * rgb or rgba strings such as "rgb(133, 200, 16)" or "rgba(10, 10,
	 * 10, 50)"
	 * @function fromHex
	 * @memberOf module:dcolor/Color
	 * @param {string} str
	 * @param {dcolor/Color} [obj]
	 * @returns {dcolor/Color} obj instance if passed
	 * @example
	 * var thing = Color.ColorFromHex("#ededed"); // grey, longhand
	 */
	Color.fromString = function (str, obj) {
		var a = Color.named[str];
		return a && ((typeof a === "string" && Color.fromHex(a, obj)) ||  Color.fromRgbaArray(a, obj)) ||
			Color.fromRgbaString(str, obj) || Color.fromHslaString(str, obj) || Color.fromHex(str, obj);
	};

	return Color;
});
