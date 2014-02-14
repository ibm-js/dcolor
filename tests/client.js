// Test file to run infrastructure tests from a browser
// Run using http://localhost/dcolor/node_modules/intern/client.html?config=tests/client
define(["./intern"], function (intern) {
	var config = {
		loader: {
			baseUrl: "../../.."
		}
	};

	for (var key in intern) {
		config[key] = intern[key];
	}

	return config;
});
