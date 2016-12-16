import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

import routes from './routes';
import Index from './pages/Index';
import TableComplex from './pages/Table';

ReactDOM.render(
    <Router history={hashHistory}>
        {routes}
        <Route path="/react" component={ Index }>
            <IndexRoute component= { TableComplex }/>
        </Route>
        <Route path="/tables" component={ TableComplex }/>
    </Router>,
    document.getElementById('login')
);
