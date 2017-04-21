var request = require('request');
var mockData = require('../dao/mockData');

class MockService {
    constructor() {

    }

    getMockData(url, requsetUrl, cb) {
        url = url.indexOf('/') === 0 ? url : '/' + url;
        if (mockData.hasUrl(url)) {
            return cb(mockData.getDataByUrl(url));
        } else {
            // request
            request(mockData.proxy + requsetUrl, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    if (url.indexOf('/') !== 0) {
                        url = '/' + url;
                    }
                    mockData.setDataByUrl(url, body);
                    if (typeof cb === 'function') return cb(body);
                }
            });
        }
    }

    resetMockData(url) {
        mockData.resetUrl(url);
    }
}

module.exports = MockService;
