import React from 'react';
import {Route} from "react-router-dom";


const PublicRoute = (props) => {
    return <Route path={props.path} exact component={props.component}/>
};

export default PublicRoute;