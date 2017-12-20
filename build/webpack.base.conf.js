const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const px2rem = require('postcss-px2rem')
const autoprefixer = require('autoprefixer')

module.exports = {
    context: process.cwd(), //全局上下文的起始目录
    entry: ['./src/entry.js'],//入口文件
    output: {
        path: path.resolve(process.cwd(), "dist"),//输出的文件
        filename: "js/[name].[hash:7].js",//输出的文件名
        publicPath: ''//公共路径
    },
    resolve: {
        extensions: [".js", ".vue", ".css", ".html", ".json"],//自动查询的后缀名
        alias: {//全局引用快捷变量
            vue: path.resolve(process.cwd(), 'node_modules/vue/dist/vue.runtime.common.js'),
            apis: path.resolve(process.cwd(), 'src/apis'),
            pages: path.resolve(process.cwd(), 'src/pages'),
            components: path.resolve(process.cwd(), 'src/components')
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
        new HtmlWebpackPlugin({template: "index.html"})
    ]
}