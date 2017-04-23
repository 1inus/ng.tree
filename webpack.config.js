var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: {
		main: './demo/main.ts'
	},
	output: {
		path: path.resolve(__dirname, ''),
		publicPath: '',
		filename: './demo/[name].js'
	},
	module: {
		loaders: [{ test: /\.ts$/, loader: 'ts-loader' }],
		exprContextCritical: false,
	},
	resolve: {
		extensions: ['.js', '.ts']
	}
};