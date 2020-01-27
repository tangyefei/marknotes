const path = require('path');

module.exports = {
  mode: "production",
	entry: {
		index: "./src/index",	
		search: "./src/search"
	},
	output: {
    path:path.join(__dirname, "dist"),
    filename: "[name].js"
	}
}	