define(["dcl/dcl"], function (dcl) {
	function confine(c, low, high) {
		// summary:
		//		sanitize a color component by making sure it is a number,
		//		and clamping it to valid values
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

	var Color = function (/*Array|String|Object*/ color) {
		// summary:
		//		Takes a named string, hex string, array of rgb or rgba values,
		//		an object with r, g, b, and a properties, or another `dojo.Color` object
		//		and creates a new Color instance to work from.
		//
		// example:
		//		Work with a Color instance:
		//	 | var c = new dojo.Color();
		//	 | c.setColor([0,0,0]); // black
		//	 | var hex = c.toHex(); // #000000
		//
		// example:
		//		Work with a node's color:
		//	 | var color = dojo.style("someNode", "backgroundColor");
		//	 | var n = new dojo.Color(color);
		//	 | // adjust the color some
		//	 | n.r *= .5;
		//	 | console.log(n.toString()); // rgb(128, 255, 255);
		if (color) {
			this.setColor(color);
		}
	};

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

	/*=====
	 lang.mixin(Color,{
		named:{
			// summary:
			//		hash list of all CSS named colors, by name. Values are 3-item arrays with corresponding
			//		RG and B values.
		}
	 });
	 =====*/

	dcl.mix(Color.prototype, {
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
		setColor: function (/*Array|String|Object*/ color) {
			// summary:
			//		Takes a named string, hex string, array of rgb or rgba values,
			//		an object with r, g, b, and a properties, or another `dojo.Color` object
			//		and sets this color instance to that value.
			//
			// example:
			//	|	var c = new dojo.Color(); // no color
			//	|	c.setColor("#ededed"); // greyish
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
		},
		sanitize: function () {
			// summary:
			//		Ensures the object has correct attributes
			var t = this;
			t.r = Math.round(confine(t.r, 0, 255));
			t.g = Math.round(confine(t.g, 0, 255));
			t.b = Math.round(confine(t.b, 0, 255));
			t.a = confine(t.a, 0, 1);
			return this;	// dojo.Color
		},
		toRgbaArray: function () {
			// summary:
			//		Returns a 4 component array of rgba values from the color
			//		represented by this object.
			var t = this;
			return [t.r, t.g, t.b, t.a];	// Array
		},
		toHslaArray: function () {
			// summary:
			//		Returns a 4 component array of rgba values from the color
			//		represented by this object.
			var t = this;
			return rgba2hsla(t.r, t.g, t.b, t.a);
		},
		toHex: function () {
			// summary:
			//		Returns a CSS color string in hexadecimal representation
			// example:
			//	|	console.log(new dojo.Color([0,0,0]).toHex()); // #000000
			var arr = ["r", "g", "b"].map(function (x) {
				var s = this[x].toString(16);
				return s.length < 2 ? "0" + s : s;
			}, this);
			return "#" + arr.join("");	// String
		},
		toRgbaString: function (/*Boolean?*/ includeAlpha) {
			// summary:
			//		Returns a css color string in rgb(a) representation
			// example:
			//	|	var c = new dojo.Color("#FFF").toCss();
			//	|	console.log(c); // rgb('255','255','255')
			var t = this, rgb = t.r + ", " + t.g + ", " + t.b;
			return (includeAlpha ? "rgba(" + rgb + ", " + t.a : "rgb(" + rgb) + ")";	// String
		},
		toHslaString: function (/*Boolean?*/ includeAlpha) {
			// summary:
			//		Returns a css color string in rgb(a) representation
			// example:
			//	|	var c = new dojo.Color("#FFF").toCss();
			//	|	console.log(c); // rgb('255','255','255')
			var hsla = this.toHslaArray();
			var t = this, hsl = hsla[0] + ", " + hsla[1] + ", " + hsla[2];
			return (includeAlpha ? "hsla(" + hsl + ", " + t.a : "hsl(" + hsla) + ")";	// String
		}
	});

	Color.fromRgbaString = function (/*String*/ color, /*dojo.Color?*/ obj) {
		// summary:
		//		Returns a `dojo.Color` instance from a string of the form
		//		"rgb(...)" or "rgba(...)". Optionally accepts a `dojo.Color`
		//		object to update with the parsed value and return instead of
		//		creating a new object.
		// returns:
		//		A dojo.Color object. If obj is passed, it will be the return value.
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
				return Color.fromRgbaArray(a, obj); // dojo.Color
			}
			return Color.fromRgbaArray(c, obj); // dojo.Color
		} else {
			return null;
		}
	};

	Color.fromHslaString = function (/*String*/ color, /*dojo.Color?*/ obj) {
		// summary:
		//		Returns a `dojo.Color` instance from a string of the form
		//		"rgb(...)" or "rgba(...)". Optionally accepts a `dojo.Color`
		//		object to update with the parsed value and return instead of
		//		creating a new object.
		// returns:
		//		A dojo.Color object. If obj is passed, it will be the return value.
		var m = color.toLowerCase().match(/^hsla?\(([\s\.,0-9]+)\)/);
		if (m) {
			var c = m[1].split(/\s*,\s*/);
			return Color.fromRgbaArray(hsla2rgba(parseFloat(c[0]), parseFloat(c[1]), parseFloat(c[2]),
				c.length === 4 ? c[3] : 1), obj);
		} else {
			return null;
		}
	};

	Color.fromHex = function (/*String*/ color, /*dojo.Color?*/ obj) {
		// summary:
		//		Converts a hex string with a '#' prefix to a color object.
		//		Supports 12-bit #rgb shorthand. Optionally accepts a
		//		`dojo.Color` object to update with the parsed value.
		//
		// returns:
		//		A dojo.Color object. If obj is passed, it will be the return value.
		//
		// example:
		//	 | var thing = dojo.colorFromHex("#ededed"); // grey, longhand
		//
		// example:
		//	| var thing = dojo.colorFromHex("#000"); // black, shorthand
		var t = obj || new Color(),
			bits = (color.length === 4) ? 4 : 8,
			mask = (1 << bits) - 1;
		color = Number("0x" + color.substr(1));
		if (isNaN(color)) {
			return null; // dojo.Color
		}
		["b", "g", "r"].forEach(function (x) {
			var c = color & mask;
			color >>= bits;
			t[x] = bits === 4 ? 17 * c : c;
		});
		t.a = 1;
		return t;	// dojo.Color
	};

	Color.fromRgbaArray = function (/*Array*/ a, /*dojo.Color?*/ obj) {
		// summary:
		//		Builds a `dojo.Color` from a 3 or 4 element array, mapping each
		//		element in sequence to the rgb(a) values of the color.
		// example:
		//		| var myColor = dojo.colorfromRgbaArray([237,237,237,0.5]); // grey, 50% alpha
		// returns:
		//		A dojo.Color object. If obj is passed, it will be the return value.
		var t = obj || new Color();
		t._set(Number(a[0]), Number(a[1]), Number(a[2]), Number(a[3]));
		if (isNaN(t.a)) {
			t.a = 1;
		}
		return t.sanitize();	// dojo.Color
	};

	Color.fromHslaArray = function (/*Array*/ a, /*dojo.Color?*/ obj) {
		// summary:
		//		Builds a `dojo.Color` from a 3 or 4 element array, mapping each
		//		element in sequence to the rgb(a) values of the color.
		// example:
		//		| var myColor = dojo.colorfromRgbaArray([237,237,237,0.5]); // grey, 50% alpha
		// returns:
		//		A dojo.Color object. If obj is passed, it will be the return value.
		var t = obj || new Color();
		var c = hsla2rgba(Number(a[0]), Number(a[1]), Number(a[2]), isNaN(Number(a[3])) ? 1 : Number(a[3]));
		t._set(c[0], c[1], c[2], c[3]);
		return t.sanitize();	// dojo.Color
	};

	Color.fromString = function (/*String*/ str, /*dojo.Color?*/ obj) {
		// summary:
		//		Parses `str` for a color value. Accepts hex, rgb, and rgba
		//		style color values.
		// description:
		//		Acceptable input values for str may include arrays of any form
		//		accepted by dojo.colorfromRgbaArray, hex strings such as "#aaaaaa", or
		//		rgb or rgba strings such as "rgb(133, 200, 16)" or "rgba(10, 10,
		//		10, 50)"
		// returns:
		//		A dojo.Color object. If obj is passed, it will be the return value.
		var a = Color.named[str];
		return a && ((typeof a === "string" && Color.fromHex(a, obj)) ||  Color.fromRgbaArray(a, obj)) ||
			Color.fromRgbaString(str, obj) || Color.fromHslaString(str, obj) || Color.fromHex(str, obj);
	};

	return Color;
});


