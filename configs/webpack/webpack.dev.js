const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const APP_PORT = process.env.APP_PORT || 1488;
const SERVE = process.env.SERVE || false;

const pluginService = (SERVE) => {
	const collector =  [
		new HtmlWebpackPlugin({
			filename: '[name].html',
			template: './public/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: './styles/[name].css',
			chunkFilename: 'styles/[id].css'
		}),
		new webpack.SourceMapDevToolPlugin({
			filename: './[file].map',
			exclude: [/runtime.*.*/ ,/vendors.*.*/]
		})
	];

	if (SERVE) {
		collector.push(new ReactRefreshWebpackPlugin());
	}

	return collector;
}

module.exports = {
	mode: 'development',
	devServer: {
		port: APP_PORT,
		historyApiFallback: true
	},
	plugins: pluginService(SERVE),
	output: {
		filename: './scripts/[name].js'
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[name][ext][query]'
				}
			},
			{
				test: /\.svg/,
				type: 'asset/inline',
				generator: {
					filename: 'images/svg/[name][ext][query]'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext][query]'
				}
			},
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve('babel-loader'),
						options: {
							plugins: [SERVE && require.resolve('react-refresh/babel')].filter(Boolean),
						}
					}
				]
			}
		]
	}
}
