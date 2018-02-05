const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: {
        main: [
            'webpack-hot-middleware/client?path=http://localhost:2019/__webpack_hmr&reload=true',
            path.resolve(__dirname, `./src/public/index.js`)
        ],
        // vendor: [] //引入第三方库
    },

    output: {
        path: path.resolve(__dirname, 'src/public'),
        filename: 'main.js',
        publicPath: '/'
    },

    stats: {
        colors: true,
        reasons: true,
        errorDetails: true
    },

    resolve: {
        extensions: [".js", ".jsx", ".less"],
        // alias: {}  //第三方库简写
    },

    devtool: false,

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ],
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
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({})
    ]
}