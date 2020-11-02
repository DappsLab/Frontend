import React from 'react';
import {Redirect, Route} from "react-router-dom";
import NotFound from "../ui/NotFound";


const PublicRoute = (props) => {
    const found=props.computedMatch.isExact;
    const user=props.auth;
    if (found) {
        if (user&& (props.path==="/login"|| props.path==="/register")){
          return  <Redirect to={'/'}/>
        }else {
            return <Route path={props.path} exact component={props.component}/>
        }
    } else {
        return <Route   component={NotFound}/>
    }
};

export default PublicRoute;