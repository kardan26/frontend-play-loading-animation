const path = require('path');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const html_webpack_plugin = new HtmlWebpackPlugin({
    title: 'Loading Animation',
    template: './src/index.html',
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: true
    }
})

const mini_css_extract_plugin = new MiniCssExtractPlugin({
    filename: "[name].css",
})
module.exports = env => {
    return {
        entry: ['./src/js/index.js', './src/scss/index.scss'],
        output: {
            path: path.resolve(__dirname, "build"),
            filename: 'bundle.js',
            publicPath: (env && env.NODE_ENV == 'github') ? '/frontend-play-loading-animation/' : ''
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: ExtractTextWebpackPlugin.extract({
                        use: [{
                                loader: 'css-loader'
                            },
                            {
                                loader: 'sass-loader'
                            }
                        ]
                    })
                }
        
            ]
        },
        plugins: [
            html_webpack_plugin,
            mini_css_extract_plugin,
            new ExtractTextWebpackPlugin({ filename: 'index.css' }),
        ],
        devServer:{
            port:3000,
            overlay: true,
            historyApiFallback: true,
            open:true,
            hot:false,
            watchOptions: {
              poll: true
            }
        },
        watch: true
    }
};