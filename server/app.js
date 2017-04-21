var isProd = process.env.NODE_ENV === 'production';

var fs = require('fs');
var path = require('path');
var express = require('express');
var proxy = require('http-proxy-middleware');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var mockController = require('./controller/mockController');
var apiController = require('./controller/apiController');

var resolve = file => path.resolve(__dirname, file);
var app = express();

var serve = (path, cache) => express.static(resolve(path), {
    maxAge: cache && isProd ? 60 * 60 * 24 * 30 : 0
});

// app.use('/', express.static(__dirname + '../static/index.html'));
app.use(express.static(path.resolve(__dirname, '../static')));
app.get('/', function (req, res) {
    res.sendFile('index.html');
});

app.use(favicon('../public/logo.png'));
app.use('/public', serve('../public'));

// router
app.use('/mock', mockController);
app.use('/api', apiController);

// proxy
// app.use('/strategyui', proxy('http://waimai.baidu.com/strategyui'));

app.use(cookieParser());
app.use(bodyParser());


var port = process.env.PORT || 8111;
var host = process.env.HOST || 'iwm.baidu.com';
app.listen(port, host, () => {
    console.log(`server started at ${host}:${port}`)
});
