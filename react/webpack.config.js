var path = require('path');
var _dir_ = path.resolve();

// module.exports = {
// 	entry: [
// 		_dir_+'/modules/mobile_htyou.js'
// 	],
// 	output: {
// 		path: '../www/',
// 		filename: 'bundle-react.js'
// 	},
// 	module: {
// 		loaders: [{
// 			test: /\.jsx?$/,
// 			exclude: /node_modules/,
// 			loader: 'babel-loader',
// 			query: {
// 				presets: ['es2015', 'react']
// 			}
// 		}]
// 	},
// 	watch: true
// }

module.exports = {
	entry: {
		//a: ["./a", "./b"],
		'commonlib': _dir_+'/modules/mobile_htyou.jsx',
		'usercenter': _dir_+'/modules/user_center.jsx'
	},
	output: {
		path: '../www/reactlib/',
		filename: '[name].react.js'
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