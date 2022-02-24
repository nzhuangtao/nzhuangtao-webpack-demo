const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        a: {
            import: path.resolve(__dirname, './src/js/a.js'),
            // dependOn:'jquery',
        },
        // jquery:"jquery",// 公共资源提取
    },
    output: {
        filename: '[name][contenthash:8].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        // assetModuleFilename: 'images/[hash][ext][query]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/views/index.html'),
            inject: true,
            filename: 'html/index.html'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'stylus-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                parser: {
                    dataUrlCondition: {
                        maxSize: 200 * 1024
                    }
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.js$/i,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true // 启用缓存
                        }
                    },
                ],
                exclude: /node_modules/,
            },
        ],
        noParse: /jquery|lodash/, // 不需要解析的
    },
    resolve: {
        alias: {
            'css': path.resolve(__dirname, 'src/css'),
            '@': path.resolve(__dirname, 'src/js'),
        },
        extensions: ['.js', '.json', '.wasm'],
    },
    cache: {
        type: 'filesystem',
        allowCollectingMemory: true, // 允许收集内存
        // cacheLocation 缓存路径
        // cacheUnaffected 对未改变的模块进行缓存计算，只引用未改变的模块
    },
}           