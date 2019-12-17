import React from 'react';
import {
    BrowserRouter as Router,
} from 'react-router-dom';
import RouterView from './router.view'

const RouteRoot = ({routes})=>{
    return <Router>
        <RouterView routes={routes} />
    </Router>
}

export default RouteRoot;