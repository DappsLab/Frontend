import React from "react";
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {routes} from "./RouteConfig";

const AppRouter =()=>{
    return(
        <Router>
            <Switch/>
            {routes.map((route:any,i:number) =>(
                <RouteWithSubRoute key={i} {...route}/>
            ))}
        </Router>
    );
};
function RouteWithSubRoute(route:any) {
    return(
        <Route
            path={route.path}
            render={(props:any)=><route.components {...props} routes={route.routes}/>}
        />
    );
}
export default AppRouter