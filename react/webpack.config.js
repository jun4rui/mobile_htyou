var path = require('path');
var _dir_ = path.resolve();

module.exports = {
	entry: [
		_dir_+'/modules/mobile_htyou.js'
	],
	output: {
		path: '../www/',
		filename: 'bundle-react.js'
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