var express = require('express');
var router = express.Router();
var ApiService = require('../service/ApiService');

var apiService = new ApiService();

router.get('/getDataByUrl', function (req, res, next) {
    var query = req.query;
    apiService.getDataByUrl(query.url, function (data) {
        res.send(data);
    });
});

router.get('/setDataByUrl', function (req, res, next) {
    var query = req.query;
    try {
        var data = JSON.parse(query.data);
        apiService.setDataByUrl(query.url, data, function (data) {
            res.send(data);
        });
    } catch (e) {
        console.error(e);
    }
});

router.get('/resetDataByUrl', function (req, res, next) {
    var query = req.query;
    apiService.resetDataByUrl(query.url, function (data) {
        res.send(data);
    });
});
module.exports = router;
