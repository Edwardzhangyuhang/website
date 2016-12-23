import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Login from './pages/Login';
import Table from './pages/Table';
import Index from './pages/Index';

const routes = ( 
    <Route path="/" component={ Login }/>
);

export default routes;

