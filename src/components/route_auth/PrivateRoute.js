import React from 'react';
import {Route,Redirect} from "react-router-dom";

const PrivateRoute = ({isLoading,component:Comp,...rest}) => {
    return <Route {...rest}  component={(props)=>(
        isLoading ?
            <Comp {...props} />
            :
            <Redirect to={"/login"} {...props}/>
    )}/>
};

export default PrivateRoute;