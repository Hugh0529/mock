class MockData {
    constructor() {
        this.proxy = 'http://waimai.baidu.com';
    }

    hasUrl(url) {
        return !!this[url];
    }

    setDataByUrl(url, data = {}) {
        if (typeof data === 'object') {
            this[url] = data;
        }
    }

    getDataByUrl(url) {
        return this[url] || {};
    }

    getJSONDataByUrl(url) {
        try {
            const data = JSON.stringify(this[url] || {});
            return data;
        } catch (e) {
            console.error(e);
            return '{}';
        }
    }

    resetUrl(url) {
        delete this[url];
    }
}

var mockData = new MockData();

module.exports = mockData;
