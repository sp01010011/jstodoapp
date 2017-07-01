const path                  = require('path');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const ExtractTextPlugin     = require('extract-text-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'js/app.bundle.js'
    },
    module: {
        rules: [
            {test: /\.js$/, use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"]
                    }
                }
            ]},

            {test: /\.scss$/, use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader'],
                publicPath: 'dist'
            })}
        ]
    },
    devServer: {
        contentBase: path.join(__dirname,'/dist'),
        compress: true,
        port: 8900,
        stats: "errors-only",
        open: true
    },
    plugins: [new HtmlWebpackPlugin({
        minify: {
            collapseWhitespace: true
        },
        hash:true,
        template: "./src/index.html"
    }),
        new ExtractTextPlugin({
            filename: 'css/app.css',
            disable: false,
            allChunks: true
        })
    ]
};
