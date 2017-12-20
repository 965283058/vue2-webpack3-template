const merge = require("webpack-merge")
const base = require("./webpack.base.conf")
const webpack = require('webpack')
const DashboardPlugin = require('webpack-dashboard/plugin');

const path = require('path')

module.exports = merge(base, {
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                'NODE_ENV': '"dev"',
                'ROUTER_ROOT': "''",
                'API_ROOT': "''"
            }
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new DashboardPlugin({port: 8080}),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dll/manifest.json'),
        })
    ]
})