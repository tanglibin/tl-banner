const path = require("path");
const {VueLoaderPlugin}=require('vue-loader')
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    devtool: 'source-map',
    entry: NODE_ENV == "development" ? "./example/main.js" : "./src/index.js",
    output: {
        path: path.resolve(__dirname, './lib'),
        publicPath: '/lib/',
        filename: 'tl.banner.js',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/lib|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets: ["env"]
                    }
                }
            },
            {
                test: /\.(jpg|png|gif)$/,//指定要处理的图片格式类型
                use : [{
                    loader: "url-loader",
                    options: {
                        limit: 5000,//单位(b),文件大于该值则进行拷贝,小于则进行base64转码并插入到js文件
                    }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ],
    devServer:{
        contentBase: path.resolve(__dirname, "example"),
        host : "localhost",
        port : 80,
        compress : true
    }
};