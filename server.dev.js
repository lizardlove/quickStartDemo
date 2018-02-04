const path = require("path")
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.dev.config')

config.plugins.push(
    new webpack.DefinePlugin({
        'golbalEnv': {
            NODE_ENV: JSON.stringify('development')
        }
    })
)

const express = require('express')
const app = new express();
const port = 2019

const temp = webpack(config)

app.use(webpackDevMiddleware(temp, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true,
        chunks: false
    }
}))

app.use(webpackHotMiddleware(temp))

app.use('/', express.static(`${__dirname}/src`))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/src/index.html`)
})

app.listen(port, error => {
    if (error) {
        console.error(error)
    } else {
        console.info('Listening on port %s', port)
    }
})