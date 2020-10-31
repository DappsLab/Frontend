import React from 'react';
import {Route,Redirect} from "react-router-dom";


const PrivateRoute = (props) => {

    const auth=props.auth;
    if (auth){
        return  <Route path={props.path} exact component={props.component}/>
    }
    else {
        return  <Redirect  to={'/login'}/>
    }
};

export default PrivateRoute;