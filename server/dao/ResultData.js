class ResultData {
    constructor(result = {}, error_no = 0, error_msg = '') {
        this.result = result;
        this.error_no = error_no;
        this.error_msg = error_msg;
    }
}

module.exports = ResultData;
