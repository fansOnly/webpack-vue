const webpack = require('webpack');
const config = require('./webpack.config');
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(config, {
    mode: 'production',
    output: {
        filename: 'js/[name].[contenthash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].chunk.js',
        pathinfo: false
    },
    optimization: {
        minimizer: [
			new TerserPlugin({
				sourceMap: true,
				cache: true,
			}),
			new OptimizeCSSAssetsPlugin(),
		],
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				vendors: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,
					priority: -10,
					chunks: 'initial',
				},
				common: {
					name: 'common',
					minChunks: 2,
					priority: -20,
					chunks: 'initial',
					reuseExistingChunk: true
				}
			}
		},
    },
    plugins: [
        new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // // 注意一定要在HtmlWebpackPlugin之后引用
		// new ScriptExtHtmlWebpackPlugin({
		// 	//`runtime` must same as runtimeChunk name. default is `runtime`
		// 	inline: /runtime\..*\.js$/
        // }),
        // webpack打包文件分析
		// new BundleAnalyzerPlugin(),
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
			clear: true
		}),
    ]
})