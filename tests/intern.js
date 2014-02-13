// Test file to run infrastructure tests from a browser
// Run using http://localhost/delite/node_modules/intern/client.html?config=tests/intern

define({
	useLoader: {
		"host-browser": "../../../requirejs/require.js"
	},

	// Non-functional test suites
	suites: [ "dcolor/tests/all" ]
});
