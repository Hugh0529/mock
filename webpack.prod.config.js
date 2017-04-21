var webpack = require('webpack');
var config = require('./webpack.base.config.js');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js');

// naming output files with hashes for better caching.
// dist/index.html will be auto-generated with correct URLs.
config.output.filename = '[name].[chunkhash].js';
config.output.chunkFilename = '[id].[chunkhash].js';

// whether to generate source map for production files.
// disabling this can speed up the build.
var SOURCE_MAP = false;

config.devtool = SOURCE_MAP ? 'source-map' : false;

config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin('[name].[contenthash].css', {allChunks: true})
    // commonsPlugin
]);

module.exports = config;
