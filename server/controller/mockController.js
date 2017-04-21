var express = require('express');
var router = express.Router();
var MockService = require('../service/MockService');

var mockService = new MockService();

router.get('/*', function (req, res, next) {
    var url = req.params[0];
    var requestUrl = req.url;
    mockService.getMockData(url, requestUrl, function (data) {
        res.send(data);
    });
});

module.exports = router;
