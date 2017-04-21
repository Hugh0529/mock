/* eslint-disable no-unused-vars */
import React from 'react';
import {Router, hashHistory, Route, IndexRoute, IndexRedirect, Redirect} from 'react-router';

import App from './components/App';
import Main from './components/Main/Main';

/* eslint-disable no-unused-vars */

export default (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to="/main"/>
            <Redirect from="index" to="/main" />
            <Route path="main" component={Main}>
            </Route>
        </Route>
    </Router>
);
