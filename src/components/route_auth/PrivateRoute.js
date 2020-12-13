
import React, {useEffect} from 'react';
import {Route,Redirect} from "react-router-dom";

const PrivateRoute = ({user,component:Comp,...rest}) => {
    useEffect(()=>{
        window.scrollTo(0,0)
    })
    return <Route {...rest} component={(props)=>(
        !!localStorage.getItem('token') ?
           <Comp {...props} user={user}/>
            :
            <Redirect to="/login"/>
    )}/>
};

export default (PrivateRoute);