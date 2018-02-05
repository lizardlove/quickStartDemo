const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const outPath = path.resolve(__dirname, './build/public')

module.exports = {

    entry: path.resolve(__dirname, `./src/public/index.js`),

    output: {
        path: path.resolve(__dirname, 'build/public'),
        filename: 'main-[hash].js',
        publicPath: './'
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    stats: {
        colors: true,
        reasons: true,
        errorDetails: true
    },

    devtool: false,

    module: {
        rules: [
            {
                test: /\.js?$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader', 'postcss-loader', 'less-loader'],
                    fallback: 'style-loader'
                }),
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 10000
                    }
                }
            },
            {
                test: /\.woff|\.woff2|\.eot|\.ttf/,
                use: {
                    loader: 'url-loader',
                    query: {
                        limit: 5000
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'main-[hash].css',
            allChunks: true
        }),
        new CleanWebpackPlugin(
            ['*'],
            {root: outPath}
        ),
        new CopyWebpackPlugin([
            {from: './src/public/assets', to: path.join(outPath, './assets')}
        ]),
        new ImageminWebpackPlugin({ test: /\.(jpe?g|png|gif|svg)$/i }),
        new webpack.DefinePlugin({
            'globalEnv': {
                NODE_ENV: JSON.stringify('production'),
            }
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new HtmlWebpackPlugin({
            template: './src/public/index.html'
        })
    ]
}