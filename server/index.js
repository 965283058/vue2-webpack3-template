const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware")
const config = require('../build/webpack.dev.conf.js')
const DashboardPlugin = require('webpack-dashboard/plugin');

//webpack-dashboard --
let app = new express();
let port, serverConfig

serverConfig = Object.assign({}, {
    port: 8080
}, config.server)

config.devServer = config.devServer || {}
config.devServer.publicPath = config.output.publicPath
config.devServer.hot = true

port = process.argv[2] || serverConfig.port
config.entry.unshift('webpack-hot-middleware/client')
let compiler = webpack(config)
compiler.apply(new DashboardPlugin());

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath || '',
    quiet: false,
    hot: true,
    noInfo: false,
    lazy: false,
    stats: {
        colors: true
    }
}))

app.use(webpackHotMiddleware(compiler));




app.listen(port, function (err) {
    if (err) {
        return console.log(err)
    }
    console.log(`http://localhost:${port}`)
})
