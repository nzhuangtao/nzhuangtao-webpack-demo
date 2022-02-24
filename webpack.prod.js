const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // 不支持HMR
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin') // 消除无用css
const glob = require('glob'); // 文件匹配模式
const TerserPlugin = require('terser-webpack-plugin');
// const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.min.css',
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new PurgecssWebpackPlugin({
            paths: glob.sync(`./src/css/*`, { nodir: true })
        }),
        // new BundleAnalyzerPlugin(),
    ],
    devtool: false,
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader',
                ],
            },
        ]
    },
    cache: false,
    optimization: {
        minimize: true, // 开启最小化
        minimizer: [
            new TerserPlugin()
        ],
        splitChunks: {
            chunks: 'all',// 选择哪个chunk进行优化，有all|async|initial 
            minSize: 20000,// 使得比这个值大的模块才会被提取
            maxAsyncRequests: 30, // 按需加载时最大的并行请求
            maxInitialRequests: 3, // 入口点的最大并行请求
            minChunks: 1,// 拆分前必须共享的最小chunks数
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    // externals: { //一些用cdn引入的资源可以不打包
    //     jquery: 'jQuery',
    // },
});