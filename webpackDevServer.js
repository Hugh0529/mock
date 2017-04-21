var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.dev.config.js');

new WebpackDevServer(webpack(config), {
    hot: true,
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    stats: {
        // Config for minimal console.log mess.
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    },
    proxy: {
        '/*': {
            target: 'http://127.0.0.1:8111'
        }
    }
}).listen(3001, 'localhost', function (err) {
        if (err) {
            console.log(err);
        }

        console.log('Listening at localhost:3001');
    });

