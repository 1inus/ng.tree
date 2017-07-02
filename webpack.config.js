var path = require('path');
var webpack = require('webpack');
//var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

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
	},
	plugins: [
		/*new TypedocWebpackPlugin({
			name: 'ngTree',
			mode: 'file',
			theme: './typedoc-theme/',
			includeDeclarations: true,
			ignoreCompilerErrors: true,
		}),
		new webpack.optimize.UglifyJsPlugin({
			comments: false,
			compress: {warnings: false}
		})*/
	]
};