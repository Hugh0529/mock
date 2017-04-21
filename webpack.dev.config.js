var webpack = require('webpack');
var config = require('./webpack.base.config.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js');

// eval-source-map is faster for development
config.devtool = 'eval-source-map';

/*
 config.devServer = {
     // allow access over local network
     host: '0.0.0.0',
     // change port 8080 to 8888, to avoid conflict
     port: 8888,
     // enable HTML5 history routing
     historyApiFallback: true,
     // suppress useless text
     noInfo: true
 };
 */

// necessary for the html plugin to work properly
// when serving the html from in-memory
config.output.publicPath = '/';

config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin('[name].css', {allChunks: true})
    // commonsPlugin
]);

module.exports = config;
