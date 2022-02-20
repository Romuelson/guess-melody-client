const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
	mode: 'production',
	plugins: [
		new HtmlWebpackPlugin({
			filename: '[name].[contenthash].min.html',
			minify: {
				collapseWhitespace: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: './styles/[name].[contenthash].min.css',
			chunkFilename: 'styles/[id].[contenthash].min.css'
		})
	],
	output: {
		filename: './scripts/[name].[contenthash].min.js'
	},
	optimization: {
		minimize: true,
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.squooshMinify,
					options: {
						encodeOptions: {
							mozjpeg: {
								// Этот параметр может быть близок к без потерь, но это не гарантируется.
								// https://github.com/GoogleChromeLabs/squoosh/issues/85
								quality: 90
							},
							webp: {
								lossless: 1
							},
							avif: {
								// https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
								cqLevel: 0
							}
						}
					}
				}
			}),
			new CssMinimizerPlugin(),
			new TerserPlugin()
		]
	},
	module: {
		rules: [
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'images/[contenthash].min[ext][query]'
				}
			},
			{
				test: /\.svg/,
				type: 'asset/inline',
				generator: {
					filename: 'images/svg/[contenthash].min[ext][query]'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[contenthash][ext][query]'
				}
			}
		]
	}
}
