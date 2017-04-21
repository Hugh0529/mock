import es6Promise from 'es6-promise';
import fetch from 'isomorphic-fetch';
import {notification} from 'antd';

import getQueryString from './param.js';

es6Promise.polyfill();

const DEFAULT_PREFIX = '/api';

const ERROR_MESSAGE = '出错啦，请稍后重试';

const defaultOption = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
};

const get = (url, param = {}) => {
    const option = defaultOption;
    // Object.assign(param, {display: 'json'});
    if (param) {
        url += (url.indexOf('?') === -1 ? '?' : '&') + getQueryString(param);
    }
    url = DEFAULT_PREFIX + url;
    return fetch(url, option)
        .then(res => {
            return res.json();
        })
        .then(res => {
            if (res.err_no || res.error_no) {
                // handleNotLogin(res);
                throw new Error(res.err_msg || res.error_msg);
            } else {
                return res.result;
            }
        })
        .catch(err => {
            notification.error({
                // message: err.message
                message: ERROR_MESSAGE
            });
            throw err;
        });
};

const convertObjectToFormData = obj => {
    let formData = new FormData();
    for (let key of Object.keys(obj)) {
        formData.append(key, obj[key]);
    }
    return formData;
};

/* eslint-disable no-unused-vars */
const post = (url, param) => {
    const option = Object.assign({}, defaultOption,
        {
            method: 'post',
            body: convertObjectToFormData(param)
        });
    url = DEFAULT_PREFIX + url;
    return fetch(url, option)
        .then(res => {
            return res.json();
        })
        .then(res => {
            if (res.err_no || res.error_no) {
                // handleNotLogin(res);
                throw new Error(res.err_msg || res.error_msg);
            } else {
                return res.data;
            }
        })
        .catch(err => {
            notification.error({
                // message: err.message
                message: ERROR_MESSAGE
            });
            throw err;
        });
};
/* eslint-disable no-unused-vars */

const Api = function () {
    return {
        getDataByUrl: (param = {url: ''}) => {
            return get('/getDataByUrl', param);
        },

        setDataByUrl: (param = {url: '', data: {}}) => {
            return get('/setDataByUrl', param);
        },

        resetDataByUrl: (param = {url: ''}) => {
            return get('/resetDataByUrl', param);
        },
    };
};
export const api = new Api();
