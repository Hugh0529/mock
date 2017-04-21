var mockData = require('../dao/mockData');
var ResultData = require('../dao/ResultData');

class ApiService {
    constructor() {

    }

    getDataByUrl(url, cb) {
        const data = mockData.getJSONDataByUrl(url);
        return cb(new ResultData(data));
    }

    setDataByUrl(url, data, cb) {
        mockData.setDataByUrl(url, data);
        cb(new ResultData());
    }

    resetDataByUrl(url, cb) {
        mockData.resetUrl(url);
        cb(new ResultData());
    }
}

module.exports = ApiService;
