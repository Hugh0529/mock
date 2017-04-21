var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './websrc/index.js'
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: './',
        filename: '[name].js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.css', '.less', '.png'],
        alias: {
            'src': path.resolve(__dirname, './websrc')
        }
    },
    module: {
        // preLoaders: [
        //     {
        //         test: /\.(js|jsx)$/,
        //         loader: 'eslint-loader',
        //         exclude: /node_modules/
        //     }
        // ],

        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                // loader: 'babel!eslint',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&minetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    // eslint: {
    //     configFile: './.eslintrc.yml'
    // },
    postcss: [
        // doc: https://github.com/postcss/autoprefixer
        // browserslist: https://github.com/ai/browserslist
        autoprefixer({browsers: ['last 2 versions']})
    ],
    plugins: [
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /build/index.template.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: 'websrc/index.html',
            filename: './index.html',
            inject: 'body',
            // favicon: 'websrc/vendor/favico.ico'
        })
    ],
    externals: {}
};
