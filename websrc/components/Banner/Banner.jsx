/* eslint-disable no-unused-vars */
import React from 'react';

import {getCookie} from 'src/utils/util';
/* eslint-disable no-unused-vars */

import './banner.less';

class Banner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: getCookie('userId')
        };
    }
    render() {
        return (
            <div className="banner">
                <div className="logo">Mock - Proxy</div>
                <div className="name">{this.state.userId}</div>
            </div>
        );
    }
}

export default Banner;
