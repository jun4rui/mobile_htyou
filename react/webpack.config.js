var path = require('path');

var__dirname = path.resolve();

module.exports = {
	entry: [
		__dirname+'/modules/mobile_htyou.js'
	],
	output: {
		path: __dirname+'/build/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['es2015', 'react']
			}
		}]
	},
	watch: true

}