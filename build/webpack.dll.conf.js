const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const px2rem = require('postcss-px2rem')
const autoprefixer = require('autoprefixer')
module.exports = {
    context: process.cwd(), //全局上下文的起始目录
    entry: {
        base: ['vue', 'vue-http', 'vt-cell', 'vt-tree', 'vt-picker', 'vt-datetime-picker']
    },
    output: {
        path: path.join(__dirname, "dll"),
        filename: "myDLL.js",
        library: "[name]_[hash]"
    },
    resolve: {
        extensions: [".js", ".vue", ".css", ".html", ".json"],//自动查询的后缀名
        alias: {//全局引用快捷变量
            vue: path.resolve(process.cwd(), 'node_modules/vue/dist/vue.runtime.common.js')
        },
        modules: ["node_modules"]//查找包对象
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader'
                        },
                        cssModules: {
                            localIdentName: '[path][name]-[local]-[hash:base64:5]',
                            camelCase: true
                        },
                        postcss: [
                            px2rem({remUnit: 75}),
                            autoprefixer({browsers: ['last 7 versions']})
                        ]
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: [["env", {
                            "targets": {
                                "browsers": ["last 7 versions", "ie >= 7"]
                            }
                        }], "stage-0"],
                        plugins: ["transform-vue-jsx", "transform-runtime"]
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }]
            },
            {
                test: /\.(jpe?g|png|bmp|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1,
                        name: 'images/[name].[hash:7].[ext]'
                    }
                }],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 1,
                        name: 'images/[name].[hash:7].[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            context: __dirname,
            name: "[name]_[hash]",
            path: path.join(__dirname, 'dll', "manifest.json"),
        })
    ]
}