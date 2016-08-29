var path = require('path');

module.exports = {
	entry:   [
		'./jsx/htyou.jsx'
	],
	output:  {
		path:     './',
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module:  {
		loaders: [
			{
				test:    /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader:  'babel', // 'babel-loader' is also a legal name to reference
				query:   {
					presets: ['es2015', 'react']
				}
			}
		]
	},
	watch:   true
}