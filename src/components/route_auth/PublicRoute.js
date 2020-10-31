import React from 'react';
import {Route} from "react-router-dom";
import NotFound from "../ui/NotFound";


const PublicRoute = (props) => {
    const found=props.computedMatch.isExact;
    if (found) {
        return <Route path={props.path} exact component={props.component}/>
    }else {
        return <Route   component={NotFound}/>
    }
};

export default PublicRoute;