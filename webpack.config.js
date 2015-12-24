var path = require('path')
module.exports = {
	entry: path.resolve(__dirname, 'src/app.jsx'),
	output: {
		path: path.resolve(__dirname, 'src/build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			 { test: /\.(js|jsx)$/, /*include: [path.resolve(__dirname, 'src')],*/ exclude: /(node_modules|bower_components)/, loader: 'babel?presets[]=react,presets[]=es2015'},
       { test: /\.html$/, loader: 'raw' },
			 { test: /\.less$/, loader: 'style!css!less' },
			 { test: /\.css$/, loader: 'style!css' }
		]
	}
}
