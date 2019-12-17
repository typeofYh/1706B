import React from 'react';
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

const RouterView = ({routes = []})=>{
    if(!routes.length) return null;
    let redirectViews = routes.filter(item=>item.redirect).map((item,key)=><Redirect from={item.path} to={item.redirect} key={key} />);
    routes = routes.filter(item=>!item.redirect);
    return <Switch>
    {
        routes.map((item,key)=>{
            return <Route path={item.path} render={(props)=>{
               let Com = item.component;
               document.title = item.meta.title;
               return <Com {...props} routes={item.children} />
            }} key={key} />
        }).concat(redirectViews)
    }
    </Switch>
}

export default RouterView;
