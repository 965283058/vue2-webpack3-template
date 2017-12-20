const merge = require("webpack-merge")
const base = require("./webpack.base.conf")
const webpack=require('webpack')
const path = require('path')
const UglifyJSPlugin=require('uglifyjs-webpack-plugin')
const ExtractTextPlugin=require('extract-text-webpack-plugin')

let config = merge(base, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                'NODE_ENV':"'production'",
                'ROUTER_ROOT': "''",
                'API_ROOT': "''"
            }
        }),
        new UglifyJSPlugin(),
        new ExtractTextPlugin("styles.css")
    ]
})


console.log(JSON.stringify(config))


module.exports=config