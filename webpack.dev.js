/*eslint-env node*/
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const merge = require('webpack-merge');

module.exports = merge(config, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, './'),
        // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        historyApiFallback: true,
        compress: true,
        hot: true,
        inline: true,
        host: 'localhost',
        port: 9000,
        proxy: {}
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        // 启用HMR
        new webpack.HotModuleReplacementPlugin(),
        // 在控制台中输出可读的模块名,开发环境使用
        new webpack.NamedModulesPlugin(),
        // 不做改动hash保持不变
        new webpack.HashedModuleIdsPlugin(),
    ]
})