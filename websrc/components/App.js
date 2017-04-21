/* eslint-disable no-unused-vars */
import React from 'react';
import {Row, Col} from 'antd';

import Banner from './Banner/Banner.jsx';
/* eslint-disable no-unused-vars */
// TODO modularly
// antd v2.5.0
import 'src/vendor/antd.css';
import './app.less';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app">
                <Banner></Banner>
                <Row>
                    <Col span={12} offset={6}>
                        {this.props.children}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
