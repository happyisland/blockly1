// 引入css 单独打包插件
var ExtractTextPlugin = require("extract-text-webpack-plugin");
// 设置生成css 的路径和文件名，会自动将对应entry入口js文件中引入的CSS抽出成单独的文件
// var packCSS = new ExtractTextPlugin('./css/[name].min.css');
module.exports = {

    entry: {
        app : "./engine/ubt_blockly_app.js",
        course : './engine/ubt_blockly_course.js'
    },
    output: {
        path: __dirname + '/',
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract({ fallback:'style-loader',use:'css-loader'})},
			{ test: /\.jsx$/, exclude: /node_modules/, loader: 'jsx-loader?harmony' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'jsx-loader?harmony' },
            { test: /\.(gif|jpg|png|woff|svg|eot|ttf|otf)\??.*$/, loader: "url-loader?limit=8192&name=./fonts/[name].[ext]"}
        ]
    },
    plugins:  [
      new ExtractTextPlugin({ filename: './[name].min.css', disable: false, allChunks: true })
    ]
};