const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const CopyWebpackPlugin = require('copy-webpack-plugin');
let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {
	entry: {
		main: "./src/index.js"
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: "js/[name]-bundle.js"
	},
	devServer: {
		contentBase: "dist",
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
				}
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: {
						loader: "css-loader",
						options: {
							url: false,
							minimize: true,
							name: "./styles/[name].[ext]"
						}
					}
				})
			},
			{
				test: /\.html$/,
				use: [{
					loader: "file-loader",
					options: {
						name: "[name].[ext]"
					}
				},
					{
						loader: "extract-loader",
						options: {
							publicPath: "../"
						}
					},
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.pug$/,
				use: [{
					loader: "pug-loader"
				}]
			}
		]
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./src/index.pug"
		}),
		new ExtractTextPlugin("styles/[name].css"),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require("cssnano"),
			cssProcessorOptions: { discardComments: { removeAll: true } },
			canPrint: true
		}),
		new webpack.ProvidePlugin({
			THREE: 'three'
		}),
		new CopyWebpackPlugin([
			{ from: 'src/images', to: 'images' },
			{ from: 'src/model', to: 'model' }
		])
	]
};

module.exports = (env, options) => {
	production = options.mode === 'production';
	conf.devtool = production ?
		false :
		'eval-sourcemap';
	return conf;
};