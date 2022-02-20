const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const env = dotenv.config().parsed || {};
const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	entry: {
		index: './src/index.tsx'
	},
	plugins: [
		new FriendlyErrorsWebpackPlugin(),
		new webpack.DefinePlugin(envKeys),
		new ESLintPlugin({
			extensions: ['js', 'jsx','ts', 'tsx']
		}),
		new StylelintPlugin(),
		new ForkTsCheckerWebpackPlugin()
	],
	output: {
		path: path.resolve(__dirname, '../../dist'),
		clean: true,
		pathinfo: false
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.ts', '.tsx', '.json', '.css','.scss', '.sass']
	},
	devtool: false,
	optimization: {
		moduleIds: 'deterministic',
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all'
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.(css|s[ac]ss)$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', {
					loader: 'postcss-loader',
					options: {
						postcssOptions: {
							plugins: [
								[
									'postcss-preset-env', {}
								]
							]
						}
					}
				},
				'sass-loader'
				]
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: /node_modules/,
				options: {
					transpileOnly : true
				}
			}
		]
	}
}
