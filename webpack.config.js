/*eslint-env node*/
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less'],
        mainFiles: ['index', 'main'],
        alias: {
            '@': path.resolve(__dirname, './src'),
        }
    },
    devtool: devMode ? 'cheap-module-eval-source-map' : 'cheap-nodule-source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
				enforce: 'pre',
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
            {
                test: /\.(c|le|sc|sa)ss$/,
                use: [
                    devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
                    {
						loader: 'css-loader',
						options: {
                            importLoaders: 2,
                            // modules: true
						}
					},
                    'postcss-loader',
					'less-loader',
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg|ico|eot|fft|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        limit: 102400, //小于100k的图片都用base64的方式加载
                        outputPath: 'assets/images/'
                    }
                }
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'webpack-vue',
            template: path.resolve(__dirname, './public/index.html'),
            hash: true,
            favicon: path.resolve(__dirname, './public/favicon.ico')
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'assets/style/[name].css' : 'assets/style/[name].[hash:8].css',
            chunkFilename: devMode ? 'assets/style/[id].css' : 'assets/style/[id].[chunkhash:8].css'
        }),
        new CleanWebpackPlugin(),
        new ManifestPlugin(),
    ]
}